/* ╔══════════════════════════════════════════════════════════════════╗
   ║ Klever Controller                                                ║
   ║ Single source of truth for ALL on-chain interactions across the  ║
   ║ 25 Oasis games. Loaded by every game page (and the lobby).       ║
   ║                                                                  ║
   ║ Exposes window.KleverController.                                 ║
   ║                                                                  ║
   ║ • Desktop  → window.kleverWeb (Klever Browser Extension)         ║
   ║ • Mobile   → lazy-loads @klever/sdk-web from CDN, drives the     ║
   ║              Klever app via deeplink/QR                          ║
   ║                                                                  ║
   ║ Zero npm packages. Vanilla ES.                                   ║
   ║                                                                  ║
   ║ Events (DOM CustomEvents on window, AND .on() subscribers):      ║
   ║   klever:connect    {address, provider}                          ║
   ║   klever:disconnect {}                                           ║
   ║   klever:balance    {klv, address}                               ║
   ║   klever:upgrade    {gameId, upgradeId, txHash, meta}            ║
   ║   klever:error      {error, op}                                  ║
   ╚══════════════════════════════════════════════════════════════════╝ */
'use strict';

(function(){

  // ⚠ FILL IN BEFORE PRODUCTION — Klever treasury address that receives
  //    all upgrade purchases & casino bets. Until set, on-chain transfers
  //    are blocked (controller stays in demo mode).
  const TREASURY = 'klv1m8l3mqh22mf64ypfa97cgn3pwsa72sdaycfffmr5mxgh4vumucsqmyvnrf'; // verified — same as AetherDrift.html line 3469 (oasis-hub live treasury)

  const API_BASE        = '/api';
  const KLEVER_API_URL  = 'https://api.mainnet.klever.org';
  const KLEVER_NODE_URL = 'https://node.mainnet.klever.org';
  const KLEVER_SDK_CDN  = 'https://unpkg.com/@klever/sdk-web@latest/dist/index.js';

  const isMobile = ()=> /android|iphone|ipad|ipod|mobile/i.test(navigator.userAgent || '');

  /* ── tiny event bus (in addition to window CustomEvents) ── */
  const _subs = {};
  function _on(evt, fn){ (_subs[evt] = _subs[evt] || []).push(fn); }
  function _emit(evt, detail){
    (_subs[evt] || []).forEach(fn=>{ try{ fn(detail); }catch(e){} });
    try{ window.dispatchEvent(new CustomEvent('klever:'+evt, { detail })); }catch(e){}
  }

  /* ── toast helper ── */
  function _toast(msg, kind, ms=2400){
    let t = document.getElementById('kcToast');
    if(!t){ t = document.createElement('div'); t.id='kcToast'; t.className='kc-toast'; document.body.appendChild(t); }
    t.classList.remove('kc-ok','kc-err');
    if(kind==='ok')  t.classList.add('kc-ok');
    if(kind==='err') t.classList.add('kc-err');
    t.textContent = msg;
    requestAnimationFrame(()=>t.classList.add('kc-on'));
    clearTimeout(_toast._x);
    _toast._x = setTimeout(()=>t.classList.remove('kc-on'), ms);
  }

  function _abbr(a){ return (!a || a.length<12) ? (a||'') : a.slice(0,7)+'…'+a.slice(-5); }

  /* ── upgrade catalog cache ── */
  let _catalog = null, _catalogP = null;
  function _fetchCatalog(){
    if(_catalog) return Promise.resolve(_catalog);
    if(_catalogP) return _catalogP;
    _catalogP = fetch('/assets/games/upgrades.json',{cache:'force-cache'})
      .then(r=>r.ok?r.json():{})
      .then(j=>{ _catalog = j || {}; return _catalog; })
      .catch(()=>{ _catalog = {}; return _catalog; });
    return _catalogP;
  }

  /* ─────────────────────────────────────────────────────────────────
     KleverController
  ───────────────────────────────────────────────────────────────── */
  const Controller = {
    /* ── state ── */
    address: null,
    connected: false,
    provider: null,        // 'extension' | 'sdk-web' | null
    busy: false,
    treasury: TREASURY,
    apiBase: API_BASE,
    _sdk: null,
    _balance: 0,
    _balanceTs: 0,
    _balanceP: null,
    _pillEls: [],

    /* ── init ── */
    async init(opts = {}){
      if(opts.treasury)  this.treasury = opts.treasury;
      if(opts.apiBase)   this.apiBase  = opts.apiBase;
      _fetchCatalog();
      // Detect extension (does NOT prompt). Mobile/no-extension → 'sdk-web' marker.
      for(let i=0;i<8;i++){
        if(typeof window!=='undefined' && window.kleverWeb){ this.provider='extension'; break; }
        await new Promise(r=>setTimeout(r,250));
      }
      if(!this.provider) this.provider = isMobile() ? 'sdk-web' : null;

      // Auto-mount any element the page tagged.
      document.querySelectorAll('[data-klever-pill]').forEach(el=>this.mountConnectPill(el));

      // Re-render on visibility (extension state can change while tabbed away)
      document.addEventListener('visibilitychange', ()=>{ if(document.visibilityState==='visible' && this.connected) this.balance({refresh:true}); });

      return this.provider;
    },

    /* ── lazy-load SDK for mobile path ── */
    async _ensureSDK(){
      if(this._sdk) return this._sdk;
      if(window.kleverSDK){ this._sdk = window.kleverSDK; return this._sdk; }
      return new Promise((resolve, reject)=>{
        const s = document.createElement('script');
        s.src = KLEVER_SDK_CDN; s.async = true;
        s.onload = ()=>{ this._sdk = window.kleverSDK || window['@klever/sdk-web'] || null; resolve(this._sdk); };
        s.onerror = ()=>reject(new Error('Klever SDK CDN load failed'));
        document.head.appendChild(s);
        setTimeout(()=>reject(new Error('Klever SDK CDN timeout')), 10000);
      });
    },

    /* ── connect ── */
    async connect(){
      if(this.connected || this.busy) return this.address;
      this.busy = true; this._renderPills();
      _toast('Connecting to Klever wallet…');
      try{
        await Promise.race([
          this._connectInner(),
          new Promise((_,rej)=>setTimeout(()=>rej(new Error('Connect timed out')), 12000)),
        ]);
        _toast('✅ Connected · '+_abbr(this.address), 'ok');
        _emit('connect', { address:this.address, provider:this.provider });
        this.balance({ refresh:true });
        return this.address;
      }catch(err){
        this.connected = false; this.address = null;
        _toast('❌ '+(err && err.message ? err.message : 'Connect failed'), 'err', 3600);
        _emit('error', { op:'connect', error: String(err && err.message || err) });
        throw err;
      }finally{
        this.busy = false; this._renderPills();
      }
    },
    async _connectInner(){
      if(window.kleverWeb){
        this.provider = 'extension';
        if(typeof window.kleverWeb.initialize === 'function') await window.kleverWeb.initialize();
        const addr = window.kleverWeb.address || (window.kleverWeb.getWalletAddress && await window.kleverWeb.getWalletAddress());
        if(!addr) throw new Error('Extension returned no address');
        this.address = addr; this.connected = true; return;
      }
      const sdk = await this._ensureSDK();
      if(!sdk) throw new Error('Open in Klever app or install the Klever extension');
      const prov = sdk.web || sdk.WebProvider || sdk.default || sdk;
      if(prov && typeof prov.initialize === 'function'){
        await prov.initialize({ node: KLEVER_NODE_URL, api: KLEVER_API_URL });
      }
      const addr = (prov && prov.getWalletAddress && await prov.getWalletAddress())
                || (prov && prov.address)
                || (window.kleverWeb && window.kleverWeb.address);
      if(!addr) throw new Error('Mobile sign-in cancelled');
      this.address = addr; this.provider = 'sdk-web'; this.connected = true;
    },

    async disconnect(){
      this.address = null; this.connected = false; this._balance = 0; this._balanceTs = 0;
      _toast('Disconnected · demo mode');
      _emit('disconnect', {});
      this._renderPills();
    },

    /* ── live balance (cached 30s) ── */
    async balance({ refresh = false } = {}){
      if(!this.connected || !this.address) return 0;
      const now = Date.now();
      if(!refresh && this._balance && (now - this._balanceTs) < 30000) return this._balance;
      if(this._balanceP) return this._balanceP;
      this._balanceP = (async ()=>{
        try{
          const r = await fetch(`${KLEVER_API_URL}/v1.0/address/${this.address}`);
          if(!r.ok) throw new Error('balance http '+r.status);
          const j = await r.json();
          const base = (j && j.data && j.data.account && (j.data.account.balance || j.data.account.Balance)) || 0;
          const klv = Math.floor(base/1e6);
          this._balance = klv; this._balanceTs = Date.now();
          _emit('balance', { klv, address:this.address });
          this._renderPills();
          return klv;
        }catch(e){
          try{
            const r2 = await fetch(`${KLEVER_NODE_URL}/address/${this.address}/balance`);
            const j2 = await r2.json();
            const klv = Math.floor(((j2 && j2.balance)||0)/1e6);
            this._balance = klv; this._balanceTs = Date.now();
            _emit('balance', { klv, address:this.address });
            this._renderPills();
            return klv;
          }catch(e2){ return this._balance; }
        }finally{ this._balanceP = null; }
      })();
      return this._balanceP;
    },

    /* ── transfer KLV (TransferContract type 0; memo base64'd by SDK) ── */
    async transferKLV(to, amountKLV, memo = ''){
      if(!this.connected) throw new Error('Wallet not connected');
      if(!to || to.indexOf('REPLACE_ME')>=0) throw new Error('Treasury address not configured');
      if(!(amountKLV > 0)) throw new Error('Invalid amount');
      const baseAmount = Math.round(amountKLV * 1e6);
      const payload = { amount: baseAmount, receiver: to, assetId: 'KLV' };
      if(memo){ try{ payload.data = [btoa(unescape(encodeURIComponent(memo)))]; }catch(e){ payload.data = [btoa(memo)]; } }
      const tx = { type: 0, payload };
      let res;
      if(this.provider === 'extension' && window.kleverWeb && typeof window.kleverWeb.broadcastTransactions === 'function'){
        res = await window.kleverWeb.broadcastTransactions([tx]);
      } else if(this.provider === 'sdk-web' && this._sdk){
        const prov = this._sdk.web || this._sdk.WebProvider || this._sdk.default || this._sdk;
        if(prov && typeof prov.broadcastTransactions === 'function') res = await prov.broadcastTransactions([tx]);
        else if(prov && typeof prov.send === 'function')             res = await prov.send(tx);
        else throw new Error('No broadcast path available on SDK');
      } else throw new Error('No broadcast path available');
      const txHash = (res && (res.hash || (res.data && res.data.hash) || (res[0] && res[0].hash))) || null;
      // refresh cached balance
      this._balanceTs = 0; this.balance({ refresh:true });
      return { txHash, raw: res };
    },

    /* ── arbitrary message signing (provably-fair RNG seed, etc.) ── */
    async signMessage(text){
      if(!this.connected) throw new Error('Wallet not connected');
      if(this.provider === 'extension' && window.kleverWeb && typeof window.kleverWeb.signMessage === 'function'){
        return await window.kleverWeb.signMessage(text);
      }
      if(this.provider === 'sdk-web' && this._sdk){
        const prov = this._sdk.web || this._sdk.WebProvider || this._sdk.default || this._sdk;
        if(prov && typeof prov.signMessage === 'function') return await prov.signMessage(text);
      }
      throw new Error('signMessage not available');
    },

    /* ── buy a per-game upgrade ── */
    async buyUpgrade(gameId, upgradeId, costKLV, meta = {}){
      if(!this.connected){
        _toast('Connect wallet to purchase upgrades', 'err');
        throw new Error('Wallet not connected');
      }
      // 1. validate against catalog
      const cat = await _fetchCatalog();
      const list = cat[gameId] || [];
      const def  = list.find(u=>u.id===upgradeId);
      if(!def)            throw new Error(`Unknown upgrade: ${gameId}/${upgradeId}`);
      if(def.cost!==costKLV) throw new Error(`Cost mismatch for ${upgradeId}: expected ${def.cost} KLV`);

      // 2. memo
      const memo = JSON.stringify({ g:gameId, u:upgradeId, m:meta, t:Date.now() });

      // 3. broadcast
      _toast(`Sending ${costKLV} KLV → treasury…`);
      const tx = await this.transferKLV(this.treasury, costKLV, memo);

      // 4. tell backend to verify + persist
      let receipt = { ok:true, gameId, upgradeId, txHash: tx.txHash, address: this.address, meta, costKLV, ts: Date.now(), pending: true };
      try{
        const r = await fetch(`${this.apiBase}/upgrade`, {
          method:'POST', headers:{'content-type':'application/json'},
          body: JSON.stringify({ gameId, upgradeId, txHash: tx.txHash, address: this.address, meta, costKLV }),
        });
        const j = await r.json().catch(()=>({}));
        if(r.ok && j && j.ok){ receipt = j.receipt || receipt; receipt.pending = false; _toast('✅ Upgrade granted', 'ok'); }
        else if(r.status === 503){ _toast('Upgrade pending — backend KV not yet bound', 'err', 4200); receipt.pending = true; receipt.note = j && j.error || 'KV not bound'; }
        else                     { _toast('⚠ '+(j && j.error || 'verify failed — keep tx hash'), 'err', 4200); receipt.pending = true; receipt.note = j && j.error || 'verify failed'; }
      }catch(e){
        _toast('Upgrade saved locally; backend unreachable', 'err', 4200);
        receipt.pending = true; receipt.note = String(e && e.message || e);
      }

      _emit('upgrade', { gameId, upgradeId, txHash: tx.txHash, meta, receipt });
      return receipt;
    },

    /* ── list owned upgrades for current address ── */
    async getUpgrades(gameId = null){
      if(!this.connected || !this.address) return [];
      const url = `${this.apiBase}/upgrades/${this.address}` + (gameId ? `?game=${encodeURIComponent(gameId)}` : '');
      try{
        const r = await fetch(url);
        const j = await r.json().catch(()=>([]));
        return Array.isArray(j) ? j : (j.items || []);
      }catch(e){ return []; }
    },

    /* ── small generic bet (casino games) ── */
    async placeBet(gameId, amountKLV){
      const memo = JSON.stringify({ g:gameId, type:'bet', t:Date.now() });
      return await this.transferKLV(this.treasury, amountKLV, memo);
    },

    /* ── subscribe ── */
    on(evt, fn){ _on(evt, fn); return this; },

    /* ── UI: connect pill ── */
    mountConnectPill(targetEl){
      if(!targetEl) return;
      if(this._pillEls.indexOf(targetEl) === -1) this._pillEls.push(targetEl);
      this._renderPills();
    },
    _renderPills(){
      this._pillEls.forEach(el=>{
        const connected = this.connected;
        const bal = this._balance || 0;
        el.innerHTML = '';
        el.style.display = 'inline-flex';
        el.style.gap = '8px';
        el.style.alignItems = 'center';
        if(connected){
          const bchip = document.createElement('span');
          bchip.className = 'kc-bal'; bchip.textContent = '💎 ' + bal + ' KLV';
          el.appendChild(bchip);
          const pill = document.createElement('span');
          pill.className = 'kc-pill kc-connected' + (this.busy?' kc-busy':'');
          pill.innerHTML = `<span class="kc-dot"></span><span class="kc-addr">${_abbr(this.address)}</span><span class="kc-disc" title="Disconnect">✕</span>`;
          pill.querySelector('.kc-disc').addEventListener('click', e=>{ e.stopPropagation(); this.disconnect(); });
          el.appendChild(pill);
        }else{
          const pill = document.createElement('button');
          pill.className = 'kc-pill' + (this.busy?' kc-busy':'');
          pill.innerHTML = `<span class="kc-dot"></span><span>${this.busy?'Connecting…':'Connect Klever'}</span>`;
          pill.addEventListener('click', ()=>{ if(!this.busy) this.connect().catch(()=>{}); });
          el.appendChild(pill);
        }
      });
    },
  };

  window.KleverController = Controller;

  /* ── auto-init on DOMContentLoaded ── */
  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', ()=>Controller.init().catch(()=>{}));
  } else {
    Controller.init().catch(()=>{});
  }

})();

/* ─── VIP TIERS / LEADERBOARD (added 2026-05-09) ─── */
KleverController.VIP_TIERS = [
  { min:0,    level:0,    name:'Visitor',  color:'#7a7a7a', glyph:'·' },
  { min:1,    level:1,    name:'Bronze',   color:'#cd7f32', glyph:'●' },
  { min:5,    level:5,    name:'Silver',   color:'#c0c0c0', glyph:'◆' },
  { min:10,   level:10,   name:'Gold',     color:'#ffd700', glyph:'★' },
  { min:50,   level:50,   name:'Platinum', color:'#e5e4e2', glyph:'✦' },
  { min:100,  level:100,  name:'Diamond',  color:'#b9f2ff', glyph:'♦' },
  { min:500,  level:500,  name:'Obsidian', color:'#3d2b56', glyph:'⬢' },
  { min:1000, level:1000, name:'Founder',  color:'#c084fc', glyph:'♛' },
];
KleverController.tierFor = function(spent){
  let t = KleverController.VIP_TIERS[0];
  for (const x of KleverController.VIP_TIERS) if (spent >= x.min) t = x;
  return t;
};
KleverController.levelFor = function(spent){ return Math.floor((spent||0)/100); };
KleverController.vipFor = async function(address){
  if(!address) return null;
  try{ const r=await fetch('/api/vip/'+address); if(!r.ok) return null; return await r.json(); }
  catch(e){ return null; }
};
KleverController.leaderboard = async function(limit, offset){
  limit = limit || 50; offset = offset || 0;
  try{ const r=await fetch('/api/leaderboard?limit='+limit+'&offset='+offset); if(!r.ok) return {entries:[],updatedAt:0}; return await r.json(); }
  catch(e){ return {entries:[],updatedAt:0}; }
};
KleverController.mountVipBadge = function(targetEl){
  if(!targetEl) return;
  const render = async () => {
    const addr = KleverController.address || null;
    const totalSpent = KleverController._localSpend || 0;
    let info = null;
    if (addr) info = await KleverController.vipFor(addr);
    const spent = (info && info.totalSpent) || totalSpent || 0;
    const tier = (info && info.tier) || KleverController.tierFor(spent);
    const level = (info && info.level) || KleverController.levelFor(spent);
    targetEl.innerHTML = '<span class="vip-glyph" style="color:'+tier.color+'">'+tier.glyph+'</span>'
      + '<span class="vip-name">'+tier.name+'</span>'
      + '<span class="vip-level">Lv '+level+'</span>'
      + '<span class="vip-spent">'+(spent.toLocaleString())+' KLV</span>';
    targetEl.title = 'Click for global leaderboard';
    targetEl.style.cursor = 'pointer';
  };
  targetEl.onclick = async () => {
    const lb = await KleverController.leaderboard(50);
    KleverController._renderLeaderboardModal(lb);
  };
  render();
  if (KleverController._vipTimer) clearInterval(KleverController._vipTimer);
  KleverController._vipTimer = setInterval(render, 30000);
  document.addEventListener('klever:connected', render);
  document.addEventListener('klever:disconnected', render);
  KleverController._renderVip = render;
};
KleverController._renderLeaderboardModal = function(lb){
  let m = document.getElementById('vip-lb-modal');
  if (m) m.remove();
  m = document.createElement('div');
  m.id='vip-lb-modal';
  m.style.cssText='position:fixed;inset:0;background:rgba(0,0,0,.85);z-index:9999;display:flex;align-items:center;justify-content:center;font-family:Rajdhani,sans-serif;';
  const me = (KleverController.address||'').toLowerCase();
  let rows = (lb.entries||[]).map(function(e){
    const hi = e.address && e.address.toLowerCase()===me ? 'background:#1a3a5a;' : '';
    return '<tr style="'+hi+'"><td>'+e.rank+'</td><td>'+e.addressShort+'</td><td style="color:'+(e.tier&&e.tier.color||'#fff')+'">'+(e.tier&&e.tier.glyph||'')+' '+(e.tier&&e.tier.name||'')+'</td><td>'+e.level+'</td><td>'+e.totalSpent.toLocaleString()+'</td></tr>';
  }).join('');
  if(!rows) rows='<tr><td colspan="5" style="text-align:center;padding:20px;opacity:.6">Leaderboard warming up — be the first to upgrade.</td></tr>';
  m.innerHTML='<div style="background:#0f1419;border:1px solid #2a3540;border-radius:12px;padding:24px;max-width:720px;width:90%;max-height:80vh;overflow:auto;color:#e0e0e0">'
    +'<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px"><h2 style="margin:0;font-family:\'Cinzel Decorative\',serif;color:#ffd700">GLOBAL VIP LEADERBOARD</h2><button onclick="this.closest(\'#vip-lb-modal\').remove()" style="background:none;border:1px solid #555;color:#fff;padding:4px 10px;cursor:pointer">✕</button></div>'
    +'<table style="width:100%;border-collapse:collapse"><thead><tr style="border-bottom:1px solid #2a3540;text-align:left"><th style="padding:8px">RANK</th><th>PLAYER</th><th>TIER</th><th>LEVEL</th><th>KLV SPENT</th></tr></thead><tbody>'+rows+'</tbody></table>'
    +'</div>';
  m.onclick = function(ev){ if(ev.target===m) m.remove(); };
  document.body.appendChild(m);
};
// Hook into buyUpgrade to track local spend
(function(){
  const orig = KleverController.buyUpgrade;
  if (orig && !KleverController._buyWrapped){
    KleverController._buyWrapped = true;
    KleverController.buyUpgrade = async function(gameId, upgradeId, costKLV, meta){
      const r = await orig.call(KleverController, gameId, upgradeId, costKLV, meta);
      if (r && r.ok){ KleverController._localSpend = (KleverController._localSpend||0) + (costKLV||0); if (KleverController._renderVip) KleverController._renderVip(); }
      return r;
    };
  }
})();

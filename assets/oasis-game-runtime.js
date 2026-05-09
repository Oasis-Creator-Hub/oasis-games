/* ╔══════════════════════════════════════════════════════════════════╗
   ║ Oasis · Game-Page Runtime                                        ║
   ║ Provides the SAME globals every G_* function in the original     ║
   ║ arcade depended on: W, SFX, sparks, flash, ctx2, turnFlash,      ║
   ║ showModal, mkCard, RARSYM, RARCLS, pick/rng/clamp/uid/shuffle.   ║
   ║                                                                  ║
   ║ Loaded by every /games/<id>.html.                                ║
   ║ Strict-mode safe; idempotent across reloads.                     ║
   ╚══════════════════════════════════════════════════════════════════╝ */
'use strict';

/* ─── WALLET (local "demo" shadow; KleverController bridges to chain) ─── */
window.W = window.W || {
  klv: 1000, nft: 0, wins: 0, streak: 0,
  earn(n){ this.klv += n; updW(); if(n>0) ctx2('+'+n+' KLV','#c9a84c'); },
  spend(n){ if(this.klv < n) return false; this.klv -= n; updW(); return true; },
  mint(){ this.nft++; updW(); },
  win(){ this.wins++; this.streak++; updW(); },
  lose(){ this.streak = 0; updW(); },
};

window.updW = function updW(){
  const k = document.getElementById('wKlv'); if(k) k.textContent = W.klv;
  const n = document.getElementById('wNft'); if(n) n.textContent = W.nft;
  const s = document.getElementById('wStr'); if(s) s.textContent = W.streak;
  const nk= document.getElementById('navKlv'); if(nk)nk.textContent= W.klv;
};

/* ─── WEB AUDIO (pure synth — no asset files) ─── */
let _ac = null;
function getAC(){ if(!_ac) try{ _ac = new (window.AudioContext||window.webkitAudioContext)(); }catch(e){} return _ac; }
function tone(f,t,d,v,delay=0){
  const a=getAC(); if(!a) return;
  const o=a.createOscillator(), g=a.createGain();
  o.connect(g); g.connect(a.destination);
  o.type=t; o.frequency.value=f;
  const s=a.currentTime+delay;
  g.gain.setValueAtTime(0,s);
  g.gain.linearRampToValueAtTime(v,s+.01);
  g.gain.exponentialRampToValueAtTime(.001,s+d);
  o.start(s); o.stop(s+d+.05);
}
function nz(d,v=.15,delay=0){
  const a=getAC(); if(!a) return;
  const b=a.createBuffer(1,a.sampleRate*d,a.sampleRate);
  const da=b.getChannelData(0);
  for(let i=0;i<da.length;i++) da[i] = Math.random()*2-1;
  const s=a.createBufferSource(), g=a.createGain();
  s.buffer=b; s.connect(g); g.connect(a.destination);
  const t=a.currentTime+delay;
  g.gain.setValueAtTime(v,t);
  g.gain.exponentialRampToValueAtTime(.001,t+d);
  s.start(t);
}
window.SFX = {
  click(){tone(660,'sine',.07,.06);},
  play(){tone(440,'sine',.14,.1);tone(660,'sine',.1,.07,.06);tone(880,'sine',.07,.05,.1);},
  attack(){nz(.08,.25);tone(180,'sawtooth',.14,.15,.03);},
  hit(){nz(.1,.28);tone(80,'square',.17,.2,.02);},
  destroy(){nz(.2,.28);tone(200,'sawtooth',.28,.14);tone(100,'sawtooth',.38,.1,.06);},
  heal(){tone(523,'sine',.14,.1);tone(659,'sine',.14,.1,.07);tone(784,'sine',.18,.1,.13);},
  spell(){tone(800,'sine',.06,.12);tone(1000,'sine',.08,.1,.04);tone(1200,'sine',.1,.08,.08);nz(.05,.08,.08);},
  draw(){tone(660,'sine',.07,.08);tone(880,'sine',.06,.06,.06);},
  coin(){tone(880,'sine',.12,.15);tone(1100,'sine',.1,.1,.05);},
  win(){[523,659,784,1047].forEach((f,i)=>tone(f,'sine',.4,.15,i*.12));},
  lose(){[300,260,220,180].forEach((f,i)=>tone(f,'sawtooth',.4,.12,i*.15));},
  slot(){nz(.05,.2);tone(440,'square',.07,.1);},
  reel(){tone(300+Math.random()*200,'sawtooth',.05,.07);},
  levelup(){[392,494,587,784].forEach((f,i)=>tone(f,'sine',.24,.15,i*.08));},
  buy(){tone(523,'sine',.1,.1);tone(784,'sine',.14,.12,.07);tone(1047,'sine',.18,.1,.13);},
  match(){tone(700,'sine',.12,.12);tone(900,'sine',.1,.1,.05);},
  buzz(){nz(.12,.28);tone(120,'sawtooth',.14,.2);},
  tick(){tone(1200,'sine',.04,.07);},
  fanfare(){[523,659,784,1047,1319].forEach((f,i)=>tone(f,'sine',.45,.16,i*.09));},
};

/* ─── BG + FX canvases ─── */
const bgCV = document.getElementById('bgC'), bgX = bgCV ? bgCV.getContext('2d') : null;
let bgT = 0;
function resizeBg(){ if(bgCV){ bgCV.width=innerWidth; bgCV.height=innerHeight; } }
resizeBg(); addEventListener('resize', resizeBg);
const STARS = Array.from({length:140}, ()=>({x:Math.random(),y:Math.random(),r:.4+Math.random()*1.4,s:.001+Math.random()*.003}));
function drawBg(){
  if(!bgX) return;
  const W = bgCV.width, H = bgCV.height;
  bgX.clearRect(0,0,W,H);
  const gr = bgX.createRadialGradient(W/2,H/2,0,W/2,H/2,W*.9);
  gr.addColorStop(0,'#100818'); gr.addColorStop(.5,'#09060e'); gr.addColorStop(1,'#07050a');
  bgX.fillStyle=gr; bgX.fillRect(0,0,W,H);
  bgX.save();
  bgX.globalAlpha = .05+.015*Math.sin(bgT*.4);
  const g1 = bgX.createRadialGradient(W*.15,H*.2,0,W*.15,H*.2,W*.5);
  g1.addColorStop(0,'#8b1a1a'); g1.addColorStop(1,'transparent');
  bgX.fillStyle=g1; bgX.fillRect(0,0,W,H);
  bgX.globalAlpha = .04+.01*Math.sin(bgT*.35+2);
  const g2 = bgX.createRadialGradient(W*.85,H*.75,0,W*.85,H*.75,W*.5);
  g2.addColorStop(0,'#3b0764'); g2.addColorStop(1,'transparent');
  bgX.fillStyle=g2; bgX.fillRect(0,0,W,H);
  bgX.restore();
  STARS.forEach(s=>{
    const a = .2+.5*Math.sin(bgT*s.s*20+s.x*50);
    bgX.beginPath(); bgX.arc(s.x*W, s.y*H, s.r, 0, Math.PI*2);
    bgX.fillStyle = `rgba(255,230,180,${a})`; bgX.fill();
  });
  bgT += .016;
}

const fxCV = document.getElementById('fxC'), fxX = fxCV ? fxCV.getContext('2d') : null;
function resizeFx(){ if(fxCV){ fxCV.width=innerWidth; fxCV.height=innerHeight; } }
resizeFx(); addEventListener('resize', resizeFx);
const PARTS = []; let FLASH = { a:0, c:'rgba(255,255,255,1)' };
window.sparks = function(x,y,color,n=12,spd=5){ for(let i=0;i<n;i++){ const a=Math.random()*Math.PI*2, s=spd*(.4+Math.random()); PARTS.push({x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s,r:2+Math.random()*3.5,life:1,dec:.025+Math.random()*.04,c:color}); } };
window.flash = function(c, a=.28){ FLASH = { a, c }; };
function drawFx(){
  if(!fxX) return;
  const W = fxCV.width, H = fxCV.height;
  fxX.clearRect(0,0,W,H);
  if(FLASH.a > 0){
    fxX.fillStyle = FLASH.c; fxX.globalAlpha = FLASH.a; fxX.fillRect(0,0,W,H);
    FLASH.a *= .8; if(FLASH.a < .005) FLASH.a = 0; fxX.globalAlpha = 1;
  }
  for(let i=PARTS.length-1; i>=0; i--){
    const p = PARTS[i];
    p.x += p.vx; p.y += p.vy; p.vy += .18; p.life -= p.dec;
    if(p.life <= 0){ PARTS.splice(i,1); continue; }
    fxX.save(); fxX.globalAlpha = p.life; fxX.fillStyle = p.c;
    fxX.beginPath(); fxX.arc(p.x, p.y, p.r*p.life, 0, Math.PI*2); fxX.fill(); fxX.restore();
  }
}

/* MAIN LOOP — also drives the active game's optional .tick() */
window.AGAME = null;
function loop(){ drawBg(); drawFx(); if(window.AGAME && window.AGAME.tick) window.AGAME.tick(); requestAnimationFrame(loop); }
loop();

/* ─── HELPERS ─── */
window.uid     = function uid(){ return Math.random().toString(36).slice(2); };
window.rng     = function rng(n){ return 0|Math.random()*n; };
window.pick    = function pick(a){ return a[rng(a.length)]; };
window.shuffle = function shuffle(a){ const b=[...a]; for(let i=b.length-1;i>0;i--){ const j=0|Math.random()*(i+1); [b[i],b[j]]=[b[j],b[i]]; } return b; };
window.clamp   = function clamp(v,lo,hi){ return Math.max(lo, Math.min(hi, v)); };

window.ctx2 = function ctx2(txt, color='#c9a84c'){
  const el = document.createElement('div');
  el.className = 'ctx'; el.textContent = txt;
  el.style.cssText = `color:${color};left:${25+Math.random()*45}vw;top:${20+Math.random()*30}vh;text-shadow:0 0 10px ${color};`;
  document.body.appendChild(el);
  setTimeout(()=>el.remove(), 1300);
};

window.turnFlash = function turnFlash(txt, color='#c9a84c'){
  const w = document.createElement('div'); w.className = 'tfl';
  const s = document.createElement('span'); s.className = 'tft'; s.textContent = txt;
  s.style.cssText = `color:${color};text-shadow:0 0 22px ${color};`;
  w.appendChild(s); document.body.appendChild(w);
  setTimeout(()=>w.remove(), 1500);
};

window.showModal = function showModal(title, body, btns=[]){
  const t = document.getElementById('gMT'), b = document.getElementById('gMB'), bc = document.getElementById('gMBtns');
  if(t) t.textContent = title;
  if(b) b.innerHTML = body;
  if(bc){ bc.innerHTML=''; btns.forEach(btn=>{ const el=document.createElement('button'); el.className='gbtn'+(btn.pr?' pr':''); el.textContent=btn.label; el.onclick=()=>{ closeModal(); btn.fn(); }; bc.appendChild(el); }); }
  const m = document.getElementById('gModal'); if(m) m.classList.add('on');
};
window.closeModal = function closeModal(){ const m = document.getElementById('gModal'); if(m) m.classList.remove('on'); };

window.tipOn = function tipOn(el, html){
  el.addEventListener('mouseenter', e=>{ const t=document.getElementById('tt'); if(!t) return; t.style.display='block'; t.innerHTML=html; moveTip(e); });
  el.addEventListener('mouseleave', ()=>{ const t=document.getElementById('tt'); if(t) t.style.display='none'; });
};
function moveTip(e){ const t=document.getElementById('tt'); if(!t) return; t.style.left = Math.min(e.clientX+13, innerWidth-195)+'px'; t.style.top = Math.min(e.clientY+13, innerHeight-115)+'px'; }
document.addEventListener('mousemove', e=>{ const t=document.getElementById('tt'); if(t && t.style.display==='block') moveTip(e); });

/* ─── SHARED CARD BUILDER ─── */
window.RARSYM = { common:'●', rare:'◆', epic:'★', legendary:'♛' };
window.RARCLS = { common:'rco', rare:'rcr', epic:'rce', legendary:'rcl' };
window.mkCard = function mkCard(c){
  const d = document.createElement('div');
  d.className = `kc kc-${c.type}`;
  d.innerHTML = `<div class="kcc">${c.cost}</div>
    <div class="kcr ${RARCLS[c.rar]||'rco'}">${RARSYM[c.rar]||'●'}</div>
    <div class="kca">${c.e}</div>
    <div class="kcn">${c.name}</div>
    ${c.type!=='spell' ? `<div class="kcs"><span class="ka">⚔${c.atk}</span><span class="kd">🛡${c.def}</span></div>` : `<div style="text-align:center;font-size:.42rem;color:var(--ar);">SPELL</div>`}`;
  return d;
};

/* ─── back-to-arcade glue (per-page) ─── */
window.backToLauncher = function backToLauncher(){
  SFX.click();
  if(window.AGAME && window.AGAME.destroy) try{ window.AGAME.destroy(); }catch(e){}
  window.AGAME = null;
  window.location.href = '/games/';
};

/* ─── Per-game UPGRADE SHOP modal ──────────────────────────────────
 * Every game page has an "UPGRADES" button (rendered in the shell).
 * Clicking opens this modal — fetches the per-game catalog, lists
 * each upgrade, and buys via KleverController.buyUpgrade(...).
 * If wallet disconnected, uses demo W.spend fallback so the game
 * still works without a wallet.                                       */
let _upCatalogP = null;
function _loadUpgradeCatalog(){
  if(_upCatalogP) return _upCatalogP;
  _upCatalogP = fetch('/assets/games/upgrades.json',{cache:'force-cache'})
    .then(r=>r.ok?r.json():{})
    .catch(()=>({}));
  return _upCatalogP;
}

window.openUpgradeShop = async function openUpgradeShop(gameId){
  gameId = gameId || window.GAME_ID;
  if(!gameId) return;
  SFX.click();
  const cat = await _loadUpgradeCatalog();
  const list = (cat && cat[gameId]) || [];
  let owned = [];
  if(window.KleverController && KleverController.connected){
    try{ owned = await KleverController.getUpgrades(gameId); }catch(e){}
  }
  const ownedIds = new Set(owned.map(o=>o.upgradeId));

  // Build modal
  let m = document.getElementById('upShop');
  if(!m){
    m = document.createElement('div'); m.id='upShop'; m.className='kc-sign-modal';
    m.innerHTML = `<div class="kc-sign-box" style="max-width:500px;text-align:left;">
      <div class="kc-sign-title" id="upShopTitle" style="text-align:center;">⬆ UPGRADE SHOP</div>
      <div class="kc-sign-body" id="upShopStatus" style="text-align:center;font-size:.7rem;"></div>
      <div id="upShopList" style="display:flex;flex-direction:column;gap:8px;max-height:55vh;overflow-y:auto;"></div>
      <div class="kc-sign-actions"><button class="gbtn" id="upShopClose">Close</button></div>
    </div>`;
    document.body.appendChild(m);
    document.getElementById('upShopClose').addEventListener('click', ()=>m.classList.remove('kc-on'));
  }

  const status = document.getElementById('upShopStatus');
  const isConn = !!(window.KleverController && KleverController.connected);
  status.innerHTML = isConn
    ? `Connected · paying from <span style="color:var(--gold,#f59e0b);font-weight:700;">${KleverController.address.slice(0,7)}…${KleverController.address.slice(-5)}</span>`
    : `<span style="color:var(--cr,#e03333);">Not connected</span> · purchases run in demo mode (local KLV only)`;

  const wrap = document.getElementById('upShopList');
  wrap.innerHTML = '';
  if(!list.length){
    const d=document.createElement('div'); d.style.cssText='color:var(--dm,#4a3a2a);text-align:center;padding:14px;font-size:.7rem;'; d.textContent='No upgrades defined for this game yet.'; wrap.appendChild(d);
  }
  list.forEach(up=>{
    const row = document.createElement('div');
    row.style.cssText = 'display:flex;align-items:center;gap:10px;padding:9px 11px;background:rgba(0,0,0,.32);border:1px solid rgba(201,168,76,.18);border-radius:7px;';
    const txt = document.createElement('div');
    txt.style.cssText='flex:1;min-width:0;';
    txt.innerHTML = `<div style="font-family:'Cinzel',serif;font-size:.78rem;color:var(--g,#c9a84c);">${up.label}</div>
      <div style="font-size:.62rem;color:var(--md,#a08060);margin-top:2px;">${up.desc||''}</div>`;
    const btn = document.createElement('button');
    btn.className = 'gbtn pr'; btn.style.fontSize='.62rem'; btn.style.flexShrink='0';
    if(ownedIds.has(up.id)){
      btn.textContent = '✓ Owned'; btn.disabled = true; btn.classList.remove('pr');
    } else {
      btn.textContent = up.cost+' KLV';
      btn.addEventListener('click', async ()=>{
        btn.disabled = true; btn.textContent = '…';
        try{
          if(isConn){
            await KleverController.buyUpgrade(gameId, up.id, up.cost, {});
            btn.textContent = '✓ Owned'; btn.classList.remove('pr');
            ctx2('+'+up.label,'#22c55e');
            // Also reflect locally so the game can react
            try{ window.dispatchEvent(new CustomEvent('oasis:upgrade',{detail:{gameId,upgradeId:up.id,meta:{}}})); }catch(e){}
          } else {
            // demo fallback: local spend
            if(W.spend(up.cost)){
              btn.textContent = '✓ Demo'; btn.classList.remove('pr');
              ctx2('+'+up.label+' (demo)','#c9a84c');
              try{ window.dispatchEvent(new CustomEvent('oasis:upgrade',{detail:{gameId,upgradeId:up.id,meta:{},demo:true}})); }catch(e){}
            } else {
              btn.disabled = false; btn.textContent = up.cost+' KLV';
              ctx2('Need '+up.cost+' KLV','#e03333');
            }
          }
        }catch(e){
          btn.disabled = false; btn.textContent = up.cost+' KLV';
          ctx2('Failed: '+(e&&e.message||'error'),'#e03333');
        }
      });
    }
    row.appendChild(txt); row.appendChild(btn); wrap.appendChild(row);
  });

  m.classList.add('kc-on');
};

/* ─── boot the per-game function (set window.OASIS_GAME_FN before load) ─── */
window.addEventListener('DOMContentLoaded', ()=>{
  updW();
  if(typeof window.OASIS_GAME_FN === 'function'){
    const stage = document.getElementById('gc');
    if(stage){ try{ window.AGAME = window.OASIS_GAME_FN(stage); }catch(e){ console.error('Game init failed:', e); } }
  }
});

/* ─── reflect Klever wallet balance into W when controller fires events ─── */
addEventListener('klever:balance', e=>{
  const klv = e && e.detail && typeof e.detail.klv === 'number' ? e.detail.klv : null;
  if(klv != null){ W.klv = klv; updW(); }
});
addEventListener('klever:disconnect', ()=>{ /* keep last W.klv as demo balance */ });

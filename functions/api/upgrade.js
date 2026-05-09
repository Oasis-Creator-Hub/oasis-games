import { getUpgrade } from '../_lib/upgrades.js';
import { tierFor, levelFor } from '../_lib/vip.js';
import { recomputeLeaderboard } from '../_lib/leaderboard.js';

const TREASURY_FALLBACK = 'klv1m8l3mqh22mf64ypfa97cgn3pwsa72sdaycfffmr5mxgh4vumucsqmyvnrf';

const json = (data, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
  });

export const onRequestPost = async ({ request, env }) => {
  let body;
  try {
    body = await request.json();
  } catch (e) {
    return json({ ok: false, error: 'invalid_json' }, 400);
  }

  const { gameId, upgradeId, txHash, address, meta, costKLV } = body || {};
  if (!gameId || !upgradeId || !txHash || !address || typeof costKLV !== 'number') {
    return json({ ok: false, error: 'missing_fields' }, 400);
  }

  const cat = getUpgrade(gameId, upgradeId);
  if (!cat) return json({ ok: false, error: 'unknown_upgrade' }, 404);
  if (cat.cost !== costKLV) return json({ ok: false, error: 'price_mismatch', expected: cat.cost }, 400);

  const kv = env.OASIS_UPGRADES;
  if (!kv) return json({ ok: false, error: 'kv_not_bound' }, 500);

  // Idempotency
  const idemKey = `upgrade:${address}:${txHash}`;
  const prior = await kv.get(idemKey);
  if (prior) {
    try { return json(JSON.parse(prior)); } catch (e) { /* fall through */ }
  }

  // Verify tx on Klever explorer.
  const treasury = env.OASIS_TREASURY || TREASURY_FALLBACK;
  let tx;
  try {
    const r = await fetch(`https://api.mainnet.klever.org/v1.0/transaction/${encodeURIComponent(txHash)}`);
    if (!r.ok) return json({ ok: false, error: 'tx_lookup_failed', status: r.status }, 400);
    tx = await r.json();
  } catch (e) {
    return json({ ok: false, error: 'tx_fetch_error', detail: String(e) }, 502);
  }

  const data = (tx && (tx.data && tx.data.transaction)) || tx.transaction || tx.data || tx;
  const status = data && (data.status || data.txStatus);
  if (status !== 'success') return json({ ok: false, error: 'tx_not_success', status }, 400);

  // Validate receiver + amount across common Klever response shapes.
  const receiver =
    data.receiver ||
    (data.contract && data.contract[0] && (data.contract[0].parameter && (data.contract[0].parameter.receiver || data.contract[0].parameter.toAddress))) ||
    null;
  if (!receiver || receiver.toLowerCase() !== treasury.toLowerCase()) {
    return json({ ok: false, error: 'receiver_mismatch', got: receiver, expected: treasury }, 400);
  }
  const baseAmount =
    (typeof data.value === 'number' ? data.value : null) ??
    (data.contract && data.contract[0] && data.contract[0].parameter && data.contract[0].parameter.amount) ??
    null;
  const expected = costKLV * 1e6;
  if (baseAmount == null || Number(baseAmount) !== expected) {
    return json({ ok: false, error: 'amount_mismatch', got: baseAmount, expected }, 400);
  }

  // Persist receipt
  const receipt = {
    ok: true,
    gameId, upgradeId, costKLV, address, txHash,
    meta: meta || null,
    label: cat.label || '',
    timestamp: Date.now(),
  };

  await kv.put(idemKey, JSON.stringify({ ok: true, receipt }));
  await kv.put(`upgrade:${address}:${gameId}:${upgradeId}:${txHash}`, JSON.stringify(receipt));

  // Player address index
  const idxKey = `index:${address}`;
  let idx = [];
  const idxRaw = await kv.get(idxKey);
  if (idxRaw) { try { idx = JSON.parse(idxRaw) || []; } catch (e) {} }
  if (!idx.includes(txHash)) {
    idx.push(txHash);
    await kv.put(idxKey, JSON.stringify(idx));
  }

  // RMW spend total
  const spendKey = `spend:${address}`;
  const cur = parseInt((await kv.get(spendKey)) || '0', 10) || 0;
  const totalSpent = cur + costKLV;
  await kv.put(spendKey, String(totalSpent));

  // Recompute leaderboard cache
  try { await recomputeLeaderboard(kv, 50); } catch (e) { /* best effort */ }

  return json({
    ok: true,
    receipt,
    totalSpent,
    vipLevel: levelFor(totalSpent),
    vipTier: tierFor(totalSpent),
  });
};

import { tierFor, levelFor, nextTierFor } from '../../_lib/vip.js';

const json = (data, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
  });

export const onRequestGet = async ({ params, env }) => {
  const address = params.address;
  if (!address) return json({ ok: false, error: 'missing_address' }, 400);
  const kv = env.OASIS_UPGRADES;
  if (!kv) return json({ ok: false, error: 'kv_not_bound' }, 500);
  const totalSpent = parseInt((await kv.get(`spend:${address}`)) || '0', 10) || 0;
  const next = nextTierFor(totalSpent);
  return json({
    address,
    totalSpent,
    level: levelFor(totalSpent),
    tier: tierFor(totalSpent),
    nextTierAt: next ? next.min : null,
    nextTier: next,
  });
};

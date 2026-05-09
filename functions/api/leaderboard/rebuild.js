import { recomputeLeaderboard } from '../../_lib/leaderboard.js';

const json = (data, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
  });

export const onRequestPost = async ({ request, env }) => {
  const secret = request.headers.get('x-admin-secret');
  if (!env.ADMIN_SECRET || secret !== env.ADMIN_SECRET) {
    return json({ ok: false, error: 'forbidden' }, 403);
  }
  const kv = env.OASIS_UPGRADES;
  if (!kv) return json({ ok: false, error: 'kv_not_bound' }, 500);
  const lb = await recomputeLeaderboard(kv, 100);
  return json({ ok: true, count: lb.entries.length, updatedAt: lb.updatedAt });
};

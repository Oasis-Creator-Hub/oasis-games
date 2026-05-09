import { recomputeLeaderboard } from '../_lib/leaderboard.js';

const json = (data, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
  });

export const onRequestGet = async ({ request, env }) => {
  const kv = env.OASIS_UPGRADES;
  if (!kv) return json({ entries: [], updatedAt: 0, error: 'kv_not_bound' });
  const url = new URL(request.url);
  const limit = Math.min(parseInt(url.searchParams.get('limit') || '50', 10) || 50, 200);
  const offset = parseInt(url.searchParams.get('offset') || '0', 10) || 0;

  let cached;
  try {
    const raw = await kv.get('leaderboard');
    if (raw) cached = JSON.parse(raw);
  } catch (e) { /* fall through */ }

  if (!cached || !Array.isArray(cached.entries)) {
    cached = await recomputeLeaderboard(kv, Math.max(limit + offset, 50));
  }

  const entries = (cached.entries || []).slice(offset, offset + limit);
  return json({ entries, updatedAt: cached.updatedAt || 0 });
};

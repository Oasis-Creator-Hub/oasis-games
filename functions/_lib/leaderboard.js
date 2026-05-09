// Shared leaderboard recompute used by /api/upgrade and /api/leaderboard fallback.
import { tierFor, levelFor } from './vip.js';

export function shortenAddr(a) {
  if (!a) return '';
  if (a.length <= 14) return a;
  return a.slice(0, 8) + '…' + a.slice(-4);
}

export async function recomputeLeaderboard(kv, limit = 50) {
  const list = await kv.list({ prefix: 'spend:', limit: 1000 });
  const entries = [];
  for (const k of list.keys) {
    const v = await kv.get(k.name);
    const spent = parseInt(v || '0', 10) || 0;
    const address = k.name.slice('spend:'.length);
    entries.push({ address, totalSpent: spent });
  }
  entries.sort((a, b) => b.totalSpent - a.totalSpent);
  const top = entries.slice(0, limit).map((e, i) => ({
    rank: i + 1,
    address: e.address,
    addressShort: shortenAddr(e.address),
    totalSpent: e.totalSpent,
    level: levelFor(e.totalSpent),
    tier: tierFor(e.totalSpent),
  }));
  const payload = { entries: top, updatedAt: Date.now() };
  await kv.put('leaderboard', JSON.stringify(payload));
  return payload;
}

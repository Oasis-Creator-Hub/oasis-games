// GET /api/upgrades/:address?game=<gameId>
const json = (data, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
  });

export const onRequestGet = async ({ params, env, request }) => {
  const address = params.address;
  if (!address) return json({ ok: false, error: 'missing_address' }, 400);
  const kv = env.OASIS_UPGRADES;
  if (!kv) return json({ ok: false, error: 'kv_not_bound' }, 500);

  const url = new URL(request.url);
  const gameFilter = url.searchParams.get('game');

  const prefix = gameFilter ? `upgrade:${address}:${gameFilter}:` : `upgrade:${address}:`;
  const list = await kv.list({ prefix, limit: 500 });
  const items = [];
  for (const k of list.keys) {
    // Skip the idempotency keys (they have shape upgrade:<addr>:<txHash> with no colon-separated game)
    const tail = k.name.slice(`upgrade:${address}:`.length);
    // Idempotency keys are upgrade:<addr>:<txHash> — txHash has no further ':' so 1 segment.
    if (!gameFilter && tail.split(':').length < 3) continue;
    const v = await kv.get(k.name);
    if (!v) continue;
    try { items.push(JSON.parse(v)); } catch (e) {}
  }
  items.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
  return json({ ok: true, address, count: items.length, items });
};

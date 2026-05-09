const TREASURY_FALLBACK = 'klv1m8l3mqh22mf64ypfa97cgn3pwsa72sdaycfffmr5mxgh4vumucsqmyvnrf';

const json = (data, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
  });

export const onRequestGet = async ({ env }) => {
  const treasury = env.OASIS_TREASURY || TREASURY_FALLBACK;
  try {
    const r = await fetch(`https://api.mainnet.klever.org/v1.0/address/${encodeURIComponent(treasury)}/balance`);
    if (!r.ok) return json({ ok: false, error: 'lookup_failed', status: r.status }, 502);
    const data = await r.json();
    const balance =
      (data && data.data && data.data.balance) ??
      (data && data.balance) ??
      null;
    return json({ ok: true, address: treasury, balance, lastTxAt: Date.now(), raw: data });
  } catch (e) {
    return json({ ok: false, error: String(e) }, 502);
  }
};

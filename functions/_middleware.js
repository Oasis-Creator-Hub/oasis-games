// CORS + JSON helper middleware for /api/* routes.
export const onRequest = async (context) => {
  const { request } = context;

  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, x-admin-secret',
        'Access-Control-Max-Age': '86400',
      },
    });
  }

  context.data.json = (data, status = 200, extraHeaders = {}) =>
    new Response(JSON.stringify(data), {
      status,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'no-store',
        ...extraHeaders,
      },
    });

  const res = await context.next();
  // Mirror CORS on actual responses.
  const newHeaders = new Headers(res.headers);
  newHeaders.set('Access-Control-Allow-Origin', '*');
  return new Response(res.body, { status: res.status, headers: newHeaders });
};

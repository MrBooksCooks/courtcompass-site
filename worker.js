const ROBOTS = `User-agent: *
Allow: /
Sitemap: https://courtcompass.co.uk/sitemap.xml
`;

const SITEMAP = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://courtcompass.co.uk/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`;

const HTML_CACHE_KEY = 'https://courtcompass.co.uk/__html__';
const CACHE_TTL = 300; // 5 minutes

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (url.pathname === '/robots.txt') {
      return new Response(ROBOTS, {
        headers: { 'Content-Type': 'text/plain;charset=UTF-8' }
      });
    }

    if (url.pathname === '/sitemap.xml') {
      return new Response(SITEMAP, {
        headers: { 'Content-Type': 'application/xml;charset=UTF-8' }
      });
    }

    const cache = caches.default;
    const cacheKey = new Request(HTML_CACHE_KEY);

    let cached = await cache.match(cacheKey);
    if (cached) {
      return new Response(cached.body, {
        headers: cached.headers,
      });
    }

    const r = await fetch('https://raw.githubusercontent.com/MrBooksCooks/courtcompass-site/main/index.html');
    const html = await r.text();

    const response = new Response(html, {
      headers: {
        'Content-Type': 'text/html;charset=UTF-8',
        'Cache-Control': `public, max-age=${CACHE_TTL}`,
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'SAMEORIGIN',
        'Referrer-Policy': 'strict-origin-when-cross-origin',
        'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
        'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
      }
    });

    ctx.waitUntil(cache.put(cacheKey, response.clone()));
    return response;
  }
};

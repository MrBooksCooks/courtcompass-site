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

export default {
  async fetch(request) {
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

    const r = await fetch('https://raw.githubusercontent.com/MrBooksCooks/courtcompass-site/main/index.html');
    return new Response(await r.text(), {
      headers: {
        'Content-Type': 'text/html;charset=UTF-8',
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'SAMEORIGIN',
        'Referrer-Policy': 'strict-origin-when-cross-origin',
        'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
        'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
      }
    });
  }
};

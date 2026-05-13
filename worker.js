export default {
  async fetch() {
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

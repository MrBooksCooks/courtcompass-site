export default {
  async fetch() {
    const r = await fetch('https://raw.githubusercontent.com/MrBooksCooks/courtcompass-site/main/index.html');
    return new Response(await r.text(), { headers: { 'Content-Type': 'text/html;charset=UTF-8' } });
  }
};

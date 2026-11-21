document.getElementById('year').textContent = new Date().getFullYear();

/* ===== PRODUTOS =====
   Para cada produto, preencha quando tiver:
   commission    -> porcentagem de comissão (ex.: "70%")
   affiliateUrl  -> link de afiliação (Cakto, Hotmart, Kiwify...). Vazio = abre e-mail de solicitação
   materialsUrl  -> link da pasta de materiais. Vazio = botão some                                  */
const products = [
  {
    name: "Manual de Supervivencia",
    category: "Autonomia",
    status: "LATAM · Espanhol",
    image: "images/supervivencia.webp",
    commission: "Sob consulta",
    price: "US$ 9,90",
    market: "LATAM",
    description: "Guia digital com 101 projetos práticos de água, energia, alimentos e produção doméstica para preparar a casa contra a falta de luz, comida e água. Acompanha 5 bônus e é vendido em espanhol para toda a América Latina.",
    salesUrl: "https://saludbien.site/mds/",
    materialsUrl: "",
    affiliateUrl: ""
  },
  {
    name: "Activa360",
    category: "Saúde",
    status: "LATAM · Espanhol",
    image: "images/activa360.webp",
    commission: "Sob consulta",
    price: "US$ 17",
    market: "LATAM",
    description: "Kit digital com 6 módulos de exercícios e sessões prontas para profissionais que atendem idosos. Fisioterapeutas, educadores físicos e cuidadores param de improvisar e passam a seguir um roteiro claro. Garantia de 7 dias.",
    salesUrl: "https://saludbien.site/a360/",
    materialsUrl: "",
    affiliateUrl: ""
  },
  {
    name: "Protocolo de Desparasitação Articular",
    category: "Saúde",
    status: "LATAM · Espanhol",
    image: "images/desparasitacao.webp",
    commission: "Sob consulta",
    price: "US$ 9,90",
    market: "LATAM",
    description: "Protocolo de 9 dias para quem convive com dores nas articulações, com o guia de mobilidade em PDF, orientações de alimentação e acompanhamento. Pagamento único, vendido em espanhol para a América Latina.",
    salesUrl: "https://saludbien.site/pda/",
    materialsUrl: "",
    affiliateUrl: ""
  },
  {
    name: "Bíblia 3D",
    category: "Religioso",
    status: "LATAM · Espanhol",
    image: "images/biblia3d.webp",
    commission: "Sob consulta",
    price: "US$ 27",
    market: "LATAM",
    description: "Biblical World 3D reúne mais de 300 páginas visuais, mais de 100 mapas, reconstruções em 3D, um mapa bíblico interativo com cenas em vídeo e 6 volumes extras completos. Acesso imediato e garantia de 15 dias.",
    salesUrl: "https://saludbien.site/bw3d/",
    materialsUrl: "",
    affiliateUrl: ""
  }
];

const ARR = '<svg viewBox="0 0 256 256"><path d="M200,64V168a8,8,0,0,1-16,0V83.31L69.66,197.66a8,8,0,0,1-11.32-11.32L172.69,72H88a8,8,0,0,1,0-16H192A8,8,0,0,1,200,64Z"/></svg>';
const arrow = () => `<span class="arr" aria-hidden="true">${ARR}${ARR}</span>`;
const roll = (t) => `<span class="roll"><span>${t}</span><span aria-hidden="true">${t}</span></span>`;
const esc = (t) => String(t).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

/* botões fixos da página ganham o texto que rola */
document.querySelectorAll('[data-roll]').forEach((b) => { const t = b.textContent.trim(); b.innerHTML = roll(esc(t)) + arrow(); });

const grid = document.getElementById('catalogo');
grid.innerHTML = products.map((p, i) => `
  <button type="button" class="card rv" data-i="${i}" style="transition-delay:${i * 90}ms" aria-label="Ver informações de ${esc(p.name)}">
    <div class="media">
      <img src="${p.image}" alt="" loading="lazy">
      <div class="tags"><span class="tag tag-cat">${esc(p.category)}</span><span class="tag tag-st">${esc(p.status)}</span></div>
      <div class="name"><h3>${esc(p.name)}</h3><p>${esc(p.price)}</p></div>
    </div>
    <div class="foot"><span>Informações</span><span class="go">${arrow()}</span></div>
  </button>`).join('');

/* modal */
const modal = document.getElementById('modal');
const sheet = document.getElementById('sheet');
let lastFocus = null;

function openModal(p) {
  const affiliate = p.affiliateUrl || `mailto:suporte@axrdigital.com.br?subject=${encodeURIComponent('Solicitação de afiliação - ' + p.name)}`;
  const ext = (u) => (u.startsWith('http') ? ' target="_blank" rel="noopener"' : '');
  sheet.innerHTML = `
    <button type="button" class="close" data-close aria-label="Fechar"><svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6 6 18"/></svg></button>
    <div class="sheet-grid">
      <div class="sheet-media"><img src="${p.image}" alt="${esc(p.name)}"><div class="name"><h3>${esc(p.name)}</h3><p>${esc(p.category)}</p></div></div>
      <div class="sheet-body">
        <div><span class="lbl">Sobre o ativo</span><p class="desc">${esc(p.description)}</p></div>
        <div class="stats">
          <div class="stat hot"><span class="lbl">Comissão</span><b>${esc(p.commission)}</b></div>
          <div class="stat"><span class="lbl">Ticket</span><b>${esc(p.price)}</b></div>
          <div class="stat"><span class="lbl">Mercado</span><b>${esc(p.market)}</b></div>
        </div>
        <div class="actions">
          <a class="btn btn-fill btn-full" href="${p.salesUrl}"${ext(p.salesUrl)}>${roll('Ver página de vendas')}${arrow()}</a>
          ${p.materialsUrl ? `<a class="btn btn-ghost btn-full" href="${p.materialsUrl}"${ext(p.materialsUrl)}>${roll('Acessar materiais')}${arrow()}</a>` : ''}
          <a class="btn btn-ghost btn-full" href="${affiliate}"${ext(affiliate)}>${roll('Solicitar afiliação')}${arrow()}</a>
          <button type="button" class="back" data-close>Voltar</button>
        </div>
      </div>
    </div>`;
  lastFocus = document.activeElement;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  setTimeout(() => sheet.querySelector('.close').focus(), 50);
}

function closeModal() {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  if (lastFocus) lastFocus.focus();
}

grid.addEventListener('click', (e) => { const c = e.target.closest('.card'); if (c) openModal(products[Number(c.dataset.i)]); });
modal.addEventListener('click', (e) => { if (e.target.closest('[data-close]')) closeModal(); });
addEventListener('keydown', (e) => { if (e.key === 'Escape' && modal.classList.contains('open')) closeModal(); });

/* entrada suave */
const io = 'IntersectionObserver' in window
  ? new IntersectionObserver((es) => es.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } }), { threshold: .12, rootMargin: '0px 0px -40px 0px' })
  : null;
document.querySelectorAll('.rv').forEach((el) => (io ? io.observe(el) : el.classList.add('in')));
setTimeout(() => document.querySelectorAll('.rv').forEach((el) => { if (el.getBoundingClientRect().top < innerHeight) el.classList.add('in'); }), 900);

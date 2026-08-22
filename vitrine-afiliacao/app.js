document.getElementById('year').textContent = new Date().getFullYear();

const products = [
  {
    name: "Capital Digital",
    category: "Renda Online",
    status: "Faturando",
    statusTone: "live",
    image: "images/product-capital-digital.jpg",
    logo: "CAPITAL DIGITAL",
    commission: "80%",
    price: "R$ 297,00",
    description: "Plataforma completa para criar ofertas, páginas de vendas e funis prontos para rodar tráfego, sem precisar de equipe técnica.",
    materialsUrl: "https://drive.google.com/drive/folders/1TumwAjHrVDMLr10gqFfCCouhB8MIxQrR?usp=drive_link",
    affiliateUrl: "https://hub.la/group_affiliate/AUmKV16wB9yBdDrdlvUy"
  },
  {
    name: "Profissão Gestora Digital",
    category: "Gestão de Projetos",
    status: "Faturando",
    statusTone: "live",
    image: "images/product-hosana-portrait.png",
    logo: "GESTORA DIGITAL",
    commission: "80%",
    price: "R$ 197,00",
    description: "Formação completa para se tornar Gestora de Projetos Digitais e fechar o primeiro contrato de até R$ 5.000 em até 30 dias, organizando operações de agências e negócios online sem precisar aparecer, vender ou ter experiência prévia.",
    materialsUrl: "https://drive.google.com/drive/folders/1PzrfLLQZkLMmxE8E9phbdNoVfq3p8ABj?usp=drive_link",
    affiliateUrl: "https://hub.la/group_affiliate/6hUCCvqClNs9QKKpEBxZ"
  }
];

const section = document.getElementById('catalogo');
const modalRoot = document.getElementById('modal-root');

function renderCards() {
  section.innerHTML = products.map((p, idx) => {
    const isLive = p.statusTone === "live";
    const categoryClass = isLive
      ? "bg-gradient-to-r from-[oklch(0.78_0.16_80)] to-[oklch(0.65_0.2_50)] text-black"
      : "border border-white/20 bg-white/10 text-white/80 backdrop-blur";
    return `
      <article data-idx="${idx}" class="reveal-lift group relative cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-card-dark transition-all duration-500 active:scale-[0.98] hover:border-[oklch(0.7_0.18_60/0.45)] hover:shadow-[0_30px_80px_-30px_oklch(0.7_0.18_60/0.45)]" style="transition-delay:${idx * 120}ms">
        <div class="relative aspect-[3/4] overflow-hidden">
          <img src="${p.image}" alt="${p.name}" loading="lazy" class="h-full w-full object-cover grayscale transition-transform duration-1000 group-hover:scale-110 group-hover:grayscale-0"/>
          <div class="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent transition-opacity duration-500 group-hover:opacity-80"></div>
          <div class="absolute right-3 top-3 sm:right-4 sm:top-4 flex flex-col items-end gap-2">
            <span class="rounded-md px-2.5 sm:px-3 py-1 text-[9px] sm:text-[10px] font-semibold uppercase tracking-wide sm:tracking-wider whitespace-nowrap transition-transform duration-500 group-hover:translate-y-[-2px] ${categoryClass}">${p.category}</span>
            <span class="rounded-md border border-white/15 bg-black/60 px-2.5 sm:px-3 py-1 text-[9px] sm:text-[10px] font-medium uppercase tracking-wide sm:tracking-wider whitespace-nowrap text-white/70 backdrop-blur transition-transform duration-500 group-hover:translate-y-[-2px]">${p.status}</span>
          </div>
          <div class="absolute bottom-4 sm:bottom-6 left-0 right-0 px-3 text-center transition-transform duration-500 group-hover:translate-y-[-8px]">
            <h3 class="font-display text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white drop-shadow-2xl break-words">${p.logo}</h3>
          </div>
        </div>
        <div class="border-t border-white/10 p-4 sm:p-5">
          <div class="group/btn flex w-full items-center justify-between text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.15em] sm:tracking-[0.25em] text-white/90 transition-colors group-hover:text-white">
            <span>Informações</span>
            <span class="flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[oklch(0.8_0.14_80)] to-[oklch(0.62_0.2_50)] text-black transition-all duration-500 group-hover:scale-110 group-hover:rotate-45 group-active:scale-90">→</span>
          </div>
        </div>
      </article>
    `;
  }).join('');

  section.querySelectorAll('article').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      openModal(products[Number(el.dataset.idx)]);
    });
  });

  initReveal();
}

let revealObserver = null;
let revealReady = !document.fonts || document.fonts.status === 'loaded';
if (!revealReady) {
  document.fonts.ready.then(() => { revealReady = true; initReveal(); });
  setTimeout(() => { revealReady = true; initReveal(); }, 2000);
}

function initReveal() {
  if (!revealReady) return;
  if (!revealObserver) {
    revealObserver = ('IntersectionObserver' in window)
      ? new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              revealObserver.unobserve(entry.target);
            }
          });
        }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' })
      : null;
  }
  document.querySelectorAll('.reveal:not(.is-visible), .reveal-lift:not(.is-visible)').forEach(el => {
    const delay = el.dataset.delay;
    if (delay) el.style.transitionDelay = `${delay}ms`;
    if (revealObserver) revealObserver.observe(el);
    else el.classList.add('is-visible');
  });
}

let mounted = false;
let animated = false;
let currentProduct = null;
let unmountTimer = null;
let animateTimer = null;

function renderModal() {
  if (!mounted || !currentProduct) {
    modalRoot.innerHTML = '';
    return;
  }
  const t = currentProduct;
  const a = animated;

  modalRoot.innerHTML = `
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-500 ease-[cubic-bezier(.16,1,.3,1)] ${a ? "opacity-100" : "opacity-0"}">
      <div id="modal-backdrop" class="absolute inset-0 bg-black/95 backdrop-blur-2xl cursor-pointer"></div>
      <div class="relative w-full max-w-3xl max-h-[92vh] transition-all duration-700 ease-[cubic-bezier(.16,1,.3,1)] ${a ? "scale-100 translate-y-0 opacity-100" : "scale-[0.9] translate-y-12 opacity-0"}">
        <button id="modal-close" type="button" class="absolute right-4 top-4 sm:right-8 sm:top-8 z-30 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-white/10 bg-black/50 text-white/60 transition-all duration-300 hover:scale-110 active:scale-90 hover:bg-white/10 hover:text-white cursor-pointer">
          <span class="text-lg sm:text-xl">✕</span>
        </button>
        <div class="max-h-[92vh] overflow-y-auto overflow-x-hidden rounded-[1.5rem] sm:rounded-[2rem] md:rounded-[2.5rem] border border-white/10 bg-[#0A0A0A] shadow-[0_0_100px_rgba(0,0,0,1)]">
        <div class="grid md:grid-cols-2">
          <div class="relative aspect-[4/5] sm:aspect-[16/10] md:aspect-auto overflow-hidden">
            <img src="${t.image}" alt="${t.name}" class="h-full w-full object-cover grayscale transition-all duration-1000 delay-300 ${a ? "scale-105 grayscale-0" : "scale-125 grayscale"}"/>
            <div class="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
            <div class="absolute bottom-5 left-5 right-16 sm:bottom-8 sm:left-8 sm:right-20 md:bottom-10 md:left-10 transition-all duration-700 delay-500 ${a ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"}">
              <h2 class="font-display text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white drop-shadow-2xl break-words">${t.logo}</h2>
              <div class="flex gap-2 mt-2 sm:mt-3">
                <span class="text-[9px] sm:text-[10px] uppercase tracking-[0.1em] sm:tracking-[0.2em] whitespace-nowrap text-black bg-white px-2 py-1 rounded font-bold">${t.category}</span>
              </div>
            </div>
          </div>
          <div class="flex flex-col p-6 sm:p-10 md:p-14">
            <div class="mb-6 sm:mb-10 transition-all duration-700 delay-400 ${a ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}">
              <span class="text-[10px] uppercase tracking-luxe text-white/50 block mb-3 sm:mb-4">Sobre o Ativo</span>
              <p class="text-sm sm:text-base font-light leading-relaxed text-white/90">${t.description}</p>
            </div>
            <div class="grid grid-cols-2 gap-4 sm:gap-8 mb-8 sm:mb-12 transition-all duration-700 delay-500 ${a ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}">
              <div class="group/stat min-w-0">
                <span class="text-[10px] uppercase tracking-luxe text-white/50 block mb-2 transition-colors group-hover/stat:text-white/70">Comissão</span>
                <span class="text-xl sm:text-2xl md:text-3xl font-medium text-gradient-warm">${t.commission}</span>
              </div>
              <div class="group/stat min-w-0">
                <span class="text-[10px] uppercase tracking-luxe text-white/50 block mb-2 transition-colors group-hover/stat:text-white/70">Ticket</span>
                <span class="text-xl sm:text-2xl md:text-3xl font-medium text-white/90 whitespace-nowrap">${t.price}</span>
              </div>
            </div>
            <div class="mt-auto space-y-3 sm:space-y-4 transition-all duration-700 delay-600 ${a ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}">
              <a href="${t.materialsUrl}" target="_blank" rel="noopener" class="relative block w-full overflow-hidden rounded-full bg-white py-4 sm:py-5 text-center text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.15em] sm:tracking-[0.3em] text-black transition-all duration-500 hover:scale-[1.02] active:scale-95 group/btn-modal cursor-pointer">
                <span class="relative z-10">Acessar Materiais</span>
                <div class="absolute inset-0 bg-gradient-to-r from-[oklch(0.78_0.16_80)] to-[oklch(0.65_0.2_50)] opacity-0 transition-opacity duration-500 group-hover/btn-modal:opacity-100"></div>
              </a>
              <a href="${t.affiliateUrl || `mailto:suporte@axrdigital.com.br?subject=${encodeURIComponent('Solicitação de afiliação - ' + t.name)}`}" ${t.affiliateUrl ? 'target="_blank" rel="noopener"' : ''} class="block w-full rounded-full border border-[oklch(0.7_0.18_60/0.4)] py-4 sm:py-5 text-center text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.15em] sm:tracking-[0.3em] text-white transition-all duration-300 active:scale-[0.97] hover:bg-[oklch(0.7_0.18_60/0.1)] hover:border-[oklch(0.7_0.18_60/0.7)] cursor-pointer">Solicitar Afiliação</a>
              <button id="modal-back" class="w-full rounded-full border border-white/5 py-4 sm:py-5 text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.15em] sm:tracking-[0.3em] text-white/70 transition-all duration-300 active:scale-[0.97] hover:bg-white/5 hover:text-white hover:border-white/10 cursor-pointer">Voltar</button>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  `;

  modalRoot.querySelector('#modal-backdrop').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) closeModal();
  });
  modalRoot.querySelector('#modal-close').addEventListener('click', closeModal);
  modalRoot.querySelector('#modal-back').addEventListener('click', closeModal);
}

function openModal(product) {
  currentProduct = product;
  mounted = true;
  document.body.style.overflow = 'hidden';
  clearTimeout(unmountTimer);
  clearTimeout(animateTimer);
  renderModal();
  animateTimer = setTimeout(() => {
    animated = true;
    renderModal();
  }, 10);
}

function closeModal() {
  animated = false;
  document.body.style.overflow = 'unset';
  clearTimeout(animateTimer);
  renderModal();
  unmountTimer = setTimeout(() => {
    mounted = false;
    currentProduct = null;
    renderModal();
  }, 500);
}

renderCards();

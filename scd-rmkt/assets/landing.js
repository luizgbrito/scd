/* =========================================================
   CAPITAL DIGITAL — Landing Page JS
   ========================================================= */
(function () {
  "use strict";

  /* ---------- MÓDULOS (dados) ---------- */
  var MODULOS = [
    { img: "m01", t: "Introdução", d: "Boas-vindas e o mapa completo da sua jornada dentro do Capital Digital." },
    { img: "m03", t: "Mentalidade Blindada", d: "Construa a mentalidade de quem executa e não desiste no primeiro obstáculo." },
    { img: "m02", t: "Fundamentos do Mercado Digital", d: "Entenda como o mercado digital realmente funciona e onde está o dinheiro." },
    { img: "m04", t: "Sistema de Renda Autônoma", d: "O modelo que trabalha por você e gera renda recorrente todo mês." },
    { img: "m05", t: "Configurando a Máquina de Vendas", d: "Monte toda a estrutura da sua operação do zero, passo a passo." },
    { img: "m06", t: "Ativando a Máquina de Vendas", d: "Coloque a operação no ar e faça as primeiras vendas acontecerem." },
    { img: "m07", t: "Análise & Otimização", d: "Leia os números certos e otimize a operação pra escalar com segurança." },
    { img: "m08", t: "Escalando seus resultados", d: "Multiplique o que já funciona e leve seus resultados pro próximo nível." },
    { img: "m09", t: "Imersão: Vendendo em 24 horas", d: "Uma imersão prática pra tirar a operação do papel em um único dia." },
    { img: "m10", t: "Agente de IA: Análise de Campanhas", d: "Use inteligência artificial pra analisar e otimizar suas campanhas." }
  ];

  var track = document.getElementById("modTrack");
  if (track) {
    var html = "";
    for (var i = 0; i < MODULOS.length; i++) {
      var m = MODULOS[i];
      var n = (i + 1) < 10 ? "0" + (i + 1) : "" + (i + 1);
      html +=
        '<article class="mod-card">' +
          '<div class="mod-cover">' +
            '<img src="assets/modulos/' + m.img + '.jpg" alt="' + m.t + '" loading="lazy" />' +
          '</div>' +
          '<div class="mod-body"><span class="badge">Módulo ' + n + '</span><h3>' + m.t + '</h3><p>' + m.d + '</p></div>' +
        '</article>';
    }
    track.innerHTML = html;
  }

  /* ---------- CAROUSEL ---------- */
  (function () {
    if (!track) return;
    var prev = document.getElementById("carPrev");
    var next = document.getElementById("carNext");
    var dotsWrap = document.getElementById("carDots");

    function cardStep() {
      var card = track.querySelector(".mod-card");
      if (!card) return 280;
      var gap = parseFloat(getComputedStyle(track).columnGap || getComputedStyle(track).gap || 16) || 16;
      return card.getBoundingClientRect().width + gap;
    }
    function scrollByCards(dir) {
      track.scrollBy({ left: dir * cardStep(), behavior: "smooth" });
    }
    if (prev) prev.addEventListener("click", function () { scrollByCards(-1); });
    if (next) next.addEventListener("click", function () { scrollByCards(1); });

    // dots (uma por módulo)
    if (dotsWrap) {
      var dotsHtml = "";
      for (var d = 0; d < MODULOS.length; d++) {
        dotsHtml += '<button class="dot' + (d === 0 ? " active" : "") + '" type="button" aria-label="Módulo ' + (d + 1) + '"></button>';
      }
      dotsWrap.innerHTML = dotsHtml;
      var dots = Array.prototype.slice.call(dotsWrap.querySelectorAll(".dot"));
      dots.forEach(function (dot, idx) {
        dot.addEventListener("click", function () {
          track.scrollTo({ left: idx * cardStep(), behavior: "smooth" });
        });
      });
      var raf;
      track.addEventListener("scroll", function () {
        if (raf) cancelAnimationFrame(raf);
        raf = requestAnimationFrame(function () {
          var idx = Math.round(track.scrollLeft / cardStep());
          idx = Math.max(0, Math.min(dots.length - 1, idx));
          dots.forEach(function (dot, di) { dot.classList.toggle("active", di === idx); });
        });
      }, { passive: true });
    }
  })();

  /* ---------- FAQ ACCORDION ---------- */
  (function () {
    var faq = document.getElementById("faq");
    if (!faq) return;
    var items = Array.prototype.slice.call(faq.querySelectorAll(".faq-item"));
    items.forEach(function (item) {
      var q = item.querySelector(".faq-q");
      var a = item.querySelector(".faq-a");
      q.addEventListener("click", function () {
        var isOpen = item.classList.contains("open");
        items.forEach(function (it) {
          it.classList.remove("open");
          var ia = it.querySelector(".faq-a");
          if (ia) ia.style.maxHeight = null;
        });
        if (!isOpen) {
          item.classList.add("open");
          a.style.maxHeight = a.scrollHeight + "px";
        }
      });
    });
    window.addEventListener("resize", function () {
      var open = faq.querySelector(".faq-item.open .faq-a");
      if (open) open.style.maxHeight = open.scrollHeight + "px";
    });
  })();

  /* ---------- HEADER STICKY (solidifica ao rolar) ---------- */
  (function () {
    var header = document.getElementById("siteHeader");
    if (!header) return;
    function onScroll() {
      if (window.scrollY > 30) header.classList.add("solid");
      else header.classList.remove("solid");
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  })();

  /* ---------- SCROLL REVEAL (estilo Capital Club) ---------- */
  (function () {
    var revealEls = Array.prototype.slice.call(document.querySelectorAll(".reveal"));
    if (!revealEls.length) return;
    function showEl(el) { el.classList.add("in"); }
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { showEl(e.target); io.unobserve(e.target); }
        });
      }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
      revealEls.forEach(function (el) { io.observe(el); });
      // revela o que já está (quase) na viewport de imediato
      var revealInView = function () {
        var vh = window.innerHeight || 800;
        revealEls.forEach(function (el) {
          if (el.classList.contains("in")) return;
          if (el.getBoundingClientRect().top < vh * 0.96) showEl(el);
        });
      };
      requestAnimationFrame(revealInView);
      window.addEventListener("load", revealInView);
      // rede de segurança: nunca deixar conteúdo invisível
      setTimeout(function () { revealEls.forEach(showEl); }, 1800);
    } else {
      revealEls.forEach(showEl);
    }
  })();

  /* ---------- TEXT SCRAMBLE (assinatura Capital Club) ---------- */
  (function () {
    var els = document.querySelectorAll(".scramble");
    if (!els.length) return;
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) return;
    var CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&";
    function scramble(el) {
      var final = el.dataset.text || el.textContent;
      var len = final.length, frame = 0, duration = 26;
      var reveals = final.split("").map(function (_, i) {
        return Math.floor((i / len) * (duration * 0.55)) + Math.random() * 6;
      });
      function tick() {
        var out = "";
        for (var i = 0; i < len; i++) {
          var ch = final[i];
          if (ch === " " || ch === "\n") { out += ch; continue; }
          out += frame >= reveals[i] ? ch : CHARS[(Math.random() * CHARS.length) | 0];
        }
        el.textContent = out;
        frame++;
        if (frame <= duration) requestAnimationFrame(tick);
        else el.textContent = final;
      }
      tick();
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { scramble(e.target); io.unobserve(e.target); }
      });
    }, { threshold: 0.6 });
    els.forEach(function (el) {
      // preserva o texto-alvo antes do primeiro scramble
      if (!el.dataset.text) el.dataset.text = el.textContent.trim();
      io.observe(el);
    });
  })();

  /* =====================================================================
     LIBERAÇÃO DOS BOTÕES — SINCRONIZADO COM O VÍDEO (VTurb / smartplayer)
     ---------------------------------------------------------------------
     Os elementos com a classe ".esconder" começam ocultos e são exibidos
     quando o vídeo passa de SECONDS_TO_DISPLAY segundos.
     >> Ajuste apenas SECONDS_TO_DISPLAY (em segundos). Ex.: 480 = 8 min.
     >> Se NÃO houver player na página, libera após FALLBACK_NO_PLAYER_SECONDS.
     ===================================================================== */
  var SECONDS_TO_DISPLAY = 0;
  var FALLBACK_NO_PLAYER_SECONDS = 0;

  (function liberarBotoes() {
    var revelado = false, elapsed = 0;
    function mostrar() {
      if (revelado) return;
      revelado = true;
      var els = document.querySelectorAll(".esconder");
      for (var i = 0; i < els.length; i++) els[i].classList.remove("esconder");
    }
    if (FALLBACK_NO_PLAYER_SECONDS <= 0 &&
        typeof smartplayer === "undefined") { mostrar(); return; }
    var timer = setInterval(function () {
      elapsed += 1;
      var sp = (typeof smartplayer !== "undefined" && smartplayer.instances &&
                smartplayer.instances[0] && smartplayer.instances[0].video)
                ? smartplayer.instances[0].video : null;
      if (sp) {
        if (sp.currentTime > SECONDS_TO_DISPLAY) { mostrar(); clearInterval(timer); }
      } else if (elapsed >= FALLBACK_NO_PLAYER_SECONDS) {
        mostrar(); clearInterval(timer);
      }
    }, 1000);
  })();

})();

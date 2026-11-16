/* Prabin Kandel — portfolio (preview build)
   Vanilla JS only: products showcase, theme toggle, mobile menu,
   contact form -> WhatsApp, copy email, reveal-on-scroll. */
(function () {
  'use strict';
  document.documentElement.classList.add('js');

  /* ================================================================
     PRODUCTS — the ONE place to update Digi Nepal showcase prices.
     Prices verified against the live portfolio / Digi Nepal store
     on 2026-11-16. To change a price, edit only this list.
     ================================================================ */
  var PRODUCTS = [
    { name: 'Netflix', blurb: 'Movies & series in 4K, on your own profile.', price: 'Rs 350', per: 'per month', buy: 'https://diginepalnp.com/#product=8f3af020-a425-460e-b16c-a37d113be874' },
    { name: 'Prime Video', blurb: 'Blockbusters, series & live sport streaming.', price: 'Rs 99', per: 'per month', buy: 'https://diginepalnp.com/#product=a180cbd9-c7df-4e85-9936-456156331cec' },
    { name: 'CapCut Pro', blurb: 'Pro editing — effects, no watermark, cloud.', price: 'Rs 250–375', per: 'per month · 1–2 devices', buy: 'https://diginepalnp.com/#product=29c4ee47-0dd8-4c35-96ef-f35f9de94711' },
    { name: 'Gemini AI Pro', blurb: "Google's AI — writing, study & work help.", price: 'Rs 350', per: '3-month plan', buy: 'https://diginepalnp.com/#product=c5d256ff-e004-435f-ada9-399383c2c057' }
  ];

  var grid = document.getElementById('productsGrid');
  if (grid) {
    PRODUCTS.forEach(function (p) {
      var card = document.createElement('article');
      card.className = 'product-card reveal in';
      var h = document.createElement('h3'); h.textContent = p.name;
      var d = document.createElement('p'); d.textContent = p.blurb;
      var price = document.createElement('div'); price.className = 'product-price'; price.textContent = p.price;
      var per = document.createElement('div'); per.className = 'product-per'; per.textContent = p.per;
      var a = document.createElement('a');
      a.className = 'btn btn-ghost'; a.href = p.buy; a.target = '_blank'; a.rel = 'noopener';
      a.textContent = 'Buy on Digi Nepal';
      card.appendChild(h); card.appendChild(d); card.appendChild(price); card.appendChild(per); card.appendChild(a);
      grid.appendChild(card);
    });
  }

  /* ---------- theme toggle (choice saved in localStorage) ---------- */
  var root = document.documentElement;
  var toggle = document.getElementById('themeToggle');
  function syncToggle() {
    if (toggle) toggle.setAttribute('aria-pressed', root.getAttribute('data-theme') === 'light' ? 'true' : 'false');
  }
  syncToggle();
  if (toggle) {
    toggle.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('pk-theme', next); } catch (e) {}
      syncToggle();
    });
  }

  /* ---------- mobile menu ---------- */
  var menuBtn = document.getElementById('menuBtn');
  var navLinks = document.getElementById('navLinks');
  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', function () {
      var open = navLinks.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    navLinks.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        navLinks.classList.remove('open');
        menuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- toast + copy email ---------- */
  var toast = document.getElementById('toast');
  var toastTimer = null;
  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.classList.remove('show'); }, 2200);
  }
  var copyBtn = document.getElementById('copyEmail');
  if (copyBtn) {
    copyBtn.addEventListener('click', function () {
      var email = 'prabink721@gmail.com';
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email).then(function () { showToast('Email copied: ' + email); }, function () { showToast(email); });
      } else { showToast(email); }
    });
  }

  /* ---------- contact form: validate, then open WhatsApp ---------- */
  var form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      var name = document.getElementById('cname').value.trim();
      var svc = document.getElementById('cservice').value;
      var msg = document.getElementById('cmsg').value.trim();
      var ok = true;
      var errName = document.getElementById('err-name');
      var errMsg = document.getElementById('err-msg');
      errName.hidden = name.length > 0;
      document.getElementById('cname').setAttribute('aria-invalid', name.length > 0 ? 'false' : 'true');
      if (!name) ok = false;
      errMsg.hidden = msg.length > 0;
      document.getElementById('cmsg').setAttribute('aria-invalid', msg.length > 0 ? 'false' : 'true');
      if (!msg) ok = false;
      if (!ok) { showToast('Please fill in your name and a short message.'); return; }
      var text = 'Hi Prabin, I am ' + name + '.\nService: ' + svc + '\nMessage: ' + msg + '\n— Sent from your portfolio';
      window.open('https://wa.me/9779840661406?text=' + encodeURIComponent(text), '_blank');
      showToast('Opening WhatsApp…');
    });
  }

  /* ---------- reveal on scroll (lightweight, reduced-motion safe) ---------- */
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var items = document.querySelectorAll('.reveal');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    items.forEach(function (el) { el.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add('in'); io.unobserve(entry.target); }
      });
    }, { threshold: 0.05, rootMargin: '0px 0px 120px 0px' });
    items.forEach(function (el) { io.observe(el); });
    /* Safety net: content must never stay hidden if the observer lags. */
    setTimeout(function () { items.forEach(function (el) { el.classList.add('in'); }); }, 2500);
  }
})();

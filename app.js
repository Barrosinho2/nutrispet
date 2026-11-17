/* Nutris Pet — página inicial: catálogo, filtros, comparação e interações */
(function () {
  'use strict';

  var NP = window.NP, D = NP.data, $ = NP.$, $$ = NP.$$;
  var state = { cat: 'todos', q: '', sort: 'destaque', compare: [] };
  var MAX_CMP = 3;

  var grid = $('#product-grid'), statusEl = $('#product-status'), emptyEl = $('#product-empty');
  var chipsEl = $('#filter-chips'), sortEl = $('#product-sort'), searchEl = $('#product-search'), clearEl = $('#product-search-clear');
  var shop = $('#loja');

  var smooth = function () { return NP.reduceMotion() ? 'auto' : 'smooth'; };
  var goShop = function () { shop.scrollIntoView({ behavior: smooth(), block: 'start' }); };

  /* ---------- Categorias e filtros (gerados a partir dos dados) ---------- */
  $('#cat-grid').innerHTML = D.categorias.map(function (c) {
    return '<button class="cat-card" type="button" data-goto-cat="' + c.id + '">' +
      '<span class="cat-media" style="--tint:' + c.tint + '"><img src="' + c.img + '" alt="" width="480" height="400" loading="lazy"></span>' +
      '<span class="cat-name">' + c.nome + NP.icon('arrow-right') + '</span></button>';
  }).join('');

  chipsEl.innerHTML = '<button type="button" data-cat="todos" aria-pressed="true">Todos</button>' +
    D.categorias.map(function (c) { return '<button type="button" data-cat="' + c.id + '" aria-pressed="false">' + c.nome + '</button>'; }).join('');

  /* ---------- Catálogo ---------- */
  function filtered() {
    var q = NP.norm(state.q.trim());
    var list = D.produtos.filter(function (p) {
      var inCat = state.cat === 'todos' || p.cat === state.cat;
      var hay = NP.norm([p.nome, p.frase, p.tipo, p.selo, NP.category(p.cat).nome].join(' '));
      return inCat && (!q || hay.indexOf(q) >= 0);
    });
    if (state.sort === 'menor') list.sort(function (a, b) { return NP.price(a) - NP.price(b); });
    else if (state.sort === 'maior') list.sort(function (a, b) { return NP.price(b) - NP.price(a); });
    else if (state.sort === 'nome') list.sort(function (a, b) { return a.nome.localeCompare(b.nome, 'pt-BR'); });
    return list;
  }

  function card(p) {
    var c = NP.category(p.cat);
    var fav = NP.favs.has(p.id);
    var cmp = state.compare.indexOf(p.id) >= 0;
    return '<article class="card" data-id="' + p.id + '">' +
      '<div class="card-media" style="--tint:' + NP.tint(p) + '" data-act="ver">' +
        '<img src="' + p.img + '" alt="' + NP.esc(p.nome) + ', imagem ilustrativa" width="480" height="400" loading="lazy">' +
        '<span class="card-tag' + (p.receita ? ' is-rx' : '') + '">' + (p.receita ? NP.icon('file') : '') + p.selo + '</span>' +
        '<button class="card-fav" type="button" data-act="fav" aria-pressed="' + fav + '" aria-label="Salvar ' + NP.esc(p.nome) + ' nos favoritos">' + NP.icon('heart') + '</button>' +
        '<span class="card-peek" aria-hidden="true">Ver de pertinho ' + NP.icon('plus') + '</span>' +
      '</div>' +
      '<div class="card-body">' +
        '<p class="card-cat">' + c.nome + '</p>' +
        '<h3 class="card-name"><button type="button" data-act="ver">' + p.nome + '</button></h3>' +
        '<p class="card-desc">' + p.frase + '</p>' +
        '<div class="card-buy">' +
          '<p class="card-price"><span class="card-from">a partir de</span>' + NP.brl(NP.price(p, 0)) + '</p>' +
          '<button class="card-add" type="button" data-act="add" aria-label="Escolher ' + NP.esc(p.nome) + '">' + NP.icon('plus') + '</button>' +
        '</div>' +
        '<button class="card-cmp" type="button" data-act="cmp" aria-pressed="' + cmp + '">' + NP.icon('compare') + '<span>' + (cmp ? 'Comparando' : 'Comparar') + '</span></button>' +
      '</div>' +
    '</article>';
  }

  function render() {
    var list = filtered();
    grid.innerHTML = list.map(card).join('');
    emptyEl.hidden = list.length > 0;
    grid.hidden = list.length === 0;
    statusEl.textContent = list.length + (list.length === 1 ? ' produto encontrado.' : ' produtos encontrados.');
    clearEl.hidden = !state.q;
    $$('[data-cat]', chipsEl).forEach(function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-cat') === state.cat); });
  }

  grid.addEventListener('click', function (e) {
    var a = e.target.closest('[data-act]');
    if (!a) return;
    var id = a.closest('[data-id]').getAttribute('data-id');
    var act = a.getAttribute('data-act');
    if (act === 'fav') {
      e.stopPropagation();
      var on = NP.favs.toggle(id);
      NP.toast(on ? 'Salvo nos favoritos.' : 'Removido dos favoritos.');
      return;
    }
    if (act === 'cmp') { toggleCompare(id); return; }
    if (act === 'ver' || act === 'add') NP.openProduct(id);
  });

  document.addEventListener('np:favs', function () {
    $$('.card').forEach(function (c) {
      $('.card-fav', c).setAttribute('aria-pressed', NP.favs.has(c.getAttribute('data-id')));
    });
  });

  chipsEl.addEventListener('click', function (e) {
    var b = e.target.closest('[data-cat]');
    if (!b) return;
    state.cat = b.getAttribute('data-cat');
    render();
  });

  $('#cat-grid').addEventListener('click', function (e) {
    var b = e.target.closest('[data-goto-cat]');
    if (!b) return;
    state.cat = b.getAttribute('data-goto-cat');
    render();
    goShop();
  });

  sortEl.addEventListener('change', function () { state.sort = sortEl.value; render(); });
  searchEl.addEventListener('input', function () { state.q = searchEl.value; render(); });
  clearEl.addEventListener('click', function () { state.q = ''; searchEl.value = ''; render(); searchEl.focus(); });

  /* busca do cabeçalho leva para a loja já filtrada */
  $('#site-search').addEventListener('submit', function (e) {
    e.preventDefault();
    var v = $('#site-search-input').value;
    state.q = v; state.cat = 'todos';
    searchEl.value = v;
    render();
    goShop();
  });

  /* ---------- Comparar ---------- */
  var bar = $('#compare-bar'), cmpCount = $('#compare-count'), cmpGo = $('#compare-go');

  function toggleCompare(id) {
    var i = state.compare.indexOf(id);
    if (i >= 0) state.compare.splice(i, 1);
    else {
      if (state.compare.length >= MAX_CMP) { NP.toast('Compare até 3 produtos por vez.'); return; }
      state.compare.push(id);
    }
    syncCompare();
  }

  function syncCompare() {
    var n = state.compare.length;
    $$('.card').forEach(function (c) {
      var on = state.compare.indexOf(c.getAttribute('data-id')) >= 0;
      var b = $('.card-cmp', c);
      b.setAttribute('aria-pressed', on);
      $('span', b).textContent = on ? 'Comparando' : 'Comparar';
    });
    bar.classList.toggle('is-on', n > 0);
    document.body.classList.toggle('has-compare', n > 0);
    cmpCount.innerHTML = n === 1 ? 'Escolha mais 1<span class="hide-sm"> para comparar</span>' : n + ' de 3<span class="hide-sm"> selecionados</span>';
    cmpGo.disabled = n < 2;
  }

  cmpGo.addEventListener('click', function () { if (state.compare.length > 1) NP.openCompare(state.compare); });
  $('#compare-clear').addEventListener('click', function () { state.compare = []; syncCompare(); });

  /* ---------- Acordeão do atendimento ---------- */
  var accBtns = $$('.acc-btn');
  accBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var wasOpen = btn.getAttribute('aria-expanded') === 'true';
      accBtns.forEach(function (b) {
        b.setAttribute('aria-expanded', 'false');
        document.getElementById(b.getAttribute('aria-controls')).hidden = true;
      });
      if (!wasOpen) {
        btn.setAttribute('aria-expanded', 'true');
        document.getElementById(btn.getAttribute('aria-controls')).hidden = false;
      }
    });
  });

  /* ---------- Menu do celular ---------- */
  var menuBtn = $('#menu-toggle'), menu = $('#mobile-menu');
  function setMenu(on) {
    menuBtn.setAttribute('aria-expanded', on);
    menuBtn.setAttribute('aria-label', on ? 'Fechar menu' : 'Abrir menu');
    $('use', menuBtn).setAttribute('href', on ? '#i-x' : '#i-menu');
    menu.classList.toggle('is-open', on);
  }
  menuBtn.addEventListener('click', function () { setMenu(menuBtn.getAttribute('aria-expanded') !== 'true'); });
  menu.addEventListener('click', function (e) { if (e.target.closest('a, button')) setMenu(false); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && menuBtn.getAttribute('aria-expanded') === 'true') { setMenu(false); menuBtn.focus(); }
  });
  document.addEventListener('click', function (e) {
    if (menuBtn.getAttribute('aria-expanded') === 'true' && !menu.contains(e.target) && !menuBtn.contains(e.target)) setMenu(false);
  });

  /* ---------- Barra de progresso de leitura ---------- */
  var prog = $('#scroll-progress'), ticking = false;
  function updProgress() {
    var max = document.documentElement.scrollHeight - window.innerHeight;
    prog.style.transform = 'scaleX(' + (max > 0 ? Math.min(window.scrollY / max, 1) : 0) + ')';
    ticking = false;
  }
  window.addEventListener('scroll', function () {
    if (!ticking) { ticking = true; requestAnimationFrame(updProgress); }
  }, { passive: true });
  updProgress();

  /* ---------- Inicialização ---------- */
  render();
  syncCompare();

  var m = location.hash.match(/^#acompanhar=([\w-]+)/i);
  if (m) {
    history.replaceState(null, '', location.pathname + location.search);
    NP.openTrack(decodeURIComponent(m[1]));
  } else if (location.hash === '#sacola') {
    history.replaceState(null, '', location.pathname + location.search);
    NP.openCart();
  }
})();

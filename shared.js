/* Nutris Pet — estado e componentes compartilhados (index + checkout) */
(function () {
  'use strict';

  var D = window.NP_DATA;
  var NP = (window.NP = window.NP || {});
  NP.data = D;

  /* ---------- Ícones (sprite) ---------- */
  var ICONS = {
    'arrow-right': '<path d="M5 12h14M13 6l6 6-6 6"/>',
    'arrow-left': '<path d="M19 12H5M11 6l-6 6 6 6"/>',
    'arrow-down': '<path d="M12 5v14M6 13l6 6 6-6"/>',
    'arrow-up-right': '<path d="M7 17 17 7M8 7h9v9"/>',
    'chevron-down': '<path d="m6 9 6 6 6-6"/>',
    'search': '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
    'heart': '<path d="M12 20.5s-7.6-4.6-9.4-9.4C1.4 7.8 3.5 4.5 7.1 4.5c2.1 0 3.6 1.1 4.9 2.9 1.3-1.8 2.8-2.9 4.9-2.9 3.6 0 5.7 3.3 4.5 6.6-1.8 4.8-9.4 9.4-9.4 9.4z"/>',
    'user': '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7"/>',
    'bag': '<path d="M5.5 8h13l-1 12.5h-11z"/><path d="M9 8V6.5a3 3 0 0 1 6 0V8"/>',
    'menu': '<path d="M4 7h16M4 12h16M4 17h16"/>',
    'x': '<path d="M6 6l12 12M18 6 6 18"/>',
    'plus': '<path d="M12 5v14M5 12h14"/>',
    'minus': '<path d="M5 12h14"/>',
    'compare': '<path d="M7 4v16M3.5 7.5 7 4l3.5 3.5M17 20V4m-3.5 12.5L17 20l3.5-3.5"/>',
    'chat': '<path d="M20.5 11.5a8.5 8.5 0 0 1-12.3 7.6L3.5 20.5l1.4-4.5a8.5 8.5 0 1 1 15.6-4.5z"/>',
    'file': '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h4"/>',
    'scale': '<rect x="3.5" y="3.5" width="17" height="17" rx="4"/><path d="M8 11a4 4 0 0 1 8 0"/><path d="m12 11 1.7-2.3"/>',
    'truck': '<path d="M2.5 6.5h11v9h-11z"/><path d="M13.5 9.5h4l3 3.2v2.8h-7"/><circle cx="7" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/>',
    'shield': '<path d="M12 3 19 6v5.5c0 4.6-3 7.9-7 9.5-4-1.6-7-4.9-7-9.5V6z"/><path d="m9 12 2 2 4-4"/>',
    'bell': '<path d="M6 16v-5a6 6 0 1 1 12 0v5l1.5 2h-15z"/><path d="M10 21h4"/>',
    'sparkle': '<path d="M12 3.5 13.8 9l5.7 2-5.7 2L12 18.5 10.2 13l-5.7-2 5.7-2z"/>',
    'info': '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
    'instagram': '<rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17 7h.01"/>',
    'package': '<path d="m12 3 8 4.5v9L12 21l-8-4.5v-9z"/><path d="m4 7.5 8 4.5 8-4.5M12 12v9"/>',
    'pill': '<path d="M10.6 19.4a4.9 4.9 0 0 1-7-7l5.8-5.8a4.9 4.9 0 0 1 7 7z"/><path d="m6.8 9.2 7 7"/>',
    'lock': '<rect x="5" y="11" width="14" height="10" rx="2.5"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
    'check': '<path d="m5 12.5 4.5 4.5L19 7.5"/>',
    'pin': '<path d="M12 21s-7-6.1-7-11.2a7 7 0 1 1 14 0C19 14.9 12 21 12 21z"/><circle cx="12" cy="9.8" r="2.6"/>',
    'store': '<path d="M3.5 9.5 5 4.5h14l1.5 5M3.5 9.5h17M5 9.5v10h14v-10M10 19.5v-5h4v5"/>',
    'card': '<rect x="3" y="5.5" width="18" height="13" rx="2.5"/><path d="M3 10h18M7 15h3"/>',
    'cash': '<rect x="2.5" y="6" width="19" height="12" rx="2.5"/><circle cx="12" cy="12" r="2.6"/><path d="M6 9.5h.01M18 14.5h.01"/>',
    'qr': '<rect x="4" y="4" width="6" height="6" rx="1"/><rect x="14" y="4" width="6" height="6" rx="1"/><rect x="4" y="14" width="6" height="6" rx="1"/><path d="M14 14h2v2h-2zM18 18h2v2h-2zM18 14h2M14 18v2"/>',
    'trash': '<path d="M4 7h16M9.5 7V4.5h5V7M6.5 7l1 13h9l1-13M10 11v5.5M14 11v5.5"/>',
    'clock': '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/>',
    'plus-tile': '<rect x="3.5" y="3.5" width="17" height="17" rx="5"/><path d="M12 8v8M8 12h8"/>',
    'bowl': '<path d="M3 11.5h18a9 7.5 0 0 1-18 0z"/><path d="M8.5 8.2h.01M12 7h.01M15.5 8.2h.01"/>',
    'bone': '<path transform="rotate(-35 12 12)" d="M6.6 10.4H17.4A2.3 2.3 0 1 1 19.6 12A2.3 2.3 0 1 1 17.4 13.6H6.6A2.3 2.3 0 1 1 4.4 12A2.3 2.3 0 1 1 6.6 10.4Z"/>',
    'award': '<circle cx="12" cy="9" r="5.5"/><path d="m8.6 13.3-1.6 7.2 5-2.6 5 2.6-1.6-7.2"/>',
    'paw': '<g fill="currentColor" stroke="none"><ellipse cx="12" cy="15.6" rx="4.7" ry="3.9"/><circle cx="6.4" cy="10.4" r="2.1"/><circle cx="9.6" cy="6.9" r="2.1"/><circle cx="14.4" cy="6.9" r="2.1"/><circle cx="17.6" cy="10.4" r="2.1"/></g>'
  };

  function injectSprite() {
    if (document.getElementById('np-sprite')) return;
    var svg = '<svg id="np-sprite" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style="position:absolute;width:0;height:0;overflow:hidden">';
    Object.keys(ICONS).forEach(function (k) { svg += '<symbol id="i-' + k + '" viewBox="0 0 24 24">' + ICONS[k] + '</symbol>'; });
    svg += '</svg>';
    document.body.insertAdjacentHTML('afterbegin', svg);
  }
  if (document.body) injectSprite();
  else document.addEventListener('DOMContentLoaded', injectSprite);

  NP.icon = function (name, cls) {
    return '<svg class="ic ' + (cls || '') + '" aria-hidden="true" focusable="false"><use href="#i-' + name + '"></use></svg>';
  };

  /* ---------- Utilidades ---------- */
  var $ = function (s, el) { return (el || document).querySelector(s); };
  var $$ = function (s, el) { return Array.prototype.slice.call((el || document).querySelectorAll(s)); };
  NP.$ = $;
  NP.$$ = $$;
  var money = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
  NP.brl = function (v) { return money.format(v); };
  NP.esc = function (s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  };
  NP.norm = function (s) { return String(s).normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase(); };
  NP.reduceMotion = function () { return window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches; };
  NP.isHome = function () { return document.body && document.body.getAttribute('data-page') === 'home'; };
  var emit = function (name, detail) { document.dispatchEvent(new CustomEvent(name, { detail: detail })); };

  /* ---------- Catálogo ---------- */
  var byId = {};
  D.produtos.forEach(function (p) { byId[p.id] = p; });
  NP.product = function (id) { return byId[id]; };
  NP.category = function (id) { return D.categorias.filter(function (c) { return c.id === id; })[0]; };
  NP.price = function (p, op) {
    op = op || 0;
    return p.opcoes[Math.min(op, p.opcoes.length - 1)][1];
  };

  /* ---------- Armazenamento local (com fallback em memória) ---------- */
  var mem = {};
  var store = {
    get: function (k, fb) {
      try { var v = localStorage.getItem(k); return v == null ? fb : JSON.parse(v); }
      catch (e) { return k in mem ? mem[k] : fb; }
    },
    set: function (k, v) {
      try { localStorage.setItem(k, JSON.stringify(v)); }
      catch (e) { mem[k] = v; }
    },
    del: function (k) {
      try { localStorage.removeItem(k); } catch (e) { /* sem acesso */ }
      delete mem[k];
    }
  };
  var K = { cart: 'nutrispet:sacola', favs: 'nutrispet:favoritos', orders: 'nutrispet:pedidos' };

  NP.cart = {
    items: function () {
      return store.get(K.cart, []).filter(function (i) { return byId[i.id] && byId[i.id].opcoes[i.op]; });
    },
    save: function (items) { store.set(K.cart, items); emit('np:cart'); },
    add: function (id, op, qty) {
      op = op || 0; qty = qty || 1;
      var items = this.items();
      var f = items.filter(function (i) { return i.id === id && i.op === op; })[0];
      if (f) f.qty = Math.min(f.qty + qty, 20);
      else items.push({ id: id, op: op, qty: qty });
      this.save(items);
    },
    setQty: function (id, op, qty) {
      var items = this.items();
      var f = items.filter(function (i) { return i.id === id && i.op === op; })[0];
      if (!f) return;
      if (qty <= 0) items = items.filter(function (i) { return i !== f; });
      else f.qty = Math.min(qty, 20);
      this.save(items);
    },
    remove: function (id, op) {
      this.save(this.items().filter(function (i) { return !(i.id === id && i.op === op); }));
    },
    clear: function () { this.save([]); },
    count: function () { return this.items().reduce(function (n, i) { return n + i.qty; }, 0); },
    subtotal: function () {
      return this.items().reduce(function (s, i) { return s + NP.price(byId[i.id], i.op) * i.qty; }, 0);
    },
    hasRx: function () { return this.items().some(function (i) { return byId[i.id].receita; }); }
  };

  NP.favs = {
    list: function () { return store.get(K.favs, []).filter(function (id) { return byId[id]; }); },
    has: function (id) { return this.list().indexOf(id) >= 0; },
    toggle: function (id) {
      var l = this.list(), i = l.indexOf(id);
      if (i >= 0) l.splice(i, 1); else l.push(id);
      store.set(K.favs, l);
      emit('np:favs', { id: id, on: i < 0 });
      return i < 0;
    }
  };

  NP.orders = {
    list: function () { return store.get(K.orders, []); },
    add: function (o) {
      var l = this.list(); l.unshift(o);
      store.set(K.orders, l.slice(0, 20));
      emit('np:orders');
    },
    find: function (code) {
      var c = String(code || '').trim().toUpperCase();
      return this.list().filter(function (o) { return o.code === c; })[0];
    }
  };

  NP.clearTestData = function () {
    store.del(K.cart); store.del(K.favs); store.del(K.orders);
    emit('np:cart'); emit('np:favs'); emit('np:orders');
  };

  /* etapa simulada do pedido, pelo tempo desde a criação */
  NP.orderStage = function (o) {
    var min = (Date.now() - o.createdAt) / 60000;
    return min < 2 ? 0 : min < 10 ? 1 : min < 45 ? 2 : 3;
  };
  NP.orderSteps = function (o) {
    return o.metodo === 'retirada'
      ? ['Pedido recebido', 'Conferência e separação', 'Pronto para retirar', 'Retirado']
      : ['Pedido recebido', 'Conferência e separação', 'Saiu para entrega', 'Entregue'];
  };

  /* ---------- Toast ---------- */
  var toastTimer;
  NP.toast = function (msg) {
    var t = document.getElementById('np-toast');
    if (!t) {
      t = document.createElement('div');
      t.id = 'np-toast';
      t.className = 'toast';
      t.setAttribute('role', 'status');
      t.setAttribute('aria-live', 'polite');
      if ('popover' in HTMLElement.prototype) t.setAttribute('popover', 'manual');
      document.body.appendChild(t);
    }
    t.textContent = msg;
    if (t.showPopover) {
      try { t.hidePopover(); } catch (e) { /* já fechado */ }
      try { t.showPopover(); } catch (e) { /* sem suporte */ }
    }
    requestAnimationFrame(function () { t.classList.add('is-on'); });
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      t.classList.remove('is-on');
      setTimeout(function () { if (t.hidePopover && !t.classList.contains('is-on')) { try { t.hidePopover(); } catch (e) { /* ok */ } } }, 300);
    }, 2600);
  };

  /* ---------- Diálogos (modal e gaveta) ---------- */
  var current = null;

  function closeNow(dlg) {
    if (dlg.open) dlg.close();
    dlg.remove();
    if (current === dlg) current = null;
    if (!current) document.documentElement.classList.remove('has-dlg');
  }

  NP.openDialog = function (opts) {
    if (current) closeNow(current);
    var dlg = document.createElement('dialog');
    dlg.className = 'dlg dlg--' + (opts.kind || 'modal') + (opts.size ? ' dlg--' + opts.size : '');
    var tid = 'dlg-t-' + Math.random().toString(36).slice(2, 8);
    dlg.setAttribute('aria-labelledby', tid);
    dlg.innerHTML =
      '<div class="dlg-in">' +
        '<header class="dlg-head"><h2 class="dlg-title" id="' + tid + '">' + opts.title + '</h2>' +
        '<button class="dlg-x" type="button" data-close aria-label="Fechar">' + NP.icon('x') + '</button></header>' +
        '<div class="dlg-body">' + (opts.body || '') + '</div>' +
      '</div>';
    document.body.appendChild(dlg);
    dlg.addEventListener('click', function (e) {
      if (e.target === dlg || e.target.closest('[data-close]')) NP.closeDialog();
    });
    dlg.addEventListener('cancel', function (e) { e.preventDefault(); NP.closeDialog(); });
    dlg.showModal();
    document.documentElement.classList.add('has-dlg');
    current = dlg;
    return dlg;
  };

  NP.closeDialog = function () {
    var dlg = current;
    if (!dlg) return;
    current = null;
    if (NP.reduceMotion()) { closeNow(dlg); return; }
    dlg.classList.add('is-closing');
    setTimeout(function () { closeNow(dlg); }, 190);
  };

  /* troca de diálogo com pequena pausa para a animação de saída */
  NP.swap = function (fn) { NP.closeDialog(); setTimeout(fn, NP.reduceMotion() ? 0 : 200); };

  NP.tint = function (p) { return p.tint || NP.category(p.cat).tint; };

  function thumb(p, w) {
    return '<span class="thumb" style="--tint:' + NP.tint(p) + '"><img src="' + p.img + '" alt="" width="' + (w || 96) + '" height="' + Math.round((w || 96) * 5 / 6) + '"></span>';
  }
  NP.thumb = thumb;

  /* ---------- Produto ---------- */
  NP.openProduct = function (id, op) {
    var p = byId[id];
    if (!p) return;
    op = op || 0;
    var cat = NP.category(p.cat);
    var fav = NP.favs.has(id);
    var opts = p.opcoes.map(function (o, i) {
      return '<option value="' + i + '"' + (i === op ? ' selected' : '') + '>' + NP.esc(o[0]) + '</option>';
    }).join('');
    var notice = p.receita
      ? '<p class="pm-rx">' + NP.icon('file') + '<span><strong>Venda sob prescrição.</strong> Depois do pedido, é só enviar a receita do médico-veterinário pela conversa.</span></p>'
      : p.cat === 'farmacia'
        ? '<p class="pm-note">' + NP.icon('info') + '<span>Use conforme a orientação do médico-veterinário.</span></p>'
        : '<p class="pm-note">' + NP.icon('chat') + '<span>Na dúvida sobre fase, porte ou troca de ração, a equipe ajuda a escolher.</span></p>';

    var dlg = NP.openDialog({
      title: 'Um cuidado a mais',
      size: 'wide',
      body:
        '<div class="pm">' +
          '<div class="pm-media" style="--tint:' + NP.tint(p) + '"><img src="' + p.img + '" alt="' + NP.esc(p.nome) + ', imagem ilustrativa" width="480" height="400"></div>' +
          '<div class="pm-info">' +
            '<p class="pm-meta"><span>' + cat.nome + '</span><span>Demonstração</span></p>' +
            '<h3 class="pm-name">' + p.nome + '</h3>' +
            '<p class="pm-desc">Produto ilustrativo para experimentar a loja. Marca, composição e indicação serão definidas com o catálogo real.</p>' +
            notice +
            '<label class="field"><span class="field-label">' + p.rotuloOpcao + '</span><span class="select"><select data-op>' + opts + '</select>' + NP.icon('chevron-down') + '</span></label>' +
            '<p class="pm-price" data-price>' + NP.brl(NP.price(p, op)) + '</p>' +
            '<button class="btn btn-blue btn-block btn-lg" type="button" data-add>Adicionar à sacola ' + NP.icon('bag') + '</button>' +
            '<button class="pm-fav" type="button" data-fav aria-pressed="' + fav + '">' + NP.icon('heart') + '<span>' + (fav ? 'Salvo nos favoritos' : 'Salvar nos favoritos') + '</span></button>' +
          '</div>' +
        '</div>'
    });

    var sel = $('[data-op]', dlg);
    sel.addEventListener('change', function () { $('[data-price]', dlg).textContent = NP.brl(NP.price(p, +sel.value)); });
    $('[data-add]', dlg).addEventListener('click', function () {
      NP.cart.add(id, +sel.value, 1);
      if (NP.isHome()) {
        NP.swap(function () { NP.openCart(); NP.toast(p.nome + ' na sacola.'); });
      } else {
        NP.closeDialog();
        NP.toast(p.nome + ' na sacola.');
      }
    });
    $('[data-fav]', dlg).addEventListener('click', function (e) {
      var on = NP.favs.toggle(id), b = e.currentTarget;
      b.setAttribute('aria-pressed', on);
      $('span', b).textContent = on ? 'Salvo nos favoritos' : 'Salvar nos favoritos';
    });
  };

  /* ---------- Sacola ---------- */
  NP.openCart = function () {
    var dlg = NP.openDialog({
      title: 'Sua sacola <span class="count-badge" data-cart-count>' + NP.cart.count() + '</span>',
      kind: 'drawer',
      body: '<div class="cart" data-cart></div>'
    });
    renderCart(dlg);
    var onChange = function () { renderCart(dlg); };
    document.addEventListener('np:cart', onChange);
    dlg.addEventListener('close', function () { document.removeEventListener('np:cart', onChange); });
  };

  function renderCart(dlg) {
    var el = $('[data-cart]', dlg);
    if (!el) return;
    var a = document.activeElement;
    var keep = a && el.contains(a) ? { q: a.getAttribute('data-qty'), id: a.getAttribute('data-id'), op: a.getAttribute('data-opi') } : null;
    var items = NP.cart.items();
    var shopHref = NP.isHome() ? '#loja' : 'index.html#loja';

    if (!items.length) {
      el.innerHTML =
        '<div class="empty-state">' + NP.icon('bag') +
        '<p class="empty-t">Sua sacola está vazia.</p>' +
        '<p>Os cuidados que você escolher aparecem aqui.</p>' +
        '<a class="btn btn-blue" href="' + shopHref + '" data-close>Ver a loja</a></div>';
      return;
    }

    el.innerHTML =
      '<ul class="cart-list">' + items.map(function (i) {
        var p = byId[i.id];
        return '<li class="cart-item">' + thumb(p, 76) +
          '<div class="cart-info"><p class="cart-name">' + p.nome + (p.receita ? ' <span class="mini-rx">Receita</span>' : '') + '</p>' +
          '<p class="cart-op">' + NP.esc(p.opcoes[i.op][0]) + '</p>' +
          '<div class="qty" role="group" aria-label="Quantidade de ' + NP.esc(p.nome) + '">' +
            '<button type="button" data-qty="-1" data-id="' + i.id + '" data-opi="' + i.op + '" aria-label="Diminuir quantidade">' + NP.icon('minus') + '</button>' +
            '<span>' + i.qty + '</span>' +
            '<button type="button" data-qty="1" data-id="' + i.id + '" data-opi="' + i.op + '" aria-label="Aumentar quantidade">' + NP.icon('plus') + '</button>' +
          '</div></div>' +
          '<div class="cart-side"><p class="cart-price">' + NP.brl(NP.price(p, i.op) * i.qty) + '</p>' +
          '<button type="button" class="cart-rm" data-rm data-id="' + i.id + '" data-opi="' + i.op + '">Remover</button></div>' +
        '</li>';
      }).join('') + '</ul>' +
      '<div class="cart-foot">' +
        '<p class="cart-sub"><span>Subtotal</span><strong>' + NP.brl(NP.cart.subtotal()) + '</strong></p>' +
        '<p class="cart-note">Frete e cupom na próxima etapa. Valores fictícios.</p>' +
        (NP.cart.hasRx() ? '<p class="cart-rx">' + NP.icon('file') + '<span>Um item pede receita. Você envia depois do pedido.</span></p>' : '') +
        '<a class="btn btn-blue btn-block btn-lg" href="checkout.html">Ir para o checkout ' + NP.icon('arrow-right') + '</a>' +
        '<button class="btn-link" type="button" data-close>Continuar explorando</button>' +
      '</div>';

    el.onclick = function (e) {
      var q = e.target.closest('[data-qty]'), r = e.target.closest('[data-rm]');
      if (q) {
        var it = NP.cart.items().filter(function (x) { return x.id === q.dataset.id && x.op === +q.dataset.opi; })[0];
        if (it) NP.cart.setQty(it.id, it.op, it.qty + +q.dataset.qty);
      }
      if (r) NP.cart.remove(r.dataset.id, +r.dataset.opi);
    };

    if (keep && keep.id) {
      var sel = '[data-id="' + keep.id + '"][data-opi="' + keep.op + '"]' + (keep.q ? '[data-qty="' + keep.q + '"]' : '');
      var again = $(sel, el);
      (again || $('.dlg-x', dlg)).focus();
    }
  }

  /* ---------- Favoritos ---------- */
  NP.openFavorites = function () {
    var dlg = NP.openDialog({ title: 'Seus favoritos', body: '<div data-favs></div>' });
    var render = function () {
      var list = NP.favs.list(), el = $('[data-favs]', dlg);
      if (!list.length) {
        el.innerHTML = '<div class="empty-state">' + NP.icon('heart') + '<p class="empty-t">Nenhum favorito ainda.</p><p>Toque no coração de um produto para guardar aqui.</p></div>';
        return;
      }
      el.innerHTML = '<ul class="line-list">' + list.map(function (id) {
        var p = byId[id];
        return '<li class="line-item">' + thumb(p, 76) +
          '<div><p class="cart-name">' + p.nome + '</p><p class="cart-op">A partir de ' + NP.brl(NP.price(p, 0)) + '</p></div>' +
          '<div class="line-actions"><button class="btn btn-blue btn-sm" type="button" data-choose="' + id + '">Escolher</button>' +
          '<button class="icon-btn" type="button" data-unfav="' + id + '" aria-label="Tirar ' + NP.esc(p.nome) + ' dos favoritos">' + NP.icon('trash') + '</button></div></li>';
      }).join('') + '</ul>';
    };
    render();
    dlg.addEventListener('click', function (e) {
      var ch = e.target.closest('[data-choose]'), un = e.target.closest('[data-unfav]');
      if (ch) NP.swap(function () { NP.openProduct(ch.dataset.choose); });
      if (un) { NP.favs.toggle(un.dataset.unfav); render(); }
    });
  };

  /* ---------- Seu cantinho (conta) ---------- */
  NP.openAccount = function () {
    var orders = NP.orders.list();
    var list = orders.length
      ? '<ul class="line-list">' + orders.map(function (o) {
          var d = new Date(o.createdAt).toLocaleDateString('pt-BR');
          return '<li class="order-item"><div><strong>' + o.code + '</strong><span>' + d + ', ' + o.itemsCount + (o.itemsCount > 1 ? ' itens' : ' item') + '</span></div>' +
            '<div class="order-right"><span>' + NP.brl(o.total) + '</span><button class="btn-link" type="button" data-track="' + o.code + '">Acompanhar</button></div></li>';
        }).join('') + '</ul>'
      : '<p class="muted">Seu primeiro pedido de teste aparece aqui.</p>';
    var dlg = NP.openDialog({
      title: 'Seu cantinho Nutris',
      body:
        '<p class="dlg-lead">Suas escolhas ficam guardadas neste navegador. Uma conta de verdade entra na versão final da loja.</p>' +
        '<div class="acc-actions">' +
          '<button class="btn btn-outline" type="button" data-open="favoritos">' + NP.icon('heart') + 'Favoritos (<span data-fav-count>' + NP.favs.list().length + '</span>)</button>' +
          '<button class="btn btn-outline" type="button" data-open="acompanhar">' + NP.icon('package') + 'Acompanhar pedido</button>' +
        '</div>' +
        '<h3 class="dlg-sub">Pedidos de teste</h3>' + list
    });
    dlg.addEventListener('click', function (e) {
      var t = e.target.closest('[data-track]');
      if (t) NP.swap(function () { NP.openTrack(t.dataset.track); });
    });
  };

  /* ---------- Acompanhar pedido ---------- */
  NP.openTrack = function (code) {
    code = code || '';
    var dlg = NP.openDialog({
      title: 'Acompanhar pedido',
      body:
        '<p class="dlg-lead">Consulte um pedido de teste criado neste navegador.</p>' +
        '<form class="track-form" novalidate>' +
          '<label class="field"><span class="field-label">Código do pedido</span><input class="input" name="code" placeholder="' + D.loja.prefixoPedido + '-0000" autocomplete="off" value="' + NP.esc(code) + '"></label>' +
          '<button class="btn btn-blue btn-block btn-lg" type="submit">Consultar ' + NP.icon('search') + '</button>' +
        '</form>' +
        '<div class="track-result" aria-live="polite"></div>'
    });
    var form = $('form', dlg), out = $('.track-result', dlg);
    var run = function () {
      var v = form.code.value.trim();
      if (!v) { out.innerHTML = '<p class="form-error">Digite o código que aparece na confirmação do pedido.</p>'; return; }
      var o = NP.orders.find(v);
      if (!o) { out.innerHTML = '<p class="form-error">Não encontramos o pedido ' + NP.esc(v.toUpperCase()) + ' neste navegador. Confira letras e números.</p>'; return; }
      var stage = NP.orderStage(o), steps = NP.orderSteps(o);
      out.innerHTML =
        '<div class="track-card"><p class="track-code">' + o.code + '</p><ol class="track-steps">' +
        steps.map(function (s, i) {
          var cls = i < stage ? 'is-done' : i === stage ? 'is-now' : '';
          return '<li class="' + cls + '"><span class="dot">' + (i < stage ? NP.icon('check') : '') + '</span><span>' + s + '</span></li>';
        }).join('') +
        '</ol><p class="muted">' + o.itemsCount + (o.itemsCount > 1 ? ' itens' : ' item') + ', total de ' + NP.brl(o.total) + '. Status simulado para testes.</p></div>';
    };
    form.addEventListener('submit', function (e) { e.preventDefault(); run(); });
    if (code) run();
  };

  /* ---------- Contato ---------- */
  var TOPICS = {
    racao: 'Qual ração escolher?',
    entrega: 'Pedido e entrega em Tatuí',
    farmacia: 'Farmácia: receita, dose ou peso',
    orcamento: 'Orçamento',
    outro: 'Outro assunto'
  };
  NP.openContact = function (topic) {
    topic = TOPICS[topic] ? topic : 'racao';
    var options = Object.keys(TOPICS).map(function (k) {
      return '<option value="' + k + '"' + (k === topic ? ' selected' : '') + '>' + TOPICS[k] + '</option>';
    }).join('');
    var dlg = NP.openDialog({
      title: 'Vamos conversar?',
      body:
        '<p class="dlg-lead">Conte o que seu pet precisa. A equipe responde com calma e com orientação.</p>' +
        '<form class="contact-form" novalidate>' +
          '<label class="field"><span class="field-label">Seu nome</span><input class="input" name="nome" placeholder="Como podemos chamar você?" autocomplete="name"></label>' +
          '<label class="field"><span class="field-label">Sobre o que vamos conversar?</span><span class="select"><select name="assunto">' + options + '</select>' + NP.icon('chevron-down') + '</span></label>' +
          '<label class="field"><span class="field-label">Sua mensagem</span><textarea class="input" name="msg" rows="4" placeholder="Olá, Nutris! Queria saber mais sobre..."></textarea></label>' +
          '<p class="note">' + NP.icon('info') + '<span>Nesta prévia, a mensagem fica somente neste navegador.</span></p>' +
          '<p class="form-error" data-err hidden></p>' +
          '<button class="btn btn-blue btn-block btn-lg" type="submit">Simular envio ' + NP.icon('chat') + '</button>' +
        '</form>' +
        '<div class="contact-links">' +
          '<a href="' + D.loja.instagram + '" target="_blank" rel="noopener">Visitar o Instagram real ' + NP.icon('arrow-up-right') + '</a>' +
          '<a href="#" data-wa target="_blank" rel="noopener">Chamar no WhatsApp ' + NP.icon('arrow-up-right') + '</a>' +
        '</div>'
    });
    var form = $('form', dlg), wa = $('[data-wa]', dlg), err = $('[data-err]', dlg);
    var syncWa = function () {
      var t = 'Olá, Nutris! ' + (form.nome.value.trim() ? 'Aqui é ' + form.nome.value.trim() + '. ' : '') +
        'Assunto: ' + TOPICS[form.assunto.value] + '. ' + form.msg.value.trim();
      wa.href = 'https://wa.me/' + D.loja.whatsapp + '?text=' + encodeURIComponent(t.trim());
    };
    form.addEventListener('input', syncWa);
    form.addEventListener('change', syncWa);
    syncWa();
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.msg.value.trim()) {
        err.textContent = 'Escreva sua mensagem para simular o envio.';
        err.hidden = false;
        form.msg.focus();
        return;
      }
      $('.dlg-body', dlg).innerHTML =
        '<div class="empty-state is-ok">' + NP.icon('check') +
        '<p class="empty-t">Mensagem simulada!</p>' +
        '<p>Na versão final, ela chega direto para a equipe da Nutris.</p>' +
        '<button class="btn btn-blue" type="button" data-close>Combinado</button></div>';
      $('[data-close]', $('.dlg-body', dlg)).focus();
    });
  };

  /* ---------- Sobre a prévia ---------- */
  NP.openAbout = function () {
    var dlg = NP.openDialog({
      title: 'Sobre esta prévia',
      body:
        '<div class="about">' +
          '<h3>Uma experiência para testar</h3><p>Produtos, preços, frete e cupom são fictícios. Não há pagamento, envio de pedido ou mensagem para a loja.</p>' +
          '<h3>Dados neste navegador</h3><p>Ficam salvos apenas a sacola, os favoritos e os pedidos de teste. Contato e endereço preenchidos no checkout não são guardados. Nenhum número de cartão é solicitado.</p>' +
          '<h3>Antes da loja entrar no ar</h3><p>As condições reais de entrega, troca, privacidade, pagamento e venda de medicamentos com receita serão informadas pela Nutris Pet.</p>' +
        '</div>' +
        '<button class="btn btn-outline btn-block" type="button" data-clear>Limpar meus dados de teste</button>'
    });
    $('[data-clear]', dlg).addEventListener('click', function () {
      NP.clearTestData();
      NP.closeDialog();
      NP.toast('Dados de teste apagados.');
    });
  };

  /* ---------- Comparar ---------- */
  NP.openCompare = function (ids) {
    var ps = ids.map(function (id) { return byId[id]; }).filter(Boolean);
    var row = function (label, fn) {
      return '<tr><th scope="row">' + label + '</th>' + ps.map(function (p) { return '<td>' + fn(p) + '</td>'; }).join('') + '</tr>';
    };
    var dlg = NP.openDialog({
      title: 'Lado a lado',
      size: 'wide',
      body:
        '<div class="cmp-wrap"><table class="cmp"><caption class="sr-only">Comparação dos produtos ilustrativos selecionados</caption>' +
        '<thead><tr><th scope="col"><span class="sr-only">Característica</span></th>' +
        ps.map(function (p) { return '<th scope="col">' + thumb(p, 120) + '<span class="cmp-name">' + p.nome + '</span></th>'; }).join('') +
        '</tr></thead><tbody>' +
        row('Categoria', function (p) { return NP.category(p.cat).nome; }) +
        row('Tipo', function (p) { return p.tipo; }) +
        row('Para quem', function (p) { return p.paraQuem; }) +
        row('Opções', function (p) { return p.opcoes.map(function (o) { return NP.esc(o[0]); }).join(', '); }) +
        (ps.some(function (p) { return p.receita; }) ? row('Receita', function (p) { return p.receita ? '<span class="mini-rx">Exige receita</span>' : 'Venda livre'; }) : '') +
        row('A partir de', function (p) { return '<strong>' + NP.brl(NP.price(p, 0)) + '</strong>'; }) +
        row('<span class="sr-only">Ação</span>', function (p) { return '<button class="btn btn-blue btn-sm" type="button" data-choose="' + p.id + '">Escolher</button>'; }) +
        '</tbody></table></div>'
    });
    dlg.addEventListener('click', function (e) {
      var ch = e.target.closest('[data-choose]');
      if (ch) NP.swap(function () { NP.openProduct(ch.dataset.choose); });
    });
  };

  /* ---------- Ligações globais ---------- */
  document.addEventListener('click', function (e) {
    var o = e.target.closest('[data-open]');
    if (!o) return;
    e.preventDefault();
    var k = o.getAttribute('data-open');
    var map = {
      sacola: NP.openCart,
      favoritos: NP.openFavorites,
      cantinho: NP.openAccount,
      acompanhar: function () { NP.openTrack(); },
      contato: function () { NP.openContact(o.getAttribute('data-topic')); },
      previa: NP.openAbout
    };
    if (map[k]) map[k]();
  });

  function syncCounts() {
    var n = NP.cart.count(), f = NP.favs.list().length;
    $$('[data-cart-count]').forEach(function (el) { el.textContent = n; });
    $$('[data-fav-count]').forEach(function (el) { el.textContent = f; });
    $$('[data-cart-label]').forEach(function (el) { el.setAttribute('aria-label', 'Abrir sacola, ' + n + (n === 1 ? ' item' : ' itens')); });
  }
  NP.syncCounts = syncCounts;
  document.addEventListener('np:cart', syncCounts);
  document.addEventListener('np:favs', syncCounts);
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', syncCounts);
  else syncCounts();

  window.addEventListener('storage', function (e) {
    if (e.key && e.key.indexOf('nutrispet:') === 0) { emit('np:cart'); emit('np:favs'); emit('np:orders'); }
  });
})();

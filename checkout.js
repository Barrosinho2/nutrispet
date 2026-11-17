/* Nutris Pet — checkout de demonstração */
(function () {
  'use strict';

  var NP = window.NP, D = NP.data, $ = NP.$, $$ = NP.$$;
  var forms = { 1: $('[data-step="1"]'), 2: $('[data-step="2"]'), 3: $('[data-step="3"]') };
  var okPanel = $('[data-step="ok"]'), emptyPanel = $('[data-empty]'), stepsEl = $('.steps');
  var state = { step: 1, max: 1, coupon: '', order: null };

  /* ---------- Máscaras ---------- */
  function maskPhone(v) {
    var d = v.replace(/\D/g, '').slice(0, 11);
    if (!d) return '';
    if (d.length <= 2) return '(' + d;
    if (d.length <= 6) return '(' + d.slice(0, 2) + ') ' + d.slice(2);
    if (d.length <= 10) return '(' + d.slice(0, 2) + ') ' + d.slice(2, 6) + '-' + d.slice(6);
    return '(' + d.slice(0, 2) + ') ' + d.slice(2, 7) + '-' + d.slice(7);
  }
  function maskCep(v) {
    var d = v.replace(/\D/g, '').slice(0, 8);
    return d.length > 5 ? d.slice(0, 5) + '-' + d.slice(5) : d;
  }
  forms[1].celular.addEventListener('input', function (e) { e.target.value = maskPhone(e.target.value); });
  forms[2].cep.addEventListener('input', function (e) { e.target.value = maskCep(e.target.value); });

  /* ---------- Valores ---------- */
  var metodo = function () { var r = $('input[name="metodo"]:checked'); return r ? r.value : 'entrega'; };
  var pagamento = function () { var r = $('input[name="pagamento"]:checked'); return r ? r.value : 'pix'; };

  function totals(items) {
    var sub = items.reduce(function (s, i) { return s + NP.price(NP.product(i.id), i.op) * i.qty; }, 0);
    var frete = metodo() === 'retirada' ? 0 : D.loja.frete;
    var desc = state.coupon ? Math.round(sub * D.loja.cupomDesconto * 100) / 100 : 0;
    return { sub: sub, frete: frete, desc: desc, total: Math.max(0, sub - desc + frete) };
  }

  /* ---------- Resumo ---------- */
  function row(label, value, cls) {
    return '<div' + (cls ? ' class="' + cls + '"' : '') + '><dt>' + label + '</dt><dd>' + value + '</dd></div>';
  }

  function renderSummary() {
    var locked = !!state.order;
    var items = locked ? state.order.items : NP.cart.items();
    var box = $('[data-items]');

    if (!items.length) {
      box.innerHTML = '<p class="muted">Nenhum item por aqui ainda.</p>';
    } else {
      box.innerHTML = items.map(function (i) {
        var p = NP.product(i.id);
        var controls = locked ? '' :
          '<div class="qty" role="group" aria-label="Quantidade de ' + NP.esc(p.nome) + '">' +
            '<button type="button" data-qty="-1" data-id="' + i.id + '" data-opi="' + i.op + '" aria-label="Diminuir quantidade">' + NP.icon('minus') + '</button>' +
            '<span>' + i.qty + '</span>' +
            '<button type="button" data-qty="1" data-id="' + i.id + '" data-opi="' + i.op + '" aria-label="Aumentar quantidade">' + NP.icon('plus') + '</button>' +
          '</div>';
        return '<article class="co-item">' +
          '<span class="thumb" style="--tint:' + NP.tint(p) + '"><img src="' + p.img + '" alt="" width="64" height="53"><span class="co-qty-badge">' + i.qty + '</span></span>' +
          '<div><p class="cart-name">' + p.nome + (p.receita ? ' <span class="mini-rx">Receita</span>' : '') + '</p>' +
          '<p class="cart-op">' + NP.esc(p.opcoes[i.op][0]) + '</p>' + controls + '</div>' +
          '<p class="cart-price">' + NP.brl(NP.price(p, i.op) * i.qty) + '</p>' +
        '</article>';
      }).join('');
    }

    var t = locked ? state.order.t : totals(items);
    var freteLabel = (locked ? state.order.metodo : metodo()) === 'retirada' ? 'Retirada na loja' : 'Entrega de teste';
    $('[data-totals]').innerHTML =
      row('Produtos', NP.brl(t.sub)) +
      row(freteLabel, t.frete ? NP.brl(t.frete) : 'Grátis') +
      (t.desc ? row('Cupom ' + D.loja.cupom, '− ' + NP.brl(t.desc), 'is-discount') : '') +
      row('Total', NP.brl(t.total), 'is-total');

    $('[data-coupon-box]').hidden = locked;
    $('[data-rx]').hidden = !(!locked && NP.cart.hasRx());
    $('[data-frete-label]').textContent = NP.brl(D.loja.frete);

    if (!locked) {
      var empty = !items.length;
      emptyPanel.hidden = !empty;
      stepsEl.hidden = empty;
      [1, 2, 3].forEach(function (k) { forms[k].hidden = empty || state.step !== k; });
    }
  }

  $('[data-items]').addEventListener('click', function (e) {
    var q = e.target.closest('[data-qty]');
    if (!q) return;
    var it = NP.cart.items().filter(function (x) { return x.id === q.dataset.id && x.op === +q.dataset.opi; })[0];
    if (it) NP.cart.setQty(it.id, it.op, it.qty + +q.dataset.qty);
  });
  document.addEventListener('np:cart', renderSummary);

  /* ---------- Cupom ---------- */
  $('[data-coupon]').addEventListener('submit', function (e) {
    e.preventDefault();
    var v = $('#f-cupom').value.trim().toUpperCase(), msg = $('[data-coupon-msg]');
    if (!v) {
      msg.textContent = 'Digite o código do cupom.';
      msg.className = 'co-coupon-msg is-err';
    } else if (v === D.loja.cupom) {
      state.coupon = v;
      msg.textContent = 'Cupom aplicado: 10% de desconto nos produtos.';
      msg.className = 'co-coupon-msg is-ok';
    } else {
      state.coupon = '';
      msg.textContent = 'Cupom não encontrado. Para testar, use ' + D.loja.cupom + '.';
      msg.className = 'co-coupon-msg is-err';
    }
    renderSummary();
  });

  /* ---------- Etapas ---------- */
  function show(n) {
    state.step = n;
    [1, 2, 3].forEach(function (k) { forms[k].hidden = k !== n; });
    okPanel.hidden = n !== 'ok';

    $$('[data-step-li]').forEach(function (li) {
      var k = +li.getAttribute('data-step-li');
      var done = n === 'ok' || k < n;
      li.classList.toggle('is-current', k === n);
      li.classList.toggle('is-done', done);
      var b = $('button', li);
      b.disabled = n === 'ok' || k > state.max;
      if (k === n) b.setAttribute('aria-current', 'step'); else b.removeAttribute('aria-current');
      $('.step-num', li).innerHTML = done ? NP.icon('check') : '0' + k;
    });

    var panel = n === 'ok' ? okPanel : forms[n];
    var h = $('h2', panel);
    if (h) { h.setAttribute('tabindex', '-1'); h.focus({ preventScroll: true }); }
    var top = stepsEl.getBoundingClientRect().top;
    if (top < 0 || top > window.innerHeight * .6) {
      window.scrollTo({ top: window.scrollY + top - 16, behavior: NP.reduceMotion() ? 'auto' : 'smooth' });
    }
  }

  $$('[data-goto]').forEach(function (b) {
    b.addEventListener('click', function () {
      var k = +b.getAttribute('data-goto');
      if (k <= state.max && state.step !== 'ok') show(k);
    });
  });
  $$('[data-back]').forEach(function (b) {
    b.addEventListener('click', function () { if (typeof state.step === 'number' && state.step > 1) show(state.step - 1); });
  });

  /* ---------- Validação ---------- */
  function setErr(input, msg) {
    var f = input.closest('.field');
    var e = $('.field-error', f);
    if (!e) {
      e = document.createElement('p');
      e.className = 'field-error';
      e.id = input.id + '-erro';
      f.appendChild(e);
    }
    if (msg) {
      f.classList.add('has-error');
      e.textContent = msg; e.hidden = false;
      input.setAttribute('aria-invalid', 'true');
      input.setAttribute('aria-describedby', e.id);
    } else {
      f.classList.remove('has-error');
      e.hidden = true;
      input.removeAttribute('aria-invalid');
      input.removeAttribute('aria-describedby');
    }
    return !msg;
  }

  function check(list) {
    var first = null;
    list.forEach(function (c) {
      var ok = setErr(c[0], c[1] ? '' : c[2]);
      if (!ok && !first) first = c[0];
    });
    if (first) first.focus();
    return !first;
  }

  function validate1() {
    var f = forms[1];
    return check([
      [f.nome, f.nome.value.trim().split(/\s+/).length >= 2, 'Escreva nome e sobrenome.'],
      [f.email, /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.value.trim()), 'Confira o e-mail. Exemplo: voce@exemplo.com'],
      [f.celular, f.celular.value.replace(/\D/g, '').length >= 10, 'Informe o celular com DDD.']
    ]);
  }

  function validate2() {
    var f = forms[2];
    if (metodo() === 'retirada') return true;
    return check([
      [f.cep, f.cep.value.replace(/\D/g, '').length === 8, 'O CEP tem 8 números.'],
      [f.rua, f.rua.value.trim().length > 2, 'Informe a rua.'],
      [f.bairro, f.bairro.value.trim().length > 1, 'Informe o bairro.'],
      [f.numero, f.numero.value.trim().length > 0, 'Informe o número.']
    ]);
  }

  // limpa o erro assim que o campo é corrigido
  document.addEventListener('input', function (e) {
    var f = e.target.closest && e.target.closest('.field.has-error');
    if (f) setErr(e.target, '');
  });

  /* ---------- Escolhas (cartões de opção) ---------- */
  document.addEventListener('change', function (e) {
    if (!e.target.matches('.choice input')) return;
    var name = e.target.name;
    $$('input[name="' + name + '"]').forEach(function (r) { r.closest('.choice').classList.toggle('is-checked', r.checked); });
    if (name === 'metodo') {
      var ret = metodo() === 'retirada';
      $('[data-endereco]').hidden = ret;
      $('[data-retirada]').hidden = !ret;
      renderSummary();
    }
    if (name === 'pagamento') $('[data-troco]').hidden = e.target.value !== 'dinheiro';
  });

  /* ---------- Dados de teste ---------- */
  $$('[data-fill]').forEach(function (b) {
    b.addEventListener('click', function () {
      if (b.getAttribute('data-fill') === '1') {
        var f = forms[1];
        f.nome.value = 'Mariana Souza';
        f.email.value = 'mariana@exemplo.com';
        f.celular.value = '(15) 99999-1234';
        f.pet.value = 'Thor';
        f.peso.value = '12 kg';
      } else {
        var g = forms[2];
        g.cep.value = '18270-000';
        g.rua.value = 'Rua das Acácias';
        g.bairro.value = 'Centro';
        g.numero.value = '120';
        g.complemento.value = 'Casa';
      }
      $$('.field.has-error', b.closest('form')).forEach(function (fl) { setErr($('.input', fl), ''); });
      NP.toast('Dados de teste preenchidos.');
    });
  });

  /* ---------- Envio das etapas ---------- */
  forms[1].addEventListener('submit', function (e) {
    e.preventDefault();
    if (!validate1()) return;
    state.max = Math.max(state.max, 2);
    show(2);
  });
  forms[2].addEventListener('submit', function (e) {
    e.preventDefault();
    if (!validate2()) return;
    state.max = Math.max(state.max, 3);
    show(3);
  });
  forms[3].addEventListener('submit', function (e) {
    e.preventDefault();
    confirmOrder();
  });

  function confirmOrder() {
    var items = NP.cart.items();
    if (!items.length) { renderSummary(); return; }
    var t = totals(items);
    var rxItem = NP.cart.hasRx();
    var rxWay = rxItem ? ($('input[name="receita"]:checked') || {}).value : null;
    var code = D.loja.prefixoPedido + '-' + String(Math.floor(1000 + Math.random() * 9000));
    var order = {
      code: code,
      createdAt: Date.now(),
      metodo: metodo(),
      pagamento: pagamento(),
      itemsCount: items.reduce(function (n, i) { return n + i.qty; }, 0),
      total: t.total,
      t: t,
      receita: rxWay,
      items: items.map(function (i) { return { id: i.id, op: i.op, qty: i.qty }; })
    };
    NP.orders.add(order);
    state.order = order;
    NP.cart.clear();

    var pay = {
      pix: 'Na versão final, o código Pix aparece aqui para você copiar.',
      cartao: 'O pagamento acontece na maquininha, ' + (order.metodo === 'retirada' ? 'na retirada.' : 'na entrega.'),
      dinheiro: 'O pagamento acontece em dinheiro, ' + (order.metodo === 'retirada' ? 'na retirada.' : 'na entrega.')
    }[order.pagamento];

    okPanel.innerHTML =
      '<span class="co-success-ic">' + NP.icon('check') + '</span>' +
      '<h2>Pedido de teste confirmado!</h2>' +
      '<p>Guarde o código para acompanhar. O pedido fica salvo só neste navegador.</p>' +
      '<p class="co-code">' + code + '</p>' +
      '<p class="note">' + NP.icon('info') + '<span>' + pay + '</span></p>' +
      (rxWay === 'conversa' ? '<div class="rx-box">' + NP.icon('file') + '<span>Falta só a receita: envie a foto pela conversa para a equipe liberar o item com prescrição.</span></div>' : '') +
      (rxWay === 'na-hora' ? '<div class="rx-box">' + NP.icon('file') + '<span>Lembre de apresentar a receita do médico-veterinário ' + (order.metodo === 'retirada' ? 'na retirada.' : 'na entrega.') + '</span></div>' : '') +
      '<div class="co-success-ctas">' +
        '<a class="btn btn-blue btn-lg" href="index.html#acompanhar=' + code + '">Acompanhar pedido ' + NP.icon('package') + '</a>' +
        '<a class="btn btn-outline btn-lg" href="index.html">Voltar para a loja</a>' +
      '</div>';

    renderSummary();
    show('ok');
  }

  /* ---------- Sacola vazia: itens de exemplo ---------- */
  $('[data-sample]').addEventListener('click', function () {
    NP.cart.add('racao-premium-caes', 3, 1);
    NP.cart.add('antipulgas-mastigavel', 2, 1);
    state.step = 1;
    renderSummary();
    show(1);
  });

  renderSummary();
})();

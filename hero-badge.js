/* Nutris Pet — o selo do hero acompanha o cursor (inclinação, brilho e camadas) */
(function () {
  'use strict';

  var hero = document.querySelector('[data-hero]');
  var stage = hero && hero.querySelector('.hero-stage');
  if (!stage) return;

  var badge = stage.querySelector('.hero-badge');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine = window.matchMedia('(pointer: fine)').matches;

  /* toque no selo: uma balançadinha */
  if (badge && !reduce) {
    badge.addEventListener('click', function () {
      badge.classList.remove('is-wiggle');
      void badge.offsetWidth;
      badge.classList.add('is-wiggle');
    });
    badge.addEventListener('animationend', function () { badge.classList.remove('is-wiggle'); });
  }

  if (reduce || !fine) return;

  var tx = 0, ty = 0, cx = 0, cy = 0, raf = 0;
  var clamp = function (v) { return Math.max(-1, Math.min(1, v)); };

  function tick() {
    cx += (tx - cx) * 0.12;
    cy += (ty - cy) * 0.12;
    stage.style.setProperty('--mx', cx.toFixed(3));
    stage.style.setProperty('--my', cy.toFixed(3));
    if (Math.abs(tx - cx) > 0.002 || Math.abs(ty - cy) > 0.002) raf = requestAnimationFrame(tick);
    else raf = 0;
  }

  hero.addEventListener('pointermove', function (e) {
    var r = stage.getBoundingClientRect();
    tx = clamp((e.clientX - (r.left + r.width / 2)) / (r.width / 1.4));
    ty = clamp((e.clientY - (r.top + r.height / 2)) / (r.height / 1.4));
    if (!raf) raf = requestAnimationFrame(tick);
  });

  hero.addEventListener('pointerleave', function () {
    tx = 0; ty = 0;
    if (!raf) raf = requestAnimationFrame(tick);
  });
})();

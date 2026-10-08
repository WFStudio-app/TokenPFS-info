// STT Pro — интерактив документации
document.addEventListener('DOMContentLoaded', () => {
  // бургер-меню
  const burger = document.getElementById('burger');
  const links = document.getElementById('navLinks');
  if (burger && links) {
    burger.addEventListener('click', () => links.classList.toggle('show'));
    links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => links.classList.remove('show')));
  }

  // копирование кода
  document.querySelectorAll('[data-copy]').forEach(btn => {
    btn.addEventListener('click', async () => {
      const code = btn.closest('.code-wrap')?.querySelector('pre');
      if (!code) return;
      try {
        await navigator.clipboard.writeText(code.innerText);
        btn.textContent = '✓ Скопировано';
        btn.classList.add('ok');
      } catch {
        btn.textContent = 'Не удалось';
      }
      setTimeout(() => { btn.textContent = 'Копировать'; btn.classList.remove('ok'); }, 1800);
    });
  });

  // FAQ аккордеон
  document.querySelectorAll('.faq-q').forEach(q => {
    q.addEventListener('click', () => {
      const item = q.parentElement;
      document.querySelectorAll('.faq-item.open').forEach(i => { if (i !== item) i.classList.remove('open'); });
      item.classList.toggle('open');
    });
  });

  // появление секций при скролле
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.style.opacity = 1; e.target.style.transform = 'none'; io.unobserve(e.target); }
  }), { threshold: .08 });
  document.querySelectorAll('.card, .step, .leg, .faq-item').forEach(el => {
    el.style.opacity = 0; el.style.transform = 'translateY(16px)';
    el.style.transition = 'opacity .5s ease, transform .5s ease';
    io.observe(el);
  });
});

// ---------- install tabs + автодетект ОС ----------
(function () {
  const tabs = document.querySelectorAll('#osTabs .tab');
  const panels = document.querySelectorAll('.os-panel');
  function activate(os) {
    tabs.forEach(t => t.classList.toggle('active', t.dataset.os === os));
    panels.forEach(p => p.classList.toggle('active', p.dataset.os === os));
  }
  tabs.forEach(t => t.addEventListener('click', () => activate(t.dataset.os)));
  // автоопределение платформы пользователя
  const ua = navigator.userAgent.toLowerCase();
  let guess = 'linux';
  if (/android/.test(ua)) guess = 'termux';
  else if (/mac|iphone|ipad/.test(ua)) guess = 'macos';
  else if (/win/.test(ua)) guess = 'windows';
  if (document.querySelector('#osTabs')) setTimeout(() => activate(guess), 50);
})();

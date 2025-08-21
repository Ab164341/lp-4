// ===== フェードイン（prefers-reduced-motion に配慮） =====
(function(){
  const targets = document.querySelectorAll('.fade-in');
  if (!targets.length) return;

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) {
    targets.forEach(el => el.classList.add('visible'));
    return;
  }

  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -10% 0px'
  });

  targets.forEach(el => io.observe(el));
})();

// ===== スマホナビの開閉（HTML側に nav-toggle と id="nav" がある場合のみ動作） =====
(function(){
  const btn = document.querySelector('.nav-toggle');
  const nav = document.getElementById('nav');
  if (!btn || !nav) return;

  btn.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    btn.setAttribute('aria-expanded', String(open));
  });
})();

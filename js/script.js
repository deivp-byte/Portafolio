// ── PROGRESS BAR ─────────────────────────────────────────────
const bar = document.getElementById('progressBar');
window.addEventListener('scroll', () => {
  const pct = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
  bar.style.width = Math.min(pct, 100) + '%';
});

// ── HEADER SCROLL ─────────────────────────────────────────────
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 40);
});

// ── CUSTOM CURSOR ─────────────────────────────────────────────
const cursor = document.getElementById('cursor');
const ring   = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;
if(window.matchMedia('(pointer:fine)').matches){
  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
  (function loop(){
    rx += (mx - rx) * .18;
    ry += (my - ry) * .18;
    cursor.style.left = mx + 'px';
    cursor.style.top  = my + 'px';
    ring.style.left   = rx + 'px';
    ring.style.top    = ry + 'px';
    requestAnimationFrame(loop);
  })();
  document.querySelectorAll('a,button,.skill-pill,.project-card,.stat-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.width = '18px'; cursor.style.height = '18px'; cursor.style.opacity = '.6';
      ring.style.width   = '52px'; ring.style.height   = '52px';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.width = '10px'; cursor.style.height = '10px'; cursor.style.opacity = '1';
      ring.style.width   = '36px'; ring.style.height   = '36px';
    });
  });
} else {
  cursor.style.display = 'none';
  ring.style.display   = 'none';
}

// ── MOBILE MENU ───────────────────────────────────────────────
const mMenu  = document.getElementById('mobileMenu');
const mClose = document.getElementById('mobileClose');
document.getElementById('hamburger').addEventListener('click', () => mMenu.classList.add('open'));
mClose.addEventListener('click', () => mMenu.classList.remove('open'));
document.querySelectorAll('.mobile-link').forEach(a => a.addEventListener('click', () => mMenu.classList.remove('open')));

// ── TYPED NAME ────────────────────────────────────────────────
const target = 'Deivid Ruiz Pérez';
let ti = 0;
const el = document.getElementById('typedName');
function typeChar(){
  if(ti <= target.length){
    el.textContent = target.slice(0, ti++);
    setTimeout(typeChar, ti === 1 ? 500 : 60 + Math.random() * 30);
  }
}
typeChar();

// ── SCROLL REVEAL ─────────────────────────────────────────────
const obs = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if(e.isIntersecting){
      setTimeout(() => e.target.classList.add('visible'), i * 80);
      obs.unobserve(e.target);
    }
  });
}, { threshold: .12 });
document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

// ── COUNTER ANIMATION ─────────────────────────────────────────
const countObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if(e.isIntersecting){
      const el = e.target;
      const end = parseInt(el.dataset.count);
      if(isNaN(end)) return;
      let cur = 0;
      const step = Math.max(1, Math.floor(end / 30));
      const t = setInterval(() => {
        cur = Math.min(cur + step, end);
        el.textContent = cur + '+';
        if(cur >= end) clearInterval(t);
      }, 40);
      countObs.unobserve(el);
    }
  });
}, { threshold: .5 });
document.querySelectorAll('[data-count]').forEach(el => countObs.observe(el));

// ── ACTIVE NAV ────────────────────────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navAs    = document.querySelectorAll('.nav-links a[data-section]');
const navObs   = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if(e.isIntersecting){
      navAs.forEach(a => {
        a.classList.toggle('active', a.dataset.section === e.target.id);
      });
    }
  });
}, { threshold: .4 });
sections.forEach(s => navObs.observe(s));

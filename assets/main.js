// ---- Teema (valo/tumma) ----
(function(){
  const doc = document.documentElement;

  function setTheme(mode){
    // Haetaan nappi joka kerta (voi ilmestyä vasta DOMContentLoadedin jälkeen)
    const btn = document.getElementById('themeToggle');
    if (mode === 'light'){
      doc.setAttribute('data-theme','light');
      localStorage.setItem('theme','light');
      if (btn){ btn.setAttribute('aria-pressed','false'); btn.title = 'Vaihda teemaan: tumma'; }
    } else {
      // Tummateema oletuksena :rootissa → poistetaan light
      doc.removeAttribute('data-theme');
      localStorage.setItem('theme','dark');
      if (btn){ btn.setAttribute('aria-pressed','true'); btn.title = 'Vaihda teemaan: vaalea'; }
    }
  }

  const stored = localStorage.getItem('theme'); // 'light' | 'dark' | null
  const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
  setTheme(stored ?? (prefersLight ? 'light' : 'dark'));

  window.toggleTheme = () => {
    const isLight = doc.getAttribute('data-theme') === 'light';
    setTheme(isLight ? 'dark' : 'light');
  };

  // Pikanäppäin: Ctrl/Cmd + J
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'j') {
      e.preventDefault();
      window.toggleTheme();
    }
  });

  // Jos nappi tuli DOMiin vasta nyt, synkkaa sen tila
  document.addEventListener('DOMContentLoaded', () => {
    const current = localStorage.getItem('theme') ?? (prefersLight ? 'light' : 'dark');
    setTheme(current);
  });
})();

// ---- Mobiilivalikko ----
function toggleMenu(){
  const nav = document.getElementById('site-nav');
  const btn = document.querySelector('.menu-btn');
  if (!nav || !btn) return;

  const open = nav.classList.toggle('open');
  btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  document.body.classList.toggle('menu-open', open);
}

// Vuosi, PDF-linkin tarkistus ja klikkisulku naville
document.addEventListener('DOMContentLoaded', () => {
  // Vuosi
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  // Piilota PDF-linkki jos tiedostoa ei ole
  const pdfLink = document.getElementById('pdfLink');
  const pdfNote = document.getElementById('pdfNote');
  if (pdfLink){
    const url = pdfLink.href; // suhteellinen → selain tekee tästä absoluuttisen
    fetch(url, { method: 'HEAD' })
      .then(r => {
        if (!r.ok){
          pdfLink.style.display = 'none';
          if (pdfNote) pdfNote.textContent = 'Lisää myöhemmin tiedosto cv.pdf sivuston juureen.';
        }
      })
      .catch(() => {
        pdfLink.style.display = 'none';
        if (pdfNote) pdfNote.textContent = 'Lisää myöhemmin tiedosto cv.pdf sivuston juureen.';
      });
  }

  // Sulje valikko kun klikataan linkkiä navissa
  const nav = document.getElementById('site-nav');
  const btn = document.querySelector('.menu-btn');
  if (nav && btn){
    nav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        nav.classList.remove('open');
        document.body.classList.remove('menu-open');
        btn.setAttribute('aria-expanded','false');
      });
    });
  }
});

// Sulje valikko ESCillä
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const nav = document.getElementById('site-nav');
    const btn = document.querySelector('.menu-btn');
    if (nav && nav.classList.contains('open')) {
      nav.classList.remove('open');
      document.body.classList.remove('menu-open');
      if (btn) { btn.setAttribute('aria-expanded','false'); btn.focus(); }
    }
  }
});


// Teeman vaihto
(function(){
  const doc = document.documentElement;
  const btn = document.getElementById('themeToggle');
  function setTheme(mode){
    if(mode === 'light'){
      doc.setAttribute('data-theme','light');                
      localStorage.setItem('theme','light');
      if(btn){ btn.setAttribute('aria-pressed', 'false'); btn.title = 'Vaihda teemaan: tumma'; }
    }else{
      // dark-värit ovat oletuksena :rootissa -> poistetaan light
      doc.removeAttribute('data-theme');
      localStorage.setItem('theme','dark');
      if(btn){ btn.setAttribute('aria-pressed', 'true'); btn.title = 'Vaihda teemaan: vaalea'; }
    }
  }

  const stored = localStorage.getItem('theme'); // 'light' | 'dark' | null
  const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
  setTheme(stored ? stored : (prefersLight ? 'light' : 'dark'));

  window.toggleTheme = function(){
    const isLight = doc.getAttribute('data-theme') === 'light';
    setTheme(isLight ? 'dark' : 'light');
  };

   document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'j') {
      e.preventDefault();
      window.toggleTheme();
    }
  });
})();


function toggleMenu(){
  const nav = document.getElementById('site-nav');
  const btn = document.querySelector('.menu-btn');
  const open = nav.classList.toggle('open');
  btn.setAttribute('aria-expanded', open ? 'true' : 'false');
}

document.addEventListener('DOMContentLoaded', () => {
  // Vuosi
  const y = document.getElementById('year');
  if(y) y.textContent = new Date().getFullYear();

  // Piilota PDF-linkki jos tiedostoa ei ole
  const pdfLink = document.getElementById('pdfLink');
  const pdfNote = document.getElementById('pdfNote');
  if(pdfLink){
    fetch('/cv.pdf', { method: 'HEAD' }).then(r => {
      if(!r.ok){
        pdfLink.style.display = 'none';
        if(pdfNote) pdfNote.textContent = 'Lisää myöhemmin tiedosto cv.pdf sivuston juureen.';
      }
    }).catch(()=>{
      pdfLink.style.display = 'none';
      if(pdfNote) pdfNote.textContent = 'Lisää myöhemmin tiedosto cv.pdf sivuston juureen.';
    });
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const nav = document.getElementById('site-nav');
    const btn = document.querySelector('.menu-btn');
    if (nav && nav.classList.contains('open')) {
      nav.classList.remove('open');
      if (btn) btn.setAttribute('aria-expanded', 'false');
      if (btn) btn.focus();
    }
  }
});

(() => {
  const nav = document.getElementById('site-nav');
  const btn = document.querySelector('.menu-btn');
  if (nav && btn) {
    nav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        nav.classList.remove('open');
        document.body.classList.remove('menu-open');
        btn.setAttribute('aria-expanded', 'false');
      });
    });
  }
})();

const _toggleMenu = window.toggleMenu;
window.toggleMenu = function(){
  _toggleMenu && _toggleMenu();
  const nav = document.getElementById('site-nav');
  if (nav && nav.classList.contains('open')) document.body.classList.add('menu-open');
  else document.body.classList.remove('menu-open');
};

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const nav = document.getElementById('site-nav');
    const btn = document.querySelector('.menu-btn');
    if (nav && nav.classList.contains('open')) {
      nav.classList.remove('open');
      document.body.classList.remove('menu-open');
      if (btn) btn.setAttribute('aria-expanded', 'false');
      if (btn) btn.focus();
    }
  }
});
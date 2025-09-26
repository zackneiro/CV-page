
// Teeman vaihto
(function(){
  const saved = localStorage.getItem('theme');
  const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
  if(saved === 'light' || (!saved && prefersLight)){
    document.documentElement.setAttribute('data-theme', 'light');
  }
})();
function toggleTheme(){
  const cur = document.documentElement.getAttribute('data-theme');
  const next = cur === 'light' ? '' : 'light';
  if(next) document.documentElement.setAttribute('data-theme', next);
  else document.documentElement.removeAttribute('data-theme');
  localStorage.setItem('theme', next || 'dark');
}

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

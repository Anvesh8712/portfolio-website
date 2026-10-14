const menu = document.querySelector('.menu');
const nav = document.querySelector('#nav');
function closeMenu() { menu.setAttribute('aria-expanded', 'false'); nav.classList.remove('open'); }
menu.addEventListener('click', () => { const open = menu.getAttribute('aria-expanded') !== 'true'; menu.setAttribute('aria-expanded', String(open)); nav.classList.toggle('open', open); });
nav.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
document.addEventListener('keydown', event => { if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') { closeMenu(); menu.focus(); } });
document.addEventListener('click', event => { if (!event.target.closest('header')) closeMenu(); });
window.matchMedia('(max-width:760px)').addEventListener('change', closeMenu);
const reducedMotion = window.matchMedia('(prefers-reduced-motion:reduce)');
if ('IntersectionObserver' in window && !reducedMotion.matches) {
 const observer = new IntersectionObserver(entries => { entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('pop-in'); observer.unobserve(entry.target); } }); }, {threshold:.08});
 document.querySelectorAll('.section-heading,.work-card,.project-grid article,.research').forEach(element => observer.observe(element));
}
if (window.matchMedia('(hover:hover) and (pointer:fine)').matches) {
 document.querySelectorAll('.kinetic').forEach(element => {
  element.addEventListener('pointermove', event => {
   if(reducedMotion.matches) return;
   const rect = element.getBoundingClientRect();
   element.style.translate = `${(event.clientX-rect.left-rect.width/2)*.08}px ${(event.clientY-rect.top-rect.height/2)*.08}px`;
  });
  element.addEventListener('pointerleave', () => { element.style.translate = ''; });
 });
}

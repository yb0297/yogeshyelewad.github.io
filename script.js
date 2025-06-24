AOS.init({ duration: 800, once: true });

function scrollTo(sel) {
  document.querySelector(sel).scrollIntoView({ behavior: 'smooth' });
}

particlesJS('tech-bg', {
  particles: { number: { value: 60 }, size: { value: 3 }, line_linked: { enable: true }, move: { speed: 1 } },
  interactivity: { events: { onhover: { enable: true, mode: 'grab' } } }
});

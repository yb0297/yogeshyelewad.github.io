// Scroll helper
function scrollTo(selector) {
  document.querySelector(selector).scrollIntoView({ behavior: 'smooth' });
}

// AOS init
AOS.init({ duration:1000, once:true });

// Back to top show logic
const toTop = document.getElementById('toTop');
window.addEventListener('scroll', () => {
  toTop.classList.toggle('show', window.scrollY > window.innerHeight);
});
toTop.addEventListener('click', () => scrollTo('#hero'));

// Theme toggle
const themeBtn = document.getElementById('theme-toggle');
themeBtn.addEventListener('click', () => {
  document.body.classList.toggle('light');
  themeBtn.textContent = document.body.classList.contains('light') ? '🌙' : '☀️';
});

// ParticlesJS init
particlesJS('particles-js', {
  particles: {
    number: { value: 80 },
    size: { value: 3 },
    move: { speed: 1 },
    line_linked: { enable: true },
  },
  interactivity: {
    events: { onhover: { enable: true, mode: "grab" } }
  }
});

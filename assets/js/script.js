const dataEndpoints = {
  experience: 'assets/data/experience.json',
  education: 'assets/data/education.json',
  certificates: 'assets/data/certificates.json',
  projects: 'assets/data/projects.json'
};

async function loadSection(section) {
  const res = await fetch(dataEndpoints[section]);
  const items = await res.json();
  const sec = document.getElementById(section);
  sec.innerHTML = `<h2>${section.charAt(0).toUpperCase()+section.slice(1)}</h2>`;
  items.forEach(it => {
    const div = document.createElement('div');
    div.className = 'item';
    div.innerHTML = `<h3>${it.title}</h3><p>${it.desc}</p><span>${it.date}</span>`;
    sec.appendChild(div);
  });
}

document.querySelectorAll('.navbar button[data-target]').forEach(btn => {
  btn.addEventListener('click', async () => {
    const secName = btn.getAttribute('data-target');
    if (!document.getElementById(secName).innerHTML.trim()) {
      await loadSection(secName);
    }
    document.getElementById(secName).scrollIntoView({ behavior: 'smooth' });
  });
});

const skills = ['IoT', 'Python', 'Machine Learning', 'Visible Light Communication', 'Leadership'];
const grid = document.querySelector('.skill-grid');
skills.forEach(s => {
  const card = document.createElement('div');
  card.className = 'skill-card';
  card.innerText = s;
  grid.appendChild(card);
});

// Theme toggle
const tbtn = document.getElementById('theme-toggle');
tbtn.addEventListener('click', () => {
  document.body.classList.toggle('light');
  tbtn.textContent = document.body.classList.contains('light') ? '🌙' : '☀️';
});

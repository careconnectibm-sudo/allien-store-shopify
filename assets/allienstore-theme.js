// Category pill interaction
document.querySelectorAll('.cat-pill-allien').forEach(pill => {
  pill.addEventListener('click', () => {
    document.querySelectorAll('.cat-pill-allien').forEach(p => p.classList.remove('active'));
    pill.classList.add('active');
  });
});

// Nav smooth active on scroll
const sections_allien = document.querySelectorAll('section[id], div[id]');
const navLinks_allien = document.querySelectorAll('.nav-link-allien');
window.addEventListener('scroll', () => {
  let current = '';
  sections_allien.forEach(s => {
    if (window.scrollY >= s.offsetTop - 100) current = s.id;
  });
  navLinks_allien.forEach(l => {
    l.classList.remove('active');
    if (l.getAttribute('href') === '#' + current) l.classList.add('active');
  });
});

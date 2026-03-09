// Nav/Item — MonoSchemes Design System
// Highlights the active nav item by adding a persistent bottom border.

document.querySelectorAll('.nav-demo .nav-item').forEach((item) => {
  item.addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelectorAll('.nav-demo .nav-item').forEach((el) => {
      el.removeAttribute('data-status');
    });
    item.setAttribute('data-status', 'hover');
  });
});

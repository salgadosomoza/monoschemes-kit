// Button Icon - MonoSchemes
// No extra JS needed beyond button.js behaviour.
// This file is a placeholder for future icon-swap or loading state logic.

document.querySelectorAll('.btn-icon:not([disabled]):not(.btn-disabled)').forEach(btn => {
  btn.addEventListener('click', function () {
    this.classList.add('btn-clicking');
    setTimeout(() => this.classList.remove('btn-clicking'), 150);
  });
});

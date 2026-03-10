// Button Component - MonoSchemes
// Ripple effect on click for interactive feedback

document.querySelectorAll('.btn:not([disabled]):not(.btn-disabled)').forEach(btn => {
  btn.addEventListener('click', function (e) {
    // Brief active class for visual feedback
    this.classList.add('btn-clicking');
    setTimeout(() => this.classList.remove('btn-clicking'), 150);
  });
});

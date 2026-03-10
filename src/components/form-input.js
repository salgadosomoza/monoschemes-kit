// Form Input - MonoSchemes

// Password toggle
document.querySelectorAll('.toggle-password').forEach(btn => {
  btn.addEventListener('click', () => {
    const targetId = btn.dataset.target;
    const input = document.getElementById(targetId);
    if (!input) return;
    const isPassword = input.type === 'password';
    input.type = isPassword ? 'text' : 'password';
    btn.setAttribute('aria-label', isPassword ? 'Hide password' : 'Show password');
  });
});

// Inline validation on blur
document.querySelectorAll('.form-input[required]').forEach(input => {
  input.addEventListener('blur', () => validate(input));
  input.addEventListener('input', () => {
    if (input.classList.contains('error')) validate(input);
  });
});

function validate(input) {
  const msgEl = document.getElementById(input.id + '-msg');
  let error = '';

  if (input.validity.valueMissing) {
    error = 'This field is required.';
  } else if (input.validity.typeMismatch && input.type === 'email') {
    error = 'Enter a valid email address.';
  } else if (input.validity.tooShort) {
    error = `Minimum ${input.minLength} characters required.`;
  }

  input.classList.toggle('error', !!error);
  input.setAttribute('aria-invalid', !!error);
  if (msgEl) {
    msgEl.textContent = error;
    msgEl.classList.toggle('error', !!error);
  }
}

// Demo form submit
const demoForm = document.getElementById('demo-form');
if (demoForm) {
  demoForm.addEventListener('submit', e => {
    e.preventDefault();
    demoForm.querySelectorAll('input[required]').forEach(validate);
  });
}

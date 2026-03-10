// Form Search - MonoSchemes

document.querySelectorAll('.search-wrapper').forEach(wrapper => {
  const input = wrapper.querySelector('.search-input');
  const clearBtn = wrapper.querySelector('.search-clear');
  if (!input || !clearBtn) return;

  function update() {
    clearBtn.classList.toggle('visible', input.value.length > 0);
  }

  input.addEventListener('input', update);

  clearBtn.addEventListener('click', () => {
    input.value = '';
    update();
    input.focus();
  });

  // Support native search clear (×)
  input.addEventListener('search', update);

  update();
});

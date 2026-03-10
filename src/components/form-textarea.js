// Form Textarea - MonoSchemes

const textarea = document.getElementById('textarea-count');
const counter = document.getElementById('char-counter');

if (textarea && counter) {
  const max = textarea.maxLength;

  function update() {
    const len = textarea.value.length;
    counter.textContent = `${len} / ${max}`;
    counter.classList.toggle('over-limit', len >= max);
  }

  textarea.addEventListener('input', update);
  update();
}

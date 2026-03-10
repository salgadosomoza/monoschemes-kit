// Tag Component - MonoSchemes

// ── Static overflow (expand on click) ────────────────────────────────────────
const overflowBtn = document.getElementById('tag-overflow-btn');
if (overflowBtn) {
  overflowBtn.addEventListener('click', () => {
    const hidden = document.querySelectorAll('#tag-overflow-group .tag-hidden');
    hidden.forEach(t => t.classList.remove('tag-hidden'));
    overflowBtn.remove();
  });
}

// ── Live overflow demo ────────────────────────────────────────────────────────
const ALL_TAGS = ['One', 'Two', 'Thirteen', 'Four', 'Five'];

function buildOverflowGroup(container, limit) {
  container.innerHTML = '';

  ALL_TAGS.forEach((label, i) => {
    const tag = document.createElement('span');
    tag.className = 'tag';
    tag.setAttribute('role', 'listitem');
    tag.textContent = label;

    if (i >= limit) tag.classList.add('tag-hidden');
    container.appendChild(tag);
  });

  const hidden = ALL_TAGS.length - limit;
  if (hidden > 0) {
    const btn = document.createElement('button');
    btn.className = 'tag tag-overflow';
    btn.type = 'button';
    btn.textContent = `+${hidden}`;
    btn.setAttribute('aria-label', `Show ${hidden} more tag${hidden > 1 ? 's' : ''}`);
    btn.addEventListener('click', () => {
      container.querySelectorAll('.tag-hidden').forEach(t => t.classList.remove('tag-hidden'));
      btn.remove();
    });
    container.appendChild(btn);
  }
}

const liveGroup = document.getElementById('live-overflow-group');
const limitSelect = document.getElementById('overflow-limit');
const rebuildBtn = document.getElementById('rebuild-overflow');

if (liveGroup && limitSelect && rebuildBtn) {
  buildOverflowGroup(liveGroup, parseInt(limitSelect.value, 10));

  rebuildBtn.addEventListener('click', () => {
    buildOverflowGroup(liveGroup, parseInt(limitSelect.value, 10));
  });
}

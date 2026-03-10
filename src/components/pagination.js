// Pagination Component - MonoSchemes
// Figma: '8:335' pagination — row gap 40px,
//        active page: full border; inactive: border-bottom only

// ── Utility: render pages into a container ────────────────────────────────────
function renderPages(container, current, total) {
  container.innerHTML = '';
  for (let p = 1; p <= total; p++) {
    const btn = document.createElement('button');
    btn.className = 'pag-btn pag-page';
    btn.type = 'button';
    btn.textContent = p;
    btn.setAttribute('aria-label', `Page ${p}`);
    if (p === current) {
      btn.setAttribute('aria-current', 'page');
    }
    container.appendChild(btn);
  }
}

// ── Wire up a static pagination nav (non-interactive) ────────────────────────
// These already have their markup in HTML; just ensure correct aria-current.
function syncStaticNav(nav) {
  const current = parseInt(nav.dataset.currentPage, 10);
  const pages   = nav.querySelectorAll('.pag-page');
  pages.forEach((btn, i) => {
    if (i + 1 === current) {
      btn.setAttribute('aria-current', 'page');
    } else {
      btn.removeAttribute('aria-current');
    }
  });

  const prev = nav.querySelector('.pag-prev');
  const next = nav.querySelector('.pag-next');
  const total = parseInt(nav.dataset.totalPages, 10);

  if (prev) {
    const disabled = current <= 1;
    prev.disabled = disabled;
    prev.setAttribute('aria-disabled', disabled);
  }
  if (next) {
    const disabled = current >= total;
    next.disabled = disabled;
    next.setAttribute('aria-disabled', disabled);
  }
}

document.querySelectorAll('.pagination:not(#pag-interactive)').forEach(syncStaticNav);

// ── Interactive pagination ────────────────────────────────────────────────────
const interactiveNav   = document.getElementById('pag-interactive');
const interactivePages = document.getElementById('pag-interactive-pages');
const statusEl         = document.getElementById('pag-status');

if (interactiveNav && interactivePages) {
  let current = parseInt(interactiveNav.dataset.currentPage, 10);
  const total = parseInt(interactiveNav.dataset.totalPages, 10);

  const prevBtn = interactiveNav.querySelector('.pag-prev');
  const nextBtn = interactiveNav.querySelector('.pag-next');

  function goTo(page) {
    current = Math.max(1, Math.min(total, page));
    interactiveNav.dataset.currentPage = current;

    // Re-render page buttons
    renderPages(interactivePages, current, total);

    // Wire clicks on newly created buttons
    interactivePages.querySelectorAll('.pag-page').forEach((btn, i) => {
      btn.addEventListener('click', () => goTo(i + 1));
    });

    // Prev / Next state
    prevBtn.disabled = current <= 1;
    prevBtn.setAttribute('aria-disabled', current <= 1);
    nextBtn.disabled = current >= total;
    nextBtn.setAttribute('aria-disabled', current >= total);

    // Status text
    if (statusEl) {
      statusEl.innerHTML = `Current page: <strong>${current}</strong> of ${total}`;
    }
  }

  prevBtn.addEventListener('click', () => goTo(current - 1));
  nextBtn.addEventListener('click', () => goTo(current + 1));

  // Initial render
  goTo(current);
}

// Table Component - MonoSchemes
// Features: sort, row selection, search, pagination

// ─── Dataset ────────────────────────────────────────────────────────────────
const ALL_ROWS = [
  { id: 'PRD-001', name: 'Mono Serif Typeface',    category: 'Typography', price: 49,  stock: 120, status: 'active',   date: '2025-01-14' },
  { id: 'PRD-002', name: 'Grid System Starter',    category: 'Layout',     price: 29,  stock: 85,  status: 'active',   date: '2025-01-20' },
  { id: 'PRD-003', name: 'Icon Pack Vol. 1',       category: 'Icons',      price: 19,  stock: 340, status: 'active',   date: '2025-02-03' },
  { id: 'PRD-004', name: 'Dark Theme Bundle',      category: 'Themes',     price: 59,  stock: 0,   status: 'inactive', date: '2025-02-11' },
  { id: 'PRD-005', name: 'Component Library Pro',  category: 'UI Kit',     price: 99,  stock: 52,  status: 'active',   date: '2025-02-28' },
  { id: 'PRD-006', name: 'Motion Preset Pack',     category: 'Animation',  price: 39,  stock: 17,  status: 'pending',  date: '2025-03-05' },
  { id: 'PRD-007', name: 'Data Viz Templates',     category: 'Charts',     price: 45,  stock: 63,  status: 'active',   date: '2025-03-12' },
  { id: 'PRD-008', name: 'Form Controls Kit',      category: 'UI Kit',     price: 29,  stock: 200, status: 'active',   date: '2025-03-19' },
  { id: 'PRD-009', name: 'Brand Identity Starter', category: 'Branding',   price: 79,  stock: 0,   status: 'inactive', date: '2025-03-26' },
  { id: 'PRD-010', name: 'Responsive Grid Pro',    category: 'Layout',     price: 35,  stock: 44,  status: 'pending',  date: '2025-04-02' },
  { id: 'PRD-011', name: 'Illustration Pack',      category: 'Graphics',   price: 55,  stock: 130, status: 'active',   date: '2025-04-09' },
  { id: 'PRD-012', name: 'Email Template Bundle',  category: 'Templates',  price: 49,  stock: 91,  status: 'active',   date: '2025-04-16' },
  { id: 'PRD-013', name: 'Dashboard UI Kit',       category: 'UI Kit',     price: 89,  stock: 8,   status: 'pending',  date: '2025-04-23' },
  { id: 'PRD-014', name: 'Icon Pack Vol. 2',       category: 'Icons',      price: 19,  stock: 275, status: 'active',   date: '2025-05-01' },
  { id: 'PRD-015', name: 'Print Template Set',     category: 'Templates',  price: 65,  stock: 0,   status: 'inactive', date: '2025-05-08' },
  { id: 'PRD-016', name: 'Color System Guide',     category: 'Branding',   price: 25,  stock: 180, status: 'active',   date: '2025-05-15' },
  { id: 'PRD-017', name: 'Accessibility Toolkit',  category: 'UI Kit',     price: 39,  stock: 55,  status: 'active',   date: '2025-05-22' },
  { id: 'PRD-018', name: 'Social Media Kit',       category: 'Templates',  price: 29,  stock: 320, status: 'active',   date: '2025-05-29' },
  { id: 'PRD-019', name: 'Navigation Patterns',    category: 'UI Kit',     price: 44,  stock: 72,  status: 'pending',  date: '2025-06-05' },
  { id: 'PRD-020', name: 'Micro-interaction Pack', category: 'Animation',  price: 59,  stock: 33,  status: 'active',   date: '2025-06-12' },
];

// ─── State ───────────────────────────────────────────────────────────────────
const state = {
  rows: [...ALL_ROWS],
  filtered: [...ALL_ROWS],
  sortCol: null,
  sortDir: 'none',         // 'asc' | 'desc' | 'none'
  selected: new Set(),
  page: 1,
  perPage: 10,
  query: '',
};

// ─── DOM refs ────────────────────────────────────────────────────────────────
const tbody        = document.getElementById('table-body');
const emptyEl      = document.getElementById('table-empty');
const selectAllCb  = document.getElementById('select-all');
const selectionInfo= document.getElementById('selection-info');
const paginInfo    = document.getElementById('pagination-info');
const pageNumbers  = document.getElementById('page-numbers');
const btnPrev      = document.getElementById('btn-prev');
const btnNext      = document.getElementById('btn-next');
const searchInput  = document.getElementById('table-search');
const perPageSel   = document.getElementById('per-page');
const sortHeaders  = document.querySelectorAll('th.th-sortable');

// ─── Helpers ─────────────────────────────────────────────────────────────────
function fmtPrice(n) {
  return '$' + n.toFixed(2);
}

function fmtDate(iso) {
  const [y, m, d] = iso.split('-');
  return `${m}/${d}/${y}`;
}

function statusBadge(s) {
  const cls = { active: 'badge-active', pending: 'badge-pending', inactive: 'badge-inactive' }[s] || '';
  return `<span class="badge ${cls}">${s}</span>`;
}

function totalPages() {
  return Math.max(1, Math.ceil(state.filtered.length / state.perPage));
}

function pageSlice() {
  const start = (state.page - 1) * state.perPage;
  return state.filtered.slice(start, start + state.perPage);
}

// ─── Render rows ─────────────────────────────────────────────────────────────
function renderRows() {
  const slice = pageSlice();
  tbody.innerHTML = '';

  if (slice.length === 0) {
    emptyEl.hidden = false;
    return;
  }
  emptyEl.hidden = true;

  slice.forEach(row => {
    const checked = state.selected.has(row.id);
    const tr = document.createElement('tr');
    if (checked) tr.classList.add('selected');
    tr.dataset.id = row.id;

    tr.innerHTML = `
      <td class="col-check">
        <input type="checkbox" class="row-checkbox" aria-label="Select row ${row.id}" ${checked ? 'checked' : ''}>
      </td>
      <td class="col-id" title="${row.id}">${row.id}</td>
      <td class="col-name" title="${row.name}">${row.name}</td>
      <td class="col-cat">${row.category}</td>
      <td class="col-price">${fmtPrice(row.price)}</td>
      <td class="col-stock">${row.stock}</td>
      <td class="col-status">${statusBadge(row.status)}</td>
      <td class="col-date">${fmtDate(row.date)}</td>
      <td class="col-action"><button class="cell-action" type="button" data-id="${row.id}">Edit</button></td>
    `;

    // Row checkbox
    const cb = tr.querySelector('.row-checkbox');
    cb.addEventListener('change', () => toggleRow(row.id, cb.checked, tr));

    // Cell action
    tr.querySelector('.cell-action').addEventListener('click', () => {
      alert(`Edit: ${row.name} (${row.id})`);
    });

    tbody.appendChild(tr);
  });

  updateSelectAllState();
  renderSelectionInfo();
}

// ─── Selection ────────────────────────────────────────────────────────────────
function toggleRow(id, checked, tr) {
  if (checked) {
    state.selected.add(id);
    tr.classList.add('selected');
  } else {
    state.selected.delete(id);
    tr.classList.remove('selected');
  }
  updateSelectAllState();
  renderSelectionInfo();
}

function updateSelectAllState() {
  const slice = pageSlice();
  const pageIds = slice.map(r => r.id);
  const allChecked = pageIds.length > 0 && pageIds.every(id => state.selected.has(id));
  const someChecked = pageIds.some(id => state.selected.has(id));

  selectAllCb.checked = allChecked;
  selectAllCb.indeterminate = !allChecked && someChecked;
}

function renderSelectionInfo() {
  const n = state.selected.size;
  selectionInfo.innerHTML = n > 0
    ? `<strong>${n}</strong> row${n > 1 ? 's' : ''} selected`
    : '';
}

selectAllCb.addEventListener('change', () => {
  const slice = pageSlice();
  slice.forEach(row => {
    if (selectAllCb.checked) {
      state.selected.add(row.id);
    } else {
      state.selected.delete(row.id);
    }
  });
  renderRows();
});

// ─── Sorting ──────────────────────────────────────────────────────────────────
sortHeaders.forEach(th => {
  th.addEventListener('click', () => {
    const col = th.dataset.col;

    // Cycle: none → asc → desc → none
    if (state.sortCol !== col) {
      state.sortCol = col;
      state.sortDir = 'asc';
    } else {
      state.sortDir = state.sortDir === 'asc' ? 'desc' : state.sortDir === 'desc' ? 'none' : 'asc';
      if (state.sortDir === 'none') state.sortCol = null;
    }

    applySort();

    // Update aria-sort on all headers
    sortHeaders.forEach(h => {
      if (h.dataset.col === col && state.sortDir !== 'none') {
        h.setAttribute('aria-sort', state.sortDir === 'asc' ? 'ascending' : 'descending');
      } else {
        h.setAttribute('aria-sort', 'none');
      }
    });

    state.page = 1;
    renderRows();
    renderPagination();
  });
});

function applySort() {
  if (!state.sortCol || state.sortDir === 'none') {
    state.filtered = [...applyFilter()];
    return;
  }
  const col = state.sortCol;
  const dir = state.sortDir === 'asc' ? 1 : -1;

  state.filtered = [...applyFilter()].sort((a, b) => {
    let va = a[col], vb = b[col];
    if (typeof va === 'string') return va.localeCompare(vb) * dir;
    return (va - vb) * dir;
  });
}

// ─── Search / Filter ─────────────────────────────────────────────────────────
function applyFilter() {
  const q = state.query.toLowerCase().trim();
  if (!q) return ALL_ROWS;
  return ALL_ROWS.filter(r =>
    r.id.toLowerCase().includes(q) ||
    r.name.toLowerCase().includes(q) ||
    r.category.toLowerCase().includes(q) ||
    r.status.toLowerCase().includes(q)
  );
}

searchInput.addEventListener('input', () => {
  state.query = searchInput.value;
  state.page = 1;
  applySort();
  renderRows();
  renderPagination();
});

// ─── Pagination ───────────────────────────────────────────────────────────────
function renderPagination() {
  const total = totalPages();
  const start = (state.page - 1) * state.perPage + 1;
  const end   = Math.min(state.page * state.perPage, state.filtered.length);

  paginInfo.textContent = state.filtered.length > 0
    ? `${start}–${end} of ${state.filtered.length}`
    : '0 results';

  btnPrev.disabled = state.page <= 1;
  btnNext.disabled = state.page >= total;

  // Page number buttons (show up to 5)
  pageNumbers.innerHTML = '';
  const range = getPageRange(state.page, total, 5);

  range.forEach(p => {
    if (p === '…') {
      const el = document.createElement('span');
      el.className = 'page-btn';
      el.style.cursor = 'default';
      el.textContent = '…';
      pageNumbers.appendChild(el);
    } else {
      const btn = document.createElement('button');
      btn.className = 'page-btn' + (p === state.page ? ' active' : '');
      btn.type = 'button';
      btn.textContent = p;
      btn.setAttribute('aria-label', `Page ${p}`);
      if (p === state.page) btn.setAttribute('aria-current', 'page');
      btn.addEventListener('click', () => {
        state.page = p;
        renderRows();
        renderPagination();
      });
      pageNumbers.appendChild(btn);
    }
  });
}

function getPageRange(current, total, size) {
  if (total <= size) return Array.from({ length: total }, (_, i) => i + 1);
  const half = Math.floor(size / 2);
  let start = Math.max(1, current - half);
  let end   = start + size - 1;
  if (end > total) { end = total; start = Math.max(1, end - size + 1); }

  const range = [];
  if (start > 1) { range.push(1); if (start > 2) range.push('…'); }
  for (let i = start; i <= end; i++) range.push(i);
  if (end < total) { if (end < total - 1) range.push('…'); range.push(total); }
  return range;
}

btnPrev.addEventListener('click', () => {
  if (state.page > 1) { state.page--; renderRows(); renderPagination(); }
});

btnNext.addEventListener('click', () => {
  if (state.page < totalPages()) { state.page++; renderRows(); renderPagination(); }
});

perPageSel.addEventListener('change', () => {
  state.perPage = parseInt(perPageSel.value, 10);
  state.page = 1;
  renderRows();
  renderPagination();
});

// ─── Export (demo) ────────────────────────────────────────────────────────────
document.getElementById('btn-export').addEventListener('click', () => {
  const header = 'ID,Name,Category,Price,Stock,Status,Date';
  const rows = state.filtered.map(r =>
    [r.id, `"${r.name}"`, r.category, r.price, r.stock, r.status, r.date].join(',')
  );
  const csv = [header, ...rows].join('\n');
  const a = document.createElement('a');
  a.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv);
  a.download = 'products.csv';
  a.click();
});

document.getElementById('btn-add').addEventListener('click', () => {
  alert('Add product — connect to your form/modal here.');
});

// ─── Init ─────────────────────────────────────────────────────────────────────
applySort();
renderRows();
renderPagination();

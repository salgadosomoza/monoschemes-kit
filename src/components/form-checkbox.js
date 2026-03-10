// Form Checkbox - MonoSchemes

// Set indeterminate state on the demo checkbox
const indeterminate = document.getElementById('cb-indeterminate');
if (indeterminate) {
  indeterminate.indeterminate = true;
}

// Select All pattern
const selectAll = document.getElementById('cb-select-all');
const childCbs = document.querySelectorAll('.child-cb');

function updateSelectAll() {
  if (!selectAll) return;
  const total = childCbs.length;
  const checked = [...childCbs].filter(cb => cb.checked).length;
  selectAll.checked = checked === total;
  selectAll.indeterminate = checked > 0 && checked < total;
}

if (selectAll) {
  updateSelectAll();

  selectAll.addEventListener('change', () => {
    childCbs.forEach(cb => { cb.checked = selectAll.checked; });
  });

  childCbs.forEach(cb => {
    cb.addEventListener('change', updateSelectAll);
  });
}

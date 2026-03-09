// Chip — MonoSchemes Design System
// Close: removes the chip. Drag: reorders within its group.

// ─── Close ───────────────────────────────────────────
document.querySelectorAll('.chip-close').forEach((btn) => {
  btn.addEventListener('click', () => {
    btn.closest('.chip').remove();
  });
});

// ─── Drag & drop (reorder within group) ──────────────
let dragSrc = null;

document.querySelectorAll('.chip[draggable="true"]').forEach((chip) => {
  chip.addEventListener('dragstart', (e) => {
    dragSrc = chip;
    chip.dataset.dragging = '';
    e.dataTransfer.effectAllowed = 'move';
  });

  chip.addEventListener('dragend', () => {
    delete chip.dataset.dragging;
    dragSrc = null;
  });

  chip.addEventListener('dragover', (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  });

  chip.addEventListener('drop', (e) => {
    e.preventDefault();
    if (dragSrc && dragSrc !== chip) {
      const group = chip.parentElement;
      const chips = [...group.children];
      const srcIdx = chips.indexOf(dragSrc);
      const tgtIdx = chips.indexOf(chip);
      if (srcIdx < tgtIdx) {
        group.insertBefore(dragSrc, chip.nextSibling);
      } else {
        group.insertBefore(dragSrc, chip);
      }
    }
  });
});

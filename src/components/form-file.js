// Form File Upload - MonoSchemes

function formatBytes(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

function renderFileItem(file, list) {
  const item = document.createElement('div');
  item.className = 'file-item';
  item.innerHTML = `
    <svg class="file-item-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11z"/>
    </svg>
    <span class="file-item-name" title="${file.name}">${file.name}</span>
    <span class="file-item-size">${formatBytes(file.size)}</span>
    <button class="file-item-remove" type="button" aria-label="Remove ${file.name}">
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
      </svg>
    </button>
  `;
  item.querySelector('.file-item-remove').addEventListener('click', () => item.remove());
  list.appendChild(item);
}

// Button variant
const buttonInput = document.getElementById('file-button-input');
const buttonList = document.getElementById('file-button-list');
const buttonStatus = document.getElementById('file-button-status');

if (buttonInput && buttonList) {
  buttonInput.addEventListener('change', () => {
    buttonList.innerHTML = '';
    const files = [...buttonInput.files];
    files.forEach(f => renderFileItem(f, buttonList));
    if (buttonStatus) {
      buttonStatus.textContent = files.length === 0
        ? 'No file chosen'
        : `${files.length} file${files.length > 1 ? 's' : ''} selected`;
    }
    buttonInput.value = '';
  });
}

// Drag & Drop variant
const dropZone = document.getElementById('drop-zone');
const dropInput = document.getElementById('file-drop-input');
const dropList = document.getElementById('file-drop-list');

if (dropZone && dropInput && dropList) {
  // Click opens file dialog
  dropZone.addEventListener('click', () => dropInput.click());
  dropZone.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      dropInput.click();
    }
  });

  dropInput.addEventListener('change', () => {
    [...dropInput.files].forEach(f => renderFileItem(f, dropList));
    dropInput.value = '';
  });

  // Drag events
  dropZone.addEventListener('dragover', e => {
    e.preventDefault();
    dropZone.classList.add('drag-over');
  });

  dropZone.addEventListener('dragleave', e => {
    if (!dropZone.contains(e.relatedTarget)) {
      dropZone.classList.remove('drag-over');
    }
  });

  dropZone.addEventListener('drop', e => {
    e.preventDefault();
    dropZone.classList.remove('drag-over');
    const files = [...e.dataTransfer.files];
    files.forEach(f => renderFileItem(f, dropList));
  });
}

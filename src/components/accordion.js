const accordions = document.querySelectorAll('.accordion');

accordions.forEach(accordion => {
  const header = accordion.querySelector('.accordion-header');
  
  header.addEventListener('click', () => {
    const currentState = accordion.dataset.state;
    accordion.dataset.state = currentState === 'collapsed' ? 'expanded' : 'collapsed';
  });
  
  header.setAttribute('tabindex', '0');
});

console.log('✅ Accordion loaded:', accordions.length);
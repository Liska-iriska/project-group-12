import Accordion from 'accordion-js';
import 'accordion-js/dist/accordion.min.css';

export function initFaqAccordion() {
  const container = document.querySelector('.accordion-container');

  if (container) {
    new Accordion(container, {
      duration: 400,
      showMultiple: false,
      collapse: true,
      elementClass: 'ac',
      triggerClass: 'ac-trigger',
      panelClass: 'ac-panel',
    });
  }
}

initFaqAccordion();
import Accordion from "accordion-js";
import "accordion-js/dist/accordion.min.css";

new Accordion(".accordion-container");

document.querySelectorAll('.ac').forEach(item => {

  const trigger = item.querySelector('.ac-trigger');
  const panel = item.querySelector('.ac-panel');

  trigger.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');
    
    document.querySelectorAll('.ac').forEach(el => {
      el.classList.remove('open');
      el.querySelector('.ac-panel').style.maxHeight = null;
    });

    if (!isOpen) {
      item.classList.add('open');
      panel.style.maxHeight = panel.scrollHeight + 'px';
    }
  });
});
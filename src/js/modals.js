if (history.scrollRestoration) {
  history.scrollRestoration = 'manual';
}

import { showSuccess } from './utils/toast.js';
const furnitureModal = document.querySelector('.furniture-modal');
const orderModal = document.querySelector('.modal-overlay');
const orderForm = document.querySelector('.order-form'); // Знаходимо форму

export function initModals() {
  if (!furnitureModal || !orderModal) return;

  document.addEventListener('click', event => {
    const target = event.target;

    if (target.closest('.card-btn') || target.closest('.popular-btn')) {
      furnitureModal.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    }

    if (target.closest('.order-button-modal')) {
      furnitureModal.style.display = 'none';
      orderModal.style.display = 'flex';
    }

    const isCloseBtn =
      target.closest('.close-btn') || target.closest('.modal-close-btn');
    const isBackdrop = target === furnitureModal || target === orderModal;

    if (isCloseBtn || isBackdrop) {
      closeAllModals();
    }
  });

  if (orderForm) {
    orderForm.addEventListener('submit', event => {
      event.preventDefault();

      showSuccess('Заявку надіслано! Ми скоро зателефонуємо.');
      closeAllModals();
      orderForm.reset();
    });
  }
}

function closeAllModals() {
  furnitureModal.style.display = 'none';
  orderModal.style.display = 'none';
  document.body.style.overflow = 'initial';
}

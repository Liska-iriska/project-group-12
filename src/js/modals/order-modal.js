import { createOrder } from '../api/furniture-api';
import { refs } from '../refs';
import { state } from '../state';
import { showError, showSuccess } from '../utils/toast';
import { unlockBodyScroll } from '../utils/helpers';

function closeOrderModal() {
  refs.orderModal.classList.remove('is-open');
  unlockBodyScroll();
}

function validateOrderData({ name, phone, modelId, color, comment }) {
  if (!name || name.trim().length < 2 || name.trim().length > 64) {
    showError('Ім’я має містити від 2 до 64 символів');
    return false;
  }

  if (!/^[0-9]{12}$/.test(phone)) {
    showError('Телефон має містити рівно 12 цифр, наприклад 380501234567');
    return false;
  }

  if (!modelId) {
    showError('Не обрано модель меблів');
    return false;
  }

  if (!color || !/^#[0-9a-fA-F]{3,8}$/.test(color)) {
    showError('Некоректний колір');
    return false;
  }

  if (comment && (comment.trim().length < 5 || comment.trim().length > 256)) {
    showError('Коментар має містити від 5 до 256 символів');
    return false;
  }

  return true;
}

function buildPayload(formData) {
  const name = formData.get('name')?.trim() ?? '';
  const phone = formData.get('phone')?.trim() ?? '';
  const comment = formData.get('comment')?.trim() ?? '';

  const payload = {
    name,
    phone,
    modelId: state.selectedFurnitureId,
    color: state.selectedColor,
  };

  if (comment) {
    payload.comment = comment;
  }

  return payload;
}

async function handleSubmit(event) {
  event.preventDefault();

  const form = event.currentTarget;
  const formData = new FormData(form);
  const payload = buildPayload(formData);

  if (!validateOrderData(payload)) return;

  const result = await createOrder(payload);

  showSuccess(`Заявку відправлено. Номер замовлення: ${result.orderNum}`);
  form.reset();
  closeOrderModal();
}

function handleOrderModalClick(event) {
  if (event.target === refs.orderModal || event.target.closest('[data-close-order]')) {
    closeOrderModal();
  }
}

function handleEscape(event) {
  if (event.key !== 'Escape') return;

  if (refs.orderModal.classList.contains('is-open')) {
    closeOrderModal();
  }
}

export function initOrderModalLogic() {
  refs.orderModal?.addEventListener('click', handleOrderModalClick);
  refs.orderForm?.addEventListener('submit', handleSubmit);
  document.addEventListener('keydown', handleEscape);
}
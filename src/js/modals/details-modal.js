import { fetchFurnitureById } from '../api/furniture-api';
import { refs } from '../refs';
import { state } from '../state';
import {
  createStarsMarkup,
  lockBodyScroll,
  unlockBodyScroll,
} from '../utils/helpers';

function openDetailsModal() {
  refs.detailsModal.classList.add('is-open');
  lockBodyScroll();
}

function closeDetailsModal() {
  refs.detailsModal.classList.remove('is-open');
  unlockBodyScroll();
}

function renderDetailsModal(item) {
  state.selectedFurnitureId = item._id;
  state.selectedColor = item.color?.[0] ?? null;

  const galleryMarkup = item.images
    .map(
      img => `
        <li class="details-gallery__item">
          <img src="${img}" alt="${item.name}" class="details-gallery__img" />
        </li>
      `
    )
    .join('');

  const colorsMarkup = (item.color ?? [])
    .map(
      (hex, index) => `
        <label class="color-option ${index === 0 ? 'is-active' : ''}">
          <input
            type="radio"
            name="furniture-color"
            value="${hex}"
            class="visually-hidden"
            ${index === 0 ? 'checked' : ''}
          />
          <span
            class="color-option__swatch"
            style="background-color: ${hex};"
            title="${hex}"
          ></span>
        </label>
      `
    )
    .join('');

  refs.detailsModalContent.innerHTML = `
    <button type="button" data-close-details>Закрити</button>

    <ul class="details-gallery">
      ${galleryMarkup}
    </ul>

    <h2>${item.name}</h2>
    <p>${item.category?.name ?? ''}</p>
    <p>${item.type ?? ''}</p>
    <p>${item.price} ₴</p>
    <div>${createStarsMarkup(item.rate)}</div>
    <p>${item.description}</p>
    <p>Розмір: ${item.sizes}</p>

    <div class="details-colors">
      ${colorsMarkup}
    </div>

    <button type="button" data-go-order>
      Перейти до замовлення
    </button>
  `;
}

async function handleOpenDetails(event) {
  const btn = event.target.closest('[data-details-id]');
  if (!btn) return;

  const item = await fetchFurnitureById(btn.dataset.detailsId);
  renderDetailsModal(item);
  openDetailsModal();
}

function handleColorChange(event) {
  if (!event.target.matches('input[name="furniture-color"]')) return;

  state.selectedColor = event.target.value;

  refs.detailsModal.querySelectorAll('.color-option').forEach(label => {
    const input = label.querySelector('input');
    label.classList.toggle('is-active', input.checked);
  });
}

function handleDetailsModalClick(event) {
  if (event.target === refs.detailsModal || event.target.closest('[data-close-details]')) {
    closeDetailsModal();
    return;
  }

  if (event.target.closest('[data-go-order]')) {
    closeDetailsModal();
    refs.orderModal.classList.add('is-open');
    lockBodyScroll();
  }
}

function handleEscape(event) {
  if (event.key !== 'Escape') return;

  if (refs.detailsModal.classList.contains('is-open')) {
    closeDetailsModal();
  }
}

export function initDetailsModalLogic() {
  document.addEventListener('click', handleOpenDetails);
  refs.detailsModal?.addEventListener('change', handleColorChange);
  refs.detailsModal?.addEventListener('click', handleDetailsModalClick);
  document.addEventListener('keydown', handleEscape);
}
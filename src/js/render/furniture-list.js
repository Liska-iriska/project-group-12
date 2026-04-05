import { refs } from '../refs';

export function createFurnitureCardMarkup(item) {
  const image = item.images?.[0] ?? '';
  const firstColor = item.color?.[0] ?? '';
  const colorText = firstColor || '—';

  return `
    <li class="furniture-card">
      <img
        class="furniture-card__image"
        src="${image}"
        alt="${item.name}"
        loading="lazy"
      />

      <div class="furniture-card__body">
        <h3 class="furniture-card__title">${item.name}</h3>
        <p class="furniture-card__text">Колір: ${colorText}</p>
        <p class="furniture-card__price">${item.price} ₴</p>

        <button
          type="button"
          class="furniture-card__btn"
          data-details-id="${item._id}"
        >
          Детальніше
        </button>
      </div>
    </li>
  `;
}

export function renderFurnitureList(items, append = false) {
  const markup = items.map(createFurnitureCardMarkup).join('');

  if (append) {
    refs.furnitureList.insertAdjacentHTML('beforeend', markup);
  } else {
    refs.furnitureList.innerHTML = markup;
  }
}

export function hideLoadMore() {
  refs.loadMoreBtn?.classList.add('is-hidden');
}

export function showLoadMore() {
  refs.loadMoreBtn?.classList.remove('is-hidden');
}
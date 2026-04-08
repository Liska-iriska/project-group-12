import { getFurnitures, getCategories } from '../api.js';

const refs = {
  furnitureList: document.querySelector('.card-list'),
  loadMoreBtn: document.querySelector('.more-btn'),
  filterList: document.querySelector('.filter-list'),
  filterButtons: document.querySelectorAll('.filter-btn'),
};

const state = {
  page: 1,
  limit: 10,
  currentCategory: 'all',
  loadedItems: [],
  categories: [],
  hasMore: true,
  isLoading: false,
  isInitialized: false,
};

function normalizeColors(item) {
  const rawColors = item.color ?? item.colors ?? [];

  if (Array.isArray(rawColors)) return rawColors;

  if (typeof rawColors === 'string' && rawColors.trim() !== '') {
    return [rawColors];
  }

  return [];
}

function createColorsMarkup(colors) {
  if (!colors.length) {
    return '';
  }

  return colors
    .map(
      color => `
        <span
          class="color-dot"
          style="background-color: ${color}"
          title="${color}"
        ></span>
      `
    )
    .join('');
}

function formatPrice(price) {
  if (price === null || price === undefined || price === '') {
    return 'Ціну уточнюйте';
  }

  const numericPrice = Number(price);

  if (Number.isNaN(numericPrice)) {
    return `${price} грн`;
  }

  return `${numericPrice.toLocaleString('uk-UA')} грн`;
}

function createImageMarkup(image, name) {
  if (!image) {
    return `<div class="card-img-placeholder"></div>`;
  }

  return `
    <img
      class="card-img-placeholder"
      src="${image}"
      alt="${name}"
      loading="lazy"
    />
  `;
}

function extractItemsFromResponse(payload) {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.items)) return payload.items;
  if (Array.isArray(payload?.furnitures)) return payload.furnitures;
  if (Array.isArray(payload?.results)) return payload.results;
  if (Array.isArray(payload?.data)) return payload.data;
  return [];
}

function extractCategoriesFromResponse(payload) {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.items)) return payload.items;
  if (Array.isArray(payload?.categories)) return payload.categories;
  if (Array.isArray(payload?.data)) return payload.data;
  return [];
}

function getItemId(item) {
  return item._id ?? item.id ?? '';
}

function mergeUniqueItems(currentItems, newItems) {
  const map = new Map();

  [...currentItems, ...newItems].forEach(item => {
    map.set(getItemId(item), item);
  });

  return [...map.values()];
}

function resolveItemCategory(item) {
  const possibleCategory =
    item.category?.name ??
    item.category ??
    item.type ??
    item.furnitureType?.name ??
    item.furnitureType ??
    '';

  return String(possibleCategory).trim().toLowerCase();
}

function getFilteredItems(items) {
  if (state.currentCategory === 'all') {
    return items;
  }

  return items.filter(
    item => resolveItemCategory(item) === state.currentCategory
  );
}

function updateHasMore(payload, receivedCount) {
  const totalPages = Number(payload?.totalPages ?? payload?.pages ?? 0);
  const currentPage = Number(payload?.page ?? state.page);
  const totalItems = Number(payload?.total ?? payload?.totalItems ?? 0);

  if (totalPages > 0) {
    state.hasMore = currentPage < totalPages;
    return;
  }

  if (totalItems > 0) {
    state.hasMore = state.loadedItems.length < totalItems;
    return;
  }

  state.hasMore = receivedCount === state.limit;
}

export function createFurnitureCardMarkup(item) {
  const id = getItemId(item);
  const name = item.name ?? 'Без назви';
  const image = item.images?.[0] ?? item.image ?? '';
  const colors = normalizeColors(item);
  const price = formatPrice(item.price);

  return `
    <li class="card-list-item">
      ${createImageMarkup(image, name)}

      <div class="card-content">
        <h3 class="card-title">${name}</h3>

        <div class="card-colors">
          ${createColorsMarkup(colors)}
        </div>

        <p class="card-price">${price}</p>

        <button
          type="button"
          class="card-btn"
          data-details-id="${id}"
        >
          Детальніше
        </button>
      </div>
    </li>
  `;
}

export function renderFurnitureList(items = []) {
  const markup = items.map(createFurnitureCardMarkup).join('');
  refs.furnitureList.innerHTML = markup;
}

export function clearFurnitureList() {
  refs.furnitureList.innerHTML = '';
}

export function renderEmptyFurnitureList(
  message = 'За вашим запитом товарів не знайдено.'
) {
  refs.furnitureList.innerHTML = `
    <li class="card-list-item">
      <div class="card-content">
        <p class="card-price">${message}</p>
      </div>
    </li>
  `;
}

export function hideLoadMore() {
  refs.loadMoreBtn?.classList.add('is-hidden');
}

export function showLoadMore() {
  refs.loadMoreBtn?.classList.remove('is-hidden');
}

export function disableLoadMore() {
  refs.loadMoreBtn?.setAttribute('disabled', 'true');
}

export function enableLoadMore() {
  refs.loadMoreBtn?.removeAttribute('disabled');
}

export function setActiveFilterButton(category = 'all') {
  refs.filterButtons.forEach(button => {
    const isActive = button.dataset.category === category;
    button.classList.toggle('is-active', isActive);
  });
}

async function loadCategories() {
  try {
    const payload = await getCategories();
    state.categories = extractCategoriesFromResponse(payload);
  } catch (error) {
    console.error('Не вдалося завантажити категорії:', error);
    state.categories = [];
  }
}

async function loadFurniturePage() {
  if (state.isLoading || !state.hasMore) return;

  state.isLoading = true;
  disableLoadMore();

  try {
    const payload = await getFurnitures(state.page, state.limit);
    const newItems = extractItemsFromResponse(payload);
    state.loadedItems = mergeUniqueItems(state.loadedItems, newItems);
    updateHasMore(payload, newItems.length);

    const filteredItems = getFilteredItems(state.loadedItems);

    if (filteredItems.length) {
      renderFurnitureList(filteredItems);
    } else {
      renderEmptyFurnitureList();
    }

    if (state.hasMore) {
      showLoadMore();
    } else {
      hideLoadMore();
    }
  } catch (error) {
    console.error('Не вдалося завантажити товари:', error);
    renderEmptyFurnitureList('Не вдалося завантажити товари.');
    hideLoadMore();
  } finally {
    state.isLoading = false;
    enableLoadMore();
  }
}

async function tryLoadUntilCategoryFound() {
  let filteredItems = getFilteredItems(state.loadedItems);

  while (!filteredItems.length && state.hasMore) {
    state.page += 1;
    await loadFurniturePage();
    filteredItems = getFilteredItems(state.loadedItems);
  }

  if (filteredItems.length) {
    renderFurnitureList(filteredItems);
  } else {
    renderEmptyFurnitureList();
  }
}

async function handleLoadMoreClick() {
  if (state.isLoading || !state.hasMore) return;

  state.page += 1;
  await loadFurniturePage();
}

async function handleFilterClick(event) {
  const button = event.target.closest('.filter-btn');
  if (!button) return;

  const selectedCategory = button.dataset.category ?? 'all';

  state.currentCategory = selectedCategory;
  setActiveFilterButton(selectedCategory);

  const filteredItems = getFilteredItems(state.loadedItems);

  if (filteredItems.length) {
    renderFurnitureList(filteredItems);
  } else if (state.hasMore) {
    await tryLoadUntilCategoryFound();
  } else {
    renderEmptyFurnitureList();
  }
}

function bindEvents() {
  refs.loadMoreBtn?.addEventListener('click', handleLoadMoreClick);
  refs.filterList?.addEventListener('click', handleFilterClick);
}

function resetState() {
  state.page = 1;
  state.currentCategory = 'all';
  state.loadedItems = [];
  state.hasMore = true;
  state.isLoading = false;
}

export async function initFurnitureList() {
  if (!refs.furnitureList || !refs.loadMoreBtn || !refs.filterList) {
    return;
  }

  if (!state.isInitialized) {
    bindEvents();
    state.isInitialized = true;
  }

  resetState();
  setActiveFilterButton('all');
  clearFurnitureList();
  showLoadMore();

  await loadCategories();
  await loadFurniturePage();
}
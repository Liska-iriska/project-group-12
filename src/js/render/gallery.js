import { getFurnitures, getFurnitureById } from '../api.js';
import { openFurnitureModal } from './furniture-detail.js';
import { showError } from '../utils/toast.js';

const furnituresContainer = document.querySelector('.card-list');
const moreBtn = document.querySelector('.more-btn');
const loader = document.querySelector('.card-gallery .loader');

let allFurnitures = [];
let currentIndex = 0;
const PAGE_SIZE = 8;
let currentCategoryId = undefined;

// ----------------- fetch с лоадером -----------------
async function fetchFurnitures(categoryId) {
  loader.classList.remove('hidden'); // показать лоадер
  try {
    const data = await getFurnitures(1, 30, categoryId);
    return data.furnitures;
  } catch (err) {
    console.error(err);
    showError('Не вдалося завантажити меблі');
    return [];
  } finally {
    loader.classList.add('hidden'); // скрыть лоадер
  }
}

// ----------------- инициализация галереи -----------------
export async function initGallery() {
  if (!furnituresContainer) return console.error('Контейнер не знайдено!');

  moreBtn.style.display = 'none';
  await setCategory(undefined);

  if (moreBtn) {
    moreBtn.addEventListener('click', e => {
      renderNext();
      e.currentTarget.blur();
    });
  }

  return { setCategory };
}

// ----------------- рендер следующей страницы -----------------
function renderNext() {
  currentIndex += PAGE_SIZE;
  renderGallery();
}

// ----------------- установка категории -----------------
export async function setCategory(categoryId) {
  currentCategoryId = categoryId;
  currentIndex = 0;
  furnituresContainer.innerHTML = '';
  moreBtn.style.display = 'none';

  try {
    allFurnitures = await fetchFurnitures(categoryId);
    renderGallery();
  } catch (err) {
    furnituresContainer.innerHTML = '<p>Помилка завантаження меблів</p>';
    console.error(err);
    showError('Не вдалося завантажити категорію меблів');
  }
}

// ----------------- рендер галереи -----------------
export function renderGallery() {
  const itemsToShow = allFurnitures.slice(
    currentIndex,
    currentIndex + PAGE_SIZE
  );

  furnituresContainer.insertAdjacentHTML(
    'beforeend',
    itemsToShow
      .map(
        product => `
      <li class="card-list-item">
        <img class="card-img"
        width="335" 
        height="277" 
        loading="lazy"
        src="${product.images[0] || 'placeholder.jpg'}" alt="${product.name}" />
        <div class="card-content">
          <h3 class="card-title">${product.name}</h3>
          <div class="card-colors">
            ${(Array.isArray(product.color) ? product.color : []).map(c => `<span class="color-dot" style="background-color: ${c}"></span>`).join('')}
          </div>
          <p class="card-price">${product.price} грн</p>
        </div>
        <button class="card-btn" data-id="${product._id}">Детальніше</button>
      </li>
    `
      )
      .join('')
  );

  // кнопка "Показати ще" появляется только если есть что показать
  if (moreBtn) {
    moreBtn.style.display =
      currentIndex + PAGE_SIZE >= allFurnitures.length ? 'none' : 'block';
  }
}

// ----------------- клик на "Детальніше" -----------------
furnituresContainer.addEventListener('click', async e => {
  const btn = e.target.closest('.card-btn');
  if (!btn) return;

  const id = btn.dataset.id; // берём сразу ID
  if (!id) return;

  try {
    const fullProduct = await getFurnitureById(id);
    openFurnitureModal(fullProduct);
  } catch (error) {
    console.error(error);
    showError('Не вдалося завантажити дані меблів');
  }
});

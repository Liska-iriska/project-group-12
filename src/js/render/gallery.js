import { getFurnitures, getFurnitureById } from '../api.js';
import { openFurnitureModal } from './furniture-detail.js';

const furnituresContainer = document.querySelector('.card-list');
const moreBtn = document.querySelector('.more-btn');

let allFurnitures = [];
let currentIndex = 0;
const PAGE_SIZE = 8;
let currentCategoryId = undefined;

export async function initGallery() {
  if (!furnituresContainer) return console.error('Контейнер не знайдено!');

  await setCategory(undefined);

  if (moreBtn) {
    moreBtn.addEventListener('click', () => renderNext());
  }

  return { setCategory };
}

async function fetchFurnitures(categoryId) {
  const data = await getFurnitures(1, 30, categoryId);

  console.log('API RESPONSE', data);

  return data.furnitures;
}

function renderNext() {
  currentIndex += PAGE_SIZE;
  renderGallery();
}

export async function setCategory(categoryId) {
  currentCategoryId = categoryId;
  currentIndex = 0;

  furnituresContainer.innerHTML = '';

  try {
    allFurnitures = await fetchFurnitures(categoryId);
    renderGallery();
  } catch (err) {
    furnituresContainer.innerHTML = '<p>Помилка завантаження меблів</p>';
    console.error(err);
  }
}

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
        <img class="card-img" src="${product.images[0] || 'placeholder.jpg'}" alt="${product.name}" />
        <div class="card-content">
          <h3 class="card-title">${product.name}</h3>
          <div class="card-colors">
            ${(Array.isArray(product.color) ? product.color : []).map(c => `<span class="color-dot" style="background-color: ${c}"></span>`).join('')}
          </div>
          <p class="card-price">${product.price} грн</p>
        </div>
        <button class="card-btn">Детальніше</button>
      </li>
    `
      )
      .join('')
  );

  if (moreBtn) {
    moreBtn.style.display =
      currentIndex + PAGE_SIZE >= allFurnitures.length ? 'none' : 'block';
  }
}

furnituresContainer.addEventListener('click', async e => {
  const btn = e.target.closest('.card-btn');
  if (!btn) return;

  const card = btn.closest('.card-list-item');
  const index = [...furnituresContainer.children].indexOf(card);

  const shortProduct = allFurnitures[currentIndex + index];

  try {
    const fullProduct = await getFurnitureById(shortProduct._id);

    console.log('FULL PRODUCT', fullProduct);

    openFurnitureModal(fullProduct);
  } catch (error) {
    console.error(error);
  }
});


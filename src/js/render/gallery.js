import { getFurnitures } from '../api.js';

const furnituresContainer = document.querySelector('.card-list');
const moreBtn = document.querySelector('.more-btn');

let allFurnitures = [];
let currentIndex = 0;
const PAGE_SIZE = 8;
let currentCategoryId = undefined;

export async function initGallery() {
  if (!furnituresContainer)
    return console.error('Контейнер для карточек не найден!');

  await setCategory(undefined);

  if (moreBtn) {
    moreBtn.addEventListener('click', () => renderNext());
  }

  return { setCategory };
}

async function fetchFurnitures(categoryId) {
  const data = await getFurnitures(1, 30, categoryId);
  return data.furnitures;
}

function renderNext() {
  currentIndex += PAGE_SIZE;
  renderGallery();
}

export async function setCategory(categoryId) {
  currentCategoryId = categoryId;
  currentIndex = 0;

  try {
    allFurnitures = await fetchFurnitures(categoryId);
    renderGallery();
  } catch (err) {
    furnituresContainer.innerHTML = '<p>Ошибка загрузки мебели</p>';
    console.error(err);
  }
}

export function renderGallery() {
  const itemsToShow = allFurnitures.slice(
    currentIndex,
    currentIndex + PAGE_SIZE
  );

  furnituresContainer.innerHTML = itemsToShow
    .map(
      f => `
      <li class="card-list-item">
        <img class="card-img" src="${f.images[0] || 'placeholder.jpg'}" alt="${f.name}" />
        <div class="card-content">
          <h3 class="card-title">${f.name}</h3>
          <div class="card-colors">
            ${f.color.map(c => `<span class="color-dot" style="background-color: ${c}"></span>`).join('')}
          </div>
          <p class="card-price">${f.price} грн</p>
        </div>
        <button class="card-btn">Детальніше</button>
      </li>
    `
    )
    .join('');

  if (moreBtn) {
    moreBtn.style.display =
      currentIndex + PAGE_SIZE >= allFurnitures.length ? 'none' : 'block';
  }
}

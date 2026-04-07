import { getFurnitures, getFurnitureById } from "../api.js";
import { showError } from "../utils/toast.js";

const furnituresContainer = document.querySelector(".card-list");
const moreBtn = document.querySelector(".more-btn");
const getId = (id) => document.getElementById(id);


let allFurnitures = [];
let currentIndex = 0;
const PAGE_SIZE = 8;
let currentCategoryId = undefined;

export async function initGallery() {
  if (!furnituresContainer) return console.error("Контейнер для карточек не найден!");

  await setCategory(undefined);

  if (moreBtn) {
    moreBtn.addEventListener("click", () => renderNext());
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
    furnituresContainer.innerHTML = "<p>Ошибка загрузки мебели</p>";
    console.error(err);
  }
}

export async function getCardInfo(cardId) {
  try {
    const cardInfo = await getFurnitureById(cardId);
    return cardInfo;
  } catch (err) {
    showError('Не вдалося завантажити інформацію про меблі.');
  }
}

export function renderGallery() {
  const itemsToShow = allFurnitures.slice(currentIndex, currentIndex + PAGE_SIZE);

  furnituresContainer.innerHTML = itemsToShow
    .map(f => `
      <li class="card-list-item">
        <img class="card-img" src="${f.images[0] || 'placeholder.jpg'}" alt="${f.name}" />
        <div class="card-content">
          <h3 class="card-title">${f.name}</h3>
          <div class="card-colors">
            ${f.color.map(c => `<span class="color-dot" style="background-color: ${c}"></span>`).join("")}
          </div>
          <p class="card-price">${f.price} грн</p>
        </div>
        
        <button class="card-btn" data-id="${f._id}">Детальніше</button>
      </li>
    `).join("");

  if (moreBtn) {
    moreBtn.style.display = (currentIndex + PAGE_SIZE >= allFurnitures.length) ? "none" : "block";
  }

}


furnituresContainer.addEventListener('click', (e) => {
  if (e.target.className.includes('card-btn')) {

    document.querySelector('.furniture-modal').classList.remove('visually-hidden')
    const id = e.target.dataset.id;
    getCardInfo(id).then(carddata => {

      const furnitureName = getId('furniture-name');
      const furniturePrice = getId('furniture-price');
      const furnitureDescription = getId('furniture-description');
      const furnitureColors = getId('furniture-colors');
      const img1 = getId('img1');
      const img2 = getId('img2');
      const img3 = getId('img3'); 

      furnitureName.innerText = carddata.name.slice(0,14) + (carddata.name.length > 14 ? '...' : '');
      furniturePrice.innerText = `${carddata.price} грн`;
      furnitureDescription.innerText = carddata.description;
      furnitureColors.innerHTML = carddata.color.map(c => `<span class="color-dot" style="background-color: ${c}"></span>`).join("");
      img1.src = carddata.images[0] || 'placeholder.jpg';
      img2.src = carddata.images[1] || 'placeholder.jpg';
      img3.src = carddata.images[2] || 'placeholder.jpg';

    })

  }
})


  const closeBtn = document.querySelector('.close-btn');

  closeBtn.addEventListener('click', (e) => {
    document.querySelector('.furniture-modal').classList.add('visually-hidden')
  })
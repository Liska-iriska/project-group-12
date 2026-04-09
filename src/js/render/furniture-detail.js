import { showError, showSuccess } from '../utils/toast.js';
import axios from 'axios';

// ------------------- ELEMENTS -------------------
const furnitureModal = document.querySelector('.furniture-modal');
const furnitureCloseBtn = document.querySelector('#modal-close-btn');
const galleryContainer = document.querySelector('.furniture-gallery-modal');
const contentContainer = document.querySelector('.content-container');

const orderModal = document.querySelector('[data-order-modal]');
const orderCloseBtn = document.querySelector('[data-order-modal-close]');
const orderForm = document.querySelector('#orderForm');

// ------------------- BODY SCROLL CONTROL -------------------
function disableBodyScroll() {
  document.body.classList.add('body-no-scroll');
}
function enableBodyScroll() {
  document.body.classList.remove('body-no-scroll');
}

// ------------------- FURNITURE MODAL -------------------
export function openFurnitureModal(product) {
  renderProductDetails(product);
  furnitureModal.style.display = 'flex';
  disableBodyScroll();
}

export function closeFurnitureModal() {
  furnitureModal.style.display = 'none';
  enableBodyScroll();
}

furnitureCloseBtn?.addEventListener('click', closeFurnitureModal);
furnitureModal?.addEventListener('click', e => {
  if (e.target === furnitureModal) closeFurnitureModal();
});

// ------------------- RENDER PRODUCT -------------------
export function renderProductDetails(product) {
  renderImages(product);
  renderInfo(product);
  setupOrderButton(product);
}

function renderImages(product) {
  if (!product.images?.length) return;

  const [first, ...rest] = product.images;

  galleryContainer.innerHTML = `
    <img src="${first}" alt="${product.name}" class="big-image-sofa" />
    <div class="small-images">
      ${rest.map(img => `<img src="${img}" alt="${product.name}" class="small-image-sofa" />`).join('')}
    </div>
  `;

  const bigImage = galleryContainer.querySelector('.big-image-sofa');
  const smallImages = galleryContainer.querySelectorAll('.small-image-sofa');
  smallImages.forEach(img => {
    img.addEventListener('click', () => {
      bigImage.src = img.src;
    });
  });
}

function renderInfo(product) {
  contentContainer.innerHTML = `
    <h2 class="furniture-title">${product.name}</h2>
    <p class="modal-furniture-category">${product.category?.name || 'Меблі'}</p>
    <p class="modal-furniture-price">${product.price} грн</p>
    <span class="modal-furniture-rate" data-rate="${product.rate}" style="--rating-percent: ${product.rate * 20}%"></span>

    <p class="furniture-color-text">Колір</p>
    <div class="colors-container">
      ${product.color.map((c, i) => `
        <label class="color-option">
          <input type="radio" name="color" value="${c}" ${i === 0 ? 'checked' : ''} />
          <span class="color-swatch" style="background:${c}"></span>
        </label>
      `).join('')}
    </div>

    <p class="modal-furniture-description">${product.description || ''}</p>
    <p class="modal-sizes">Розміри: ${product.sizes || ''}</p>

    <button class="order-button-modal" data-product-id="${product._id}">
      Перейти до замовлення
    </button>
  `;
}

// ------------------- ORDER MODAL -------------------
function setupOrderButton(product) {
  const orderBtn = contentContainer.querySelector('.order-button-modal');
  if (!orderBtn) return;

  orderBtn.addEventListener('click', () => {
    const selectedColorInput = contentContainer.querySelector('input[name="color"]:checked');
    const selectedColor = selectedColorInput ? selectedColorInput.value : product.color[0];

    closeFurnitureModal();

    orderModal.style.display = 'flex';
    disableBodyScroll();

    orderForm.dataset.modelId = product._id;
    orderForm.dataset.color = selectedColor;
  });
}

orderCloseBtn?.addEventListener('click', closeOrderModal);
orderModal?.addEventListener('click', e => {
  if (e.target === orderModal) closeOrderModal();
});

function closeOrderModal() {
  orderModal.style.display = 'none';
  enableBodyScroll();
}

// ------------------- SUBMIT ORDER -------------------
orderForm?.addEventListener('submit', async e => {
  e.preventDefault();

  const name = orderForm.querySelector('#orderName').value.trim();
  const phone = orderForm.querySelector('#orderPhone').value.replace(/\D/g, '');
  const comment = orderForm.querySelector('#orderComment').value.trim();
  const modelId = orderForm.dataset.modelId;
  const color = orderForm.dataset.color;

  if (!name || !phone || !modelId || !color) {
    showError('Будь ласка, заповніть усі обов\'язкові поля!');
    return;
  }

  if (comment && comment.length < 5) {
    showError('Коментар повинен бути щонайменше 5 символів!');
    return;
  }

  const payload = { name, phone, modelId, color, comment };
  console.log('Payload для отправки на сервер:', payload);

  try {
    const response = await axios.post(
      'https://furniture-store-v2.b.goit.study/api/orders',
      payload,
      { headers: { 'Content-Type': 'application/json' } }
    );

    console.log('Ответ сервера:', response.data);

    showSuccess('Заявка успішно надіслана!');
    orderForm.reset();
    closeOrderModal();
  } catch (err) {
    console.error('Ошибка при отправке заявки:', err.response?.data || err);
    showError(err.response?.data?.message || 'Сталася помилка при відправці заявки');
  }
});
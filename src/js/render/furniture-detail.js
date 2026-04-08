import { showError, showSuccess } from '../utils/toast.js';
import axios from 'axios';

const modal = document.querySelector('.furniture-modal');
const closeBtn = document.querySelector('#modal-close-btn');

const galleryContainer = document.querySelector('.furniture-gallery-modal');
const contentContainer = document.querySelector('.content-container');

const orderModal = document.querySelector('[data-order-modal]');
const orderCloseBtn = document.querySelector('[data-order-modal-close]');
const orderForm = document.querySelector('#orderForm');

// ------------------- MODAL FURNITURE -------------------

export function openFurnitureModal(product) {
  renderProductDetails(product);
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

export function closeFurnitureModal() {
  modal.style.display = 'none';
  document.body.style.overflow = '';
}

closeBtn?.addEventListener('click', closeFurnitureModal);
modal?.addEventListener('click', e => {
  if (e.target === modal) closeFurnitureModal();
});

// ------------------- PRODUCT DETAILS -------------------

export function renderProductDetails(product) {
  renderImages(product);
  renderInfo(product);
  setupOrderButton(product); // привязываем кнопку заказа
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
    <p class="modal-sizes">${product.sizes || ''}</p>

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
    // Получаем выбранный цвет в модалке товара
    const selectedColorInput = contentContainer.querySelector('input[name="color"]:checked');
    const selectedColor = selectedColorInput ? selectedColorInput.value : product.color[0];

    // Закрываем модалку товара
    closeFurnitureModal();

    // Открываем модалку заказа
    orderModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';

    // Сохраняем productId и выбранный цвет в dataset формы
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
  document.body.style.overflow = '';
}

// ------------------- SUBMIT FORM -------------------

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

    // Выводим ответ сервера в консоль
    console.log('Ответ сервера:', response.data);

    showSuccess('Заявка успішно надіслана!');
    orderForm.reset();
    closeOrderModal();
  } catch (err) {
    console.error('Ошибка при отправке заявки:', err.response?.data || err);
    showError(err.response?.data?.message || 'Сталася помилка при відправці заявки');
  }
});
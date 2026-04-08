const modal = document.querySelector('.furniture-modal');
const closeBtn = document.querySelector('#modal-close-btn');

const galleryContainer = document.querySelector('.furniture-gallery-modal');
const contentContainer = document.querySelector('.content-container');

export function openFurnitureModal(product) {
  renderProductDetails(product);
  modal.style.display = 'flex';
}

export function closeFurnitureModal() {
  modal.style.display = 'none';
}

closeBtn?.addEventListener('click', closeFurnitureModal);

modal?.addEventListener('click', e => {
  if (e.target === modal) {
    closeFurnitureModal();
  }
});

export function renderProductDetails(product) {
  renderImages(product);
  renderInfo(product);
}

function renderImages(product) {
  if (!product.images?.length) return;

  const [first, ...rest] = product.images;

  galleryContainer.innerHTML = `
    <img 
      src="${first}" 
      alt="${product.name}" 
      class="big-image-sofa"
    />

    <div class="small-images">
      ${rest
        .map(
          img => `
        <img 
          src="${img}" 
          alt="${product.name}" 
          class="small-image-sofa"
        />
      `
        )
        .join('')}
    </div>
  `;
}

function renderInfo(product) {
  contentContainer.innerHTML = `
    <h2 class="furniture-title">${product.name}</h2>

    <p class="modal-furniture-category">
      ${product.category?.name || 'Меблі'}
    </p>

    <p class="modal-furniture-price">
      ${product.price} грн
    </p>

    <div class="rating" style="--rating:${product.rate}">
      ⭐ ${product.rate}
    </div>

    <p class="furniture-color-text">Колір</p>

    <div class="colors-container">
      ${product.color
        .map(
          (c, i) => `
        <label class="color-option">
          <input 
            type="radio" 
            name="color" 
            value="${c}" 
            ${i === 0 ? 'checked' : ''}
          />
          <span 
            class="color-swatch"
            style="background:${c}"
          ></span>
        </label>
      `
        )
        .join('')}
    </div>

    <p class="modal-furniture-description">
      ${product.description || ''}
    </p>

    <button 
      class="order-button-modal"
      data-product-id="${product._id}"
    >
      Перейти до замовлення
    </button>
  `;
}
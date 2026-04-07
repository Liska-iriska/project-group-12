import axios from "axios";

const api = axios.create({
  baseURL: "https://furniture-store-v2.b.goit.study/api",
});


const refs = {
    modal: document.querySelector('.furniture-modal'),
    closeBtn: document.querySelector('.close-btn'),
    modalMainImg: document.querySelector('#main-img'),
    furnitureName: document.querySelector('#furniture-name'),
    furnitureCategory: document.querySelector('#furniture-category'),
    furniturePrice: document.querySelector('#furniture-price'),
    furnitureRating: document.querySelector('#modal-rating'),
    furnitureColors: document.querySelector('#furniture-colors'),
    furnitureDescription: document.querySelector('#furniture-description'),
    furnitureSize: document.querySelector('#furniture-size'),
    modalOrderBtn: document.querySelector('#modal-order-btn'),
    modalSmallImages: document.querySelector('#small-images'),
}

function openModal(item) {
    refs.modal.classList.remove('visually-hidden');
    refs.furnitureName.textContent = item.name;
    refs.furniturePrice.textContent = item.price;
    
    if (item.img) {
        refs.modalMainImg.src = item.img;
    }

    refs.furnitureColors.innerHTML = item.colors;
    setActiveColor();

    document.body.style.overflow = 'hidden';
}

function closeModal() {
    refs.modal.classList.add('visually-hidden');
     document.body.style.overflow = '';
}

refs.closeBtn.addEventListener('click', closeModal);

refs.modal.addEventListener('click', e => {
    if (e.target === refs.modal) {
        closeModal();
    }
});

document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
        closeModal();
    }
});

function setActiveColor() {
        const dots = refs.furnitureColors.querySelectorAll('.color-dot');
        if (!dots.length) return;

        dots[0].classList.add('active');

        dots.forEach(dot => {
            dot.addEventListener('click', () => {
                dots.forEach(d => d.classList.remove('active'));
                dot.classList.add('active');
            });
        });
}

async function getFurnitureById(id) {
    try {
        const response = await api.get(`/furnitures/${id}`);
        return response.data;
    } catch (error) {
        console.error('Помилка отримання товару:', error);
    }
}

function updateModal(item) {
    refs.furnitureCategory.textContent =
        item.category?.name ?? item.category ?? '';

    refs.furnitureDescription.textContent = item.description ?? '';
    refs.furnitureSize.textContent = item.sizes ?? '';

    renderRating(item.rating);
    renderGallery(item.images);
}


function renderRating(rating = 0) {
    refs.furnitureRating.innerHTML = '';

    for (let i = 1; i <= 5; i++) {
        const fillPercent = Math.min(Math.max(rating - (i - 1), 0), 1) * 100;

        refs.furnitureRating.innerHTML += `
            <div class="star-wrapper" style="position: relative; display: inline-block; width: 16px; height: 16px;">
                <svg class="star0" width="16" height="16">
                    <use href="../img/sprite.svg#star0"></use>
                </svg>
                <svg class="star" width="16" height="16" style="position: absolute; top: 0; left: 0; overflow: hidden;">
                    <use href="../img/sprite.svg#star"></use>
                    <rect width="${fillPercent}%" height="100%" fill="white" style="clip-path: inset(0 ${100 - fillPercent}% 0 0)"></rect>
                </svg>
            </div>
        `;
    }
}

function renderGallery(images = []) {
    if (!images.length) {
        refs.modalSmallImages.innerHTML = '';
        return;
    }

    refs.modalMainImg.src = images[0];

    refs.modalSmallImages.innerHTML = images
        .slice(1)
        .map((img, i) => `
            <img 
                src="${img}" 
                class="small-img ${i === 0 ? 'active' : ''}" 
            />
        `)
        .join('');

    setActiveImage();
}

function setActiveImage() {
    const images = refs.modalSmallImages.querySelectorAll('.small-img');

    images.forEach(img => {
        img.addEventListener('click', () => {
            refs.modalMainImg.src = img.src;

            images.forEach(i => i.classList.remove('active'));
            img.classList.add('active');
        });
    });
}
    
const list = document.querySelector('.card-list');

list.addEventListener('click', async event => {
    const btn = event.target.closest('.card-btn');
    if (!btn) return;

    const card = btn.closest('.card-list-item');
    const name = card.querySelector('.card-title').textContent;
    const price = card.querySelector('.card-price').textContent;
    const img = card.querySelector('img')?.src || '';
    const colorsContainer = card.querySelector('.card-colors');
    const colors = colorsContainer?.innerHTML || '';

    openModal({ name, price, img, colors });

    const id = btn.dataset.detailsId;

    if (!id) {
        return;
    }

    const item = await getFurnitureById(id);

    if (!item) return;
    updateModal(item);
});
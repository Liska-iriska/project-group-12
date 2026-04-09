import axios from 'axios';
import { openFurnitureModal } from './render/furniture-detail.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import Swiper from 'swiper';
import { Keyboard, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

async function getPopular() {
  const params = new URLSearchParams({
    limit: 30,
    type: 'popular',
  });

  const BASEURL = 'https://furniture-store-v2.b.goit.study/api/furnitures';

  try {
    const response = await axios(BASEURL, { params });
    return response.data.furnitures;
  } catch (error) {
    iziToast.error({
      title: 'Помилка',
      message: `Не вдалося завантажити популярні товари: ${error.message}`,
      position: 'topRight',
      timeout: 4000,
    });
    return [];
  }
}

const popularList = document.querySelector('.popular-list');

const renderPopular = async () => {
  const popularGoods = await getPopular();

  if (popularGoods.length > 0) {
    popularGoods.forEach(item => {
      popularList.insertAdjacentHTML(
        'beforeend',
        `<li class="swiper-slide popular-item">
          <img class="popular-img"
          width="280" 
          height="232" 
          loading="lazy"
          src="${item.images[0]}" alt="${item.name}" />
          <div class="popular-info">
            <h3 class="popular-subtitle">${item.name}</h3>
            <div class="popular-colors">
              ${item.color
                .map(
                  color =>
                    `<span class="popular-color" style="background-color: ${color}; border: 1px solid ${color};"></span>`
                )
                .join('')}
            </div>
            <p class="popular-price">${item.price} грн</p>
          </div>
          <button class="popular-btn" type="button" data-id="${item._id}">Детальніше</button>
        </li>`
      );
    });

    // делегирование событий для кнопок "Детальніше"
    popularList.addEventListener('click', async e => {
      const btn = e.target.closest('.popular-btn');
      if (!btn) return;

      const id = btn.dataset.id;
      try {
        const response = await axios.get(
          `https://furniture-store-v2.b.goit.study/api/furnitures/${id}`
        );
        const product = response.data;

        openFurnitureModal(product);
      } catch (err) {
        console.error(err);
        iziToast.error({
          title: 'Помилка',
          message: 'Не вдалося завантажити товар',
          position: 'topRight',
          timeout: 4000,
        });
      }
    });
  } else {
    popularList.innerHTML =
      '<p class="no-popular">Наразі немає доступу до популярних товарів</p>';
  }
};

renderPopular();

const swiper = new Swiper('.popular-swiper', {
  modules: [Navigation, Pagination, Keyboard],
  slidesPerView: 1,
  spaceBetween: 24,
  keyboard: { enabled: true },
  navigation: {
    nextEl: '.popular-button-next',
    prevEl: '.popular-button-prev',
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    dynamicBullets: true,
  },
  breakpoints: {
    768: { slidesPerView: 2 },
    1440: { slidesPerView: 4 },
  },
});

swiper.update();

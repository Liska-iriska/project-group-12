import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import raterJs from 'rater-js';

import { getFeedback } from '../api.js';
import { showError } from '../utils/toast.js';

const refs = {
  feedbackList: document.querySelector('.js-feedback-list'),
  btnPrev: document.querySelector('.feedback-button-prev'),
  btnNext: document.querySelector('.feedback-button-next'),
  pagination: document.querySelector('#feedback-pagination'),
  navigation: document.querySelector('#feedback-navigation'),
};

// Округлює рейтинг до найближчого значення з кроком 0.5
function roundRating(rating) {
  if (rating >= 3.3 && rating <= 3.7) return 3.5;
  if (rating >= 3.8 && rating <= 4.2) return 4;
  return Math.round(rating * 2) / 2;
}

// Ініціалізує відображення рейтингу у вигляді зірок через rater-js
function initStars() {
  document.querySelectorAll('.js-star').forEach(star => {
    raterJs({
      element: star,
      starSize: 20,
      rating: Number(star.dataset.rating),
      readOnly: true,
    });
  });
}

// Ініціалізує слайдер відгуків через Swiper
function initSwiper() {
  const swiper = new Swiper('.feedback-swiper', {
    modules: [Navigation, Pagination],
    slidesPerView: 1,
    spaceBetween: 16,
    grabCursor: true,
    loop: false,
    observer: true,
    observeParents: true,
    pagination: {
      el: '#feedback-pagination',
      clickable: true,
      dynamicBullets: true,
      dynamicMainBullets: 3,
    },
    navigation: {
      prevEl: '.feedback-button-prev',
      nextEl: '.feedback-button-next',
    },
    breakpoints: {
      768: {
        slidesPerGroup: 1,
        slidesPerView: 2,
        spaceBetween: 24,
      },
      1440: {
        slidesPerGroup: 1,
        slidesPerView: 3,
        spaceBetween: 24,
      },
    },
  });
}

// Отримує відгуки з API та ініціалізує рендер, Swiper і зірковий рейтинг
async function loadFeedback() {
  try {
    const data = await getFeedback();

    if (!data || !data.feedbacks || data.feedbacks.length === 0) {
      showError('Відгуки відсутні.');

      // ховаємо навігацію та пагінацію
      refs.pagination.style.display = 'none';
      refs.navigation.style.display = 'none';
      return;
    }

    const feedbacks = data.feedbacks;

    renderFeedbacks(feedbacks);
    initSwiper();
    initStars();

    // показуємо кнопки, якщо вони були приховані раніше
    refs.pagination.style.display = 'block';
    refs.navigation.style.display = 'flex';

  } catch (error) {
    console.error('Feedback error:', error);

    showError('Не вдалося завантажити відгуки.');

    // ховаємо навігацію та пагінацію при помилці
    refs.pagination.style.display = 'none';
    refs.navigation.style.display = 'none';
  }
}

// Рендерить список відгуків у DOM
function renderFeedbacks(feedbacks) {
  const markup = feedbacks
    .map(feedback => {
      const roundedRating = roundRating(feedback.rate);

      return `
        <li class="swiper-slide">
            <div class="js-star" data-rating="${roundedRating}"></div>
            <p class="feedback-descr">${feedback.descr}</p>
            <p class="feedback-author">${feedback.name}</p>
        </li>
      `;
    })
    .join('');

  refs.feedbackList.innerHTML = markup;
}

loadFeedback();
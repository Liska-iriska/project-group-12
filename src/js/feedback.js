import axios from 'axios';

import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import raterJs from 'rater-js';

const BASE_URL = 'https://furniture-store-v2.b.goit.study/api';

const refs = {
  feedbackList: document.querySelector('.js-feedback-list'),
  btnPrev: document.querySelector('.swiper-button-prev'),
  btnNext: document.querySelector('.swiper-button-next'),
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
  const swiper = new Swiper('.swiper', {
    modules: [Navigation, Pagination],
    slidesPerView: 1,
    spaceBetween: 16,
    grabCursor: true,
    watchOverflow: true,
    loop: false,

    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      prevEl: '.swiper-button-prev',
      nextEl: '.swiper-button-next',
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
async function getFeedback() {
  try {
    const response = await axios.get(`${BASE_URL}/feedbacks?limit=10`);
    if (!response || !response.data) {
      iziToast.error({
        message: 'Помилка сервера',
        position: 'topRight',
      });
      return;
    }

    const feedbacks = response.data.feedbacks;
    if (!feedbacks || feedbacks.length === 0) {
      iziToast.error({
        message: 'Щось пішло не так, спробуйте пізніше.',
        position: 'topRight',
      });
      return;
    }

    renderFeedbacks(feedbacks);

    initSwiper();

    initStars();
  } catch (error) {
    iziToast.error({
      message: 'Щось пішло не так, спробуйте пізніше.',
      position: 'topRight',
    });
    console.log(error);
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

getFeedback();

import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { refs } from '../refs';
import { createStarsMarkup } from '../utils/helpers';

let swiperInstance = null;

function createFeedbackMarkup(item) {
  return `
    <div class="swiper-slide">
      <article class="feedback-card">
        <div class="feedback-card__rating">
          ${createStarsMarkup(item.rate)}
        </div>
        <p class="feedback-card__text">${item.descr}</p>
        <h3 class="feedback-card__author">${item.name}</h3>
        <p class="feedback-card__date">${item.date}</p>
      </article>
    </div>
  `;
}

export function initFeedbacks(items) {
  refs.feedbacksWrapper.innerHTML = items.map(createFeedbackMarkup).join('');

  if (swiperInstance) {
    swiperInstance.destroy(true, true);
  }

  swiperInstance = new Swiper('[data-feedbacks-swiper]', {
    modules: [Navigation, Pagination],
    slidesPerView: 1,
    spaceBetween: 24,
    navigation: {
      nextEl: '[data-feedback-next]',
      prevEl: '[data-feedback-prev]',
    },
    pagination: {
      el: '[data-feedback-pagination]',
      clickable: true,
    },
  });
}
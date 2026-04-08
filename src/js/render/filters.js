import { getCategories } from '../api.js';

const filterList = document.querySelector('.filter-list');

export async function initFilters(setCategoryFn) {
  if (!filterList) return;

  try {
    const categories = await getCategories();

    const markup = `
      <li class="filter-item">
        <button class="filter-btn active-filter" data-category-id="">
          <img 
            src="/img/categories/all.jpg"
            alt="Всі товари"
            class="filter-img"
          />
          <span>Всі товари</span>
        </button>
      </li>

      ${categories
        .map(
          c => `
        <li class="filter-item">
          <button 
            class="filter-btn"
            data-category-id="${c._id}"
          >
            <img 
              src="/img/categories/${c._id}.jpg"
              srcset="
                /img/categories/${c._id}.jpg 1x,
                /img/categories/${c._id}@2x.jpg 2x
              "
              alt="${c.name}"
              class="filter-img"
            />
            <span>${c.name}</span>
          </button>
        </li>
      `
        )
        .join('')}
    `;

    filterList.innerHTML = markup;

    // делегирование событий
    filterList.addEventListener('click', e => {
      const btn = e.target.closest('.filter-btn');
      if (!btn) return;

      const categoryId = btn.dataset.categoryId;

      setCategoryFn?.(categoryId || undefined);

      filterList
        .querySelectorAll('.filter-btn')
        .forEach(b => b.classList.remove('active-filter'));

      btn.classList.add('active-filter');
    });
  } catch (err) {
    console.error(err);
  }
}
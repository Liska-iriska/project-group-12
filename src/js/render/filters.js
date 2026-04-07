import { getCategories } from "../api.js";
import { showError } from "../utils/toast.js";

const filterList = document.querySelector(".filter-list");

const filterClasses = [
  "filter-all", "filter-soft", "filter-cupboard", "filter-bed",
  "filter-table", "filter-chair", "filter-kitchen", "filter-childrens",
  "filter-office", "filter-rest", "filter-bathroom", "filter-outdoor",
  "filter-decor",
];

export async function initFilters(setCategoryFn) {
  if (!filterList) return console.error("Контейнер для фильтров не найден!");

  try {
    const categories = await getCategories();

    let html = `
      <li class="filter-item">
        <button class="filter-btn ${filterClasses[0]} active-filter" data-category-id="">Всі товари</button>
      </li>
    `;

    categories.forEach((c, index) => {
      const className = filterClasses[index + 1] || "";
      html += `
        <li class="filter-item">
          <button class="filter-btn ${className}" data-category-id="${c._id}">
            ${c.name}
          </button>
        </li>
      `;
    });

    filterList.innerHTML = html;

    const buttons = filterList.querySelectorAll(".filter-btn");
    buttons.forEach(btn => {
      btn.addEventListener("click", () => {
        const categoryId = btn.dataset.categoryId;
        if (setCategoryFn) setCategoryFn(categoryId || undefined);

        buttons.forEach(b => b.classList.remove("active-filter"));
        btn.classList.add("active-filter");
      });
    });

  } catch (err) {
    showError('Не вдалося завантажити категорії для фільтрів.');
  }
}
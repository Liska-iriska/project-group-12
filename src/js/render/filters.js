import { getCategories } from "../api.js";

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
        <button class="filter-btn ${filterClasses[0]} active" data-category-id="">Всі товари</button>
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

        buttons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
      });
    });

  } catch (err) {
    console.error("Ошибка загрузки фильтров:", err);
  }
}
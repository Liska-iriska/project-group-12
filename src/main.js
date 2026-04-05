import { getFurnitures, getCategories } from "./js/api.js";
import "./js/faq.js";

const furnituresContainer = document.getElementById("furnitures");
const categoriesContainer = document.getElementById("categories");

async function renderFurnitures() {
  try {
    const data = await getFurnitures();
    furnituresContainer.innerHTML = data.furnitures
      .map(
        (f) => `
        <div style="border:1px solid #ccc; padding:10px; margin:5px;">
          <h3>${f.name}</h3>
          <p>Price: ${f.price} грн</p>
          <p>Colors: ${f.color.join(", ")}</p>
          ${f.images.map((img) => `<img src="${img}" width="100">`).join("")}
        </div>
      `
      )
      .join("");
  } catch (err) {
    furnituresContainer.innerHTML = `<p>Ошибка загрузки мебели</p>`;
    console.error(err);
  }
}

async function renderCategories() {
  try {
    const categories = await getCategories();
    categoriesContainer.innerHTML = categories
      .map((c) => `<div>${c.name}</div>`)
      .join("");
  } catch (err) {
    categoriesContainer.innerHTML = `<p>Ошибка загрузки категорий</p>`;
    console.error(err);
  }
}

// вызываем при загрузке страницы
renderFurnitures();
renderCategories();
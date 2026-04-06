import axios from "axios";
import { showError } from "./utils/toast.js";

const BASE_URL = "https://furniture-store-v2.b.goit.study/api";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export async function getFurnitures(page = 1, limit = 30, category) {
  try {
    let url = `/furnitures?page=${page}&limit=${limit}`;
    if (category && category !== "all") {
      url += `&category=${encodeURIComponent(category)}`;
    }

    const response = await api.get(url);
    return response.data;

  } catch (err) {
    showError("Не вдалося завантажити галерею карток.");
    throw err;
  }
}

export async function getCategories() {
  try {
    const response = await api.get("/categories");
    return response.data;

  } catch (err) {
    showError("Не вдалося завантажити категорії.");
    throw err;
  }
}
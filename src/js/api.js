import axios from "axios";

const BASE_URL = "https://furniture-store-v2.b.goit.study/api";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export async function getFurnitures(page = 1, limit = 10) {
  const response = await api.get(`/furnitures?page=${page}&limit=${limit}`);
  return response.data;
}

export async function getCategories() {
  const response = await api.get("/categories");
  return response.data;
}
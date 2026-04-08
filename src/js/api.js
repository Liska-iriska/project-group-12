import { http } from './api/http.js';

const BASE_URL = 'https://furniture-store-v2.b.goit.study/api';

export async function getFurnitures(page = 1, limit = 30, category) {
  const params = { page, limit };
  if (category && category !== 'all') params.category = category;

  const { data } = await http.get('/furnitures', { params });
  return data;
}

export const getCategories = () =>
  http.get('/categories').then(res => res.data);

export const getFeedback = (limit = 25) =>
  http.get(`/feedbacks?limit=${limit}`).then(res => res.data);

export async function getFurnitureById(id) {
  const response = await fetch(`${BASE_URL}/furnitures/${id}`);

  if (!response.ok) {
    throw new Error('Не вдалося отримати меблі');
  }

  return response.json();
}
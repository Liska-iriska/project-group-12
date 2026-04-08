import { http } from './api/http.js';

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

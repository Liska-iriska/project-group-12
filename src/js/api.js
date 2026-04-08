import { http } from './api/http.js';
import { showError } from './utils/toast.js';

const BASE_URL = 'https://furniture-store-v2.b.goit.study/api';

export async function getFurnitures(page = 1, limit = 8, category) {
  const params = { page, limit };
  if (category && category !== 'all') params.category = category;

  try {
    const { data } = await http.get('/furnitures', { params });
    return data;
  } catch (err) {
    console.error(err);
    showError('Не вдалося завантажити меблі'); // тоаст ошибки
    return { furnitures: [] };
  }
}

export const getCategories = async () => {
  try {
    const res = await http.get('/categories');
    return res.data;
  } catch (err) {
    console.error(err);
    showError('Не вдалося завантажити категорії'); // тоаст ошибки
    return [];
  }
};

export const getFeedback = async (limit = 25) => {
  try {
    const res = await http.get(`/feedbacks?limit=${limit}`);
    return res.data;
  } catch (err) {
    console.error(err);
    showError('Не вдалося завантажити відгуки'); // тоаст ошибки
    return [];
  }
};

export async function getFurnitureById(id) {
  try {
    const response = await fetch(`${BASE_URL}/furnitures/${id}`);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Server response:', errorData);
      showError('Не вдалося отримати меблі'); // тоаст ошибки
      throw new Error('Не вдалося отримати меблі');
    }

    return response.json();
  } catch (err) {
    console.error(err);
    showError('Помилка при завантаженні меблів'); // тоаст ошибки
    throw err;
  }
}
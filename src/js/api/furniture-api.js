import { http } from './http';

export async function fetchCategories() {
  const { data } = await http.get('/categories');
  return data;
}

export async function fetchFurnitures({
  page = 1,
  limit = 8,
  name = '',
  category = '',
  sortDirect = '',
  sortName = '',
  type = '',
} = {}) {
  const params = { page, limit };

  if (name) params.name = name;
  if (category) params.category = category;
  if (sortDirect) params.sortDirect = sortDirect;
  if (sortName) params.sortName = sortName;
  if (type) params.type = type;

  const { data } = await http.get('/furnitures', { params });
  return data;
}

export async function fetchFurnitureById(id) {
  const { data } = await http.get(`/furnitures/${id}`);
  return data;
}

export async function fetchFeedbacks({ page = 1, limit = 10 } = {}) {
  const { data } = await http.get('/feedbacks', {
    params: { page, limit },
  });
  return data;
}

export async function createOrder(payload) {
  const { data } = await http.post('/orders', payload);
  return data;
}
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

export function showError(message = 'Щось пішло не так') {
  iziToast.error({
    title: 'Помилка',
    message,
    position: 'topRight',
    timeout: 4000,
  });
}

export function showSuccess(message = 'Успішно') {
  iziToast.success({
    title: 'OK',
    message,
    position: 'topRight',
    timeout: 3000,
  });
}
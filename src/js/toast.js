import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

iziToast.settings({
  position: 'topRight',
  timeout: 3000,
});

export function showSuccess(message) {
  iziToast.success({ message });
}

export function showError(message) {
  iziToast.error({ message });
}

export function showInfo(message) {
  iziToast.info({ message });
}

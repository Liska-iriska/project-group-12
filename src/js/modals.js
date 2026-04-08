// modal.js
const modal = document.querySelector('.furniture-modal');

export function initModals() {
  if (!modal) return;

  // Використовуємо ДЕЛЕГУВАННЯ на рівні всього документа
  document.addEventListener('click', event => {
    // Шукаємо, чи клікнули ми по кнопці "Детальніше" (навіть якщо вона щойно з'явилася)
    const btn = event.target.closest('.card-btn');

    if (btn) {
      modal.style.display = 'flex';
      document.body.style.overflow = 'hidden';
      return; // Виходимо, щоб не спрацював код нижче
    }

    // Закриття модалки
    if (event.target.closest('.close-btn') || event.target === modal) {
      modal.style.display = 'none';
      document.body.style.overflow = 'initial';
    }
  });
}

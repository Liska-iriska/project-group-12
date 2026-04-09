const burger = document.querySelector('.burger');
const menu = document.querySelector('#mobileMenu');
const overlay = document.querySelector('.overlay');

// ===== ФУНКЦИЯ ЗАКРЫТИЯ =====
function closeMenu() {
  if (!menu.classList.contains('active-burger')) return;

  // Убираем активный класс для transform/opacity
  menu.classList.remove('active-burger');
  burger.classList.remove('active-burger');
  overlay?.classList.remove('active-burger');

  document.body.classList.remove('is-open-burger');
  document.body.style.overflow = '';

  // После завершения анимации скрываем меню полностью
  menu.addEventListener('transitionend', function handler(e) {
    if (e.propertyName === 'transform') {
      menu.style.visibility = 'hidden';
      menu.removeEventListener('transitionend', handler);
    }
  });
}

// ===== ОТКРЫТИЕ =====
if (burger && menu) {
  burger.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('active-burger');
    burger.classList.toggle('active-burger');
    overlay?.classList.toggle('active-burger');

    if (isOpen) {
      // Сделать меню видимым перед анимацией
      menu.style.visibility = 'visible';
      document.body.classList.add('is-open-burger');
    } else {
      closeMenu();
    }
  });
}

// ===== ЗАКРЫТИЕ ПО КЛИКУ НА ССЫЛКУ, OVERLAY ИЛИ КНОПКУ =====
document.addEventListener('click', e => {
  const target = e.target;
  if (
    target.closest('#mobileMenu a') || 
    target.closest('.overlay') ||
    target.closest('.modal-menu__close')
  ) {
    closeMenu();
  }
});

// ===== ЗАКРЫТИЕ ПО ESC =====
window.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeMenu();
});

// ===== СБРОС МЕНЮ ПРИ РЕСАЙЗЕ =====
window.addEventListener('resize', () => {
  if (window.innerWidth >= 768) {
    // Сбрасываем состояние меню и overlay
    menu.classList.remove('active-burger');
    burger.classList.remove('active-burger');
    overlay?.classList.remove('active-burger');

    // Скрываем меню и сбрасываем overflow
    menu.style.visibility = 'hidden';
    document.body.classList.remove('is-open-burger');
    document.body.style.overflow = '';
  }
});
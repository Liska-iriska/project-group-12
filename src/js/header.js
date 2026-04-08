const burger = document.querySelector('.burger');
const menu = document.querySelector('#mobileMenu');
const overlay = document.querySelector('.overlay');

function closeMenu() {
  menu?.classList.remove('active-burger');
  burger?.classList.remove('active-burger');
  overlay?.classList.remove('active-burger');

  document.body.classList.remove('is-open-burger');
  document.body.style.overflow = '';
}

if (burger && menu) {
  burger.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('active-burger');
    burger.classList.toggle('active-burger');
    overlay?.classList.toggle('active-burger');

    if (isOpen) {
      document.body.classList.add('is-open-burger');
    } else {
      closeMenu();
    }
  });
}

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

window.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeMenu();
});

const burger = document.querySelector('.burger');
const menu = document.querySelector('#mobileMenu');
const closeBtn = document.querySelector('.modal-menu__close');
const burgerIcon = burger?.querySelector('use');
const overlay = document.querySelector('.overlay');

function closeMenu() {
  if (menu) {
    menu.classList.remove('active-burger');
  }

  burger?.classList.remove('active-burger');
  overlay?.classList.remove('active-burger');

  document.body.classList.remove('is-open-burger');
  document.body.style.overflow = '';

  if (burgerIcon) {
    burgerIcon.setAttribute('href', 'img/sprite.svg#menu');
  }
}

if (burger && menu) {
  burger.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('active-burger');
    burger.classList.toggle('active-burger');
    overlay?.classList.toggle('active-burger');

    if (burgerIcon) {
      burgerIcon.setAttribute(
        'href',
        '/img/sprite.svg#' + (isOpen ? 'close' : 'menu')
      );
    }

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

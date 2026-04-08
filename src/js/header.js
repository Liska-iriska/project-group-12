const burger = document.querySelector('.burger');
const menu = document.querySelector('#mobileMenu');
const closeBtn = document.querySelector('.modal-menu__close');
const burgerIcon = burger?.querySelector('use');
const overlay = document.querySelector('.overlay');
const spritePath = 'img/sprite.svg';
function closeMenu() {
  if (menu) {
    menu.classList.remove('active-burger');
  }

  burger?.classList.remove('active-burger');
  overlay?.classList.remove('active-burger');

  document.body.classList.remove('is-open-burger');
  document.body.style.overflow = '';

  if (burgerIcon) {
    burgerIcon.setAttribute('href', `${spritePath}#menu`);
  }
}

if (burger && menu) {
  burger.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('active-burger');
    burger.classList.toggle('active-burger');
    overlay?.classList.toggle('active-burger');

    if (burgerIcon) {
      const iconId = isOpen ? 'close' : 'menu';
      burgerIcon.setAttribute('href', `${spritePath}#${iconId}`);
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

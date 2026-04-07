// BURGER MENU & MODALS

const burger = document.querySelector('.burger');
const menu = document.querySelector('#mobileMenu');
const closeBtn = document.querySelector('.modal-menu__close');

const allMenuLinks = document.querySelectorAll(
  '#mobileMenu a, #mobileMenu button'
);
const burgerIcon = burger?.querySelector('use');
const overlay = document.querySelector('.overlay');

function closeMenu() {
  menu.classList.remove('active');
  burger.classList.remove('active');
  overlay.classList.remove('active');
  if (burgerIcon) {
    burgerIcon.setAttribute('href', 'img/sprite.svg#menu');
  }
  document.body.classList.remove('is-open');
}

burger.addEventListener('click', () => {
  const isOpen = menu.classList.toggle('active');
  burger.classList.toggle('active');
  overlay.classList.toggle('active');

  if (burgerIcon) {
    burgerIcon.setAttribute(
      'href',
      isOpen ? 'img/sprite.svg#close' : 'img/sprite.svg#menu'
    );
  }

  if (isOpen) {
    document.body.classList.add('is-open');
  } else {
    document.body.classList.remove('is-open');
  }
});

allMenuLinks.forEach(link => {
  link.addEventListener('click', closeMenu);
});

overlay.addEventListener('click', closeMenu);

if (closeBtn) {
  closeBtn.addEventListener('click', closeMenu);
}

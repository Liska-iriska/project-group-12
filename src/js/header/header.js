// BURGER MENU

const burger = document.querySelector('.burger');
const menu = document.querySelector('#mobileMenu');
const closeBtn = document.querySelector('.modal-menu__close');
const menuLinks = document.querySelectorAll('.modal-menu__list a');
const burgerIcon = burger.querySelector('use');
const overlay = document.querySelector('.overlay');

burger.addEventListener('click', () => {
  const isOpen = menu.classList.toggle('active');
  burger.classList.toggle('active');

  burgerIcon.setAttribute(
    'href',
    isOpen ? '/img/sprite.svg#close' : '/img/sprite.svg#menu'
  );

  overlay.classList.toggle('active');

  document.body.style.overflow = isOpen ? 'hidden' : '';
});

function closeMenu() {
  menu.classList.remove('active');
  burger.classList.remove('active');
  overlay.classList.remove('active');
  if (burgerIcon) {
  burgerIcon.setAttribute('href', '/img/sprite.svg#menu');
}
  document.body.style.overflow = '';
}

closeBtn.addEventListener('click', closeMenu);

menuLinks.forEach(link => {
  link.addEventListener('click', closeMenu);
});

overlay.addEventListener('click', closeMenu);

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeMenu();
    closeOrderModal();
  }
});

// ORDER MODAL

const openButtons = document.querySelectorAll('.header__btn, .buy_button');
const orderModal = document.querySelector('#order-modal');
const closeModalBtn = document.querySelector('.order-modal__close');

openButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    orderModal.classList.add('active');

    closeMenu();

    document.body.style.overflow = 'hidden';
  });
});

function closeOrderModal() {
  orderModal.classList.remove('active');
  document.body.style.overflow = '';
}

closeModalBtn.addEventListener('click', closeOrderModal);

orderModal.addEventListener('click', e => {
  if (e.target === orderModal) {
    closeOrderModal();
  }
});
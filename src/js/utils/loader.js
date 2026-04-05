export function showLoader() {
  const loader = document.querySelector('[data-loader]');
  if (loader) loader.classList.add('is-visible');
}

export function hideLoader() {
  const loader = document.querySelector('[data-loader]');
  if (loader) loader.classList.remove('is-visible');
}
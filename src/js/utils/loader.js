export function showLoader(name) {
  const loader = document.querySelector(`[data-loader="${name}"]`);
  if (loader) loader.classList.add('active');
}

export function hideLoader(name) {
  const loader = document.querySelector(`[data-loader="${name}"]`);
  if (loader) loader.classList.remove('active');
}

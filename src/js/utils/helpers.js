export function roundRating(value) {
  const num = Number(value);

  if (Number.isNaN(num)) return 0;
  if (num >= 3.3 && num <= 3.7) return 3.5;
  if (num >= 3.8 && num <= 4.2) return 4;

  return Math.round(num * 2) / 2;
}

export function createStarsMarkup(value) {
  const normalized = roundRating(value);
  const full = Math.floor(normalized);
  const half = normalized % 1 !== 0;
  const empty = 5 - full - (half ? 1 : 0);

  return `
    <span class="stars" aria-label="Рейтинг ${normalized} з 5">
      ${'<span class="star full">★</span>'.repeat(full)}
      ${half ? '<span class="star half">★</span>' : ''}
      ${'<span class="star empty">★</span>'.repeat(empty)}
    </span>
  `;
}

export function lockBodyScroll() {
  document.body.classList.add('no-scroll');
}

export function unlockBodyScroll() {
  document.body.classList.remove('no-scroll');
}

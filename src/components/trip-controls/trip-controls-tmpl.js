export const createTripControlsTemplate = (names) => {
  return (
    `<nav class="trip-controls__trip-tabs  trip-tabs">
    <h2 class="visually-hidden">Switch trip view</h2>
    ${names.map((name) => `<a class="trip-tabs__btn ${name.isChecked ? `trip-tabs__btn--active` : ``}" href="#">${name.title}</a>`).join(``)}
    </nav>`
  );
};

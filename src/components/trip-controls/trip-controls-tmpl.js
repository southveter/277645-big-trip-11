export const createTripControlsTemplate = () => {

  return (
    `<nav class="trip-controls__trip-tabs  trip-tabs">
    <h2 class="visually-hidden">Switch trip view</h2>
    <a id="control-table" class="trip-tabs__btn" href="#">Table</a>
    <a id="control-stats" class="trip-tabs__btn" href="#">Stats</a>
  </nav>`
  );
};

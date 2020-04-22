import {createElement} from "../utils.js";

const createTripTemplate = (cities, datesStart, datesEnd) => {
  return (
    `<section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
    ${cities.length > 3 ?
      `<h1 class="trip-info__title">${cities[0]} &mdash; ... &mdash; ${cities[cities.length - 1]}</h1>` :
      `<h1 class="trip-info__title">${cities[0]} &mdash; ${cities[1]} &mdash; ${cities[2]}</h1>`}
      <p class="trip-info__dates">${new Date(datesStart[0]).toDateString().slice(4)}&nbsp;&mdash;&nbsp;${new Date(datesEnd[datesEnd.length - 1]).toDateString().slice(4)}</p>
    </div>
  </section>`
  );
};

export default class Trip {
  constructor(cities, datesStart, datesEnd) {
    this._cities = cities;
    this._datesStart = datesStart;
    this._datesEnd = datesEnd;
    this._element = null;
  }

  getTemplate() {
    return createTripTemplate(this._cities, this._datesStart, this._datesEnd);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

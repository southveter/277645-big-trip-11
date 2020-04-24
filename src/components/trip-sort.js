import {createElement} from "../utils.js";

const createTripSortTemplate = (options) => {
  return (
    `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      <span class="trip-sort__item  trip-sort__item--day"></span>
    ${options.map(({name, isChecked}) => {
      return (`
        <div class="trip-sort__item  trip-sort__item--${name}">
          <input id="sort-${name}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${name}" ${isChecked ? `checked` : ``}>
          <label class="trip-sort__btn" for="sort-${name}">${name}</label>
        </div>
      `);
    }).join(``)}
      <span class="trip-sort__item  trip-sort__item--offers">Offers</span>
    </form>`
  );
};

export default class TripSort {
  constructor(options) {
    this._options = options;
    this._element = null;
  }

  getTemplate() {
    return createTripSortTemplate(this._options);
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

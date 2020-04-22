import {createElement} from "../utils.js";

const createFilterMarkup = (filter, isChecked) => {
  const {name} = filter;
  return `
    <div class="trip-filters__filter">
      <input id="filter-${name}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="past" ${isChecked ? `checked` : ``}
      >
      <label class="trip-filters__filter-label" for="filter-${name}">${name}</label>
    </div>`;
};

const createFiltersTemplate = (filters) => {
  const filterMarkup = filters.map((it, i) => createFilterMarkup(it, i === 0)).join(`\n`);
  return `<form class="trip-filters" action="#" method="get">
    ${filterMarkup}
    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>`;
};

export default class Filters {
  constructor(filters) {
    this._filters = filters;
    this._element = null;
  }

  getTemplate() {
    return createFiltersTemplate(this._filters);
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

import {createElement} from "../utils.js";

const createDayTemplate = (date, index) =>
  `<li class="trip-days__item  day">
<div class="day__info">
  <span class="day__counter">${index + 1}</span>
  <time class="day__date" datetime="${new Date(date).toString().slice(0, 10)}">${new Date(date).toString().slice(4, 11)}</time>
</div>
</li>`;

export default class Day {
  constructor(date, index) {
    this._date = date;
    this._index = index;
    this._element = null;
  }

  getTemplate() {
    return createDayTemplate(this._date, this._index);
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

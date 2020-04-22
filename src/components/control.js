import {createElement} from "../utils.js";

const createControlsTemplate = (values) => {
  return (
    `<nav class="trip-controls__trip-tabs  trip-tabs">
    ${values.map((value) => `<a class="trip-tabs__btn ${value.active ? `trip-tabs__btn--active` : ``}" href="#">${value.title}</a>`).join(``)}
  </nav>`
  );
};

export default class Controls {
  constructor(values) {
    this._values = values;
    this._element = null;
  }

  getTemplate() {
    return createControlsTemplate(this._values);
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

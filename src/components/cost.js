import {createElement} from "../utils.js";

const createCostTemplate = () => {
  return `<p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">50</span>
  </p>`;
};

export default class Cost {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createCostTemplate();
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

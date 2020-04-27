import {createElement} from '../../utils';
import {createTripCostTemplate} from '@Components/trip-cost/trip-cost-tmpl';

export default class TripCost {
  constructor(cards) {
    this._cards = cards;
    this._element = null;
  }

  getTemplate() {
    return createTripCostTemplate(this._cards);
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

import {createElement} from '../../utils';
import {createTripSortTemplate} from '@Components/trip-sort/trip-sort-tmpl';

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

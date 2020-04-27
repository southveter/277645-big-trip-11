import {createElement} from '../../utils';
import {createTripFilterTemplate} from '@Components/trip-filter/trip-filter-tmpl';

export default class TripFilter {
  constructor(filters) {
    this._filters = filters;
    this._element = null;
  }

  getTemplate() {
    return createTripFilterTemplate(this._filters);
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

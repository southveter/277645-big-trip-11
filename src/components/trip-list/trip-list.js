import {createElement} from '../../utils';
import {createTripListTemplate} from '@Components/trip-list/trip-list-tmpl';

export default class TripList {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createTripListTemplate();
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

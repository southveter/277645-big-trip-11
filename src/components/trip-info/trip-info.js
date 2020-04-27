import {createElement} from '../../utils';
import {createTripInfoTemplate} from '@Components/trip-info/trip-info-tmpl';

export default class TripInfo {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createTripInfoTemplate();
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

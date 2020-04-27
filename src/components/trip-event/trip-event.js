import {createElement} from '../../utils';
import {createTripEventTemplate} from '@Components/trip-event/trip-event-tmpl';

export default class TripEvent {
  constructor(cardData) {
    this._cardData = cardData;
    this._element = null;
  }

  getTemplate() {
    return createTripEventTemplate(this._cardData);
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

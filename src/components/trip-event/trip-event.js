import Abstract from '@components/abstract';
import {createTripEventTemplate} from '@components/trip-event/trip-event-tmpl';

export default class TripEvent extends Abstract {
  constructor(cardData) {
    super();
    this._cardData = cardData;
  }

  getTemplate() {
    return createTripEventTemplate(this._cardData);
  }

  setClickHandler(handler) {
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, handler);
  }
}

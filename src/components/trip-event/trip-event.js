import Abstract from '@components/abstract';
import {createTripEventTemplate} from '@components/trip-event/trip-event-tmpl';

export default class TripEvent extends Abstract {
  constructor(event) {
    super();
    this._event = event;
  }

  getTemplate() {
    return createTripEventTemplate(this._event);
  }

  setClickHandler(handler) {
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, handler);
  }
}

import Abstract from '@Components/abstract';
import {createTripDayTemplate} from '@Components/trip-day/trip-day-tmpl';

export default class TripDay extends Abstract {
  constructor(day, index) {
    super();
    this._day = day;
    this._index = index;
  }

  getTemplate() {
    return createTripDayTemplate(this._day, this._index);
  }
}

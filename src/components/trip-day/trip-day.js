import Abstract from '@components/abstract';
import {createTripDayTemplate} from '@components/trip-day/trip-day-tmpl';

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

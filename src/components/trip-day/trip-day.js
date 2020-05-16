import Abstract from '@components/abstract';
import {createTripDayTemplate} from '@components/trip-day/trip-day-tmpl';

export default class TripDay extends Abstract {
  constructor(date, index) {
    super();
    this._date = date;
    this._index = index;
  }

  getTemplate() {
    return createTripDayTemplate(this._date, this._index);
  }
}

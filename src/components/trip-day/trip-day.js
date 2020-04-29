import Abstract from '@Components/abstract/abstract';
import {createTripDayTemplate} from '@Components/trip-day/trip-day-tmpl';

export default class TripDay extends Abstract {
  constructor(date, dayNumber) {
    super();
    this._date = date;
    this._dayNumber = dayNumber;
  }

  getTemplate() {
    return createTripDayTemplate(this._date, this._dayNumber);
  }
}

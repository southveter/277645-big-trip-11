import Abstract from '@Components/abstract/abstract';
import {createTripSortTemplate} from '@Components/trip-sort/trip-sort-tmpl';

export default class TripSort extends Abstract {
  constructor(options) {
    super();
    this._options = options;
  }

  getTemplate() {
    return createTripSortTemplate(this._options);
  }
}

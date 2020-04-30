import Abstract from '@Components/abstract/abstract';
import {createTripFilterTemplate} from '@Components/trip-filter/trip-filter-tmpl';

export default class TripFilter extends Abstract {
  constructor(filters) {
    super();
    this._filters = filters;
  }

  getTemplate() {
    return createTripFilterTemplate(this._filters);
  }
}

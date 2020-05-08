import Abstract from '@components/abstract';
import {createTripFilterTemplate} from '@components/trip-filter/trip-filter-tmpl';

export default class TripFilter extends Abstract {
  constructor(filters) {
    super();
    this._filters = filters;
  }

  getTemplate() {
    return createTripFilterTemplate(this._filters);
  }
}

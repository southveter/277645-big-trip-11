import Abstract from '@components/abstract';
import {createTripRouteTemplate} from '@components/trip-route/trip-route-tmpl';

export default class TripRoute extends Abstract {
  constructor(cities, dates) {
    super();
    this._cities = cities;
    this._dates = dates;
  }

  getTemplate() {
    return createTripRouteTemplate(this._cities, this._dates);
  }
}

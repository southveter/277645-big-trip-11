import Abstract from '@Components/abstract/abstract';
import {createTripRouteTemplate} from '@Components/trip-route/trip-route-tmpl';

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

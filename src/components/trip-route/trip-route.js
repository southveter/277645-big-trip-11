import {createElement} from '../../utils';
import {createTripRouteTemplate} from '@Components/trip-route/trip-route-tmpl';

export default class TripRoute {
  constructor(cities, dates) {
    this._cities = cities;
    this._dates = dates;
    this._element = null;
  }

  getTemplate() {
    return createTripRouteTemplate(this._cities, this._dates);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

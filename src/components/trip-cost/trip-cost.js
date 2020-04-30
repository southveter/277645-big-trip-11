import Abstract from '@Components/abstract/abstract';
import {createTripCostTemplate} from '@Components/trip-cost/trip-cost-tmpl';

export default class TripCost extends Abstract {
  constructor(cards) {
    super();
    this._cards = cards;
  }

  getTemplate() {
    return createTripCostTemplate(this._cards);
  }
}

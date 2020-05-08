import Abstract from '@components/abstract';
import {createTripCostTemplate} from '@components/trip-cost/trip-cost-tmpl';

export default class TripCost extends Abstract {
  constructor(cards) {
    super();
    this._cards = cards;
  }

  getTemplate() {
    return createTripCostTemplate(this._cards);
  }
}

import Abstract from '@Components/abstract';
import {createTripListTemplate} from '@Components/trip-list/trip-list-tmpl';

export default class TripList extends Abstract {
  getTemplate() {
    return createTripListTemplate();
  }
}

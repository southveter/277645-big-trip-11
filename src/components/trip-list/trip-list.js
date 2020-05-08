import Abstract from '@components/abstract';
import {createTripListTemplate} from '@components/trip-list/trip-list-tmpl';

export default class TripList extends Abstract {
  getTemplate() {
    return createTripListTemplate();
  }
}

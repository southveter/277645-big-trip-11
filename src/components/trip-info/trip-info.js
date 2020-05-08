import Abstract from '@components/abstract';
import {createTripInfoTemplate} from '@components/trip-info/trip-info-tmpl';

export default class TripInfo extends Abstract {
  getTemplate() {
    return createTripInfoTemplate();
  }
}

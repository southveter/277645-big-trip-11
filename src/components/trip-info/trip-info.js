import Abstract from '@Components/abstract/abstract';
import {createTripInfoTemplate} from '@Components/trip-info/trip-info-tmpl';

export default class TripInfo extends Abstract {
  getTemplate() {
    return createTripInfoTemplate();
  }
}

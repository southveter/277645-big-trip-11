import Abstract from '@components/abstract';
import {createTripInfoTemplate} from '@components/trip-info/trip-info-tmpl';

export default class TripInfo extends Abstract {

  constructor(pointsModel) {
    super();

    this._pointsModel = pointsModel;
  }

  getTemplate() {
    return createTripInfoTemplate(this._pointsModel.getPointsAll());
  }
}

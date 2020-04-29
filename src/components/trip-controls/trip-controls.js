import Abstract from '@Components/abstract/abstract';
import {createTripControlsTemplate} from '@Components/trip-controls/trip-controls-tmpl';


export default class TripControls extends Abstract {
  constructor(names) {
    super();
    this._names = names;
  }

  getTemplate() {
    return createTripControlsTemplate(this._names);
  }
}

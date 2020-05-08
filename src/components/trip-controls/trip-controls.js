import Abstract from '@components/abstract';
import {createTripControlsTemplate} from '@components/trip-controls/trip-controls-tmpl';


export default class TripControls extends Abstract {
  constructor(names) {
    super();
    this._names = names;
  }

  getTemplate() {
    return createTripControlsTemplate(this._names);
  }
}

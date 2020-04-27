import {createElement} from '../../utils';
import {createTripControlsTemplate} from '@Components/trip-controls/trip-controls-tmpl';


export default class TripControls {
  constructor(names) {
    this._names = names;
    this._element = null;
  }

  getTemplate() {
    return createTripControlsTemplate(this._names);
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

import {createElement} from '../../utils';
import {createEditEventTemplate} from '@Components/edit-event/edit-event-tmpl';

export default class EditEvent {
  constructor(cardData) {
    this._cardData = cardData;
    this._element = null;
  }

  getTemplate() {
    return createEditEventTemplate(this._cardData);
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



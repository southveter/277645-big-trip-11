import Abstract from '@Components/abstract/abstract';
import {createEditEventTemplate} from '@Components/edit-event/edit-event-tmpl';

export default class EditEvent extends Abstract {
  constructor(cardData) {
    super();
    this._cardData = cardData;
  }

  getTemplate() {
    return createEditEventTemplate(this._cardData);
  }

  setSubmitHandler(handler) {
    this.getElement().addEventListener(`submit`, handler);
  }

  setCloseHandler(handler) {
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, handler);
  }
}

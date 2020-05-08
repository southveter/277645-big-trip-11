import AbstractSmart from '@components/abstract-smart';
import {createEditEventTemplate} from '@components/edit-event/edit-event-tmpl';
import {getRandomDescription, getRandomPhotos, getRandomServices} from '../../utils/common';
import {actionType} from '../../consts';


export default class EditEvent extends AbstractSmart {
  constructor(cardData) {
    super();
    this._cardData = cardData;
    this._type = cardData.type;
    this._city = cardData.city;
    this._description = cardData.description;
    this._photos = cardData.photos;
    this._services = cardData.services;
    this._subscribeOnEvents();
  }

  getTemplate() {
    return createEditEventTemplate(this._cardData, {
      type: this._type,
      city: this._city,
      description: this._description,
      services: this._services,
      photos: this._photos
    });
  }

  recoveryListeners() {
    this.setSubmitHandler(this._submitHandler);
    this.setFavoritesButtonClickHandler(this._favoritesClickHandler);
    this.setClickHandler(this._clickHandler);
    this.setCloseHandler(this._closeHandler);
    this._subscribeOnEvents();
  }

  setSubmitHandler(handler) {
    this.getElement().addEventListener(`submit`, handler);
    this._submitHandler = handler;
  }

  setCloseHandler(handler) {
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, handler);
    this._closeHandler = handler;
  }

  setClickHandler(handler) {
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, handler);
    this._clickHandler = handler;
  }

  setFavoritesButtonClickHandler(handler) {
    this.getElement().querySelector(`.event__favorite-btn`).addEventListener(`click`, handler);
    this._favoritesClickHandler = handler;
  }

  _subscribeOnEvents() {
    const element = this.getElement();

    element.querySelector(`.event__type-list`).addEventListener(`change`, (evt) => {

      this._type = actionType.get(evt.target.value);

      this.rerender();
    });

    element.querySelector(`.event__input--destination`).addEventListener(`change`, (evt) => {
      this._city = evt.target.value;
      this._description = getRandomDescription();
      this._photos = getRandomPhotos();
      this._services = getRandomServices();

      this.rerender();
    });
  }
}

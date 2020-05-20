import AbstractSmart from '@components/abstract-smart';
import {createEditEventTemplate} from '@components/edit-event/edit-event-tmpl';
import {clearString} from '../../utils/common';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Store from '../../models/store.js';

const DefaultData = {
  deleteButtonText: `Delete`,
  saveButtonText: `Save`,
};


export default class EditEvent extends AbstractSmart {
  constructor(point) {
    super();
    this._point = point;
    this._type = point.type;
    this._city = point.city;
    this._price = point.price;
    this._description = point.description;
    this._offers = point.offers;
    this._photos = point.photos;
    this._externalData = DefaultData;
    this._flatpickrStartDate = null;
    this._flatpickrEndDate = null;
    this._deleteButtonClickHandler = null;
    this._favoritesClickHandler = null;
    this._submitHandler = null;
    this._deleteButtonClickHandler = null;
    this._applyFlatpickr();
    this._subscribeOnEvents();
  }

  getTemplate() {
    return createEditEventTemplate(this._point, {
      type: this._type,
      city: this._city,
      description: this._description,
      offers: this._offers,
      photos: this._photos,
      externalData: this._externalData
    });
  }

  getData() {
    const form = this.getElement();
    return new FormData(form);
  }

  setData(data) {
    this._externalData = Object.assign({}, DefaultData, data);
    this.rerender();
  }

  rerender() {
    super.rerender();
    this._applyFlatpickr();
  }

  removeElement() {
    if (this._flatpickrStartDate || this._flatpickrEndDate) {
      this._flatpickrStartDate.destroy();
      this._flatpickrEndDate.destroy();
      this._flatpickrStartDate = null;
      this._flatpickrEndDate = null;
      this._clickHandler = null;
    }
    super.removeElement();
  }

  recoveryListeners() {
    this.setSubmitHandler(this._submitHandler);
    this.setFavoritesButtonClickHandler(this._favoritesClickHandler);
    this.setClickHandler(this._clickHandler);
    this.setDeleteButtonClickHandler(this._deleteButtonClickHandler);
    this._subscribeOnEvents();
  }

  reset() {
    const point = this._point;
    this._type = point.type;
    this._city = point.city;
    this.rerender();
  }

  setSubmitHandler(handler) {
    this.getElement().addEventListener(`submit`, handler);
    this._submitHandler = handler;
  }

  setDeleteButtonClickHandler(handler) {
    this.getElement().querySelector(`.event__reset-btn`).addEventListener(`click`, handler);
    this._deleteButtonClickHandler = handler;
  }

  setClickHandler(handler) {
    const element = this.getElement().querySelector(`.event__rollup-btn`);
    if (element) {
      element.addEventListener(`click`, handler);
      this._clickHandler = handler;
    }
  }

  setFavoritesButtonClickHandler(handler) {
    this.getElement().querySelector(`.event__favorite-btn`).addEventListener(`click`, handler);
    this._favoritesClickHandler = handler;
  }

  disableForm() {
    const form = this.getElement();
    const elements = Array.from(form.elements);
    elements.forEach((elm) => {
      elm.readOnly = true;
    });
  }

  activeForm() {
    const form = this.getElement();
    const elements = Array.from(form.elements);
    elements.forEach((elm) => {
      elm.readOnly = false;
    });
  }

  _subscribeOnEvents() {
    const element = this.getElement();

    element.querySelector(`.event__type-list`).addEventListener(`change`, (evt) => {
      this._type = evt.target.value;
      this._offers = Store.getOffers().find((offer) => offer.type === this._type).offers;

      this.rerender();
    });

    element.querySelector(`.event__input--destination`).addEventListener(`change`, (evt) => {
      this._city = evt.target.value;
      this._photos = Store.getDestinations().find((destination) => destination.name === this._city).pictures;
      this._description = Store.getDestinations().find((destination) => destination.name === this._city).description;

      this.rerender();
    });

    element.querySelector(`.event__input--price`).addEventListener(`input`, (evt) => {
      evt.target.value = clearString(evt.target.value);
    });
  }

  _applyFlatpickr() {
    if (this._flatpickrStartDate || this._flatpickrEndDate) {
      this._flatpickrStartDate.destroy();
      this._flatpickrEndDate.destroy();
      this._flatpickrStartDate = null;
      this._flatpickrEndDate = null;
    }

    const element = this.getElement();
    const options = {
      allowInput: true,
      dateFormat: `d/m/y H:i`,
      minDate: this._point.start,
      enableTime: true
    };

    this._flatpickrStartDate = flatpickr(element.querySelector(`#event-start-time-1`), Object.assign({}, options, {defaultDate: this._point.start}));

    this._flatpickrEndDate = flatpickr(element.querySelector(`#event-end-time-1`), Object.assign({}, options, {defaultDate: this._point.end}));
  }
}

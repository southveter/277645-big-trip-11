import AbstractSmart from '@components/abstract-smart';
import {createEditEventTemplate} from '@components/edit-event/edit-event-tmpl';
import {getRandomDescription, getRandomPhotos, getRandomServices, getRandomCities} from '../../utils/common';
import {CITIES} from '../../consts';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const isDestinationInCitiesList = (citiesList, destination) => {
  return citiesList.some((city) => city === destination);
};

export default class EditEvent extends AbstractSmart {
  constructor(cardData) {
    super();
    this._cardData = cardData;
    this._type = cardData.type;
    this._city = cardData.city;
    this._description = cardData.description;
    this._photos = cardData.photos;
    this._services = cardData.services;
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
    return createEditEventTemplate(this._cardData, {
      type: this._type,
      city: this._city,
      description: this._description,
      services: this._services,
      photos: this._photos
    });
  }

  getData() {
    const form = this.getElement();
    return new FormData(form);
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

  rerender() {
    super.rerender();
    this._applyFlatpickr();
  }


  recoveryListeners() {
    this.setSubmitHandler(this._submitHandler);
    this.setFavoritesButtonClickHandler(this._favoritesClickHandler);
    this.setClickHandler(this._clickHandler);
    this.setDeleteButtonClickHandler(this._deleteButtonClickHandler);
    this._subscribeOnEvents();
  }

  reset() {
    const cardData = this._cardData;

    this._type = cardData.type;
    this._city = cardData.city;
    this._description = cardData.description;
    this._photos = cardData.photos;
    this._services = cardData.services;

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
    const editEventButton = this.getElement().querySelector(`.event__rollup-btn`);
    if (editEventButton) {
      editEventButton.addEventListener(`click`, handler);
      this._clickHandler = handler;
    }
  }

  setFavoritesButtonClickHandler(handler) {
    this.getElement().querySelector(`.event__favorite-btn`).addEventListener(`click`, handler);
    this._favoritesClickHandler = handler;
  }

  _subscribeOnEvents() {
    const element = this.getElement();

    const eventTypeButtons = element.querySelectorAll(`.event__type-input`);
    const destinationInputs = element.querySelectorAll(`.event__input--destination`);
    const submitButton = element.querySelector(`.event__save-btn`);

    eventTypeButtons.forEach((button) => {
      button.addEventListener(`click`, (evt) => {
        const type = evt.target.value;

        this._type = type[0].toUpperCase() + type.slice(1);
        this._offers = getRandomServices();
        this._city = getRandomCities();
        this._description = getRandomDescription();
        this._photos = getRandomPhotos();

        this.rerender();
      });
    });

    destinationInputs.forEach((input) => {
      input.addEventListener(`change`, () => {
        if (!isDestinationInCitiesList(CITIES, input.value)) {
          submitButton.disabled = true;
        } else {
          submitButton.disabled = false;
        }
      });
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
      minDate: this._cardData.start,
      enableTime: true
    };

    this._flatpickrStartDate = flatpickr(element.querySelector(`#event-start-time-1`), Object.assign({}, options, {defaultDate: this._cardData.start}));

    this._flatpickrEndDate = flatpickr(element.querySelector(`#event-end-time-1`), Object.assign({}, options, {defaultDate: this._cardData.end}));
  }
}

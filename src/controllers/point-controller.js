import TripEvent from '@components/trip-event/trip-event';
import EditEvent from '@components/edit-event/edit-event';
import {render, RenderPosition, replace, remove} from '../utils/render';
import {MODE} from '../consts';
import {isEscKey, EmptyEvent} from '../utils/common';
import moment from 'moment';
import Point from '../models/point.js';
import Store from '../models/store.js';

const SHAKE_ANIMATION_TIMEOUT = 600;

const parseFormData = (formData) => {
  const selectedOffers = [
    ...document.querySelectorAll(`.event__offer-checkbox:checked + label[for^="event"]`)
  ];

  const destination = Store.getDestinations().find((city) => city.name === formData.get(`event-destination`));

  return new Point({
    'base_price': Number(formData.get(`event-price`)),
    'date_from': new Date(
        moment(formData.get(`event-start-time`), `DD/MM/YYYY HH:mm`).valueOf()
    ).toISOString(),
    'date_to': new Date(
        moment(formData.get(`event-end-time`), `DD/MM/YYYY HH:mm`).valueOf()
    ).toISOString(),
    'destination': {
      'description': destination.description,
      'name': destination.name,
      'pictures': destination.pictures
    },
    'id': `0`,
    'is_favorite': formData.get(`event-favorite`) ? true : false,
    'offers': selectedOffers.map((offer) => ({
      'title': offer.querySelector(`.event__offer-title`).textContent,
      'price': Number(offer.querySelector(`.event__offer-price`).textContent)
    })),
    'type': formData.get(`event-current-type`)
  });
};

export default class PointController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._mode = MODE.DEFAULT;

    this._eventItem = null;
    this._editEvent = null;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  render(point, mode) {
    const oldEventComponent = this._eventComponent;
    const oldEventEditComponent = this._eventEditComponent;
    this._mode = mode;

    this._eventComponent = new TripEvent(point);
    this._eventEditComponent = new EditEvent(point);

    const eventsList = this._container.querySelector(`.trip-events__list`);

    this._eventComponent.setClickHandler(() => {
      this._replaceEventToEdit();
      document.addEventListener(`keydown`, this._onEscKeyDown);
    });

    this._eventEditComponent.setSubmitHandler((evt) => {
      evt.preventDefault();
      const formData = this._eventEditComponent.getData();
      const data = parseFormData(formData);
      this._eventEditComponent.disableForm();
      this._eventEditComponent.setData({
        saveButtonText: `Saving...`,
      });
      this._onDataChange(this, point, data);
      this._eventEditComponent.activeForm();
      this._replaceEditToEvent();
    });

    this._eventEditComponent.setDeleteButtonClickHandler(() => {
      this._eventEditComponent.setData({
        deleteButtonText: `Deleting...`,
      });

      this._onDataChange(this, point, null);
    });

    this._eventEditComponent.setFavoritesButtonClickHandler(() => {
      const newPoint = Point.clone(point);
      newPoint.isFavorite = !newPoint.isFavorite;

      this._onDataChange(this, point, newPoint);
      this._mode = MODE.EDIT;
    });

    switch (mode) {
      case MODE.DEFAULT:
        if (oldEventEditComponent && oldEventComponent) {
          replace(this._eventComponent, oldEventComponent);
          replace(this._eventEditComponent, oldEventEditComponent);
        } else {
          render(eventsList, this._eventComponent, RenderPosition.BEFOREEND);
        }
        break;
      case MODE.CREATING:
        if (oldEventEditComponent && oldEventComponent) {
          remove(oldEventComponent);
          remove(oldEventEditComponent);
        }
        document.addEventListener(`keydown`, this._onEscKeyDown);
        render(eventsList, this._eventEditComponent, RenderPosition.AFTERBEGIN);
        break;
    }
  }

  setDefaultView() {
    if (this._mode !== MODE.DEFAULT) {
      this. _replaceEditToEvent();
    }
  }

  _replaceEventToEdit() {
    this._onViewChange();
    replace(this._eventEditComponent, this._eventComponent);
    this._mode = MODE.EDIT;
  }

  _replaceEditToEvent() {
    document.removeEventListener(`keydown`, this._onEscKeyDown);
    replace(this._eventComponent, this._eventEditComponent);
    this._mode = MODE.DEFAULT;
  }

  shake() {
    this._eventEditComponent.getElement().style.animation = `shake ${SHAKE_ANIMATION_TIMEOUT / 1000}s`;
    this._eventComponent.getElement().style.animation = `shake ${SHAKE_ANIMATION_TIMEOUT / 1000}s`;

    setTimeout(() => {
      this._eventEditComponent.getElement().style.animation = ``;
      this._eventComponent.getElement().style.animation = ``;

      this._eventEditComponent.setData({
        saveButtonText: `Save`,
        deleteButtonText: `Delete`,
      });
    }, SHAKE_ANIMATION_TIMEOUT);
  }

  _onEscKeyDown(evt) {

    if (isEscKey(evt)) {
      if (this._mode === MODE.CREATING) {
        this._onDataChange(this, EmptyEvent, null);
      }
      this. _replaceEditToEvent();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }

  destroy() {
    remove(this._eventEditComponent);
    remove(this._eventComponent);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }
}

import TripEvent from '@components/trip-event/trip-event';
import EditEvent from '@components/edit-event/edit-event';
import {render, RenderPosition, replace, remove} from '../utils/render';
import {MODE} from '../consts';
import {isEscKey, EmptyEvent} from '../utils/common';
import moment from 'moment';

const parseFormData = (formData) => {
  return {
    city: formData.get(`event-destination`),
    start: moment(formData.get(`event-start-time`), `DD/MM/YYYY HH:mm`),
    end: moment(formData.get(`event-end-time`), `DD/MM/YYYY HH:mm`),
    price: formData.get(`event-price`)
  };
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

  render(event, mode) {
    const oldEventComponent = this._eventComponent;
    const oldEventEditComponent = this._eventEditComponent;
    this._mode = mode;

    this._eventComponent = new TripEvent(event);
    this._eventEditComponent = new EditEvent(event);

    const eventsList = this._container.querySelector(`.trip-events__list`);

    this._eventComponent.setClickHandler(() => {
      this._replaceEventToEdit();
      document.addEventListener(`keydown`, this._onEscKeyDown);
    });

    this._eventEditComponent.setSubmitHandler((evt) => {
      evt.preventDefault();
      const formData = this._eventEditComponent.getData();
      const data = parseFormData(formData);
      this._onDataChange(this, event, Object.assign({}, event, data));
      this._replaceEditToEvent();
    });

    this._eventEditComponent.setDeleteButtonClickHandler(() => this._onDataChange(this, event, null));

    this._eventEditComponent.setFavoritesButtonClickHandler(() => {
      this._onDataChange(this, event, Object.assign({}, event, {
        isFavorite: !event.isFavorite,
      }));
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

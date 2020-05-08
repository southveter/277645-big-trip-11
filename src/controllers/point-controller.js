import TripEvent from '@components/trip-event/trip-event';
import EditEvent from '@components/edit-event/edit-event';
import {render, RenderPosition, replace} from '../utils/render';
import {MODE} from '../consts';
import {isEscKey} from '../utils/common';


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

  render(event) {
    const oldEventComponent = this._eventComponent;
    const oldEventEditComponent = this._eventEditComponent;

    this._eventComponent = new TripEvent(event);
    this._eventEditComponent = new EditEvent(event);

    this._eventComponent.setClickHandler(() => {
      this._replaceTaskToEdit();
      document.addEventListener(`keydown`, this._onEscKeyDown);
    });

    this._eventEditComponent.setSubmitHandler((evt) => {
      evt.preventDefault();
      this._replaceEditToTask();
    });

    this._eventEditComponent.setCloseHandler((evt) => {
      evt.preventDefault();
      this._replaceEditToTask();
    });

    this._eventEditComponent.setFavoritesButtonClickHandler(() => {
      this._onDataChange(this, event, Object.assign({}, event, {
        isFavorite: !event.isFavorite,
      }));
    });

    if (oldEventComponent && oldEventEditComponent) {
      replace(this._eventComponent, oldEventComponent);
      replace(this._eventEditComponent, oldEventEditComponent);
    } else {
      render(this._container, this._eventComponent, RenderPosition.BEFOREEND);
    }
  }

  setDefaultView() {
    if (this._mode !== MODE.DEFAULT) {
      this._replaceEditToTask();
    }
  }

  _replaceTaskToEdit() {
    this._onViewChange();
    replace(this._eventEditComponent, this._eventComponent);
    this._mode = MODE.EDIT;
  }

  _replaceEditToTask() {
    replace(this._eventComponent, this._eventEditComponent);
    this._mode = MODE.DEFAULT;
  }

  _onEscKeyDown(evt) {
    // const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey(evt)) {
      this._replaceEditToTask();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }
}

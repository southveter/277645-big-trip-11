import {datesList} from '../utils/common';
import {SORT_OPTIONS} from '../consts';
import {
  renderElement,
  RenderPosition,
  replace,
}
  from '../utils/render';
import TripDay from '@Components/trip-day/trip-day';
import TripEvent from '@Components/trip-event/trip-event';
import EditEvent from '@Components/edit-event/edit-event';
import NoEvents from '@Components/no-events/no-events';
import TripList from '@Components/trip-list/trip-list';
import TripSort from '@Components/trip-sort/trip-sort';

const renderTripDays = (cards) => {
  const tripDaysList = document.querySelector(`.trip-days`);

  datesList.forEach((date, dateIndex) => {
    renderElement(tripDaysList, new TripDay(date, dateIndex + 1), RenderPosition.BEFOREEND);
    const dayCurrent = tripDaysList.querySelector(`.trip-days__item:last-of-type`);

    cards
      .filter((card) => new Date(card.start).toDateString() === date)
      .forEach((card) => {

        const onEscKeyDown = (evt) => {
          const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

          if (isEscKey) {
            changeEditToEvent();
            document.removeEventListener(`keydown`, onEscKeyDown);
          }
        };

        const eventsList = dayCurrent.querySelector(`.trip-events__list`);

        const changeEventToEdit = () => {
          replace(editEventItem, newEvent);
        };

        const changeEditToEvent = () => {
          replace(newEvent, editEventItem);
        };

        const newEvent = new TripEvent(card);
        newEvent.setClickHandler(() => {
          changeEventToEdit();
          document.addEventListener(`keydown`, onEscKeyDown);
        });

        const editEventItem = new EditEvent(card);
        editEventItem.setSubmitHandler(changeEditToEvent);
        editEventItem.setCloseHandler(changeEditToEvent);

        renderElement(eventsList, newEvent, RenderPosition.BEFOREEND);
      });
  });
};

export default class TripController {
  constructor(container) {
    this._container = container;
    this._noEvents = new NoEvents();
    this._tripList = new TripList();
    this._tripSort = new TripSort(SORT_OPTIONS);
  }

  render(cards) {
    const container = this._container;

    if (cards.length === 0) {
      renderElement(container, this._noEvents, RenderPosition.BEFOREEND);
    } else {
      renderElement(container, this._tripSort, RenderPosition.AFTERBEGIN);
      renderElement(container, this._tripList, RenderPosition.BEFOREEND);
      renderTripDays(cards);
    }
  }
}

import {SORT_OPTIONS, SORT_TYPE, EVENTS_AMOUNT} from '../consts';
import {
  renderElement,
  RenderPosition,
  replace,
  remove,
}
  from '../utils/render';
import TripDay from '@Components/trip-day/trip-day';
import TripEvent from '@Components/trip-event/trip-event';
import EditEvent from '@Components/edit-event/edit-event';
import NoEvents from '@Components/no-events/no-events';
import TripList from '@Components/trip-list/trip-list';
import TripSort from '@Components/trip-sort/trip-sort';

const getSortedEvents = (events, sortType, from, to) => {
  let sortedEvents = [];
  const showingEvents = events.slice();

  switch (sortType) {
    case SORT_TYPE.TIME:
      sortedEvents = showingEvents.sort((a, b) => (a.end - a.start) - (b.end - b.start));
      break;
    case SORT_TYPE.PRICE:
      sortedEvents = showingEvents.sort((a, b) => a.price - b.price);
      break;
    case SORT_TYPE.EVENT:
      sortedEvents = showingEvents;
      break;
  }

  return sortedEvents.slice(from, to);
};

const renderTripDay = (container, events, day, index) => {
  const tripDay = new TripDay(day, index + 1);
  const tripDayElement = tripDay.getElement();

  events.forEach((card) => {
    const newEvent = new TripEvent(card);
    const editEvent = new EditEvent(card);
    const onEscKeyDown = (evt) => {
      const isEscKey = evt.key === `Escape` || evt.key === `Esc`;
      if (isEscKey) {
        replaceEditToTask();
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    const eventsList = tripDayElement.querySelector(`.trip-events__list`);
    const replaceTaskToEdit = () => {
      replace(editEvent, newEvent);
    };

    const replaceEditToTask = () => {
      replace(newEvent, editEvent);
    };

    newEvent.setClickHandler(() => {
      replaceTaskToEdit();
      document.addEventListener(`keydown`, onEscKeyDown);
    });

    editEvent.setSubmitHandler(replaceEditToTask);
    editEvent.setCloseHandler(replaceEditToTask);

    renderElement(eventsList, newEvent, RenderPosition.BEFOREEND);
  });
  renderElement(container, tripDay, RenderPosition.BEFOREEND);
};

const renderEventsList = (container, events, eventsDates) => {
  eventsDates.forEach((day, index) => {
    const dayEvents = events.filter((event) => {
      return day === new Date(event.start).toDateString();
    });
    renderTripDay(container, dayEvents, day, index);
  });
};


export default class TripController {
  constructor() {
    this._noEvents = new NoEvents();
    this._tripList = new TripList();
    this._tripSort = new TripSort(SORT_OPTIONS);
  }

  render(events) {
    const dates = [...new Set(events.map((item) => new Date(item.start).toDateString()))].sort((a, b) => {
      return new Date(a).getDate() - new Date(b).getDate();
    });

    const tripEventsElement = document.querySelector(`.trip-events`);
    renderElement(tripEventsElement, this._tripSort, RenderPosition.BEFOREEND);
    renderElement(tripEventsElement, this._tripList, RenderPosition.BEFOREEND);

    const dayList = tripEventsElement.querySelector(`.trip-days`);

    if (!events.length) {
      remove(this._tripSort);
      renderElement(dayList, this._noEvents, RenderPosition.BEFOREEND);

      return;
    }

    renderEventsList(dayList, events, dates);


    this._tripSort.setSortTypeChangeHandler((sortType) => {
      const showingEventsCount = EVENTS_AMOUNT;

      const sortedEvents = getSortedEvents(events, sortType, 0, showingEventsCount);

      dayList.innerHTML = ``;

      if (sortType === SORT_TYPE.EVENT) {
        renderEventsList(dayList, events, dates);
      } else {
        renderTripDay(dayList, sortedEvents);
      }

    });
  }

  // render(cards) {
  //   const container = this._container;

  //   if (!cards.length) {
  //     renderElement(container, this._noEvents, RenderPosition.BEFOREEND);
  //     return;
  //   }
  //   renderElement(container, this._tripSort, RenderPosition.AFTERBEGIN);
  //   renderElement(container, this._tripList, RenderPosition.BEFOREEND);
  //   renderTripDays(cards);
  // }
}


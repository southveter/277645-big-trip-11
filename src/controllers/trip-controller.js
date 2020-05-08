import {SORT_OPTIONS, SORT_TYPE, EVENTS_AMOUNT} from '../consts';
import {render, RenderPosition, remove} from '../utils/render';
import TripDay from '@components/trip-day/trip-day';
import NoEvents from '@components/no-events/no-events';
import TripList from '@components/trip-list/trip-list';
import TripSort from '@components/trip-sort/trip-sort';
import PointController from './point-controller';

const getSortedEvents = (events, sortType, from, to) => {
  let sortedEvents = [];
  const showingEvents = events.slice();

  switch (sortType) {
    case SORT_TYPE.TIME:
      sortedEvents = showingEvents.sort((a, b) => (b.end - b.start) - (a.end - a.start));
      break;
    case SORT_TYPE.PRICE:
      sortedEvents = showingEvents.sort((a, b) => b.price - a.price);
      break;
    case SORT_TYPE.EVENT:
      sortedEvents = showingEvents;
      break;
    // default:
    //   sortedEvents.slice(from, to);
    //   break;
  }
  return sortedEvents.slice(from, to);
};

const renderEvents = (container, events, onDataChange, onViewChange) => {
  return events.map((event) => {
    const pointController = new PointController(container, onDataChange, onViewChange);

    pointController.render(event);
    return pointController;
  });
};

const renderTripDay = (container, events, day, index, onDataChange, onViewChange) => {
  const tripDay = new TripDay(day, index + 1);
  const tripDayElement = tripDay.getElement();
  const eventsList = tripDayElement.querySelector(`.trip-events__list`);
  const pointController = renderEvents(eventsList, events, onDataChange, onViewChange);
  render(container, tripDay, RenderPosition.BEFOREEND);
  return pointController;
};

const renderEventsList = (container, events, eventsDates, onDataChange, onViewChange) => {
  let points = [];
  eventsDates.forEach((day, index) => {
    const dayEvents = events.filter((event) => {
      return day === new Date(event.start).toDateString();
    });
    points = points.concat(renderTripDay(container, dayEvents, day, index, onDataChange, onViewChange));
  });

  return points;
};

export default class TripController {
  constructor() {
    this._events = [];
    this._showedPointControllers = [];
    this._showingEventsCount = EVENTS_AMOUNT;
    this._noEvents = new NoEvents();
    this._tripList = new TripList();
    this._tripSort = new TripSort(SORT_OPTIONS);
    this._onDataChange = this._onDataChange.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);

    this._tripSort.setSortTypeChangeHandler(this._onSortTypeChange);
  }

  render(events) {
    this._events = events;
    this._dates = [...new Set(events.map((item) => new Date(item.start).toDateString()))].sort((a, b) => {
      return new Date(a).getDate() - new Date(b).getDate();
    });

    const tripEventsElement = document.querySelector(`.trip-events`);
    render(tripEventsElement, this._tripSort, RenderPosition.BEFOREEND);
    render(tripEventsElement, this._tripList, RenderPosition.BEFOREEND);

    const dayList = tripEventsElement.querySelector(`.trip-days`);

    if (!this._events.length) {
      remove(this._tripSort);
      render(dayList, this._noEvents, RenderPosition.BEFOREEND);

      return;
    }

    const newPoints = renderEventsList(dayList, events, this._dates, this._onDataChange, this._onViewChange);
    this._showedPointControllers = this._showedPointControllers.concat(newPoints);
  }


  _onDataChange(pointController, oldData, newData) {
    const index = this._events.findIndex((item) => item === oldData);

    if (index === -1) {
      return;
    }

    this._events = [].concat(this._events.slice(0, index), newData, this._events.slice(index + 1));

    pointController.render(this._events[index]);
  }

  _onViewChange() {
    this._showedPointControllers.forEach((item) => item.setDefaultView());
  }

  _onSortTypeChange(sortType) {
    this._showingEventsCount = EVENTS_AMOUNT;
    const tripEventsElement = document.querySelector(`.trip-events`);
    const dayList = tripEventsElement.querySelector(`.trip-days`);

    const sortedEvents = getSortedEvents(this._events, sortType, 0, this._showingEventsCount);

    dayList.innerHTML = ``;

    if (sortType === SORT_TYPE.EVENT) {
      const newPoints = renderEventsList(dayList, this._events, this._dates, this._onDataChange, this._onViewChange);
      this._showedPointControllers = newPoints;
    } else {
      const newPoints = renderTripDay(dayList, sortedEvents);
      this._showedPointControllers = newPoints;
    }
  }
}


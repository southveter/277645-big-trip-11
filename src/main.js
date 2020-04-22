import Controls from "./components/control.js";
import Cost from "./components/cost.js";
import Filters from "./components/filter.js";
import Form from "./components/form.js";
import Sort from "./components/sort.js";
import Trip from "./components/trip.js";
import DaysList from "./components/point_day_all.js";
import {render, RenderPosition} from "./utils.js";
import Point from "./components/point.js";
import PointList from "./components/point_list.js";
import Day from "./components/point_day.js";
import {
  menuValues,
  getEventsData,
  tripDaysDates,
  getCities,
  getDatesStart,
  getDatesEnd,
  OPTIONS,
  filterNames,
  getUniqDates,
} from "./consts.js";

const MAX_ITEMS = 1;
const EVENT_COUNT = 5;

// const render = (container, template, place = `beforeend`) => {
//   container.insertAdjacentHTML(place, template);
// };

const siteMainElement = document.querySelector(`.page-body`);
const siteTripElement = siteMainElement.querySelector(`.trip-main`);
render(siteTripElement, new Trip(getCities(), getDatesStart(), getDatesEnd()).getElement(), RenderPosition.AFTERBEGIN);
// render(siteTripElement, createTripTemplate(getCities(), getDatesStart(), getDatesEnd()), `afterbegin`);

const siteCostElement = siteMainElement.querySelector(`.trip-main__trip-info`);
render(siteCostElement, new Cost().getElement(), RenderPosition.BEFOREEND);

const siteControlsElement = siteMainElement.querySelector(`.trip-main__trip-controls`);
render(siteControlsElement, new Controls(menuValues).getElement(), RenderPosition.BEFOREEND);
render(siteControlsElement, new Filters(filterNames).getElement(), RenderPosition.BEFOREEND);

const siteEventsElement = siteMainElement.querySelector(`.trip-events`);
render(siteEventsElement, new Sort().getElement(), RenderPosition.BEFOREEND);

const eventsData = getEventsData(EVENT_COUNT);
const uniqDates = getUniqDates(eventsData);

const renderDaysList = () => {
  const daysList = new DaysList();
  siteEventsElement.append(daysList.getElement());

  uniqDates.map((date, index) => {
    return renderDay(date, index, daysList.getElement());
  });
};

const renderDay = (date, index, container) => {
  const eventsInDayData = getDayEvents(date);

  const day = new Day(eventsInDayData[0].start, index);
  container.append(day.getElement());

  const eventsList = renderPointList(day.getElement());
  eventsInDayData.map((eventData) => {
    renderPoint(eventData, eventsList.getElement());
  });
};

const renderPointList = (container) => {
  const eventsList = new PointList();
  container.append(eventsList.getElement());
  return eventsList;
};

const getDayEvents = (date) => {
  const dayEvents = eventsData.filter((event) => {
    return event.date === date;
  });
  return dayEvents;
};

const renderPoint = (eventData, container) => {
  const event = new Point(eventData);
  const eventEdit = new Form(getEventsData(MAX_ITEMS), OPTIONS);
  container.append(event.getElement());

  const onEscKeydown = (evt) => {
    if (evt.key === `Esc` || evt.key === `Escape`) {
      container.replaceChild(event.getElement(), eventEdit.getElement());
    }
  };

  event.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, () => {
    container.replaceChild(eventEdit.getElement(), event.getElement());
    document.addEventListener(`keydown`, onEscKeydown);
  });

  event.getElement().querySelector(`.event__rollup-btn`).addEventListener(`submit`, () => {
  });
};

// render(siteEventsElement, new Form(getEventsData(MAX_ITEMS), OPTIONS).getElement(), RenderPosition.BEFOREEND);
render(siteEventsElement, new DaysList(eventsData, tripDaysDates).getElement(), RenderPosition.BEFOREEND);
renderDaysList();


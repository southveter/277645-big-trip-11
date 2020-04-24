import EditEvent from "./components/edit-event.js";
import TripRoute from "./components/trip-route.js";
import TripCost from "./components/trip-cost.js";
import TripEvent from "./components/trip-event.js";
import TripFilter from "./components/trip-filter.js";
import TripInfo from "./components/trip-info.js";
import TripControls from "./components/trip-controls.js";
import TripSort from "./components/trip-sort.js";
import TripList from "./components/trip-list.js";
import TripDay from "./components/trip-day.js";
import {
  renderElement,
  RenderPosition,
  cardsList,
  datesList,
  citiesList
} from "./utils.js";
import {
  CONTROL_NAMES,
  FILTER_NAMES,
  SORT_OPTIONS,
} from "./consts.js";

const tripMain = document.querySelector(`.trip-main`);
renderElement(tripMain, new TripInfo().getElement(), RenderPosition.AFTERBEGIN);


const tripInfoRoute = tripMain.querySelector(`.trip-main__trip-info`);
renderElement(tripInfoRoute, new TripRoute(citiesList, datesList).getElement(), RenderPosition.BEFOREEND);
renderElement(tripInfoRoute, new TripCost(cardsList).getElement(), RenderPosition.BEFOREEND);

const tripControls = tripMain.querySelector(`.trip-main__trip-controls`);
renderElement(tripControls, new TripControls(CONTROL_NAMES).getElement(), RenderPosition.AFTERBEGIN);
renderElement(tripControls, new TripFilter(FILTER_NAMES).getElement(), RenderPosition.BEFOREEND);

const tripEvents = document.querySelector(`.trip-events`);
renderElement(tripEvents, new TripSort(SORT_OPTIONS).getElement(), RenderPosition.BEFOREEND);
renderElement(tripEvents, new TripList().getElement(), RenderPosition.BEFOREEND);

const renderTripDays = () => {
  const tripDaysList = document.querySelector(`.trip-days`);

  datesList.forEach((date, dateIndex) => {
    const day = new TripDay(date, dateIndex + 1).getElement();

    cardsList
    .filter((card) => new Date(card.start).toDateString() === date)
      .forEach((card) => {
        const newEvent = new TripEvent(card).getElement();
        const eventList = day.querySelector(`.trip-events__list`);

        renderElement(eventList, newEvent, RenderPosition.BEFOREEND);

        const editButton = newEvent.querySelector(`.event__rollup-btn`);
        const editEventItem = new EditEvent(card).getElement();
        const closeButton = editEventItem.querySelector(`.event__rollup-btn`);

        const onEditButtonClick = () => {
          eventList.replaceChild(editEventItem, newEvent);
        };

        const onCloseEditButtonClick = () => {
          eventList.replaceChild(newEvent, editEventItem);
        };

        editButton.addEventListener(`click`, onEditButtonClick);
        closeButton.addEventListener(`click`, onCloseEditButtonClick);
      });

    renderElement(tripDaysList, day, RenderPosition.BEFOREEND);
  });
};
renderTripDays();


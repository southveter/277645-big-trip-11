import {createControlsTemplate} from "./components/control.js";
import {createCostTemplate} from "./components/cost.js";
import {createFiltersTemplate} from "./components/filter.js";
import {createFormTemplate} from "./components/form.js";
import {createSortTemplate} from "./components/sort.js";
import {createTripTemplate} from "./components/trip.js";
import {generateFilters} from "./mock/filter.js";
import {getDaysListTemplate} from "./components/point_day_all.js";
import {
  menuValues,
  eventsData,
  getEventsData,
  tripDaysDates,
  getCities,
  getDatesStart,
  getDatesEnd,
  OPTIONS,
} from "./const.js";

const MAX_ITEMS = 1;

const filters = generateFilters();

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const siteMainElement = document.querySelector(`.page-body`);
const siteTripElement = siteMainElement.querySelector(`.trip-main`);
render(siteTripElement, createTripTemplate(getCities(), getDatesStart(), getDatesEnd()), `afterbegin`);

const siteCostElement = siteMainElement.querySelector(`.trip-main__trip-info`);
render(siteCostElement, createCostTemplate());

const siteControlsElement = siteMainElement.querySelector(`.trip-main__trip-controls`);
render(siteControlsElement, createControlsTemplate(menuValues));
render(siteControlsElement, createFiltersTemplate(filters));

const siteEventsElement = siteMainElement.querySelector(`.trip-events`);
render(siteEventsElement, createSortTemplate());
render(siteEventsElement, createFormTemplate(getEventsData(MAX_ITEMS), OPTIONS));

render(siteEventsElement, getDaysListTemplate(eventsData, tripDaysDates));


// for (let i = 1; i <= MAX_ITEMS; i++) {
//   render(siteEventsElement, createTripPointTemplate());
// }

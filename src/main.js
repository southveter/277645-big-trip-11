import {createSiteTripTemplate} from "./components/trip.js";
import {createSiteControlsTemplate} from "./components/control.js";
import {createSiteFiltersTemplate} from "./components/filter.js";
import {createSiteSortTemplate} from "./components/sort.js";
import {createTripEventItem} from "./components/item.js";
import {createMokiTripDays} from "./components/day.js";

const MAX_ITEMS = 3;

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const siteMainElement = document.querySelector(`.page-body`);
const siteTripElement = siteMainElement.querySelector(`.trip-main`);
const siteControlsElement = siteMainElement.querySelector(`.trip-main__trip-controls`);
const siteEventsElement = siteMainElement.querySelector(`.trip-events`);

render(siteTripElement, createSiteTripTemplate(), `afterbegin`);
render(siteControlsElement, createSiteControlsTemplate());
render(siteControlsElement, createSiteFiltersTemplate());
render(siteEventsElement, createSiteSortTemplate());
render(siteEventsElement, createMokiTripDays());

const tripEventsListElem = document.querySelector(`.trip-events__list`);


for (let i = 1; i <= MAX_ITEMS; i++) {
  render(tripEventsListElem, createTripEventItem());
}

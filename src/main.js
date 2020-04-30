import TripRoute from '@Components/trip-route/trip-route';
import TripCost from '@Components/trip-cost/trip-cost';
import TripFilter from '@Components/trip-filter/trip-filter';
import TripInfo from '@Components/trip-info/trip-info';
import TripControls from '@Components/trip-controls/trip-controls';
import TripController from './trip-controller/trip-controller';
import {
  renderElement,
  RenderPosition,
} from './utils/render';
import {
  cardsList,
  datesList,
  citiesList,
} from './utils/common';
import {
  CONTROL_NAMES,
  FILTER_NAMES,
} from './consts';

const tripMain = document.querySelector(`.trip-main`);
renderElement(tripMain, new TripInfo(), RenderPosition.AFTERBEGIN);

const tripInfoRoute = tripMain.querySelector(`.trip-main__trip-info`);
renderElement(tripInfoRoute, new TripRoute(citiesList, datesList), RenderPosition.BEFOREEND);
renderElement(tripInfoRoute, new TripCost(cardsList), RenderPosition.BEFOREEND);

const tripControls = tripMain.querySelector(`.trip-main__trip-controls`);
renderElement(tripControls, new TripControls(CONTROL_NAMES), RenderPosition.AFTERBEGIN);
renderElement(tripControls, new TripFilter(FILTER_NAMES), RenderPosition.BEFOREEND);

const tripEvents = document.querySelector(`.trip-events`);
const tripController = new TripController(tripEvents);
tripController.render(cardsList);

import TripRoute from '@components/trip-route/trip-route';
import TripCost from '@components/trip-cost/trip-cost';
import TripFilter from '@components/trip-filter/trip-filter';
import TripInfo from '@components/trip-info/trip-info';
import TripControls from '@components/trip-controls/trip-controls';
import TripController from './controllers/trip-controller';
import {
  render,
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
render(tripMain, new TripInfo(), RenderPosition.AFTERBEGIN);

const tripInfoRoute = tripMain.querySelector(`.trip-main__trip-info`);
render(tripInfoRoute, new TripRoute(citiesList, datesList), RenderPosition.BEFOREEND);
render(tripInfoRoute, new TripCost(cardsList), RenderPosition.BEFOREEND);

const tripControls = tripMain.querySelector(`.trip-main__trip-controls`);
render(tripControls, new TripControls(CONTROL_NAMES), RenderPosition.AFTERBEGIN);
render(tripControls, new TripFilter(FILTER_NAMES), RenderPosition.BEFOREEND);

const tripEvents = document.querySelector(`.trip-events`);
const tripController = new TripController(tripEvents);
tripController.render(cardsList);

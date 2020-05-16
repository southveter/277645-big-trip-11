import TripRoute from '@components/trip-route/trip-route';
import TripCost from '@components/trip-cost/trip-cost';
import TripInfo from '@components/trip-info/trip-info';
import TripControls from '@components/trip-controls/trip-controls';
import TripController from './controllers/trip-controller';
import FilterController from './controllers/filter-controller';
import Points from './models/points';
import Statistics from '@components/statistics';
import {
  render,
  RenderPosition,
} from './utils/render';
import {
  cardsList,
  datesList,
  citiesList,
} from './utils/common';
import {CONTROL_NAMES, TablItem} from './consts';

const tripMain = document.querySelector(`.trip-main`);
render(tripMain, new TripInfo(), RenderPosition.AFTERBEGIN);

const tripInfoRoute = tripMain.querySelector(`.trip-main__trip-info`);
render(tripInfoRoute, new TripRoute(citiesList, datesList), RenderPosition.BEFOREEND);
render(tripInfoRoute, new TripCost(cardsList), RenderPosition.BEFOREEND);

const tripControls = tripMain.querySelector(`.trip-main__trip-controls`);
const tripControlsComponent = new TripControls(CONTROL_NAMES);
render(tripControls, tripControlsComponent, RenderPosition.AFTERBEGIN);


const pointsModel = new Points();
pointsModel.setEvents(cardsList);

const filterController = new FilterController(tripControls, pointsModel);
filterController.render();

const tripEvents = document.querySelector(`.trip-events`);
const tripController = new TripController(tripEvents, pointsModel);
tripController.render(cardsList);

document.querySelector(`.trip-main__event-add-btn`).addEventListener(`click`, () => {
  tripController.createPoint();
});

const siteMainElement = document.querySelector(`.page-main .page-body__container`);
const statisticsComponent = new Statistics(pointsModel);
render(siteMainElement, statisticsComponent, RenderPosition.BEFOREEND);
statisticsComponent.hide();

tripControlsComponent.setOnChange((item) => {
  switch (item) {
    case TablItem.TABLE:
      tripControlsComponent.setActiveItem(TablItem.TABLE);
      tripController._sortComponent.show();
      tripController.show();
      statisticsComponent.hide();
      break;
    case TablItem.STATS:
      tripControlsComponent.setActiveItem(TablItem.STATS);
      tripController._sortComponent.hide();
      tripController.hide();
      statisticsComponent.show();
      break;
  }
});

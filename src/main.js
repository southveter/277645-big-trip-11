import TripControls from '@components/trip-controls/trip-controls';
import TripController from './controllers/trip-controller';
import TripInfoController from './controllers/trip-info-controller';
import FilterController from './controllers/filter-controller';
import Points from './models/points';
import Statistics from '@components/statistics';
import API from './api.js';
import {render, RenderPosition} from './utils/render';
import {getEventsByFilter} from './utils/common';
import {CONTROL_NAMES, TablItem, FILTER_TYPE} from './consts';

const disabledStyle = `pointer-events: none; cursor: default;`;


const AUTHORIZATION = `Basic dbhfvksdbvkd`;
const END_POINT = `https://11.ecmascript.pages.academy/big-trip`;

const tripMain = document.querySelector(`.trip-main`);
const tripControls = tripMain.querySelector(`.trip-main__trip-controls`);
const tripEvents = document.querySelector(`.trip-events`);
const siteMainElement = document.querySelector(`.page-main .page-body__container`);


const tripControlsComponent = new TripControls(CONTROL_NAMES);

const api = new API(END_POINT, AUTHORIZATION);
const pointsModel = new Points();
const filterController = new FilterController(tripControls, pointsModel);


const tripController = new TripController(tripEvents, filterController, pointsModel, api);


render(tripControls, tripControlsComponent, RenderPosition.AFTERBEGIN);
filterController.render();


const tripInfoController = new TripInfoController(tripMain, pointsModel);
tripInfoController.render();


document.querySelector(`.trip-main__event-add-btn`).addEventListener(`click`, () => {
  tripController.createPoint();
});


const statisticsComponent = new Statistics(pointsModel);
render(siteMainElement, statisticsComponent, RenderPosition.BEFOREEND);
statisticsComponent.hide();

Promise.all([
  api.getPoints(),
  api.getDestinations(),
  api.getOffers()
]).then((res) => {
  pointsModel. setPoints(res[0]);
  Object.values(FILTER_TYPE).map((filter, isDisabled) => {
    const filteredPoints = getEventsByFilter(pointsModel.getPointsAll(), filter.toLowerCase());
    if (filteredPoints.length === 0) {
      return filterController.disableEmptyFilter(filter.toLowerCase(), isDisabled, disabledStyle);
    }
    return filterController.render();
  });
  tripController.render();
});

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

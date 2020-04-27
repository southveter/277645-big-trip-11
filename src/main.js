import EditEvent from '@Components/edit-event/edit-event';
import TripRoute from '@Components/trip-route/trip-route';
import TripCost from '@Components/trip-cost/trip-cost';
import TripEvent from '@Components/trip-event/trip-event';
import TripFilter from '@Components/trip-filter/trip-filter';
import TripInfo from '@Components/trip-info/trip-info';
import TripControls from '@Components/trip-controls/trip-controls';
import TripSort from '@Components/trip-sort/trip-sort';
import TripList from '@Components/trip-list/trip-list';
import TripDay from '@Components/trip-day/trip-day';
import NoEvents from '@Components/no-events/no-events';
import {
  renderElement,
  RenderPosition,
  cardsList,
  datesList,
  citiesList
} from './utils';
import {
  CONTROL_NAMES,
  FILTER_NAMES,
  SORT_OPTIONS,
} from './consts';

const tripMain = document.querySelector(`.trip-main`);
renderElement(tripMain, new TripInfo().getElement(), RenderPosition.AFTERBEGIN);

const tripEvents = document.querySelector(`.trip-events`);
if (cardsList.length === 0) {
  renderElement(tripEvents, new NoEvents().getElement(), RenderPosition.AFTERBEGIN);
} else {
  renderElement(tripEvents, new TripSort(SORT_OPTIONS).getElement(), RenderPosition.BEFOREEND);
  renderElement(tripEvents, new TripList().getElement(), RenderPosition.BEFOREEND);
}

const tripInfoRoute = tripMain.querySelector(`.trip-main__trip-info`);
renderElement(tripInfoRoute, new TripRoute(citiesList, datesList).getElement(), RenderPosition.BEFOREEND);
renderElement(tripInfoRoute, new TripCost(cardsList).getElement(), RenderPosition.BEFOREEND);

const tripControls = tripMain.querySelector(`.trip-main__trip-controls`);
renderElement(tripControls, new TripControls(CONTROL_NAMES).getElement(), RenderPosition.AFTERBEGIN);
renderElement(tripControls, new TripFilter(FILTER_NAMES).getElement(), RenderPosition.BEFOREEND);

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


        const editEventItem = new EditEvent(card).getElement();


        const changeEventToEdit = () => {
          eventList.replaceChild(editEventItem, newEvent);
        };

        const changeEditToEvent = () => {
          eventList.replaceChild(newEvent, editEventItem);
        };

        const onEscKeyDown = (evt) => {
          const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

          if (isEscKey) {
            changeEditToEvent();
            document.removeEventListener(`keydown`, onEscKeyDown);
          }
        };

        const openEditEventButton = newEvent.querySelector(`.event__rollup-btn`);
        openEditEventButton.addEventListener(`click`, (evt) => {
          evt.preventDefault();
          changeEventToEdit();
          document.addEventListener(`keydown`, onEscKeyDown);
        });

        const closeEditEventButton = editEventItem.querySelector(`.event__rollup-btn`);
        closeEditEventButton.addEventListener(`click`, (evt) => {
          evt.preventDefault();
          changeEditToEvent();
          document.removeEventListener(`keydown`, onEscKeyDown);
        });


        editEventItem.addEventListener(`submit`, (evt) => {
          evt.preventDefault();
          changeEditToEvent();
          document.removeEventListener(`keydown`, onEscKeyDown);
        });
      });

    renderElement(tripDaysList, day, RenderPosition.BEFOREEND);
  });
};

renderTripDays();


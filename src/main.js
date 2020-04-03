'use strict';
const MAX_ITEMS = 3;

const createSiteTripTemplate = () => {
  return (
    `<section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">Amsterdam &mdash; Chamonix &mdash; Geneva</h1>

      <p class="trip-info__dates">Mar 18&nbsp;&mdash;&nbsp;20</p>
    </div>

    <p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">1230</span>
    </p>
  </section>`
  );
};

const createSiteControlsTemplate = () => {
  return (
    `<nav class="trip-controls__trip-tabs  trip-tabs">
    <a class="trip-tabs__btn" href="#">Table</a>
    <a class="trip-tabs__btn  trip-tabs__btn--active" href="#">Stats</a>
  </nav>`
  );
};

const createSiteFiltersTemplate = () => {
  return (
    `<form class="trip-filters" action="#" method="get">
    <div class="trip-filters__filter">
      <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="everything" checked>
      <label class="trip-filters__filter-label" for="filter-everything">Everything</label>
    </div>

    <div class="trip-filters__filter">
      <input id="filter-future" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="future">
      <label class="trip-filters__filter-label" for="filter-future">Future</label>
    </div>

    <div class="trip-filters__filter">
      <input id="filter-past" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="past">
      <label class="trip-filters__filter-label" for="filter-past">Past</label>
    </div>

    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>`
  );
};

const createSiteSortTemplate = () => {
  return (
    `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    <span class="trip-sort__item  trip-sort__item--day">Day</span>

    <div class="trip-sort__item  trip-sort__item--event">
      <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event" checked>
      <label class="trip-sort__btn" for="sort-event">Event</label>
    </div>

    <div class="trip-sort__item  trip-sort__item--time">
      <input id="sort-time" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-time">
      <label class="trip-sort__btn" for="sort-time">
        Time
        <svg class="trip-sort__direction-icon" width="8" height="10" viewBox="0 0 8 10">
          <path d="M2.888 4.852V9.694H5.588V4.852L7.91 5.068L4.238 0.00999987L0.548 5.068L2.888 4.852Z"/>
        </svg>
      </label>
    </div>

    <div class="trip-sort__item  trip-sort__item--price">
      <input id="sort-price" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-price">
      <label class="trip-sort__btn" for="sort-price">
        Price
        <svg class="trip-sort__direction-icon" width="8" height="10" viewBox="0 0 8 10">
          <path d="M2.888 4.852V9.694H5.588V4.852L7.91 5.068L4.238 0.00999987L0.548 5.068L2.888 4.852Z"/>
        </svg>
      </label>
    </div>

    <span class="trip-sort__item  trip-sort__item--offers">Offers</span>
  </form>`
  );
};

const createTripEventItem = () => {
  return (
    `<li class="trip-events__item">
      <div class="event">
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="../markup/img/icons/drive.png" alt="Event type icon">
        </div>
        <h3 class="event__title">Drive to Chamonix</h3>

        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="2019-03-18T14:30">14:30</ time>
            &mdash;
            <time class="event__end-time" datetime="2019-03-18T16:05">16:05</time>
          </p>
          <p class="event__duration">1H 35M</p>
        </div>

        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">160</span>
        </p>

        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          <li class="event__offer">
            <span class="event__offer-title">Rent a car</span>
            &plus;
            &euro;&nbsp;<span class="event__offer-price">200</span>
           </li>
        </ul>

        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
  );
};

const createMokiTripDays = () => {
  return (
    `<ul class="trip-days">
      <li class="trip-days__item  day">
        <div class="day__info"></div>
        <ul class="trip-events__list">
        </ul>
      </li>
    </ul>`
  );
};

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





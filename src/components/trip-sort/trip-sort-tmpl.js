import {SORT_TYPE} from '../../consts';

export const createTripSortTemplate = (sortType) => {
  return (
    `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    <span class="trip-sort__item  trip-sort__item--day">${sortType === SORT_TYPE.EVENT ? `DAY` : ``}</span>
    <div class="trip-sort__item  trip-sort__item--event">
      <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event" ${sortType === SORT_TYPE.EVENT ? `checked` : ``}>
      <label data-sort-type="${SORT_TYPE.EVENT}"  class="trip-sort__btn" for="sort-event">Event</label>
    </div>
    <div class="trip-sort__item  trip-sort__item--time">
      <input id="sort-time" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-time" ${sortType === SORT_TYPE.TIME ? `checked` : ``}>
      <label data-sort-type="${SORT_TYPE.TIME}" class="trip-sort__btn  trip-sort__btn--active  trip-sort__btn--by-increase" for="sort-time">
        Time
      </label>
    </div>
    <div class="trip-sort__item  trip-sort__item--price">
      <input id="sort-price" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-price" ${sortType === SORT_TYPE.PRICE ? `checked` : ``}>
      <label data-sort-type="${SORT_TYPE.PRICE}" class="trip-sort__btn" for="sort-price">
        Price
      </label>
    </div>
    <span class="trip-sort__item  trip-sort__item--offers">Offers</span>
  </form>`
  );
};

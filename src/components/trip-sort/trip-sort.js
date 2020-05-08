import Abstract from '@components/abstract';
import {createTripSortTemplate} from '@components/trip-sort/trip-sort-tmpl';
import {SORT_TYPE} from '../../consts';

export default class TripSort extends Abstract {
  constructor() {
    super();
    this._currentSortType = SORT_TYPE.EVENT;
  }

  getTemplate() {
    return createTripSortTemplate(this._currentSortType);
  }

  getSortType() {
    return this._currentSortType;
  }

  setSortTypeChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();

      if (evt.target.tagName !== `LABEL`) {
        return;
      }

      const sortType = evt.target.dataset.sortType;

      if (this._currentSortType === sortType) {
        return;
      }

      this._currentSortType = sortType;
      handler(this._currentSortType);
    });
  }
}

import AbstractSmart from '@components/abstract-smart';
import {createTripSortTemplate} from '@components/trip-sort/trip-sort-tmpl';
import {SORT_TYPE} from '../../consts';

export default class TripSort extends AbstractSmart {
  constructor() {
    super();
    this._handler = null;
    this._currentSortType = SORT_TYPE.EVENT;
  }

  getTemplate() {
    return createTripSortTemplate(this._currentSortType);
  }

  getSortType() {
  }

  recoveryListeners() {
    this.setSortTypeChangeHandler(this._handler);
  }

  setSortTypeChangeHandler(handler) {
    this._handler = handler;
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
      this.rerender();
    });
  }
}

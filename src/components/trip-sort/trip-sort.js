import Abstract from '@Components/abstract';
import {createTripSortTemplate} from '@Components/trip-sort/trip-sort-tmpl';
import {SORT_TYPE} from '../../consts';

export default class TripSort extends Abstract {
  constructor() {
    super();
    this._currenSortType = SORT_TYPE.EVENT;
  }

  getTemplate() {
    return createTripSortTemplate(this._currentSortType);
  }

  getSortType() {
    return this._currenSortType;
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
      this.refreshElement();
      handler(this._currentSortType);
    });
  }

  refreshElement() {
    this._element.innerHTML = ``;
    this._element.innerHTML = this.getTemplate();
  }
}

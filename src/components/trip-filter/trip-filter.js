import Abstract from '@components/abstract';
import {createTripFilterTemplate} from '@components/trip-filter/trip-filter-tmpl';

const FILTER_ID_DASH = `filter-`;

const getFilterNameById = (id) => {
  return id.substring(FILTER_ID_DASH.length);
};


export default class TripFilter extends Abstract {
  constructor(names) {
    super();
    this._names = names;
  }

  getTemplate() {
    return createTripFilterTemplate(this._names);
  }

  switchFilterAvailability(filter, isDisabled, style) {
    const item = this.getElement().querySelector(`#filter-${filter}`);

    if (item) {
      item.disabled = isDisabled;
      this.getElement().querySelector(`#${filter}`).style = style;
    }
  }

  setFilterChangeHandler(handler) {
    this.getElement().addEventListener(`change`, (evt) => {
      const filterName = getFilterNameById(evt.target.id);
      handler(filterName);
    });
  }
}

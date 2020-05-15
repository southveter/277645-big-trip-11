import Abstract from '@components/abstract';
import {createTripControlsTemplate} from '@components/trip-controls/trip-controls-tmpl';

export const TablItem = {
  TABLE: `control-table`,
  STATS: `control-stats`,
};

const ACTIVE_CLASS = `trip-tabs__btn--active`;

export default class TripControls extends Abstract {

  getTemplate() {
    return createTripControlsTemplate();
  }

  setActiveItem(selectedItem) {
    this.getElement().querySelectorAll(`.trip-tabs__btn`)
      .forEach((it) => {
        if (it.id === selectedItem) {
          it.classList.add(ACTIVE_CLASS);
        } else {
          it.classList.remove(ACTIVE_CLASS);
        }
      });
  }

  setOnChange(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      if (evt.target.tagName !== `A`) {
        return;
      }
      evt.preventDefault();
      const menuItem = evt.target.id;

      handler(menuItem);
    });
  }
}

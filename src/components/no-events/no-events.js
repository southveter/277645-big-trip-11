import Abstract from '@Components/abstract/abstract';
import {createNoEventsTemplate} from '@Components/no-events/no-events-tmpl';

export default class NoEvents extends Abstract {
  getTemplate() {
    return createNoEventsTemplate();
  }
}

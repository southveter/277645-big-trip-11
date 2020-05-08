import Abstract from '@components/abstract';
import {createNoEventsTemplate} from '@components/no-events/no-events-tmpl';

export default class NoEvents extends Abstract {
  getTemplate() {
    return createNoEventsTemplate();
  }
}

import {getDurationTime} from '../../utils/common';
import moment from 'moment';

const getServices = (services) => {
  return services.map((service) => {
    return (`
        <li class="event__offer">
          <span class="event__offer-title">${service.title}</span>
          &plus;
          &euro;&nbsp;<span class="event__offer-price">${service.price}</span>
        </li>
        `);
  }).join(``);
};

export const createTripEventTemplate = (cardData) => {

  const {type, price, city, start, end, services} = cardData;
  const startDate = moment(start).format(`YYYY-MM-DDThh:mm:ss`);
  const endDate = moment(end).format(`YYYY-MM-DDThh:mm:ss`);
  const startTime = moment(start).format(`HH:mm`);
  const endTime = moment(end).format(`HH:mm`);
  const durationTime = getDurationTime(end - start);
  const servicesList = getServices(services);

  return (
    `<li class="trip-events__item">
      <div class="event">
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type.slice(0, -3)}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${type} ${city}</h3>
        <div class="event__schedule">
          <p class="event__time">
          <time class="event__start-time" datetime="${startDate}">${startTime}</time>
          &mdash;
          <time class="event__end-time" datetime="${endDate}">${endTime}</time>
          </p>
          <p class="event__duration">${durationTime}</p>
        </div>
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${price}</span>
        </p>
        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
        ${servicesList}
        </ul>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
  );
};

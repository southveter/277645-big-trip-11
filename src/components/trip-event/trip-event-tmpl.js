import {formatDate, formatTime, millisecondsToHm} from '../../utils/common';

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
  const startDate = formatDate(new Date(start), true);
  const endDate = formatDate(new Date(end), true);
  const startTime = formatTime(new Date(start).getHours(), new Date(start).getMinutes());
  const endTime = formatTime(new Date(end).getHours(), new Date(end).getMinutes());
  const durationTime = millisecondsToHm(end - start);
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
          <time class="event__start-time" datetime="${startDate}T${startTime}">${startTime}</time>
          &mdash;
          <time class="event__end-time" datetime="${endDate}T${endTime}">${endTime}</time>
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

import {CITIES, TRAVEL_TRANSPORT, TRAVEL_ACTIVITY, Placeholder} from '../../consts';
import {EmptyEvent, getUpperCaseFirstLetter} from '../../utils/common';
import moment from 'moment';

const createEventsChooserMurkup = (choosers) => {
  return choosers.map((typeTransport) => {
    return (`<div class="event__type-item">
      <input id="event-type-${typeTransport}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${typeTransport}"
      >
      <label class="event__type-label  event__type-label--${typeTransport}" for="event-type-${typeTransport}-1">${getUpperCaseFirstLetter(typeTransport)}</label>
    </div>`);
  }).join(`\n`);
};

const getServices = (services) => {
  return services.map((service) => {
    return (`
      <div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-${service.title}" type="checkbox" name="event-${service.title}"  ${service.isChecked ? `checked` : ``}>
      <label class="event__offer-label" for="event-${service.title}">
        <span class="event__offer-title">${service.title}</span>
        &plus;
        &euro;&nbsp;<span class="event__offer-price">${service.price}</span>
        </label>
      </div>
    `);
  }).join(``);
};

const getPhotosList = (photos) => {
  return photos.map((photo) => {
    return (`<img class="event__photo" src="${photo}" alt="Event photo">`);
  }).join(``);
};

const getCities = (cities, elem) => {
  return cities.map((cityName) => {
    return (`<option value=${cityName} ${cityName === elem ? `selected` : ``}>${cityName}</option>`);
  }).join(``);
};

export const createEditEventTemplate = (cardData, options) => {
  let creatingPoint = false;

  if (cardData === EmptyEvent) {
    creatingPoint = true;
  }

  const {start, end, price, isFavorite, index} = cardData;
  const {type, city, description, photos, services} = options;
  const startDate = moment(start).format(`DD/MM/YY HH:mm`);
  const endDate = moment(end).format(`DD/MM/YY HH:mm`);
  const servicesList = getServices(services);
  const photosList = getPhotosList(photos);
  const citiesList = getCities(CITIES, city);
  const isFavourite = isFavorite ? `checked` : ``;

  return (
    `<form class="event  event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Transfer</legend>
              ${createEventsChooserMurkup(TRAVEL_TRANSPORT)}
            </fieldset>
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Activity</legend>
              ${createEventsChooserMurkup(TRAVEL_ACTIVITY)}
            </fieldset>
          </div>
        </div>
        <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-1">
              ${getUpperCaseFirstLetter(type)} ${TRAVEL_TRANSPORT.includes(type) ? Placeholder.TRANSPORT : Placeholder.ACTION}
            </label>
          <select class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${city}" list="destination-list-1">
          <datalist id="destination-list-1">
          ${citiesList}
          </datalist>
          </select>
        </div>
        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">
            From
          </label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${startDate}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">
            To
          </label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${endDate}">
        </div>
        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-${index}">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-${index}" type="text" name="event-price" maxlength="5" value="${price}">
        </div>
        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">${creatingPoint ? `Cancel` : `Delete`}</button>
        <input id="event-favorite-${index}" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" ${isFavourite}>
        <label class="event__favorite-btn" ${creatingPoint ? `visually-hidden` : ``}" for="event-favorite-${index}">
          <span class="visually-hidden">Add to favorite</span>
            <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
          </svg>
        </label>
        ${creatingPoint ? `` : `
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>`}
      </header>
      <section class="event__details">
        <section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>
          <div class="event__available-offers">
          ${servicesList}
          </div>
        </section>
        <section class="event__section  event__section--destination">
          <h3 class="event__section-title  event__section-title--destination">Destination</h3>
          <p class="event__destination-description">${description}</p>
          <div class="event__photos-container">
            <div class="event__photos-tape">
            ${photosList}
            </div>
          </div>
        </section>
      </section>
      </form>`
  );
};

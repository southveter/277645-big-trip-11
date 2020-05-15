import {
  EVENTS_AMOUNT,
  NUMBER_WEEK_DAYS,
  NUMBER_HOURS,
  TIME_FORMAT,
  MINUTE_NUMBERS,
  TRAVEL_TRANSPORT,
  TRAVEL_ACTIVITY,
  CITIES,
  SERVICES,
  DESCRIPTIONS,
  FILTER_TYPE
} from '../consts';

import moment from 'moment';

const MINUTES_PER_HOUR = 60;

export const getRandomPhotos = () => {
  const photos = [];

  for (let i = 0; i < getRandomIntegerNumber(1, 5); i++) {
    photos.push(`http://picsum.photos/248/152?r=${Math.random()}`);
  }

  return photos;
};

export const getRandomCities = () => {
  return CITIES[Math.floor(Math.random() * CITIES.length)];
};

export const getRandomDescription = () => {
  return DESCRIPTIONS
    .filter(() => Math.random() > 0.5)
    .slice(0, getRandomIntegerNumber(1, 3))
    .join(` `)
    .trim();
};

export const getRandomServices = () => {
  const currentServices = [];

  for (let i = 0; i < getRandomIntegerNumber(0, 4); i++) {
    currentServices.push(SERVICES[i]);
  }

  return currentServices;
};

const getRandomDate = () => {
  return (
    Date.now() +
    1 +
    Math.floor(Math.random() * NUMBER_WEEK_DAYS) * NUMBER_HOURS * getRandomIntegerNumber(0, MINUTE_NUMBERS) * MINUTE_NUMBERS * TIME_FORMAT
  );
};

const getRouteTypesArray = () => {
  const routeTransportsArray = TRAVEL_TRANSPORT;
  const routeActivitiesArray = TRAVEL_ACTIVITY;
  const routeTypesArray = routeTransportsArray.concat(routeActivitiesArray);

  return routeTypesArray;
};

export const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length);

  return array[randomIndex];
};

export const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(max * Math.random());
};


const generateEvent = () => {
  const startDate = getRandomDate();
  const endDate = getRandomDate();


  return {
    type: getRandomArrayItem(getRouteTypesArray()),
    city: getRandomArrayItem(CITIES),
    photos: getRandomPhotos(),
    description: getRandomDescription(),
    services: getRandomServices(),
    start: Math.min(startDate, endDate),
    end: Math.max(startDate, endDate),
    price: getRandomIntegerNumber(10, 100),
    id: String(new Date() + Math.random()),
  };
};

const generateEvents = (count) => {
  return new Array(count)
    .fill(``)
    .map(() => generateEvent())
    .sort(
        (current, next) => current.start - next.start
    );
};

export const cardsList = generateEvents(EVENTS_AMOUNT);

export const citiesList = [
  ...new Set(cardsList.map((elem) => elem.city))
];

export const datesList = [
  ...new Set(cardsList.map((elem) => new Date(elem.start).toDateString()))
];

export const isEscKey = (evt) => {
  return evt.key === `Escape` || evt.key === `Esc`;
};

export const getDurationDate = (start, end) => {
  return moment.duration(moment(end).diff(moment(start)));
};

export const getDurationTime = (timeInMs) => {
  const days = Math.floor(timeInMs / (1000 * MINUTES_PER_HOUR * MINUTES_PER_HOUR * 24)).toString().padStart(2, `0`);
  const hours = (Math.floor(timeInMs / (1000 * MINUTES_PER_HOUR * MINUTES_PER_HOUR)) % 24).toString().padStart(2, `0`);
  const minutes = (Math.floor(timeInMs / (1000 * MINUTES_PER_HOUR)) % MINUTES_PER_HOUR).toString().padStart(2, `0`);
  const modifiedDays = days > 0 ? `${days}D ` : ``;
  let modifiedHours = `${hours}H `;

  if (days === 0) {
    modifiedHours = hours > 0 ? `${hours}H ` : ``;
  }

  return `${modifiedDays}${modifiedHours}${minutes}M`;
};

export const getFutureEvents = (events) => {
  return events.filter((point) => point.start > Date.now());
};

export const getPastEvents = (events) => {
  return events.filter((point) => point.end < Date.now());
};

export const getEventsByFilter = (events, filterType) => {

  switch (filterType) {
    case FILTER_TYPE.EVERYTHING:
      return events.sort((a, b) => a.start - b.start);
    case FILTER_TYPE.FUTURE:
      return getFutureEvents(events);
    case FILTER_TYPE.PAST:
      return getPastEvents(events);
  }

  return events;
};

export const EmptyEvent = {
  id: String(Math.floor(getRandomDate() + Math.random())),
  type: `Bus to`,
  city: ``,
  photos: [],
  description: ``,
  services: [],
  start: Math.min(getRandomDate(), getRandomDate()),
  end: Math.max(getRandomDate(), getRandomDate()),
  price: 0,
  isFavorite: false,
};

export const clearString = (str) => {
  return str.replace(/[^+\d]/g, ``);
};

export const getUpperCaseFirstLetter = (type) => {
  return (
    type[0].toUpperCase() + type.slice(1, type.length)
  );
};

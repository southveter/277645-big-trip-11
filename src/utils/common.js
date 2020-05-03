import {
  EVENTS_AMOUNT,
  NUMBER_WEEK_DAYS,
  NUMBER_HOURS,
  TIME_FORMAT,
  MINUTE_NUMBERS,
  TYPES,
  CITIES,
  SERVICES,
  DESCRIPTIONS
} from "../consts.js";

const getRandomPhotos = () => {
  const photos = [];

  for (let i = 0; i < getRandomIntegerNumber(1, 5); i++) {
    photos.push(`http://picsum.photos/248/152?r=${Math.random()}`);
  }

  return photos;
};

const getRandomDescription = () => {
  return DESCRIPTIONS
    .filter(() => Math.random() > 0.5)
    .slice(0, getRandomIntegerNumber(1, 3))
    .join(` `)
    .trim();
};

const getRandomServices = () => {
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
  const routeTransportsArray = TYPES[0];
  const routeActivitiesArray = TYPES[1];
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
    price: getRandomIntegerNumber(10, 100)
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

export const datesList = [
  ...new Set(cardsList.map((elem) => new Date(elem.start).toDateString()))
];

export const formatDate = (date, isLong) => {
  const dateYear = date.getFullYear();
  const dateMonth = (`0` + date.getMonth()).slice(-2);
  const dateDay = (`0` + date.getDate()).slice(-2);

  return isLong ? `${dateYear}-${dateMonth}-${dateDay}` : `${dateDay}/${dateMonth}/${dateYear.toString().slice(-2)}`;
};

export const formatTime = (hours, minutes) => {
  return `${hours}:${(`0` + minutes).slice(-2)}`;
};

// export const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

const MINUTES_PER_HOUR = 60;

const millisecondsToHours = (timeInMs) => Math.floor((timeInMs / (1000 * MINUTES_PER_HOUR * MINUTES_PER_HOUR)) % 24);

const millisecondsToMinutes = (timeInMs) => Math.floor((timeInMs / (1000 * MINUTES_PER_HOUR)) % MINUTES_PER_HOUR);

export const millisecondsToHm = (timeInMs) => {
  const hours = millisecondsToHours(timeInMs);
  const minutes = millisecondsToMinutes(timeInMs);

  return `${hours}H ${minutes}M`;
};

export const getDuration = (dif) => {
  const difInHours = Number(millisecondsToHours(dif));
  const difInMinutes = Number(millisecondsToMinutes(dif));

  return difInHours * MINUTES_PER_HOUR + difInMinutes;
};

export const citiesList = [
  ...new Set(cardsList.map((elem) => elem.city))
];

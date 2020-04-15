import {
  getRandomElement,
  getRandomArray,
  getRandomImgUrlArray,
  getRandomInteger,
  getRandomDate,
} from "./utils.js";

const DAYS_COUNT = 5;
const TASK_COUNT = 10;

export const CITIES = [
  `Amsterdam`,
  `Chamonix`,
  `Geneva`,
  `Berlin`,
  `Paris`,
  `Moscow`,
  `Barcelona`,
];

export const TYPES_OF_TRANSFER = [
  `Taxi to`,
  `Bus to`,
  `Train to`,
  `Ship to`,
  `Transport to`,
  `Drive to`,
  `Flight to`,
];

export const TYPES_OF_ACTIVITY = [
  `Check-in in`,
  `Sightseeing in`,
  `Restaurant in`,
];
const TYPES_OF_EVENT = TYPES_OF_TRANSFER.concat(TYPES_OF_ACTIVITY);

const DESCRIPTIONS = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
];

export const OPTIONS = [{
  option: `luggage`,
  title: `Add luggage`,
  price: 30
},
{
  option: `comfort`,
  title: `Switch to comfort class`,
  price: 100
},
{
  option: `meal`,
  title: `Add meal`,
  price: 15
},
{
  option: `seats`,
  title: `Choose seats`,
  price: 5
},
{
  option: `train`,
  title: `Travel by train`,
  price: 40
},
];

export const menuValues = [
  {
    title: `Table`,
    active: true
  },
  {
    title: `Stats`,
    active: false
  },
];

const getEvent = () => {
  const type = getRandomElement(TYPES_OF_EVENT);
  const start = getRandomDate(DAYS_COUNT);
  const residual = getRandomInteger(20, 180) * 60 * 1000;
  const residualInHours = residual / 1000 / 60 / 60;
  const hours = Math.trunc(residualInHours);
  const minutes = Math.trunc((residualInHours - hours) * 60);
  return {
    type,
    city: getRandomElement(CITIES),
    price: getRandomInteger(0, 1000),
    description: new Set(getRandomArray(1, 3, DESCRIPTIONS)),
    start,
    end: start + residual,
    hours,
    minutes,
    offers: new Set(getRandomArray(1, 4, OPTIONS)),
    urls: new Set(getRandomImgUrlArray(0, 5)),
  };

};

export const getEventsData = (count) => {
  const events = new Array(count);
  return events.fill(``).map(getEvent).sort((a, b) => a.start - b.start);
};

export const eventsData = getEventsData(TASK_COUNT);

export const getCities = () => {
  return eventsData.map((event) => event.city);
};

export const getDatesEnd = () => {
  return eventsData.map((event) => new Date(event.end));
};

export const getDatesStart = () => {
  return eventsData.map((event) => new Date(event.start));
};

export const tripDaysDates = new Set(getDatesStart().map((date) => `${date}`.slice(4, 10)));

export const EVENTS_AMOUNT = 15;
export const NUMBER_WEEK_DAYS = 7;
export const NUMBER_HOURS = 24;
export const TIME_FORMAT = 1000;
export const MINUTE_NUMBERS = 60;

export const CONTROL_NAMES = [`Table`, `Stats`];

export const FILTER_NAMES = [
  `everything`,
  `future`,
  `past`
];

export const SORT_OPTIONS = [
  {
    name: `event`,
    isChecked: true
  },
  {
    name: `time`,
    isChecked: false
  },
  {
    name: `price`,
    isChecked: false
  }
];

export const TYPES = [
  [
    `Taxi`,
    `Bus`,
    `Train`,
    `Ship`,
    `Transport`,
    `Drive`,
    `Flight`
  ],
  [
    `Check-in`,
    `Sightseeing`,
    `Restaurant`
  ]
];

export const CITIES = [
  `Amsterdam`,
  `Geneva`,
  `Chamonix`,
  `Berlin`,
  `Moscow`,
];

export const SERVICES = [
  {
    type: `luggage`,
    title: `Add luggage`,
    price: 30
  },
  {
    type: `comfort`,
    title: `Switch to comfort class`,
    price: 100
  },
  {
    type: `meal`,
    title: `Add meal`,
    price: 15
  },
  {
    type: `seats`,
    title: `Choose seats`,
    price: 5
  }
];

export const DESCRIPTIONS = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis.`,
  `Aliquam erat volutpat.`,
  `Nunc fermentum tortor ac porta dapibus.`,
  `In rutrum ac purus sit amet tempus.`
];

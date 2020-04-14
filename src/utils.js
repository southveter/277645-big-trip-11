const TIME_IN_MS = 60 * 60 * 24 * 1000;

export const getRandomDate = (days) => {
  return Date.now() + (getRandomInteger(0, (days * 24))) * TIME_IN_MS / 24;
};

export const getRandomInteger = (min, max) => {
  const rand = min + Math.random() * (max - min);
  return Math.floor(rand);
};

export const getRandomElement = (array) => {
  return array[getRandomInteger(0, array.length - 1)];
};

export const getRandomArray = (min, max, array) => {
  const newArray = [];
  const newArrayLength = getRandomInteger(min, max);
  for (let i = 0; i < newArrayLength; i++) {
    newArray.push(getRandomElement(array));
  }
  return newArray;
};

export const getRandomImgUrlArray = (min, max) => {
  const newArray = [];
  const newArrayLength = getRandomInteger(min, max);
  for (let i = 0; i < newArrayLength; i++) {
    newArray.push(`http://picsum.photos/248/152?r=${Math.random()}`);
  }
  return newArray;
};

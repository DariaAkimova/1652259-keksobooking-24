import {getRandomInt} from './get-random.js';

const getRandomIndex = (array) => Math.floor(Math.random() * array.length);

const getRandomArrayElement = (array) => array[getRandomIndex (array)];

const removeDuplicate = (array) => array.filter((element) => array.indexOf(element) === array.lastIndexOf(element));

const getRandomLength = (array) => getRandomInt (1, array.length);

const createArrayRandomLength = (array) => Array.from({length: getRandomLength(array)}, (_, index) => array[index]);

const getNoRepeatRandomElement = (array) => {
  const randomIndex = getRandomIndex(array);
  const randomElement = array.splice(randomIndex, 1);
  return randomElement;
};

export {getRandomIndex, getRandomArrayElement, getRandomLength, removeDuplicate, createArrayRandomLength, getNoRepeatRandomElement};

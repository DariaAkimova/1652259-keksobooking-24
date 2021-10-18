import { getRandomInt, getRandomNumber } from './get-random.js';
import { getNoRepeatRandomElement, getRandomArrayElement, removeDuplicate, createArrayRandomLength} from './arrays.js';

const AUTHOR = {
  avatar: [
    'img/avatars/user01.png',
    'img/avatars/user02.png',
    'img/avatars/user03.png',
    'img/avatars/user04.png',
    'img/avatars/user05.png',
    'img/avatars/user06.png',
    'img/avatars/user07.png',
    'img/avatars/user08.png',
    'img/avatars/user09.png',
    'img/avatars/user10.png'],
};

const OFFER = {
  title: ['Сдается чудесное жилье','Вы могли бы пожить здесь', 'Жилье для вас'],
  type: ['palace', 'flat', 'house', 'bungalow','hotel'],
  checkin: ['12:00', '13:00','14:00'],
  checkout:['12:00', '13:00','14:00'],
  features: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
  description: ['Лучшее в мире жилье на пару ночей, есть все, что нужно!',
    'Хорошее расположение, подходящее количество комнат, отличный вид из номера!','Наши гости возвращаются к нам снова и снова!'],
  photos: [
    'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
    'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
    'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
  ],
};

const LOCATION = {
  latFrom: 35.65000,
  latTo: 35.70000,
  ingFrom: 139.70000,
  ingTo: 139.80000,
};

const OFFERS_COUNT = 10;

const getLocation = () => ({
  lat: getRandomNumber (LOCATION.latFrom, LOCATION.latTo, 5),
  lng: getRandomNumber ( LOCATION.ingFrom, LOCATION.ingTo, 5),
});

const createOffer = () => {
  const location = getLocation();
  return {
    author: {avatar: `${getNoRepeatRandomElement(AUTHOR.avatar)}`},
    offer: {
      title: getRandomArrayElement(OFFER.title),
      address: `${location.lat}, ${location.lng}`,
      price: getRandomInt(1,10000),
      type: getRandomArrayElement(OFFER.type),
      rooms: getRandomInt(1,10),
      guests: getRandomInt(1,10),
      checkin: getRandomArrayElement(OFFER.checkin),
      checkout: getRandomArrayElement(OFFER.checkout),
      features: removeDuplicate (createArrayRandomLength(OFFER.features)),
      description: getRandomArrayElement(OFFER.description),
      photos: createArrayRandomLength(OFFER.photos),
    },
    location,
  };
};
const createAllOffers =()=> Array.from({length: OFFERS_COUNT}, createOffer);

// eslint-disable-next-line no-console
console.log (createAllOffers());

export {/*createOffer,*/createAllOffers};

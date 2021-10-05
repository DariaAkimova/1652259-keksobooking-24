/* eslint-disable no-console */
/* eslint-disable prefer-template */
/* eslint-disable id-length */
function getRandomInt(from, to) {
  if (from < 0 || to <0) {
    return;
  }
  if (from >to ) {
    [from, to]=[to,from];
  }
  from = Math.ceil(from);
  to = Math.floor(to);
  return (Math.floor(Math.random() * (to - from + 1)) + from);
}/*Как сделать так, чтоюы случайное число сразу от 0 до бесконечности было?
   В условиях нет верхней границы. Чтобы параметры не прописывать*/

function getRandomNumber(from, to) {
  if (from < 0 || to <0){
    return;
  }
  if (from >to ) {
    [from, to]=[to,from];
  }
  return Math.random() * (to - from) + from;
}

const noRepeat = (someArray) => {
  for (let i=0; i< someArray.length; i++) {
    const randomElement = Math.floor(Math.random() * (someArray.length - i)) + i;
    const element = someArray[randomElement];
    someArray[randomElement] = someArray[i];
    someArray[i] = element;
    return someArray [i];
  }
};

const getOneOfAll = (totalArray) => {
  const oneElement = Math.floor(Math.random() * totalArray.length);
  return totalArray[oneElement];
};


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
  address: {
    lat: getRandomNumber(35.65000, 35.70000),
    lng:  getRandomNumber ( 139.70000, 139.80000)}, /* Тут в итоге будет то же, что и в location,
  но и просто сослаться на LOCATION не получилось, и скопировать значения оттуда тоже. Выдает в итоге [Object, Object]*/
  price: getRandomInt(0,1000000000),/*Надо бы getRandomInt() */
  type: ['palace', 'flat', 'house', 'bungalow','hotel'],
  rooms: getRandomInt(0,1000000000),/*Надо бы getRandomInt() */
  guests: getRandomInt(0,1000000000),/*Надо бы getRandomInt() */
  checkin: ['12:00', '13:00','14:00'],
  checkout:['12:00', '13:00','14:00'],
  features: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
  description: ['Лучшее в мире жилье на пару ночей, есть все, что нужно!',
    'Хорошее расположение, подходящее количество комнат, отличный вид из номера!','Наши гости возвращаются к нам снова и снова!'],
  photos: [
    'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
    'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
    'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
  ], /*массив строк — массив случайной длины из значений. Массив случайной длины сделать не получилось.
  Точнее, Случайная длина получилась, но значения Undefinded*/

};

/* Начало попытки сделать массив случайной длины*/
const randomLength = getRandomInt (1, OFFER.photos.length);
console.log (randomLength);
const createNewArray = (_firstArray) => { _firstArray.slice(0);};

const newArrayPhotos = Array.from({length: randomLength}, createNewArray(OFFER['photos']));
console.log (newArrayPhotos);
/* Конец */

const LOCATION = {
  lat: getRandomNumber(35.65000, 35.70000),
  lng:  getRandomNumber ( 139.70000, 139.80000),
};

const OFFERS_COUNT = 10;

const getRandomArrayElement = (elements) => elements[Math.floor(Math.random() * (elements.length))];

const createOffer = () => ({
  author: 'avatar: ' + noRepeat(AUTHOR.avatar),
  offer:[
    'title: '+ getRandomArrayElement(OFFER.title),
    'address: ' + OFFER.address, /*Выдает [Object, Object]*/
    'price: ' + OFFER.price,
    'type: ' + getOneOfAll(OFFER.type),
    'rooms: ' + OFFER.rooms,
    'guests: ' + OFFER.guests,
    'checkin: ' + getOneOfAll(OFFER.checkin),
    'checkout: ' + getOneOfAll(OFFER.checkout),
    'features: ' + noRepeat (OFFER.features),
    'description: ' + getRandomArrayElement(OFFER.description),
    'photos: ' + newArrayPhotos, /*Так не получается, хотя выше выдавал случайную длину*/
  ],
  location: LOCATION,
});

const allOffers = Array.from({length: OFFERS_COUNT}, createOffer);

console.log (allOffers);

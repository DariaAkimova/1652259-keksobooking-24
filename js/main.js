const getRandomInt = (from, to) => {
  if (from < 0 || to <0) {
    return;
  }
  if (from >to ) {
    [from, to]=[to,from];
  }
  from = Math.ceil(from);
  to = Math.floor(to);
  return (Math.floor(Math.random() * (to - from + 1)) + from);
};

const getRandomNumber = (from, to, digits) => {
  if (from < 0 || to <0){
    return;
  }
  if (from >to ) {
    [from, to]=[to,from];
  }
  const randomNumber = Math.random() * (to - from) + from;
  return +randomNumber.toFixed(digits);
};

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

const getLocation = () => ({
  lat: getRandomNumber (35.65000, 35.70000, 5),
  lng: getRandomNumber ( 139.70000, 139.80000, 5),
});

const OFFERS_COUNT = 10;

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

const allOffers = Array.from({length: OFFERS_COUNT}, createOffer);

// eslint-disable-next-line no-console
console.log (allOffers);


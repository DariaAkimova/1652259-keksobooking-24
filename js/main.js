import { getRandomInt, getRandomNumber } from './get-random.js';
import { getNoRepeatRandomElement, getRandomArrayElement, removeDuplicate, createArrayRandomLength} from './arrays.js';
import { AUTHOR, OFFER, OFFERS_COUNT, LOCATION } from './data.js';


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

const allOffers = Array.from({length: OFFERS_COUNT}, createOffer);

// eslint-disable-next-line no-console
console.log (allOffers);

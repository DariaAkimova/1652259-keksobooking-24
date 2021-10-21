import {createAllOffers} from './data.js';

const mapCanvas = document.querySelector('#map-canvas');
const cardTemplate = document.querySelector('#card').content;
const similarOffers = createAllOffers;
const offerCardFragment = document.createDocumentFragment();

similarOffers.forEach(( dataForCard) => {

  const similarCards = cardTemplate.cloneNode(true);

  const offerTitle = similarCards.querySelector('.popup__title');
  const offerAddress = similarCards.querySelector('.popup__text--address');
  const offerPrice = similarCards.querySelector('.popup__text--price');
  const offerType = similarCards.querySelector('.popup__type');
  const offerCapacity = similarCards.querySelector('.popup__text--capacity');
  const offerTime = similarCards.querySelector('.popup__text--time');
  const someFeatures = similarCards.querySelectorAll('.popup__feature');
  const offerDescription = similarCards.querySelector('.popup__description');
  const offerPhotosList = similarCards.querySelector('.popup__photos');
  const onePhoto = similarCards.querySelector('.popup__photo');
  const avatar = similarCards.querySelector('.popup__avatar');

  offerTitle.textContent = dataForCard.offer.title;
  offerAddress.textContent = dataForCard.offer.address;
  offerPrice.textContent = `${dataForCard.offer.price} ₽/ночь`;
  offerType.textContent = dataForCard.offer.type;

  switch (dataForCard.offer.type) {
    case  'flat':
      offerType.textContent = 'Квартира';
      break;
    case 'bungalow':
      offerType.textContent = 'Бунгало';
      break;
    case 'house':
      offerType.textContent = 'Дом';
      break;
    case 'palace':
      offerType.textContent = 'Дворец';
      break;
    case 'hotel':
      offerType.textContent = 'Отлеь';
      break;
  }

  offerCapacity.textContent = `${dataForCard.offer.rooms} комнаты для ${dataForCard.offer.guests} гостей`;
  offerTime.textContent = `Заезд после ${dataForCard.offer.checkin}, выезд до ${dataForCard.offer.checkout}`;

  someFeatures.forEach((featureItem) => {
    const isNesessary = dataForCard.offer.features.some((ourFeature) => featureItem.classList.contains(`popup__feature--${ourFeature}`));
    if (!isNesessary){
      featureItem.classList.add('hidden');
    }
  });

  offerDescription.textContent = dataForCard.offer.description;

  for (const  photo of dataForCard.offer.photos) {
    const newPhoto = onePhoto.cloneNode();
    newPhoto.src = photo;
    offerPhotosList.appendChild(newPhoto);
  }
  onePhoto.classList.add('hidden');

  avatar.src = dataForCard.author.avatar;

  offerCardFragment.appendChild(similarCards);
});

mapCanvas.appendChild(offerCardFragment.children[0]);

const fieldsOfCard = document.querySelector('.popup').children;
const createNoDataAction = (someField) => {
  if (someField.textContent === false || someField.src=== false) {
    someField.classList.add('hidden');
  }
};

for (const field of fieldsOfCard) {
  createNoDataAction(field);
}

export {mapCanvas};


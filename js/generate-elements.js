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
  const offerFeatures = similarCards.querySelectorAll('.popup__feature');
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
      offerType.textContent = 'Отель';
      break;
  }

  offerCapacity.textContent = `${dataForCard.offer.rooms} комнаты для ${dataForCard.offer.guests} гостей`;
  offerTime.textContent = `Заезд после ${dataForCard.offer.checkin}, выезд до ${dataForCard.offer.checkout}`;

  offerFeatures.forEach((featureItem) => {
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


const fieldTitle = mapCanvas.querySelector('.popup__title');
const fieldAddress = mapCanvas.querySelector('.popup__text--address');
const fieldPrice = mapCanvas.querySelector('.popup__text--price');
const fieldType = mapCanvas.querySelector('.popup__type');
const fieldCapacity = mapCanvas.querySelector('.popup__text--capacity');
const fieldTime = mapCanvas.querySelector('.popup__text--time');
const fieldDescription = mapCanvas.querySelector('.popup__description');
const fieldPhotos = mapCanvas.querySelectorAll('.popup__photo');
const fieldAvatar = mapCanvas.querySelector('.popup__avatar');

const allFields = [fieldAddress, fieldCapacity, fieldDescription, ...fieldPhotos, fieldPrice, fieldTime, fieldTitle, fieldType, fieldAvatar];

allFields.forEach((someField) => {
  if (someField.tagName === 'IMG'  && !someField.src || !someField.textContent) {
    someField.classList.add('hidden');
  } else {
    someField.classList.remove('hidden');
  }
});

export {mapCanvas};

/* eslint-disable no-cond-assign */

import {createAllOffers} from './data.js';

const mapCanvas = document.querySelector('#map-canvas');
const cardTemplate = document.querySelector('#card').content;
const similarOffers = createAllOffers();
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
  const avatar = similarCards.querySelector('.popup__avatar');

  offerTitle.textContent = dataForCard.offer.title;
  offerAddress.textContent = dataForCard.offer.address;
  offerPrice.textContent = `${dataForCard.offer.price} ₽/ночь`;
  offerType.textContent = dataForCard.offer.type;
  if (dataForCard.offer.type === 'flat') {offerType.textContent = 'Квартира';}
  else if (dataForCard.offer.type === 'bungalow') {offerType.textContent = 'Бунгало';}
  else if (dataForCard.offer.type === 'house') {offerType.textContent = 'Дом';}
  else if (dataForCard.offer.type === 'palace') {offerType.textContent = 'Дворец';}
  else if (dataForCard.offer.type === 'hotel')  {offerType.textContent = 'Отель';}
  offerCapacity.textContent = `${dataForCard.offer.rooms} комнаты для ${dataForCard.offer.guests} гостей`;
  offerTime.textContent = `Заезд после ${dataForCard.offer.checkin}, выезд до ${dataForCard.offer.checkout}`;

  someFeatures.forEach((featureItem) => {
    const isNesessary = dataForCard.offer.features.some((ourFeature) => featureItem.classList.contains(`popup__feature--${ourFeature}`));
    if (!isNesessary)
    {featureItem.remove();}
    dataForCard.offer.features.forEach((nesessaryFeature) => {
      if (featureItem.classList.contains(`popup__feature--${nesessaryFeature}`)) {featureItem.textContent = nesessaryFeature;}
    });
  });

  offerDescription.textContent = dataForCard.offer.description;

  // В блок .popup__photos выведите все фотографии из списка offer.photos.
  //Каждая из строк массива photos должна записываться как атрибут src соответствующего изображения.
  const onePhoto = similarCards.querySelector('.popup__photo');
  for (let i=0; i<dataForCard.offer.photos.length; i++) {
    onePhoto.src = dataForCard.offer.photos[i];
    offerPhotosList.appendChild(onePhoto);
  }

  avatar.src = dataForCard.author.avatar;


  //   Предусмотрите ситуацию, когда данных для заполнения не хватает.
  //   Например, отсутствует описание. В этом случае соответствующий блок в карточке скрывается.

  const card = similarCards.querySelector('.popup');
  const fieldsOfCard = card.children;

  const createNoDataAction = (someField) => {
    // eslint-disable-next-line no-constant-condition
    if (someField.textContent === false || someField.src=== false) {
      someField.classList.add('hidden');
    }
  };
  for (let i = 0; i < fieldsOfCard.length; i++) {
    createNoDataAction(fieldsOfCard[i]);
  }

  offerCardFragment.appendChild(similarCards);

});
// eslint-disable-next-line no-console
console.log (offerCardFragment);

mapCanvas.appendChild(offerCardFragment.children[0]);

export {mapCanvas};


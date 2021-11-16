import {/*compareOffers,*/ getFilterData } from './filter.js';

const MAX_OFFERS_COUNT = 10;
const cardTemplate = document.querySelector('#card').content;
const offerCardFragment = document.createDocumentFragment();

const getFilteredOffers = (allOffers) => allOffers
  .slice()
  //.sort(compareOffers)
  .filter (getFilterData)
  .slice(0, MAX_OFFERS_COUNT);


const renderOffersList = (filteredOffers) => {

  filteredOffers.forEach((dataForCard) => {
    const offerCard = cardTemplate.cloneNode(true);

    const offerTitle = offerCard.querySelector('.popup__title');
    const offerAddress = offerCard.querySelector('.popup__text--address');
    const offerPrice = offerCard.querySelector('.popup__text--price');
    const offerType = offerCard.querySelector('.popup__type');
    const offerCapacity = offerCard.querySelector('.popup__text--capacity');
    const offerTime = offerCard.querySelector('.popup__text--time');
    const offerFeaturesList = offerCard.querySelector('.popup__features');
    const offerFeatures = offerCard.querySelectorAll('.popup__feature');
    const offerDescription = offerCard.querySelector('.popup__description');
    const offerPhotosList = offerCard.querySelector('.popup__photos');
    const onePhoto = offerCard.querySelector('.popup__photo');
    const offerAvatar = offerCard.querySelector('.popup__avatar');

    const hideField = (field) => field.classList.add('hidden');

    if(!dataForCard.offer.title) {
      hideField (offerTitle);
    } else {
      offerTitle.textContent = dataForCard.offer.title;
    }

    if(!dataForCard.offer.address) {
      hideField (offerAddress);
    } else {
      offerAddress.textContent = dataForCard.offer.address;
    }

    if(!dataForCard.offer.price) {
      hideField (offerPrice);
    } else {
      offerPrice.textContent = `${dataForCard.offer.price} ₽/ночь`;
    }

    if(!dataForCard.offer.type) {
      hideField (offerType);
    } else {
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
    }

    if(!dataForCard.offer.rooms && !dataForCard.offer.guests) {
      hideField (offerCapacity);
    } else if (!dataForCard.offer.rooms) {
      offerCapacity.textContent = ` Вариант для ${dataForCard.offer.guests} гостей`;
    } else if (!dataForCard.offer.guests) {
      offerCapacity.textContent = `${dataForCard.offer.rooms} комнаты`;
    } else {
      offerCapacity.textContent = `${dataForCard.offer.rooms} комнаты для ${dataForCard.offer.guests} гостей`;
    }

    if(!dataForCard.offer.checkin && !dataForCard.offer.checkout) {
      hideField (offerTime);
    } else if (!dataForCard.offer.checkin) {
      offerTime.textContent = `Выезд до ${dataForCard.offer.checkout}`;
    } else if (!dataForCard.offer.checkout) {
      offerTime.textContent = `Заезд после ${dataForCard.offer.checkin}`;
    } else {
      offerTime.textContent = `Заезд после ${dataForCard.offer.checkin}, выезд до ${dataForCard.offer.checkout}`;
    }

    if(!dataForCard.offer.features) {
      hideField (offerFeaturesList);
    } else {
      offerFeatures.forEach((featureItem) => {
        const isNesessary = dataForCard.offer.features.some((ourFeature) => featureItem.classList.contains(`popup__feature--${ourFeature}`));
        if (!isNesessary){
          featureItem.classList.add('hidden');
        }
      });
    }

    if(!dataForCard.offer.description) {
      hideField (offerDescription);
    } else {
      offerDescription.textContent = dataForCard.offer.description;
    }

    if(!dataForCard.offer.photos) {
      hideField (offerPhotosList);
    } else {
      dataForCard.offer.photos.forEach((photo) => {
        const newPhoto = onePhoto.cloneNode();
        newPhoto.src = photo;
        offerPhotosList.appendChild(newPhoto);
      });
      onePhoto.classList.add('hidden');
    }

    if(!dataForCard.author) {
      hideField (offerAvatar);
    } else {
      offerAvatar.src = dataForCard.author.avatar;
    }

    offerCardFragment.appendChild(offerCard);
  });

  return [...offerCardFragment.children];

};

export {getFilteredOffers, renderOffersList};


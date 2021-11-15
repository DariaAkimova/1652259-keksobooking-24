const cardTemplate = document.querySelector('#card').content;
const offerCardFragment = document.createDocumentFragment();

const renderOffersList = (allOffers) => {

  allOffers.forEach(( dataForCard) => {

    const similarCards = cardTemplate.cloneNode(true);

    const offerTitle = similarCards.querySelector('.popup__title');
    const offerAddress = similarCards.querySelector('.popup__text--address');
    const offerPrice = similarCards.querySelector('.popup__text--price');
    const offerType = similarCards.querySelector('.popup__type');
    const offerCapacity = similarCards.querySelector('.popup__text--capacity');
    const offerTime = similarCards.querySelector('.popup__text--time');
    const offerFeaturesList = similarCards.querySelector('.popup__features');
    const offerFeatures = similarCards.querySelectorAll('.popup__feature');
    const offerDescription = similarCards.querySelector('.popup__description');
    const offerPhotosList = similarCards.querySelector('.popup__photos');
    const onePhoto = similarCards.querySelector('.popup__photo');
    const offerAvatar = similarCards.querySelector('.popup__avatar');

    const hideField = (field) => field.classList.add('hidden');

    offerTitle.textContent = dataForCard.offer.title;
    if(!dataForCard.offer.title) {
      hideField (offerTitle);
    }

    offerAddress.textContent = dataForCard.offer.address;
    if(!dataForCard.offer.address) {
      hideField (offerAddress);
    }

    offerPrice.textContent = `${dataForCard.offer.price} ₽/ночь`;
    if(!dataForCard.offer.price) {
      hideField (offerPrice);
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

    offerDescription.textContent = dataForCard.offer.description;
    if(!dataForCard.offer.description) {
      hideField (offerDescription);
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

    offerCardFragment.appendChild(similarCards);
  });

  return [...offerCardFragment.children];

};

export {renderOffersList};


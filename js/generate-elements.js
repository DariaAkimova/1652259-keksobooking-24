const cardTemplate = document.querySelector('#card').content;
const offerCardFragment = document.createDocumentFragment();

const renderSimilarOffers = (similarOffers) => {

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
    const offerPhotos = similarCards.querySelectorAll('.popup__photo');
    const onePhoto = similarCards.querySelector('.popup__photo');
    const avatar = similarCards.querySelector('.popup__avatar');
    const allFields = [offerAddress, offerCapacity, offerDescription, ...offerPhotos, offerPrice, offerTime, offerTitle, offerType, avatar];

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

    // offerFeatures.forEach((featureItem) => {
    //       const isNesessary = dataForCard.offer.features.some((ourFeature) => featureItem.classList.contains(`popup__feature--${ourFeature}`));
    //   if (!isNesessary){
    //     featureItem.classList.add('hidden');
    //   }
    // });

    offerDescription.textContent = dataForCard.offer.description;


    // dataForCard.offer.photos.forEach((photo) => {
    //   const newPhoto = onePhoto.cloneNode();
    //   newPhoto.src = photo;
    //   offerPhotosList.appendChild(newPhoto);
    // });
    // onePhoto.classList.add('hidden');


    avatar.src = dataForCard.author.avatar;

    allFields.forEach((someField) => {
      if (
        (someField.tagName === 'IMG' && !someField.src) ||
        (someField.tagName !== 'IMG' && !someField.textContent)
      ) {
        someField.classList.add('hidden');
      }
    });
    offerCardFragment.appendChild(similarCards);
  });
  return [...offerCardFragment.children];

};


export {renderSimilarOffers};


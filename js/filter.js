const MAX_OFFERS_COUNT = 10;
const filtersArea = document.querySelector('.map__filters');
const selectFilters = filtersArea.querySelectorAll('select');
const checkboxFilters = filtersArea.querySelectorAll('input[type="checkbox"]');
const allFiltersAreas = [...selectFilters, ...checkboxFilters];
const typeFilter = document.querySelector('#housing-type');
const priceFilter = document.querySelector('#housing-price');
const roomsFilter = document.querySelector('#housing-rooms');
const guestsFilter = document.querySelector('#housing-guests');
const featuresFilter = document.querySelector('#housing-features');

const filterFeatures = (offerWithFeature) => {
  const checkedFeatures = [...featuresFilter.querySelectorAll(':checked')];
  const offerFeatures = offerWithFeature.offer.features;
  if (!checkedFeatures)  {
    return true;
  }
  return checkedFeatures.every((checkedFeature) => offerFeatures && offerFeatures.includes(checkedFeature.value));
};

const filterPrice =(offerWithPrice) => {
  const offerPrice = offerWithPrice.offer.price;
  if (!offerPrice && priceFilter.value !== 'any') {
    return false;
  } else if (!offerPrice && priceFilter.value === 'any') {
    return true;
  }
  switch (priceFilter.value) {
    case 'low':
      if (offerPrice < 10000) {
        return true;
      }
      break;
    case 'middle':
      if (offerPrice > 10000 && offerPrice < 50000 ) {
        return true;
      }
      break;
    case 'high':
      if (offerPrice > 50000) {
        return true;
      }
      break;
    default:
      return true;
  }
};

const getFilteredOffers = (allOffers) => {
  const filteredOffers = [];

  for (const someOffer of allOffers) {
    const offerType = someOffer.offer.type;
    const offerRooms = someOffer.offer.rooms;
    const offerGuests = someOffer.offer.guests;
    const isValidFeatures = filterFeatures(someOffer);
    const isValidPrice = filterPrice (someOffer);

    const isValidType =
    ((!offerType &&  typeFilter.value === 'any') ||
    typeFilter.value === 'any' ||
    offerType === typeFilter.value );

    const isValidRooms =
    ((!offerRooms && roomsFilter.value === 'any') ||
    roomsFilter.value === 'any' ||
    offerRooms === +roomsFilter.value ||
    (someOffer.offer.rooms > 3 && roomsFilter.value === 'more'));

    const isValidGuests =
    ((!offerGuests && guestsFilter.value === 'any') ||
    guestsFilter.value === 'any' ||
    (offerGuests === +guestsFilter.value) ||
    (offerGuests > 2 && guestsFilter.value === 'more'));

    if (filteredOffers.length >= MAX_OFFERS_COUNT) {
      break;
    }

    if (isValidFeatures && isValidPrice && isValidGuests && isValidRooms && isValidType) {
      filteredOffers.push(someOffer);
    }
  }

  return filteredOffers;
};


export {getFilteredOffers, allFiltersAreas, selectFilters, checkboxFilters};

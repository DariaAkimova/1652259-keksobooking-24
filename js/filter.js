const typeFilter = document.querySelector('#housing-type');
const priceFilter = document.querySelector('#housing-price');
const roomsFilter = document.querySelector('#housing-rooms');
const guestsFilter = document.querySelector('#housing-guests');
const featuresFilter = document.querySelector('#housing-features');

const filterFeatures = (offerWithFeature) => {
  const checkedFeatures = [...featuresFilter.querySelectorAll(':checked')];
  const offerFeatures = offerWithFeature.offer.features;
  return checkedFeatures.every((checkedFeature) => offerFeatures && offerFeatures.includes(checkedFeature.value));
};

const filterPrice =(offerWithPrice) => {
  const offerPrice = offerWithPrice.offer.price;
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


const getFilterData = (someOffer)=> {
  const isValidFeatures = filterFeatures(someOffer);
  const isValidPrice = filterPrice (someOffer);
  const isValidType = (someOffer.offer.type === typeFilter.value || typeFilter.value === 'any');
  const isValidRooms = (someOffer.offer.rooms === roomsFilter.value || roomsFilter.value === 'any');
  const isValidGuests = (someOffer.offer.guests === guestsFilter.value || guestsFilter.value === 'any');


  return isValidFeatures && isValidPrice && isValidGuests && isValidRooms && isValidType;

};


// Sort

const getOfferRank = (filteredOffer) => {
  const filterPriceResult = filterPrice (filteredOffer);
  const filterFeaturesResult = filterFeatures (filteredOffer);
  let rank = 0;
  if (filteredOffer.offer.type === typeFilter.value || typeFilter.value === 'any') {
    return rank+=1;
  }
  if (filteredOffer.offer.rooms === roomsFilter.value || roomsFilter.value === 'any') {
    return rank+=1;
  }
  if (filteredOffer.offer.guests === guestsFilter.value || guestsFilter.value === 'any') {
    return rank+=1;
  }
  if (filterPriceResult) {
    return rank+=1;
  }
  if (filterFeaturesResult) {
    const offerFeaturesArray = filteredOffer.offer.features;
    return rank+=offerFeaturesArray.length;
  }
  return rank;
};

const compareOffers = (offerA, offerB) => {
  const rankA = getOfferRank(offerA);
  const rankB = getOfferRank(offerB);

  return rankB - rankA;
};


//устранение дребезга

//   const RERENDER_DELAY = 500;
//  const allFiltersAreas = [...selectFilters, ...checkboxFilters];

//  allFiltersAreas.forEach((filterForOffer) => {
//     filterForOffer.addEventListener('change', => {
//         (_.debounce (
//             () => renderOfferList(),
//             RERENDER_DELAY

//         ))
//     } )
//  })


export {getFilterData, compareOffers};

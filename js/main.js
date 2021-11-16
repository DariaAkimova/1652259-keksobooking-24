import './validation.js';
import './map.js';
import {getData} from './api.js';
import {getFilteredOffers, renderOffersList} from './generate-elements.js';
import { renderMarkers, removeMarkers } from './map.js';
import {updateMarkers/*, allFiltersAreas*/} from './filter.js';
import {/*debounce,*/ showAlert} from './utils/util.js';

//const RERENDER_DELAY = 500;
const ALERT_SHOW_TIME = 5000;

const createMarkers = () => {
  getData ((offers) => {
    const offersForMap = getFilteredOffers (offers);
    const popupOffers = renderOffersList(offersForMap);
    renderMarkers(offersForMap, popupOffers);
    //console.log (offersForMap);
  },
  () =>   showAlert('Ошибка загрузки данных', ALERT_SHOW_TIME),
  );
};

createMarkers();

const changeMarkers = () => {
  removeMarkers();
  createMarkers();
};

updateMarkers (changeMarkers);

//устранение дребезга

// allFiltersAreas.forEach((filterForOffer) => {
//   filterForOffer.addEventListener('change', debounce ( changeMarkers, RERENDER_DELAY));
// });



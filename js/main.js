import './validation.js';
import './map.js';
import {getData} from './api.js';
import {getFilteredOffers, renderOffersList} from './generate-elements.js';
import {renderMarkers, removeMarkers } from './map.js';
import {allFiltersAreas} from './filter.js';
import {debounce, showAlert} from './util.js';

const RERENDER_DELAY = 500;
const ALERT_SHOW_TIME = 10000;

let popupOffers;
const createMarkers = () => {
  getData ((offers) => {
    const offersForMap = getFilteredOffers (offers);
    popupOffers = renderOffersList(offersForMap);
    renderMarkers(offersForMap, popupOffers);
  },
  () =>   showAlert('Ошибка загрузки данных', ALERT_SHOW_TIME),
  );
};

createMarkers();

const changeMarkers = () => {
  popupOffers.forEach((popup) => popup.remove());
  removeMarkers();
  createMarkers();
};

allFiltersAreas.forEach((filterForOffer) => {
  filterForOffer.addEventListener('change', debounce (changeMarkers, RERENDER_DELAY));
});



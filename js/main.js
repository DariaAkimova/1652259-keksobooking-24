import './form.js';
import './map.js';
import {getData} from './api.js';
import {renderSimilarOffers} from './generate-elements.js';
import { renderMarkers } from './map.js';

const MAX_OFFERS_COUNT = 10;
const ALERT_SHOW_TIME = 100000;

const showAlert = (message) => {
  const alertMessage = document.createElement('div');
  alertMessage.classList.add('alert-message');
  alertMessage.textContent = message;
  document.body.append(alertMessage);

  setTimeout(() => {
    alertMessage.remove();
  }, ALERT_SHOW_TIME);
};


getData (
  (offers) => {
    const offersForMap = offers.slice(0, MAX_OFFERS_COUNT);
    const popupOffers = renderSimilarOffers(offersForMap);
    renderMarkers(offersForMap, popupOffers);
  },
  () =>   showAlert('Ошибка загрузки данных'),
);

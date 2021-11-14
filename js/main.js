import './form.js';
import './map.js';
import {getData} from './api.js';
import {renderSimilarOffers} from './generate-elements.js';
//import { renderMarkers } from './map.js';

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
  (offers) => renderSimilarOffers(offers.slice(0, MAX_OFFERS_COUNT)),
  () =>   showAlert('Ошибка загрузки данных'),
);

//   {
//     const popupOffers = renderSimilarOffers(offers.slice(0, MAX_OFFERS_COUNT));
//     console.log (popupOffers)
//     renderMarkers(offers, popupOffers);
//   },

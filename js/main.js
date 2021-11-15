import './form.js';
import './map.js';
import {getData} from './api.js';
import {getFilteredOffers, renderOffersList} from './generate-elements.js';
import { renderMarkers } from './map.js';


const ALERT_SHOW_TIME = 5000;

const filtersArea = document.querySelector('.map__filters');
const selectFilters = filtersArea.querySelectorAll('select');
const checkboxFilters = filtersArea.querySelectorAll('input[type="checkbox"]');

const showAlert = (message) => {
  const alertMessage = document.createElement('div');
  alertMessage.classList.add('alert-message');
  alertMessage.textContent = message;
  document.body.append(alertMessage);

  setTimeout(() => {
    alertMessage.remove();
  }, ALERT_SHOW_TIME);
};


const createMarkers = () => {
  getData ((offers) => {
    const offersForMap = getFilteredOffers (offers);
    const popupOffers = renderOffersList(offersForMap);
    renderMarkers(offersForMap, popupOffers);
    //console.log (offersForMap);
  },
  () =>   showAlert('Ошибка загрузки данных'),
  );
};
createMarkers();

selectFilters.forEach((select) => {
  select.addEventListener('change', createMarkers);
});

checkboxFilters.forEach((checkbox) => {
  checkbox.addEventListener('change', createMarkers);
});



/* eslint-disable no-unused-vars */
//import { renderSimilarOffers } from './generate-elements.js';
import {DEFAULT_MARKER, mainMarker} from './map.js';

const offerForm = document.querySelector ('.ad-form');
const allForms = document.querySelectorAll('form');
// const allSelectForms = offerForm.querySelectorAll ('select');
// const allInputForms = offerForm.querySelectorAll ('input');
// const addressInput = offerForm.querySelector('#address');
//const filtersArea = document.querySelector('.map__filters');
// const selectFilters = filtersArea.querySelectorAll('select');
// const checkboxFilters = filtersArea.querySelectorAll('input[type="checkbox"]');
const resetButton = document.querySelector('.ad-form__reset');
const successMessageTemplate = document.querySelector('#success');
const successMessage = successMessageTemplate.cloneNode(true);
const errorMessageTemplate = document.querySelector('#error');
const closeErrorButton = document.querySelector('.error__button');
const errorMessage = errorMessageTemplate.cloneNode(true);

const getData = (onSuccess, onFail) => {
  fetch ('https://24.javascript.pages.academy/keksobooking/data')
    .then((response)  => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Ошибка загрузки данных');
      }
    })
    .then((offers) => {
      //console.error (renderSimilarOffers(offers.slice(0, 10)));
      // console.log(renderSimilarOffers(offers.slice(0, 10)));
      onSuccess (offers);
    })
    .catch ((err) => {
     // console.error(err);
      onFail(err);
    });
};

const sendData = (onSuccess, onFail,  body) => {
  fetch(
    'https://24.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body,
    },
  ).then((response) => {
    if (response.ok) {
      onSuccess();
    } else {
      throw new Error();
    }
  })
    .catch ((err) => {
      // eslint-disable-next-line no-console
      //console.error(err);
      onFail();
    });

};
const clearAll = () => {
  allForms.forEach((form) => form.reset());
  mainMarker.setLatLng(DEFAULT_MARKER);
};

const closeMessage = (typeOfMessage) => {
  typeOfMessage.classList.add('hidden');
};

const showErrorMessage = () => {
  document.body.append(errorMessage);
  closeErrorButton.addEventListener('click', closeMessage (errorMessage));
};

const setOfferFormSubmit = (onSuccess) => {

  offerForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    sendData (
      onSuccess,
      showErrorMessage,
      () => new FormData(evt.target),
    );
  });
};


const showSuccesMessage = () => {
  document.body.append(successMessage);
  clearAll();
};

setOfferFormSubmit(showSuccesMessage);



document.addEventListener('click', () => {
  closeMessage (errorMessage);
  closeMessage (successMessage);
});
document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeMessage (errorMessage);
    closeMessage (successMessage);
  }
});

resetButton.addEventListener('click', clearAll);

export {getData};

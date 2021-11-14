import {DEFAULT_MARKER, mainMarker} from './map.js';

const serverLink = 'https://24.javascript.pages.academy/keksobooking';
const offerForm = document.querySelector ('.ad-form');
const allForms = document.querySelectorAll('form');
// const allSelectForms = offerForm.querySelectorAll ('select');
// const allInputForms = offerForm.querySelectorAll ('input');
// const addressInput = offerForm.querySelector('#address');
//const filtersArea = document.querySelector('.map__filters');
// const selectFilters = filtersArea.querySelectorAll('select');
// const checkboxFilters = filtersArea.querySelectorAll('input[type="checkbox"]');
//const resetButton = document.querySelector('.ad-form__reset');
const successMessageTemplate = document.querySelector('#success');
const successMessage = successMessageTemplate.cloneNode(true).content;
const errorMessageTemplate = document.querySelector('#error');
const errorMessage = errorMessageTemplate.cloneNode(true).content;
const closeErrorButton = errorMessage.querySelector('.error__button');

const getData = (onSuccess, onFail) => {
  fetch (`${serverLink}/data`)
    .then((response)  => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Ошибка загрузки данных');
      }
    })
    .then((offers) => {
      onSuccess (offers);
    })
    .catch ((err) => {
      onFail(err);
    });
};

const sendData = (onSuccess, onFail, body) => {
  fetch(
    serverLink,
    {
      method: 'POST',
      body,
    },
  ).then((response) => {
    if (response.ok) {
      onSuccess();
    } else {
      onFail();
    }
  })
    .catch (() => {
      onFail();
    });

};
const clearAll = () => {
  allForms.forEach((form) => form.reset());
  mainMarker.setLatLng(DEFAULT_MARKER);
};

const closeMessage = (typeOfMessage) => {
  //typeOfMessage.classList.add('hidden');
  document.body.removeChild(typeOfMessage);
};

const showErrorMessage = () => {
  document.body.appendChild(errorMessage);
  closeErrorButton.addEventListener('click', () => closeMessage(errorMessage));
};

const setOfferFormSubmit = (onSuccess) => {

  offerForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    sendData (
      onSuccess,
      showErrorMessage,
      new FormData(evt.target),
    );
  });
};

const showSuccesMessage = () => {
  document.body.appendChild(successMessage);
  clearAll();
};

setOfferFormSubmit(showSuccesMessage);

document.addEventListener('click', () => {
  closeMessage(errorMessage);
  closeMessage(successMessage);
});
document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeMessage(errorMessage);
    closeMessage(successMessage);
  }
});

//resetButton.addEventListener('click', clearAll);

export {getData};

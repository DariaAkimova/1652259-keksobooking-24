/* eslint-disable no-unused-vars */
import { renderSimilarOffers } from './generate-elements.js';
import {mainMarker} from './map.js';

const form = document.querySelector ('.ad-form');
const allSelectForms = form.querySelectorAll ('select');
const allInputForms = form.querySelectorAll ('input');
const addressInput = form.querySelector('#address');
const filtersArea = document.querySelector('.map__filters');
const selectFilters = filtersArea.querySelectorAll('select');
const checkboxFilters = filtersArea.querySelectorAll('input[type="checkbox"]');
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
      onSuccess (offers);
    })
    .catch ((err) => {
      onFail(err);
    });
};


const sendData = (onSuccess, onFail, body) => {
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
  // .then(showSuccesMessage)
    .catch ((err) => {
      // console.log('error');
      onFail();
    });
};


const clearAll = () => {
  allInputForms.forEach((input) => input.value = '');
  addressInput.value = '35.68950, 139.69171';
  //   allSelectForms.forEach((select) => {
  //  Как вернуть селекты в изначальное состояние  состояние?
  // })
  selectFilters.forEach ((filter) => filter.value = 'any');
  checkboxFilters.forEach((filter) => filter.removeAttribute('checked'));
  mainMarker.setLatLng({
    lat: 35.68950,
    lng: 139.69200,
  });
};

const closeMessage = (typeOfMessage) => {
  typeOfMessage.classList.add('hidden');
};

const showErrorMessage = () => {
  document.body.appendChild(errorMessage);

  closeErrorButton.addEventListener('click', closeMessage (errorMessage));
  document.addEventListener('click', () => closeMessage (errorMessage));
  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      closeMessage (errorMessage);
    }
  });
  //Оставила обработчики в этой функции, потому что они должны висеть только тогда,
  //когда окно с ошибкой открыто. Пока не сообразила, как это еще модно сделать. То же самое внизу с saccess message
};


const setOfferFormSubmit = (onSuccess) => {

  form.addEventListener('submit', (evt) => {
    evt.preventDefault();

    sendData (
      () => onSuccess,
      () => showErrorMessage,
      () => new FormData(evt.target),
    );
  });
};

const showSuccesMessage = (clearFunction) => {
  document.body.append(successMessage);

  document.addEventListener('click', () => closeMessage (successMessage));
  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      closeMessage (successMessage);
    }
  });
  clearFunction();
}; //нам надо, чтобы при успешной отправке данных и сообщение открывалось, и все поля очищались. Можно вставить clearAll коллбэкком?
  //Или как это лучше реализовать?

setOfferFormSubmit(showSuccesMessage);

resetButton.addEventListener('click', clearAll);

export {getData};

import { sendData } from './api.js';
import {DEFAULT_MARKER, mainMarker} from './map.js';

const offerForm = document.querySelector ('.ad-form');
const allForms = document.querySelectorAll('form');
const successMessageTemplate = document.querySelector('#success');
const successMessageFragment = successMessageTemplate.cloneNode(true).content;
const successMessage = successMessageFragment.querySelector('.success');
const errorMessageTemplate = document.querySelector('#error');
const errorMessageFragment = errorMessageTemplate.cloneNode(true).content;
const errorMessage = errorMessageFragment.querySelector('.error');
const errorButton = errorMessage.querySelector('.error__button');
const formFieldsets = offerForm.querySelectorAll('fieldset');
const mapFiltersForm = document.querySelector('.map__filters');
const allFilters = mapFiltersForm.querySelectorAll('select');

const makeAllDisabled = () => {
  offerForm.classList.add('ad-form--disabled');
  formFieldsets.forEach((fieldset)=> fieldset.setAttribute('disabled','true'));
  mapFiltersForm.classList.add('ad-form--disabled');
  allFilters.forEach((filter)=> filter.setAttribute('disabled','true'));
};

makeAllDisabled();

const makeAllAktive = () => {
  offerForm.classList.remove('ad-form--disabled');
  formFieldsets.forEach((fieldset)=> fieldset.removeAttribute('disabled'));
  mapFiltersForm.classList.remove('ad-form--disabled');
  allFilters.forEach((filter)=> filter.removeAttribute('disabled'));
};


const onMessageClick = (callback) => {
  document.addEventListener('click', callback);
};

const onDocumentEscKeydown = (callback) => {
  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      callback;
    }
  });
};

const onErrorButtonClick = (callback) => {
  errorButton.addEventListener('click', callback);
};

const clearAll = () => {
  allForms.forEach((form) => form.reset());
  mainMarker.setLatLng(DEFAULT_MARKER);
};

const closeMessage = (messageElement) => {
  messageElement.remove();
  document.removeEventListener('click', onMessageClick);
  document.removeEventListener('keydown', onDocumentEscKeydown);
  errorButton.removeEventListener('click', onErrorButtonClick);
};


const showErrorMessage = () => {
  document.body.appendChild(errorMessage);
  onErrorButtonClick (closeMessage(errorMessage));
  onMessageClick (closeMessage(errorMessage));
  onDocumentEscKeydown (closeMessage(errorMessage));
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
  clearAll();
  document.body.appendChild(successMessage);
  onMessageClick (closeMessage (successMessage));
  onDocumentEscKeydown (closeMessage (successMessage));
};

setOfferFormSubmit(showSuccesMessage);


export {makeAllAktive};

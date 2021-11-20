import { sendData } from './api.js';
import {DEFAULT_MARKER, mainMarker} from './map.js';
import { selectFilters, checkboxFilters } from './filter.js';
import { changeMarkers } from './main.js';

const offerForm = document.querySelector ('.ad-form');
const allForms = document.querySelectorAll('form');
const resetButton = document.querySelector('.ad-form__reset');
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

const clearAll = () => {
  allForms.forEach((form) => form.reset());
  selectFilters.forEach ((filter) => filter.value = 'any');
  checkboxFilters.forEach((filter) => filter.removeAttribute('checked'));
  mainMarker.setLatLng(DEFAULT_MARKER);
  changeMarkers();
};


const onMessageClick = () => {
  if (document.body.lastChild === errorMessage) {
    closeErrorMessage();
  } else if (document.body.lastChild === successMessage) {
    closeSuccessMessage();
  }
};

const addListenerClick = () => document.addEventListener('click', onMessageClick);

const onDocumentEscKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    if (document.body.lastChild === errorMessage) {
      closeErrorMessage();
    } else if (document.body.lastChild === successMessage) {
      closeSuccessMessage();
    }
  }
};

const addListenerEscKeydown = () => document.addEventListener('keydown', onDocumentEscKeydown);

const onErrorButtonClick = () => {
  closeErrorMessage();
};

const addErrorButtonClickListener = () =>  errorButton.addEventListener('click', onErrorButtonClick);

const removeAllListeners =() => {
  document.removeEventListener('click', onMessageClick);
  document.removeEventListener('keydown', onDocumentEscKeydown);
  errorButton.removeEventListener('click', onErrorButtonClick);
};

function closeErrorMessage  () {
  errorMessage.remove();
  removeAllListeners();
}

function closeSuccessMessage () {
  successMessage.remove();
  removeAllListeners();
}

const showErrorMessage = () => {
  document.body.appendChild(errorMessage);
  addErrorButtonClickListener ();
  addListenerClick ();
  addListenerEscKeydown ();
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
  addListenerClick ();
  addListenerEscKeydown ();
};

setOfferFormSubmit(showSuccesMessage);

resetButton.addEventListener('click', clearAll);

export {makeAllAktive, makeAllDisabled};

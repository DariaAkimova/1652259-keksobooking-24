import {DEFAULT_MARKER, mainMarker} from './map.js';

const SERVER_LINK = 'https://24.javascript.pages.academy/keksobooking';
const offerForm = document.querySelector ('.ad-form');
const allForms = document.querySelectorAll('form');
const successMessageTemplate = document.querySelector('#success');
const successMessageFragment = successMessageTemplate.cloneNode(true).content;
const successMessage = successMessageFragment.querySelector('.success');
const errorMessageTemplate = document.querySelector('#error');
const errorMessageFragment = errorMessageTemplate.cloneNode(true).content;
const errorMessage = errorMessageFragment.querySelector('.error');
const errorButton = errorMessage.querySelector('.error__button');

const getData = (onSuccess, onFail) => {
  fetch (`${SERVER_LINK}/data`)
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
    SERVER_LINK,
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

const closeMessage = (messageElement) => {
  messageElement.remove();
};

const onMessageClick = (openedMessage) => {
  document.addEventListener('click', () => {
    closeMessage(openedMessage);
  });
};

const onDocumentEscKeydown = (openedMessage) => {
  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      closeMessage(openedMessage);
    }
  });
};

const showErrorMessage = () => {
  document.body.appendChild(errorMessage);
  errorButton.addEventListener('click', () => closeMessage(errorMessage));
  onMessageClick (errorMessage);
  onDocumentEscKeydown (errorMessage);
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
  onMessageClick (successMessage);
  onDocumentEscKeydown (successMessage);
};

setOfferFormSubmit(showSuccesMessage);


export {getData};

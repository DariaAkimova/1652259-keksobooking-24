const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MAX_PRICE = 1000000;
const titleInput = document.querySelector('#title');
const priceInput = document.querySelector('#price');
const roomsList  = document.querySelector('#room_number');
const capacityList  = document.querySelector('#capacity');
const capacityOptions = capacityList.querySelectorAll('option');
const guests = capacityList.querySelectorAll('option');
const infoForm = document.querySelector('.ad-form');
const formFieldsets = infoForm.querySelectorAll('fieldset');
const mapFiltersForm = document.querySelector('.map__filters');
const allFilters = mapFiltersForm.querySelectorAll('select');

const makeAllDisabled = () => {
  infoForm.classList.add('ad-form--disabled');
  formFieldsets.forEach((fieldset)=> fieldset.setAttribute('disabled','true'));
  mapFiltersForm.classList.add('ad-form--disabled');
  allFilters.forEach((filter)=> filter.setAttribute('disabled','true'));
};

makeAllDisabled();

const makeAllAktive = () => {
  infoForm.classList.remove('ad-form--disabled');
  formFieldsets.forEach((fieldset)=> fieldset.removeAttribute('disabled'));
  mapFiltersForm.classList.remove('ad-form--disabled');
  allFilters.forEach((filter)=> filter.removeAttribute('disabled'));
};

titleInput.addEventListener('input', ()=> {
  const titleLength = titleInput.value.length;

  if (titleLength < MIN_TITLE_LENGTH) {
    titleInput.setCustomValidity(`Необхоимо ввести еще ${MIN_TITLE_LENGTH - titleLength} символов`);
  }  else if (titleLength > MAX_TITLE_LENGTH) {
    titleInput.setCustomValidity(`Удалите лишние ${titleLength - MAX_TITLE_LENGTH} символов`);
  }  else {
    titleInput.setCustomValidity('');
  }
  titleInput.reportValidity();
});

priceInput.addEventListener('input', () => {
  const price = priceInput.value;
  if (price > MAX_PRICE) {
    priceInput.setCustomValidity (`Цена за ночь не может превышать ${MAX_PRICE}`);
  } else {
    priceInput.setCustomValidity('');
  }
  priceInput.reportValidity();
});

const makeDisabled = (element, condition) =>  {
  if (condition){
    element.classList.add('hidden');
    capacityOptions.forEach ((option) => {
      if (option.value !== roomsList.value) {
        option.removeAttribute('selected');
      } else if (option.value === roomsList.value || (roomsList.value === '100' && option.value === '0')) {
        option.setAttribute('selected', 'true');
      }
    });
  } else {
    element.classList.remove('hidden');

  }
};
const getRoomGuestsRelation = () => {

  switch (roomsList.value)
  {
    case '1':
      guests.forEach((guestsItem)=> makeDisabled (guestsItem, guestsItem.value !=='1'));
      break;
    case '2':
      guests.forEach((guestsItem)=> makeDisabled (guestsItem, guestsItem.value !=='1' && guestsItem.value !=='2'));

      break;
    case '3':
      guests.forEach((guestsItem)=> makeDisabled (guestsItem, guestsItem.value ==='0'));

      break;
    case '100':
      guests.forEach((guestsItem)=> makeDisabled (guestsItem, guestsItem.value !=='0'));
  }

};

roomsList.addEventListener('change', getRoomGuestsRelation);


export {makeAllAktive};

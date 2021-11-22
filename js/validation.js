const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MAX_PRICE = 1000000;
const titleInput = document.querySelector('#title');
const typeForm = document.querySelector('#type');
const priceInput = document.querySelector('#price');
const roomsList  = document.querySelector('#room_number');
const capacityList  = document.querySelector('#capacity');
const capacityOptions = capacityList.querySelectorAll('option');
const timeIn = document.querySelector ('#timein');
const timeOut = document.querySelector ('#timeout');
const minPriceBungalow = '0';
const minPriceFlat = '1000';
const minPriceHotel = '3000';
const minPriceHouse = '5000';
const minPricePalace = '10000';


const hideOption = (element, condition) => {
  if (condition) {
    element.classList.add('hidden');
  } else {
    element.classList.remove('hidden');
  }
};

const getRoomGuestsRelation = () => {
  switch (roomsList.value) {
    case '1':
      capacityOptions.forEach((capacityOption) =>
        hideOption(capacityOption, capacityOption.value !== '1'),
      );
      break;
    case '2':
      capacityOptions.forEach((capacityOption) =>
        hideOption(capacityOption, !['1', '2'].includes(capacityOption.value)),
      );

      break;
    case '3':
      capacityOptions.forEach((capacityOption) =>
        hideOption(capacityOption, capacityOptions.value === '0'),
      );

      break;
    case '100':
      capacityOptions.forEach((capacityOption) =>
        hideOption(capacityOption, capacityOption.value !== '0'),
      );
  }

  capacityList.value = capacityList.querySelector('option:not(.hidden)').value;
};


const changeMinPriceByType = () => {
  priceInput.value = '';
  let minPriceValue;
  switch (typeForm.value)  {
    case 'bungalow':
      minPriceValue = minPriceBungalow;
      break;
    case 'flat':
      minPriceValue = minPriceFlat;
      break;
    case 'hotel':
      minPriceValue = minPriceHotel;
      break;
    case 'house':
      minPriceValue = minPriceHouse;
      break;
    case 'palace':
      minPriceValue = minPricePalace;
      break;
  }
  priceInput.placeholder = minPriceValue;
  priceInput.min = minPriceValue;
};

const changeTimeIn = () => timeIn.value = timeOut.value;

const changeTimeOut = () => timeOut.value = timeIn.value;

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

typeForm.addEventListener('change', changeMinPriceByType);

priceInput.addEventListener('input', () => {
  const price = priceInput.value;
  if (price > MAX_PRICE) {
    priceInput.setCustomValidity (`Цена за ночь не может превышать ${MAX_PRICE} ₽/ночь`);
  } else if (typeForm.value === 'flat' && price < 1000) {
    priceInput.setCustomValidity ('Цена за ночь не может быть ниже 1000₽/ночь');
  } else if (price < priceInput.min) {
    priceInput.setCustomValidity (`Цена за ночь не может быть ниже ${priceInput.min}₽/ночь`);
  } else {
    priceInput.setCustomValidity('');
  }
  priceInput.reportValidity();
});


roomsList.addEventListener('change', getRoomGuestsRelation);

timeOut.addEventListener('change', changeTimeIn);

timeIn.addEventListener('change', changeTimeOut);


export {priceInput, minPriceFlat};

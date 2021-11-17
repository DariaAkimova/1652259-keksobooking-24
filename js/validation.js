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

const hideOption = (element, condition) =>  {
  if (condition){
    element.classList.add('hidden');
    capacityOptions.forEach ((option) => {
      if ((option.value !== roomsList.value) && (option.value !== '0' && roomsList.value !== '100'))
      {
        option.removeAttribute('selected');
      } else if ((option.value === roomsList.value) || (option.value === '0' && roomsList.value === '100'))
      {
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
      capacityOptions.forEach((capacityOption)=> hideOption (capacityOption, capacityOption.value !=='1'));
      break;
    case '2':
      capacityOptions.forEach((capacityOption)=> hideOption (capacityOption, capacityOption.value !=='1' && capacityOption.value !=='2'));

      break;
    case '3':
      capacityOptions.forEach((capacityOption)=> hideOption (capacityOption, capacityOption.value ==='0'));

      break;
    case '100':
      capacityOptions.forEach((capacityOption)=> hideOption (capacityOption, capacityOption.value !=='0'));
  }

};

const changeMinPriceByType = () => {
  priceInput.value = '';
  let minPriceValue;
  switch (typeForm.value)  {
    case 'bungalow':
      minPriceValue = '0';
      break;
    case 'flat':
      minPriceValue = '1000';
      break;
    case 'hotel':
      minPriceValue = '3000';
      break;
    case 'house':
      minPriceValue = '5000';
      break;
    case 'palace':
      minPriceValue = '10000';
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



const titleInput = document.querySelector('#title');
const priceInput = document.querySelector('#price');
const roomsList  = document.querySelector('#room_number');
const capacityList  = document.querySelector('#capacity');
const guests = capacityList.querySelectorAll('option');
const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MAX_PRICE = 1000000;

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
  } else {
    element.classList.remove('hidden');
  }
};
const getRoomGuestsRelation = () => {
  capacityList.value = '';
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



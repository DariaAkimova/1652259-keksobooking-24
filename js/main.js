/* eslint-disable no-unused-vars */
/* eslint-disable prefer-template */
/* eslint-disable no-console */
function getRandomInt(from, to) {
  if (from < 0 || to <0) {
    return;
  }
  if (from === to) {
    console.log ('Единственное возможное значение: ' + from);
  } else if (from >to ) {
    [from, to]=[to,from];
  }
  from = Math.ceil(from);
  to = Math.floor(to);
  console.log (Math.floor(Math.random() * (to - from + 1)) + from);
}
getRandomInt();


function getRandomNumber(from, to, digits) {
  if (from < 0 || to <0){
    return;
  }
  if (from === to) {
    console.log ('Единственное возможное значение: ' + from);
  } else if (from >to ) {
    [from, to]=[to,from];
  }
  const randomNumber = Math.random() * (to - from) + from;
  console.log (+randomNumber.toFixed(digits));

}
getRandomNumber();


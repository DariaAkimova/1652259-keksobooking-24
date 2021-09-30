/* eslint-disable prefer-template */
/* eslint-disable no-console */
function getRandomInt(from, to) {
  if (from < 0) {
    return;
  }
  if (from < to) {
    from = Math.ceil(from);
    to = Math.floor(to);
    console.log (Math.floor(Math.random() * (to - from + 1)) + from);
  } else if (from >to ) {
    [from, to]=[to,from];
    from = Math.ceil(from);
    to = Math.floor(to);
    console.log (Math.floor(Math.random() * (to - from + 1)) + from);
  } else {
    console.log ('Единственное возможное значение: ' + from);
  }
}
getRandomInt();


function getRandomNumber(from, to) {
  if (from < 0){
    return;
  }
  if (from < to) {
    console.log (Math.random() * (to - from) + from);
  } else if (from >to ) {
    [from, to]=[to,from];
    return (Math.random() * (to - from) + from);
  } else {
    console.log ('Единственное возможное значение: ' + from);
  }
}
getRandomNumber();

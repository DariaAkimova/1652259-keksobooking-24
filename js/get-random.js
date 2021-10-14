const getRandomInt = (from, to) => {
  if (from < 0 || to <0) {
    return;
  }
  if (from >to ) {
    [from, to]=[to,from];
  }
  from = Math.ceil(from);
  to = Math.floor(to);
  return (Math.floor(Math.random() * (to - from + 1)) + from);
};

const getRandomNumber = (from, to, digits) => {
  if (from < 0 || to <0){
    return;
  }
  if (from >to ) {
    [from, to]=[to,from];
  }
  const randomNumber = Math.random() * (to - from) + from;
  return +randomNumber.toFixed(digits);
};

export {getRandomInt, getRandomNumber};

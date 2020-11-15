const MILISECONDS_IN_ONE_DAY = 24 * 60 * 60 * 1000;

let currentDate = new Date();

function daysTillChristmas(date) {
  let christmasDate = date.getMonth() == 11 && date.getDate() > 25 ? new Date(date.getFullYear() + 1, 11, 25) : new Date(date.getFullYear(), 11, 25);

  return parseInt((christmasDate.getTime() - date.getTime()) / MILISECONDS_IN_ONE_DAY);
}

let days = daysTillChristmas(currentDate);
console.log(days);
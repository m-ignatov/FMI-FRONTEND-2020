const CUSTOM_DATE = "12/8/2018";
const CUSTOM_HOUR = "21";
const CUSTOM_MINUTES = "00";
const CUSTOM_SECONDS = "00";

const CUSTOM_DAYS_MAP = {
  0: "неделя",
  1: "понеделник",
  2: "вторник",
  3: "сряда",
  4: "четвъртък",
  5: "петък",
  6: "събота"
};

let arrayOfDates = [new Date()];
let customDate = new Date(CUSTOM_DATE);
customDate.setHours(CUSTOM_HOUR, CUSTOM_MINUTES, CUSTOM_SECONDS);
arrayOfDates.push(customDate);

let customDateFormating = arrayOfDates.map(date => {
  let dateToString = date.getDate().toString() + "." + (date.getMonth() + 1).toString() + "." + date.getFullYear().toString();
  return dateToString;
})

let datesDay = arrayOfDates.map(date => {
  let maxDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  return [maxDay.getDate(), date.getDay()];
});

function appendLeadingZeroes(n) {
  if (n <= 9) {
    return "0" + n.toString();
  }
  return n.toString();
}

function joinDateInformation(customDateFormating, datesDay) {
  let result = [];
  for (let dateIndex in customDateFormating) {
    let dateInformation = "Дата: " + customDateFormating[dateIndex] +
      ", час: " + appendLeadingZeroes(arrayOfDates[dateIndex].getHours()) +
      ":" + appendLeadingZeroes(arrayOfDates[dateIndex].getMinutes().toString()) +
      ":" + appendLeadingZeroes(arrayOfDates[dateIndex].getSeconds()) +
      ", " + CUSTOM_DAYS_MAP[datesDay[dateIndex][1]] +
      ", " + datesDay[dateIndex][0].toString();
    result.push(dateInformation);
  }
  return result;
}

let joinInformation = joinDateInformation(customDateFormating, datesDay);

console.log(customDateFormating);
console.log(datesDay);
console.log(joinInformation);
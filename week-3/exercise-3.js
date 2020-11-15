let arrayHasFifty = [0, 50];
let arraySumIsFifty = [20, 3, 17, 10];
let arraySumLessThanFifty = [10, 23, 7];

function hasFifty(array) {
  for (let element of array) {
    if (element === 50) {
      return true;
    }
  }
  return false;
}

function isSumEqualToFifty(array) {
  let sum = 0;
  array.forEach(element => {
    sum += element;
  });

  return sum == 50 ? { "isEqualToFifty": true } : { "isEqualToFifty": false, "lessThanFifty:": 50 - sum };
}

function checkFunction(array) {
  let result = {};

  result = isSumEqualToFifty(array);
  result["hasFifty"] = hasFifty(array);

  return result;
}

console.log(checkFunction(arrayHasFifty));
console.log(checkFunction(arraySumIsFifty));
console.log(checkFunction(arraySumLessThanFifty));
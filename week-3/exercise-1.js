let array = [10, 5, 13, 18, 51];

function printArray(array) {
  array.forEach(element => console.log(element));
}

// ===

let arrayB = [];

function getEvenNumbers(array) {
  return array.map(element => element * 2);;
}

arrayB = getEvenNumbers(array);
console.log(arrayB);

// ===

function filterArray(array) {
  return array.filter(element => element % 2 == 0);
}

let filteredArray = filterArray(array);
console.log(filterArray);

// ===

function hasSmallerThanTenElement(array) {
  for (let element of array) {
    if (element < 10) {
      return true;
    }
  }
  return false;
}

hasSmallerThanTenElement(array);

// ===

function getAllMultiplesOfThreeElements(array) {
  let result = [];
  array.forEach(element => {
    if (element % 3 == 0) {
      result.push(element);
    }
  });
  return result;
}

let multiplesOfThreeElements = getAllMultiplesOfThreeElements(array);
console.log(multiplesOfThreeElements);

// ===

const reducer = (sum, currentValue) => sum + currentValue;

function reduceArray(array) {
  return array.reduce(reducer);
}

let result = reduceArray(array);
console.log(result);

// ===

function getLastTwoElements(array) {
  return array.length > 1 ? array.slice(array.length - 2) : array;
}

let result = getLastTwoElements(array);
console.log(result);

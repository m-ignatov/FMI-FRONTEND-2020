function Person(salary) {
  _salary = salary;

  this.getSalary = function getSalary() {
    return _salary;
  }
};

const person = new Person(1000);
console.log(person.getSalary());
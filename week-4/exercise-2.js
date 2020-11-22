class Person {
    constructor(name) {
        this.name = name;
    }

    greeting() {
        console.log(`Здравей ${this.name} от планетата ${this.planet}!`);
    }
}

Person.prototype.planet = "Земя";

let person = new Person("Ivan");

console.log(person.greeting());
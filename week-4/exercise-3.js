class Item {
    constructor(name, discount) {
      this.name = name;
      this.discount = discount;
      this.price = this.getPrice();
    }

    calculate() {
        return this.price - (this.price * this.discount) / 100;
    }
}

Item.price = 1000;
Item.prototype.getPrice = function() {
    return Item.price;
}

const phone = new Item("phone", 15);
const price = phone.calculate();
console.log(price);
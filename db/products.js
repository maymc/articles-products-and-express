class Products {
  constructor() {
    this._count = 1;
    this._productStorage = [];
    this.add({
      name: 'Coffee Candy',
      price: 3.12,
      inventory: 28
    });
    this.add({
      name: 'NutterButter',
      price: 8.56,
      inventory: 20
    });
    this.add({
      name: 'Chocolate Chip Cookie',
      price: 2.58,
      inventory: 4
    });
  }

  //Methods
  all() {
    return [...this._productStorage];
  }

  getProductById(id) {

    let filteredArray = this._productStorage.filter(element => id == element.id)[0];
    //console.log("filteredArray:", filteredArray);
    return filteredArray;
  }

  removeProductById(id) {
    let removedProduct = null;
    console.log("\nproductStorage before remove:\n", this._productStorage);
    this._productStorage.forEach((element, index) => {
      if (element.id === Number(id)) {
        removedProduct = this._productStorage.splice(index, 1);
      }
    });
    console.log("\nproductStorage after remove:\n", this._productStorage);

    return removedProduct;
  }

  add(product) {
    product.id = this._count;
    this._productStorage.push(product);
    this._count++;
    return product.id;
  }

}

module.exports = Products;
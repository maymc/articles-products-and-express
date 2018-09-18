class Products {
  constructor() {
    this.knex = require('../knex/knex.js');

    this._count = 1;  //for id
    // this._productStorage = [];  //hardcoded data storage

    //Pre-added product items
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

  //Display all products in storage
  all() {
    return this.knex.raw('SELECT * FROM product_items');
  }

  //Display a specific product based on its ID
  getProductById(id) {
    console.log("GET product @ id:", id);
    return this.knex.raw(`SELECT * FROM product_items WHERE id = ${id}`);
  }

  //Add a new product to storage
  add(product) {
    product.id = this._count;
    this._count++;
    console.log("ADDing product:\n", product);
    return this.knex.raw(`INSERT INTO product_items (name, price, inventory) VALUES ('${product.name}', '${product.price}', '${product.inventory}')`);
  }

  //Update product by its id
  updateProduct(id, product) {
    console.log("UPDATE - User selected id:", id);
    console.log("UPDATE - New product info:", product);
    return this.knex.raw(`UPDATE product_items SET name = '${product.name}', price = '${product.price}', inventory = '${product.inventory}' WHERE id = ${id}`);
  }

  //Remove a specific product based on its ID
  removeProductById(id) {
    console.log("REMOVE this product, id:", id);
    return this.knex.raw(`DELETE FROM product_items WHERE id = ${id}`);
  }
}

module.exports = Products;
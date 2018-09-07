//Route object that we can route our objects into
const express = require('express');
const Router = express.Router();

const Products = require('../db/products.js');
const DB_Products = new Products();

let addingProductError = false;

////////////////////////////////////////////////////////////////////////
//Product routes below will output HTML generated from TEMPLATE ENGINE//
////////////////////////////////////////////////////////////////////////

//GET '/products/new'; creates a new product
Router.get("/products/new", (req, res) => {
  console.log("\nThis is GET /products/new - new.hbs");
  const addingProduct = true;
  res.render("new", { addingProduct });
});

//GET '/products/:id/edit'; user can update information for a product
Router.get("/products/:id/edit", (req, res) => {
  console.log("\nThis is GET products - edit");
  //console.log(req.params);
  const { id } = req.params;
  console.log("ID for edit:", id);
  const editProductItem = DB_Products.getProductById(id);
  res.render("edit", { editProductItem });
});

//GET '/products/:id'; displays the selected product's info with the corresponding ID
Router.get("/products/:id", (req, res) => {
  console.log("\nThis is GET /products/:id - product.hbs");
  //console.log("req.params:", req.params);
  const { id } = req.params;
  console.log("id:", id);
  const selectedProductItem = DB_Products.getProductById(id);
  console.log("selectedProductItem:\n", selectedProductItem);
  res.render("product", selectedProductItem);
});

//GET '/products'; displays all Products add thus far
Router.get("/products", (req, res) => {
  console.log("\nThis is GET /products - index.hbs");
  const productItems = DB_Products.all();
  console.log("productItems:\n", productItems);
  res.render('index', { productItems });
});

//////////////////
//Product Routes//
//////////////////

//POST '/products'
Router.post("/products", (req, res) => {
  console.log("\nreq.body:\n", req.body);
  if (req.body.name !== "" && req.body.price !== "" && req.body.inventory !== "") {
    addingError = false;
    req.body.price = Number(req.body.price);
    req.body.inventory = Number(req.body.inventory);
    const newProductItem = req.body;
    DB_Products.add(newProductItem);
    res.redirect("/products");
  }
  else {
    addingProductError = true;
    res.render("new", { addingProductError });
  }
});

//PUT '/products/:id'
Router.put("/products/:id", (req, res) => {
  console.log("\nreq.body @ products PUT:\n", req.body);
  console.log("req.params:", req.params);
  const { id } = req.params;
  let productToEdit = DB_Products.getProductById(id);
  console.log("\nproductToEdit:\n", productToEdit);
  if (req.body.name === "" || req.body.price === "" || req.body.inventory === "") {
    res.render("edit", { productToEdit });
  }
  else {
    if (req.body.name !== productToEdit.name) {
      productToEdit.name = req.body.name;
    }
    if (req.body.price !== productToEdit.price) {
      productToEdit.price = req.body.price;
    }
    if (req.body.inventory !== productToEdit.inventory) {
      productToEdit.inventory = req.body.inventory;
    }
    res.redirect(`/products/${id}`);
  }
});

//DELETE '/products/:id'
Router.delete("/products/:id", (req, res) => {
  console.log("\nThis is DELETE for products.");
  console.log("req.params:", req.params);
  const { id } = req.params;
  //Find the product in storage and remove it
  let deletedProduct = DB_Products.removeProductById(id);
  console.log("\nCheck deletedProduct:", deletedProduct);
  console.log("\nCheck remaining products:\n", DB_Products.all());

  res.redirect('/products');
});

module.exports = Router;
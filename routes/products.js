//Route object that we can route our objects into
const express = require('express');
const Router = express.Router();

//Hardcoded database for products
const Products = require('../db/products.js');
const DB_Products = new Products();

//Error flag for adding a product
let isAddingProductError = false;

//////////////////////////////////////////
//Product routes below will output HTML //
//////////////////////////////////////////

//GET '/products/new'; creates a new product
Router.get("/products/new", (req, res) => {
  console.log("\nThis is GET /products/new - new.hbs");
  let isAddingProduct = true;
  res.render("new", { isAddingProduct });
});

//GET '/products/:id/edit'; user can update information for a product
Router.get("/products/:id/edit", (req, res) => {
  console.log("\nThis is GET products - edit");
  const { id } = req.params;
  console.log("ID for edit:", id);
  DB_Products.getProductById(id)
    .then(results => {
      const editProductItem = results.rows[0];
      console.log("editProductItem:", editProductItem);
      res.render("edit", { editProductItem });
    })
    .catch(err => {
      console.log("EDIT - product error:", err);
    });

});

//GET '/products/:id'; displays the selected product's info with the corresponding ID
Router.get("/products/:id", (req, res) => {
  console.log("\nThis is GET /products/:id - product.hbs");
  const { id } = req.params;
  console.log("GETTing id:", id);

  DB_Products.getProductById(id)
    .then(results => {
      const selectedProductItem = results.rows[0];
      console.log("selectedProductItem:", selectedProductItem);
      res.render("product", selectedProductItem);
    })
    .catch(err => {
      console.log("GET - id error:", err);
    });
});

//GET '/products'; displays all Products added thus far
Router.get("/products", (req, res) => {
  console.log("\nThis is GET /products - index.hbs");
  DB_Products.all()
    .then(results => {
      const productItems = results.rows;
      console.log("productItems:\n ", productItems);
      res.render('index', { productItems });
    })
    .catch(err => {
      console.log('GET all products error:', err);
    });

});

//////////////////
//Product Routes//
//////////////////

//POST '/products'
Router.post("/products", (req, res) => {
  console.log("\nreq.body:\n", req.body);
  if (req.body.name !== "" && req.body.price !== "" && req.body.inventory !== "") {
    req.body.price = Number(req.body.price);
    req.body.inventory = Number(req.body.inventory);
    const newProductItem = req.body;
    DB_Products.add(newProductItem)
      .then(() => {
        res.redirect("/products");
      })
      .catch(err => {
        console.log("POST product error:", err);
      })
  }
  else {
    isAddingProductError = true;
    res.render("new", { isAddingProductError });
  }
});

//PUT '/products/:id'
Router.put("/products/:id", (req, res) => {
  console.log("\nPUT - req.body @ products:\n", req.body);
  console.log("PUT - req.params:", req.params);
  const { id } = req.params;

  if (req.body.name === "" || req.body.price === "" || req.body.inventory === "") {
    DB_Products.getProductById(id)
      .then(results => {
        let productToEdit = results.rows[0];
        console.log("productToEdit:", productToEdit);
        res.render("edit", { productToEdit });
      })
      .catch(err => {
        console.log("PUT - products error:", err);
      });
  }
  else {
    DB_Products.updateProduct(id, req.body)
      .then(() => {
        res.redirect(`/products/${id}`);
      })
      .catch(err => {
        console.log("PUT - product error:", err);
      });
  }
});

//DELETE '/products/:id'
Router.delete("/products/:id", (req, res) => {
  console.log("\nThis is DELETE for products.");
  console.log("DELETE - req.params:", req.params);
  const { id } = req.params;

  DB_Products.removeProductById(id)
    .then(() => {
      res.redirect('/products');
    })
    .catch(err => {
      console.log("DELETE error:", err);
    });
});

module.exports = Router;
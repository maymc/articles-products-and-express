const express = require('express');
const app = express();
const PORT = process.env.PORT || 8002;
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');


const Products = require('./db/products.js');
const DB_Products = new Products();
const Articles = require('./db/articles.js');
const DB_Articles = new Articles();

// let error = {
//   errorFlag: true,
//   errMsg: "Error with submitting. Please fill in all fields and try again."
// }

//Tells Express to use a static directory that we define as the location to look for requests
app.use(express.static("public"));

//For parsing application/x-www-form-urlencoded. Returns the already parsed information/object as "req.body".
app.use(bodyParser.urlencoded({ extended: true }));

//Creates a super simple Express app; basic way to register a Handlebars view engine
app.engine('.hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }));
app.set('view engine', '.hbs');

//Setup for method override
app.use(methodOverride('_method'));

/////////////////////////////////////////

//Render all products
app.get("/", (req, res) => {
  const allProducts = DB_Products.all();
  const allArticles = DB_Articles.all();
  console.log("\nProducts:\n", allProducts);
  console.log("\nArticles:\n", allArticles);
  res.render("home", { allProducts, allArticles });
});

/////////////////////////////////////////

////////////////////////////////////////////////////////////////////////
//Product routes below will output HTML generated from TEMPLATE ENGINE//
////////////////////////////////////////////////////////////////////////

//GET '/products/new'; creates a new product
app.get("/products/new", (req, res) => {
  console.log("\nThis is GET /products/new - new.hbs");
  res.render("new");
});

//GET '/products/:id/edit'; user can update information for a product >>>NOT DONE<<<<
app.get("/products/:id/edit", (req, res) => {
  console.log("\nThis is GET products - edit");
  //responds with HTML generated form templates. HTML should contain a form with values already prefilled? so that a user can update the information for a product. The form points to your server's route for editing a product.
  //console.log(req.params);
  const { id } = req.params;
  console.log("ID for edit:", id);
  const editProductItem = DB_Products.getProductById(id);
  res.render("edit", editProductItem);
});

//GET '/products/:id'; displays the selected product's info with the corresponding ID
app.get("/products/:id", (req, res) => {
  console.log("\nThis is GET /products/:id - product.hbs");
  //console.log("req.params:", req.params);
  const { id } = req.params;
  console.log("id:", id);
  const selectedProductItem = DB_Products.getProductById(id);
  console.log("\nselectedProductItem:\n", selectedProductItem);
  res.render("product", selectedProductItem);
});

//GET '/products'; displays all Products add thus far
app.get("/products", (req, res) => {
  console.log("\nThis is GET /products - index.hbs");
  const productItems = DB_Products.all();
  console.log("productItems:\n", productItems);
  res.render('index', { productItems });
});

//////////////////
//Product Routes//
//////////////////

//POST '/products'
app.post("/products", (req, res) => {
  console.log("\nreq.body:\n", req.body);
  if (req.body.name !== "" && req.body.price !== "" && req.body.inventory !== "") {
    req.body.price = Number(req.body.price);
    req.body.inventory = Number(req.body.inventory);
    const newProductItem = req.body;
    DB_Products.add(newProductItem);
    res.redirect("/products");
  }
  // else {
  //   res.redirect("/products/new", error);
  // }
});

//PUT '/products/:id'
app.put("/products/:id", (req, res) => {
  console.log("\nreq.body @ products PUT:\n", req.body);
  console.log("req.params:", req.params);
  const { id } = req.params;
  let productToEdit = DB_Products.getProductById(id);
  console.log("\nproductToEdit:\n", productToEdit);
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
});

//DELETE '/products/:id'
app.delete("/products/:id", (req, res) => {

});

///////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////
//Article routes below will output HTML generated from our TEMPLATES //
////////////////////////////////////////////////////////////////////////

//GET '/articles/new'
app.get("/articles/new", (req, res) => {
  console.log("\nThis is GET /articles/new - new.hbs");
  res.render("new");
});

//GET '/articles/:title/edit'
app.get("/articles/:title/edit", (req, res) => {
  console.log("\nThis is GET articles - edit");
  //console.log("req.params:", req.params);
  const { title } = req.params;
  console.log("Title for edit:", title);
  const editArticleItem = DB_Articles.getArticleByTitle(title);
  res.render("edit", editArticleItem);
});

//GET '/articles/:title'
app.get("/articles/:title", (req, res) => {
  console.log("\nThis is GET /articles/:title - articles.hbs");
  //console.log("req.params:", req.params);
  const { title } = req.params;
  console.log("title:", title);
  const selectedArticleItem = DB_Articles.getArticleByTitle(title);
  console.log("\nselectedArticleItem:\n", selectedArticleItem);
  res.render("article", selectedArticleItem);

});

//GET '/articles'
app.get("/articles", (req, res) => {
  console.log("\nThis is GET /articles - index.hbs");
  const articleItems = DB_Articles.all();
  console.log("articleItems:\n", articleItems);
  res.render('index', { articleItems });
});

//////////////////
//Article Routes//
//////////////////

//POST '/articles'
app.post("/articles", (req, res) => {
  console.log("\nreq.body:\n", req.body);
  if (req.body.title !== "" && req.body.body !== "" && req.body.author !== "") {
    const newArticleItem = req.body;
    DB_Articles.add(newArticleItem);
    res.redirect("/articles");
  }
});

//PUT '/articles/:title'
app.put("/articles/:title", (req, res) => {
  console.log("\nreq.body @ articles PUT:\n", req.body);
  console.log("req.params:", req.params);



});

//DELETE '/articles/:title'
app.delete("/articles/:title", (req, res) => {

});











app.listen(PORT, () => {
  console.log(`Started app on port: ${PORT}`);
});
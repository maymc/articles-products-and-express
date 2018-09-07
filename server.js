const express = require('express');
const app = express();
const PORT = process.env.PORT || 8002;
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');

const productRoutes = require('./routes/products.js');
const articleRoutes = require('./routes/articles.js');

const Products = require('./db/products.js');
const DB_Products = new Products();
const Articles = require('./db/articles.js');
const DB_Articles = new Articles();

//Tells Express to use a static directory that we define as the location to look for requests
app.use(express.static("public"));

//For parsing application/x-www-form-urlencoded. Returns the already parsed information/object as "req.body".
app.use(bodyParser.urlencoded({ extended: true }));

//Creates a super simple Express app; basic way to register a Handlebars view engine
app.engine('.hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }));
app.set('view engine', '.hbs');

//Setup for method-override
app.use(methodOverride('_method'));

/////////////////////////////////////////

//Render all products and articles; a homepage
app.get("/", (req, res) => {
  const allProducts = DB_Products.all();
  const allArticles = DB_Articles.all();
  console.log("\nProducts:\n", allProducts);
  console.log("\nArticles:\n", allArticles);
  res.render("home", { allProducts, allArticles });
});

//Using Express router to access products and articles routes
app.use('/', productRoutes);
app.use('/', articleRoutes);

app.listen(PORT, () => {
  console.log(`Started app on port: ${PORT}`);
});
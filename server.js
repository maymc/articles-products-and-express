const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');

//Routes setup for products and articles
const productRoutes = require('./routes/products.js');
const articleRoutes = require('./routes/articles.js');

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
  console.log("Rendering homepage...");
  res.render("home");
});

//Using Express router to access products and articles routes
app.use('/', productRoutes);
app.use('/', articleRoutes);

//Server is listening
app.listen(process.env.EXPRESS_CONTAINER_PORT, () => {
  console.log(`Started app on port: ${process.env.EXPRESS_CONTAINER_PORT}`);
});
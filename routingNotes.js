//Another meaning of routing that can be confusing
//app.get(), etc is routing but there is another type of routing to use
//http://expressjs.com/en/4x/api.html#router

//create a separate file for all your product routes and your articles routes
//refactor all product routes into `route.js` file

//import it using:
const ItemRoutes = require('./routes/articles')

//If you put /item instead of / then it will add 'item' before your 
app.use('/item', ItemRoutes);
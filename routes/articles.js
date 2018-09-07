//Route object that we can route our objects into
const express = require('express');
const Router = express.Router();

const Articles = require('../db/articles.js');
const DB_Articles = new Articles();

let addingArticleError = false;

////////////////////////////////////////////////////////////////////////
//Article routes below will output HTML generated from our TEMPLATES //
////////////////////////////////////////////////////////////////////////

//GET '/articles/new'
Router.get("/articles/new", (req, res) => {
  console.log("\nThis is GET /articles/new - new.hbs");
  const addingArticle = true;
  res.render("new", { addingArticle });
});

//GET '/articles/:title/edit'
Router.get("/articles/:title/edit", (req, res) => {
  console.log("\nThis is GET articles - edit");
  //console.log("req.params:", req.params);
  const { title } = req.params;
  console.log("Title for edit:", title);
  const editArticleItem = DB_Articles.getArticleByTitle(title);
  res.render("edit", { editArticleItem });
});

//GET '/articles/:title'
Router.get("/articles/:title", (req, res) => {
  console.log("\nThis is GET /articles/:title - articles.hbs");
  //console.log("req.params:", req.params);
  const { title } = req.params;
  console.log("title:", title);
  const selectedArticleItem = DB_Articles.getArticleByTitle(title);
  console.log("\nselectedArticleItem:\n", selectedArticleItem);
  res.render("article", selectedArticleItem);

});

//GET '/articles'
Router.get("/articles", (req, res) => {
  console.log("\nThis is GET /articles - index.hbs");
  const articleItems = DB_Articles.all();
  console.log("articleItems:\n", articleItems);
  res.render('index', { articleItems });
});

//////////////////
//Article Routes//
//////////////////

//POST '/articles'
Router.post("/articles", (req, res) => {
  console.log("\nreq.body:\n", req.body);
  if (req.body.title !== "" && req.body.body !== "" && req.body.author !== "") {
    const newArticleItem = req.body;
    DB_Articles.add(newArticleItem);
    res.redirect("/articles");
  }
  else {
    addingArticleError = true;
    res.render("new", { addingArticleError });
  }
});

//PUT '/articles/:title'
Router.put("/articles/:title", (req, res) => {
  console.log("\nreq.body @ articles PUT:\n", req.body);
  console.log("req.params:", req.params);
  const { title } = req.params;
  let articleToEdit = DB_Articles.getArticleByTitle(title);
  console.log("\narticleToEdit:\n", articleToEdit);
  if (req.body.title === "" || req.body.body === "" || req.body.author === "") {
    res.render("edit", { articleToEdit });
  }
  else {
    if (req.body.title !== articleToEdit.title) {
      articleToEdit.title = req.body.title;
    }
    if (req.body.body !== articleToEdit.body) {
      articleToEdit.body = req.body.body;
    }
    if (req.body.author !== articleToEdit.author) {
      articleToEdit.author = req.body.author;
    }
    res.redirect(`/articles/${articleToEdit.title}`);
  }

});

//DELETE '/articles/:title'
Router.delete("/articles/:title", (req, res) => {
  console.log("\nThis is DELETE for articles.");
  console.log("req.params:", req.params);
  const { title } = req.params;
  //Find the article in storage and remove it
  let deletedArticle = DB_Articles.removeArticleByTitle(title);
  console.log("\nCheck deletedArticle:", deletedArticle);
  console.log("\nCheck remaining articles:\n", DB_Articles.all());
  res.redirect('/articles');
});

module.exports = Router;
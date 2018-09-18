//Route object that we can route our objects into
const express = require('express');
const Router = express.Router();

//Hardcoded database for articles
const Articles = require('../db/articles.js');
const DB_Articles = new Articles();

//Error flag for adding an article
let isAddingArticleError = false;

//////////////////////////////////////////
//Article routes below will output HTML //
//////////////////////////////////////////

//GET '/articles/new'
Router.get("/articles/new", (req, res) => {
  console.log("\nThis is GET /articles/new - new.hbs");
  let isAddingArticle = true;
  res.render("new", { isAddingArticle });
});

//GET '/articles/:title/edit'; user can update information for an article
Router.get("/articles/:title/edit", (req, res) => {
  console.log("\nThis is GET articles - edit");
  const { title } = req.params;
  console.log("Title for edit:", title);
  DB_Articles.getArticleByTitle(title)
    .then(results => {
      const editArticleItem = results.rows[0];
      console.log("editArticleItem:", editArticleItem);
      res.render("edit", { editArticleItem });
    })
    .catch(err => {
      console.log("EDIT - article error:", err);
    });
});

//GET '/articles/:title'
Router.get("/articles/:title", (req, res) => {
  console.log("\nThis is GET /articles/:title - articles.hbs");
  const { title } = req.params;
  console.log("GETTing title:", title);

  DB_Articles.getArticleByTitle(title)
    .then(results => {
      const selectedArticleItem = results.rows[0];
      console.log("selectedArticleItem:\n", selectedArticleItem);
      res.render("article", selectedArticleItem);
    })
    .catch(err => {
      console.log("GET - title error:", err);
    })
});

//GET '/articles'; displays all Articles added thus far
Router.get("/articles", (req, res) => {
  console.log("\nThis is GET /articles - index.hbs");

  DB_Articles.all()
    .then(results => {
      const articleItems = results.rows;
      res.render('index', { articleItems });
    })
    .catch(err => {
      console.log('GET all articles error:', err);
    })
});

//////////////////
//Article Routes//
//////////////////

//POST '/articles'
Router.post("/articles", (req, res) => {
  console.log("\nreq.body:\n", req.body);
  if (req.body.title !== "" && req.body.body !== "" && req.body.author !== "") {
    const newArticleItem = req.body;
    DB_Articles.add(newArticleItem)
      .then(() => {
        res.redirect("/articles");
      })
      .catch(err => {
        console.log("POST article error:", err);
      })
  }
  else {
    isAddingArticleError = true;
    res.render("new", { isAddingArticleError });
  }
});

//PUT '/articles/:title'
Router.put("/articles/:title", (req, res) => {
  console.log("\nPUT - req.body @ articles:\n", req.body);
  console.log("PUT - req.params:", req.params);
  const { title } = req.params;

  if (req.body.title === "" || req.body.body === "" || req.body.author === "") {
    DB_Articles.getArticleByTitle(title)
      .then(results => {
        let articleToEdit = results.rows[0];
        console.log("articleToEdit:", articleToEdit);
        res.render("edit", { articleToEdit });
      })
      .catch(err => {
        console.log("PUT - articles error:", err);
      });
  }
  else {
    DB_Articles.updateArticle(title, req.body)
      .then(() => {
        res.redirect(`/articles/${req.body.title}`);
      })
      .catch(err => {
        console.log("PUT - article error:", err);
      });
  }
});

//DELETE '/articles/:title'
Router.delete("/articles/:title", (req, res) => {
  console.log("\nThis is DELETE for articles.");
  console.log("DELETE - req.params:", req.params);
  const { title } = req.params;

  DB_Articles.removeArticleByTitle(title)
    .then(() => {
      res.redirect('/articles');
    })
    .catch(err => {
      console.log("DELETE article error:", err);
    });
});

module.exports = Router;
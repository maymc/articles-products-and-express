class Articles {
  constructor() {
    this.knex = require('../knex/knex.js');

    // this._articleStorage = [];  //hardcoded data storage

    //Pre-added article items
    this.add({
      title: "Russian cuckoos are taking over Alaska",
      body: "Thanks to climate change, these crybaby parasites are heading to North America.",
      author: "Kat Eschner",
    });
    this.add({
      title: "Local honey might help your allergies—but only if you believe it will",
      body: "Eating allergens seems like it should reduce sneezes. In practice? Not so much.",
      author: "Sara Chodosh",
    });
    this.add({
      title: "Ancient space crystals may prove the sun threw heated tantrums as a tot",
      body: "You can learn a lot from 4.5-billion-year-old rocks.",
      author: "Neel V. Patel",
    });
  }

  //Methods

  //Display all articles in storage
  all() {
    return this.knex.raw('SELECT * FROM article_items');
  }

  //Display a specific article found by its title
  getArticleByTitle(title) {
    console.log("GET article w/title:", title);
    return this.knex.raw(`SELECT * FROM article_items WHERE title = '${title}'`);
  }

  //Add a new article to the db
  add(article) {
    article.urlTitle = encodeURI(article.title);
    console.log("ADDing article:\n", article);
    return this.knex.raw(`INSERT INTO article_items (title, body, author) VALUES ('${article.title}', '${article.body}','${article.author}')`);
  }

  //Update article by its title
  updateArticle(title, article) {
    console.log("UPDATE - User selected title:", title);
    console.log("UPDATE - New article info:", article);
    return this.knex.raw(`UPDATE article_items SET title = '${article.title}', body = '${article.body}', author = '${article.author}' WHERE title = '${title}'`);
  }

  //Remove an article from the db based on its title
  removeArticleByTitle(title) {
    console.log("REMOVE this article, title:", title);
    return this.knex.raw(`DELETE FROM article_items WHERE title = '${title}'`);
  }
}

module.exports = Articles;
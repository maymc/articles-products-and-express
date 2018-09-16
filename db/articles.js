class Articles {
  constructor() {
    this.knex = require('../knex/knex.js');

    this._articleStorage = [];  //hardcoded data storage

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
    // return [...this._articleStorage];
    return this.knex.raw('SELECT * FROM article_items');
  }

  //Display a specific article found by its title
  getArticleByTitle(title) {
    let filteredArray = this._articleStorage.filter(element => title == element.title)[0];
    console.log("filteredArray:\n", filteredArray);
    return filteredArray;
  }

  //Remove an article from the db based on its title
  removeArticleByTitle(title) {
    let removedArticle = null;
    console.log("\narticleStorage before remove:\n", this._articleStorage);
    this._articleStorage.forEach((element, index) => {
      if (element.title === title) {
        removedArticle = this._articleStorage.splice(index, 1);
      }
    });
    console.log("\narticleStorage after remove:\n", this._articleStorage);

    return removedArticle;
  }

  //Add a new article to the db
  add(article) {
    article.urlTitle = encodeURI(article.title);
    this._articleStorage.push(article);
    return article.urlTitle;
  }
}

module.exports = Articles;
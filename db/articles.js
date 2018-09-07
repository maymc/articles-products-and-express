class Articles {
  constructor() {
    this._articleStorage = [];
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
  all() {
    return [...this._articleStorage];
  }

  getArticleByTitle(title) {

    let filteredArray = this._articleStorage.filter(element => title == element.title)[0];
    console.log("filteredArray:\n", filteredArray);
    return filteredArray;
  }

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


  add(article) {
    article.urlTitle = encodeURI(article.title);
    this._articleStorage.push(article);
    return article.urlTitle;
  }

}

module.exports = Articles;
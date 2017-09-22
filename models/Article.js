var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
  _id: {
    type: String,
    unique: true
  },
  title: {
    type: String,
    unique: true
  },
  date: {
    type: Date
  },
  saved: false
});

/*,
  url: {
  	type: String
  }*/

var Article = mongoose.model("Article", ArticleSchema);
module.exports = Article;

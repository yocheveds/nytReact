var axios = require("axios");


function searchArticles(searchQuery) {
  var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key="94f37949b3664829bc9e83cf27f2c4cb"&q=";

  return axios.get(queryURL + searchQuery).then(function(response) {
    // If get get a result, return that result's formatted address property
    if (response.data.results[0]) {
      return response.data.results[0].formatted;
    }
    // If we don't get any results, return an empty string
    return "";
  });

}

module.exports = searchArticles;

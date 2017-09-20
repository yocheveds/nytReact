var axios = require("axios");

function searchArticles(searchQuery) {
  var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key="..."&q=";

  return axios.get(queryURL + searchQuery).then(function(response) {
        if (response.data.results[0]) {
      return response.data.results[0].formatted;
    }

    return "";
  });

}

module.exports = searchArticles;

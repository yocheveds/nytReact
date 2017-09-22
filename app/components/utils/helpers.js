// Include the axios package for performing HTTP requests (promise based alternative to request)
var axios = require("axios");

// Geocoder API
var geocodeAPI = "35e5548c618555b1a43eb4759d26b260";

// Helper functions for making API Calls
var helper = {

  // This function serves our purpose of running the query to geolocate.
  runQuery: function(query) {

    var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=843e016050524efaab2b592ef43e877b";

    if(query.trim() != ""){
      console.log(query);
      queryURL+= "&q=" + query;
    }    

    // Figure out the geolocation
    return axios.get(queryURL).then(function(response) {/*
      console.log("RESPONSE: ",response.data.response.docs,"END RESPONSE");*/
      // If get get a result, return that result's formatted address property
      if (response.data.response.docs[0]) {
        return response.data.response.docs;
      }
      // If we don't get any results, return an empty string
      return "";
    });
  },

  saveArticle: function(id) {
    console.log("SAVE ARTICLE");
    return axios.get("/save/" + id);
  },

  unsaveArticle: function(id) {
    console.log("UNSAVE ARTICLE");
    return axios.get("/unsave/" + id);
  },

  getSaved: function() {
    console.log("GETTING SAVED!");
    return axios.get("/saved");
  },

  // This function hits our own server to retrieve the record of query results
  getHistory: function() {
    return axios.get("/api");
  },

  // This function posts new searches to our database.
  postHistory: function(articles) {
    return axios.post("/api", { articles: articles });
  }
};

// We export the API helper
module.exports = helper;

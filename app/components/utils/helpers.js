// Include the axios package for performing HTTP requests (promise based alternative to request)
var axios = require("axios");

// Geocoder API
var geocodeAPI = "35e5548c618555b1a43eb4759d26b260";

// Helper functions for making API Calls
var helper = {

  // This function serves our purpose of running the query to geolocate.
  runQuery: function(location) {

    console.log(location);

    // Figure out the geolocation
    var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=94f37949b3664829bc9e83cf27f2c4cb&q="+location;
    return axios.get(queryURL).then(function(response) {
      console.log(response);
      // If get get a result, return that result's formatted address property
      if (response.data.data.results.docs[0]) {
        return response.data.data.results.doc[0].formatted;
      }
      // If we don't get any results, return an empty string
      return "";
    });
  },

  // This function hits our own server to retrieve the record of query results
  getHistory: function() {
    return axios.get("/api");
  },

  // This function posts new searches to our database.
  postHistory: function(location) {
    return axios.post("/api", { location: location });
  },
    searchArticles: function (searchQuery) {
    var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=94f37949b3664829bc9e83cf27f2c4cb&q=";

    return axios.get(queryURL + searchQuery).then(function(response) {
      // If get get a result, return that result's formatted address property
      if (response.data.results[0]) {
        return response.data.results[0].formatted;
      }
      // If we don't get any results, return an empty string
      return "";
    });

  }
};

// We export the API helper
module.exports = helper;

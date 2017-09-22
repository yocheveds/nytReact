// Include Server Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");

// Require History Schema
var History = require("./models/History");
// var Main = require("./components/Main");

// Create Instance of Express
var app = express();
// Sets an initial port. We'll use this later in our listener
var PORT = process.env.PORT || 3000;

// Run Morgan for Logging
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type: "application/vnd.api+json"}));

app.use(express.static("public"));

// -------------------------------------------------

// MongoDB Configuration configuration (Change this URL to your own DB)
mongoose.connect("mongodb://localhost/nytreact");
var db = mongoose.connection;

db.on("error", function(err) {
  console.log("Mongoose Error: ", err);
});

db.once("open", function() {
  console.log("Mongoose connection successful.");
});
var history = {
  title: "string",
  date: new Date(),
  url: "string"
};
var entry = new History(history);

// Now, save that entry to the db
entry.save(function(err, doc) {
  // Log any errors
  if (err) {
    console.log(err// Or log the doc
    );
  } else {
    console.log(doc);
  }
});

// Main "/" Route. This will redirect the user to our rendered React application
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

// This is the route we will send GET requests to retrieve our most recent search data.
// We will call this route the moment our page gets rendered
app.get("/api", function(req, res) {

  // We will find all the records, sort it in descending order, then limit the records to 5
  History.find({}, function(err, doc) {
    if (err) {
      console.log(err);
    } else {
      res.send(doc);
    }
  });
});

// This is the route we will send POST requests to save each search.
app.post("/api", function(req, res) {
  console.log("BODY: " + req.body.title);

  // Here we'll save the title based on the JSON input.
  // We'll use Date.now() to always get the current date time
  History.create({
    title: req.body.title,
    date: Date.now(),
    url: req.body.url
  }, function(err) {
    if (err) {
      console.log(err);
    } else {
      res.send("Saved Search");
    }
  });
});

app.delete("/api", function(req, res) {
  console.log("BODY: " + req.body.title);

  // Here we'll save the title based on the JSON input.
  // We'll use Date.now() to always get the current date time
  History.remove({
    _id: req.body._id
  }, function(err) {
    if (err) {
      console.log(err);
    } else {
      res.send("Delete Search");
    }
  });
});

// Listener
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});

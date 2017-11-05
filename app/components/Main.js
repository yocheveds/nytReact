// Include React
var React = require("react");

// Here we include all of the sub-components
var Form = require("./children/Form");
var Results = require("./children/Results");
var Article = require("./children/Article");

// Helper for making AJAX requests to our API
var helpers = require("./utils/helpers");

// Creating the Main component
var Main = React.createClass({

  // Here we set a generic state associated with the number of clicks
  // Note how we added in this history state variable
  getInitialState: function() {
    return {searchTerm: "", results: [], history: [], saved: [], update: ""};
  },

  componentDidMount() {

    // ajax call for stuff
    this.getInitialState()
  },

  // // The moment the page renders get the History
  // componentDidMount: function() {
  //   // Get the latest history.
  //   helpers.getHistory().then(function(response) {
  //     console.log(response);
  //     if (response !== this.state.history) {
  //       console.log("History", response.data);
  //       this.setState({ history: response.data });
  //     }
  //   }.bind(this));
  // },


  updateRender: function() {

    this.setState({update: true})
  },

  // If the component changes (i.e. if a search is entered)...
  runQueries: function(term) {
    // Run the query for the address
    helpers.runQuery(term).then(function(data) {
      if (data !== this.state.results) {
        console.log("Address", data);
        /*this.setState({ results: data });*/

        // After we've received the result... then post the search term to our history.
        helpers.postHistory(data).then(function(response) {
          console.log("Updated!", response);

          // After we've done the post... then get the updated history
          helpers.getHistory().then(function(response) {

            console.log("History", response.data);

            this.setState({results: data, history: response.data});

          }.bind(this));
        }.bind(this));
      }
    }.bind(this));
  },


  // This function allows childrens to update the parent.

  setTerm: function(term) {

    this.setState({searchTerm: term});

    this.runQueries(term);
  },

  // Here we render the function
  render: function() {
    console.log("Connect..");
    return (
//jumbotron//
      <div classNameName="container">
        <div classNameName="row">

          <nav  className="navbar navbar-default">
<div className="container-fluid">
    <div className="navbar-header">
    <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
      <span className="sr-only">Toggle navigation</span>
      <span className="icon-bar"></span>
      <span className="icon-bar"></span>
      <span className="icon-bar"></span>
    </button>
    <h1>New York Times Article Searcher</h1>
  </div>


</div>
</nav>

          {/* //jumbotronend// */}
          <div classNameName="col-md-6">

            <Form setTerm={this.setTerm} runQueries={this.runQueries}/>

          </div>

          <div classNameName="col-md-6">

            <Results results={this.state.results}/>

          </div>

        </div>

        <div classNameName="row">

          <Article history={this.state.history} saved={this.state.saved} updateRender={this.updateRender}/>

        </div>

      </div>
    );
  }
});


// Export the component back for use in other files


module.exports = Main;

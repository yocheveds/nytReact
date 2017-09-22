// Include React
var React = require("react");

// Creating the search component
var Search = React.createClass({

  // Here we set a generic state associated with the text being searched for
  getInitialState: function() {
    return { term: "" };
  },

  // This function will respond to the user input
  handleChange: function(event) {
    console.log(this.state.term);
    this.setState({ term: event.target.value });

  },

  // When a user submits...
  handleSubmit: function(event) {
        // prevent the HTML from trying to submit a search if the user hits "Enter" instead of
    // clicking the button
    event.preventDefault();

    // Set the parent to have the search term
    this.props.setTerm(this.state.term);
    this.setState({ term: "" });
  },
  // Here we describe this component's render method
  render: function() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title text-center">Search</h3>
        </div>
        <div className="panel-body text-center">
          <search onSubmit={this.handleSubmit}>
            <div className="search-group">
              <h4 className="">
                <strong>Location</strong>
              </h4>

              {/*
                Note how each of the search elements has an id that matches the state.
                This is not necessary but it is convenient.
                Also note how each has an onChange event associated with our handleChange event.
              */}
              <input
                value={this.state.term}
                type="text"
                className="search-control text-center"
                id="term"
                onChange={this.handleChange}
                required
              />
              <br />
              <button onClick = {this.handleSubmit}
                className="btn btn-primary"
                type="submit"
              >
                Submit
              </button>
            </div>
          </search>
        </div>
      </div>
    );
  }
});

// Export the component back for use in other files
module.exports = Search;

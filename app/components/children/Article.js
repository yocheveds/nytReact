// Include React
var React = require("react");

var helpers = require("../utils/helpers");

var Saved = require("./grandchildren/Saved");

// This is the History component. It will be used to show a log of  recent searches.
var Article = React.createClass({
  getInitialState: function() {
    return { saved: []};
  },
  componentDidMount: function() {
    // Get the latest history.
    helpers.getSaved().then(function(response) {
      console.log(response.data);
      this.setState({saved:response.data})
    }.bind(this));
  },
 /* componentDidUpdate: function(){
    helpers.getSaved().then(function(response) {
      console.log(response.data);
      this.setState({saved:response.data})
    }.bind(this));
  },*///need to fix so no firing off in endless loop
  renderList: function() {
    return this.state.saved.map(function(saved, i) {
      console.log(saved,saved._id,i);
      return (
        //<p key={i} className="thisArticle" onClick={this.activateLasers}>{article.title}</p>
        <Saved key={saved._id} id={saved._id} title={saved.title} date={saved.date} />
        //<p>{article._id}: {article.headline.print_headline}</p>
      );
    }.bind(this))
  },
  // Here we describe this component's render method
  render: function() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title text-center">Search History</h3>
        </div>
        <div className="panel-body text-center">

          {/* Here we use a map function to loop through an array in JSX */}
          {/*this.state.saved.map(function(search, i) {
            return (
              <p key={i}>{search.title} - {search.date}</p>
            );
          })*/}
          {this.renderList()}
          
        </div>
      </div>
    );
  }
});

// Export the component back for use in other files
module.exports = Article;

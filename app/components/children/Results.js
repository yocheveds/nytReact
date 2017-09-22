// Include React
var React = require("react");

var Row = require("./grandchildren/Row");

// Creating the Results component
var Results = React.createClass({
  renderList: function() {
    var mapped = this.props.results.map(function(article, i) {
      console.log("TEST",article,i);
      return (
        //<p key={i} className="thisArticle" onClick={this.activateLasers}>{article.title}</p>
        <Row key={article._id} id={article._id} title={article.headline.print_headline} />
        //<p>{article._id}: {article.headline.print_headline}</p>
      );
    }.bind(this))
    console.log(mapped);
    return mapped;
  },
  // Here we render the function
  render: function() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title text-center">Results</h3>
        </div>
        <div className="panel-body text-center">
          <h1>Articles:</h1>
          {this.renderList()}
        </div>
      </div>
    );
  }
});

// Export the component back for use in other files
module.exports = Results;

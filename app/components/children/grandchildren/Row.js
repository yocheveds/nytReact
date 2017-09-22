// Include React
var React = require("react");

// Helper for making AJAX requests to our API
var helpers = require("../../utils/helpers");

// This is the History component. It will be used to show a log of  recent searches.
var Row = React.createClass({

  // Here we set a generic state associated with the text being searched for
  getInitialState: function() {
    return {
      id: this.props.id,
      title: this.props.title
     };
  },
  activateLasers: function(){
    /*this.setState({article:this.props.id})*/
    console.log(this.props);
    helpers.saveArticle(this.state.id).then(function(response){
      console.log(response);
    })
  },
  // Here we describe this component's render method
  render: function() {
    //console.log(this.props)
    return (
      <p key={this.state.id} className="thisArticle" onClick={this.activateLasers}>{this.state.title}</p>
    );
  }
});

// Export the component back for use in other files
module.exports = Row;

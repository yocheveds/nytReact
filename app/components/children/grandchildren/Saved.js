// Include React
var React = require("react");

// Helper for making AJAX requests to our API
var helpers = require("../../utils/helpers");

// This is the History component. It will be used to show a log of  recent searches.
var Saved = React.createClass({

  // Here we set a generic state associated with the text being searched for
  getInitialState: function() {
    return {
      id: this.props.id,
      title: this.props.title,
      date: this.props.date
     };
  },
  activateLaserz: function(){
    /*this.setState({article:this.props.id})*/
    //console.log(this.state.id,"///",this.state.title);
    helpers.unsaveArticle(this.state.id).then(function(response){
      console.log(response);
    }.bind(this));
  },
  // Here we describe this component's render method
  render: function() {
    //console.log(this.props)
    return (
      <p key={this.state.id} className="savedArticle" onClick={this.activateLaserz}>{this.state.title} - {this.state.date}</p>
    );
  }
});

// Export the component back for use in other files
module.exports = Saved;

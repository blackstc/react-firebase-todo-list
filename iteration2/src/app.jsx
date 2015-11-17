var React = require('react');
var ReactFire = require('reactfire');
var Firebase = require('firebase');
var rootUrl = 'https://vivid-heat-3043.firebaseio.com/';
var Header = require('./header');

var App = React.createClass({
  //akin to $inject.  Allows us to call reactfire methods within our component
  mixins: [ReactFire],

  //only want to create firebase object when component is rendered.
  //component will mount only runs one time right before the component is rendered
  componentWillMount: function() {
    // '/items' is a nested route for retrieving data from firebase
    // access data as this.state.items = {}
    this.fb = new Firebase(rootUrl + 'items/');
    this.bindAsObject(this.fb, 'items');
  },

  render: function() {
    //should get an empty object with items key.
    console.log(this.state);
    return <div className="row panel panel-default">
      <div className="col-md-8 col-md-offset-2">
        <h2 className="text-center">
          Todo List
        </h2>
        <Header itemsStore={this.firebaseRefs.items}/>
      </div>
    </div>
  }
});

var element = React.createElement(App, {});
React.render(element, document.querySelector('.container'));

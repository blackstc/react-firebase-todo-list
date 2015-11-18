var React = require('react');
var ReactFire = require('reactfire');
var Firebase = require('firebase');
var rootUrl = 'https://vivid-heat-3043.firebaseio.com/';
var Header = require('./header');
var List = require('./list');

var App = React.createClass({
  //akin to $inject.  Allows us to call reactfire methods within our component
  mixins: [ReactFire],

  //here we can set the inital state of our props
  // if you get the error "cannot read property BLANK of null" usually you need to initalize its state
  getInitialState: function() {
    return {
      items: {},

      // use this to track if our data is loaded from FB
      loaded: false
    }
  },

  //only want to create firebase object when component is rendered.
  //component will mount only runs one time right before the component is rendered
  componentWillMount: function() {
    // '/items' is a nested route for retrieving data from firebase
    // access data as this.state.items = {}
    this.fb = new Firebase(rootUrl + 'items/');
    this.bindAsObject(this.fb, 'items');

    // calls fn when there is a change to values in our FB
    this.fb.on('value', this.handleDataLoaded);
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
        <hr />
        <div className={"content " + (this.state.loaded ? "loaded" : '')}>
          <List items={this.state.items} />
          {this.deleteButton()}
        </div>
      </div>
    </div>
  },
  deleteButton: function() {
    if(!this.state.loaded) {
      return null;
    } else {
      return <div className="text-center clear-complete">
        <hr />
        <button
          type="button"
          onClick={this.onDeleteDoneClick}
          className="btn btn-default">
          Clear Complete
        </button>
      </div>
    }
  },
  onDeleteDoneClick: function() {
    for (var key in this.state.items) {
      if (this.state.items[key].done) {
        this.fb.child(key).remove();
      }
    }
  },
  handleDataLoaded: function() {
    this.setState({loaded: true});
  }
});

var element = React.createElement(App, {});
React.render(element, document.querySelector('.container'));

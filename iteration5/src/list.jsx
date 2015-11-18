var React = require('React');
var ListItem = require('./list-item');

module.exports = React.createClass({
  render: function() {
    return <div>
      {this.renderList()}
    </div>
  },
  renderList: function() {
    if (!this.props.items) {
      return <h4>
        Add a todo to get started
      </h4>
    } else {
      var children = [];

      for (var key in this.props.items) {
        var item = this.props.items[key];
        item.key = key;

        // React items want to have a unique key as and ID, so we'll use our FB id as our key for each item
        children.push(
          <ListItem
            item={item}
            key={key}
            >
          </ListItem>
        )
      }
      return children;
    }
  }
})

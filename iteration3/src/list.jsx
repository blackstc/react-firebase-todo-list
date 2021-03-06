var React = require('React');

module.exports = React.createClass({
  render: function() {
    console.log(this.props);
    return <ul>
      {this.renderList()}
    </ul>
  },
  renderList: function() {
    if (!this.props.items) {
      return <h4>
        Add a todo to get started
      </h4>
    } else {
      var children = [];

      for (var key in this.props.items) {
        children.push(
          <li>
            {this.props.items[key].text}
          </li>
        )
      }
      return children;
    }
  }
})

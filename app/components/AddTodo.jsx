var React = require('react');

var AddTodo = React.createClass({
  render: function() {
    return (
      <div className="container__footer">
        <form onSubmit={this.onSubmit} ref="form">
          <input type="text" ref="todo" placeholder="Enter your todo item"></input>
          <button className="button expanded">Add Todo</button>
        </form>
      </div>
    );
  },

  onSubmit: function(e) {
    e.preventDefault();
    var text = this.refs.todo.value;
    if (text.length > 0) {
      this.refs.todo.value = '';
      this.props.onAddTodo(text);
    } else {
      this.refs.todo.focus();
    }
  }
});

module.exports = AddTodo;

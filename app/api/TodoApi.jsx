// This file will know how to persist/fetch data from database
var $ = require('jQuery');

module.exports = {

  setTodos: function(todosArray) {
    if ($.isArray(todosArray)) {
        localStorage.setItem('todos', JSON.stringify(todosArray));
        return todosArray;
    }
  },

  getTodos: function() {
    var strTodos = localStorage.getItem('todos');
    var todos = [];
    try {
      todos = JSON.parse(strTodos);
    } catch (e) {

    }
    return $.isArray(todos) ? todos : [];
  },

  filterTodos: function(todos, showCompleted, searchText) {
    var filteredTodos = todos;

    // filter by showCompleted
    filteredTodos = filteredTodos.filter((todo) => {
      return !todo.completed || showCompleted;
    });
    // filter by searchText
    if (searchText.length > 0) {
      filteredTodos = filteredTodos.filter((todo) => {
        return todo.text.toLowerCase().indexOf(searchText) !== -1;
      });
    }

    // sort todos by uncompleted
    filteredTodos.sort((a, b) => {
      if (!a.completed && b.completed) {
        return -1;
      } else if (a.completed && !b.completed) {
        return 1;
      } else {
        return 0;
      }
    });

    return filteredTodos;
  }
};

var React = require('react');
var ReactDOM = require('react-dom');
var expect = require('expect');
var $ = require('jQuery');
var TestUtils = require('react-addons-test-utils');

var TodoApp = require('TodoApp');

describe('TodoApp', () => {
  it('should exist', () => {
    expect(TodoApp).toExist();
  });
  it('should add new todo item to todos state on handleAddTodo', () => {
    var todoText = 'Test text';
    var todoApp = TestUtils.renderIntoDocument(<TodoApp />);
    todoApp.setState({
      todos: []
    });
    todoApp.handleAddTodo(todoText);
    expect(todoApp.state.todos[0].text).toBe(todoText);
    expect(todoApp.state.todos[0].createdAt).toBeA('number');
  });

  it('should update completed value when handleToggle called', () => {
    var todoApp = TestUtils.renderIntoDocument(<TodoApp />);
    todoApp.setState({todos:[{
      id: 100,
      text: 'Dummy text',
      completed: false,
      createdAt: 0,
      completedAt: undefined
    }]});
    expect(todoApp.state.todos[0].completed).toBe(false);
    todoApp.handleToggle(100);
    expect(todoApp.state.todos[0].completed).toBe(true);
    expect(todoApp.state.todos[0].completedAt).toBeA('number');
  });
  it('should updated completedAt when completed is toggled', () => {
    var todoApp = TestUtils.renderIntoDocument(<TodoApp />);
    todoApp.setState({todos:[{
      id: 100,
      text: 'Dummy text',
      completed: true,
      createdAt: 100,
      completedAt: 2000
    }]});
    todoApp.handleToggle(100);
    expect(todoApp.state.todos[0].completed).toBe(false);
    expect(todoApp.state.todos[0].completedAt).toBe(undefined);
  });
});

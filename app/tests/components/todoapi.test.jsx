var expect = require('expect');

var TodoApi = require('TodoApi');

describe('TodoApi', () => {
  beforeEach(() => {
      localStorage.removeItem('todos');
  });

  it('should exist', () => {
    expect(TodoApi).toExist();
  });
  describe('setTodos', () => {
    it('should set localStorage with valid input', () => {
      var todos = [{
        id: 1,
        text: 'Test',
        completed: false
      }];
      TodoApi.setTodos(todos);
      var actualTodos = JSON.parse(localStorage.getItem('todos'));
      expect(actualTodos).toEqual(todos);
    });
    it('should not set invalid todos array', () => {
      var badTodos = { id: 1 };
      TodoApi.setTodos(badTodos);
      expect(localStorage.getItem('todos')).toBe(null);
    });
  });
  describe('getTodos', () => {
    it('should return empty array for bad localStorage data', () => {
      var actualTodos = TodoApi.getTodos();
      expect(actualTodos).toEqual([]);
    });
    it('should return todos if valid array in localStorage', () => {
      var todos = [{
        id: 1,
        text: 'Test',
        completed: false
      }];
      localStorage.setItem('todos', JSON.stringify(todos));
      var actualTodos = TodoApi.getTodos();
      expect(actualTodos).toEqual(todos);
    });
  });

  describe('filterTodos', () => {
    var todos = [{
      id: 1,
      text: 'Some text here',
      completed: true
    }, {
      id: 2,
      text: 'Other text here',
      completed: false
    }, {
      id: 3,
      text: 'More text here',
      completed: false
    }];

    it('should return all items if showCompleted == true', () => {
      var filteredTodos = TodoApi.filterTodos(todos, true, '');
      expect(filteredTodos.length).toEqual(todos.length);
    });
    it('should not return completed items if showCompleted == false', () => {
      var filteredTodos = TodoApi.filterTodos(todos, false, '');
      expect(filteredTodos.length).toBe(2);
    });
    it('should return items by searchText', () => {
      var filteredTodos = TodoApi.filterTodos(todos, true, 'some');
      expect(filteredTodos.length).toBe(1);
    });
    it('should sort todos by completed status', () => {
      var filteredTodos = TodoApi.filterTodos(todos, true, '');
      expect(filteredTodos[2].id).toBe(1);
    });
  });
});

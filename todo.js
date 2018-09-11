angular.module('todoApp', [])
  .controller('TodoListController', function() {
    var todoList = this;
    todoList.todos = [
      {item:'learn AngularJS', done:true},
      {item:'build an AngularJS app', done:false}];
    todoList.addTodo = function() {
      todoList.todos.push({item:todoList.todoText, done:false});
      todoList.todoText = '';
    };

    todoList.showAll = function() {
      todoList.todos = todoList.todos
    };

    todoList.showCompleted = function() {
      list = JSON.stringify({item:'learn AngularJS', done:true});

      window.localStorage.setItem(1, list);





      //var oldTodos = todoList.todos;
      //todoList.todos = [];
      //angular.forEach(oldTodos, function(todo) {
        //if (!todo.done) todoList.todos.push(todo);
      //});
    };


    todoList.showActive = function() {
      todoList.todos.push({item:'puh', done:false});
    };

    todoList.remaining = function() {
      var count = 0;
      angular.forEach(todoList.todos, function(todo) {
        count += todo.done ? 0 : 1;
      });
      return count;
    };

    todoList.archive = function() {
      var oldTodos = todoList.todos;
      todoList.todos = [];
      angular.forEach(oldTodos, function(todo) {
        if (!todo.done) todoList.todos.push(todo);
      });
    };
  });

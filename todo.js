angular.module('todoApp', [])
  .controller('TodoListController', function() {

    var todoList = this;
    todoList.todos = [
      {item:'learn AngularJS', done:true},
      {item:'build an AngularJS app', done:false}];

    todoList.addTodo = function() {
      todoList.todos.push({item:todoList.todoText, done:false});
      window.localStorage.setItem( todoList.todoText, false);
      todoList.todoText = '';
    };

    todoList.showAll = function() {
      for (var i=0; i < todoList.todos.length; i++)
        window.localStorage.setItem(todoList.todos[i].item, todoList.todos[i].done);//!!!!!!!!
      var items = JSON.stringify(window.localStorage);
      console.log(allStorage());
      todoList.todos = [];

      angular.forEach(items, function(todo) {
        todoList.todos.push(todo);
      });

    };

    todoList.showCompleted = function() {
      for (var i=0; i < todoList.todos.length; i++)
        window.localStorage.setItem(todoList.todos[i].item, todoList.todos[i].done);//!!!!!!!!
      var oldTodos = todoList.todos;
      todoList.todos = [];
      angular.forEach(oldTodos, function(todo) {
        if (!todo.done) todoList.todos.push(todo);
      });
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


function allStorage() {

  var archive = [], // Notice change here
    keys = Object.keys(window.localStorage),
    i = keys.length;
  while ( i-- ) {
    var item =  {
      item: window.localStorage.getItem(keys[i]), done: localStorage.key(i)
    };
    archive[i] = item;
  }

  return archive;
}

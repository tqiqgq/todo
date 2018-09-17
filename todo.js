"use strict";

const app = angular.module('todoApp',[]);

app.controller('TodoListController', ['$scope', function() {

    var todoList = this;
    todoList.todos = [
      {id: 'h_jm6c2ura_fcd3pcrjxvc8ungy6a1111',  item:'learn AngularJS', done:true},
      {id: 'h_jm6c2ura_fcd3pcrjxvc8ungy622222',  item:'build an AngularJS app', done:false}];

    localStorage.setItem("todo", JSON.stringify(todoList.todos));


    todoList.addTodo = function() {
      if (todoList.todoText) {
          var todo_id = uniqueId();
          todoList.todos.push({id: todo_id, item: todoList.todoText, done: false});
          var items = {};
          items = allStorage();
          items.push({id: todo_id, item: todoList.todoText, done: false});
          localStorage.setItem("todo", JSON.stringify(items));
          todoList.todoText = '';
      }
    }; //add todo in todoList and LocalStorage


    todoList.showAll = function() {
      todoList.todos = [];
      var items = allStorage();
      angular.forEach(items, function(todo) {
        todoList.todos.push(todo);
      });
    }; //show all values from LocalStorage


    todoList.showCompleted = function() {
      var oldTodos = allStorage();
      todoList.todos = [];
      angular.forEach(oldTodos, function(todo) {
        if (todo.done) todoList.todos.push(todo);
      });
    };//show todo with done=true


    todoList.showActive = function() {
      var oldTodos = allStorage();
      todoList.todos = [];
      angular.forEach(oldTodos, function(todo) {
        if (!todo.done) todoList.todos.push(todo);
      });
    }; //show todo with done=false


    todoList.checkDone = function(todo){
      var items = allStorage();

      items.forEach(function(item){
          if (item.id === todo.id){

            item.done = todo.done;
          }
      });
      localStorage.setItem("todo", JSON.stringify(items));
    }; //change done in LocalStorage


    todoList.remaining = function() {
      var count = 0;
      angular.forEach(todoList.todos, function(todo) {
        count += todo.done ? 0 : 1;
      });
      return count;
    };//count done todo


    todoList.archive = function() {
      var oldTodos = todoList.todos;
      todoList.todos = [];
      angular.forEach(oldTodos, function(todo) {
        if (!todo.done) todoList.todos.push(todo);
      });
    };//delete done todo
  }]);


function allStorage() {
  return JSON.parse(localStorage.getItem('todo'));
}//get all data from LocalStorage


function uniqueId () {
  // desired length of Id
  var idStrLen = 32;
  // always start with a letter -- base 36 makes for a nice shortcut
  var idStr = (Math.floor((Math.random() * 25)) + 10).toString(36) + "_";
  // add a timestamp in milliseconds (base 36 again) as the base
  idStr += (new Date()).getTime().toString(36) + "_";
  // similar to above, complete the Id using random, alphanumeric characters
  do {
    idStr += (Math.floor((Math.random() * 35))).toString(36);
  } while (idStr.length < idStrLen);

  return (idStr);
}//generate id for LocalStorage

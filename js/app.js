(function() {

  'use strict';

  // init consts
  var VERSION = 1.0;
  var STORAGE_NAME = 'fxos_todo';

  // localStorage wrapper
  var storage = {
    fetch: function () {
      return JSON.parse(localStorage.getItem(STORAGE_NAME) || '[]');
    },
    save: function (todos) {
      localStorage.setItem(STORAGE_NAME, JSON.stringify(todos));
    }
  };

  // main
  var app = new Vue({
    el: '#app',
    data: {
      todos: storage.fetch()
    },
    ready: function () {
      this.$watch('todos', function (todos) {
        storage.save(todos);
      });
    },
    methods: {
      addTodo: function () {
        var value = window.prompt('your ToDo here');
        if (!value) {
          return;
        }
        this.todos.push({text: value});
      },
      removeTodo: function (todo) {
        todo.$el.addEventListener('animationend', function () {
          this.todos.$remove(todo.$data);
        }.bind(this), false);
        todo.$el.classList.add('todo-remove');
      }
    }
  });

})();

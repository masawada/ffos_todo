(function() {

  'use strict';

  // 定数の初期化
  var VERSION = 1.0;
  var STORAGE_NAME = 'fxos_todo';

  // localStorageのラッパー
  var storage = {
    fetch: function () {
      return JSON.parse(localStorage.getItem(STORAGE_NAME) || '[]');
    },
    save: function (todos) {
      localStorage.setItem(STORAGE_NAME, JSON.stringify(todos));
    }
  };

  // 本体
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
        var value = window.prompt('ToDoを入力してください');
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

(function() {

  'use strict';

  // init consts
  var VERSION = 1.0;
  var STORAGE_NAME = 'fxos_todo';

  // localize
  var l10n = document.webL10n.get;

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
      todos: storage.fetch(),
      appName: 'ToDo'
    },
    ready: function () {
      this.$watch('todos', function (todos) {
        storage.save(todos);
      });

      // set app name
      var request = window.navigator.mozApps.getSelf();
      request.onsuccess = function() {
        var app_name = request.result.manifest.locales[document.webL10n.getLanguage()].name || request.result.manifest.name;
        this.$set('appName', app_name);
      }.bind(this);
    },
    methods: {
      addTodo: function () {
        var value = window.prompt(l10n('lc-add'));
        if (!value) {
          return;
        }
        this.todos.push({text: value});
      },
      removeTodo: function (todo) {
        if (!window.confirm(l10n('lc-deletion-confirm'))) {
          todo.$el.querySelector('input').checked = false;
          return;
        }

        todo.$el.addEventListener('animationend', function () {
          this.todos.$remove(todo.$data);
        }.bind(this), false);
        todo.$el.classList.add('todo-remove');
      }
    }
  });
})();

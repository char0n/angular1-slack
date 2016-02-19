(function() {
  'use strict';

  angular
    .module('app.todo')
    .component('tzTodo', tzTodoFactory());

  function tzTodoFactory() {
    return {
      templateUrl: 'scripts/todo/components/tzTodo/tz-todo.tpl.html',
      controller: TzTodoController,
      controllerAs: 'people'
    };
  }

  function TzTodoController() {

  }
})();

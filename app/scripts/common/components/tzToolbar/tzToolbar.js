(function() {
  'use strict';

  angular
    .module('components')
    .component('tzToolbar', tzToolbarFactory());

  function tzToolbarFactory() {
    return {
      templateUrl: 'scripts/common/components/tzToolbar/tz-toolbar.tpl.html',
      controller: TzToolbarController,
      controllerAs: 'tzToolbar',
      bindings: {
        onMenuClick: '&?'
      }
    };
  }

  function TzToolbarController($location) {
    var vm = this;
    vm.gotoChat = gotoChat;
    vm.gotoPeople = gotoPeople;
    vm.gotoCalendar = gotoCalendar;
    vm.gotoTodo = gotoTodo;

    function gotoChat() {
      goto('/conversation');
    }

    function gotoPeople() {
      goto('/people');
    }

    function gotoCalendar() {
      goto('/calendar');
    }

    function gotoTodo() {
      goto('/todo');
    }

    function goto(path) {
      $location.path(path);
    }
  }
})();

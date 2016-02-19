(function() {
  'use strict';

  angular
    .module('app')
    .component('tzToolbar', tzToolbarFactory());

  function tzToolbarFactory() {
    return {
      templateUrl: 'scripts/components/tzToolbar/tz-toolbar.tpl.html',
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

    function gotoChat() {
      goto('/conversation');
    }

    function gotoPeople() {
      goto('/people');
    }

    function gotoCalendar() {
      goto('/calendar');
    }

    function goto(path) {
      $location.path(path);
    }
  }
})();

(function() {
  'use strict';

  angular
    .module('app')
    .component('tzToolbar', tzToolbarFactory());

  function tzToolbarFactory() {
    return {
      templateUrl: 'scripts/components/tzToolbar/tz-toolbar.tpl.html',
      controller: TzToolbarController,
      controllerAs: 'tzToolbar'
    };
  }

  function TzToolbarController($scope, $location) {
    var vm = this;
    vm.currentLocation = $location.path();
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

    $scope.$on('$locationChangeSuccess', function() {
      vm.currentLocation = $location.path();
    });
  }
})();

(function() {
  'use strict';

  angular
    .module('app.chat')
    .controller('ChatController', ChatController);

  function ChatController($mdSidenav, $rootScope) {
    var vm = this;
    $rootScope.toggleLeftMenu = toggleLeftMenu;
    vm.toggleLeftMenu = toggleLeftMenu;

    // Implementations.
    function toggleLeftMenu() {
      $mdSidenav('chat-left-menu').toggle();
    }
  }
})();

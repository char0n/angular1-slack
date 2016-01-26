(function() {
  'use strict';

  angular
    .module('app.chat')
    .controller('ChatController', ChatController);

  function ChatController($mdSidenav) {
    var vm = this;
    vm.isConversionMenuOpen = false;
    vm.toggleLeftMenu = toggleLeftMenu;
    vm.isOpenConversionMenu = isOpenConversionMenu;
    vm.openConversationMenu = openConversationMenu;

    // Implementations.
    function toggleLeftMenu() {
      $mdSidenav('chat-left-menu').toggle();
    }

    function isOpenConversionMenu() {
      return $mdSidenav('conversion-menu').isOpen();
    }

    function openConversationMenu() {
      $mdSidenav('conversion-menu').open();
    }
  }
})();

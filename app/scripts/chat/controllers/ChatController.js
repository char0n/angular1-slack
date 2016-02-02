(function() {
  'use strict';

  angular
    .module('app.chat')
    .controller('ChatController', ChatController);

  function ChatController($scope, $mdSidenav, $timeout, storeService,
                          selectorsService) {
    var vm = this;
    var storeUnsubscribe ;
    vm.toggleLeftMenu = toggleLeftMenu;
    vm.isOpenConversionMenu = isOpenConversionMenu;
    vm.openConversationMenu = openConversationMenu;

    activate: {
      angular.extend(vm, select(storeService.getState()));

      storeUnsubscribe = storeService.subscribe(function() {
        angular.extend(vm, select(storeService.getState()));
      });
    }

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

    function select(state) {
      return {
        activeChannelFilter: selectorsService.activeChannelFilterSelector(state),
        channels: selectorsService.channelsSelector(state),
        messages:  selectorsService.activeMessagesSelector(state)
      };
    }

    // Events.
    $timeout(function() {
      storeService.dispatch({
        type: 'channel.setName',
        payload: {
          id: 1,
          name: 'channel 11'
        }
      });
    }, 4000);

    $scope.$on('$destroy', function() {
      storeUnsubscribe();
    });
  }
})();

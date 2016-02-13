(function() {
  'use strict';

  angular
    .module('app.chat')
    .controller('ChatController', ChatController);

  function ChatController($scope, $mdSidenav, storeService, selectorsService,
                          actionsService) {
    var vm = this;
    var storeUnsubscribe ;
    vm.toggleLeftMenu = toggleLeftMenu;
    vm.isOpenConversionMenu = isOpenConversionMenu;
    vm.openConversationMenu = openConversationMenu;
    vm.switchChannel = switchChannel;

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

    function switchChannel(channelId) {
      storeService.dispatch(actionsService.channels.switch(channelId));
    }

    function select(state) {
      return {
        activeChannelFilter: selectorsService.activeChannelFilterSelector(state),
        activeChannelDetail: selectorsService.activeChannelDetailSelector(state),
        channels: selectorsService.channelsSelector(state).toArray(),
        messages:  selectorsService.activeMessagesSelector(state).toArray()
      };
    }

    // Events.
    $scope.$on('$destroy', function() {
      storeUnsubscribe();
    });
  }
})();

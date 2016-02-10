(function() {
  'use strict';

  angular
    .module('app.chat')
    .controller('ChatController', ChatController);

  function ChatController($scope, $mdSidenav, $q, storeService, selectorsService,
                          actionsService) {
    var vm = this;
    var storeUnsubscribe ;
    vm.toggleLeftMenu = toggleLeftMenu;
    vm.isOpenConversionMenu = isOpenConversionMenu;
    vm.openConversationMenu = openConversationMenu;
    vm.switchChannel = switchChannel;

    activate: {
      select(storeService.getState())
        .then(function(selectedState) {
          angular.extend(vm, selectedState);
        });
      storeUnsubscribe = storeService.subscribe(function() {
        select(storeService.getState())
          .then(function(selectedState) {
            angular.extend(vm, selectedState);
          });
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
      return $q.all({
        activeChannelFilter: selectorsService.activeChannelFilterSelector(state),
        channels: selectorsService.channelsSelector(state).toArray(),
        messages:  selectorsService.activeMessagesSelector(state)
      });
    }

    // Events.
    $scope.$on('$destroy', function() {
      storeUnsubscribe();
    });
  }
})();

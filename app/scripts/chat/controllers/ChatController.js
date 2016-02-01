(function() {
  'use strict';

  angular
    .module('app.chat')
    .controller('ChatController', ChatController);

  function ChatController($scope, $mdSidenav, $timeout, storeService, _) {
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

    function selectChannels(state) {
      return state.channels;
    }

    function selectUsers(state) {
      return state.users;
    }

    function selectMessages(state) {
      var activeChannelId = _.find(state.channels, {'isActive': true});
      var users = selectUsers(state);

      return state.messages
        .filter(function(message) {
          return message.channelId === activeChannelId;
        })
        .map(function(message) {
          return angular.copy(message);
        })
        .map(function(message) {
          message.user = _.find(users, 'id', message.id);
        });
    }

    function select(state) {
      return {
        channels: angular.copy(selectChannels(state)),
        messages: selectMessages(state)
      };
    }

    // Events.
    $timeout(function() {
      storeService.dispatch({
        type: 'channel.updated',
        payload: {
          channelId: 1,
          delta: {name: 'channel 11'}
        }
      });
    }, 4000);

    $scope.$on('$destroy', function() {
      storeUnsubscribe();
    });
  }
})();

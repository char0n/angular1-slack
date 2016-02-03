(function() {
  'use strict';

  angular
    .module('app.chat')
    .factory('selectorsService', selectorsService);

  function selectorsService(reselectService) {
    return {
      channelsSelector: channelsSelector,
      activeChannelFilterSelector: activeChannelFilterSelector,
      messagesSelector: messagesSelector,
      usersSelector: usersSelector,

      activeMessagesSelector: activeMessagesSelectorFactory()
    };

    /////////////////////
    // Input selectors. /
    /////////////////////
    function channelsSelector(state) {
      return state.get('channels');
    }

    function activeChannelFilterSelector(state) {
      return state.get('activeChannelFilter');
    }

    function messagesSelector(state) {
      return state.get('messages');
    }

    function usersSelector(state) {
      return state.get('users');
    }

    ////////////////////////
    // Combined selectors. /
    ////////////////////////
    function activeMessagesSelectorFactory() {
      return reselectService.createSelector(
        [
          messagesSelector,
          usersSelector,
          activeChannelFilterSelector
        ],
        function(messages, users, activeChannelFilter) {
          return messages
            .filter(function(message) {
              return message.channelId === activeChannelFilter;
            })
            .map(function(message) {
              var user = users.find(function(user) {
                return message.get('userId') === user.get('id');
              });
              return message.set('user', user);
            })
            ;
        }
      );
    }
  }
})();

(function() {
  'use strict';

  angular
    .module('app.chat')
    .factory('selectorsService', selectorsService);

  function selectorsService(reselect) {
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
      return reselect.createSelector(
        [
          messagesSelector,
          usersSelector,
          activeChannelFilterSelector
        ],
        function(messages, users, activeChannelFilter) {
          return messages
            .filter(function(message) {
              return message.get('channelId') === activeChannelFilter;
            })
            .map(function(message) {
              var user = users.find(function(user) {
                return message.get('userId') === user.get('id');
              });
              return message.set('user', user);
            })
            .map(function(message) {
              return message.withMutations(function(message) {
                message
                  .set('date', '')
                  .set('time', '')
                ;
              });
            })
            ;
        }
      );
    }
  }
})();

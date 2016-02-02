(function() {
  'use strict';

  angular
    .module('app.chat')
    .factory('selectorsService', selectorsService);

  function selectorsService(reselectService, _) {
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
      return state.channels;
    }

    function activeChannelFilterSelector(state) {
      return state.activeChannelFilter;
    }

    function messagesSelector(state) {
      return state.messages;
    }

    function usersSelector(state) {
      return state.users;
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
          var combinedMessages =
            messages
              .filter(function(message) {
                return message.channelId === activeChannelFilter;
              })
              .map(function(message) {
                return angular.extend({
                  user: _.find(users, 'id', message.userId)
                }, message);
              })
            ;
          return {
            messages: combinedMessages
          };
        }
      );
    }
  }
})();

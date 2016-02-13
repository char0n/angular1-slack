(function() {
  'use strict';

  angular
    .module('app.chat')
    .factory('selectorsService', selectorsService);

  function selectorsService(reselect) {
    return {
      activeChannelFilterSelector: activeChannelFilterSelector,
      activeChannelSelector: activeChannelSelector,
      currentUserIdSelector: currentUserIdSelector,
      channelsSelector: channelsSelector,
      messagesSelector: messagesSelector,
      usersSelector: usersSelector,

      activeMessagesSelector: activeMessagesSelectorFactory(),
      activeChannelDetailSelector: activeChannelDetailSelectorFactory()
    };

    /////////////////////
    // Input selectors. /
    /////////////////////
    function activeChannelFilterSelector(state) {
      return state.get('activeChannelFilter');
    }

    function activeChannelSelector(state) {
      var channels = channelsSelector(state);
      var activeChannelFilter = activeChannelFilterSelector(state);

      return channels.find(function(channel) { return channel.get('id') === activeChannelFilter; });
    }

    function currentUserIdSelector(state) {
      return state.get('currentUserId');
    }

    function channelsSelector(state) {
      return state.get('channels');
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
          activeChannelFilterSelector
        ],
        function(messages, activeChannelFilter) {
          return messages.filter(function(message) {
            return message.get('channelId') === activeChannelFilter;
          });
        }
      );
    }

    function activeChannelDetailSelectorFactory() {
      return reselect.createSelector(
        [
          activeChannelSelector,
          usersSelector
        ],
        function(activeChannel, users) {
          var channelUsers = activeChannel.get('userIds').map(function(userId) {
            return users.find(function(user) { return user.get('id') === userId; });
          });

          return activeChannel.set('users', channelUsers);
        }
      );
    }
  }
})();

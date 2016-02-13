(function() {
  'use strict';

  angular
    .module('app.chat')
    .factory('selectorsService', selectorsService);

  function selectorsService(reselect) {
    /////////////////////
    // Input selectors. /
    /////////////////////
    function activeChannelFilterSelector(state) {
      return state.get('activeChannelFilter');
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
    var activeMessagesSelector = reselect.createSelector(
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

    var activeChannelSelector = reselect.createSelector(
      [
        activeChannelFilterSelector,
        channelsSelector
      ],
      function(activeChannelFilter, channels) {
        return channels.find(function(channel) {
          return channel.get('id') === activeChannelFilter;
        });
      }
    );

    var activeChannelDetailSelector = reselect.createSelector(
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

    return {
      activeChannelFilterSelector: activeChannelFilterSelector,
      currentUserIdSelector: currentUserIdSelector,
      channelsSelector: channelsSelector,
      messagesSelector: messagesSelector,
      usersSelector: usersSelector,

      activeChannelSelector: activeChannelSelector,
      activeMessagesSelector: activeMessagesSelector,
      activeChannelDetailSelector: activeChannelDetailSelector
    };
  }
})();

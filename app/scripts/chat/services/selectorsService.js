(function() {
  'use strict';

  angular
    .module('app.chat')
    .factory('selectorsService', selectorsService);

  function selectorsService(reselect, moment) {
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
          var filteredMessages = messages.filter(function(message) {
            return message.get('channelId') === activeChannelFilter;
          });

          return filteredMessages
            .map(function(message) {
              var user = users.find(function(user) {
                return message.get('userId') === user.get('id');
              });
              return message.set('user', user);
            })
            .map(function(message, index) {
              return message.withMutations(function(message) {
                var curMsgCreated = moment(message.get('created'));
                var prevMsg = filteredMessages.has(index - 1) ?
                  filteredMessages.get(index - 1) :
                  null;
                var prevMsgCreated = prevMsg ? moment(prevMsg.get('created')) : moment(null);

                message.set('time', curMsgCreated.format('LT A'));
                if (!prevMsgCreated.isValid() || !prevMsgCreated.isSame(curMsgCreated, 'day')) {
                  message.set('date', curMsgCreated.format('MMMM Do, YYYY'));
                }
              });
            })
            ;
        }
      );
    }
  }
})();

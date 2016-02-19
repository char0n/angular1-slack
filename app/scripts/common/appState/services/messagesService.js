(function() {
  'use strict';

  angular
    .module('appState')
    .factory('messagesService', messagesService);

  function messagesService(Immutable, selectorsService) {
    return {
      send: send,
      markAsSent: markAsSent,
      markAsFailed: markAsFailed,
      setUserName: setUserName
    };

    function send(state, messagesState, action) {
      var currentUserId = selectorsService.currentUserIdSelector(state);
      var activeChannelFilter = selectorsService.activeChannelFilterSelector(state);
      var users = selectorsService.usersSelector(state);
      var currentUser = users.find(function(user) { return user.get('id') === currentUserId; });

      return messagesState.push(Immutable.Map({
        id: action.payload.created.format('x'),
        userId: currentUserId,
        userName: currentUser.get('name'),
        channelId: activeChannelFilter,
        body: action.payload.body,
        ident: action.payload.ident,
        sent: action.payload.sent,
        failed: action.payload.failed,
        date: action.payload.created.format('MMMM Do, YYYY'),
        time: action.payload.created.format('LT A')
      }));
    }

    function setUserName(state, messagesState, action) {
      var newState = messagesState;

      messagesState
        .filter(function(message) {
          return message.get('userId') === action.payload.id;
        })
        .map(function(message) {
          return messagesState.indexOf(message);
        })
        .forEach(function(index) {
          newState = newState.update(index, function(message) {
            return message.set('userName', action.payload.name);
          });
        });
      return newState;
    }

    function markAsSent(state, messagesState, action) {
      var messageIndex = messagesState.findIndex(function(message) {
        return message.get('ident') === action.payload;
      });
      return messagesState.update(
        messageIndex,
        function(message) {
          return message.withMutations(function(message) {
            message.set('sent', true).delete('ident');
          });
        }
      );
    }

    function markAsFailed(state, messagesState, action) {
      var messageIndex = messagesState.findIndex(function(message) {
        return message.get('ident') === action.payload;
      });
      return messagesState.update(
        messageIndex,
        function(message) {
          return message.withMutations(function(message) {
            message.set('sent', false).set('failed', true);
          });
        }
      );
    }
  }
})();

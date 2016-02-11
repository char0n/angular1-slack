(function() {
  'use strict';

  angular
    .module('app.chat')
    .factory('messagesService', messagesService);

  function messagesService(Immutable, moment, selectorsService) {
    return {
      send: send,
      setUserName: setUserName
    };

    function send(state, messagesState, payload) {
      var currentUserId = selectorsService.currentUserIdSelector(state);
      var activeChannelFilter = selectorsService.activeChannelFilterSelector(state);
      var users = selectorsService.usersSelector(state);
      var currentUser = users.find(function(user) { return user.get('id') === currentUserId; });
      var dateTime = moment();

      return messagesState.push(Immutable.Map({
        id: dateTime.format('x'),
        userId: currentUserId,
        userName: currentUser.get('name'),
        channelId: activeChannelFilter,
        body: payload,
        date: dateTime.format('MMMM Do, YYYY'),
        time: dateTime.format('LT A')
      }));
    }

    function setUserName(state, messagesState, payload) {
      var newState = messagesState;

      messagesState
        .filter(function(message) {
          return message.get('userId') === payload.id;
        })
        .map(function(message) {
          return messagesState.indexOf(message);
        })
        .forEach(function(index) {
          newState = newState.update(index, function(message) {
            return message.set('userName', payload.name);
          });
        });
      return newState;
    }
  }
})();

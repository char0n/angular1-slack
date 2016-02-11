(function() {
  'use strict';

  angular
    .module('app.chat')
    .factory('messagesService', messagesService);

  function messagesService(Immutable, moment, selectorsService) {
    return {
      send: send
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
  }
})();

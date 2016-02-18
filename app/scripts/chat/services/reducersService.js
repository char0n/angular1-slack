(function() {
  'use strict';

  angular
    .module('app.chat')
    .factory('reducersService', reducersService);

  function reducersService(Immutable, selectorsService, messagesService,
                           usersService, channelsService) {
    return {
      rootReducer: rootReducer,
      activeChannelFilter: activeChannelFilter,
      currentUserId: currentUserId,
      channels: channels,
      users: users,
      messages: messages
    };

    function rootReducer(state, action) {
      return Immutable.Map({
        activeChannelFilter: activeChannelFilter(
          state,
          selectorsService.activeChannelFilterSelector(state),
          action
        ),
        currentUserId: currentUserId(state, selectorsService.currentUserIdSelector(state), action),
        channels: channels(state, selectorsService.channelsSelector(state), action),
        users: users(state, selectorsService.usersSelector(state), action),
        messages: messages(state, selectorsService.messagesSelector(state), action)
      });
    }

    function activeChannelFilter(fullState, state, action) {
      switch (action.type) {
        case 'channel.switch': {
          return action.payload;
        }
        default: {
          return (typeof state === 'undefined') ? 1 : state;
        }
      }
    }

    function currentUserId(fullState, state, action) {
      switch (action.type) {
        default: {
          return (typeof state === 'undefined') ? 1 : state;
        }
      }
    }

    function channels(fullState, state, action) {
      switch (action.type) {
        case 'channel.setName': {
          return channelsService.setName(fullState, state, action);
        }
        default: {
          return (typeof state === 'undefined') ? Immutable.List() : state;
        }
      }
    }

    function users(fullState, state, action) {
      switch (action.type) {
        case 'users.setName': {
          return usersService.setName(fullState, state, action);
        }
        default: {
          return (typeof state === 'undefined') ? Immutable.List() : state;
        }
      }
    }

    function messages(fullState, state, action) {
      switch (action.type) {
        case 'messages.send': {
          return messagesService.send(fullState, state, action);
        }
        case 'messages.markAsSent': {
          return messagesService.markAsSent(fullState, state, action);
        }
        case 'messages.markAsFailed': {
          return messagesService.markAsFailed(fullState, state, action);
        }
        case 'users.setName': {
          return messagesService.setUserName(fullState, state, action);
        }
        default: {
          return (typeof state === 'undefined') ? Immutable.List() : state;
        }
      }
    }
  }
})();

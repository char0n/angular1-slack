(function() {
  'use strict';

  angular
    .module('app.chat')
    .factory('storeService', storeService);

  function storeService(reduxService) {
    var store;
    var initialState = {
      activeChannelFilter: 1,
      channels: [
        {id: 1, name: 'channel 1'},
        {id: 2, name: 'channel 2'},
        {id: 3, name: 'channel 3'},
        {id: 4, name: 'channel 4'}
      ],
      users: [
        {id: 1, name: 'Jiri Vopolka'},
        {id: 2, name: 'Vladimir Gorej'}
      ],
      messages: [
        {id: 0, channelId: 1, userId: 1, body: 'message body 1'},
        {id: 1, channelId: 1, userId: 2, body: 'message body 2'},
        {id: 2, channelId: 1, userId: 1, body: 'message body 3'}
      ]
    };

    function reducers(state, action) {
      var newState = angular.copy(state);

      switch (action.type) {
        case 'channel.updated': {
          newState.channels
            .filter(function(channel) {
              return channel.id === action.payload.channelId;
            })
            .forEach(function(channel) {
              return angular.extend(channel, action.payload.delta);
            });
          return newState;
        }
        default: {
          return newState;
        }
      }
    }

    store = reduxService.createStore(reducers, initialState);

    return store;
  }
})();

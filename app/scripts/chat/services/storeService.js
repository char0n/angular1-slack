(function() {
  'use strict';

  angular
    .module('app.chat')
    .factory('storeService', storeService);

  function storeService(Redux, Immutable) {
    var store;
    var initialState = Immutable.fromJS({
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
        {
          id: 0,
          channelId: 1,
          userId: 1,
          body: 'message body 1',
          created: '2016-02-03T14:03:02.782Z'
        },
        {
          id: 1,
          channelId: 1,
          userId: 2,
          body: 'message body 2',
          created: '2016-02-03T14:03:02.782Z'
        },
        {
          id: 2,
          channelId: 1,
          userId: 1,
          body: 'message body 3',
          created: '2016-02-03T14:03:02.782Z'
        },
        {
          id: 3,
          channelId: 1,
          userId: 1,
          body: 'message body 1',
          created: '2016-03-03T14:03:02.782Z'
        },
        {
          id: 4,
          channelId: 1,
          userId: 2,
          body: 'message body 2',
          created: '2016-03-03T14:03:02.782Z'
        },
        {
          id: 5,
          channelId: 1,
          userId: 1,
          body: 'message body 3',
          created: '2016-04-03T14:03:02.782Z'
        },
        {
          id: 6,
          channelId: 1,
          userId: 1,
          body: 'message body 1',
          created: '2016-04-03T14:03:02.782Z'
        },
        {
          id: 7,
          channelId: 1,
          userId: 2,
          body: 'message body 2',
          created: '2016-04-03T14:03:02.782Z'
        },
        {
          id: 8,
          channelId: 1,
          userId: 1,
          body: 'message body 3',
          created: '2016-05-03T14:03:02.782Z'
        }
      ]
    });

    store = Redux.createStore(combinedReducers, initialState);
    return store;

    //////////////
    // Reducers //
    //////////////
    function activeChannelFilter(state, action) {
      switch (action.type) {
        case 'channel.setActive': {
          return action.payload.activeChannelId;
        }
        default: {
          return (typeof state === 'undefined') ? 1 : state;
        }
      }
    }

    function channels(state, action) {
      switch (action.type) {
        case 'channel.setName': {
          return state.update(
            state.findIndex(function(channel) { return channel.get('id') === action.payload.id; }),
            function(channel) {
              return channel.set('name', action.payload.name);
            }
          );
        }
        default: {
          return (typeof state === 'undefined') ? Immutable.List() : state;
        }
      }
    }

    function users(state, action) {
      switch (action.type) {
        default: {
          return (typeof state === 'undefined') ? Immutable.List() : state;
        }
      }
    }

    function messages(state, action) {
      switch (action.type) {
        default: {
          return (typeof state === 'undefined') ? Immutable.List() : state;
        }
      }
    }

    function combinedReducers(state, action) {
      return Immutable.Map({
        activeChannelFilter: activeChannelFilter(state.get('activeChannelFilter'), action),
        channels: channels(state.get('channels'), action),
        users: users(state.get('users'), action),
        messages: messages(state.get('messages'), action)
      });
    }
  }
})();

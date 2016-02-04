(function() {
  'use strict';

  angular
    .module('app.chat')
    .factory('storeService', storeService);

  function storeService(Redux, Immutable, moment, _) {
    var store;
    var messageIdCounter = 1;
    var initialDate = moment();
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
      messages: []
        .concat(generateMessages(1, 20))
        .concat(generateMessages(2, 30))
        .concat(generateMessages(3, 40))
        .concat(generateMessages(4, 50))
    });

    store = Redux.createStore(combinedReducers, initialState);
    return store;

    //////////////
    // Reducers //
    //////////////
    function activeChannelFilter(state, action) {
      switch (action.type) {
        case 'channel.switch': {
          return action.payload.channelId;
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

    ////////////////
    // Generators //
    ////////////////
    function generateMessages(channelId, size) {
      var loremIpsum = 'Phasellus vulputate sapien mi. Praesent a risus elit.' +
        ' Sed sodales ut tellus ec elementum. Donec hendrerit dui sit amet' +
        ' velit pulvinar ornare. Maecenas eget pharetra est. Morbi quis vehicula' +
        ' sapien. Curabitur eget vestibulum turpis. Cras posuere orci ut' +
        ' dignissim blandit. Morbi fermentum orci eu sem eleifend, id maximus' +
        ' turpis ultrices. Nam aliquam placerat leo id egestas. Donec ' +
        'condimentum fermentum porta. In vulputate, leo sit amet vehicula' +
        ' viverra, ex massa varius est, eu pellentesque lectus augue ac tortor.';
      var userIds = [1, 2];
      var i = 0;
      var messages = [];

      for (i; i < size; i++) {
        messages.push({
          id: messageIdCounter++,
          channelId: channelId,
          userId: _.sample(userIds),
          body: loremIpsum.substr(10, _.random(10, loremIpsum.length, true)),
          created: initialDate.clone().add(_.random(1, 5), 'days').format()
        });
      }
      return messages.sort(function(a, b) {
        var am = moment(a.created);
        var bm = moment(b.created);

        if (am.isSame(bm)) { return 0; }
        if (am.isBefore(bm)) { return -1; }
        if (am.isAfter(bm)) { return 1; }
      });
    }
  }
})();

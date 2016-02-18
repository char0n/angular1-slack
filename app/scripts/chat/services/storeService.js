(function() {
  'use strict';

  angular
    .module('app.chat')
    .factory('storeService', storeService);

  function storeService(Redux, reduxThunk, Immutable, moment, reduxMiddlewareService,
                        reducersService, _) {
    var store;
    var initialDate = moment();
    var initialState = Immutable.fromJS({
      activeChannelFilter: 1,
      currentUserId: 1,
      channels: [
        {id: 1, name: 'channel 1', board: 'This is board for channe1', userIds: [1, 2]},
        {id: 2, name: 'channel 2', board: 'This is board for channe2', userIds: [1]},
        {id: 3, name: 'channel 3', board: 'This is board for channe3', userIds: [2]},
        {id: 4, name: 'channel 4', board: 'This is board for channe4', userIds: []}
      ],
      users: [
        {id: 1, name: 'Jiri Vopolka'},
        {id: 2, name: 'Vladimir Gorej'}
      ],
      messages: []
        .concat(generateMessages(1, 20))
        .concat(generateMessages(2, 20))
        .concat(generateMessages(3, 20))
        .concat(generateMessages(4, 20)),
      genMessages: []
    });

    store = Redux.createStore(
      reducersService.rootReducer,
      initialState,
      Redux.applyMiddleware(
        reduxThunk,
        reduxMiddlewareService.logging
      )
    );
    return store;

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
      var users = [
        {id: 1, name: 'Jiri Vopolka'},
        {id: 2, name: 'Vladimir Gorej'}
      ];

      var i = 0;
      var user;
      var date;
      var messages = [];

      for (i; i < size; i++) {
        user = _.sample(users);
        date = initialDate.clone().add(_.random(1, 5), 'days');

        messages.push({
          id: date.format('x'),
          channelId: channelId,
          userId: user.id,
          userName: user.name,
          body: loremIpsum.substr(10, _.random(10, loremIpsum.length, true)),
          created: date.format(),
          date: date.format('MMMM Do, YYYY'),
          time: date.format('LT A')
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

(function() {
  'use strict';

  angular
    .module('app.chat')
    .factory('actionsService', actionsService);

  function actionsService(reduxActions) {
    var messagesSend = reduxActions.createAction('messages.send', function(body) {
      return {
        body: body,
        sent: false,
        ident: Math.random()
      };
    });

    return {
      channels: {
        switch: reduxActions.createAction('channel.switch'),
        setName: reduxActions.createAction('channel.setName')
      },
      messages: {
        send: messagesSend,
        markAsSent: reduxActions.createAction('messages.markAsSent'),
        markAsFailed: reduxActions.createAction('messages.markAsFailed')
      },
      users: {
        setName: reduxActions.createAction('users.setName')
      }
    };
  }
})();

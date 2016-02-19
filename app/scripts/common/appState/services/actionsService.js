(function() {
  'use strict';

  angular
    .module('appState')
    .factory('actionsService', actionsService);

  function actionsService(reduxActions, moment) {
    var messagesSend = reduxActions.createAction('messages.send', function(body) {
      return {
        body: body,
        ident: Math.random(),
        sent: false,
        failed: false,
        created: moment()
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

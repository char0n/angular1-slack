(function() {
  'use strict';

  angular
    .module('app.chat')
    .factory('actionsService', actionsService);

  function actionsService(reduxActions) {
    return {
      channels: {
        switch: reduxActions.createAction('channel.switch'),
        setName: reduxActions.createAction('channel.setName')
      },
      messages: {
        send: reduxActions.createAction('messages.send')
      },
      users: {
        setName: reduxActions.createAction('users.setName')
      }
    };
  }
})();

(function() {
  'use strict';

  angular
    .module('app.chat')
    .factory('actionsService', actionsService);

  function actionsService(reduxActions) {
    return {
      channels: {
        switch: reduxActions.createAction('channel.switch')
      },
      messages: {
        send: reduxActions.createAction('messages.send')
      }
    };
  }
})();

(function() {
  'use strict';

  angular
    .module('app.chat')
    .factory('actionsService', actionsService);

  function actionsService(reduxActions) {
    return {
      switchChannel: reduxActions.createAction('channel.switch')
    };
  }
})();

(function() {
  'use strict';

  angular
    .module('appState')
    .factory('apiActionsService', apiActionsService);

  function apiActionsService($q, actionsService) {
    return {
      messages: {
        send: messagesSend
      }
    };

    function messagesSend(body) {
      return function(dispatch) {
        var action = dispatch(actionsService.messages.send(body));

        // Simulated API request.
        $q
          .when({ok: true})
          .then(function() {
            // Mark message as sent.
            dispatch(actionsService.messages.markAsSent(action.payload.ident));
          })
          .catch(function() {
            // Mark message as failed.
            dispatch(actionsService.messages.markAsFailed(action.payload.ident));
          });

        return action;
      };
    }
  }
})();

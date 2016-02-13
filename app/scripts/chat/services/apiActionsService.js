(function() {
  'use strict';

  angular
    .module('app.chat')
    .factory('apiActionsService', apiActionsService);

  function apiActionsService($q, actionsService) {
    return {
      messages: {
        send: messagesSend
      }
    };

    function messagesSend(body) {
      return function(dispatch) {
        var message = dispatch(actionsService.messages.send(body)).payload;

        // Simulated API request.
        $q
          .when({ok: true})
          .then(function() {
            // Mark message as sent.
            dispatch(actionsService.messages.markAsSent(message.ident));
          })
          .catch(function() {
            // Mark message as failed.
            dispatch(actionsService.messages.markAsFailed(message.ident));
          });

        return message;
      };
    }
  }
})();

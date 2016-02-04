(function() {
  'use strict';

  angular
    .module('app.chat')
    .factory('actionsService', actionsService);

  function actionsService() {
    return {
      switchChannel: switchChannel
    };

    function switchChannel(channelId) {
      return {
        type: 'channel.switch',
        payload: {
          channelId: channelId
        }
      };
    }
  }
})();

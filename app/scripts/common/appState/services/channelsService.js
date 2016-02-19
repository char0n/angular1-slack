(function() {
  'use strict';

  angular
    .module('appState')
    .factory('channelsService', channelsService);

  function channelsService() {
    return {
      setName: setName
    };

    function setName(state, channelsState, payload) {
      var index = channelsState.findIndex(function(channel) {
        return channel.get('id') === payload.id; }
      );

      return channelsState.update(
        index,
        function(channel) {
          return channel.set('name', payload.name);
        }
      );
    }
  }
})();

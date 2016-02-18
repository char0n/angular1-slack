(function() {
  'use strict';

  angular
    .module('app.chat')
    .factory('usersService', usersService);

  function usersService() {
    return {
      setName: setName
    };

    function setName(state, usersState, action) {
      var index = usersState.findIndex(function(user) {
        return user.get('id') === action.payload.id; }
      );

      return usersState.update(
        index,
        function(user) {
          return user.set('name', action.payload.name);
        }
      );

    }
  }
})();

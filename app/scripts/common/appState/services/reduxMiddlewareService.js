(function() {
  'use strict';

  angular
    .module('appState')
    .factory('reduxMiddlewareService', reduxMiddlewareService);

  function reduxMiddlewareService() {
    return {
      logging: logging
    };

    function logging() {
      return function(next) {
        return function(action) {
          console.info('Dispatched action: `%s`', action.type, action);
          return next(action);
        };
      };
    }
  }
})();

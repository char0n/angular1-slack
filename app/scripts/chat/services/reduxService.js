(function() {
  'use strict';

  angular
    .module('app.chat')
    .factory('reduxService', reduxService);

  function reduxService($window) {
    return $window.Redux;
  }
})();

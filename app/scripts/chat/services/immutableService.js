(function() {
  'use strict';

  angular
    .module('app.chat')
    .factory('immutableService', immutableService);

  function immutableService($window) {
    return $window.Immutable;
  }
})();

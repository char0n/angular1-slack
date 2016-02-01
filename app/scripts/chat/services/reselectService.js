(function() {
  'use strict';

  angular
    .module('app.chat')
    .factory('reselectService', reselectService);

  function reselectService($window) {
    return $window.reselect;
  }
})();

(function() {
  'use strict';

  angular
    .module('vendor', [])
    .factory('_', lodash)
    .factory('Redux', redux)
    .factory('reselect', _reselect)
    .factory('Immutable', immutable)
    .factory('moment', _moment);

  function lodash($window) {
    return $window._;
  }

  function redux($window) {
    return $window.Redux;
  }

  function _reselect($window) {
    return $window.reselect;
  }

  function immutable($window) {
    return $window.Immutable;
  }

  function _moment($window) {
    return $window.moment;
  }
})();

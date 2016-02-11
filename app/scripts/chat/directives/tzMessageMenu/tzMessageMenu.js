(function() {
  'use strict';

  angular
    .module('app.chat')
    .directive('tzMessageMenu', tzMessageMenu);

  function tzMessageMenu() {
    return {
      restrict: 'E',
      templateUrl: 'scripts/chat/directives/tzMessageMenu/tz-message-menu.tpl.html'
    };
  }
})();

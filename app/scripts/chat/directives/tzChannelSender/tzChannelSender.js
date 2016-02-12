(function() {
  'use strict';

  angular
    .module('app.chat')
    .directive('tzChannelSender', tzChannelSender);

  function tzChannelSender() {
    return {
      restrict: 'E',
      templateUrl: 'scripts/chat/directives/tzChannelSender/tz-channel-sender.tpl.html',
      link: tzChannelSenderLinker,
      controller: function() {},
      controllerAs: 'tzChannelSender'
    };

    function tzChannelSenderLinker(scope, element) {
      element.css('height', '60px');
    }
  }
})();

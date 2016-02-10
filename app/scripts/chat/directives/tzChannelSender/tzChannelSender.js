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
      controller: TzChannelSenderLinkerController,
      controllerAs: 'tzChannelSender'
    };

    function tzChannelSenderLinker(scope, element, attributes, controller) {
      element.css('height', '60px');
      element.find('textarea').on('keypress', function(event) {
        if (event.which !== 13) { return; }

        event.preventDefault();

        var textarea = angular.element(this);
        var value = textarea.val();
        if (value.trim() !== '') {
          controller.send(textarea.val());
          textarea.val('');
        }
      });
    }
  }

  function TzChannelSenderLinkerController(storeService, actionsService) {
    var vm = this;
    vm.send = send;

    function send(string) {
      storeService.dispatch(actionsService.messages.send(string));
    }
  }
})();

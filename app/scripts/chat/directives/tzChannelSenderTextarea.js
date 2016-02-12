(function() {
  'use strict';

  angular
    .module('app.chat')
    .directive('tzChannelSenderTextarea', tzChannelSenderTextarea);

  function tzChannelSenderTextarea() {
    return {
      restrict: 'A',
      require: ['^tzChannelSender', 'tzChannelSenderTextarea'],
      link: tzChannelSenderTextareaLinker,
      controller: TzChannelSenderTextareaController,
      controllerAs: 'tzChannelSenderTextarea'
    };

    function tzChannelSenderTextareaLinker(scope, element, attributes, controllers) {
      var controller = controllers[1];

      element.on('keypress.tzChannelSenderTextarea', sendMessageHandler);

      function sendMessageHandler(event) {
        if (event.which !== 13 || event.shiftKey) { return; }

        event.preventDefault();

        var value = element.val();
        if (value.trim() !== '') {
          controller.send(element.val());
          element.val('');
        }
      }

      scope.$on('$destroy', function() {
        element.off('.tzChannelSenderTextarea');
      });
    }
  }

  function TzChannelSenderTextareaController(storeService, actionsService) {
    var vm = this;
    vm.send = send;

    function send(string) {
      storeService.dispatch(actionsService.messages.send(string));
    }
  }
})();

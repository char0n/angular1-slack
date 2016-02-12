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
      controller: TzChannelSenderTextarea,
      controllerAs: 'tzChannelSenderTextarea'
    };

    function tzChannelSenderTextareaLinker(scope, element, attributes, controllers) {
      var controller = controllers[1];

      element.on('keypress', function(event) {
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

  function TzChannelSenderTextarea(storeService, actionsService) {
    var vm = this;
    vm.send = send;

    function send(string) {
      storeService.dispatch(actionsService.messages.send(string));
    }
  }
})();

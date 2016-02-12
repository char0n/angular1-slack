(function() {
  'use strict';

  angular
    .module('app.chat')
    .directive('tzResizableTextarea', tzResizableTextarea);

  function tzResizableTextarea() {
    return {
      restrict: 'A',
      link: tzResizableTextareaLinker
    };

    function tzResizableTextareaLinker(scope, element) {
      var initialHeight = element.height();

      element.on('keypress.tzResizableTextarea', resizeTextareaHandler);
      element.on('keypress.tzResizableTextarea', restoreOriginalSizeHandler);

      function resizeTextareaHandler(event) {
        if (!(event.which === 13 && event.shiftKey)) { return; }

        element.css('min-height', parseFloat(element.css('min-height')) + initialHeight);
      }

      function restoreOriginalSizeHandler() {
        if (!(event.which === 13 && !event.shiftKey)) { return; }

        element.css('min-height', initialHeight);
      }

      scope.$on('$destroy', function() {
        element.off('.tzResizableTextarea');
      });
    }
  }
})();

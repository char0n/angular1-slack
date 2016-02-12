(function() {
  'use strict';

  angular
    .module('app.chat')
    .directive('tzResizableTextarea', tzResizableTextarea);

  function tzResizableTextarea() {
    return {
      restrict: 'A',
      priority: 0,
      link: tzResizableTextareaLinker
    };

    function tzResizableTextareaLinker(scope, element) {
      var initialHeight = element.height();

      element.on('keypress.tzResizableTextarea', resizeTextareaHandler);
      element.on('keypress.tzResizableTextarea', restoreOriginalSizeHandler);

      function resizeTextareaHandler(event) {
        if (!(event.which === 13 && event.shiftKey)) { return; }

        element.height(element.height() + initialHeight);
      }

      function restoreOriginalSizeHandler(event) {
        if (!(event.which === 13 && !event.shiftKey)) { return; }

        element.height(initialHeight);
      }

      scope.$on('$destroy', function() {
        element.off('.tzResizableTextarea');
      });
    }
  }
})();

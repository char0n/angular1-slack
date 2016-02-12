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
      element.on('keyup.tzResizableTextarea', shrinkTextareaHandler);

      ///////////
      // Utils //
      ///////////
      function countNewLines(string) {
        return string.split(/\n/).length;
      }

      //////////////
      // Handlers //
      //////////////
      function resizeTextareaHandler(event) {
        if (!(event.which === 13 && event.shiftKey)) { return; }

        element.height(element.height() + initialHeight);
      }

      function restoreOriginalSizeHandler(event) {
        if (!(event.which === 13 && !event.shiftKey)) { return; }

        element.height(initialHeight);
      }

      function shrinkTextareaHandler(event) {
        if (event.which !== 46 && event.which !== 8) { return; }

        var newLinesCount = countNewLines(angular.element(event.target).val());
        if (newLinesCount > 0) {
          element.height(newLinesCount * initialHeight);
        }
      }

      scope.$on('$destroy', function() {
        element.off('.tzResizableTextarea');
      });
    }
  }
})();

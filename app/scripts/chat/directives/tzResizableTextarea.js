(function() {
  'use strict';

  angular
    .module('app.chat')
    .directive('tzResizableTextarea', tzResizableTextarea);

  function tzResizableTextarea(_) {
    return {
      restrict: 'A',
      priority: 0,
      link: tzResizableTextareaLinker
    };

    function tzResizableTextareaLinker(scope, element) {
      var initialHeight = element.height();

      element.on('keypress.tzResizableTextarea', growHandler);
      element.on('keypress.tzResizableTextarea', restoreHandler);
      element.on('keyup.tzResizableTextarea', shrinkHandler);
      element.on('input.tzResizableTextarea change.tzResizableTextarea',
        _.debounce(inputHandler, 200));

      ///////////
      // Utils //
      ///////////
      function countNewLines(string) {
        return string.split(/\n/).length;
      }

      //////////////
      // Handlers //
      //////////////
      function growHandler(event) {
        if (!(event.which === 13 && event.shiftKey)) { return; }

        element.height(element.height() + initialHeight);
      }

      function restoreHandler(event) {
        if (!(event.which === 13 && !event.shiftKey)) { return; }

        element.height(initialHeight);
      }

      function shrinkHandler(event) {
        if (event.which !== 46 && event.which !== 8) { return; }

        var newLinesCount = countNewLines(angular.element(event.target).val());
        if (newLinesCount > 0) {
          element.height(newLinesCount * initialHeight);
        }
      }

      function inputHandler() {
        var newLinesCount = countNewLines(element.val());
        element.height(newLinesCount * initialHeight);
      }

      scope.$on('$destroy', function() {
        element.off('.tzResizableTextarea');
      });
    }
  }
})();

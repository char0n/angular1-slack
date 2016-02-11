(function() {
  'use strict';

  angular
    .module('app.chat')
    .directive('tzMessageList', tzMessageList);

  function tzMessageList($window, $timeout, _) {
    return {
      restrict: 'A',
      link: tzMessageListLinker
    };

    function tzMessageListLinker(scope, element) {
      var alreadyAtBottom = true;
      var observer = new $window.MutationObserver(scrollToBottom);
      var throttledOnScrollHandler = _.throttle(function() {
        alreadyAtBottom = isAtBottom();
      }, 250);

      observer.observe(element.children('md-list').get(0), {childList: true});
      element.on('scroll.tzMessageList', throttledOnScrollHandler);

      function scrollToBottom() {
        if (alreadyAtBottom) {
          element.scrollTop(element.prop('scrollHeight'));
        }
      }

      function isAtBottom() {
        var scrollTop = element.scrollTop();
        var maxHeight = element.prop('scrollHeight') - element.prop('clientHeight');

        return scrollTop >= maxHeight;
      }

      $timeout(scrollToBottom); // Handle scrolling to bottom after refresh/app start.

      scope.$on('$destroy', function() {
        element.off('.tzMessageList');
        observer.disconnect();
      });
    }
  }
})();

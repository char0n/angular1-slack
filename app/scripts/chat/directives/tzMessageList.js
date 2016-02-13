(function() {
  'use strict';

  angular
    .module('app.chat')
    .directive('tzMessageList', tzMessageList);

  function tzMessageList($window, $timeout, storeService, selectorsService, _) {
    return {
      restrict: 'A',
      link: tzMessageListLinker
    };

    function tzMessageListLinker(scope, element) {
      var alreadyAtBottom = true;
      var observer = new $window.MutationObserver(scrollToBottom);
      var throttledOnScrollHandler = _.throttle(scrollHandler, 250);
      var activeChannelId = selectorsService.activeChannelFilterSelector(storeService.getState());
      var storeUnsubscribe = storeService.subscribe(storeSubscriber);

      observer.observe(element.children('md-list').get(0), {childList: true});

      element.on('scroll.tzMessageList', throttledOnScrollHandler);

      $timeout(scrollToBottom); // Handle scrolling to bottom after refresh/app start.

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

      function scrollHandler() {
        alreadyAtBottom = isAtBottom();
      }

      function storeSubscriber() {
        var channelId = selectorsService.activeChannelFilterSelector(storeService.getState());
        if (activeChannelId !== channelId) {
          alreadyAtBottom = true;
          activeChannelId = channelId;
          scrollToBottom();
        }
      }

      scope.$on('$destroy', function() {
        element.off('.tzMessageList');
        observer.disconnect();
        storeUnsubscribe();
      });
    }
  }
})();

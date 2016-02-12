(function() {
  'use strict';

  angular
    .module('app.chat')
    .directive('tzMessageMenu', tzMessageMenu);

  function tzMessageMenu() {
    return {
      restrict: 'E',
      require: ['^md-list-item', 'tzMessageMenu'],
      templateUrl: 'scripts/chat/directives/tzMessageMenu/tz-message-menu.tpl.html',
      link: tzMessageMenuLinker,
      controller: TzMessageMenuController,
      controllerAs: 'tzMessageMenu'
    };

    function tzMessageMenuLinker(scope, element) {
      scope.$on('$mdMenuOpen', function() {
        element.parents('.tz-message').addClass('active');
      });

      scope.$on('$mdMenuClose', function() {
        element.parents('.tz-message').removeClass('active');
      });
    }
  }

  function TzMessageMenuController() {
    var vm = this;
    vm.openMenu = openMenu;

    function openMenu($mdOpenMenu, $event) {
      $mdOpenMenu($event);
    }
  }
})();

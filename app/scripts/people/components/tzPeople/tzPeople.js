(function() {
  'use strict';

  angular
    .module('app.people')
    .component('tzPeople', tzPeopleFactory());

  function tzPeopleFactory() {
    return {
      templateUrl: 'scripts/people/components/tzPeople/tz-people.tpl.html',
      controller: TzPeopleController,
      controllerAs: 'people'
    };
  }

  function TzPeopleController() {

  }
})();

(function() {
  'use strict';

  angular
    .module('app.calendar')
    .component('tzCalendar', tzCalendarFactory());

  function tzCalendarFactory() {
    return {
      templateUrl: 'scripts/calendar/components/tzCalendar/tz-calendar.tpl.html',
      controller: TzCalendarController,
      controllerAs: 'tzCalendar'
    };
  }

  function TzCalendarController() {
  }
})();

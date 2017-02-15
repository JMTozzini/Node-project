'use strict';

/**
 * @ngdoc filter
 * @name nodeProjectApp.filter:fromNow
 * @function
 * @description
 * # fromNow
 * Filter in the nodeProjectApp.
 */
angular.module('nodeProjectApp')
  .filter('fromNow', function (moment) {
    return function (date) {
      return moment(date).locale('fr').fromNow();
    };
  });

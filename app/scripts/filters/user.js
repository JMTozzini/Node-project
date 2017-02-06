'use strict';

/**
 * @ngdoc filter
 * @name nodeProjectApp.filter:user
 * @function
 * @description
 * # user
 * Filter in the nodeProjectApp.
 */
angular.module('nodeProjectApp')
  .filter('user', function () {
    return function (users, id) {
      return _.find(users, {_id: id}).login;
    };
  });

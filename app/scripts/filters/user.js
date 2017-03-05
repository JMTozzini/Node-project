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
			var user = _.find(users, {_id: id});

      return _.get(user, 'firstName', '') + ' ' + _.get(user, 'lastName', '') + ' (' + _.get(user, 'login', '') + ')';
    };
  })
	.filter('userCoord', function () {
    return function (users, id) {
			var user = _.find(users, {_id: id});

      return [_.get(user, 'lat'), _.get(user, 'long')];
    };
  });

'use strict';

/**
 * @ngdoc service
 * @name nodeProjectApp.serviceAjax
 * @description
 * # serviceAjax
 * Factory in the nodeProjectApp.
 */
angular.module('nodeProjectApp')
  .factory('serviceAjax', function ($http) {
		var host = 'http://localhost:3000';

    return {
      createProject: function (project) {
				var req = {
	        method: 'POST',
	        url: host + '/create-project',
					data: project
	      };
        return $http(req);
      },

      updateProject: function (project) {
				var req = {
	        method: 'PUT',
	        url: host + '/project/' + project._id,
					data: project
	      };
        return $http(req);
      },

      getUser: function (user) {
				var req = {
	        method: 'GET',
	        url: host + '/user/' + user
	      };
        return $http(req);
      },

      getUsers: function () {
				var req = {
	        method: 'GET',
	        url: host + '/users'
	      };
        return $http(req);
      },

      getUserById: function (userId) {
				var req = {
	        method: 'GET',
	        url: host + '/userById/' + userId
	      };
        return $http(req);
      },

      createUser: function (user) {
				var req = {
	        method: 'POST',
	        url: host + '/user',
					data: {user}
	      };
        return $http(req);
      },

      getProjects: function (userId) {
				var req = {
	        method: 'GET',
	        url: host + '/projects',
					params: {userId}
	      };
        return $http(req);
      },

      getProject: function (projectId) {
				var req = {
	        method: 'GET',
	        url: host + '/project/' + projectId,
	      };
        return $http(req);
      }
    };
  });

'use strict';

/**
 * @ngdoc function
 * @name nodeProjectApp.controller:ProjectsCtrl
 * @description
 * # ProjectsCtrl
 * Controller of the nodeProjectApp
 */
angular.module('nodeProjectApp')
  .controller('ProjectsCtrl', function($scope, $location, $cookies, serviceAjax) {
    $scope.create = function() {
      $location.path("/create-project");
    };

		$scope.getUsers = function(userId) {
			serviceAjax.getUsers().then(
				function successCallback(response) {
					if (!response.data.length) {
						$scope.message = 'Utilisateur inexistant';
					} else {
						$scope.users = response.data;
						$scope.connectedUser = _.find(response.data, {_id: $cookies.get('login')}).login;
					}
				},
				function errorCallback(response) {
					$scope.message = 'Erreur';
				}
			);
		};
    $scope.getUsers();

		$scope.getUser = function(userId) {
			return _.find($scope.users, {_id: userId}).login
		}

    $scope.loadProjects = function() {
      serviceAjax.getProjects().then(
				function successCallback(response) {
					if(response.data.length) {
						$scope.projects = response.data
					} else {
						$scope.message = 'Pas de projets';
					}
				},
				function errorCallback(response) {
					$scope.message = 'Erreur';
				}
			);
    };
    $scope.loadProjects();

		$scope.openProject = function(projectId) {
			$location.path('/project/' + projectId);
		}
  });

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

		$scope.getUser = function() {
			serviceAjax.getUserById($cookies.get('login')).then(
				function successCallback(response) {
					if (!response.data.length) {
						$scope.message = 'Utilisateur inexistant';
					} else {
						$scope.user = response.data[0].login;
						$location.path('/projects');
					}
				},
				function errorCallback(response) {
					$scope.message = 'Erreur';
				}
			);
		};
    $scope.getUser();

		// $scope.user = $cookies.get('login');

    $scope.loadProjects = function() {
      serviceAjax.getProjects($cookies.get('login')).then(
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
  });

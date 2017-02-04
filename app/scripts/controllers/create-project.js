'use strict';

/**
 * @ngdoc function
 * @name nodeProjectApp.controller:CreateProjectCtrl
 * @description
 * # CreateProjectCtrl
 * Controller of the nodeProjectApp
 */
angular.module('nodeProjectApp')
  .controller('CreateProjectCtrl', function($scope, $cookies, $location, serviceAjax) {

    $scope.create = function(project) {
			project.owner = $cookies.get('login');
			serviceAjax.createProject(project).then(
				function successCallback(response) {
					$scope.backProjects();
				},
				function errorCallback(response) {
				}
			);
		};

		$scope.backProjects = function() {
			$location.path('/projects');
		}

    $scope.reset = function() {
      $scope.project = {};
    };

    $scope.reset();
  });

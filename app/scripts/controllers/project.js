'use strict';

/**
 * @ngdoc function
 * @name nodeProjectApp.controller:ProjectsCtrl
 * @description
 * # ProjectsCtrl
 * Controller of the nodeProjectApp
 */
angular.module('nodeProjectApp')
  .controller('ProjectCtrl', function($scope, $location, $routeParams, $mdSidenav, serviceAjax) {

		$scope.backProjects = function() {
			$location.path('/projects');
		}

		$scope.toggleRight = function() {
			$mdSidenav('right')
		    .toggle()
		}

    $scope.loadProject = function() {
      serviceAjax.getProject($routeParams.projectId).then(
				function successCallback(response) {
					if(response.data.length) {
						$scope.project = response.data[0];
					} else {
						$scope.message = 'Pas de projets';
					}
				},
				function errorCallback(response) {
					$scope.message = 'Erreur';
				}
			);
    };
    $scope.loadProject();
  });

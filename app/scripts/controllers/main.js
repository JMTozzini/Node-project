'use strict';

/**
 * @ngdoc function
 * @name nodeProjectApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the nodeProjectApp
 */
angular.module('nodeProjectApp')
  .controller('MainCtrl', function ($scope, $location, $cookies, serviceAjax) {

		$scope.connect = function (user) {
			serviceAjax.getUser(user.login).then(
				function successCallback(response) {
					if (!response.data.length) {
						$scope.message = 'Utilisateur inexistant';
					} else {
						$cookies.put('login', response.data[0]._id);
						// $scope.message = 'Connexion réussie';
						// $scope.message = $cookies.get('login');
						$location.path('/projects');
					}
				},
				errorFunction
			);
		};

		$scope.create = function (user) {
			serviceAjax.createUser(user).then(
				function successCallback(response) {
					$scope.message = 'Création réussie';
				},
				errorFunction
			);
		};
		function errorFunction(response) {
			$scope.message = 'Problème lors de la connexion';
		}
  });

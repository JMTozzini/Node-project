'use strict';

/**
 * @ngdoc function
 * @name nodeProjectApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the nodeProjectApp
 */
angular.module('nodeProjectApp')
  .controller('MainCtrl', function ($scope, $location, $cookies, serviceAjax, geolocation) {

		$scope.updateLocation = function (user) {
			geolocation.getLocation()
				.then(function(data){
						var userWithLocation = _.merge(user, {lat:data.coords.latitude, long:data.coords.longitude})
		      	return serviceAjax.updateProfile(user._id, userWithLocation);
		    });
		}

		$scope.connect = function (user) {
			serviceAjax.getUser(user.login).then(
				function successCallback(response) {
					if (!_.get(response,'data', []).length) {
						$scope.message = 'Utilisateur inexistant';
					} else {
						var user = response.data[0];

						$scope.updateLocation(user);
						$cookies.put('login', user._id);
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

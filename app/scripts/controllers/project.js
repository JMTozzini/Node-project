'use strict';

/**
 * @ngdoc function
 * @name nodeProjectApp.controller:ProjectsCtrl
 * @description
 * # ProjectsCtrl
 * Controller of the nodeProjectApp
 */
angular.module('nodeProjectApp')
  .controller('ProjectCtrl', function($scope, $location, $routeParams, $mdSidenav, $cookies, moment, serviceAjax) {

		$scope.backProjects = function() {
			$location.path('/projects');
		};

		$scope.showBack = true;
		$scope.showChat = true;

		$scope.toggleRight = function() {
			$mdSidenav('right').toggle();
		};

		// $scope.toggleRight();
		// $scope.messages = [];

		$scope.socket = io.connect('http://localhost:3000');

		$scope.sendMsg = function () {
			$scope.socket.emit('chat message', {msg: $scope.msg, sender: $cookies.get('login'), project : $scope.project, date: new Date()});
		}

		$scope.socket.on('chat message', function (msg) {
			$scope.messages = _.concat(msg, $scope.messages);
			$scope.messages = _.sortBy($scope.messages, [sortMsg]);
			$scope.msg = '';
			$scope.$apply();
		});

    $scope.loadProject = function() {
      serviceAjax.getProject($routeParams.projectId).then(
				function successCallback(response) {
					if(response.data.length) {
						$scope.project = response.data[0];
						$scope.messages = _.sortBy($scope.project.messages, [sortMsg]);
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

		$scope.getUsers = function(userId) {
			serviceAjax.getUsers().then(
				function successCallback(response) {
					if (!response.data.length) {
						$scope.message = 'Utilisateur inexistant';
					} else {
						$scope.users = response.data;
					}
				},
				function errorCallback(response) {
					$scope.message = 'Erreur';
				}
			);
		};
    $scope.getUsers();

		function sortMsg(msg) {
			return - new Date(msg.date);
		}
  });

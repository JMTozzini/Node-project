'use strict';

/**
 * @ngdoc function
 * @name nodeProjectApp.controller:ProjectsCtrl
 * @description
 * # ProjectsCtrl
 * Controller of the nodeProjectApp
 */
angular.module('nodeProjectApp')
  .controller('ProjectsCtrl', function($scope, $location, $cookies, $mdDialog, serviceAjax) {

		$scope.create = function() {
      $location.path("/create-project");
    };

		// $scope.showBack = false;
		// $scope.showChat = false;
		$scope.showEditProfile = true;

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

		$scope.open = true;

		$scope.customFullscreen = false;

		$scope.showCreate = function(ev) {
			$mdDialog.show({
				controller: createProjectCtrl,
				templateUrl: '../../views/create-project.html',
				parent: angular.element(document.body),
				targetEvent: ev,
				clickOutsideToClose: true,
				fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
	    }).then(function() {
		    $scope.loadProjects();
	      $scope.apply();
			});
		};

		function createProjectCtrl($scope, $mdDialog) {

	    $scope.create = function(project) {
				project.owner = $cookies.get('login');
				serviceAjax.createProject(project).then(
					function successCallback(response) {
						$mdDialog.hide();
					},
					function errorCallback(response) {
					}
				);
			};

	    $scope.reset = function() {
	      $scope.project = {};
	    };

	    $scope.reset();


    	$scope.cancel = function() {
	      $mdDialog.cancel();
	    };
		}

		$scope.editProfile = function(ev) {
			$mdDialog.show({
				controller: editProfileCtrl,
				templateUrl: '../../views/edit-profile.html',
				parent: angular.element(document.body),
				targetEvent: ev,
				clickOutsideToClose: true,
				locals: {users: $scope.users},
				fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
			}).then(function() {
			});
		};

		function editProfileCtrl($scope, $mdDialog, $cookies, users) {

			$scope.update = function() {
				// var userToUpdate = _.merge($scope.user, _.find($scope.users, {_id: $scope.userId}));
				serviceAjax.updateProfile($scope.userId, $scope.user).then(
					function successCallback(response) {
						$mdDialog.hide();
					},
					function errorCallback(response) {
					}
				);
			};

			$scope.userId = $cookies.get('login');

			$scope.users = users;

			$scope.user = _.find($scope.users, {_id: $scope.userId});

			$scope.cancel = function() {
				$mdDialog.cancel();
			};
		}
  });

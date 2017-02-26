'use strict';

/**
 * @ngdoc function
 * @name nodeProjectApp.controller:ProjectsCtrl
 * @description
 * # ProjectsCtrl
 * Controller of the nodeProjectApp
 */
angular.module('nodeProjectApp')
  .controller('ProjectCtrl', function($scope, $location, $routeParams, $mdSidenav, $cookies, $mdDialog, geolocation, moment, NgMap, serviceAjax) {

		$scope.backProjects = function() {
			$location.path('/projects');
		};

		$scope.showBack = true;
		$scope.showChat = true;
		$scope.showEdit = true;

		$scope.toggleRight = function() {
			$mdSidenav('right').toggle();
		};

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

		geolocation.getLocation().then(function(data){
      $scope.coords = {lat:data.coords.latitude, long:data.coords.longitude};
    });

		// NgMap.getMap().then(function(map) {
	  //   console.log(map.getCenter());
	  //   console.log('markers', map.markers);
	  //   console.log('shapes', map.shapes);
	  // });

		$scope.joinProject = function () {
			serviceAjax.joinProject($cookies.get('login'), $scope.project._id).then(
				function successCallback(response) {
		    	$scope.loadProject();
				},
				function errorCallback(response) {
					$scope.message = 'Erreur';
				}
			);
		};

		$scope.notJoin = function () {
			return _.indexOf($scope.participants, $cookies.get('login')) == -1;
		}

    $scope.loadProject = function () {
      serviceAjax.getProject($routeParams.projectId).then(
				function successCallback(response) {
					if(response.data.length) {
						$scope.project = response.data[0];
						$scope.participants = $scope.project.participants;
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

		$scope.editProject = function(ev) {
			$mdDialog.show({
				controller: editProjectCtrl,
				templateUrl: '../../views/edit-project.html',
				parent: angular.element(document.body),
				targetEvent: ev,
				clickOutsideToClose: true,
				locals: {projectToPass: $scope.project},
				fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
	    })
		};


		function editProjectCtrl($scope, $mdDialog, projectToPass) {

			$scope.project = projectToPass;

	    $scope.update = function(project) {
				serviceAjax.updateProject(project).then(
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

    	$scope.cancel = function() {
	      $mdDialog.cancel();
	    };
		}
  });

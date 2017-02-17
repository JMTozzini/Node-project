'use strict';

/**
 * @ngdoc overview
 * @name nodeProjectApp
 * @description
 * # nodeProjectApp
 *
 * Main module of the application.
 */
angular
  .module('nodeProjectApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
		'ngMaterial',
		'ngMessages',
		'angularMoment'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/create-project', {
        templateUrl: 'views/create-project.html',
        controller: 'CreateProjectCtrl',
        controllerAs: 'createProject',
				resolve: checkLogin()
      })
      .when('/projects', {
        templateUrl: 'views/projects.html',
        controller: 'ProjectsCtrl',
        controllerAs: 'projects',
				resolve: checkLogin()
      })
      .when('/project/:projectId', {
        templateUrl: 'views/project.html',
        controller: 'ProjectCtrl',
        controllerAs: 'project',
				resolve: checkLogin()
      })
      .otherwise({
        redirectTo: '/'
      });
  });

function checkLogin() {
	return {
		login: ['$q', '$location', '$cookies', function ($q, $location, $cookies) {
			var loginCookie = $cookies.get('login');

			if (!loginCookie) {
				$q.reject();
				$location.path('/');
			}
			$q.resolve(loginCookie);
		}]
	}
}

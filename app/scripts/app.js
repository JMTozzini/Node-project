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
		'ngMaterial'
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
        controllerAs: 'createProject'
      })
      .when('/projects', {
        templateUrl: 'views/projects.html',
        controller: 'ProjectsCtrl',
        controllerAs: 'projects'
      })
      .when('/project/:projectId', {
        templateUrl: 'views/project.html',
        controller: 'ProjectCtrl',
        controllerAs: 'project'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

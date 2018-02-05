'use strict';

/**
 * @ngdoc overview
 * @name kamakshiJewellersApp
 * @description
 * # kamakshiJewellersApp
 *
 * Main module of the application.
 */
angular.module('angularApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'angularFileUpload',
    'ui.bootstrap',
    'lbServices'
  ])
	.config(function ($routeProvider) {
		$routeProvider
			.when('/', {
				templateUrl: 'views/home/home.html',
				controller: 'HomeCtrl'
			})
            .when('/listCommit', {
				templateUrl: 'views/listCommit/listCommit.html',
				controller: 'commitListCtrl'
			})
			.otherwise({
				redirectTo: '/'
			});

	});

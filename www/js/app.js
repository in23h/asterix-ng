// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'ngStorage'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider){
	$stateProvider
		.state('tabs', {
			url: '/tab',
			abstract: true,
			templateUrl: 'templates/tabs.html'
		})
		.state('tabs.home', {
			url: '/home',
			views: {
				'home-tab': {
					templateUrl: 'templates/home.html'
				}
			}
		})
		.state('tabs.books', {
			url: '/books',
			views: {
				'books-tab': {
					templateUrl: 'templates/books.html',
					controller: 'BooksController'
				}
			}
		})
		.state('tabs.about', {
			url: '/about',
			views: {
				'about-tab': {
					templateUrl: 'templates/about.html'
				}
			}
		})
		.state('tabs.detail', {
			url: '/books/:bookId',
			views: {
				'books-tab': {
					templateUrl: 'templates/detail.html',
					controller: 'BooksController'
				}
			}
		});
		$urlRouterProvider.otherwise('/tab/home');
})

.controller('BooksController', ['$scope', '$http', '$state', '$localStorage', function($scope, $http, $state, $localStorage){
	//Uncomment the below line to reset the local storage to empty. This is not needed on initial viewing of the app and used for testing only
	//$localStorage.$reset();
	$scope.tab = 1;
	$scope.$storage = $localStorage;

	if(!$localStorage.books){
		$http.get('js/data.json').success(function(data) {
			$localStorage.books = data;
			//console.log($localStorage.books);
		});
	}

	$scope.whichbook = $state.params.bookId;
	$scope.collectIt = function(book) {
		book.collected = !book.collected;
	};

	$scope.filters = {};

}]);
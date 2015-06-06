angular.module('fillImageDemo', ['ngRoute', 'lumx', 'hljs', 'FillImage'])

.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {

    $routeProvider
        .when('/', {
            templateUrl: 'templates/home.html'
        })
        .when('/dummyimage', {
            templateUrl: 'templates/dummyimage.html'
        })
        .when('/placeholdit', {
            templateUrl: 'templates/placeholdit.html'
        })
        .when('/lorempixel', {
            templateUrl: 'templates/lorempixel.html'
        })
        .when('/fpoimg', {
            templateUrl: 'templates/fpoimg.html'
        })
        .when('/placeimg', {
            templateUrl: 'templates/placeimg.html'
        })
        .when('/fillmurray', {
            templateUrl: 'templates/fillmurray.html'
        })
        .when('/placecage', {
            templateUrl: 'templates/placecage.html'
        })
        .when('/placekitten', {
            templateUrl: 'templates/placekitten.html'
        })
        .when('/stevensegallery', {
            templateUrl: 'templates/stevensegallery.html'
        })
        .when('/nicenicejpg', {
            templateUrl: 'templates/nicenicejpg.html'
        })
        .when('/placebear', {
            templateUrl: 'templates/placebear.html'
        })
        .when('/baconmockup', {
            templateUrl: 'templates/baconmockup.html'
        })
        .when('/placesheen', {
            templateUrl: 'templates/placesheen.html'
        })
        .when('/placeskull', {
            templateUrl: 'templates/placeskull.html'
        })
        .when('/pipsum', {
            templateUrl: 'templates/pipsum.html'
        })
        .when('/beerholdit', {
            templateUrl: 'templates/beerholdit.html'
        })
        .when('/fakeimgpl', {
            templateUrl: 'templates/fakeimgpl.html'
        })
        .otherwise({
            redirectTo: '/'
        });

}])

.run(['$route', angular.noop])

.run(['$rootScope', '$location', function($rootScope, $location) {
    var sidebarIsShown = true;
    $rootScope.isActive = function(viewLocation) {
        return viewLocation === $location.path();
    };

    $rootScope.toggleSidebar = function() {
        sidebarIsShown = !sidebarIsShown;
    }

    $rootScope.isSidebarShown = function() {
        return sidebarIsShown;
    }
}])

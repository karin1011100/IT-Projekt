(function() {
   "use strict";


var app = angular.module("app", ["ngRoute", "nvd3", "ui.bootstrap"]);
/*
app.config(function ($routeProvider, $locationProvider){
   $locationProvider.html5Mode(true);
});
*/
app.config(function($routeProvider) {

    var baseRoute = "";

    $routeProvider.when('/home', {
      template: '<home></home>'
    })
    .when('/user', {
      template: '<user-component></user-component>'
    })
    .when('/supplier', {
      template: '<supplier-overview-component></supplier-overview-component>'
    })
    .when('/supplier/detail', {
      template: '<supplier-detail-component></supplier-detail-component>'
    })
    .when('/supplier/:supplierId', {
      template: '<supplier-component></supplier-component>'
    })
    .when('/evaluation', {
      template: '<custom-evaluation-controller></custom-evaluation-controller>'
    })
    .otherwise('/home', {
        template: '<home></home>'
    });

    //$locationProvider.html5Mode(true);
});

app.config(function($locationProvider) {
   //$locationProvider.html5Mode(true);
 });

/*
app.config(function($routeProvider) {
    var baseRoute = "localhost/it-projekt";
    $routeProvider
    .when(baseRoute + "/", {
      template: "<app></app>"
    })
    .when(baseRoute + "/user", {
      template: "<user-component></user-component>"
    })
    .otherwise({
        template: "<app></app>"
    });
  });*/

})();
/// <reference path="../assets/js/angular.js" />
/// <reference path="../assets/js/angular-ui-router.js" />
/// <reference path="../assets/js/angular-sanitize.js" />

(function () {

    angular.module("app", ["ui.router", "toaster", "ngAnimate","ngSanitize"]);
   
    angular.module("app").filter("NewLineFilter", NewLineFilter);
    NewLineFilter.$inject = ["$sce"]
    function NewLineFilter($sce) {
        return function (txt) {
            var res = (String(txt).replace(/\n/g, "<br>"));
            return res;
        }

    }

    angular.module("app")
           .config(["$stateProvider", "$urlRouterProvider", "$locationProvider", config]);

    function config($stateProvider, $urlRouterProvider, $locationProvider) {

        $stateProvider.state("login", {
            templateUrl: "/app/src/login/login.html",
            url: "/login",
            controller: "LogonCtrl"
        })
        .state("publisher", {
            templateUrl: "/app/src/publisher/publisher.html",
            url: "/publisher",
            controller: "PublisherCtrl"
        }).state("publisher.add", {
            templateUrl: "/app/src/publisher/article/add/add.html",
            url: "/add",
            controller: "AddArticleCtrl"
        }).state("publisher.edit", {
            templateUrl: "/app/src/publisher/article/edit/edit.html",
            url: "/edit",
            controller: "EditArticleCtrl"
        })
          .state("publisher.view", {
              cache: false,
              templateUrl: "/app/src/publisher/article/view/view.html",
              url: "/view",
              controller: "ViewArticleCtrl"
          })
        .state("user", {
            templateUrl: "/app/src/user/user.html",
            url: "/user",
            controller: "UserViewCtrl"
        });

        // Start //        
        $locationProvider.html5Mode({ enabled: true, requireBase: true }).hashPrefix('!');
        $urlRouterProvider.otherwise("login");

    }


})();
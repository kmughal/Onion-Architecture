/// <reference path="../../assets/js/angular.js" />

(function () {

    angular.module("app").factory("UserViewFactory", Factory);
    Factory.$inject = ["$http","UserViewServiceUrl","UserRatingServiceUrl"];
    function Factory($http, url, ratingUrl) {
        return {
            getArticles: function (username) {
                return $http.post(url + "/" + username);
            }, setArticleRating: function (articleId, username, rating) {
                var param = [articleId, username, rating].join("/");
                return $http.post(ratingUrl + "/" + param);
            }
        };
    }
})();
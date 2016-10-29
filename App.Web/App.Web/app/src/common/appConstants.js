/// <reference path="../../assets/js/angular.js" />

(function () {

  
    var preUrl = "http://localhost:58183/api/";
    angular.module("app")
            .constant("LoginServiceUrl", preUrl + "Auth")
            .constant("ArticleServiceUrl", preUrl + "Article")
            .constant("ArticleServiceByPublisherUrl", preUrl + "Article/Publisher")
            .constant("RemoveArticleUrl", preUrl + "Article/Publisher/Remove")
            .constant("EditArticleServiceUrl", preUrl + "Article/Edit")
            .constant("UserViewServiceUrl", preUrl + "User/Articles/")
            .constant("UserRatingServiceUrl", preUrl + "User/Article/Rating/");

       
})();
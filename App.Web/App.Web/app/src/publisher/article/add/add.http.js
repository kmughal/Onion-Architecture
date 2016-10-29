(function () {

    angular.module("app").factory("AddArticleService", Factory);

    Factory.$inject = ["$http","ArticleServiceUrl"];
    function Factory($http , url ) {
        return function addArticle (title, body, publishDate, publisher) {
            var param = { Title: title, Body: body, PublishDate: publishDate, Publisher: publisher } ,
                headers = [{ "content-type": "application/x-www-form-urlencoded" }];

            return $http.post(url , param,headers);
        }
    }

})();
(function () {

    angular.module("app").factory("ViewArticlesByPublisher", Factory);

    Factory.$inject = ["$http","ArticleServiceByPublisherUrl","RemoveArticleUrl"];

    function Factory($http, getUrl , removeUrl) {

        var fetch = function (publisherName) {
            return $http.post(getUrl + "/" + publisherName);
        };

        var deleteArticle = function(id) {           
            return $http.post(removeUrl + "/" + id);
        };

        return {
            get: function (publisherName) {
                return fetch(publisherName);
            },
            remove: function (id) {
               return deleteArticle(id);
            }

        };
        
    }

})();
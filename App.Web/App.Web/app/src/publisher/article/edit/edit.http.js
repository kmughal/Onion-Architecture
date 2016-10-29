(function () {
    
    angular.module("app").factory("EditArticleFactory", Factory);
    Factory.$inject = ["$http","EditArticleServiceUrl"];
    function Factory($http , url) {
        return {
            update: function (id, editTitle, editBody, editPublishDate,editPublisher) {                
                var param = { Id: id, Title: editTitle, Body: editBody, PublishDate: editPublishDate, Publisher: editPublisher },
                    headers = [{ "content-type": "application/x-www-form-urlencoded" }];

                return $http.post(url, param, headers);
            }
        }
    }

})();
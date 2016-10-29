/// <reference path="../../assets/js/angular.js" />

(function () {
    angular.module("app").controller("UserViewCtrl", Ctrl);

    Ctrl.$inject = ["UserViewFactory", "static"];
    function Ctrl(service, appStatics) {

        var _ = this;
        _.articles = [];
        _.name = "";

        _.change = updateRating;

        /*Private Methods*/

        activate();
        function activate() {
            var username = String(appStatics.get().name).toUpperCase();
            _.name = username;
            service.getArticles(username)
                   .then(function (result) {
                       _.articles = result.data;
                   },
                   function (err) {
                       alert(err);
                   });
        }

        function updateRating(dd /*Article Object*/) {
            for (var index = 0; index < _.articles.length; index++) {
                if (_.articles[index].id === dd.id) {
                    _.articles[index].newRate = dd.rate;
                    var article = _.articles[index],
                        username = appStatics.get().name;                    
                    service.setArticleRating(article.id, username, article.rating)
                        .then(function (d) { }, function (e) { console.log(e) });

                    break;
                }
            }
        }

        /*Private Methods*/
    }
})();
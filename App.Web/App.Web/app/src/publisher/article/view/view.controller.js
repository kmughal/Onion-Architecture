(function () {

    angular.module("app").controller("ViewArticleCtrl", Ctrl);

    Ctrl.$inject = ["$scope", "ViewArticlesByPublisher", "static", "toaster"]

    function Ctrl($scope, service, appStatics, toaster) {

        var _ = this;
        _.articles = [];
        _.run = activate;
        _.remove = deleteArticle;

        $scope.$on('$viewContentLoaded', function (event) {
            activate();
        });


        function deleteArticle( article , $event ) {            

            var promise = service.remove(article.id);

            promise.then(
                /*success*/
                function (result) {
                    activate();                    
                    toaster.pop('success', "Server Message", result.data);
                },
                /*error*/
                function (error) {
                    alert(error);
                });

            $event.preventDefault();
        }

        function activate() {
            
            var promise = service.get(appStatics.get().name);

            promise.then(
                // success
                function (result) {
                    _.articles = result.data;                    
                },
                // error
                function (error) { }
                );
        }
    }
})();
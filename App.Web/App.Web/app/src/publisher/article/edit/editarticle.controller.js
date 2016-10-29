/// <reference path="../../../../assets/js/moment.js" />



(function () {

    angular.module("app").controller("EditArticleCtrl", Ctrl);

    Ctrl.$inject = ["$scope", "ViewArticlesByPublisher", "EditArticleFactory", "static", "toaster"]

    function Ctrl($scope, viewService, service, appStatics, toaster) {

        var _ = this;
        _.articles = [];
        _.selectedItem = {};
        _.save = editArticle;
        _.mapDateEvent = mapJqueryEvent;


        /* Private Methods */

        function mapJqueryEvent() {
            if ($) {
               
                //if ($("#pbDate").val())
                if ($.trim(_.selectedItem.publishDate).length > 0) {
                    _.selectedItem.publishDate = moment(_.selectedItem.publishDate, ["MM-DD-YYYY", "YYYY-MM-DD"]).format("DD-MM-YYYY");
                    SetDate1("pbdate1", "____________", undefined, undefined, true);
                }
            }
        }

        activate();
        function activate() {
            mapJqueryEvent();
            var promise = viewService.get(appStatics.get().name);
            var successFn = function (d) {
                _.articles = d.data;
            };
            var errorFn = function (err) {
                alert(err);
            };
            promise.then(successFn, errorFn);
        }

        function editArticle() {
            _.selectedItem.publishDate = $("#pbdate1").val();
            if (!moment(_.selectedItem.publishDate).isValid()) {
                toaster.pop("error", "Date Validation Error", "Publisher Date is not valid!");
                return;
            }
            var promise = service.update(_.selectedItem.id, _.selectedItem.title, _.selectedItem.body, _.selectedItem.publishDate, _.selectedItem.publisher);
            var successFn = function (result) {
                activate();
                toaster.pop('success', "Server Message", result.data);                
            };
            var errorFn = function (err) {
                alert(err);
            };

            promise.then(successFn, errorFn);
        }

        /* Private Methods */
    }
})();

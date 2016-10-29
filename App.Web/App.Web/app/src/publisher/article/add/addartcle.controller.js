/// <reference path="../../assets/js/angular.js" />
/// <reference path="../../../../assets/js/calender.js" />
/// <reference path="../../../../assets/js/moment.js" />
/// <reference path="../../../../assets/js/toaster.js" />


(function () {

    angular.module("app").controller("AddArticleCtrl", Ctrl);

    Ctrl.$inject = ["AddArticleService", "static",  "toaster"]
    function Ctrl(service, appStatics, toaster ) {
        var _ = this;

        _.new = reset();
        _.save = addNewArticle;      

        /* Private Methods*/
        function reset() {
            return { title: "", body: "", publishDate: "", publisher: appStatics.get().name }
        }
        activate();
        function activate() {
            if ($) {
                SetDate1("pbDate", "___", undefined, undefined, true);
            }
        }

        function addNewArticle() {

            _.new.publisher = appStatics.get().name;
            _.new.publishDate = $("#pbDate").val();
           if (!moment(_.new.publishDate).isValid()) {
                toaster.pop("error", "Date Validation Error", "Publisher Date is not valid!");
                return;
            }
            var promise = service(_.new.title, _.new.body, _.new.publishDate, _.new.publisher);
            
            promise.then(
                /* success*/
                function (result) {
                    if (result.data) {                        
                        toaster.pop('success', "Server Message", result.data);
                        _.new = reset();
                    }
                },
                /*error*/ 
                function (error) {
                    alert(error);                    
                }
                )
        }
    }
})();
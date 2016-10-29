
(function () {

    angular.module("app")
           .controller("PublisherCtrl", Ctrl);

    Ctrl.$inject = ["static"];

    function Ctrl(appStats) {
        var _ = this;
        _.publisherName = String(appStats.get().name).toUpperCase();
    }
})();

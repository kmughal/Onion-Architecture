/// <reference path="../../assets/js/angular.js" />

(function () {

    angular.module("app").factory("static", appStaticFactory);
    appStaticFactory.$inject = ["$state"];
    function appStaticFactory($state) {

        var app = { name: "", accountType: "" };

        var change = function (name, accountType) {

            app = { name: name, accountType: accountType };
            
            var $LoggOffBtn = $("<input type='button'  value='Log Off' />")
                            .on("click", function () {
                                $state.go("login");
                                app.name = "";
                                app.accountType = "";
                                $(this).remove();
                            })
                            .addClass('btn btn-primary pull-right');

            $("#container_action").html($LoggOffBtn);
        };


        return {
            get: function () { return app },
            update: function (name, accountType) {
                change(name, accountType);
            }
        }
    }
})();
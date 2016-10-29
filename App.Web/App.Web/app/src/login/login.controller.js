/// <reference path="../../assets/js/angular.js" />
/// <reference path="../../assets/js/angular-ui-router.js" />



(function () {

    angular.module("app")
           .controller("LogonCtrl", Ctrl);

   
    Ctrl.$inject = ["static" , "$state" ,"LoginService"];

    function Ctrl( appData /*application wide static container*/ , $state, loginService ) {

        var _ = this;
        _.dm = { name: "", accountType: "" };
        _.signIn = logMe;
        
        /* private functions */

        function logMe() {

            var promise = loginService.signIn(_.dm.name, _.dm.accountType);

            promise.then(
                /*success*/
                function (result) {                    
                    appData.update(_.dm.name, _.dm.accountType);
        
                    if (_.dm.accountType === "publisher") {
                        $state.go(_.dm.accountType + ".add");
                        return;
                    }

                    $state.go(_.dm.accountType);
                },
                /*error*/
                function (error) {
                    alert(error);
                });
            
        }
        /* private functions*/
    }

})();
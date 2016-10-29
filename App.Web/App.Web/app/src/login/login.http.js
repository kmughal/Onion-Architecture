/// <reference path="../../assets/js/angular.js" />

(function () {

    angular.module("app").factory("LoginService", Service);
    Service.$inject = ["$http","LoginServiceUrl"];

    function Service($http , url ) {
        return {
            signIn : logMe
        };


        /*Private Methods*/

        function logMe(name, accountType) {
            var param ="/" + name + "/" + accountType;
            return $http.post(url + param);
            
        }
        /*Private Methods*/

    }
})();
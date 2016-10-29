(function () {


    angular.module("app").directive("rateStar", function () {

        var genClasses = function (totalStars, rate) {
            var result = [];
            for (var index = 1 ; index <= totalStars; index++) {
                result.push({ index: index, name:
                             (index <= rate) ? "glyphicon glyphicon-star" : "glyphicon glyphicon-star-empty"
                });
            }
            return result;
        };


        return {
            template: "<div><strong>Rate : </strong><span class='star' style='color:red' ng-repeat='cl in classes'><span class='{{cl.name}}' ng-mouseover='over(cl.index)'></span></span> </div>",
            restrict: "E",
            scope: {
                totalstars: "=totalstars",
                rate: "=rate",
                change: "&",
                id: "="
            },
            link: function (scope, ele, attrs) {

                scope.classes = genClasses(scope.totalstars, scope.rate);

                scope.over = function (index) {
                    scope.rate = index;
                    scope.classes = genClasses(scope.totalstars, scope.rate);
                    scope.change({ rate: scope.rate, id: scope.id });
                };

                $(".star").css("cursor", "pointer");
            }
        };
    });




})();
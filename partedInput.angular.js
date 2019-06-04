angular
    .module("inputParted", [])
    .directive("partedInput", function () {

    return {
        scope: {
            size: "=?",
            type: "=?",
            styleClass: "=?",
            styleIdPrefix: "=?",
            regex: "=?"
        },
        require: ["ngModel"],
        restrict: 'E',
        link: function (scope, elem, attrs, ctrl) {
            scope.size = scope.size || 4;
            scope.type = scope.type || 'number';
            scope.styleClass = scope.styleClass || 'parted-input';
            scope.styleIdPrefix = scope.styleIdPrefix || 'input-part';
            scope.arr = Array(scope.size);

            var defaultVal = ctrl[0].$viewValue;
            scope.partVal = typeof defaultVal === "number" || typeof defaultVal === "string" 
                ? ("" + defaultVal).split("").map(readyArr)
                : Array.isArray(defaultVal) ? defaultVal.map(readyArr) : [];

            var defaultTextRegex = "[0-9]|[a-z]|[A-Z]";
            var defaultNumberRegex = "[0-9]";
            var isText = scope.type.toUpperCase() === "TEXT";
            var regex = new RegExp(scope.regex || (isText ?
                defaultTextRegex : defaultNumberRegex));

            scope.$watch('partVal', function (newVal, oldVal) {
                if (newVal && typeof newVal.join === 'function') {
                    ctrl[0].$setViewValue(newVal.join(""));
                }
            }, true);

            scope.keydown = function (event, index) {
                event = event.originalEvent || event;
                event.preventDefault();
                var element = angular.element(event.srcElement || event.currentTarget);
                var isFirst = index === 0;
                var isLast = index === (scope.size - 1);

                switch (event.key.toUpperCase()) {
                    case "BACKSPACE":
                    case "DELETE":
                        scope.partVal[index] = "";
                        !isFirst && element[0].previousElementSibling.focus();
                        break;
                    case "TAB":
                        isLast ? element[0].blur() : element[0].nextElementSibling.focus();
                        break;
                    default:
                        event.key.length === 1 && regex.test(event.key) &&
                            ((scope.partVal[index] = isText ? event.key : +event.key) &&
                                isLast && element[0].blur() || element[0].nextElementSibling.focus());
                        break;
                }
                return false;
            }

            scope.pasteFun = function (event) {
                event.preventDefault();
                if (!event || !event.clipboardData) {
                    return false;
                }
                var text = event.clipboardData.getData("text") || "";
                scope.partVal = isText ? text.split("") : text.split("").map(convertToNumber);
                return false;
            }

            function convertToNumber(str) {
                var num = +str;
                return isNaN(num) ? null : num;
            }

            function readyArr(val) {
                var char = ("" + val).substr(0, 1);
                return isText ? char : convertToNumber(char);
            }
        },
        template: "<input type='{{type}}' id='{{styleIdPrefix}}-{{$index}}' ng-class='styleClass' ng-paste='pasteFun($event)' ng-keyup='keydown($event, $index)' ng-repeat='id in arr track by $index' ng-model='partVal[$index]' />"
    }
});
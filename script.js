var a = null;
function start() {
    a = $("#parted").partionedInput({
        type: 'text',
        size: 6
    });
    a.value("");
}

function click() {
    alert(a.value());
}

angular
    .module('app', ['inputParted'])
    .controller('ctrl', function($scope) {
        $scope.otpVal = "";
    });
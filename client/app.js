/**
 * Created by Maps_red on 21/06/2016.
 */

angular.module('app', ['btford.socket-io']).factory('socket', function (socketFactory) {
    return socketFactory();
}).controller('mainController', function ($scope, $window, socket) {
    $scope.history = [];
    $scope.loading = false;

    $scope.sendUrl = function (url, description) {
        if (!url || !description) {
            $window.alert("Veuillez remplir tous les champs");
        } else {
            $scope.loading = true;
            socket.emit('sending url', {url: url, description: description});
        }
    };

    $scope.injectForm = function (item) {
        $scope.newUrl = item.url;
    };

    socket.on("image", function (image) {
        $scope.loading = false;
        $scope.buffer = image.buffer;
    });

    socket.on('history', function (history) {
        $scope.history = history;
    });

});
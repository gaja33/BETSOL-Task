'use strict';

angular.module('angularApp')
    .controller('commitListCtrl', function ($scope, $http, DataSharing) {

        console.log(DataSharing.getOwnerRepo())

        var owner = DataSharing.getOwnerRepo().owner
        var repoName = DataSharing.getOwnerRepo().repoName

        $http.get('https://api.github.com/repos/'+owner+'/'+repoName+'/commits').then(function (resp) {
            console.log("resp", resp)
            $scope.commitLists = resp.data;
        })
    });

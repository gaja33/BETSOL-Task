'use strict';

angular.module('angularApp')
    .factory('DataSharing', function () {

        var data = {
            owner: '',
            repoName:''
        };

        return {
            getOwnerRepo: function () {
                return data;
            },
            setOwnerRepo: function (own,repo) {
                data.owner = own;
                data.repoName = repo;
            }
        };
    });

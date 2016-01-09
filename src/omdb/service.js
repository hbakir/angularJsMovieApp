angular.module('omdb', [])
    .factory('omdbApi', function ($http, $q) {
        var service = {},
            baseUrl = 'http://www.omdbapi.com/?v=1&'

        function httpPromise(url) {
            var deferred = $q.defer();
            $http.get(url)
                .success(function (data) {
                    console.log('response data = ' + data);
                    deferred.resolve(data);
                })
                .error(function () {
                    deferred.reject();
                });
            return deferred.promise;
        }
        service.search = function (query) {
            var queryUrl = baseUrl + 's=' + encodeURIComponent(query);
            return httpPromise(queryUrl);
        };

        service.find = function (id) {
            var findUrl = baseUrl + 'i=' + id;
            return httpPromise(findUrl);
        };

        return service;
    });
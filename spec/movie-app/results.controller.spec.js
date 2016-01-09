describe('Results Controller', function () {
    var results = {
            "Search": [{
                "Title": "Star Wars: Episode IV - A New Hope",
                "Year": "1977",
                "imdbID": "tt0076759",
                "Type": "movie",
                "Poster": "http://ia.media-imdb.com/images/M/MV5BMTU4NTczODkwM15BMl5BanBnXkFtZTcwMzEyMTIyMw@@._V1_SX300.jpg"
            }, {
                "Title": "Star Wars: Episode V - The Empire Strikes Back",
                "Year": "1980",
                "imdbID": "tt0080684",
                "Type": "movie",
                "Poster": "http://ia.media-imdb.com/images/M/MV5BMjE2MzQwMTgxN15BMl5BanBnXkFtZTcwMDQzNjk2OQ@@._V1_SX300.jpg"
            }, {
                "Title": "Star Wars: Episode VI - Return of the Jedi",
                "Year": "1983",
                "imdbID": "tt0086190",
                "Type": "movie",
                "Poster": "http://ia.media-imdb.com/images/M/MV5BMTQ0MzI1NjYwOF5BMl5BanBnXkFtZTgwODU3NDU2MTE@._V1._CR93,97,1209,1861_SX89_AL_.jpg_V1_SX300.jpg"
            }]
        },
        $controller,
        $location,
        $q,
        $rootScope,
        $scope,
        omdbApi;

    beforeEach(module('omdb'));
    beforeEach(module('movieApp'));

    beforeEach(inject(function (_$controller_, _$location_, _$q_, _$rootScope_, _omdbApi_) {
        $controller = _$controller_;
        $location = _$location_;
        $scope = {};
        $q = _$q_;
        $rootScope = _$rootScope_;
        omdbApi = _omdbApi_;
    }));

    it('should load search results', function () {
        spyOn(omdbApi, 'search').and.callFake(function () {
            var deferred = $q.defer();
            deferred.resolve(results);
            return deferred.promise;
        });
        $location.search('q', 'star wars');
        $controller('ResultsController', {
            $scope: $scope
        });
        $rootScope.$apply();
        expect($scope.results[0].Title).toBe(results.Search[0].Title);
        expect($scope.results[1].Title).toBe(results.Search[1].Title);
        expect($scope.results[2].Title).toBe(results.Search[2].Title);

        expect(omdbApi.search).toHaveBeenCalledWith('star wars');
    });

    it('should set result status to error', function () {
        spyOn(omdbApi, 'search').and.callFake(function () {
            var deferred = $q.defer();
            deferred.reject();
            return deferred.promise;
        });
        $location.search('q', 'star wars');
        $controller('ResultsController', {
            $scope: $scope
        });
        $rootScope.$apply();

        expect($scope.errorMessage).toBe('Something went wrong!');
    });

});
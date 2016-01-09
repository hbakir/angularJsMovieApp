describe('MovieCore', function () {
    var PopularMovies,
        $httpBackend;

    beforeEach(module('movieCore'));

    beforeEach(inject(function (_PopularMovies_, _$httpBackend_) {
        PopularMovies = _PopularMovies_;
        $httpBackend = _$httpBackend_;
    }));

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('should create popular movie', function () {

        var expectedData = function (data) {
            console.log(angular.mock.dump(data));
            return angular.fromJson(data).movieId === 'tt0251413';
        };

        $httpBackend.expectPOST(/./, expectedData)
            .respond(201);

        var popularMovie = new PopularMovies({
            movieId: 'tt0251413',
            description: 'Great movie!'
        });

        popularMovie.$save();

        expect($httpBackend.flush).not.toThrow();
    });

    it('should get popular movie by id', function () {
        $httpBackend.expectGET('popular/tt0251413')
            .respond(200);

        PopularMovies.get({
            movieId: 'tt0251413'
        });

        expect($httpBackend.flush).not.toThrow();
    });

    it('should update popular movie', function () {
        $httpBackend.expectPUT('popular')
            .respond(200);
        var popularMovie = new PopularMovies({
            movieId: 'tt0251413',
            description: 'Great movie!'
        });
        popularMovie.$update();

        expect($httpBackend.flush).not.toThrow();
    });


    it('should authenticate requests', function () {
        // { "authToken": "teddybear",  "Accept": "application/json, text/plain, */*"}
        var headerData = function (headers) {
                return headers.authToken === 'teddybear';
            },
            matchAny = /.*/,
            popularMovie = new PopularMovies({
                movieId: 'tt0251413',
                description: 'Great movie!'
            });

        $httpBackend.whenGET(matchAny, headerData)
            .respond(200);

        $httpBackend.expectPOST(matchAny, matchAny, headerData)
            .respond(200);

        $httpBackend.expectPUT(matchAny, matchAny, headerData)
            .respond(200);

        $httpBackend.expectDELETE(matchAny, headerData)
            .respond(200);

        PopularMovies.query();
        PopularMovies.get({
            id: 'tt0251413'
        });
        new PopularMovies(popularMovie).$save();
        new PopularMovies(popularMovie).$update();
        new PopularMovies(popularMovie).$remove();

//        $httpBackend.flush(1);
//        $httpBackend.flush(1);
//        $httpBackend.flush(1);
//        $httpBackend.flush(1);
//        $httpBackend.flush(1);
        expect($httpBackend.flush).not.toThrow();

    });
});
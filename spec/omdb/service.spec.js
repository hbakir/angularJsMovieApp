describe('omdb service', function () {
    var omdbApi = {},
        movieData = {
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
            }, {
                "Title": "Star Wars: Episode I - The Phantom Menace",
                "Year": "1999",
                "imdbID": "tt0120915",
                "Type": "movie",
                "Poster": "http://ia.media-imdb.com/images/M/MV5BMTQ4NjEwNDA2Nl5BMl5BanBnXkFtZTcwNDUyNDQzNw@@._V1_SX300.jpg"
            }, {
                "Title": "Star Wars: Episode III - Revenge of the Sith",
                "Year": "2005",
                "imdbID": "tt0121766",
                "Type": "movie",
                "Poster": "http://ia.media-imdb.com/images/M/MV5BNTc4MTc3NTQ5OF5BMl5BanBnXkFtZTcwOTg0NjI4NA@@._V1_SX300.jpg"
            }, {
                "Title": "Star Wars: Episode II - Attack of the Clones",
                "Year": "2002",
                "imdbID": "tt0121765",
                "Type": "movie",
                "Poster": "http://ia.media-imdb.com/images/M/MV5BMTY5MjI5NTIwNl5BMl5BanBnXkFtZTYwMTM1Njg2._V1_SX300.jpg"
            }, {
                "Title": "Star Wars: The Force Awakens",
                "Year": "2015",
                "imdbID": "tt2488496",
                "Type": "movie",
                "Poster": "http://ia.media-imdb.com/images/M/MV5BOTAzODEzNDAzMl5BMl5BanBnXkFtZTgwMDU1MTgzNzE@._V1_SX300.jpg"
            }, {
                "Title": "Star Wars: The Clone Wars",
                "Year": "2008",
                "imdbID": "tt1185834",
                "Type": "movie",
                "Poster": "http://ia.media-imdb.com/images/M/MV5BMTI1MDIwMTczOV5BMl5BanBnXkFtZTcwNTI4MDE3MQ@@._V1_SX300.jpg"
            }, {
                "Title": "Star Wars: The Clone Wars",
                "Year": "2008–2015",
                "imdbID": "tt0458290",
                "Type": "series",
                "Poster": "http://ia.media-imdb.com/images/M/MV5BMTM0NjQ2Mjk0OV5BMl5BanBnXkFtZTcwODQ3Njc3Mg@@._V1_SX300.jpg"
            }, {
                "Title": "Star Wars: Clone Wars",
                "Year": "2003–2005",
                "imdbID": "tt0361243",
                "Type": "series",
                "Poster": "http://ia.media-imdb.com/images/M/MV5BMjE2Mjk5Mzk3M15BMl5BanBnXkFtZTcwMDkzMTIzMQ@@._V1_SX300.jpg"
            }]
        },
        movieDataById = {
            "Title": "Star Wars",
            "Year": "1983",
            "Rated": "N/A",
            "Released": "01 May 1983",
            "Runtime": "N/A",
            "Genre": "Action, Adventure, Sci-Fi",
            "Director": "N/A",
            "Writer": "N/A",
            "Actors": "Harrison Ford, Alec Guinness, Mark Hamill, James Earl Jones",
            "Plot": "N/A",
            "Language": "English",
            "Country": "USA",
            "Awards": "N/A",
            "Poster": "N/A",
            "Metascore": "N/A",
            "imdbRating": "7.8",
            "imdbVotes": "345",
            "imdbID": "tt0251413",
            "Type": "game",
            "Response": "True"
        },
        $httpBackend;

    beforeEach(module('omdb'));

    beforeEach(inject(function (_omdbApi_, _$httpBackend_) {
        omdbApi = _omdbApi_;
        $httpBackend = _$httpBackend_;
    }));

    it('should return search movie data', function () {
        var response,
            expectedUrl = 'http://www.omdbapi.com/?v=1&s=star%20wars';

        $httpBackend.when('GET', expectedUrl)
            .respond(200, movieData);

        omdbApi.search('star wars')
            .then(function (data) {
                response = data;
            });

        $httpBackend.flush();

        expect(response).toEqual(movieData);
    });

    it('should return movie data by id', function () {
        var response,
            expectedUrl = 'http://www.omdbapi.com/?v=1&i=tt0251413';

        $httpBackend.expect('GET', expectedUrl)
            .respond(200, movieDataById);

        omdbApi.find('tt0251413')
            .then(function (data) {
                response = data;
            });

        $httpBackend.flush();

        expect(response).toEqual(movieDataById);
    });

    it('should handle error', function () {
        var response,
            expectedUrl = 'http://www.omdbapi.com/?v=1&i=tt0251413';

        $httpBackend.expect('GET', expectedUrl)
            .respond(500);

        omdbApi.find('tt0251413')
            .then(function (data) {
                response = data;
            })
            .catch(function () {
                response = 'Error!';
            });

        $httpBackend.flush();

        expect(response).toEqual('Error!');

    });
});
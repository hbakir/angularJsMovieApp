var express = require('express'),
    app = express(),
    server = app.listen((process.env.PORT || 3000), function() {
        var port = server.address().port;
        console.log('The application is listening ar http://localhost:%s', port);
    });

app.use(express.static('src'));


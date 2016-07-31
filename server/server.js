var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var index = require('./routes/index');

var app = express();

//"configs"
app.use(bodyParser.json());
app.use(express.static('public'));

//routes
app.use('/', index);


var server = app.listen(3000, function() {
    var port = server.address().port;
    console.log('Listening on port: ', port);
});

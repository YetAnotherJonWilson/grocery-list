var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var index = require('./routes/index');

var app = express();

app.use(bodyParser.json());
app.use('/', index);
app.use(express.static('public'));


var server = app.listen(3000, function() {
    var port = server.address().port;
    console.log('Listening on port: ', port);
});

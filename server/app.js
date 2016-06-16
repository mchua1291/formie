'use strict';
var path = require('path');
var express = require('express');
var app = express();

module.exports = app;

// statically serve files
app.use(express.static(path.join(__dirname, '../node_modules')));
app.use(express.static(path.join(__dirname, '../bower_components')));
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, '../browser')));
app.use(express.static(path.join(__dirname, '../public')));

app.get('/', function(req, res, next) {
    res.send('index.html');
})

// listen on a port
var port = 3000;
app.listen(port, function () {
    console.log('The server is listening on port', port);
});

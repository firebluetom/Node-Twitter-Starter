// DEPENDENCIES
// ============
var express = require("express"),
    fs = require('fs'),
    http = require("http"),
    port = (process.env.PORT || 8001),
    server = express(),
    twit = require('.././lib/TwitterAPI');

// Set up twitter service
module.exports = twit;
var Twitter = module.exports.Twitter;

// get client keys and secret
var config = JSON.parse(fs.readFileSync('./lib/keys.json', encoding="ascii"));

// the client for twitter
var twitter = new Twitter(config);

// SERVER CONFIGURATION
// ====================
server.configure(function() {

  server.use(express["static"](__dirname + "/../public"));

  server.use(express.errorHandler({

    dumpExceptions: true,

    showStack: true

  }));

  server.use(express.bodyParser())

  server.use(server.router);

  server.get('/api/search/tweets', function(req, res){
    var q = req.param('q');
    var result_type = req.param('result_type');
    var params = {q: q, count: 100};
    if(result_type)
      params.result_type = result_type;

    var error = function (err, response, body) {
        console.log('ERROR [%s]', JSON.stringify(err));
        res.statusCode = 400;
        res.send(err);
    };
    var success = function (data) {
        console.log('Data [%s]', data);
        res.send(data);
    };
    console.log('params', params);
    twitter.searchTweets(params, error, success);
  });

  server.get('/api/list/:screenName', function(req, res){
    var screenName = req.param('screenName');
    console.log('screenName', screenName);
    var error = function (err, response, body) {
      console.log('ERROR [%s]', JSON.stringify(err));
      res.statusCode = 400;
      if(err.statusCode)
        res.statusCode = err.statusCode;
      res.send(err);

    };
    var success = function (data) {
      console.log('Data [%s]', data);
        res.send(data);
    };
    twitter.getList({screen_name: screenName}, error, success);
  });

  server.get('/api/lists/subscriptions', function(req, res){
    var userId = req.param('user_id');
    console.log('user_id', userId);
    var error = function (err, response, body) {
      console.log('ERROR [%s]', JSON.stringify(err));
      res.statusCode = 400;
      if(err.statusCode)
        res.statusCode = err.statusCode;
      res.send(err);
    };
    var success = function (data) {
      console.log('Data [%s]', data);
        res.send(data);
    };
    twitter.getSubscriptions({user_id: userId, count: 1000}, error, success);
  });

  server.get('/api/lists/subscribers', function(req, res){
    var listId = req.param('list_id');
    var cursor = req.param('cursor');
    console.log('listId', listId);
    var params = {
      list_id: listId,
      count: 5000
    };
    if(cursor){
      params.cursor = cursor;
    }
    var error = function (err, response, body) {
      console.log('ERROR [%s]', JSON.stringify(err));
      res.statusCode = 400;
      if(err.statusCode)
        res.statusCode = err.statusCode;
      res.send(err);
    };
    var success = function (data) {
      console.log('Data [%s]', data);
        res.send(data);
    };
    twitter.getSubscribers(params, error, success);
  });

  // not a working service, can implement this as a lookup to users in a list on server end
  server.get('/api/is/user/:userId/in/list/:listId', function(req, res){
    var userId = req.param('userId'), listId = req.param('listId');
    console.log('userId %s, listId %s', userId, listId);
    var error = function (err, response, body) {
      console.log('ERROR [%s]', JSON.stringify(err));
      res.statusCode = 400;
      if(err.statusCode)
        res.statusCode = err.statusCode;
      res.send(err);
    };
    var success = function (data) {
      console.log('Data [%s]', data);
      res.send(data);
    };
    twitter.inList({userId: userId, listId: listId}, error, success);
  });

  server.get('/api/followers/:screenName', function(req, res){
    var screenName = req.param('screenName');
    var cursor = req.param('cursor');
    var params = {
      screenName : screenName
    };
    if(cursor)
      params.cursor = cursor;
    console.log('screenName: %s, cursor: %s', screenName, cursor);
    var error = function (err, response, body) {
      console.log('ERROR [%s]', JSON.stringify(err));
      res.statusCode = 400;
      if(err.statusCode)
        res.statusCode = err.statusCode;
      res.send(err);
    };
    var success = function (data) {
      console.log('Data [%s]', data);
      res.send(data);
    };
    twitter.getFollowers(params, error, success);
  });

});

// SERVER
// ======

// Start Node.js Server
http.createServer(server).listen(port);


console.log('Please go to http://localhost:' + port + ' to start using the application');
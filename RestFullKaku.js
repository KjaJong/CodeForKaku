var express = require('express');
var app = express();
var fs = require("fs");

//Server functions go here
app.get('/test', function(req, res){
	console.log("Received a test call.")
	res.end("Test succesfull.");
})

app.get('/on', function(req, res){
	//Send code to switch the kaku on
	res.end("Kaku should be on.");
})

app.get('/off', function(req, res){
	//Send code to switch the kaku off
	res.end("Kaku should be off.");
})

var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Kaku api listening at http://%s:%s", host, port)
})
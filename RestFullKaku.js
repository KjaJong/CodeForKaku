var express = require('express');
var app = express();
var http = require('http');
var exec = require('child_process').exec;

app.get('/test', function(req, res){
	console.log("Received a test call.");
	res.end("Test succesfull.");
});

app.get('/kakutest', function(req, res){
	var testscript = exec('sh ../HelloWorld.sh');
	testscript.stdout.on('data', function(data){
	console.log(data);
	res.end(data);
	});
})

app.get('/Bon', function(req, res){
	var kakuOn = exec('../wiringPi/examples/lights/kaku B C on');
	res.end("Kaku should be on.");
})

app.get('/Boff', function(req, res){
	var kakuOn = exec('../wiringPi/examples/lights/kaku B C off');
	res.end("Kaku should be off.");
})

// Express route for any other unrecognised incoming requests
// The asterix catches everything not above the call, as the asterix is a wildcard for everything.
app.get('*', function (req, res) {
  res.status(404).send('Unrecognised API call');
});

var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Kaku api listening at http://%s:%s", host, port)
})

var express = require('express');
var app = express();
var http = require('http');
var sys = require('sys')
var exec = require('child_process').exec;
var child;

var inputs = [    { pin: '11', gpio: '17', value: 1 },
                  { pin: '12', gpio: '18', value: 0 }
                ];

			  
// configure Express to serve index.html and any other static pages stored 
// in the home directory
app.use(express.static(__dirname));

// Express route for incoming requests for a single input
app.get('/inputs/:id', function (req, res) {
  // send an object as a JSON string
  console.log('id = ' + req.params.id);
  res.send(inputs[req.params.id]);
}); // apt.get()

// Express route for incoming requests for a list of all inputs
app.get('/inputs', function (req, res) {
  // send an object as a JSON string
  console.log('all inputs');
  res.status(200).send(inputs);
}); // apt.get()

app.get('/test', function(req, res){
	console.log("Received a test call.");
	res.end("Test succesfull.");
});

app.get('/kakutest', function(req, res){
	child = exec("pwd", function (error, stdout, stderr) {
	sys.print('stdout: ' + stdout);
	sys.print('stderr: ' + stderr);
	if (error !== null) {
		console.log('exec error: ' + error);
		}
	})
})

app.get('/on', function(req, res){
	//Send code to switch the kaku on
	res.end("Kaku should be on.");
})

app.get('/off', function(req, res){
	//Send code to switch the kaku off
	res.end("Kaku should be off.");
})

// Express route for any other unrecognised incoming requests
// The asterix catches everything not above the call, as the asterix is a wildcard for everything.
app.get('*', function (req, res) {
  res.status(404).send('Unrecognised API call');
});

// Express route to handle errors
app.use(function (err, req, res, next) {
  if (req.xhr) {
    res.status(500).send('Oops, Something went wrong!');
  } else {
    next(err);
  }
}); // apt.use()

var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Kaku api listening at http://%s:%s", host, port)
})

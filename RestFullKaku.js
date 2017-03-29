var express = require('express');
var app = express();
var http = require('http');

var inputs = [{ pin: '11', gpio: '17', value: 1 },
              { pin: '12', gpio: '18', value: 0 }];
			  
//Makes it so that the server serves static pages stored in the directory
app.use(express['static'](__dirname ));

// Express route for incoming requests for a customer name
app.get('/inputs/:id', function(req, res) {
  res.status(200).send(inputs[req.params.id]);
}); 

// Express route for any other unrecognised incoming requests
app.get('*', function(req, res) {
  res.status(404).send('Unrecognised API call');
});

// Express route to handle errors
app.use(function(err, req, res, next) {
  if (req.xhr) {
    res.status(500).send('Oops, Something went wrong!');
  } else {
    next(err);
  }
});

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

var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Kaku api listening at http://%s:%s", host, port)
})
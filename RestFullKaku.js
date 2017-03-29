var express = require('express');
var app = express();
var http = require('http');

var inputs = [{ pin: '11', gpio: '17', value: 1 },
              { pin: '12', gpio: '18', value: 0 }];
			  
app.use(express['static'](__dirname )); //Always edit this on the pi

// Express route for incoming requests for a customer name
app.get('/inputs/:id', function(req, res) {
  res.status(200).send(inputs[req.params.id]);
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

var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Kaku api listening at http://%s:%s", host, port)
})
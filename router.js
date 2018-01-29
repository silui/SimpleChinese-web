var express = require('express');
var path = require('path');
var app = express();


app.set('port',80);

app.use(express.static(__dirname));

app.get('/', function(req,res){
	console.log('get to homepage');
	res
		.status(200)
		.sendFile('homepage.html', {root: __dirname});
});

app.get('/auth', function(req,res){
	console.log('get to login');
	res
		.status(200)
		.sendFile('auth.html', {root: path.join(__dirname,'./auth')});
});

var server = app.listen(app.get('port'),function(){
	var port = server.address().port;
	console.log(port);
});

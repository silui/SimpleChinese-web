var express = require('express');
var path = require('path');
var app = express();
// var path = require('./watertester-32c5a-export.json');


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

app.get('/vocab',function(req,res){
	console.log('get to vocab')
	res.status(200)
		 .sendFile('vocab.html',{root: path.join(__dirname,'./vocabset')});
});

app.get('/study',function(req,res){
	console.log('get to study')
	res.status(200)
		 .send('study set not specified');
});

app.get('/vocab/study/*',function(req,res){
	console.log('get to study')
	res.status(200)
		 .sendFile('study.html',{root: path.join(__dirname,'./study')});
			 //.send('study set');
});


var server = app.listen(app.get('port'),function(){
	var port = server.address().port;
	console.log(port);
});

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
		.sendFile('homepage.html', {root: path.join(__dirname,'./homepage')});
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
		 .sendFile('study.html',{root: path.join(__dirname,'./studyFolder')});
			 //.send('study set');
});

app.get('/quiz',function(req,res){
	console.log('get to quiz')
	res.status(200)
		 .sendFile('quizselect.html',{root: path.join(__dirname,'./quizFolder')});
});

app.get('/quiz/level*-*',function(req,res){
	console.log('get to actual quiz')
	res.status(200)
		 .sendFile('quiz.html',{root: path.join(__dirname,'./quizFolder')});
});


app.get('/test',function(req,res){
	console.log('get to testpage')
	res.status(200)
			 .send('test');
});



var server = app.listen(app.get('port'),function(){
	var port = server.address().port;
	console.log(port);
});

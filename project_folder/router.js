// router.js
// A express web server
// This is used only as a static page server, no server side computaion or api calls is made
var express = require('express');
var path = require('path');
var app = express();

app.set('port',80);

app.use(express.static(__dirname));

app.get('/', function(req,res){
	res.status(200).sendFile('homepage.html', {root: path.join(__dirname,'./homepage')});
});

app.get('/forgetPassword', function(req,res){
	res.status(200).sendFile('forgetPassword.html', {root: path.join(__dirname,'./auth')});
});

app.get('/vocab',function(req,res){
	res.status(200).sendFile('vocab.html',{root: path.join(__dirname,'./vocabset')});
});

app.get('/vocab/study/*',function(req,res){
	res.status(200).sendFile('study.html',{root: path.join(__dirname,'./studyFolder')});
});

app.get('/quiz',function(req,res){
	res.status(200).sendFile('quizselect.html',{root: path.join(__dirname,'./quizFolder')});
});

app.get('/quiz/level*-*',function(req,res){
	res.status(200).sendFile('quiz.html',{root: path.join(__dirname,'./quizFolder')});
});

app.get('/contact',function(req,res){
	res.status(200).sendFile('contact.html',{root: path.join(__dirname,'./contact')});
});



var server = app.listen(app.get('port'),function()
{
	var port = server.address().port;
	console.log(port);
});

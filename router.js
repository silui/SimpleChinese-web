var express = require('express');
var path = require('path');
var admin = require("firebase-admin");
var app = express();
// var path = require('./watertester-32c5a-export.json');
var serviceAccount = require("./firebase/watertester-32c5a-firebase-adminsdk-35nrs-8157cd13de.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://watertester-32c5a.firebaseio.com"
});


app.set('port',80);

app.use(express.static(__dirname));

app.get('/test2', function(req,res){
	console.log('get to homepage');
	res
		.status(200)
		.sendFile('homepage3.html', {root: path.join(__dirname,'./homepage')});
});


app.get('/test',function(req,res){
	console.log('get to testpage');
	var dbRef=admin.database().ref("vocab");
	dbRef.on("value",function(snapshot)
	{
		var vocabListAll = snapshot.val();
		res.status(200).send(vocabListAll);
	});

	// res.status(200)
					// .sendFile('homepage2.html', {root: path.join(__dirname,'./homepage')});
			 // .send(dbRef);
});

app.get('/', function(req,res){
	console.log('get to homepage');
	res
		.status(200)
		.sendFile('homepage3.html', {root: path.join(__dirname,'./homepage')});
});

app.get('/profile', function(req,res){
	res
		.status(200)
		.sendFile('profile.html', {root: path.join(__dirname,'./profile')});
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



var server = app.listen(app.get('port'),function(){
	var port = server.address().port;
	console.log(port);
});

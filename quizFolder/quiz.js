var myMainSite = window.location.pathname;
var splitUrl = myMainSite.split(/level|-/g);
var targetLevel=splitUrl[1]-1;
var targetSetStart=(splitUrl[2]-1)*25;
var dbRef=firebase.database().ref("vocab");
dbRef.on("value",function(snapshot)
{
  var vocabListAll = snapshot.val();
  var curStudy = Object.values(vocabListAll);
  var levelArray = curStudy[targetLevel];
  tempArray = Object.values(levelArray)
  globalWholeArray= tempArray.slice(targetSetStart,targetSetStart+25);
  var buttonArr = document.getElementsByClassName('answer');
  for(var i=0; i<buttonArr.length; i++)
  {
    buttonArr[i].addEventListener("click",function()
    {
      if(this.getAttribute("answerid")==correctbox)
        correctness++;
      // console.log(this.parentNode.children[0].innerText);
      resultArray[2].push(this.parentNode.children[0].innerText);
      next();
    });
  }
  next();
});
var resultArray = [];
resultArray.push([]);
resultArray.push([]);
resultArray.push([]);
var correctness = 0;
var tempArray = [];
var globalWholeArray=[];
var iter=-1;
var correctbox;
function next()
{
  if(iter===globalWholeArray.length-1){
    var tableHTML=`<table border="1"><tr><th>character</th><th>correct answer</th><th>your pick</th></tr>`;
    for(var i=0; i<resultArray[0].length;i++)
    {
      tableHTML+=`<tr><td>${resultArray[0][i]}</td><td>${resultArray[1][i]}</td><td>${resultArray[2][i]}</td></tr>`;
    }
    tableHTML+=`<table>${correctness}/25 is correct <button onclick="window.location.href='./'">Go Back</button>`;
    document.getElementsByClassName("content")[0].innerHTML=tableHTML;
    updateScore(firebase.auth().currentUser.uid,splitUrl[1],splitUrl[2],correctness);
  }
  else {
    iter++;
    setChineseChar(globalWholeArray[iter].hanzi);
    var translationArray = getFourTranslation(globalWholeArray[iter].translations,globalWholeArray[iter].id,tempArray);
    assignAnswer(document.getElementsByClassName('textField'),translationArray)
  }
}

function setChineseChar(inputChar)
{
  document.getElementById('charField').innerHTML=inputChar;
  resultArray[0].push(inputChar);
}
function assignAnswer(textField, answerArray)
{
  for(var i=0; i<textField.length; i++)
  {
    textField[i].innerHTML='';
    for(var k=0; k<answerArray[i].length;k++)
    {
      textField[i].innerHTML+=answerArray[i][k]+"<br>";
    }
  }
}


function shuffle(a) {
  var correctOne=a[0];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    for(var k=0; k<a.length; k++)
    {
      if(a[k]===correctOne)
        correctbox=k+1;
    }
    return a;
}


function getFourTranslation(correct,correctId,vocabSet)
{
  var finalarray=[];
  finalarray.push(correct);
  resultArray[1].push(correct);
  while(finalarray.length!=4)
  {
    var random=Math.floor(Math.random() * vocabSet.length);
    if(vocabSet[random].translations!=null)
    {
      var newdef=vocabSet[random].translations;
      var newdefId=vocabSet[random].id;
      if(correctId!=newdefId)
        finalarray.push(newdef);
    }
  }
  return shuffle(finalarray);
}

function updateScore(userID,level,set,score)
{
  var dbRef=firebase.database().ref(`user/${userID}/${level}`);
  dbRef.update({[set]:score});
}

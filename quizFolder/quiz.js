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
  var textField = document.getElementsByClassName('answer');
  for(var i=0; i<textField.length; i++)
  {
    textField[i].addEventListener("click",function()
    {
      next();
    });
  }
  next();
});
var tempArray = [];
var globalWholeArray=[];
var iter=-1;
function next()
{
  if(iter===24){
    window.location.href='./'
  }
  else {
    iter++;
    setChineseChar(globalWholeArray[iter].hanzi);
    var correctAnswer = globalWholeArray[iter].translations;
    var translationArray = getFourTranslation(correctAnswer,tempArray);
    assignAnswer(document.getElementsByClassName('textField'),translationArray)
  }
}

function setChineseChar(inputChar)
{
  document.getElementById('charField').innerHTML=inputChar;
}
function assignAnswer(textField, answerArray)
{
  for(var i=0; i<textField.length; i++)
  {
    // textField[i].innerHTML=answerArray[i]+"<br>";
    textField[i].innerHTML='';

    for(var k=0; k<answerArray[i].length;k++)
    {
      textField[i].innerHTML+=answerArray[i][k]+"<br>";
    }
  }
}


function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function alreadyExist(inputArray, target)
{
  for(var i=0; i<inputArray; i++)
  {
    if(inputArray[i]==target)
      return true;
  }
  return false;
}

function getFourTranslation(correct,vocabSet)
{
  var finalarray=[];
  finalarray.push(correct);
  while(finalarray.length!=4)
  {
    var random=Math.floor(Math.random() * vocabSet.length);
    var newdef=vocabSet[random].translations;
    if(!alreadyExist(finalarray,newdef))
      finalarray.push(newdef);
  }
  return shuffle(finalarray);
}

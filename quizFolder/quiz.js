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
  var buttonArray = document.getElementsByClassName('answer');
  for(var i=0; i<buttonArray.length; i++)
  {
    buttonArray[i].addEventListener("click",function()
    {
      next();
    });
  }
  next();
  // var answerBoxes = document.getElementsByClassName('answer');
  // var translationArray = getFourTranslation("good",tempArray);
  // assignAnswer(answerBoxes,translationArray)
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
    // console.log(globalWholeArray[iter]);
    setChineseChar(globalWholeArray[iter].hanzi);
    var correctAnswer = globalWholeArray[iter].translations;
    // var answerBoxes = document.getElementsByClassName('answer');
    var translationArray = getFourTranslation(correctAnswer,tempArray);
    assignAnswer(document.getElementsByClassName('answer'),translationArray)
  }
}

function setChineseChar(inputChar)
{
  document.getElementById('charField').innerHTML=inputChar;
}
function assignAnswer(buttonArray, answerArray)
{
  for(var i=0; i<buttonArray.length; i++)
  {
    buttonArray[i].innerText=answerArray[i];
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

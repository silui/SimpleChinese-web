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
      next();
    });
  }
  next();
});
var correctness = 0;
var tempArray = [];
var globalWholeArray=[];
var iter=-1;
var correctbox;
function next()
{
  if(iter===globalWholeArray.length-1){
    document.getElementsByClassName("content")[0].innerHTML=correctness+`/25<br><button onclick="window.location.href='/quiz'">Continue</button>`;
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
    // console.log(a);
    return a;
}


function getFourTranslation(correct,correctId,vocabSet)
{
  var finalarray=[];
  finalarray.push(correct);
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

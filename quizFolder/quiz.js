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
  var tempArray = Object.values(levelArray)
  var wholeArray = tempArray.slice(targetSetStart,targetSetStart+25);
  var answerBoxes = document.getElementsByClassName('answer');
  var translationArray = getFourTranslation("good",tempArray);
  assignAnswer(answerBoxes,translationArray)
});

function assignAnswer(buttonArray, answerArray)
{
  console.log(buttonArray);
  // buttonArray.forEach(function(elem)
  // {
  //   elem.innerText='a';
  // });
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
    if(inputArray[i]===target)
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
    var newdef=vocabSet[random].translations[0];
    if(!alreadyExist(finalarray,newdef))
      finalarray.push(newdef);
  }
  return shuffle(finalarray);
}

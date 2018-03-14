var myMainSite = window.location.pathname;
var splitUrl = myMainSite.split(/level|-/g);
var targetLevel=splitUrl[1]-1;
var targetSetStart=(splitUrl[2]-1)*25;
var dbRef=firebase.database().ref("vocab");
document.getElementById("main").innerHTML=`
<h2 class="head">
<span>Level(${splitUrl[1]})</span>
<span>Set(${splitUrl[2]})</span>
<span>Quiz</span>
</h2>
<div id="quizArea"></div>
<a class="button" onclick="submitPressed()">Submit</a>
`;
dbRef.on("value",function(snapshot)
{
  var vocabListAll = snapshot.val();
  var curStudy = Object.values(vocabListAll);
  var levelArray = curStudy[targetLevel];
  tempArray = Object.values(levelArray)
  globalWholeArray= tempArray.slice(targetSetStart,targetSetStart+25);
  setquizArea();
  // var buttonArr = document.getElementsByClassName('answer');
  // for(var i=0; i<buttonArr.length; i++)
  // {
  //   buttonArr[i].addEventListener("click",function()
  //   {
  //     if(this.getAttribute("answerid")==correctbox)
  //       correctness++;
  //     // console.log(this.parentNode.children[0].innerText);
  //     resultArray[2].push(this.parentNode.children[0].innerText);
  //     next();
  //   });
  // }
  // next();
});
var resultArray = [];   //3xn matrix to store final result
resultArray.push([]);
resultArray.push([]);
resultArray.push([]);
var correctness = 0;
var tempArray = [];
var globalWholeArray=[];
var iter=0;
var correctbox;
function submitPressed()
{
  //check if the correct box is selected
  var rInputArr=document.getElementsByClassName("radioInput");
  for(var i=0;i<4;i++)
  {
    if(rInputArr[i].checked==true)
    {
      if(i==correctbox)
        correctness++;
      // console.log(rInputArr[i].nextSibling.innerHTML)
      resultArray[2].push(rInputArr[i].nextSibling.innerHTML);
    }
  }





  if(iter===globalWholeArray.length-1){
    var tableHTML=`<table border="1"><tr><th>character</th><th>correct answer</th><th>your pick</th></tr>`;
    for(var i=0; i<resultArray[0].length;i++)
    {
      tableHTML+=`<tr><td>${resultArray[0][i]}</td><td>${resultArray[1][i]}</td><td>${resultArray[2][i]}</td></tr>`;
    }
    tableHTML+=`<table>${correctness}/25 is correct <button onclick="window.location.href='./'">Go Back</button>`;
    document.getElementById("main").innerHTML=tableHTML;
    updateScore(firebase.auth().currentUser.uid,splitUrl[1],splitUrl[2],correctness);
  }
  else {
    iter++;
    setquizArea();
  }
}

function setquizArea()
{
  resultArray[0].push(globalWholeArray[iter].hanzi);
  var returnHTML=`<span id="vocabField">${globalWholeArray[iter].hanzi}</span>`;
  returnHTML+='<div class="options">'
  var fourAnswer=getFourTranslation(globalWholeArray[iter].translations,globalWholeArray[iter].id,tempArray);
  for(var i=0;i<4;i++)
  {
    returnHTML+=`<div class="option"><input type="radio" name="Q1" class="radioInput"/><span>${fourAnswer[i].join(', ')}.</span></div>`
  }
  returnHTML+='</div>'
  document.getElementById("quizArea").innerHTML=returnHTML;
}
// function assignAnswer(textField, answerArray)
// {
//   for(var i=0; i<textField.length; i++)
//   {
//     textField[i].innerHTML='';
//     for(var k=0; k<answerArray[i].length;k++)
//     {
//       textField[i].innerHTML+=answerArray[i][k]+"<br>";
//     }
//   }
// }


function shuffle(a) {
  var correctOne=a[0];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    for(var k=0; k<a.length; k++)
    {
      if(a[k]===correctOne)
        correctbox=k;
    }
    return a;
}


function getFourTranslation(correct,correctId,vocabSet)
{
  var finalarray=[];
  finalarray.push(correct);
  resultArray[1].push(correct.join(', '));
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

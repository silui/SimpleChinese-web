// quiz.js
// assign answer options to each box, display char

// get level and set number from url
var myMainSite = window.location.pathname;
var splitUrl = myMainSite.split(/level|-/g);
var targetLevel=splitUrl[1]-1;
var targetSetStart=(splitUrl[2]-1)*25;

//assign initial HTML tag in the main area
document.getElementById("main").innerHTML=`
<h2 class="head">
<span>Level(${splitUrl[1]})</span>
<span>Set(${splitUrl[2]})</span>
<span>Quiz</span>
</h2>
<div id="quizArea"></div>
<a class="button" onclick="submitPressed()">Submit</a>
`;

//get vocab JSON file from firebase
var dbRef=firebase.database().ref("vocab");
dbRef.on("value",function(snapshot)
{
  var vocabListAll = snapshot.val();
  var curStudy = Object.values(vocabListAll);
  var levelArray = curStudy[targetLevel];
  //set tempArray and globalWholeArray after firebase responded
  tempArray = Object.values(levelArray)
  globalWholeArray= tempArray.slice(targetSetStart,targetSetStart+25);
  setquizArea();
});
var resultArray = [[],[],[]];   //3xn matrix to store final result, first array stores characters, second array stores the correct definition, thrid stores user pick
var correctness = 0;    //store the correct
var tempArray = [];     //tempArray store every object in the level
var globalWholeArray=[];    //globalWholeArray store set specified vocab
var iter=0;         //store which character in the set you are on
var correctbox;     //store which radio is the correct answer
//submitPressed() get called when the submit button is pressed
function submitPressed()
{
  //check if the correct box is selected
  var rInputArr=document.getElementsByClassName("radioInput");
  for(var i=0;i<4;i++)
  {
    if(rInputArr[i].checked==true)    //find which radio is selected
    {
      if(i==correctbox)     //if the user picked the right answer
      {
        correctness++;
        resultArray[2].push('<i class="em em-heavy_check_mark"></i>');
      }
      else
        resultArray[2].push(rInputArr[i].nextSibling.innerHTML);    //push the wrong pick into resultArray for later use
    }
  }
  if(iter===globalWholeArray.length-1)    //if it is at the end of set
  {
    //build the first row specifing table title
    var tableHTML=`<table border="1"><tr id="title"><th>Character</th><th>Correct answer</th><th>Your pick</th></tr>`;
    //build the rest of the row using according resultArray data
    for(var i=0; i<resultArray[0].length;i++)
    {
      tableHTML+=`<tr><td>${resultArray[0][i]}</td><td>${resultArray[1][i]}</td><td>${resultArray[2][i]}</td></tr>`;
    }
    //close the table and add score and go back button
    tableHTML+=`</table><h2>${correctness}/25 is correct<h2><button onclick="window.location.href='./'">Go Back</button>`;
    document.getElementById("main").innerHTML=tableHTML;    //update main innerHTML
    updateScore(firebase.auth().currentUser.uid,splitUrl[1],splitUrl[2],correctness); //call updateScore to update score of this level and set to firebase
  }
  else {      //if it is not at the end of the set
    iter++;
    setquizArea();
  }
}

//Display the quiz area
function setquizArea()
{
  resultArray[0].push(globalWholeArray[iter].hanzi);  //push chinese character to first array in resultArray
  var returnHTML=`<span id="vocabField">${globalWholeArray[iter].hanzi}</span><div class="options">`;    //HTML for display chinese character
  var fourAnswer=getFourTranslation(globalWholeArray[iter].translations,globalWholeArray[iter].id,tempArray);   //get four shuffled answer to display
  for(var i=0;i<4;i++)
  {
    returnHTML+=`<div class="option"><input type="radio" name="Q1" class="radioInput"/><span>${fourAnswer[i].join(', ')}.</span></div>`;  //add answer one by none
  }
  returnHTML+='</div>'; //add closing tag
  document.getElementById("quizArea").innerHTML=returnHTML;   //change the actual html
}

//return 4 shuffled answer with 3 random generated answer and 1 correct answer
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

//shuffle and return 4 elements in the array
function shuffle(a) {
  var correctOne=a[0];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    for(var k=0; k<a.length; k++)
    {
      if(a[k]===correctOne)
        correctbox=k;     //set correctbox to the one that is correct
    }
    return a;
}

//helper function to upload score to firebase
function updateScore(userID,level,set,score)
{
  var dbRef=firebase.database().ref(`user/${userID}/${level}`);
  dbRef.update({[set]:score});
}

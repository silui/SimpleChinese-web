// quizselect.js
// This is used to display

var completedDB;    //global variable for storing vocab database
function userSignedIn()   //overwrite userSignedIn() from auth.js to get User data from firebase
{
  document.getElementById('myBtn').innerHTML="SignOut";
  document.querySelector('#sidenav').innerHTML=`
  <div class="sidenav-item">
    <a href="/">Welcome</a>
  </div>
  <div class="sidenav-item">
    <a href="/vocab">Study</a>
  </div>
  <div class="sidenav-item">
    <a href="/quiz">Quiz</a>
  </div>
  <div class="sidenav-item">
    <a href="/contact">Contact</a>
  </div>
  <div>
    <a class="collapse" onclick="collapseSidebar()"> &lt;</a>
  </div>
    `;
  var userID = firebase.auth().currentUser.uid;
  var dbRef=firebase.database().ref(`user/${userID}`);
  dbRef.on("value",function(snapshot)
  {
    completedDB = snapshot.val();
    var completeBoxArr=document.getElementsByClassName("completedBox");
    var scoreFieldArr=document.getElementsByClassName("scoreClass");
    var startFieldArr=document.getElementsByClassName("start");
    assignBoxAndScore(completedDB,completeBoxArr,scoreFieldArr,startFieldArr);    //call assignBoxAndScore to put table
  });
}

//  build table after loaded data from firebase
var vocabRef=firebase.database().ref("vocab");
vocabRef.on("value",function(snapshot)
{
  var vocabListAll = snapshot.val();
  var curStudy = Object.values(vocabListAll);
  var tempInnerHtml=`<div class="levels">`;
  for(var i=0; i<curStudy.length;i++)
  {
    tempInnerHtml+=`<div class="level"><h1>Level ${i+1}</h1>`;
    tempInnerHtml+=buildTable(curStudy[i],Object.keys(vocabListAll)[i]);
    tempInnerHtml+='</div>';
  }
  tempInnerHtml+=`</div>`;
  document.querySelector('#main').innerHTML=tempInnerHtml;    //change the actual innerHTML in the main div
});

//helper function for building each row of table
function buildTable(inputArray,vocabSet)
{
  var levelNum=vocabSet.replace(/[a-zA-Z]*/,'');
  var set_length=25;
  var length=Object.values(inputArray).length-1;
  var setCount=Math.ceil(length/set_length);
  var lastSetLength=length%set_length;
  var returnString='<table class="table"><tbody>';
  for(var i=1; i<=setCount; i++)
  {
    returnString+=`
          <tr>
          <td>Set ${i}</td>
          <td><a class="button start" href='/quiz/${vocabSet}-${i}'>Start</a></td>
          <td><input type="checkbox" onclick="return false;" class="completedBox" level="${levelNum}" set="${i}"></td>
          `;
    if(i==setCount && lastSetLength!=0)   //if the set is not 25 of length
    {
        returnString+=`<td><span class="scoreClass">0/${lastSetLength}</span></td>`;
    }
    else
    {
        returnString+=`<td><span class="scoreClass">0/25</span></td>`;
    }
    returnString+=`<td><a class="button" onclick="removeScore(this,${levelNum},${i})">Erase</a></td></tr>`;  //add erase button
  }
  return returnString+'</table>';
}

//checked check box after fetching user complesion data
//also change score board and disable start button
function assignBoxAndScore(db,boxArr,scoreArr,startFieldArr)
{
  var boxIter=0;
  for(var l=1;l<6;l++)
  {
    if(db[l]!=null)
    {
      for(var s=0; s<Object.keys(db[l]).length;s++)
      {
        var set=Object.keys(db[l])[s];
        var score=Object.values(db[l])[s];
        while(boxArr[boxIter].getAttribute("level")!=l || boxArr[boxIter].getAttribute("set")!=set) //loop until you found the finished set
        {
            boxIter++;
        }
        boxArr[boxIter].checked=true;     //set check box checked
        startFieldArr[boxIter].setAttribute("onclick","return false");    //disable start button
        startFieldArr[boxIter].innerHTML="Already finished";        //set new text for start button
        var outof=scoreArr[boxIter].innerHTML.split("/")[1];      //get what the score of the set is out of
        scoreArr[boxIter].innerHTML=score+"/"+outof;        //assign new score
      }
    }
  }
}

//function for when Erase button is pressed
function removeScore(buttonDom,level,vocabSet)
{
  var uid=firebase.auth().currentUser.uid;
  var dbref=firebase.database().ref(`user/${uid}/${level}/${vocabSet}`);
  dbref.remove();       //remove entry from firebase for erase
  var parent=buttonDom.parentNode.parentNode;
  parent.childNodes[6].childNodes[0].innerHTML=stripScore(parent.childNodes[6].childNodes[0].innerHTML);
  parent.childNodes[5].childNodes[0].checked=false;
  parent.childNodes[3].childNodes[0].removeAttribute("onclick");
  parent.childNodes[3].childNodes[0].innerHTML="Start";
}

//this returns 4/24 into 0/24, aka strinping numerator while preserving denominator
function stripScore(inputText)
{
  var outOf=inputText.split('/')[1];
  return `0/${outOf}`;
}

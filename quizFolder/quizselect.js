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
    <a href="#contact">Contact</a>
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
    assignBoxAndScore(completedDB,completeBoxArr,scoreFieldArr,startFieldArr);
  });
}

var dbRef=firebase.database().ref("vocab");
dbRef.on("value",function(snapshot)
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
  document.querySelector('#main').innerHTML=tempInnerHtml;
});

function buildTable(inputArray,vocabSet)
{
  var levelNum=vocabSet.replace(/[a-zA-Z]*/,'');
  var set_length=25;
  var length=Object.values(inputArray).length-1;
  var setCount=Math.ceil(length/set_length);
  var lastSetLength=length%set_length;
  var returnString='<table class="table"><tbody>';
  for(var i=1; i<=setCount; i++){
    returnString+=`
          <tr>
          <td>Set ${i}</td>
          <td><a class="button start" href='/quiz/${vocabSet}-${i}'>Start</a></td>
          <td><input type="checkbox" onclick="return false;" class="completedBox" level="${levelNum}" set="${i}"></td>`;
    if(i==setCount && lastSetLength!=0)
    {
        returnString+=`<td><span class="scoreClass">0/${lastSetLength}</span></td>`;
    }
    else {
        returnString+=`<td><span class="scoreClass">0/25</span></td>`;
    }
    returnString+=`<td><a class="button" onclick="removeScore(this,${levelNum},${i})">Erase</a></td></tr>`;
  }
  return returnString+'</table>';
}

//check box if after fetching user complesion data
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
        while(boxArr[boxIter].getAttribute("level")!=l || boxArr[boxIter].getAttribute("set")!=set)
        {
            boxIter++;
        }
        boxArr[boxIter].checked=true;
        startFieldArr[boxIter].setAttribute("onclick","return false");
        startFieldArr[boxIter].innerHTML="Already finished";

        var outof=scoreArr[boxIter].innerHTML.split("/")[1];
        scoreArr[boxIter].innerHTML=score+"/"+outof;
      }
    }
  }
}

function removeScore(buttonDom,level,vocabSet)
{
  var uid=firebase.auth().currentUser.uid;
  var dbref=firebase.database().ref(`user/${uid}/${level}/${vocabSet}`);
  dbref.remove();
  var parent=buttonDom.parentNode.parentNode;
  parent.childNodes[6].childNodes[0].innerHTML=stripScore(parent.childNodes[6].childNodes[0].innerHTML);
  parent.childNodes[5].childNodes[0].checked=false;
  parent.childNodes[3].childNodes[0].removeAttribute("onclick");
  parent.childNodes[3].childNodes[0].innerHTML="Start";
}

function stripScore(inputText)
{
  var outOf=inputText.split('/')[1];
  return `0/${outOf}`;
}

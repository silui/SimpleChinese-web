var completedDB;
function userSignedIn()
{
  document.getElementById('myBtn').innerHTML="SignOut";
  document.querySelector('#sidenav').innerHTML=`
  <a href="/" id="welcomeButton">Welcome</a>
  <a href="/profile" id='profileButton' class="grayClass">Profile</a>
  <a href="/vocab" id="studyButton" class="grayClass">Study</a>
  <a href="/quiz" id="quizButton" class="grayClass">Quiz</a>
  <a href="/" id="contactButton">Contact</a>
  <div>
    <a class="collapse"> &lt;</a>
  </div>
    `;
    document.getElementsByClassName('collapse')[0].onclick = function () {
      document.getElementById('sidenav').classList.add('collapsed');
      setTimeout(function() {
        document.getElementById('main').style.marginLeft = '0px';
        document.getElementById('expand').hidden = false;
      }, 300);
    };
    document.getElementById('expand').onclick = function () {
      document.getElementById('sidenav').classList.toggle('collapsed');
      document.getElementById('main').style.marginLeft = '256px';
      document.getElementById('expand').hidden = true;
    };
  var userID = firebase.auth().currentUser.uid
  var dbRef=firebase.database().ref(`user/${userID}`);
  dbRef.on("value",function(snapshot)
  {
    completedDB = snapshot.val();
    var completeBoxArr=document.getElementsByClassName("completedBox");
    var scoreFieldArr=document.getElementsByClassName("scoreClass");
    assignBoxAndScore(completedDB,completeBoxArr,scoreFieldArr);
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
    tempInnerHtml+=`<div class="level"><h1>Level ${i+1}</h1><div>`;
    tempInnerHtml+=buildTable(curStudy[i],Object.keys(vocabListAll)[i]);
    tempInnerHtml+='</div></div>';
  }
  tempInnerHtml+=`</div>`;
  document.querySelector('#content').innerHTML=tempInnerHtml;
});

function buildTable(inputArray,vocabSet)
{
  var levelNum=vocabSet.replace(/[a-zA-Z]*/,'');
  var set_length=25;
  var length=Object.values(inputArray).length-1;
  var setCount=Math.ceil(length/set_length);
  var lastSetLength=length%set_length;
  var returnString='';
  for(var i=1; i<=setCount; i++){
    returnString+=`
          <div class="li">
          <span>Set ${i}</span>
          <a class="button" href='/quiz/${vocabSet}-${i}'>Start</a>
          <input type="checkbox" onclick="return false;" class="completedBox" level="${levelNum}" set="${i}">`;
    if(i==setCount && lastSetLength!=0)
    {
        returnString+=`<span class="scoreClass">0/${lastSetLength}</span>`;
    }
    else {
        returnString+=`<span class="scoreClass">0/25</span>`;
    }
    returnString+=`<a class="button" onclick="removeScore(this,${levelNum},${i})">Erase</a></div>`;
    // returnString+=`<tr>
    //               <td><input type="checkbox" onclick="return false;" class="completedBox" level="${levelNum}" set="${i}"></td>
    //               <td>${vocabSet}</td>
    //               <td>set ${i}</td>
    //               <td><button onclick="window.location.href='/quiz/${vocabSet}-${i}'">Select</button></td>
    //               </tr>
    //               `
  }
  return returnString;
}
function assignBoxAndScore(db,boxArr,scoreArr)
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
  var parent=buttonDom.parentNode;
  parent.childNodes[6].innerHTML=stripScore(parent.childNodes[6].innerHTML);
  parent.childNodes[5].checked=false;

}

function stripScore(inputText)
{
  var outOf=inputText.split('/')[1];
  return `0/${outOf}`;
}

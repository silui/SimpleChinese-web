var completedDB;
function userSignedIn()
{
  document.getElementById('myBtn').innerHTML="SignOut";
  var temp=document.getElementById('profileButton');
  temp.style.color="white";
  temp.href="/profile";
  temp=document.getElementById('studyButton');
  temp.style.color="white";
  temp.href="/vocab";
  temp=document.getElementById('quizButton');
  temp.style.color="white";
  temp.href="/quiz";
  temp=document.getElementById('reviewButton');
  temp.style.color="white";
  temp.href="/review";
  var userID = firebase.auth().currentUser.uid
  var dbRef=firebase.database().ref(`user/${userID}`);
  dbRef.on("value",function(snapshot)
  {
    completedDB = snapshot.val();
    var completeBoxArr=document.getElementsByClassName("completedBox");
    assignBoxCompleteness(completedDB,completeBoxArr);
  });
}

var dbRef=firebase.database().ref("vocab");
dbRef.on("value",function(snapshot)
{
  var vocabListAll = snapshot.val();
  var curStudy = Object.values(vocabListAll);
  var tempInnerHtml=`<table>
                     <tr>
                     <th>completed</th>
                     <th>Level</th>
                     <th>set</th>
                     <th>choose</th>
                     </tr>
                     `;
  for(var i=0; i<curStudy.length;i++)
  {
    tempInnerHtml+=buildTable(curStudy[i],Object.keys(vocabListAll)[i]);
  }
  document.querySelector('.content').innerHTML=tempInnerHtml+`</table>`;
});

function buildTable(inputArray,vocabSet)
{
  var levelNum=vocabSet.replace(/[a-zA-Z]*/,'');
  var set_length=25;
  var length=Object.values(inputArray).length-1;
  var setCount=Math.ceil(length/set_length);
  var returnString='';
  for(var i=1; i<=setCount; i++){
    returnString+=`<tr>
                  <td><input type="checkbox" onclick="return false;" class="completedBox" level="${levelNum}" set="${i}"></td>
                  <td>${vocabSet}</td>
                  <td>set ${i}</td>
                  <td><button onclick="window.location.href='/quiz/${vocabSet}-${i}'">Select</button></td>
                  </tr>
                  `
  }
  return returnString;
}
function assignBoxCompleteness(db,boxArr)
{
  var boxIter=0;
  for(var l=1;l<db.length+1;l++)
  {
    if(db[l]!=null)
    {
      for(var s=0; s<Object.keys(db[l]).length;s++)
      {
        var set=Object.keys(db[l])[s];
        console.log(l+" "+set);
        while(boxArr[boxIter].getAttribute("level")!=l || boxArr[boxIter].getAttribute("set")!=set)
        {
            boxIter++;
        }
        boxArr[boxIter].checked=true;
      }
    }
  }
}

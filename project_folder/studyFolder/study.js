// study.js


var curStudy; //this stores the whole JSON file
var i=0; //iterator for current vocab
var splitUrl = window.location.pathname.split('/vocab/study/');
var vocabSet = splitUrl[1]-1;   //stores the set we are currently on
var vocabSetLength;   //stores upperbound for
var current;      //helper variable for animat to check if currently display strokes is the current char


var dbRef=firebase.database().ref("vocab");
dbRef.on("value",function(snapshot)
{
  let vocabListAll = snapshot.val();
  curStudy = Object.values(vocabListAll);
  i = 0;
  vocabSetLength = Object.values(curStudy[vocabSet]).length;
  document.querySelector('#main').innerHTML=`
  <audio id="aud" autoplay="autoplay">
    <source id="src" type="audio/mpeg" src="">
  </audio>
  <button type="button" name="openbutton" onclick="openNav()" id="openButton" style="display:none" >></button>
  <h1 id="studyTitle">Level 1 Study</h1>
  <a class="button" id="soundButton" onclick="clickForSound()">Speak</a>
  <a class="button" id="replayButton" onclick="animat()">Replay</a>
  <div id="studyField"></div>
  <div id="character-target-div"></div>
  <div id="transField"> </div>
  <a class="button" id="nButton" onclick="clickForNext()">Next</a>
  <a class="button" id="pButton" onclick="clickForPre()">Previous</a>
  `;
  // showChar();
});

//function for writing strokes on character-target-div div
function animat(zhText=curStudy[vocabSet][i].hanzi, k=0)
{
  current = zhText;
  const delayBetweenAnimations = 750;
  if (k === zhText.length) return;
  const target=document.getElementById('character-target-div');
  const cha = zhText.charAt(k);
  while (target.firstChild)
      target.removeChild(target.firstChild);
  // set property of strokes writing here
  let w = new HanziWriter(target, cha, {
      width: 170,
      height: 170,
      padding: 5,
      strokeAnimationSpeed: 6,
      delayBetweenStrokes: 3
  })
  w.animateCharacter({
      onComplete: function () {
          if (!validate(zhText)) return;
          setTimeout(function () {
              if (!validate(zhText)) return;
              animat(zhText, k + 1);
          }, delayBetweenAnimations);
      }
  });
}

//helper function for animat
function validate(text)
{
  return current === text;
}

//helper function for when next or previous button pressed
function showChar()
{
  updateLastlanding(firebase.auth().currentUser.uid,vocabSet+1,i)           //save and upload where user last was during study
  document.getElementById('studyField').innerHTML =`${curStudy[vocabSet][i].pinyin}<div id="character">${curStudy[vocabSet][i].hanzi}</div>`;
  document.getElementById('studyTitle').innerHTML = `Level ${vocabSet+1} Study`;
  document.getElementById('transField').innerHTML = showTrans();
  animat(curStudy[vocabSet][i].hanzi,0);
}

//return the definition strong
function showTrans(){
  var temp='<strong>Definition:</strong>';
  var translationNum = curStudy[vocabSet][i].translations.length;
  for(j=0;j<translationNum;j++)
  {
    if(j!=translationNum-1)
    {
      temp += curStudy[vocabSet][i].translations[j];
      temp += ', ';
    }
    else
      temp += curStudy[vocabSet][i].translations[j];
  }
  return temp;
}

//function that get called when previous button is pressed
function clickForPre()
{
  if(i > 0)
  {
    i--;
    showChar();
  }
}

//function that get called when next button is pressed
function clickForNext()
{
  if(i < vocabSetLength)
  {
    i++;
    showChar();
  }
}

// function that get called when speak button is pressed
function clickForSound(targetChar=curStudy[vocabSet][i].hanzi)
{
  var encodedTargetChar=encodeURI(targetChar);
  const soundUrl = `http://tts.baidu.com/text2audio?lan=zh&ie=UTF-8&spd=2&text=${targetChar}`;
  document.getElementById('src').setAttribute('src', soundUrl);
  const aud = document.getElementById('aud');
  aud.load();
  return aud.play();
}

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
  var landingRef=firebase.database().ref(`user/${userID}/landing/level${vocabSet+1}`);
  landingRef.on("value",function(snapshot)
  {
    console.log(snapshot.val());
    if(snapshot.val()!=null)
    {
      i=snapshot.val();
    }
    showChar();
  });
}


//function that update landing
function updateLastlanding(userID,level,index)
{
  var dbRef=firebase.database().ref(`user/${userID}/landing`);
  let temp="level"+level;
  dbRef.update({[temp]:index});
}

var vocabListAll;
var levels;
var curStudy;
var i=0; //No. of char in the list
var myMainSite;
var splitUrl;
var vocabSet;
var vocabSetLength;
var current;
function validate(text) {
    return current === text;
}
var dbRef=firebase.database().ref("vocab");
dbRef.on("value",function(snapshot)
{
  vocabListAll = snapshot.val();
  levels = Object.keys(vocabListAll);
  curStudy = Object.values(vocabListAll);
  i = 0; //No. of char in the list
  myMainSite = window.location.pathname;
  splitUrl = myMainSite.split('/vocab/study/');
  vocabSet = splitUrl[1]-1;
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
  showChar();
});

function animat(zhText=curStudy[vocabSet][i].hanzi, k=0)
{
  current = zhText;
  const delayBetweenAnimations = 750;
  if (k === zhText.length) return;
  const target=document.getElementById('character-target-div');
  const cha = zhText.charAt(k);
  while (target.firstChild)
      target.removeChild(target.firstChild);
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

function showChar(){
  document.getElementById('studyField').innerHTML =`${curStudy[vocabSet][i].pinyin}<div id="character">${curStudy[vocabSet][i].hanzi}</div>`;
document.getElementById('studyTitle').innerHTML = `Level ${vocabSet+1} Study`;
document.getElementById('transField').innerHTML = showTrans();
animat(curStudy[vocabSet][i].hanzi,0);
}


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
    else {
      temp += curStudy[vocabSet][i].translations[j];
    }
  }
  return temp;
}

function clickForPre(){
  if(i > 0)
  {
    i--;
    showChar();
  }
}

function clickForNext(){
  if(i < vocabSetLength)
  {
    i++;
    showChar();
  }
}

function clickForSound(targetChar=curStudy[vocabSet][i].hanzi){
  var encodedTargetChar=encodeURI(targetChar);
  const soundUrl = `http://tts.baidu.com/text2audio?lan=zh&ie=UTF-8&spd=2&text=${targetChar}`;
  document.getElementById('src').setAttribute('src', soundUrl);
  const aud = document.getElementById('aud');
  aud.load();
  return aud.play();
}

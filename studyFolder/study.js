document.querySelector('.content').innerHTML=`
<audio id="aud" autoplay="autoplay">
  <source id="src" type="audio/mpeg" src="">
</audio>
<button type="button" name="openbutton" onclick="openNav()" id="openButton" style="display:none" >></button>
<h1 id="studyTitle">Level 1 Study</h1>
<script src="/navigationShift.js"></script>
<input type="button" id="clickP" value="Previous">
<input type="button" id="clickN" value="Next">
<input type="button" id="soundButton" value="speak">
<div id="studyField"> </div>
<div id="transField"> </div>
`;
var dbRef=firebase.database().ref("vocab");
dbRef.on("value",function(snapshot)
{
  var vocabListAll = snapshot.val();
  var levels = Object.keys(vocabListAll);
  var curStudy = Object.values(vocabListAll);
  var i = 0; //No. of char in the list
  var myMainSite = window.location.pathname;
  var splitUrl = myMainSite.split('/vocab/study/');
  var vocabSet = splitUrl[1]-1;
  var vocabSetLength = Object.values(curStudy[vocabSet]).length;

  function showChar(){
  	document.getElementById('studyField').innerHTML =
	`<div>${curStudy[vocabSet][i].pinyin}</div>
	<h2 id"character">${curStudy[vocabSet][i].hanzi}</h2>`;
  document.getElementById('studyTitle').innerHTML = `
  Level ${vocabSet+1} Study`;

	document.getElementById('transField').innerHTML = showTrans();
 }


 	function showTrans(){
 		var temp='';
 		var translationNum = curStudy[vocabSet][i].translations.length;
 		for(j=0;j<translationNum;j++)
 		{
 			temp += "<div>";
 			temp += curStudy[vocabSet][i].translations[j];
 			temp += '</div>';
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

  function clickForSound(){
    var targetChar=curStudy[vocabSet][i].hanzi;
    targetChar=encodeURI(targetChar);
    const soundUrl = `http://tts.baidu.com/text2audio?lan=zh&ie=UTF-8&spd=2&text=${targetChar}`;
    document.getElementById('src').setAttribute('src', soundUrl);
    const aud = document.getElementById('aud');
    aud.load();
    return aud.play();
  }

  //console.log(curStudy[tempValueSetLater][i].hanzi);
  document.getElementById("clickP").onclick = function(){clickForPre()};
  document.getElementById("clickN").onclick = function(){clickForNext()};
  document.getElementById("soundButton").onclick = function(){clickForSound()};
  showChar();
});

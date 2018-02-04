firebaseInit();

var dbRef=firebase.database().ref("vocab");
dbRef.on("value",function(snapshot)
{
  var vocabListAll = snapshot.val();
  var levels = Object.keys(vocabListAll);
  //console.log(levels);
  var curStudy = Object.values(vocabListAll);

  var tempValueSetLater = 0;
  var i = 0;



  function showChar(){
  	document.getElementById('studyField').innerHTML =
	`<div>${curStudy[tempValueSetLater][i].pinyin}</div>
	<h2>${curStudy[tempValueSetLater][i].hanzi}</h2>`;

	document.getElementById('transField').innerHTML = showTrans();

	//console.log(curStudy[tempValueSetLater][i].translations.length)
 	//console.log(i);
 }

 	function showTrans(){
 		var temp='';
 		var translationNum = curStudy[tempValueSetLater][i].translations.length;
 		for(j=0;j<translationNum;j++)
 		{
 			temp += "<div>";
 			temp += curStudy[tempValueSetLater][i].translations[j];
 			temp += '</div>';
 		}
 		return temp;
 	}


  function clickForPre(){
  	i--;
  	showChar();
  }

  function clickForNext(){
  	i++;
  	showChar();
  }

  //console.log(curStudy[tempValueSetLater][i].hanzi);
  document.getElementById("clickP").onclick = function(){clickForPre()};
  document.getElementById("clickN").onclick = function(){clickForNext()};

  showChar();

});


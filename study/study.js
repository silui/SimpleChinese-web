firebaseInit();

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

    console.log(vocabSetLength);

  function showChar(){
  	document.getElementById('studyField').innerHTML =
	`<div>${curStudy[vocabSet][i].pinyin}</div>
	<h2>${curStudy[vocabSet][i].hanzi}</h2>`;

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

  //console.log(curStudy[tempValueSetLater][i].hanzi);
  document.getElementById("clickP").onclick = function(){clickForPre()};
  document.getElementById("clickN").onclick = function(){clickForNext()};

  showChar();

});

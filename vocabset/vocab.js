// console.log('something');
// document.getElementById('vocabField').innerHTML='not hello';
firebaseInit();
var dbRef=firebase.database().ref("vocab");
var totalLevelSet=0;
//this function is called when firebase return db
dbRef.on("value",function(snapshot)
{
  var vocabListAll=snapshot.val();
  var leftside=Object.keys(vocabListAll); //only array with level name
  var rightside=Object.values(vocabListAll);  //json for the rest of db
  //add picture of different levelset
  document.querySelector('.content').innerHTML=
  `<div class='char-book'>
  ${leftside.map(function(levelset,index){
    totalLevelSet=index;
    return `<img src="${rightside[index].url}" id="Level${index}">`
  }).join('')}
  </div>`;
  //add event listener for all picture
  for(var i=0;i<totalLevelSet+1;i++)
  {
    document.getElementById('Level'+i).addEventListener("click",function()
    {
      var clickedPic=this.id;
      var targetNum=Number(clickedPic.split("Level")[1])+1;
      window.location.href=`/vocab/study/${targetNum}`;
    });
  }
});

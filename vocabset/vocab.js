// console.log('something');
// document.getElementById('vocabField').innerHTML='not hello';
firebaseInit();
var dbRef=firebase.database().ref("vocab");
dbRef.on("value",function(snapshot)
{
  var vocabListAll=snapshot.val();
  var leftside=Object.keys(vocabListAll);
  var rightside=Object.values(vocabListAll);
  console.log(rightside[0].url);
  document.getElementById('vocabField').innerHTML=
  `<div class='char-book'>

  ${leftside.map(function(levelset,index){
    return `
    <img src='${rightside[index].url}'>
    `
  }).join('')}
  </div>`;});

// console.log('something');
// document.getElementById('vocabField').innerHTML='not hello';
firebaseInit();
// var finaljson={'name':'edward','date':'12'};
var dbRef=firebase.database().ref("vocab");
dbRef.on("value",function(snapshot)
{
  var tempjson=snapshot.val();
  finaljson=Object.keys(tempjson);
  console.log(Object.keys(tempjson));
  document.getElementById('vocabField').innerHTML=`
  ${finaljson.map(function(levelset){
    return `
    <div class='char-book'>
    ${levelset}
    </div>
    `
  }).join('')}
  `
});

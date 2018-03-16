//vocab.js
//access firebase and display set pictures to main


var dbRef=firebase.database().ref("vocab");
var totalLevelSet=0;
//this function is called when firebase return db
dbRef.on("value",function(snapshot)
{
  var vocabListAll=snapshot.val();
  var leftside=Object.keys(vocabListAll); //only array with level name
  var rightside=Object.values(vocabListAll);  //json for the rest of db
  //add picture of different levelset
  document.querySelector('#main').innerHTML=
  `<div class="levels">
  ${leftside.map(function(levelset,index){
    totalLevelSet=index;
    return `<a href="/vocab/study/${index+1}"><img src="${rightside[index].url}"></a>`
  }).join('')}
  </div> <link rel="stylesheet" href="vocabset/vocab.css">
`;
});

var dbRef=firebase.database().ref("vocab");
dbRef.on("value",function(snapshot)
{
  var vocabListAll = snapshot.val();
  var curStudy = Object.values(vocabListAll);
  // console.log(curStudy.length);
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
  var set_length=25;
  var length=Object.values(inputArray).length-1;
  var setCount=Math.ceil(length/set_length);
  var returnString='';
  for(var i=1; i<=setCount; i++){
    returnString+=`<tr>
                  <td><input type="checkbox" onclick="return false;"></td>
                  <td>${vocabSet}</td>
                  <td>set ${i}</td>
                  <td><button onclick="window.location.href='/quiz/${vocabSet}-${i}'">Select</button></td>
                  </tr>
                  `
  }
  return returnString
}

function userSignedIn()
{
  document.getElementById('myBtn').innerHTML="SignOut";
  var temp=document.getElementById('profileButton');
  temp.style.color="white";
  temp.href="/profile";
  temp=document.getElementById('studyButton');
  temp.style.color="white";
  temp.href="/vocab";
  temp=document.getElementById('quizButton');
  temp.style.color="white";
  temp.href="/quiz";
  temp=document.getElementById('reviewButton');
  temp.style.color="white";
  temp.href="/review";
  // updateScore(firebase.auth().currentUser.uid,1,1,12)
}

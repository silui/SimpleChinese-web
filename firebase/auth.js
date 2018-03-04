var firstauthchange=true;
var config = {
  apiKey: "AIzaSyA0NvOKcC3J2fA87dQcH1EqCejPIBJ25Go",
  authDomain: "watertester-32c5a.firebaseapp.com",
  databaseURL: "https://watertester-32c5a.firebaseio.com",
  projectId: "watertester-32c5a",
  storageBucket: "watertester-32c5a.appspot.com",
  messagingSenderId: "3938042936"
};
firebase.initializeApp(config);
document.getElementById('signupButton').addEventListener("click", function()
{
  var email = document.getElementById('emailField').value;
  var password = document.getElementById('passwordField').value;
  if(email!="" && password!="")
  {
    firebase.auth().createUserWithEmailAndPassword(email,password).catch(function(error)
    {
      alert(error.message);
    });
  }
});
document.getElementById('loginButton').addEventListener("click", function()
{
  var email = document.getElementById('emailField').value;
  var password = document.getElementById('passwordField').value;
  if(email!="" && password!="")
  {
    firebase.auth().signInWithEmailAndPassword(email,password).catch(function(error)
    {
      alert(error.message);
    });
    //location.reload();
    // firebase.auth().createUserWithEmailAndPassword(email,password).catch(function(error)
    // {
    //   alert(error.message);
    // });
  }
});
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
}
firebase.auth().onAuthStateChanged(function(user) {
  console.log("auth changed");
  if(firstauthchange)
  {
    if(user!=null)
    {
      userSignedIn();
    }
    firstauthchange=false;
  }
  else
  {
    location.reload();
  }
});

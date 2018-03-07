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
  document.querySelector('#sidenav').innerHTML=`
  <a href="/" id="welcomeButton">Welcome</a>
  <a href="/profile" id='profileButton' class="grayClass">Profile</a>
  <a href="/study" id="studyButton" class="grayClass">Study</a>
  <a href="/quiz" id="quizButton" class="grayClass">Quiz</a>
  <a href="/" id="contactButton">Contact</a>
    `;
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

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
  }
});
function userSignedIn()
{
  document.getElementById('myBtn').innerHTML="SignOut";
  document.querySelector('#sidenav').innerHTML=`
  <a href="/" id="welcomeButton">Welcome</a>
  <a href="/profile" id='profileButton' class="grayClass">Profile</a>
  <a href="/vocab" id="studyButton" class="grayClass">Study</a>
  <a href="/quiz" id="quizButton" class="grayClass">Quiz</a>
  <a href="/" id="contactButton">Contact</a>
  <div>
    <a class="collapse"> &lt;</a>
  </div>
    `;
    document.getElementsByClassName('collapse')[0].onclick = function () {
      document.getElementById('sidenav').classList.add('collapsed');
      setTimeout(function() {
        document.getElementById('main').style.marginLeft = '0px';
        document.getElementById('expand').hidden = false;
      }, 300);
    };
    document.getElementById('expand').onclick = function () {
      document.getElementById('sidenav').classList.toggle('collapsed');
      document.getElementById('main').style.marginLeft = '256px';
      document.getElementById('expand').hidden = true;
    };

}
firebase.auth().onAuthStateChanged(function(user) {
  console.log("auth changed");
  if(firstauthchange)
  {
    if(user!=null)
    {
      userSignedIn();
    }
    else if(location.pathname.substring(0,6)=="/vocab"||location.pathname.substring(0,5)=="/quiz")
    {
      location.href="/";
    }
    firstauthchange=false;
  }
  else
  {
    location.reload();
  }
});

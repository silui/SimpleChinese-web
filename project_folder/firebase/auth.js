// auth.js
// store firebase info, initialize firebase. This file also take cares of when user sign in thus it needs navBar.js as depencies


var firstauthchange=true; //variable for detecting when user just SignOut
var config = {            //configuration keys given by firebase
  apiKey: "AIzaSyA0NvOKcC3J2fA87dQcH1EqCejPIBJ25Go",
  authDomain: "watertester-32c5a.firebaseapp.com",
  databaseURL: "https://watertester-32c5a.firebaseio.com",
  projectId: "watertester-32c5a",
  storageBucket: "watertester-32c5a.appspot.com",
  messagingSenderId: "3938042936"
};
firebase.initializeApp(config);         //initialize firebase

//signup button eventlistener definition
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
  else {
    alert("input can't be empty");
  }
});

// login button eventlistener definition
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
  else {
    alert("input can't be empty");
  }
});

// userSignedIn used to modify navbar enteries and signin button text
function userSignedIn()
{
  document.getElementById('myBtn').innerHTML="SignOut";
  document.querySelector('#sidenav').innerHTML=`
  <div class="sidenav-item">
    <a href="/">Welcome</a>
  </div>
  <div class="sidenav-item">
    <a href="/vocab">Study</a>
  </div>
  <div class="sidenav-item">
    <a href="/quiz">Quiz</a>
  </div>
  <div class="sidenav-item">
    <a href="/contact">Contact</a>
  </div>
  <div>
    <a class="collapse" onclick="collapseSidebar()"> &lt;</a>
  </div>
    `;
}

// This function is called automatically when auth change is detected
firebase.auth().onAuthStateChanged(function(user)
{
  if(firstauthchange)
  {
    if(user!=null)
      userSignedIn();
    else if(location.pathname.substring(0,6)=="/vocab"||location.pathname.substring(0,5)=="/quiz")  //if user is not signedin and landed on study or quiz page, redirect them to home page
      location.href="/";
    firstauthchange=false;
  }
  else
    location.reload();    //If user just signed in, reload page
});

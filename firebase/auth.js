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
// firebaseInit();
// firebase.auth().onAuthStateChanged
// var freshreg=false;
// firebase.auth().onAuthStateChanged(function(user) {
//   if (user)
//   {
//     if(freshreg===true)
//     {
//       var user = firebase.auth().currentUser;
//       user.sendEmailVerification().then(function() {
//       console.log('confirmation sent');
//       });
//     }
//     console.log('auth is user');
//     console.log('redirecting back to home page');
//     window.location.href='/';
//   } else
//   {
//       firebase.auth().signOut();
//       console.log('auth is not user');
//
//   }
// });
//
// document.querySelector('#registerButton').addEventListener('click',function()
// {
//
//     var email=document.querySelector('#register-emailDOM').value;
//     var password=document.querySelector('#register-passwordDOM').value;
//     var alias=document.querySelector('#register-aliasDOM').value;
//     firebase.auth().createUserWithEmailAndPassword(email,password).catch(function(error)
//     {
//       document.querySelector('#warning field').innerHTML=error.message;
//     });
//     freshreg=true;
//   });
//
//
// document.querySelector('#loginButton').addEventListener('click',function()
// {
//   var email = document.getElementById('login-emailDOM').value;
//   var password = document.getElementById('login-passwordDOM').value;
//   firebase.auth().signInWithEmailAndPassword(email,password).catch(function(error) {
//     // Handle Errors here.
//     var errorCode = error.code;
//     var errorMessage = error.message;
//     // [START_EXCLUDE]
//     if (errorCode === 'auth/wrong-password') {
//       document.getElementById('warning field').innerHTML='Wrong password.';
//     } else {
//       document.getElementById('warning field').innerHTML='something is wrong';
//     }
//   });
// });

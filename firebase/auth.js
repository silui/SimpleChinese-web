firebaseInit();
var freshreg=false;
firebase.auth().onAuthStateChanged(function(user) {
  if (user)
  {
    if(freshreg===true)
    {
      var user = firebase.auth().currentUser;
      user.sendEmailVerification().then(function() {
      console.log('confirmation sent');
      });
    }
    console.log('auth is user');
    console.log('redirecting back to home page');
    window.location.href='/';
  } else
  {
      firebase.auth().signOut();
      console.log('auth is not user');

  }
});

document.querySelector('#registerButton').addEventListener('click',function()
{

    var email=document.querySelector('#register-emailDOM').value;
    var password=document.querySelector('#register-passwordDOM').value;
    var alias=document.querySelector('#register-aliasDOM').value;
    firebase.auth().createUserWithEmailAndPassword(email,password).catch(function(error)
    {
      document.querySelector('#warning field').innerHTML=error.message;
    });
    freshreg=true;
  });


document.querySelector('#loginButton').addEventListener('click',function()
{
  var email = document.getElementById('login-emailDOM').value;
  var password = document.getElementById('login-passwordDOM').value;
  firebase.auth().signInWithEmailAndPassword(email,password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // [START_EXCLUDE]
    if (errorCode === 'auth/wrong-password') {
      document.getElementById('warning field').innerHTML='Wrong password.';
    } else {
      document.getElementById('warning field').innerHTML='something is wrong';
    }
  });
});

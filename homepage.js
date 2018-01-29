firebaseInit();
firebase.auth().onAuthStateChanged(function(user) {
  if(user)
  {
    document.querySelector('#loginStatus').innerHTML='user loged in as '+user.email;
    document.querySelector('#loginButton').value='logout';
  }
});

document.querySelector('#loginButton').addEventListener('click',function()
{
  if(document.querySelector('#loginButton').value==='logout')
  {
      firebase.auth().signOut();
      location.reload();
  }
  else
  {
    var temp_string=window.location.href;
    console.log(temp_string);
    window.location.href='/auth';
  }
  return;
});

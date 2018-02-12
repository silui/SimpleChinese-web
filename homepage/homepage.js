document.querySelector('.content').innerHTML=`
<h1>Welcome to Simple Chinese</h1>
<p> Thank for visiting Simple Chinese, Here are some description about our product: </p>
  <ol>
    <li>Choose diffculties</li>
    <li>Study Chinese</li>
    <li>View what you have learned</li>
    <li>Quiz youself about what you have learned</li>
    <li>See what you got wrong</li>
    <li>Quiz youself about what you got wrong</li>
    <li>Have your own study profile</li>
  <ol>`;

// firebase.auth().onAuthStateChanged(function(user) {
//   if(user)
//   {
//     document.querySelector('#loginStatus').innerHTML='user loged in as '+user.email;
//     document.querySelector('#loginButton').value='logout';
//   }
//   document.querySelector('.main').style="display:on";
//   document.querySelector('.loader').style="display:none";
// });
//
// document.querySelector('#loginButton').addEventListener('click',function()
// {
//   if(document.querySelector('#loginButton').value==='logout')
//   {
//       firebase.auth().signOut();
//       location.reload();
//   }
//   else
//   {
//     var temp_string=window.location.href;
//     console.log(temp_string);
//     window.location.href='/auth';
//   }
//   return;
// });

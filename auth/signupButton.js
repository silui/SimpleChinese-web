document.querySelector("#auth").innerHTML=`
<button class="button" id="myBtn">Login/Sign up</button>
  <div id="myModal" class="modal">
    <div class="loginbox" style="display: none">
    <span class="close">&times;</span>
    <img src="https://cdn0.iconfinder.com/data/icons/flat-security-icons/512/lock.png" class="avatar">
    <h1>Login here</h1>
    <div>
      <p>Email address</p>
      <input type="text" name="" placeholder="Enter email" id="emailField">
      <p>Password</p>
      <input type="password" name="" placeholder="Enter Password" id="passwordField">
      <button type="button" id="loginButton">Login</button>
      <button type="button" id="signupButton">Signup</button><br>
      <a href="#"> Lost your account?</a>
      <a href="#"> Don't have an account?</a>
    </div>
    <link rel="stylesheet" href="/auth/signupButton.css">
    </div>
  </div>
`;
var modal = document.querySelector('.modal');
var btn = document.getElementById("myBtn");
var span = document.getElementsByClassName("close")[0];
btn.onclick = function() {
  if(btn.innerHTML==="SignOut")
  {
    console.log("signout detected");
    firebase.auth().signOut();
  }
  else
  {
    modal.style.display = "block";
    document.querySelector('.loginbox').style.display = "block";
  }
}
// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// document.getElementById('expand').onclick = function() {
//   document.getElementById('sidenav').classList.toggle('collapsed');
//   document.getElementById('main').classList.toggle('collapsed');
//   document.getElementById('expand').hidden = true;
//   setTimeout(function() {
//     if (sliderApi) {
//       sliderApi.refresh();
//     }
//   }, 300);
// };

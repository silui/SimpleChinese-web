document.querySelector("#auth").innerHTML=`
<button class="button" id="myBtn">Login/Sign up</button>
  <div id="myModal" class="modal">
    <div class="loginbox" style="display: none">
    <span class="close">&times;</span>
    <img src="https://cdn0.iconfinder.com/data/icons/flat-security-icons/512/lock.png" class="avatar">
    <h1>Login here</h1>
    <form>
      <p>Username</p>
      <input type="text" name="" placeholder="Enter Username">
      <p>Password</p>
      <input type="password" name="" placeholder="Enter Password">
      <input type="submit" name="" value="Login">
      <a href="#"> Lost your account?</a>
      <a href="#"> Don't have an account?</a>
    </form>
    <link rel="stylesheet" href="/auth/signupButton.css">
    </div>
  </div>
`;
var modal = document.querySelector('.modal');
var btn = document.getElementById("myBtn");
var span = document.getElementsByClassName("close")[0];
btn.onclick = function() {
    modal.style.display = "block";
    document.querySelector('.loginbox').style.display = "block";
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

document.querySelector('.sidenav').innerHTML=`
<button type="button" name="button" id="closeNav" onclick="closeNav()"><</button>
  <a href="/" id="welcomeButton">Welcome</a>
  <a id='profileButton' class="grayClass">Profile</a>
  <a id="studyButton" class="grayClass">Study</a>
  <a id="quizButton" class="grayClass">Quiz</a>
  <a id="reviewButton" class="grayClass">Review</a>
  <a id="contactButton">Contact</a>
  <link rel="stylesheet" href="/navBar/navBar.css">
  `;
  function openNav(){
  	document.querySelector('.sidenav').style.left="0px";
  	document.querySelector('.content').style.marginLeft="200px";
  	document.getElementById('openButton').style.display="none";
  }
  function closeNav(){
  	document.querySelector('.sidenav').style.left="-200px";
  	document.querySelector('.content').style.marginLeft="0";
  	document.getElementById('openButton').style.display="block";
  }

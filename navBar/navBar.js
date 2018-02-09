document.querySelector('.sidenav').innerHTML=`
<button type="button" name="button" id="closeNav" onclick="closeNav()"><</button>
  <a id="welcomeButton">Welcome</a>
  <a>Profile</a>
  <a id="studyButton">Study</a>
  <a>Quiz</a>
  <a>Review</a>
  <a>Contact</a>
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
  document.getElementById('studyButton').addEventListener('click',function(){
    window.location.href  ='/vocab'
  });
  document.getElementById('welcomeButton').addEventListener('click',function(){
    window.location.href  ='/'
  });

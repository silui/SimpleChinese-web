function openNav(){
	document.getElementById('nav').style.left="0px";
	document.getElementById('content').style.marginLeft="200px";
	document.getElementById('openButton').style.display="none";
}
function closeNav(){
	document.getElementById('nav').style.left="-200px";
	document.getElementById('content').style.marginLeft="0";
	document.getElementById('openButton').style.display="block";
}
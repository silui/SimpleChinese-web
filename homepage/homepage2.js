window.addEventListener('load', function () {
  document.getElementsByClassName('collapse')[0].onclick = function () {
    document.getElementById('sidenav').classList.add('collapsed');
    setTimeout(function() {
      document.getElementById('main').style.marginLeft = '0px';
      document.getElementById('expand').hidden = false;
    }, 300);
  }

  document.getElementById('expand').onclick = function () {
    document.getElementById('sidenav').classList.toggle('collapsed');
    document.getElementById('main').style.marginLeft = '256px';
    document.getElementById('expand').hidden = true;
  }
})

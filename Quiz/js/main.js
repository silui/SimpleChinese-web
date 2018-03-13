var sliderApi;

window.addEventListener('load', function() {
  document.getElementsByClassName('collapse')[0].onclick = function() {
    document.getElementById('sidenav').classList.add('collapsed');
    document.getElementById('main').classList.add('collapsed');
    setTimeout(function() {
      document.getElementById('expand').hidden = false;
      if (sliderApi) {
        sliderApi.refresh();
      }
    }, 300);
  };

  document.getElementById('expand').onclick = function() {
    document.getElementById('sidenav').classList.toggle('collapsed');
    document.getElementById('main').classList.toggle('collapsed');
    document.getElementById('expand').hidden = true;
    setTimeout(function() {
      if (sliderApi) {
        sliderApi.refresh();
      }
    }, 300);
  };
});

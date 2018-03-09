var sliderApi;

function collapse()
{
  document.getElementById('sidenav').classList.add('collapsed');
  document.getElementById('main').classList.add('collapsed');
  setTimeout(function() {
    document.getElementById('expand').hidden = false;
    if (sliderApi) {
      sliderApi.refresh();
    }
  }, 300);
}


function expand()
{
    document.getElementById('sidenav').classList.toggle('collapsed');
    document.getElementById('main').classList.toggle('collapsed');
    document.getElementById('expand').hidden = true;
    setTimeout(function() {
      if (sliderApi) {
        sliderApi.refresh();
      }
    }, 300);
  };

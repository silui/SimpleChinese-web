function collapseSidebar() {
  document.getElementById('sidenav').classList.add('collapsed');
  document.getElementById('main').classList.add('collapsed');
  setTimeout(function() {
    document.getElementById('expand').hidden = false;
  }, 300);
};
function expandSidebar() {
  document.getElementById('sidenav').classList.toggle('collapsed');
  document.getElementById('main').classList.toggle('collapsed');
  document.getElementById('expand').hidden = true;
  // setTimeout(function() {
  //   slider.resize();
  // }, 300);
};

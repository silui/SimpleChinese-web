function modalActive(isActive) {
  var modal = document.getElementsByClassName('modal')[0];
  if (modal) {
    if (isActive) {
      modal.classList.add('is-active');
    } else {
      modal.classList.remove('is-active');
    }
  }
}

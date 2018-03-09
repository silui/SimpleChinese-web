var carousel,
  images,
  imageWidth,
  imagesWidth,
  animated,
  indicators,
  outerTimer,
  index = 0;

function init() {
  index = 0;
  carousel = document.getElementsByClassName('carousel')[0];
  images = document.getElementsByClassName('carousel-images')[0];
  imagesWidth = images.children.length * carousel.offsetWidth;
  images.style.width = imagesWidth + 'px';

  indicators = document.getElementsByClassName('carousel-indicators')[0]
    .children;
  for (var i = 0; i < indicators.length; i++) {
    indicators[i].onclick = indexClick;
  }

  var prev = document.getElementsByClassName('prev')[0],
    next = document.getElementsByClassName('next')[0];
  prev.onclick = prevClick;
  next.onclick = nextClick;
}

function animate() {
  animated = true;

  for (var i = 0; i < indicators.length; i++) {
    if (indicators[i].className == 'active' && i != index) {
      indicators[i].className = '';
    }
  }
  indicators[index].className = 'active';

  var start = images.style.marginLeft ? parseInt(images.style.marginLeft, 10) : 0,
    end = index * 1000 * -1,
    offset = end - start;

  var timer,
    t = 0,
    duration = 100,
    interval = 10;

  timer = setInterval(function() {
    if (index == images.children.length) {
      clearInterval(timer);
      images.style.marginLeft = '0px';
      index = 0;
      animated = false;
      return;
    }

    t++;
    if (t >= duration) {
      clearInterval(timer);
      animated = false;
    }
    images.style.marginLeft = offset / duration * t + start + 'px';
  }, interval);
}

function nextClick() {
  if (animated) {
    return;
  }

  index++;
  if (index > images.children.length - 1) {
    index = 0;
  }
  animate();
}

function prevClick() {
  if (animated) {
    return;
  }

  index--;
  if (index < 0) {
    index = images.children.length - 1;
    images.style.marginLeft = -index * imagesWidth + 'px';
  }
  animate();
}

function indexClick() {
  if (animated) {
    return;
  }
  if (this.className == 'active') {
    return;
  }
  index = parseInt(this.getAttribute('data-index'));
  animate();
}

window.addEventListener('load', function() {
  init();
  // setInterval(nextClick, 3000);
});

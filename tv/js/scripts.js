let circle = document.getElementById('circle');
let link = document.getElementById('link');

circle.onmousedown = function(event) {
  event.stopPropagation();
  event.preventDefault();

  let startX = 365;
  let endX = -10;
  let startCursorX = event.pageX

  function moveTo(diffX) {
    let currentX = startX - diffX;

    if (currentX < endX) {
      currentX = endX;
    } else if (currentX > startX) {
      currentX = startX;
    }

    circle.style.left = currentX + 'px';

    if (currentX === endX) {
      window.location.href = link.href;
    }
  }

  document.onmousemove = function(event) {
    let diffX = startCursorX - event.pageX;

    moveTo(diffX);
  }

  document.onmouseup = function() {
    document.onmousemove = null;
    circle.onmouseup = null;
  }
}

link.onclick = function(event) {
  event.stopPropagation();
  event.preventDefault();

  circle.classList.add("button__circle--animation");
  setTimeout(function() {
    window.location.href = link.href;
  }, 1200);
}

let circle = document.getElementById('circle');
let button = document.getElementById('button');
let link = document.getElementById('link');
let linkText = document.getElementById('link-text');

function start(event) {
console.log(event.type)
  event.stopPropagation();
  event.preventDefault();

  circle.style.marginLeft = -circle.offsetWidth / 2 + 'px';

  let maxX = button.offsetWidth;
  let endX = 0;
  let startX = circle.offsetLeft - (-circle.offsetWidth / 2);
  let startCursorX = event.clientX || event.touches[0].pageX

  function moveTo(diffX) {
    let currentX = startX - diffX;

    if (currentX < endX) {
      currentX = endX;
    } else if (currentX > maxX) {
      currentX = maxX;
    }

    circle.style.left = currentX + 'px';
    linkText.style.opacity = currentX/maxX;

    if (currentX === endX) {
      //window.location.href = link.href;
    }
  }

  function move(event) {
    let currentCursorX = event.clientX || event.touches[0].pageX;
    let diffX = startCursorX - currentCursorX;

    moveTo(diffX);
  }
  document.ontouchmove = move;
  document.onmousemove = move;

  function end() {
    document.ontouchmove = document.onmousemove = null;
    circle.ontouchend = circle.onmouseup = null;
  }

  document.ontouchend = end;
  document.onmouseup = end;
}

circle.ontouchstart = start;
circle.onmousedown = start;

link.onclick = function(event) {
  event.stopPropagation();
  event.preventDefault();

  button.classList.add("button--animate");
  setTimeout(function() {
    // window.location.href = link.href;
  }, 1200);
}

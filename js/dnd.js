'use strict';

(function () {
  var pinsBlock = document.querySelector('.map__pins');
  var mainPin = document.querySelector('.map__pin--main');
  var inputAddress = document.querySelector('#address');

  var isDragged = false;

  var limits = {
    top: 130,
    right: pinsBlock.offsetWidth + pinsBlock.offsetLeft - mainPin.offsetWidth + 110,
    bottom: 630,
    left: pinsBlock.offsetLeft + 110
  };

  mainPin.addEventListener('mousedown', function (e) {
    e.preventDefault();
    isDragged = true;
    inputAddress.value = (e.pageX + ', ' + e.pageY);
  });

  document.addEventListener('mouseup', function () {
    isDragged = false;
  });

  document.addEventListener('mousemove', function (e) {
    e.preventDefault();
    if (isDragged) {
      move(e);
      // console.log(e);
    }
  });

  function move(e) {
    var newLocation = {
      x: limits.left,
      y: limits.top
    };
    if (e.pageX > limits.right) {
      newLocation.x = limits.right;
    } else if (e.pageX > limits.left) {
      newLocation.x = e.pageX;
    }
    if (e.pageY > limits.bottom) {
      newLocation.y = limits.bottom;
    } else if (e.pageY > limits.top) {
      newLocation.y = e.pageY;
    }
    relocate(newLocation);
  }

  function relocate(newLocation) {
    mainPin.style.left = newLocation.x - 110 + 'px';
    mainPin.style.top = newLocation.y - 30 + 'px';
    inputAddress.value = (newLocation.x + ', ' + newLocation.y);
  }
})();



'use strict';

(function () {
  var mainPin = document.querySelector('.map__pin--main');
  var inputAddress = document.querySelector('#address');

  inputAddress.value = (410 + ', ' + 655);

  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoordinates = {
      x: evt.clientX,
      y: evt.clientY,
    };

    // var isDragged = false;

    function onMouseMove(moveEvt) {
      moveEvt.preventDefault();
      // isDragged = true;

      var shift = {
        x: startCoordinates.x - moveEvt.clientX,
        y: startCoordinates.y - moveEvt.clientY,
      };

      startCoordinates = {
        x: moveEvt.clientX,
        y: moveEvt.clientY,
      };

      var mainPinCoordinates = {
        x: mainPin.offsetTop - shift.y,
        y: mainPin.offsetLeft - shift.x,
      };

      var mainPinSize = {
        width: 65,
        height: 65,
      };

      var limits = {
        x: {
          min: 0,
          max: 1200
        },
        y: {
          min: 130,
          max: 630
        }
      };

      var limitShapes = {
        top: limits.y.min - mainPinSize.height,
        bottom: limits.y.max - mainPinSize.height,
        left: limits.x.min,
        right: limits.x.max - mainPinSize.width,
      };

      if (mainPinCoordinates.x > limitShapes.top && mainPinCoordinates.x < limitShapes.bottom) {
        mainPin.style.top = mainPinCoordinates.x + 'px';
      }
      if (mainPinCoordinates.y > limitShapes.left && mainPinCoordinates.y < limitShapes.right) {
        mainPin.style.left = mainPinCoordinates.y + 'px';
      }

      var pinTailCoordinates = {
        x: mainPinCoordinates.x + Math.floor(mainPinSize.width / 2),
        y: mainPinCoordinates.y + mainPinSize.height + 22,
      };
      inputAddress.value = (pinTailCoordinates.x + ', ' + pinTailCoordinates.y);
    }

    function onMouseUp(upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseMove);

      // if (isDragged) {
      //   function onClickPreventDefault(clickEvt) {
      //     clickEvt.preventDefault();
      //     mainPin.removeEventListener('click', onClickPreventDefault);
      //   }
      //   mainPin.addEventListener('click', onClickPreventDefault);
      // }
    }
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();

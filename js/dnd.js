'use strict';

(function () {
  var DEFAULT_INPUT_VALUE_ADDRESS = 410 + ', ' + 655;
  var MAIN_PIN_SIZE_WIDTH = 65;
  var MAIN_PIN_SIZE_HEIGHT = 65;
  var MAIN_PIN_HEIGHT_TAIL = 22;
  var DIVIDER = 2;
  var Limits = {
    Y: {
      MIN: 0,
      MAX: 1200,
    },
    X: {
      MIN: 130,
      MAX: 630,
    }
  };

  var mainPin = document.querySelector('.map__pin--main');
  var inputAddress = document.querySelector('#address');

  inputAddress.value = (DEFAULT_INPUT_VALUE_ADDRESS);

  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoordinates = {
      x: evt.clientX,
      y: evt.clientY,
    };

    function onMouseMove(moveEvt) {
      moveEvt.preventDefault();

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
        width: MAIN_PIN_SIZE_WIDTH,
        height: MAIN_PIN_SIZE_HEIGHT,
      };

      var limits = {
        x: {
          min: Limits.Y.MIN,
          max: Limits.Y.MAX,
        },
        y: {
          min: Limits.X.MIN,
          max: Limits.X.MAX,
        }
      };

      var limitShapes = {
        top: limits.y.min - mainPinSize.height / DIVIDER,
        bottom: limits.y.max - mainPinSize.height / DIVIDER,
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
        x: mainPinCoordinates.x + Math.floor(mainPinSize.width / DIVIDER),
        y: mainPinCoordinates.y + mainPinSize.height + MAIN_PIN_HEIGHT_TAIL,
      };
      inputAddress.value = (pinTailCoordinates.x + ', ' + pinTailCoordinates.y);
    }

    function onMouseUp(upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();

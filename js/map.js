'use strict';

(function () {
  var ENTER_KEY = 'Enter';

  var pinsBlock = document.querySelector('.map__pins');
  var mainPin = document.querySelector('.map__pin--main');
  var blockMap = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  var inputsOfAdFrom = document.querySelectorAll('.ad-form__element');
  var inputAddress = adForm.querySelector('#address');

  function activateWebsite() {
    blockMap.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    setEnabled(inputsOfAdFrom);
  }

  // function setDisabled(array) {
  //   for (var i = 0; i < array.length; i++) {
  //     array[i].disabled = true;
  //   }
  // }

  function setEnabled(array) {
    for (var i = 0; i < array.length; i++) {
      array[i].disabled = false;
    }
  }

  function getCoordinatesOnTheMap(e) {
    var x = pinsBlock.offsetWidth;
    var y = pinsBlock.offsetHeight;
    while (e) {
      x = x + parseFloat(e.offsetX);
      y = y + parseFloat(e.offsetY);
      e = e.offsetParent;
    }
    inputAddress.value = (x + ' ' + y);
    // return {x: Math.round(x), y: Math.round(y)};
  }

  mainPin.addEventListener('mousedown', function (e) {
    if (e.which === 1) {
      activateWebsite();
      getCoordinatesOnTheMap(e);
      window.renderPins();
    }
  }, {
    once: true
  });

  mainPin.addEventListener('keydown', function (e) {
    if (e.key === ENTER_KEY) {
      activateWebsite();
      window.renderPins();
    }
  }, {
    once: true
  });
})();

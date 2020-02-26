'use strict';

(function () {
  var ENTER_KEY = 'Enter';
  var mainPin = document.querySelector('.map__pin--main');
  var blockMap = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  var inputsOfAdFrom = document.querySelectorAll('.ad-form__element');

  window.activateWebsite = function () {
    blockMap.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    setEnabled(inputsOfAdFrom);
  };

  window.deactivateWebsite = function () {
    blockMap.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    setDisabled(inputsOfAdFrom);
  };

  function setDisabled(array) {
    for (var i = 0; i < array.length; i++) {
      array[i].disabled = true;
    }
  }

  function setEnabled(array) {
    for (var i = 0; i < array.length; i++) {
      array[i].disabled = false;
    }
  }

  mainPin.addEventListener('mouseup', function (e) {
    if (e.which === 1) {
      window.activateWebsite();
      window.updatesFilter();
    }
  }, {
    once: true
  });

  mainPin.addEventListener('keydown', function (e) {
    if (e.key === ENTER_KEY) {
      window.activateWebsite();
      window.updatesFilter();
    }
  }, {
    once: true
  });
})();

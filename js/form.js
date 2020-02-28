'use strict';

(function () {
  var ENTER_KEY = 'Enter';
  var adForm = document.querySelector('.ad-form');
  var inputsOfAdFrom = document.querySelectorAll('.ad-form__element');
  var typeOfAccomodation = adForm.querySelector('#type');
  var priceOfAccomodation = adForm.querySelector('#price');
  var timeIn = adForm.querySelector('#timein');
  var timeOut = adForm.querySelector('#timeout');
  var numberOfRooms = adForm.querySelector('#room_number');
  var capacityOfRooms = adForm.querySelector('#capacity');
  var resetBtn = adForm.querySelector('.ad-form__reset');
  var mainPin = document.querySelector('.map__pin--main');

  function checkNumberOfRooms(e) {
    if (e.target.value === '1') {
      capacityOfRooms.value = 1;
      capacityOfRooms.querySelectorAll('option')[0].disabled = true;
      capacityOfRooms.querySelectorAll('option')[1].disabled = true;
      capacityOfRooms.querySelectorAll('option')[2].disabled = false;
      capacityOfRooms.querySelectorAll('option')[3].disabled = true;
    } else if (e.target.value === '2') {
      capacityOfRooms.value = 2;
      capacityOfRooms.value = 1;
      capacityOfRooms.querySelectorAll('option')[0].disabled = true;
      capacityOfRooms.querySelectorAll('option')[1].disabled = false;
      capacityOfRooms.querySelectorAll('option')[2].disabled = false;
      capacityOfRooms.querySelectorAll('option')[3].disabled = true;
    } else if (e.target.value === '3') {
      capacityOfRooms.value = 3;
      capacityOfRooms.value = 2;
      capacityOfRooms.value = 1;
      capacityOfRooms.querySelectorAll('option')[0].disabled = false;
      capacityOfRooms.querySelectorAll('option')[1].disabled = false;
      capacityOfRooms.querySelectorAll('option')[2].disabled = false;
      capacityOfRooms.querySelectorAll('option')[3].disabled = true;
    } else if (e.target.value === '100') {
      capacityOfRooms.value = 0;
      capacityOfRooms.querySelectorAll('option')[0].disabled = true;
      capacityOfRooms.querySelectorAll('option')[1].disabled = true;
      capacityOfRooms.querySelectorAll('option')[2].disabled = true;
      capacityOfRooms.querySelectorAll('option')[3].disabled = false;
    }
  }

  function checkCapacityOfRooms(e) {
    if (e.target.value === '1') {
      numberOfRooms.value = 1;
    } else if (e.target.value === '2') {
      numberOfRooms.value = 2;
    } else if (e.target.value === '3') {
      numberOfRooms.value = 3;
    } else if (e.target.value === '0') {
      numberOfRooms.value = 100;
    }
  }

  function checkTimeIn(e) {
    if (e.target.value === '12:00') {
      timeOut.value = '12:00';
    } else if (e.target.value === '13:00') {
      timeOut.value = '13:00';
    } else if (e.target.value === '14:00') {
      timeOut.value = '14:00';
    }
  }

  function checkTimeOut(e) {
    if (e.target.value === '12:00') {
      timeIn.value = '12:00';
    } else if (e.target.value === '13:00') {
      timeIn.value = '13:00';
    } else if (e.target.value === '14:00') {
      timeIn.value = '14:00';
    }
  }

  function checkValidityOfInputs(e) {
    if (e.target.value === 'bungalo') {
      priceOfAccomodation.placeholder = 0;
      priceOfAccomodation.min = 0;
    } else if (e.target.value === 'flat') {
      priceOfAccomodation.placeholder = 1000;
      priceOfAccomodation.min = 1000;
    } else if (e.target.value === 'house') {
      priceOfAccomodation.placeholder = 5000;
      priceOfAccomodation.min = 5000;
    } else if (e.target.value === 'palace') {
      priceOfAccomodation.placeholder = 10000;
      priceOfAccomodation.min = 10000;
    }
  }

  function resetForm() {
    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    var card = document.querySelector('.map__card');

    adForm.reset();
    window.deactivateWebsite();
    mainPin.style = 'left: ' + 570 + 'px; top: ' + 375 + 'px';
    if (card) {
      card.remove();
    }
    pins.forEach(function (i) {
      i.remove();
    });

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
  }

  window.setDisabled = function (array) {
    for (var i = 0; i < array.length; i++) {
      array[i].disabled = true;
    }
  };

  resetBtn.addEventListener('click', function () {
    resetForm();
  });

  typeOfAccomodation.addEventListener('change', function (e) {
    checkValidityOfInputs(e);
  });

  timeIn.addEventListener('change', function (e) {
    checkTimeIn(e);
  });

  timeOut.addEventListener('change', function (e) {
    checkTimeOut(e);
  });

  numberOfRooms.addEventListener('change', function (e) {
    checkNumberOfRooms(e);
  });

  capacityOfRooms.addEventListener('change', function (e) {
    checkCapacityOfRooms(e);
  });

  window.setDisabled(inputsOfAdFrom);
})();

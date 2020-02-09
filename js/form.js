'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');
  var inputsOfAdFrom = document.querySelectorAll('.ad-form__element');
  // var inputAddress = adForm.querySelector('#address');
  var typeOfAccomodation = adForm.querySelector('#type');
  var priceOfAccomodation = adForm.querySelector('#price');
  var timeIn = adForm.querySelector('#timein');
  var timeOut = adForm.querySelector('#timeout');
  var numberOfRooms = adForm.querySelector('#room_number');
  var capacityOfRooms = adForm.querySelector('#capacity');

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
      // capacityOfRooms.value = 1;
    } else if (e.target.value === '3') {
      numberOfRooms.value = 3;
      // capacityOfRooms.value = 2;
      // capacityOfRooms.value = 1;
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

  function setDisabled(array) {
    for (var i = 0; i < array.length; i++) {
      array[i].disabled = true;
    }
  }

  // function setEnabled(array) {
  //   for (var i = 0; i < array.length; i++) {
  //     array[i].disabled = false;
  //   }
  // }

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

  setDisabled(inputsOfAdFrom);
})();

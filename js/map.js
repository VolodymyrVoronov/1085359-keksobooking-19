'use strict';

(function () {
  var ENTER_KEY = 'Enter';

  var mainPin = document.querySelector('.map__pin--main');
  var blockMap = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  var inputsOfAdFrom = document.querySelectorAll('.ad-form__element');
  var priceOfAccommodation = adForm.querySelector('#price');
  var filters = document.querySelector('.map__filters');
  var filterOfTypeOfAccommodation = filters.querySelector('#housing-type');
  var filterPriceOfAccommodation = filters.querySelector('#housing-price');
  var filterAmountOfRoomsOfAccommodation = filters.querySelector('#housing-rooms');
  var filterAmountOfGuestsOfAccommodation = filters.querySelector('#housing-guests');
  var filterFeaturesOfAccommodation = filters.querySelector('#housing-features').querySelectorAll('input');

  function setValue(proretry) {
    proretry.value = 'any';
  }

  function resetAllFilters() {
    setValue(filterOfTypeOfAccommodation);
    setValue(filterPriceOfAccommodation);
    setValue(filterAmountOfRoomsOfAccommodation);
    setValue(filterAmountOfGuestsOfAccommodation);
    filterFeaturesOfAccommodation.forEach(function (element) {
      element.checked = false;
    });
  }

  function onFilterChange() {
    var pinElements = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    for (var i = 0; i < pinElements.length; i++) {
      pinElements[i].remove();
    }
    window.removeCards();
    window.redrawPins();
  }

  function onSubmitBtnClick(evt) {
    evt.preventDefault();
    window.save(adForm, window.successHandler, window.errorHandler);
  }

  window.activateWebsite = function () {
    blockMap.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    setEnabled(inputsOfAdFrom);
    adForm.addEventListener('submit', onSubmitBtnClick);
    filters.addEventListener('change', onFilterChange);
    window.load(window.loadTheAds, window.errorHandler);
    priceOfAccommodation.min = 1000;
  };

  window.deactivateWebsite = function () {
    blockMap.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    adForm.removeEventListener('submit', onSubmitBtnClick);
    setDisabled(inputsOfAdFrom);
    filters.removeEventListener('change', onFilterChange);
    resetAllFilters();
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

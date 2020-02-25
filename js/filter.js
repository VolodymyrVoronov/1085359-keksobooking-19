'use strict';

var DEBOUNCE_INTERVAL = 500;

var ads = [];

var filters = document.querySelector('.map__filters');
var filterOfTypeOfAccommodation = filters.querySelector('#housing-type');
var filterPriceOfAccommodation = filters.querySelector('#housing-price');
var filterAmountOfRoomsOfAccommodation = filters.querySelector('#housing-rooms');
var filterAmountOfGuestsOfAccommodation = filters.querySelector('#housing-guests');
var filterFeaturesOfAccommodation = filters.querySelector('#housing-features');

function loadTheAds(data) {
  ads = data;
}

window.updatesFilter = function () {
  var typeOfAccommodation;

  function selectTypeOfAccommodation(type) {
    if (filterOfTypeOfAccommodation.value !== 'any') {
      typeOfAccommodation = ads.filter(function (i) {
        return i.offer.type === type;
      });
      return typeOfAccommodation;
    } else {
      return ads;
    }
  }

  var filteredTypeOfAccommodation = selectTypeOfAccommodation(filterOfTypeOfAccommodation.value);

  function selectPriceOfAccommodation() {
    var priceOfAccommodation = filteredTypeOfAccommodation;
    if (filterPriceOfAccommodation.value === 'any') {
      return priceOfAccommodation;
    } else {
      return priceOfAccommodation.filter(function (i) {
        if ((filterPriceOfAccommodation.value === 'middle') &&
          (i.offer.price >= 10000 && i.offer.price <= 50000)) {
          return i.offer.price;
        }
        if ((filterPriceOfAccommodation.value === 'low') &&
          (i.offer.price <= 10000)) {
          return i.offer.price;
        }
        if ((filterPriceOfAccommodation.value === 'high') &&
          (i.offer.price >= 50000)) {
          return i.offer.price;
        }
      });
    }
  }

  var filteredPriceOfAccommodation = selectPriceOfAccommodation(filterPriceOfAccommodation.value);

  function selectAumoutOfRoomsOfAccommodation() {
    var amountOfRoomsOfAccommodation = filteredPriceOfAccommodation;
    if (filterAmountOfRoomsOfAccommodation.value === 'any') {
      return amountOfRoomsOfAccommodation;
    } else {
      return amountOfRoomsOfAccommodation.filter(function (i) {
        if ((filterAmountOfRoomsOfAccommodation.value === '1') &&
          (i.offer.rooms === 1)) {
          return i.offer.rooms;
        }
        if ((filterAmountOfRoomsOfAccommodation.value === '2') &&
          (i.offer.rooms === 2)) {
          return i.offer.rooms;
        }
        if ((filterAmountOfRoomsOfAccommodation.value === '3') &&
          (i.offer.rooms === 3)) {
          return i.offer.rooms;
        }
      });
    }
  }

  var filteredAmoutOfRoomsOfAccommodation = selectAumoutOfRoomsOfAccommodation(filterAmountOfRoomsOfAccommodation.value);

  function selectAumoutOfGuestsOfAccommodation() {
    var amountOfGuestsOfAccommodation = filteredAmoutOfRoomsOfAccommodation;
    if (filterAmountOfGuestsOfAccommodation.value === 'any') {
      return amountOfGuestsOfAccommodation;
    } else {
      return amountOfGuestsOfAccommodation.filter(function (i) {
        if ((filterAmountOfGuestsOfAccommodation.value === '1') &&
          (i.offer.guests === 1)) {
          return i.offer.guests;
        }
        if ((filterAmountOfGuestsOfAccommodation.value === '2') &&
          (i.offer.guests === 2)) {
          return i.offer.guests;
        }
        if ((filterAmountOfGuestsOfAccommodation.value === '0') &&
          (i.offer.guests === 0)) {
          return i.offer.guests;
        }
      });
    }
  }

  var filteredAmoutOfGuestsOfAccommodation = selectAumoutOfGuestsOfAccommodation(filterAmountOfGuestsOfAccommodation.value);

  function selectFeaturesOfAccommodation() {
    var featuresOfAccommodation = filteredAmoutOfGuestsOfAccommodation;
    var checkedFeaturesItems = filterFeaturesOfAccommodation.querySelectorAll('input:checked');
    if (!checkedFeaturesItems) {
      return featuresOfAccommodation;
    } else {
      return featuresOfAccommodation.filter(function (i) {
        return Array.from(checkedFeaturesItems).every(function (element) {
          return i.offer.features.includes(element.value);
        });
      });
    }
  }

  var filteredFraturesOfAccommodation = selectFeaturesOfAccommodation(filterFeaturesOfAccommodation);

  window.renderPins(filteredFraturesOfAccommodation.slice(0, 5));
};

window.load(loadTheAds, window.errorHandler);

filters.addEventListener('change', function () {
  var pinElements = document.querySelectorAll('.map__pin:not(.map__pin--main)');
  for (var i = 0; i < pinElements.length; i++) {
    pinElements[i].remove();
  }

  var lastTimeout;
  if (lastTimeout) {
    window.clearTimeout(lastTimeout);
  }
  lastTimeout = window.setTimeout(function () {
    window.updatesFilter();
  }, DEBOUNCE_INTERVAL);

});


'use strict';

var DEBOUNCE_INTERVAL = 500;

var chosenPrice = {
  LOW: {
    MIN: 0,
    MAX: 10000
  },
  MIDDLE: {
    MIN: 10000,
    MAX: 50000
  },
  HIGH: {
    MIN: 50000,
    MAX: Infinity
  }
};

var ads = [];
var filteredData = [];

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

  function filtrateItem(property, item, key) {
    if (property.value === 'any') {
      return property.value;
    } else {
      return property.value === item[key].toString();
    }
  }

  function filtrateTypeOfAccommodation(item) {
    return filtrateItem(filterOfTypeOfAccommodation, item.offer, 'type');
  }

  function filtratePriceOfAccommodation(item) {
    var selectedPrice = chosenPrice[filterPriceOfAccommodation.value.toUpperCase()];
    if (selectedPrice) {
      return item.offer.price >= selectedPrice.MIN && item.offer.price <= selectedPrice.MAX;
    } else {
      return item.offer.price;
    }
  }

  function filtrateAmountOfRoomsOfAccommodation(item) {
    return filtrateItem(filterAmountOfRoomsOfAccommodation, item.offer, 'rooms');
  }

  function filtrateAmountOfGuestsOfAccommodation(item) {
    return filtrateItem(filterAmountOfGuestsOfAccommodation, item.offer, 'guests');
  }

  function filtrateFeuaturesOfAccommodation(item) {
    var checkedFeaturesItems = filterFeaturesOfAccommodation.querySelectorAll('input:checked');
    return Array.from(checkedFeaturesItems).every(function (element) {
      return item.offer.features.includes(element.value);
    });
  }

  filteredData = ads.slice(0);
  filteredData = filteredData.filter(filtrateTypeOfAccommodation).filter(filtratePriceOfAccommodation).filter(filtrateAmountOfRoomsOfAccommodation).filter(filtrateAmountOfGuestsOfAccommodation).filter(filtrateFeuaturesOfAccommodation);

  window.renderPins(filteredData.slice(0, 5));
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

  window.removeCards();
});


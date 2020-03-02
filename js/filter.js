'use strict';

(function () {
  var MAX_AMOUNT_OF_OFFERS = 5;

  var ChosenPrice = {
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

  window.redrawPins = window.debounce(function () {
    window.updatesFilter();
  });

  window.loadTheAds = function (data) {
    ads = data;
    window.renderPins(ads.slice(0, 5));
  };

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
      var selectedPrice = ChosenPrice[filterPriceOfAccommodation.value.toUpperCase()];
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

    filteredData = filteredData.filter(function (param) {
      return filtrateTypeOfAccommodation(param) &&
      filtratePriceOfAccommodation(param) &&
      filtrateAmountOfRoomsOfAccommodation(param) &&
      filtrateAmountOfGuestsOfAccommodation(param) &&
      filtrateFeuaturesOfAccommodation(param);
    });

    window.renderPins(filteredData.slice(0, MAX_AMOUNT_OF_OFFERS));
  };
})();

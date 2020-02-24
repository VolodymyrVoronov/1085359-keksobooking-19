'use strict';

var ads = [];

var filterOfTypeOfAccomodation = document.querySelector('.map__filter');

function loadTheAds(data) {
  ads = data;
}

window.updatesFilter = function () {
  var typeOfAccomodation;
  if (filterOfTypeOfAccomodation.value === 'any') {
    typeOfAccomodation = ads.slice(0, 5).filter(function (i) {
      return i.offer.type === 'bungalo'
      || i.offer.type === 'palace'
      || i.offer.type === 'flat'
      || i.offer.type === 'house';
    });
  }
  if (filterOfTypeOfAccomodation.value === 'palace') {
    typeOfAccomodation = ads.filter(function (i) {
      return i.offer.type === 'palace';
    });
  }
  if (filterOfTypeOfAccomodation.value === 'flat') {
    typeOfAccomodation = ads.filter(function (i) {
      return i.offer.type === 'flat';
    });
  }
  if (filterOfTypeOfAccomodation.value === 'house') {
    typeOfAccomodation = ads.filter(function (i) {
      return i.offer.type === 'house';
    });
  }
  if (filterOfTypeOfAccomodation.value === 'bungalo') {
    typeOfAccomodation = ads.filter(function (i) {
      return i.offer.type === 'bungalo';
    });
  }
  var filteredTypeOfAccomodation = typeOfAccomodation;

  window.renderPins(filteredTypeOfAccomodation);
};

window.load(loadTheAds, window.errorHandler);

filterOfTypeOfAccomodation.addEventListener('change', function () {
  var pinElements = document.querySelectorAll('.map__pin:not(.map__pin--main)');
  for (var i = 0; i < pinElements.length; i++) {
    pinElements[i].remove();
  }
  window.updatesFilter();
});


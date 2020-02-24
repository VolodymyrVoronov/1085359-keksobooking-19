'use strict';

var ads = [];

var filterOfTypeOfAccomodation = document.querySelector('.map__filter');

function loadTheAds(data) {
  ads = data;
}

window.updatesFilter = function () {
  var typeOfAccomodation;

  function selectTypeOfAccomodation(type) {
    if (filterOfTypeOfAccomodation.value !== 'any') {
      typeOfAccomodation = ads.filter(function (i) {
        return i.offer.type === type;
      });
      return typeOfAccomodation.slice(0, 5);
    } else {
      return ads.slice(0, 5);
    }
  }

  var filteredTypeOfAccomodation = selectTypeOfAccomodation(filterOfTypeOfAccomodation.value);

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


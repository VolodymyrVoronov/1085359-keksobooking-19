'use strict';

(function () {
  function renderPin(offer) {
    // var pinsBlock = document.querySelector('.map__pins');
    var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
    var pinEl = pinTemplate.cloneNode(true);

    pinEl.style = 'left: ' + offer.location.x + 'px; top: ' + offer.location.y + 'px';
    pinEl.querySelector('img').src = offer.author.avatar;
    pinEl.querySelector('img').alt = offer.offer.title;
    return pinEl;
  }

  window.renderPins = function () {
    var pinsBlock = document.querySelector('.map__pins');
    var fragmentPins = document.createDocumentFragment();
    for (var i = 0; i < window.offers.length; i++) {
      var renderP = renderPin(window.offers[i]);
      fragmentPins.appendChild(renderP);
    }
    pinsBlock.appendChild(fragmentPins);
    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    pins.forEach(function (element, index) {
      element.addEventListener('click', function () {
        var isElement = document.querySelector('.map__card');
        if (isElement) {
          isElement.remove();
        }
        window.renderCards(window.offers[index]);
        window.mountedCard();
      });
    });
  };
})();

'use strict';

(function () {
  function renderPin(pin) {
    // var pinsBlock = document.querySelector('.map__pins');
    var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
    var pinEl = pinTemplate.cloneNode(true);

    pinEl.style = 'left: ' + pin.location.x + 'px; top: ' + pin.location.y + 'px';
    pinEl.querySelector('img').src = pin.author.avatar;
    pinEl.querySelector('img').alt = pin.offer.title;
    return pinEl;
  }

  window.renderPins = function (pins) {
    var pinsBlock = document.querySelector('.map__pins');
    var fragmentPins = document.createDocumentFragment();
    for (var i = 0; i < pins.length; i++) {
      var renderElement = renderPin(pins[i]);
      fragmentPins.appendChild(renderElement);
    }
    pinsBlock.appendChild(fragmentPins);
    var pinElements = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    pinElements.forEach(function (element, index) {
      element.addEventListener('click', function () {
        var isElement = document.querySelector('.map__card');
        if (isElement) {
          isElement.remove();
        }
        window.renderCards(pins[index]);
        window.mountedCard();
      });
    });
  };
})();

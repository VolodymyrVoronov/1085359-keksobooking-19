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

  window.renderPins = function (datas) {
    var pinsBlock = document.querySelector('.map__pins');
    var fragmentPins = document.createDocumentFragment();
    for (var i = 0; i < datas.length; i++) {
      var renderElement = renderPin(datas[i]);
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
        window.renderCards(datas[index]);
        window.mountedCard();
      });
    });
  };
})();

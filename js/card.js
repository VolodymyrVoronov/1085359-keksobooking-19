'use strict';

(function () {
  var ESC_KEY = 'Escape';
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var pinsBlock = document.querySelector('.map__pins');

  function renderElements(features, container) {
    container.textContent = '';
    var fragment = document.createDocumentFragment();
    var elementFeature = document.createElement('li');
    elementFeature.classList.add('popup__feature');
    for (var i = 0; i < features.length; i++) {
      var cloneElement = elementFeature.cloneNode(true);
      var classModif = 'popup__feature--' + features[i];
      cloneElement.classList.add(classModif);
      fragment.appendChild(cloneElement);
    }
    container.appendChild(fragment);
  }

  function renderPhotos(photos, container, elementOfImage) {
    container.textContent = '';
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < photos.length; i++) {
      var newElement = elementOfImage.cloneNode(true);
      newElement.src = photos[i];
      fragment.appendChild(newElement);
    }
    container.appendChild(fragment);
  }

  function renderCard(map) {
    var mapEl = cardTemplate.cloneNode(true);
    var photosContainer = mapEl.querySelector('.popup__photos');
    var photoContainer = mapEl.querySelector('.popup__photos').querySelector('.popup__photo');
    mapEl.querySelector('.popup__avatar').src = map.author.avatar;
    mapEl.querySelector('.popup__title').textContent = map.offer.title;
    mapEl.querySelector('.popup__text--address').textContent = map.offer.address;
    mapEl.querySelector('.popup__text--price').textContent = map.offer.price + '₽/ночь';
    mapEl.querySelector('.popup__type').textContent = map.offer.type;
    mapEl.querySelector('.popup__text--capacity').textContent = map.offer.rooms + ' комнаты для ' + map.offer.guests + ' гостей';
    mapEl.querySelector('.popup__text--time').textContent = 'Заезд после ' + map.offer.checkin + ', выезд до ' + map.offer.checkout;
    renderElements(map.offer.features, mapEl.querySelector('.popup__features'));
    mapEl.querySelector('.popup__description').textContent = map.offer.discription;
    renderPhotos(map.offer.photos, photosContainer, photoContainer);

    return mapEl;
  }

  window.renderCards = function (offer) {
    var renderCardElement = renderCard(offer);
    var fragment = document.createDocumentFragment();
    fragment.appendChild(renderCardElement);
    pinsBlock.appendChild(fragment);
  };

  window.mountedCard = function () {
    var card = document.querySelector('.map__card');
    var closeAdPopup = card.querySelector('.popup__close');
    closeAdPopup.addEventListener('click', function () {
      card.remove();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === ESC_KEY) {
        card.remove();
      }
    });
  };
})();

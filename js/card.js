'use strict';

(function () {
  var typeOfAccommodation = {
    palace: 'Дворец',
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало'
  };
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var pinsBlock = document.querySelector('.map__pins');

  function renderElements(features, container) {
    container.textContent = '';
    var fragment = document.createDocumentFragment();
    var elementFeature = document.createElement('li');
    elementFeature.classList.add('popup__feature');
    features.forEach(function (element) {
      var cloneElement = elementFeature.cloneNode(true);
      var classModifier = 'popup__feature--' + element;
      cloneElement.classList.add(classModifier);
      fragment.appendChild(cloneElement);
    });
    container.appendChild(fragment);
  }

  function renderPhotos(photos, container, elementOfImage) {
    container.textContent = '';
    var fragment = document.createDocumentFragment();
    photos.forEach(function (element) {
      var newElement = elementOfImage.cloneNode(true);
      newElement.src = element;
      fragment.appendChild(newElement);
    });
    container.appendChild(fragment);
  }

  function renderCard(data) {
    var mapEl = cardTemplate.cloneNode(true);
    var photosContainer = mapEl.querySelector('.popup__photos');
    var photoContainer = mapEl.querySelector('.popup__photos').querySelector('.popup__photo');
    mapEl.querySelector('.popup__avatar').src = data.author.avatar;
    mapEl.querySelector('.popup__title').textContent = data.offer.title;
    mapEl.querySelector('.popup__text--address').textContent = data.offer.address;
    mapEl.querySelector('.popup__text--price').textContent = data.offer.price + '₽/ночь';

    if (data.offer.type === 'palace') {
      mapEl.querySelector('.popup__type').textContent = typeOfAccommodation.palace;
    } else if (data.offer.type === 'flat') {
      mapEl.querySelector('.popup__type').textContent = typeOfAccommodation.flat;
    } else if (data.offer.type === 'house') {
      mapEl.querySelector('.popup__type').textContent = typeOfAccommodation.house;
    } else if (data.offer.type === 'bungalo') {
      mapEl.querySelector('.popup__type').textContent = typeOfAccommodation.bungalo;
    }

    mapEl.querySelector('.popup__text--capacity').textContent = data.offer.rooms + ' комнаты для ' + data.offer.guests + ' гостей';
    mapEl.querySelector('.popup__text--time').textContent = 'Заезд после ' + data.offer.checkin + ', выезд до ' + data.offer.checkout;
    renderElements(data.offer.features, mapEl.querySelector('.popup__features'));
    mapEl.querySelector('.popup__description').textContent = data.offer.discription;
    renderPhotos(data.offer.photos, photosContainer, photoContainer);

    return mapEl;
  }

  window.renderCards = function (datas) {
    var renderCardElement = renderCard(datas);
    var fragment = document.createDocumentFragment();
    fragment.appendChild(renderCardElement);
    pinsBlock.appendChild(fragment);
  };

  window.checkIfIsThereAClass = function () {
    var hasClass = document.querySelector('.map__pin--active');
    if (hasClass) {
      hasClass.classList.remove('map__pin--active');
    }
  };

  window.mountedCard = function () {
    var cardElement = document.querySelector('.map__card');
    var closeAdPopup = cardElement.querySelector('.popup__close');

    function onClosePopupKeydown(e) {
      if (e.key === window.utils.ESC_KEY) {
        document.removeEventListener('keydown', onClosePopupKeydown);
        cardElement.remove();
        window.checkIfIsThereAClass();
      }
    }

    closeAdPopup.addEventListener('click', function () {
      document.removeEventListener('keydown', onClosePopupKeydown);
      cardElement.remove();
      window.checkIfIsThereAClass();
    }, {once: true});
    document.addEventListener('keydown', onClosePopupKeydown);
  };
})();

'use strict';

var AVATAR_OF_AUTHORS = createArrOfAvatars(8);
var TITLES = ['Супер предложение', 'Такого вы ещё не видели', 'Лучше, чем сейчас не будет', 'Только попробуй не снять', 'И боги хотели бы тут жить'];
var ADDRESS = ['4 Hayabusachō, Chiyoda City, Tōkyō-to 102-0092', '1-chōme-1 Nagatachō, Chiyoda City, Tōkyō-to 100-0014', 'Sotobori-dori Ave, 2-chōme-7 Yaesu, Chuo City, Tōkyō-to 104-0028', '1-chōme-4 Shinkawa, Chuo City, Tōkyō-to 104-0033', '2-chōme-11 Saga, Koto City, Tōkyō-to 135-0031'];
var PRICES = [5000, 6000, 7000, 10000, 50000];
var TYPES_OF_ACCOMODATIONS = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalo: 'Бунгало'
};
var TYPES = [TYPES_OF_ACCOMODATIONS.palace, TYPES_OF_ACCOMODATIONS.flat, TYPES_OF_ACCOMODATIONS.house, TYPES_OF_ACCOMODATIONS.bungalo];
var AMOUNT_OF_ROOMS = [1, 2, 3];
var AMOUNT_OF_GUESTS = [1, 2];
var CHECKINS = ['12:00', '13:00', '14:00'];
var CHECKOUTS = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var DESCS = ['Лучшее место и место, где свершается обладание и проявляет себя силой помысла, — все это дан пример, т. е. в своей непосредственности проявление видимого органа маги. Особенно показателен тут пример звукового созерцания. Звук — это наиболее сильное из проявлений духовного ощущения...', 'Лучшее место? По уставу это никого не касается. В компьютерную игру дело не идет. Только для психотерапевта обязательно. На второй уровень не пускали. Выпускный класс прошли? Ага. Десять встреч в неделю. И получили испытательный сертификат. Запишите. Про три месяца. Отношение ко мне серьезное.', 'Тот самый отель и сейчас стоял в том же самом номере, из окна которого он тогда смотрел на сидящего за круглым столом худого человечка с трубкой во рту. Вдруг он вспомнил: в последний раз во дворе отеля тот говорил что-то о мудром Петре Великом.'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var OBJECTS_AMOUNT = 8;

var pinsBlock = document.querySelector('.map__pins');
var blockMap = document.querySelector('.map');
blockMap.classList.remove('map--faded');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
var offers = [];


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

function getRandomItem(array) {
  return Math.floor(Math.random() * array.length);
}

function getRandomItems(array) {
  var newArray = [];
  for (var i = 0; i < array.length; i++) {
    var randomPush = Math.round(Math.random());
    if (randomPush) {
      newArray.push(array[i]);
    }
  }
  return newArray;
}

function getRandomFromTo(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createArrOfAvatars(number) {
  var ArrOfAvatars = [];

  for (var i = 0; i < number; i++) {
    ArrOfAvatars[i] = 'img/avatars/user0' + (i + 1) + '.png';
  }
  return ArrOfAvatars;
}

function pullRandomOffer() {
  return {
    author: {
      avatar: AVATAR_OF_AUTHORS[getRandomItem(AVATAR_OF_AUTHORS)],
    },

    offer: {
      title: TITLES[getRandomItem(TITLES)],
      address: ADDRESS[getRandomItem(ADDRESS)],
      price: PRICES[getRandomItem(PRICES)],
      type: TYPES[getRandomItem(TYPES)],
      rooms: AMOUNT_OF_ROOMS[getRandomItem(AMOUNT_OF_ROOMS)],
      guests: AMOUNT_OF_GUESTS[getRandomItem(AMOUNT_OF_GUESTS)],
      checkin: CHECKINS[getRandomItem(CHECKINS)],
      checkout: CHECKOUTS[getRandomItem(CHECKOUTS)],
      features: getRandomItems(FEATURES),
      discription: DESCS[getRandomItem(DESCS)],
      photos: getRandomItems(PHOTOS),
    },

    location: {
      x: getRandomFromTo(40, pinsBlock.clientWidth - 40),
      y: getRandomFromTo(130, 630),
    },
  };
}

function createObj(numbers) {
  for (var i = 0; i < numbers; i++) {
    offers.push(pullRandomOffer());
  }
}

function renderPin(offer) {
  var pinEl = pinTemplate.cloneNode(true);

  pinEl.style = 'left: ' + offer.location.x + 'px; top: ' + offer.location.y + 'px';
  pinEl.querySelector('img').src = offer.author.avatar;
  pinEl.querySelector('img').alt = offer.offer.title;
  return pinEl;
}

function renderCard(map) {
  var mapEl = cardTemplate.cloneNode(true);
  var photosContainer = mapEl.querySelector('.popup__photos');
  var photoContainer = mapEl.querySelector('.popup__photos').querySelector('.popup__photo');

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

function renderPins() {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < offers.length; i++) {
    fragment.appendChild(renderPin(offers[i]));
  }
  pinsBlock.appendChild(fragment);
}

function renderCards() {
  var fragment = document.createDocumentFragment();
  fragment.appendChild(renderCard(offers[0]));
  pinsBlock.appendChild(fragment);
}

createObj(OBJECTS_AMOUNT);
renderPins();
renderCards();

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
var ESC_KEY = 'Escape';
var ENTER_KEY = 'Enter';

var pinsBlock = document.querySelector('.map__pins');
var blockMap = document.querySelector('.map');
var mainPin = document.querySelector('.map__pin--main');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
var offers = [];
var adForm = document.querySelector('.ad-form');
var inputsOfAdFrom = document.querySelectorAll('.ad-form__element');
var inputAddress = adForm.querySelector('#address');
var typeOfAccomodation = adForm.querySelector('#type');
var priceOfAccomodation = adForm.querySelector('#price');
var timeIn = adForm.querySelector('#timein');
var timeOut = adForm.querySelector('#timeout');
var numberOfRooms = adForm.querySelector('#room_number');
var capacityOfRooms = adForm.querySelector('#capacity');

function checkNumberOfRooms(e) {
  if (e.target.value === '1') {
    capacityOfRooms.value = 1;
    capacityOfRooms.querySelectorAll('option')[0].disabled = true;
    capacityOfRooms.querySelectorAll('option')[1].disabled = true;
    capacityOfRooms.querySelectorAll('option')[2].disabled = false;
    capacityOfRooms.querySelectorAll('option')[3].disabled = true;
  } else if (e.target.value === '2') {
    capacityOfRooms.value = 2;
    capacityOfRooms.value = 1;
    capacityOfRooms.querySelectorAll('option')[0].disabled = true;
    capacityOfRooms.querySelectorAll('option')[1].disabled = false;
    capacityOfRooms.querySelectorAll('option')[2].disabled = false;
    capacityOfRooms.querySelectorAll('option')[3].disabled = true;
  } else if (e.target.value === '3') {
    capacityOfRooms.value = 3;
    capacityOfRooms.value = 2;
    capacityOfRooms.value = 1;
    capacityOfRooms.querySelectorAll('option')[0].disabled = false;
    capacityOfRooms.querySelectorAll('option')[1].disabled = false;
    capacityOfRooms.querySelectorAll('option')[2].disabled = false;
    capacityOfRooms.querySelectorAll('option')[3].disabled = true;
  } else if (e.target.value === '100') {
    capacityOfRooms.value = 0;
    capacityOfRooms.querySelectorAll('option')[0].disabled = true;
    capacityOfRooms.querySelectorAll('option')[1].disabled = true;
    capacityOfRooms.querySelectorAll('option')[2].disabled = true;
    capacityOfRooms.querySelectorAll('option')[3].disabled = false;
  }
}

function checkCapacityOfRooms(e) {
  if (e.target.value === '1') {
    numberOfRooms.value = 1;
  } else if (e.target.value === '2') {
    numberOfRooms.value = 2;
    // capacityOfRooms.value = 1;
  } else if (e.target.value === '3') {
    numberOfRooms.value = 3;
    // capacityOfRooms.value = 2;
    // capacityOfRooms.value = 1;
  } else if (e.target.value === '0') {
    numberOfRooms.value = 100;
  }
}


function checkTimeIn(e) {
  if (e.target.value === '12:00') {
    timeOut.value = '12:00';
  } else if (e.target.value === '13:00') {
    timeOut.value = '13:00';
  } else if (e.target.value === '14:00') {
    timeOut.value = '14:00';
  }
}

function checkTimeOut(e) {
  if (e.target.value === '12:00') {
    timeIn.value = '12:00';
  } else if (e.target.value === '13:00') {
    timeIn.value = '13:00';
  } else if (e.target.value === '14:00') {
    timeIn.value = '14:00';
  }
}


function checkValidityOfInputs(e) {
  if (e.target.value === 'bungalo') {
    priceOfAccomodation.placeholder = 0;
  } else if (e.target.value === 'flat') {
    priceOfAccomodation.placeholder = 1000;
  } else if (e.target.value === 'house') {
    priceOfAccomodation.placeholder = 5000;
  } else if (e.target.value === 'palace') {
    priceOfAccomodation.placeholder = 10000;
  }
}

function setDisabled(array) {
  for (var i = 0; i < array.length; i++) {
    array[i].disabled = true;
  }
}

function setEnabled(array) {
  for (var i = 0; i < array.length; i++) {
    array[i].disabled = false;
  }
}

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
      x: getRandomFromTo(20, pinsBlock.clientWidth - 20),
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

function activateWebsite() {
  blockMap.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  setEnabled(inputsOfAdFrom);
}

// function onMainPinPress(e) {
//   if (e.key === ENTER_KEY) {
//     activateWebsite();
//   }
// }

function showCardViaClickOnPin() {
  renderCards();
  var closeAdPopup = pinsBlock.querySelector('.popup__close');
  var adPopups = pinsBlock.querySelectorAll('.map__card');
  for (var i = 0; i < adPopups.length; i++) {
    var elemet = adPopups[i];
    closeAdPopup.addEventListener('click', function (e) {
      elemet.remove();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === ESC_KEY) {
        elemet.remove();
      }
    });
  }
}

function getCoordinatesOnTheMap(e) {
  var x = pinsBlock.offsetWidth;
  var y = pinsBlock.offsetHeight;
  while (e) {
    x = x + parseFloat(e.offsetX);
    y = y + parseFloat(e.offsetY);
    e = e.offsetParent;
  }
  inputAddress.value = (x + ' ' + y);
  // return {x: Math.round(x), y: Math.round(y)};
}

setDisabled(inputsOfAdFrom);
createObj(OBJECTS_AMOUNT);

mainPin.addEventListener('mousedown', function (e) {
  if (e.which === 1) {
    activateWebsite();
    getCoordinatesOnTheMap(e);
    renderPins();
    // renderCards();
  
  var mapPins = pinsBlock.querySelectorAll('.map__pin');
  console.log(mapPins);

  function renderCardAfterClickOnMapPin(array) {

    for (var i = 0; i < array.length; i++) {
    var elemet = array[i];
      if (!elemet.classList.contains('map__pin--main')) {
        elemet.addEventListener('click', function () {
          showCardViaClickOnPin();
        });
        elemet.addEventListener('keydown', function (e) {
          if (e.key === ENTER_KEY) {
            showCardViaClickOnPin();
            console.log(e);
          }   
        });
      } 
    }
  }
  renderCardAfterClickOnMapPin(mapPins);
  }
}, {once: true});

mainPin.addEventListener('keydown', function (e) {
  if (e.key === ENTER_KEY) {
    activateWebsite();
    renderPins();
    console.log(e);
  }
});

typeOfAccomodation.addEventListener('change', function (e) {
  checkValidityOfInputs(e);
});

timeIn.addEventListener('change', function (e) {
  checkTimeIn(e);
});

timeOut.addEventListener('change', function (e) {
  checkTimeOut(e);
});

numberOfRooms.addEventListener('change', function (e) {
  checkNumberOfRooms(e);
});

capacityOfRooms.addEventListener('change', function (e) {
  checkCapacityOfRooms(e);
});



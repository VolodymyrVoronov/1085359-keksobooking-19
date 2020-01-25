'use strict';
var pins = document.querySelectorAll('.map__pin');
var housePriceField = document.querySelector('#housing-price');
var blockMap = document.querySelector('.map');

blockMap.classList.remove('map--faded');

var pin = document.querySelector('#pin')


var getRandomItem = function (array) {
  return Math.floor(Math.random() * array.length);
};

function getRandomFromTo(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

var AVATAR_OF_AUTHOR = ['img/avatars/user01.png', 'img/avatars/user02.png', 'img/avatars/user03.png', 'img/avatars/user04.png', 'img/avatars/user05.png', 'img/avatars/user06.png', 'img/avatars/user07.png', 'img/avatars/user08.png',];
var TITLE = ['Супер предложение', 'Такого вы ещё не видели', 'Лучше, чем сейчас не будет', 'Только попробуй не снять', 'И боги бы тут хотели жить'];
var ADDRESS = ['600, 350'];
var PRICE = [10000, 50000, ];
var TYPE = ['palace', 'flat', 'house', 'bungalo'];
var AMOUNT_OF_ROOMS = [1, 2, 3];
var AMOUNT_OF_GUESTS = [1, 2];
var CHECKIN = ['12:00', '13:00', '14:00'];
var CHECKOUT = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var DESC = ['Лучшее место и место, где свершается обладание и проявляет себя силой помысла, — все это дан пример, т. е. в своей непосредственности проявление видимого органа маги. Особенно показателен тут пример звукового созерцания. Звук — это наиболее сильное из проявлений духовного ощущения...', 'Лучшее место? По уставу это никого не касается. В компьютерную игру дело не идет. Только для психотерапевта обязательно. На второй уровень не пускали. Выпускный класс прошли? Ага. Десять встреч в неделю. И получили испытательный сертификат. Запишите. Про три месяца. Отношение ко мне серьезное.', 'Тот самый отель и сейчас стоял в том же самом номере, из окна которого он тогда смотрел на сидящего за круглым столом худого человечка с трубкой во рту. Вдруг он вспомнил: в последний раз во дворе отеля тот говорил что-то о мудром Петре Великом.'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var LOC_X = 0;
var LOC_Y = 0;

var OBJECT_AMOUNT = 8;

function pullRandomOffer() {
  var el = {
    author: {
      avatar: AVATAR_OF_AUTHOR[getRandomItem(AVATAR_OF_AUTHOR)],
    },
  
    offer: {
      title: TITLE[getRandomItem(TITLE)],
      address: '600, 350',
      price: PRICE[getRandomItem(PRICE)],
      type: TYPE[getRandomItem(TYPE)],
      roomes: AMOUNT_OF_ROOMS[getRandomItem(AMOUNT_OF_ROOMS)],
      guests: AMOUNT_OF_GUESTS[getRandomItem(AMOUNT_OF_GUESTS)],
      checkin: CHECKIN[getRandomItem(CHECKIN)],
      checkout: CHECKOUT[getRandomItem(CHECKOUT)],
      features: FEATURES[getRandomItem(FEATURES)],
      discription: DESC[getRandomItem(DESC)],
      photos: PHOTOS[getRandomItem(PHOTOS)],
    },
  
    location: {
      x: 130,
      y: getRandomFromTo(130, 630),
    }
  }
  return el;
}


function createPin() {
  var pinEl = pin.cloneNode(true);

  pinEl.style='left: ' + pullRandomOffer().x + 'top: ' + pullRandomOffer().y;  

  return pinEl;
}

function renderPin(pins) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < pins.length; i++) {
    fragment.appendChild(createPin());
  }
  pins.appendChild(fragment);
}

renderPin(OBJECT_AMOUNT);
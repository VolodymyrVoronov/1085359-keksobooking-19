'use strict';

(function () {
  var URL = 'https://javascript.pages.academy/keksobooking/data';
  var URL_TO_SEND_FORM = 'https://js.dump.academy/keksobooking';
  var TIMEOUT_IN_MS = 1000;

  var START_Y_COORDINATE_OF_MAIN_PIN = 570;
  var START_X_COORDINATE_OF_MAIN_PIN = 375;
  var CLICK_ON_LEFT_BUTTON_OF_MOUSE = 1;
  var DEFAULT_INPUT_VALUE_ADDRESS = 410 + ', ' + 655;

  var StatusCode = {
    OK: 200,
  };

  window.load = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + '' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT_IN_MS;

    xhr.open('GET', URL);
    xhr.send();
  };

  window.save = function (form, formOnLoad, formOnError) {
    var xhr = new XMLHttpRequest();
    var formData = new FormData(form);

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        formOnLoad(xhr.response);
      } else {
        formOnError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      formOnError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      formOnError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT_IN_MS;
    xhr.open('POST', URL_TO_SEND_FORM);
    xhr.send(formData);
  };

  window.successHandler = function () {
    var adForm = document.querySelector('.ad-form');
    var mainPin = document.querySelector('.map__pin--main');
    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    var card = document.querySelector('.map__card');
    var successTemplate = document.querySelector('#success').content.querySelector('.success');
    var successHandlerMessage = successTemplate.cloneNode(true);
    document.body.insertAdjacentElement('afterbegin', successHandlerMessage);
    var successMessage = document.querySelector('.success__message');
    var inputAddress = document.querySelector('#address');

    document.addEventListener('keydown', function (e) {
      if (e.key === window.utils.ESC_KEY) {
        successHandlerMessage.remove();
      }
    }, {once: true});
    window.addEventListener('click', function (e) {
      if (e.target !== successMessage) {
        successHandlerMessage.remove();
      }
    }, {once: true});
    adForm.reset();
    window.deactivateWebsite();
    mainPin.style = 'left: ' + START_Y_COORDINATE_OF_MAIN_PIN + 'px; top: ' + START_X_COORDINATE_OF_MAIN_PIN + 'px';
    if (card) {
      card.remove();
    }
    pins.forEach(function (i) {
      i.remove();
    });

    mainPin.addEventListener('mouseup', function (e) {
      if (e.which === CLICK_ON_LEFT_BUTTON_OF_MOUSE) {
        window.activateWebsite();
      }
    }, {
      once: true
    });

    mainPin.addEventListener('keydown', function (e) {
      if (e.key === window.utils.ENTER_KEY) {
        window.activateWebsite();
      }
    }, {
      once: true
    });
    inputAddress.value = (DEFAULT_INPUT_VALUE_ADDRESS);
    window.clearImages();
  };

  window.errorHandler = function () {
    var errorTemplate = document.querySelector('#error').content.querySelector('.error');
    var errorHandlerMessage = errorTemplate.cloneNode(true);
    document.body.insertAdjacentElement('afterbegin', errorHandlerMessage);
    var errorMessage = document.querySelector('.error__message');
    var errorBtn = document.querySelector('.error__button');
    document.addEventListener('keydown', function (e) {
      if (e.key === window.utils.ESC_KEY) {
        errorHandlerMessage.remove();
      }
    });
    window.addEventListener('click', function (e) {
      if (e.target !== errorMessage) {
        errorHandlerMessage.remove();
      }
    }, true);
    errorBtn.addEventListener('click', function () {
      errorHandlerMessage.remove();
    });
  };
})();

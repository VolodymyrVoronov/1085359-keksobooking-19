'use strict';

(function () {
  var URL = 'https://js.dump.academy/keksobooking/data';
  var StatusCode = {
    OK: 200,
  };
  var TIMEOUT_IN_MS = 1000;
  var ESC_KEY = 'Escape';
  var ENTER_KEY = 'Enter';

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
    var oReq = new XMLHttpRequest();
    var oData = new FormData(form);

    oReq.addEventListener('load', function () {
      if (oReq.status === StatusCode.OK) {
        formOnLoad(oReq.response);
      } else {
        formOnError('Статус ответа: ' + oReq.status + ' ' + oReq.statusText);
      }
    });

    oReq.addEventListener('error', function () {
      formOnError('Произошла ошибка соединения');
    });
    oReq.addEventListener('timeout', function () {
      formOnError('Запрос не успел выполниться за ' + oReq.timeout + 'мс');
    });

    oReq.timeout = TIMEOUT_IN_MS;
    oReq.open('POST', 'https://js.dump.academy/keksobooking');
    oReq.send(oData);
  };

  window.successHandler = function () {
    var adForm = document.querySelector('.ad-form');
    var mainPin = document.querySelector('.map__pin--main');
    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    var card = document.querySelector('.map__card');
    var successTemplate = document.querySelector('#success').content.querySelector('.success');
    var successHandlerMessage = successTemplate.cloneNode(true);
    document.body.insertAdjacentElement('afterbegin', successHandlerMessage);
    document.addEventListener('keydown', function (e) {
      if (e.key === ESC_KEY) {
        successHandlerMessage.remove();
      }
    });
    document.addEventListener('click', function () {
      successHandlerMessage.remove();
    });
    adForm.reset();
    card.remove();
    window.deactivateWebsite();
    mainPin.style = 'left: ' + 570 + 'px; top: ' + 375 + 'px';
    pins.forEach(function (i) {
      i.remove();
    });

    mainPin.addEventListener('mouseup', function (e) {
      if (e.which === 1) {
        window.activateWebsite();
        window.load(window.renderPins, window.errorHandler);
      }
    }, {
      once: true
    });

    mainPin.addEventListener('keydown', function (e) {
      if (e.key === ENTER_KEY) {
        window.activateWebsite();
        window.load(window.renderPins, window.errorHandler);
      }
    }, {
      once: true
    });
  };

  window.errorHandler = function () {
    var errorTemplate = document.querySelector('#error').content.querySelector('.error');
    var errorHandlerMessage = errorTemplate.cloneNode(true);
    var errorBtn = document.querySelector('.error__button');
    document.body.insertAdjacentElement('afterbegin', errorHandlerMessage);

    document.addEventListener('keydown', function (e) {
      if (e.key === ESC_KEY) {
        errorHandlerMessage.remove();
      }
    });
    document.addEventListener('click', function () {
      errorHandlerMessage.remove();
    });
    errorBtn.addEventListener('click', function () {
      errorHandlerMessage.remove();
    });
  };
})();

'use strict';

(function () {
  var ENTER_KEY = 'Enter';
  var ESC_KEY = 'Escape';
  var DEBOUNCE_INTERVAL = 500;

  window.utils = {
    ENTER_KEY: ENTER_KEY,
    ESC_KEY: ESC_KEY,
  };

  window.debounce = function (fun) {
    var lastTimeout = null;
    return function () {
      var args = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        fun.apply(null, args);
      }, DEBOUNCE_INTERVAL);
    };
  };
})();

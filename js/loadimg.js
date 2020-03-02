'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var MARGIN_RIGHT = 5;
  var ImageParams = {
    WIDTH: 70,
    HEIGHT: 70,
    BORDER_RADIUS: '5px'
  };

  var fileChooserForAvatar = document.querySelector('.ad-form-header__input');
  var previewOfAvatar = document.querySelector('.ad-form-header__preview').querySelector('img');
  var fileChooserForPhotosOfAccommodation = document.querySelector('.ad-form__input');
  var previewOfPhotosOfAccommodation = document.querySelector('.ad-form__photo');

  window.clearImages = function () {
    previewOfAvatar.src = 'img/muffin-grey.svg';
    previewOfPhotosOfAccommodation.textContent = '';
  };

  fileChooserForAvatar.addEventListener('change', function () {
    var file = fileChooserForAvatar.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        previewOfAvatar.src = reader.result;
      });
      reader.readAsDataURL(file);
    }
  });

  fileChooserForPhotosOfAccommodation.addEventListener('change', function () {
    var file = fileChooserForPhotosOfAccommodation.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        previewOfPhotosOfAccommodation.style.display = 'flex';
        var img = document.createElement('img');
        img.src = reader.result;
        img.width = ImageParams.WIDTH;
        img.height = ImageParams.HEIGHT;
        img.style.marginRight = MARGIN_RIGHT + 'px';
        img.style.borderRadius = ImageParams.BORDER_RADIUS;
        previewOfPhotosOfAccommodation.appendChild(img);
      });
      reader.readAsDataURL(file);
    }
  });
})();

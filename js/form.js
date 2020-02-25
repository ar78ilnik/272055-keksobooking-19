'use strict';

(function () {
  var idPrice = window.adForm.querySelector('#price');
  var onHouseTypeChange = function (evt) {
    idPrice.placeholder = window.minHousePrices[evt.currentTarget.value];
    idPrice.min = window.minHousePrices[evt.currentTarget.value];
  };

  window.mapPoint.classList.add('map--faded');
  window.adForm.classList.add('ad-form--disabled');

  for (var i = 0; i < window.fields.length; i++) {
    window.fields[i].setAttribute('disabled', 'disabled');
  }

  // Функция получения координат нажатия мыши
  var captureCoords = function (evt) {
    var x = evt.clientX;
    var y = evt.clientY;
    return [x, y];
  };

  window.captureCoords = captureCoords;
  window.idType.addEventListener('change', onHouseTypeChange);

  window.idTimeIn.addEventListener('change', function (evt) {
    window.idTimeOut.value = evt.target.value;
  });

  window.idTimeOut.addEventListener('change', function (evt) {
    window.idTimeIn.value = evt.target.value;
  });

  // Объект ввода координат в поле адреса
  window.form = {
    introCoords: function (evt) {
      window.address.value = window.captureCoords(evt);
    }
  };

  // Объект активации полей fieldset
  window.form = {
    toogleFields: function (arr) {
      arr.forEach(function (item) {
        item.removeAttribute('disabled');
      }
    }
  };
})();

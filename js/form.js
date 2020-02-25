'use strict';

(function () {
    var idPrice = adForm.querySelector('#price');
    var onHouseTypeChange = function (evt) {
        idPrice.placeholder = minHousePrices[evt.currentTarget.value];
        idPrice.min = minHousePrices[evt.currentTarget.value];
    };
      
    mapPoint.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
      
    for (var i = 0; i < fields.length; i++) {
      fields[i].setAttribute('disabled', 'disabled');
    }
      
    // Функция получения координат нажатия мыши
    var captureCoords = function (evt) {
      var x = evt.clientX;
      var y = evt.clientY;
      return [x, y];
    };
    window.captureCoords = captureCoords;
    idType.addEventListener('change', onHouseTypeChange);
    
    idTimeIn.addEventListener('change', function (evt) {
      idTimeOut.value = evt.target.value;
    });

    idTimeOut.addEventListener('change', function (evt) {
      idTimeIn.value = evt.target.value;
    });

    // Объект ввода координат в поле адреса
    window.form = {
    introCoords: function (evt) {
        address.value = window.captureCoords(evt);
        }
    };

    // Объект активации полей fieldset
    window.form = {
        toogleFields: function (arr) {
            arr.forEach(function (item) {
                item.removeAttribute('disabled')
            }
        )}
    };
})();
'use strict';

var MAX_NUMBER = 6;
var MAX_PRICES = 5000;
var X_MIN = 0;
var X_MAX = 1200;
var Y_MIN = 130;
var Y_MAX = 630;
var ENTER_KEY = 'Enter';
var ESC_KEY = 'Escape';

var TYPES = [
  'palace',
  'flat',
  'house',
  'bungalo'];
var TIMES_CHECK = [
  '12:00',
  '13:00',
  '14:00'];
var FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];
var SETTYPE = {
  flat: 'Квартира',
  bungalo: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец'
};
var minHousePrices = {
  bungalo: 0,
  flat: 1000,
  house: 5000,
  palace: 10000
};
var PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

var map = document.querySelector('.map').querySelector('.map__filters-container');
var mapPoint = document.querySelector('.map');
var pinMain = document.querySelector('.map__pin--main');
var adForm = document.querySelector('.ad-form');
var fields = document.querySelectorAll('[name="fieldset"]');
var address = document.querySelector('#address');
var idType = adForm.querySelector('#type');
var idPrice = adForm.querySelector('#price');
var idTimeIn = adForm.querySelector('#timein');
var idTimeOut = adForm.querySelector('#timeout');

var onHouseTypeChange = function (evt) {
  idPrice.placeholder = minHousePrices[evt.currentTarget.value];
  idPrice.min = minHousePrices[evt.currentTarget.value];
};
mapPoint.classList.add('map--faded');
adForm.classList.add('ad-form--disabled');

for (var i = 0; i < fields.length; i++) {
  fields[i].setAttribute('disabled', 'disabled');
}

// 13. Функция получения координат нажатия мыши
var captureCoords = function (evt) {
  var x = evt.clientX;
  var y = evt.clientY;
  return [x, y];
};

// 12. Функция ввода координат в поле адреса
var introCoords = function (evt) {
  address.value = captureCoords(evt);
};

// 14. Функция активации полей fieldset
var toogleFields = function (arr) {
  arr.forEach(function (item) {
    item.removeAttribute('disabled');
  });
};

var insertCardToMap = function (numberId) {
  var cardItem = fragment.appendChild(renderOffer(pins[numberId]));
  map.insertAdjacentElement('beforebegin', cardItem);
  var popUpClose = document.querySelector('.popup__close');
  popUpClose.addEventListener('click', function () {
    closeMap();
  });
  popUpClose.addEventListener('keydown', function (evt) {
    if (evt.key === ESC_KEY) {
      closeMap();
    }
  });
};

// 13. Callback-функция активации карты
var enableMap = function () {
  mapPoint.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  toogleFields(fields);
  mapPins.appendChild(fragment);
  var pinTarget = mapPins.querySelectorAll('.map__pin');
  var mainTarget = document.querySelector('.map__pin--main').firstElementChild;
  pinTarget.forEach(function (item) {
    item.addEventListener('mousedown', function (evt) {
      if (evt.which === 1 && evt.target !== mainTarget) {
        insertCardToMap(evt.currentTarget.dataset.id);
      }
    });
    item.addEventListener('keydown', function (evt) {
      if (evt.key === ENTER_KEY) {
        insertCardToMap();
      }
    });
  });
};

var closeMap = function () {
  var popUpCard = document.querySelector('.popup');
  popUpCard.remove();
};

// 11. Обработчик нажатия клавиатуры и активация карты (вызов Callback-функции enableMap)
pinMain.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    enableMap();
  }
});

// 11а. Обработчик нажатия левой клавиши мыши и активация карты (вызов Callback-функции enableMap)
pinMain.addEventListener('mousedown', function (evt) {
  if (evt.which === 1) {
    enableMap();
  }
  introCoords(evt);
});

idType.addEventListener('change', onHouseTypeChange);

idTimeIn.addEventListener('change', function (evt) {
  idTimeOut.value = evt.target.value;
});

idTimeOut.addEventListener('change', function (evt) {
  idTimeIn.value = evt.target.value;
});

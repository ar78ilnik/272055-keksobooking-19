'use strict';

(function () {

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

  var fragment = document.createDocumentFragment();
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var pinsTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var pinMain = document.querySelector('.map__pin--main');
  var map = document.querySelector('.map').querySelector('.map__filters-container');
  var mapPoint = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  var fields = document.querySelectorAll('[name="fieldset"]');
  var address = document.querySelector('#address');
  var idType = adForm.querySelector('#type');
  var idTimeIn = adForm.querySelector('#timein');
  var idTimeOut = adForm.querySelector('#timeout');

  window.MAX_NUMBER = MAX_NUMBER;
  window.MAX_PRICES = MAX_PRICES;
  window.X_MIN = X_MIN;
  window.X_MAX = X_MAX;
  window.Y_MIN = Y_MIN;
  window.Y_MAX = Y_MAX;
  window.ENTER_KEY = ENTER_KEY;
  window.ESC_KEY = ESC_KEY;
  window.TYPES = TYPES;
  window.TIMES_CHECK = TIMES_CHECK;
  window.FEATURES = FEATURES;
  window.SETTYPE = SETTYPE;
  window.minHousePrices = minHousePrices;
  window.PHOTOS = PHOTOS;
  window.fragment = fragment;
  window.cardTemplate = cardTemplate;
  window.pinsTemplate = pinsTemplate;
  window.pinMain = pinMain;
  window.map = map;
  window.mapPoint = mapPoint;
  window.adForm = adForm;
  window.fields = fields;
  window.address = address;
  window.idType = idType;
  window.idTimeIn = idTimeIn;
  window.idTimeOut = idTimeOut;

  // Функция создания аватара
  function createAvatarValue(index) {
    return 'img/avatars/user0' + index + '.png';
  }

  // Функции генерации случайных данных
  var getRandomNumber = function (values) {
    var index = Math.floor(Math.random() * values.length);
    return values[index];
  };

  // Функция генерации случайного числа в пределах диапазона
  var getRandomValue = function (min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  };

  // Функция заполнения массива случайной длины
  var getRandomArray = function (arr) {
    var arrItems = [];
    arr.forEach(function (item) {
      arrItems.push(item);
    });
    return arrItems;
  };

  // Функция создания массива из num элементов
  function getArray(num) {
    var newArr = [];
    var i = 0;
    while (i <= num) {
      newArr.push(i);
      i++;
    }
    return newArr;
  }

  // Функция заполнения блока DOM-элементами на основе массива JS-объектов
  window.data = {
    isObtainPinsArray: function (pinsCount) {
      var ArrayPins = [];
      for (var i = 0; i < pinsCount; i++) {
        var pin = {
          author: {avatar: createAvatarValue(i + 1)},
          offer: {
            title: getRandomNumber(window.TYPES),
            address: {
              x: getRandomValue(window.X_MIN, window.X_MAX),
              y: getRandomValue(window.Y_MIN, window.Y_MAX)
            },
            price: getRandomNumber(getArray(window.MAX_PRICES)),
            type: getRandomNumber(window.TYPES),
            rooms: getRandomNumber(getArray(window.MAX_NUMBER)),
            guests: getRandomNumber(getArray(window.MAX_NUMBER)),
            checkin: getRandomNumber(window.TIMES_CHECK),
            checkout: getRandomNumber(window.TIMES_CHECK),
            features: getRandomArray(window.FEATURES),
            description: getRandomNumber(window.TYPES),
            photos: getRandomArray(window.PHOTOS)
          },
          location: {
            x: getRandomValue(window.X_MIN, window.X_MAX),
            y: getRandomValue(window.Y_MIN, window.Y_MAX)
          }
        };
        ArrayPins.push(pin);
      }
      return ArrayPins;
    }
  };
})();

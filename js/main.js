'use strict';

var NUMBERS = [1, 2, 3, 4, 5, 6];
var PRICES = [3000, 3500, 4000, 4500, 5000];
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var TIMES_CHECK = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];
var X_MIN = 0;
var X_MAX = 1200;
var Y_MIN = 130;
var Y_MAX = 630;

// Функции генерации случайных данных
var getRandomNumber = function (values) {
  var index = Math.floor(Math.random() * values.length);
  return values[index];
};

var getRandomValue = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

// Функция заполнения массива случайной длины
var getRandomArray = function (arr) {
  var number = getRandomValue(1, arr.length);
  var arrItems = [];
  for (var i = 0; i < number; i++) {
    arrItems.push(arr[i]);
  }
  return arrItems;
};

// Функцию заполнения блока DOM-элементами на основе массива JS-объектов
var createPinObjects = function (pinsCount) {
  var ArrayPins = [];
  for (var i = 0; i < pinsCount; i++) {
    var pin = {
      author: {avatar: 'img/avatars/user0' + (i + 1) + '.png'},
      offer: {
        title: getRandomNumber(TYPES),
        address: {
          x: getRandomValue(X_MIN, X_MAX),
          y: getRandomValue(Y_MIN, Y_MAX)
        },
        price: getRandomNumber(PRICES),
        type: getRandomNumber(TYPES),
        rooms: getRandomNumber(NUMBERS),
        guests: getRandomArray(NUMBERS),
        checkin: getRandomArray(TIMES_CHECK),
        checkout: getRandomArray(TIMES_CHECK),
        features: getRandomArray(FEATURES),
        description: getRandomNumber(TYPES),
        photos: getRandomArray(PHOTOS)
      },
      location: {
        x: getRandomValue(X_MIN, X_MAX),
        y: getRandomValue(Y_MIN, Y_MAX)
      }
    };
    ArrayPins.push(pin);
  }
  return ArrayPins;
};

var pins = createPinObjects(8);

var pinsTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var mapPins = document.querySelector('.map__pins');

// Функция создания DOM-элемента на основе JS-объекта
var renderPin = function (pinValues) {
  var pinElement = pinsTemplate.cloneNode(true);
  pinElement.style = 'left: ' + pinValues.location.x + 'px; top: ' + pinValues.location.y + 'px;';
  pinElement.firstChild.src = pinValues.author.avatar;
  pinElement.firstChild.alt = pinValues.offer.type;
  return pinElement;
};

var fragment = document.createDocumentFragment();

for (var i = 0; i < pins.length; i++) {
  fragment.appendChild(renderPin(pins[i]));
}

mapPins.appendChild(fragment);

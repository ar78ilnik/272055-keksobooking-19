'use strict';

var TYPES = ['palace', 'flat', 'house', 'bungalo'];
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

// Функцию заполнения блока DOM-элементами на основе массива JS-объектов
var createPinObjects = function (pinsCount) {
  var ArrayPins = [];
  for (var i = 0; i < pinsCount; i++) {
    var pin = {
      author: {avatar: 'img/avatars/user0' + (i + 1) + '.png'},
      offer: {type: getRandomNumber(TYPES)},
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

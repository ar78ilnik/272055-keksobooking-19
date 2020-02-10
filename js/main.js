'use strict';

var MAX_NUMBER = 6;
var MAX_PRICES = 5000;
var X_MIN = 0;
var X_MAX = 1200;
var Y_MIN = 130;
var Y_MAX = 630;
var ENTER_KEY = 'Enter';

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
var PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

// Функция создания аватара
function createAvatarValue(index) {
  return 'img/avatars/user0' + index + '.png';
}

// Функции генерации случайных данных
var getRandomNumber = function (values) {
  var index = Math.floor(Math.random() * values.length);
  return values[index];
};

var getRandomValue = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

function getArray(num) {
  var newArr = [];
  var i = 0;
  while (i <= num) {
    newArr.push(i);
    i++;
  }
  return newArr;
}

// Функция заполнения массива случайной длины
var getRandomArray = function (arr) {
  // var number = getRandomValue(1, arr.length);
  var arrItems = [];
  arr.forEach(function (item) {
    arrItems.push(item);
  });
  return arrItems;
};

// Функцию заполнения блока DOM-элементами на основе массива JS-объектов
var createPinObjects = function (pinsCount) {
  var ArrayPins = [];
  for (var i = 0; i < pinsCount; i++) {
    var pin = {
      author: {avatar: createAvatarValue(i + 1)},
      offer: {
        title: getRandomNumber(TYPES),
        address: {
          x: getRandomValue(X_MIN, X_MAX),
          y: getRandomValue(Y_MIN, Y_MAX)
        },
        price: getRandomNumber(getArray(MAX_PRICES)),
        type: getRandomNumber(TYPES),
        rooms: getRandomNumber(getArray(MAX_NUMBER)),
        guests: getRandomNumber(getArray(MAX_NUMBER)),
        checkin: getRandomNumber(TIMES_CHECK),
        checkout: getRandomNumber(TIMES_CHECK),
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

var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

// Функция заполнения тэгов li текстовыми значениями из массива FEATURES
var createTagContent = function (arr) {
  var fragment = new DocumentFragment();
  arr.forEach(function (item) {
    var li = document.createElement('li');
    li.classList.add('popup__feature');
    li.classList.add('popup__feature--' + item);
    fragment.appendChild(li);
  });
  return fragment;
};

// Функция заполнения атрибутов src значениями из массива PHOTOS
var addSrcAttributtes = function (arr) {
  var fragment = new DocumentFragment();
  var elems = cardTemplate.querySelector('.popup__photos');
  var elem = elems.querySelector('.popup__photo');
  elems.innerHTML = '';
  arr.forEach(function (item) {
    var elem2 = elem.cloneNode(true);
    elem2.src = item;
    fragment.appendChild(elem2);
  });
  return fragment;
};

// Функция создания DOM-элемента на основе JS-объекта
var renderPin = function (pinValues) {
  var pinElement = pinsTemplate.cloneNode(true);
  pinElement.style = 'left: ' + pinValues.location.x + 'px; top: ' + pinValues.location.y + 'px;';
  pinElement.firstChild.src = pinValues.author.avatar;
  pinElement.firstChild.alt = pinValues.offer.type;
  return pinElement;
};

// Функция создания DOM-элемента объявления на основе JS-объекта
var renderOffer = function (cardValues) {
  var cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.popup__title').textContent = cardValues.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = cardValues.offer.address.x + cardValues.offer.address.y;
  cardElement.querySelector('.popup__text--price').textContent = cardValues.offer.price + ' ₽/ночь';
  cardElement.querySelector('.popup__type').textContent = SETTYPE[cardValues.offer.type];
  cardElement.querySelector('.popup__text--capacity').textContent = cardValues.offer.rooms + ' комнаты ' + cardValues.offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + cardValues.offer.checkin + ', выезд до ' + cardValues.offer.checkout;
  cardElement.querySelector('.popup__features').innerHTML = '';
  cardElement.querySelector('.popup__features').appendChild(createTagContent(FEATURES));
  cardElement.querySelector('.popup__description').textContent = cardValues.offer.description;
  cardElement.querySelector('.popup__photos').appendChild(addSrcAttributtes(PHOTOS));
  cardElement.querySelector('.popup__photos').removeChild(cardElement.querySelector('.popup__photo'));
  cardElement.querySelector('.popup__avatar').src = cardValues.author.avatar;
  return cardElement;
};

var card = renderOffer(pins[0]);
var map = document.querySelector('.map').querySelector('.map__filters-container');

var fragment = document.createDocumentFragment();

pins.forEach(function (item) {
  fragment.appendChild(renderPin(item));
});

var mapPoint = document.querySelector('.map');
var pinMain = document.querySelector('.map__pin--main');
var adForm = document.querySelector('.ad-form');
var fields = document.querySelectorAll('[name="fieldset"]');
var address = document.querySelector('#address');

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

// Функция ввода координат в поле адреса
var introCoords = function (evt) {
  address.value = captureCoords(evt);
};

// Функция активации полей fieldset
var toogleFields = function (arr) {
  arr.forEach(function (item) {
    item.removeAttribute('disabled');
  });
};

var enableMap = function () {
  mapPoint.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  toogleFields(fields);
  mapPins.appendChild(fragment);
  map.insertAdjacentElement('beforebegin', card);
};

pinMain.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    enableMap();
  }
});

pinMain.addEventListener('mousedown', function (evt) {
  if (evt.which === 1) {
    enableMap();
  }
  introCoords(evt);
});

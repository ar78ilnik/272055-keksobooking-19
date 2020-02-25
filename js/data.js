'use strict';

(function () {

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

'use strict';

(function () {
  var pins = window.data.isObtainPinsArray(8);

  // Выбираем HTML-шаблон
  var mapPins = document.querySelector('.map__pins');

  // Вставляем сгенерированные пины в DOM
  pins.forEach(function (item, index) {
    window.fragment.appendChild(window.pin.renderPin(item, index));
  });

  // Обработчик нажатия клавиатуры и активация карты (вызов Callback-функции enableMap)
pinMain.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    enableMap();
  }
});

// Обработчик нажатия левой клавиши мыши и активация карты (вызов Callback-функции enableMap)
pinMain.addEventListener('mousedown', function (evt) {
  if (evt.which === 1) {
    enableMap();
  }
  window.form.introCoords(evt);
});

var closeMap = function () {
  var popUpCard = document.querySelector('.popup');
  if (!!popUpCard) {
    popUpCard.remove();
  }
};

// Функция вставки объявления на карту
var insertCardToMap = function (numberId) {
  var cardItem = window.fragment.appendChild(window.card.renderOffer(pins[numberId]));
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

// Callback-функция активации карты
var enableMap = function () {
  mapPoint.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  window.form.toogleFields(fields);
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

})();

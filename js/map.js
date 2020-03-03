'use strict';

(function () {

  var inited = false;
  var enable = false;
  var arrPins;
  window.arrPins = arrPins;
  /*
  var onLoad = function (arr) {
    arr.forEach(function (item, index) {
      window.fragment.appendChild(window.pin.renderPin(item, index));
    });
    window.card.renderOffer(arr);
  };
  */

  var onLoad = function (arrDown) {
    var arrPins = arrDown;
    return arrPins;
  }

  var funcDownload = function (arr) {
    window.arrPins.forEach(function (item, index) {
      window.fragment.appendChild(window.pin.renderPin(item, index));
    });
    window.card.renderOffer(arr);
  }

  // Выбираем HTML-шаблон
  var mapPins = document.querySelector('.map__pins');

  // Обработчик нажатия клавиатуры и активация карты (вызов Callback-функции enableMap)
  window.pinMain.addEventListener('keydown', function (evt) {
    if (evt.key === window.ENTER_KEY) {
      enableMap();
    }
  });

  // Обработчик нажатия левой клавиши мыши и активация карты (вызов Callback-функции enableMap)
  window.pinMain.addEventListener('mousedown', function (evt) {
    if (evt.which === 1 && !enable) {
      enableMap();
      arrPins = window.backend.download(onLoad);
      funcDownload(arrPins);
    }
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var pinPosition = {
        x: window.pinMain.offsetLeft - shift.x,
        y: window.pinMain.offsetTop - shift.y
      };

      var border = {
        TOP: mapLimits.yMin - window.pinMain.offsetHeight,
        BOTTOM: mapLimits.yMax,
        LEFT: mapLimits.xMin,
        RIGHT: mapLimits.xMax - window.pinMain.offsetWidth
      };

      if (pinPosition.x > border.LEFT && pinPosition.x <= border.RIGHT) {
        window.pinMain.style.left = pinPosition.x + 'px';
      }
      if (pinPosition.y > border.TOP && pinPosition.y <= border.BOTTOM) {
        window.pinMain.style.top = pinPosition.y + 'px';
      }

    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (!inited) {
        window.form.introCoords(upEvt);
      }

      inited = true;
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  var closeMap = function () {
    var popUpCard = document.querySelector('.popup');
    if (!!popUpCard) {
      popUpCard.remove();
    }
  };

  // Функция вставки объявления на карту
  var insertCardToMap = function (numberId) {
    var cardItem = window.fragment.appendChild(window.card.renderOffer(window.pin.renderPin.pinElement[numberId]));
    window.map.insertAdjacentElement('beforebegin', cardItem);
    var popUpClose = document.querySelector('.popup__close');
    popUpClose.addEventListener('click', function () {
      closeMap();
    });
    popUpClose.addEventListener('keydown', function (evt) {
      if (evt.key === window.ESC_KEY) {
        closeMap();
      }
    });
  };

  // Callback-функция активации карты
  var enableMap = function () {
    window.mapPoint.classList.remove('map--faded');
    window.adForm.classList.remove('ad-form--disabled');
    window.form.toogleFields(window.fields);
    mapPins.appendChild(window.fragment);
    var pinTarget = mapPins.querySelectorAll('.map__pin');
    var mainTarget = document.querySelector('.map__pin--main').firstElementChild;
    pinTarget.forEach(function (item) {
      item.addEventListener('mousedown', function (evt) {
        if (evt.which === 1 && evt.target !== mainTarget) {
          closeMap();
          insertCardToMap(evt.currentTarget.dataset.id);
        }
      });
      item.addEventListener('keydown', function (evt) {
        if (evt.key === window.ENTER_KEY) {
          closeMap();
          insertCardToMap(evt.currentTarget.dataset.id);
        }
      });
    });
  };

})();

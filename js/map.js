'use strict';

(function () {
  var pins = window.data.isObtainPinsArray(8);

  // Выбираем HTML-шаблон
  var pinsTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  // Шаблон карточки объявления
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

  // Функция создания DOM-элемента на основе JS-объекта
  var renderPin = function (pinValues, index) {
    var pinElement = pinsTemplate.cloneNode(true);
    pinElement.style = 'left: ' + pinValues.location.x + 'px; top: ' + pinValues.location.y + 'px;';
    pinElement.firstChild.src = pinValues.author.avatar;
    pinElement.firstChild.alt = pinValues.offer.type;
    pinElement.setAttribute('data-id', index);
    return pinElement;
  };

  // Вставляем сгенерированные пины в DOM
  pins.forEach(function (item, index) {
    window.fragment.appendChild(renderPin(item, index));
  });

  // Функция заполнения атрибутов src значениями из массива PHOTOS
  var addSrcAttributtes = function (arr) {
    window.fragment = new DocumentFragment();
    var t = cardTemplate.cloneNode(true);
    var elems = t.querySelector('.popup__photos');
    var elem = elems.querySelector('.popup__photo');
    elems.innerHTML = '';
    arr.forEach(function (item) {
      var elem2 = elem.cloneNode(true);
      elem2.src = item;
      window.fragment.appendChild(elem2);
    });
    return window.fragment;
  };

  // Функция создания DOM-элемента объявления на основе JS-объекта
  window.map = {
    renderOffer: function (cardValues) {
      var cardElement = cardTemplate.cloneNode(true);
      cardElement.querySelector('.popup__title').textContent = cardValues.offer.title;
      cardElement.querySelector('.popup__text--address').textContent = cardValues.offer.address.x + cardValues.offer.address.y;
      cardElement.querySelector('.popup__text--price').textContent = cardValues.offer.price + ' ₽/ночь';
      cardElement.querySelector('.popup__type').textContent = window.SETTYPE[cardValues.offer.type];
      cardElement.querySelector('.popup__text--capacity').textContent = cardValues.offer.rooms + ' комнаты ' + cardValues.offer.guests + ' гостей';
      cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + cardValues.offer.checkin + ', выезд до ' + cardValues.offer.checkout;
      cardElement.querySelector('.popup__features').innerHTML = '';
      cardElement.querySelector('.popup__features').appendChild(window.data.isObtainPinsArray(window.FEATURES));
      cardElement.querySelector('.popup__description').textContent = cardValues.offer.description;
      cardElement.querySelector('.popup__photos').appendChild(addSrcAttributtes(window.PHOTOS));
      cardElement.querySelector('.popup__photos').removeChild(cardElement.querySelector('.popup__photo'));
      cardElement.querySelector('.popup__avatar').src = cardValues.author.avatar;
      return cardElement;
    }
  };
})();

'use strict';

(function () {

  // Функция заполнения атрибутов src значениями из массива PHOTOS
  var addSrcAttributtes = function (arr) {
    window.fragment = new DocumentFragment();
    var t = window.cardTemplate.cloneNode(true);
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

  // Функция создания DOM-элемента объявления на основе JS-объекта
  window.card = {
    renderOffer: function (cardValues) {
      var cardElement = window.cardTemplate.cloneNode(true);
      cardElement.querySelector('.popup__title').textContent = cardValues.offer.title;
      cardElement.querySelector('.popup__text--address').textContent = cardValues.offer.address.x + cardValues.offer.address.y;
      cardElement.querySelector('.popup__text--price').textContent = cardValues.offer.price + ' ₽/ночь';
      cardElement.querySelector('.popup__type').textContent = window.SETTYPE[cardValues.offer.type];
      cardElement.querySelector('.popup__text--capacity').textContent = cardValues.offer.rooms + ' комнаты ' + cardValues.offer.guests + ' гостей';
      cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + cardValues.offer.checkin + ', выезд до ' + cardValues.offer.checkout;
      cardElement.querySelector('.popup__features').innerHTML = '';
      cardElement.querySelector('.popup__features').appendChild(createTagContent(window.FEATURES));
      cardElement.querySelector('.popup__description').textContent = cardValues.offer.description;
      cardElement.querySelector('.popup__photos').appendChild(addSrcAttributtes(window.PHOTOS));
      cardElement.querySelector('.popup__photos').removeChild(cardElement.querySelector('.popup__photo'));
      cardElement.querySelector('.popup__avatar').src = cardValues.author.avatar;
      return cardElement;
    }
  };
})();

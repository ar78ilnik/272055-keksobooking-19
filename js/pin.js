'use strict';

(function () {
  // Функция создания DOM-элемента на основе JS-объекта
  window.pin = {
    renderPin: function (pinValues, index) {
      var pinElement = window.pinsTemplate.cloneNode(true);
      pinElement.style = 'left: ' + pinValues.location.x + 'px; top: ' + pinValues.location.y + 'px;';
      pinElement.firstChild.src = pinValues.author.avatar;
      pinElement.firstChild.alt = pinValues.offer.type;
      pinElement.setAttribute('data-id', index);
      return pinElement;
    }
  };
})();

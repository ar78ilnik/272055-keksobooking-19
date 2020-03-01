'use strict';

(function () {
  window.backend = {
    download: function (onLoad) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      xhr.open('GET', 'https://js.dump.academy/keksobooking/data');
      xhr.addEventListener('load', function () {
        onLoad(xhr.response);
      });
      xhr.send();
    },
    upload: function () {}
  };
})();

"use strict";

function _createForOfIteratorHelper(o) { if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) { var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var it, normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

!function (i) {
  i.fn.fullClip = function (n) {
    var s,
        t,
        e = i.extend({
      current: 0,
      images: [],
      transitionTime: 1e3,
      wait: 3e3,
      "static": !1
    }, n);

    for (s = 0, t = e.images.length; s < t; ++s) {
      new Image().src = e.images[s];
    }

    return i(".fullBackground").css("background-image", "url(" + e.images[e.current] + ")").css("-webkit-transition", "background " + e.transitionTime + "s ease-in-out").css("-moz-transition", "background " + e.transitionTime + "ms ease-in-out").css("-ms-transition", "background " + e.transitionTime + "ms ease-in-out").css("-o-transition", "background " + e.transitionTime + "ms ease-in-out").css("transition", "background " + e.transitionTime + "ms ease-in-out"), e["static"] ? void i(this).css("background-image", "url(" + e.images[e.current] + ")") : void function n() {
      e.current = (e.current + 1) % e.images.length, i(".fullBackground").css("background-image", "url(" + e.images[e.current] + ")"), setTimeout(n, e.wait);
    }();
  };
}(jQuery);
$(document).ready(function () {
  $('.fullBackground').fullClip({
    images: ['assets/img/bg-main.jpg', 'https://cdn.pixabay.com/photo/2020/04/07/17/01/chicks-5014152_960_720.jpg', 'assets/img/bg-main.jpg'],
    transitionTime: 2000,
    wait: 5000
  });
  var points = document.querySelectorAll('.point');
  var i = 1;
  setInterval(function () {
    var _iterator = _createForOfIteratorHelper(points),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var point = _step.value;
        point.style.background = "url('/assets/img/icons/main_point.svg')";
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    points[i].style.background = "url('/assets/img/icons/main_point-fill.svg')";
    i++;

    if (i >= 3) {
      i = 0;
    }
  }, 5000);
});
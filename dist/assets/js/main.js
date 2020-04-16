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
  $('#phone_order').inputmask({
    "mask": "+ 7(999) 999-9999"
  });
  $('#phone_callus').inputmask({
    "mask": "+ 7(999) 999-9999"
  });
  var nv = $('.nValid');
  nv.hide(); //E-mail Ajax Send

  $(".button__order").click(function () {
    //Change
    var name = $('#name_order').val();
    var mail = $('#mail_order').val();
    var phone = $('#phone_order').val();
    var message = $('#message_order').val();
    var val = '';

    if (name == '' || name.length < 3) {
      val = 'Имя должно содержать более 3 символов';
    } else if (mail == '' || mail.split('@').length - 1 == 0 || mail.split('.').length - 1 == 0) {
      val = 'E-mail должен содержать "@" и "."';
    } else if (phone == '') {} else if (message == '' || message.length < 10) {
      val = 'Сообщение должно быть больше 10 символов';
    }

    if (val != '') {
      nv.html(val + '<div class="nValid"></div>');
      nv.show();
      return false;
    }

    var th = $('.order__form');
    nv.hide();
    $.ajax({
      type: "POST",
      url: "mail.php",
      //Change
      cache: false,
      beforeSend: function beforeSend() {
        $('.befSend').css("display", "flex");
      },
      data: th.serialize()
    }).done(function () {
      $('.befSend').text('Выполнено!');
      setTimeout(function () {
        $('.befSend').css("display", "none");
      }, 300);
      setTimeout(function () {
        // Done Functions
        th.trigger("reset");
      }, 500);
    });
    return false;
  }); //E-mail Ajax Send

  var ns = $('.nValidCall');
  ns.hide();
  $(".button__callus").click(function () {
    //Change
    var name = $('#name_callus').val();
    var phone = $('#phone_callus').val();
    var val = '';

    if (name == '' || name.length < 3) {
      val = 'Имя должно содержать более 3 символов';
    } else if (phone == '') {
      val = 'Телефон';
    }

    if (val != '') {
      ns.html(val + '<div class="nValidCall"></div>');
      ns.show();
      return false;
    }

    var th = $('.callus__form');
    ns.hide();
    $.ajax({
      type: "POST",
      url: "mail.php",
      //Change
      cache: false,
      beforeSend: function beforeSend() {// $('.befSend').css("display","flex");
      },
      data: th.serialize()
    }).done(function () {
      // $('.befSend').text('Выполнено!')
      setTimeout(function () {// $('.befSend').css("display","none");
      }, 300);
      setTimeout(function () {
        // Done Functions
        th.trigger("reset");
      }, 500);
    });
    return false;
  });
  $('.fullBackground').fullClip({
    images: ['assets/img/bg-main.jpg', 'assets/img/bg-main1.jpg', 'assets/img/bg-main2.jpg'],
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
  $(".menu").on("click", "a", function (event) {
    event.preventDefault();
    var id = $(this).attr('href');
    var top = $(id).offset().top;

    if (id == '#gallery') {
      top = $(id).offset().top + 120;
    }

    $('body,html').animate({
      scrollTop: top
    }, 1500);
  });
  $(".footer__menu").on("click", "a", function (event) {
    event.preventDefault();
    var id = $(this).attr('href');
    var top = $(id).offset().top;

    if (id == '#gallery') {
      top = $(id).offset().top + 120;
    }

    $('body,html').animate({
      scrollTop: top
    }, 1500);
  });
  $(".button__main").on("click", function () {
    var top = $("#order").offset().top;
    $('body,html').animate({
      scrollTop: top
    }, 1500);
  });
  $(".button__footer").on("click", function () {
    var top = $("#callus").offset().top;
    $('body,html').animate({
      scrollTop: top
    }, 1500);
  });
  var types = document.querySelector('.types');
  var spans = types.querySelectorAll('span');
  var sliders = document.querySelectorAll('.slider');

  types.onclick = function (e) {
    if (e.target.nodeName != 'SPAN') return;
    var type = e.target;

    var _iterator2 = _createForOfIteratorHelper(spans),
        _step2;

    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var _type = _step2.value;

        _type.classList.remove('active__type');

        if (_type.classList != 'type__name') {
          _type.classList.add('type__name');
        }
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }

    type.classList.remove('type__name');
    type.classList.add('active__type');

    var _iterator3 = _createForOfIteratorHelper(sliders),
        _step3;

    try {
      for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
        var slider = _step3.value;
        slider.style.display = 'none';

        if (type.dataset.type == slider.dataset.type) {
          slider.style.display = 'block';
        }
      }
    } catch (err) {
      _iterator3.e(err);
    } finally {
      _iterator3.f();
    }
  };

  function count() {
    var div = document.createElement('div');
    var span = document.createElement('span');
    var span2 = document.createElement('span');
    span.textContent = 1;
    span.insertAdjacentText('beforeend', '/');
    span2.textContent = 3;
    div.classList.add('numbers');
    span.classList.add('start');
    span2.classList.add('end');
    div.prepend(span);
    div.append(span2);
    gallery_cont.append(div);
  }

  var arrows = document.querySelectorAll('.slick-arrow');
  var span_start = document.querySelector('.start');
  var j = 1;
  var j2 = 1;
  var j3 = 1;

  var _iterator4 = _createForOfIteratorHelper(arrows),
      _step4;

  try {
    for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
      var arrow = _step4.value;

      arrow.onclick = function (e) {
        if (e.target.classList.contains('slick-prev')) {
          j--;

          if (j < 1) {
            j = 3;
          }

          span_start.textContent = j;
        } else if (e.target.classList.contains('slick-next')) {
          j++;

          if (j > 3) {
            j = 1;
          }

          span_start.textContent = j;
        }
      };
    }
  } catch (err) {
    _iterator4.e(err);
  } finally {
    _iterator4.f();
  }
});
$('.slider').slick({
  fade: true,
  waitForAnimate: false,
  zIndex: 100,
  responsive: [{
    breakpoint: 577,
    settings: {
      arrows: false
    }
  }]
});
$('.burger').click(function () {
  $(this).toggleClass('active_burger');
  $('.menu').toggleClass('active_menu');
  $('html').toggleClass('lock');
});
$('.menu__link').click(function () {
  $('.burger').removeClass('active_burger');
  $('.menu').removeClass('active_menu');
  $('html').removeClass('lock');
});

function addAnimate() {
  $('.header').addClass('fadeInUpBig');
  $('.main__title').addClass('fadeInUpBig');
  $('.main__subtitle').addClass('fadeInUpBig');
  $('.main__line').addClass('fadeInUpBig');
  $('.button__main').addClass('fadeInUpBig');
}

window.onload = function () {
  NProgress.done();
  $('.white').remove();
  addAnimate();
  $('body').css('overflow', 'auto');
  $('.slider-two').hide();
  $('.slider-three').hide();
};
"use strict";
!(function (i) {
  i.fn.fullClip = function (n) {
    var s,
      t,
      e = i.extend(
        { current: 0, images: [], transitionTime: 1e3, wait: 3e3, static: !1 },
        n
      );
    for (s = 0, t = e.images.length; s < t; ++s) new Image().src = e.images[s];
    return (
      i(".fullBackground")
        .css("background-image", "url(" + e.images[e.current] + ")")
        .css(
          "-webkit-transition",
          "background " + e.transitionTime + "s ease-in-out"
        )
        .css(
          "-moz-transition",
          "background " + e.transitionTime + "ms ease-in-out"
        )
        .css(
          "-ms-transition",
          "background " + e.transitionTime + "ms ease-in-out"
        )
        .css(
          "-o-transition",
          "background " + e.transitionTime + "ms ease-in-out"
        )
        .css("transition", "background " + e.transitionTime + "ms ease-in-out"),
      e.static
        ? void i(this).css(
            "background-image",
            "url(" + e.images[e.current] + ")"
          )
        : void (function n() {
            (e.current = (e.current + 1) % e.images.length),
              i(".fullBackground").css(
                "background-image",
                "url(" + e.images[e.current] + ")"
              ),
              setTimeout(n, e.wait);
          })()
    );
  };
})(jQuery);

var currentImageIndex = -1;
var imageIds = new Array();
var fadeSpeed;

//Sizing constants. these determine the value of the CSS property 'background-size' of the selected container
var SCALING_MODE_NONE = 0; //Uses the original image size
var SCALING_MODE_STRETCH = 1; //Sets 'background-size' to '100% 100%'. This stretches the background image to fill the container, discarding the images aspect ratio.
var SCALING_MODE_COVER = 2; //Sets 'background-size' to 'cover'. This makes the background images fill the entire container while retaining its aspect ratio.
var SCALING_MODE_CONTAIN = 3; //Sets 'background-size' to 'contain'. This scales the bakcground image to the largest size such that both its width and its height can fit inside the content area

/**
 * Adds a cycling (fading) background to the selected element
 * @param {Object} options Options for tweaking the cycle setings.
 * imageUrls: an array of strings representing urls to the images to cycle through
 * duration: the nr of miliseconds between two fades.
 * fadeSpeed: the nr of miliseconds it takes for one image to fade out to another.
 * backgroundSize: specify a value for the css3 property 'background size' or one of the following constants; SCALING_MODE_NONE, SCALING_MODE_STRETCH, SCALING_MODE_COVER, SCALING_MODE_CONTAIN
 */
$.fn.backgroundCycle = function (options) {
  var settings = $.extend(
    {
      imageUrls: [],
      duration: 5000,
      fadeSpeed: 1000,
      backgroundSize: SCALING_MODE_NONE,
    },
    options
  );

  fadeSpeed = settings.fadeSpeed;

  var marginTop = this.css("margin-top");
  var marginRight = this.css("margin-right");
  var marginBottom = this.css("margin-bottom");
  var marginLeft = this.css("margin-left");

  if (!this.is("body")) {
    this.css({
      position: "absolute",
    });
  }

  var contents = $(document.createElement("div"));

  var children = this.children().detach();
  contents.append(children);

  imageIds = new Array();

  for (var i = 0; i < settings.imageUrls.length; i++) {
    var id = "bgImage" + i;
    var src = settings.imageUrls[i];
    var cssClass = "cycle-bg-image";

    var image = $(document.createElement("div"));
    image.attr("id", id);
    image.attr("class", cssClass);

    var sizeMode;

    switch (settings.backgroundSize) {
      default:
        sizeMode = settings.backgroundSize;
        break;
      case SCALING_MODE_NONE:
        sizeMode = "auto";
        break;
      case SCALING_MODE_STRETCH:
        sizeMode = "100% 100%";
        break;
      case SCALING_MODE_COVER:
        sizeMode = "cover";
        break;
      case SCALING_MODE_CONTAIN:
        sizeMode = "contain";
        break;
    }

    image.css({
      "background-image": "url('" + src + "')",
      "background-repeat": "no-repeat",
      "background-size": sizeMode,
      "-moz-background-size": sizeMode,
      "-webkit-background-size": sizeMode,
      position: "absolute",
      left: marginLeft,
      top: marginTop,
      right: marginRight,
      bottom: marginBottom,
    });

    this.append(image);

    imageIds.push(id);
  }

  contents.css({
    position: "absolute",
    left: marginLeft,
    top: marginTop,
    right: marginRight,
    bottom: marginBottom,
  });

  this.append(contents);
  $(".cycle-bg-image").hide();
  $("#" + imageIds[0]).show();
  setInterval(cycleToNextImage, settings.duration);
};

function cycleToNextImage() {
  var previousImageId = imageIds[currentImageIndex];

  currentImageIndex++;

  if (currentImageIndex >= imageIds.length) {
    currentImageIndex = 0;
  }

  var options = {
    duration: fadeSpeed,
    queue: false,
  };

  $("#" + previousImageId).fadeOut(options);
  $("#" + imageIds[currentImageIndex]).fadeIn(options);
}

$(document).ready(function () {
  $(".slider").slick({
    fade: true,
    waitForAnimate: false,
    zIndex: 100,
    infinite: false,
    draggable: false,
    swipe: false,
    responsive: [
      {
        breakpoint: 577,
        settings: {
          arrows: false,
          draggable: true,
          swipe: true,
        },
      },
    ],
  });

  $(".forgingsSlider__slider").slick({
    variableWidth: true,
    infinite: false,
    rows: 2,
    slidesToShow: 4,
    responsive: [
      {
        breakpoint: 1355,
        settings: {
          slidesToShow: 3,
          variableWidth: false,
        },
      },
      {
        breakpoint: 985,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 577,
        settings: {
          arrows: false,
          slidesToShow: 1,
          slidesPerRow: 1,
          variableWidth: true,
        },
      },
      {
        breakpoint: 350,
        settings: {
          arrows: false,
          slidesToShow: 1,
        },
      },
    ],
  });

  let forginSlider = document.querySelector(".forgingsSlider__slider");
  let img = forginSlider.querySelectorAll("img");
  let forgingsModal = document.querySelector(".forgingsSlider__modal");

  let forgingsModalImg = document.querySelector(".forgingsSlider__img");

  function setAttributeIMg() {
    let number = 0;
    for (let i = 0; i < img.length; i++) {
      img[i].setAttribute("data-img", `assets/img/slider/pakovka${number}.jpg`);
      number++;
    }
  }
  setAttributeIMg();

  forgingsModal.style.display = "none";

  forginSlider.onclick = (e) => {
    if (e.target.nodeName != "IMG") return;
    let img = e.target;
    forgingsModalImg.setAttribute("src", `${img.dataset.img}`);
    forgingsModal.style.display = "flex";
    $("html").css("overflow", "hidden");
  };
  forgingsModal.querySelector("SPAN").onclick = () => {
    forgingsModal.style.display = "none";
    $("html").css("overflow", "auto");
  };

  forgingsModal.onclick = function () {
    this.style.display = "none";
    $("html").css("overflow", "auto");
  };

  // СМЕНА ФОНА ДЛЯ ГЛАВНОГО ЭКРАНА
  $(".fullBackground").backgroundCycle({
    imageUrls: [
      "assets/img/bg-main4.jpg",
      "assets/img/bg-main1.jpg",
      "assets/img/bg-main2.jpg",
      "assets/img/bg-main3.jpg",
    ],
    fadeSpeed: 2000,
    duration: 5000,
    backgroundSize: SCALING_MODE_COVER,
  });

  $("#phone_order").inputmask({ mask: "+ 7(999) 999-9999" });
  $("#phone_callus").inputmask({ mask: "+ 7(999) 999-9999" });
  let nv = $(".nValid");
  nv.hide();

  //E-mail Ajax Send
  $(".button__order").click(function () {
    //Change
    let name = $("#name_order").val();
    let mail = $("#mail_order").val();
    let phone = $("#phone_order").val();
    let message = $("#message_order").val();
    let val = "";
    if (name == "" || name.length < 3) {
      val = "Имя должно содержать более 3 символов";
    } else if (
      mail == "" ||
      mail.split("@").length - 1 == 0 ||
      mail.split(".").length - 1 == 0
    ) {
      val = 'E-mail должен содержать "@" и "."';
    } else if (phone == "") {
    } else if (message == "" || message.length < 10) {
      val = "Сообщение должно быть больше 10 символов";
    }
    if (val != "") {
      nv.html(val + '<div class="nValid"></div>');
      nv.show();
      return false;
    }
    var th = $(".order__form");
    nv.hide();
    $.ajax({
      type: "POST",
      url: "mail.php", //Change
      cache: false,
      beforeSend: function () {
        $(".befSend").css("display", "flex");
      },
      data: th.serialize(),
    }).done(function () {
      $(".befSend").text("Выполнено!");
      setTimeout(function () {
        $(".befSend").css("display", "none");
      }, 300);
      setTimeout(function () {
        // Done Functions
        th.trigger("reset");
      }, 500);
    });
    return false;
  });
  //E-mail Ajax Send
  let ns = $(".nValidCall");
  ns.hide();
  $(".button__callus").click(function () {
    //Change
    let name = $("#name_callus").val();
    let phone = $("#phone_callus").val();
    let val = "";
    if (name == "" || name.length < 3) {
      val = "Имя должно содержать более 3 символов";
    } else if (phone == "") {
      val = "Телефон";
    }
    if (val != "") {
      ns.html(val + '<div class="nValidCall"></div>');
      ns.show();
      return false;
    }
    var th = $(".callus__form");
    ns.hide();
    $.ajax({
      type: "POST",
      url: "mail.php", //Change
      cache: false,
      beforeSend: function () {
        $(".befSendMes").css("display", "flex");
      },
      data: th.serialize(),
    }).done(function () {
      setTimeout(function () {
        $(".befSendMes").css("display", "none");
      }, 300);
      setTimeout(function () {
        // Done Functions
        th.trigger("reset");
      }, 500);
    });
    return false;
  });

  let points = document.querySelectorAll(".point");
  let i = 1;
  setInterval(function () {
    for (let j = 0; j < points.length; j++) {
      points[j].style.background = "url('/assets/img/icons/main_point.svg')";
    }
    points[i].style.background = "url('/assets/img/icons/main_point-fill.svg')";
    i++;
    if (i >= 4) {
      i = 0;
    }
  }, 5000);

  /// ANCHOR LINKS -----------------

  $(".menu").on("click", "a", function (event) {
    event.preventDefault();
    let id = $(this).attr("href");
    let top = $(id).offset().top;
    if (id == "#gallery") {
      top = $(id).offset().top + 120;
    }
    $("body,html").animate({ scrollTop: top }, 1500);
  });
  $(".footer__menu").on("click", "a", function (event) {
    event.preventDefault();
    let id = $(this).attr("href");
    let top = $(id).offset().top;
    if (id == "#gallery") {
      top = $(id).offset().top + 120;
    }
    $("body,html").animate({ scrollTop: top }, 1500);
  });
  $(".menu__stick_menu").on("click", "a", function (event) {
    event.preventDefault();
    let id = $(this).attr("href");
    let top = $(id).offset().top;
    if (id == "#gallery") {
      top = $(id).offset().top + 120;
    }
    $("body,html").animate({ scrollTop: top }, 1500);
  });
  $(".button__main").on("click", function () {
    let top = $("#order").offset().top;
    $("body,html").animate({ scrollTop: top }, 1500);
  });
  $(".button__footer").on("click", function () {
    let top = $("#callus").offset().top;
    $("body,html").animate({ scrollTop: top }, 1500);
  });
  $(".button__main_menu").on("click", function () {
    let top = $("#callus").offset().top;
    $("body,html").animate({ scrollTop: top }, 3500);
  });
  $(".button__stick").on("click", function () {
    let top = $("#callus").offset().top;
    $("body,html").animate({ scrollTop: top }, 1000);
  });

  let sliderOne = document.querySelector(".slider-one");
  let arrows = sliderOne.querySelectorAll(".slick-arrow");

  let span_start = document.querySelector(".start");
  let span_end1 = document.querySelector(".numbers-one").querySelector(".end");

  let sliderImg1 = document
    .querySelector(".slider-one")
    .querySelectorAll(".slider__item").length;

  let j = 1;
  span_end1.textContent = sliderImg1;
  for (let arrow = 0; arrow < arrows.length; arrow++) {
    arrows[arrow].onclick = (e) => {
      if (e.target.classList.contains("slick-prev")) {
        j--;
        if (j < 1) {
          j = 1;
        }
      } else if (e.target.classList.contains("slick-next")) {
        j++;
        if (j > span_end1.innerHTML) {
          j = span_end1.innerHTML;
        }
      }
      span_start.textContent = j;
    };
  }

  function getCoords(elem) {
    let box = elem.getBoundingClientRect();

    return {
      top: box.top + pageYOffset,
      left: box.left + pageXOffset,
      bottom: box.bottom + pageYOffset,
    };
  }
  let menu_stick = document.querySelector(".menu__stick");
  let company = document.querySelector(".company");
  let gallery = document.querySelector(".gallery");
  let forgingsSlider = document.querySelector(".forgingsSlider");
  $(".menu__stick").fadeOut();

  window.onscroll = () => {
    if (
      getCoords(menu_stick).top >= getCoords(gallery).top &&
      getCoords(menu_stick).bottom <= getCoords(gallery).bottom
    ) {
      $(".menu__stick").fadeOut(300);
    } else if (
      getCoords(menu_stick).top >= getCoords(forgingsSlider).top &&
      getCoords(menu_stick).bottom <= getCoords(forgingsSlider).bottom
    ) {
      $(".menu__stick").fadeOut(500);
    } else if (getCoords(menu_stick).top >= getCoords(company).top) {
      $(".menu__stick").fadeIn(500);
    } else {
      $(".menu__stick").fadeOut(300);
    }
  };
});
$(".burger").click(function () {
  $(".menu").toggleClass("active_menu");
  $(this).toggleClass("active_burger");
  if ($("html").css("overflow") == "hidden") {
    $("html").css("overflow", "auto");
  } else {
    $("html").css("overflow", "hidden");
  }
  $(".main__wrap").toggleClass("hideBt");
  $(".button__main").toggleClass("hideBt");
});
$(".menu__link").click(function () {
  $(".burger").removeClass("active_burger");
  $(".menu").removeClass("active_menu");
  $("html").css("overflow", "auto");
  $(".main__wrap").removeClass("hideBt");
  $(".button__main").removeClass("hideBt");
});

// MENU STICK////////////////

$(".menu__stick_burger").click(function () {
  $(this).toggleClass("menu__stick_burger_active");
  $(".menu__stick_menu").toggleClass("menu__stick_menu_active");
  $("html").toggleClass("lock");
  $("body").toggleClass("lock");
  $(".slick-active").css("z-index", 1);
  $(".slider__item").css("z-index", 1);
});
$(".menu__stick_link").click(function () {
  $(".menu__stick_burger").removeClass("menu__stick_burger_active");
  $(".menu__stick_menu").removeClass("menu__stick_menu_active");
  $("html").removeClass("lock");
  $("body").toggleClass("lock");
});

function addAnimate() {
  $(".header").addClass("fadeInUpBig");
  $(".main__title").addClass("fadeInUpBig");
  $(".main__subtitle").addClass("fadeInUpBig");
  $(".main__line").addClass("fadeInUpBig");
  $(".button__main").addClass("fadeInUpBig");
}
window.onload = function () {
  NProgress.done();
  $(".white").remove();
  addAnimate();
  $("body").css("overflow", "auto");
};

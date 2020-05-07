$(document).ready(function () {
  // Сладер главного экрана
  $(".fullBackground").slick({
    arrows: false,
    dots: true,
    fade: true,
    autoplay: true,
    pauseOnDotsHover: false,
    pauseOnFocus: false,
    speed: 2000,
    autoplaySpeed: 2500,
    cssEase: 'ease'
  });
    // Слайдер Каталога
  $(".slider").slick({
    fade: true,
    waitForAnimate: false,
    centerMode: true,
    zIndex: 100,
    infinite: false,
    draggable: false,
    swipe: false,
    responsive: [
      {
        breakpoint: 577,
        settings: {
          draggable: true,
          swipe: true,
        },
      },
    ],
  });
  // Слайдер каталога поковки
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
          slidesToShow: 1,
          slidesPerRow: 1,
          variableWidth: true,
        },
      },
      {
        breakpoint: 350,
        settings: {
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

  // Макси форм
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
  if ($("html").css("overflow") == "hidden") {
    $("html").css("overflow", "auto");
  } else {
    $("html").css("overflow", "hidden");
  }
  $(".slick-active").css("z-index", 1);
  $(".slider__item").css("z-index", 1);
});
$(".menu__stick_link").click(function () {
  $(".menu__stick_burger").removeClass("menu__stick_burger_active");
  $(".menu__stick_menu").removeClass("menu__stick_menu_active");
  $("html").css("overflow", "auto");
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

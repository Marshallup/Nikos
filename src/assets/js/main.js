"use strict";!function(i){i.fn.fullClip=function(n){var s,t,e=i.extend({current:0,images:[],transitionTime:1e3,wait:3e3,static:!1},n);for(s=0,t=e.images.length;s<t;++s)(new Image).src=e.images[s];return i(".fullBackground").css("background-image","url("+e.images[e.current]+")").css("-webkit-transition","background "+e.transitionTime+"s ease-in-out").css("-moz-transition","background "+e.transitionTime+"ms ease-in-out").css("-ms-transition","background "+e.transitionTime+"ms ease-in-out").css("-o-transition","background "+e.transitionTime+"ms ease-in-out").css("transition","background "+e.transitionTime+"ms ease-in-out"),e.static?void i(this).css("background-image","url("+e.images[e.current]+")"):void function n(){e.current=(e.current+1)%e.images.length,i(".fullBackground").css("background-image","url("+e.images[e.current]+")"),setTimeout(n,e.wait)}()}}(jQuery);

$(document).ready(function() {

    $('#phone_order').inputmask({"mask": "+ 7(999) 999-9999"});
    $('#phone_callus').inputmask({"mask": "+ 7(999) 999-9999"});
    let nv = $('.nValid');
    nv.hide()
    //E-mail Ajax Send
    $(".button__order").click(function() { //Change
        let name = $('#name_order').val();
        let mail = $('#mail_order').val();
        let phone = $('#phone_order').val();
        let message = $('#message_order').val();
        let val = '';
        if ( name == '' || name.length < 3 ) {
            val = 'Имя должно содержать более 3 символов'
        } else if (mail == '' || mail.split('@').length - 1 == 0 || mail.split('.').length - 1 == 0 ) {
            val = 'E-mail должен содержать "@" и "."'
        } else if ( phone == '' ) {
        } else if ( message == '' || message.length < 10 ) {
            val = 'Сообщение должно быть больше 10 символов';
        }
        if (val != '') {
            nv.html(val + '<div class="nValid"></div>')
            nv.show()
            return false
        }
        var th = $('.order__form');
        nv.hide()
		$.ajax({
			type: "POST",
            url: "mail.php", //Change
            cache: false,
            beforeSend: function() {
                $('.befSend').css("display","flex");
            },
            data: th.serialize()
		}).done(function() {
            $('.befSend').text('Выполнено!')
            setTimeout(function() {
                $('.befSend').css("display","none");
            }, 300)
			setTimeout(function() {
				// Done Functions
				th.trigger("reset");
			}, 500);
		});
		return false;
	});
    // $(".order__form").submit(function() { //Change
	// 	var th = $(this);
	// 	$.ajax({
	// 		type: "POST",
	// 		url: "mail.php", //Change
	// 		data: th.serialize()
	// 	}).done(function() {
	// 		alert("Спасибо ! Мы свяжемся с вами в ближайшее время !");
	// 		setTimeout(function() {
	// 			// Done Functions
	// 			th.trigger("reset");
	// 		}, 1000);
	// 	});
	// 	return false;
    // });
    
    // let nv = $('.nValid');
    // nv.hide()
    //E-mail Ajax Send
    let ns = $('.nValidCall');
    ns.hide();
    $(".button__callus").click(function() { //Change
        let name = $('#name_callus').val();
        let phone = $('#phone_callus').val();
        let val = '';
        if ( name == '' || name.length < 3 ) {
            val = 'Имя должно содержать более 3 символов'
        } else if ( phone == '' ) {
            val = 'Телефон'
        }
        if (val != '') {
            ns.html(val + '<div class="nValidCall"></div>')
            ns.show()
            return false
        }
        var th = $('.callus__form');
        ns.hide()
		$.ajax({
			type: "POST",
            url: "mail.php", //Change
            cache: false,
            beforeSend: function() {
                // $('.befSend').css("display","flex");
            },
            data: th.serialize()
		}).done(function() {
            // $('.befSend').text('Выполнено!')
            setTimeout(function() {
                // $('.befSend').css("display","none");
            }, 300)
			setTimeout(function() {
				// Done Functions
				th.trigger("reset");
			}, 500);
		});
		return false;
	});

    $('.fullBackground').fullClip({
        images: ['assets/img/bg-main.jpg', 'assets/img/bg-main1.jpg', 'assets/img/bg-main.jpg'],
        transitionTime: 2000,
        wait: 5000
    })
    let points = document.querySelectorAll('.point');
    let i = 1;
    setInterval(function() {
        for ( let point of points) {
            point.style.background = "url('/assets/img/icons/main_point.svg')"
        }
        points[i].style.background = "url('/assets/img/icons/main_point-fill.svg')";
        i++
        if ( i >= 3) {
            i = 0
        }
    },5000)

    
        $(".menu").on("click","a", function (event) {
            event.preventDefault();
            let id  = $(this).attr('href');
            let top = $(id).offset().top;
            if ( id == '#gallery') {
                top = $(id).offset().top + 120;
            }
            $('body,html').animate({scrollTop: top}, 1500);
        });
        $(".footer__menu").on("click","a", function (event) {
            event.preventDefault();
            let id  = $(this).attr('href');
            let top = $(id).offset().top;
            if ( id == '#gallery') {
                top = $(id).offset().top + 120;
            }
            $('body,html').animate({scrollTop: top}, 1500);
        });
        $(".button__main").on("click", function () {
            let top = $("#order").offset().top;
            $('body,html').animate({scrollTop: top}, 1500);
        });
        $(".button__footer").on("click", function () {
            let top = $("#callus").offset().top;
            $('body,html').animate({scrollTop: top}, 1500);
        });

    let types = document.querySelector('.types');
    let spans = types.querySelectorAll('span');
    let sliders = document.querySelectorAll('.slider');

        setTimeout(function() {
            for ( let slider of sliders) {
                slider.style.display = 'none'
            }
            slider_one.style.display = 'block'
        },100)
        
    types.onclick = (e) => {
        if ( e.target.nodeName != 'SPAN' ) return
        let type = e.target;
        for ( let type of spans ) {
            type.classList.remove('active__type')
            if ( type.classList != 'type__name') {
                type.classList.add('type__name')
            }
        }
        type.classList.remove('type__name')
        type.classList.add('active__type')

        for ( let slider of sliders) {
                slider.style.display = 'none'
            if (type.dataset.type == slider.dataset.type) {
                slider.style.display = 'block'
            }
        }


    }
    function count() {
        let div = document.createElement('div');
        let span = document.createElement('span');
        let span2 = document.createElement('span');
        span.textContent = 1
        span.insertAdjacentText('beforeend', '/')
        span2.textContent = 3
        div.classList.add('numbers')
        span.classList.add('start')
        span2.classList.add('end')
        div.prepend(span)
        div.append(span2)
        gallery_cont.append(div)
    }
    let arrows = document.querySelectorAll('.slick-arrow');
    let span_start = document.querySelector('.start');
    let j = 1;
    let j2 = 1;
    let j3 = 1;
    for ( let arrow of arrows) {
        arrow.onclick = (e) => {
            if ( e.target.classList.contains('slick-prev')) {
                j--
                if ( j < 1 ) {
                    j = 3
                }
                span_start.textContent = j
            } else if ( e.target.classList.contains('slick-next')) {
                j++
                if ( j > 3 ) {
                    j = 1
                }
                span_start.textContent = j
            }
        }
    }


});
$('.slider').slick();
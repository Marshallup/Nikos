"use strict";!function(i){i.fn.fullClip=function(n){var s,t,e=i.extend({current:0,images:[],transitionTime:1e3,wait:3e3,static:!1},n);for(s=0,t=e.images.length;s<t;++s)(new Image).src=e.images[s];return i(".fullBackground").css("background-image","url("+e.images[e.current]+")").css("-webkit-transition","background "+e.transitionTime+"s ease-in-out").css("-moz-transition","background "+e.transitionTime+"ms ease-in-out").css("-ms-transition","background "+e.transitionTime+"ms ease-in-out").css("-o-transition","background "+e.transitionTime+"ms ease-in-out").css("transition","background "+e.transitionTime+"ms ease-in-out"),e.static?void i(this).css("background-image","url("+e.images[e.current]+")"):void function n(){e.current=(e.current+1)%e.images.length,i(".fullBackground").css("background-image","url("+e.images[e.current]+")"),setTimeout(n,e.wait)}()}}(jQuery);

$(document).ready(function() {
    $('.fullBackground').fullClip({
        images: ['assets/img/bg-main.jpg', 'https://cdn.pixabay.com/photo/2020/04/07/17/01/chicks-5014152_960_720.jpg', 'assets/img/bg-main.jpg'],
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

});
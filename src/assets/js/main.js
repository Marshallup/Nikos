

let points = document.querySelectorAll('.point');
let i = 1;
setInterval(function() {
    for ( let point of points) {
        point.style.backgroundImage = "url('/assets/img/icons/main_point.svg')"
    }
    if (i >= 3) {
        i = 0
    }
    points[i].style.backgroundImage = "url('/assets/img/icons/main_point-fill.svg')"
    i++
},5000)
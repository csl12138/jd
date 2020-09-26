const endTime = setTime(21, 0, 0);
let cutdownTimer = null;
const hours = $(".cutdown .hours").eq(0),
    minutes = $(".cutdown .minutes").eq(0),
    seconds = $(".cutdown .seconds").eq(0);
let lastSec = null;
cutdownTimer = setInterval(() => {
    const rest = endTime - new Date().getTime();
    if (rest <= 0) {
        renderTime(00,00,00)
        clearInterval(cutdownTimer);
        return;
    }
    let seconds = parseInt(rest / 1000 % 60),
        minutes = parseInt(rest / 1000 / 60 % 60),
        hours = parseInt(rest / 1000 / 60 / 60);
    if (lastSec === seconds) {
        seconds--
        lastSec = seconds;
    } else {
        lastSec = seconds;
    }
    if (seconds < 10) {
        seconds = '0' + seconds;
    }
    if (minutes < 10) {
        minutes = '0' + minutes;
    }
    if (hours < 10) {
        hours = '0' + hours;
    }
    renderTime(hours, minutes, seconds);
}, 1000);

function setTime(hours, minutes, seconds) {
    const endTime = new Date();
    endTime.setHours(hours);
    endTime.setMinutes(minutes);
    endTime.setSeconds(seconds);
    return endTime.getTime();
}

function renderTime(hour, minute, second) {
    hours.html(hour);
    minutes.html(minute);
    seconds.html(second);
}

$('.goods-list').swiper({
    isAutoChange: false,
    domList: $('.goods-list>.items'),
    showSpotBtn: false,
    width: 800,
    height: 260
})
$('.hotgoods').swiper({
    domList: $('.hotgoods>.items'),
    showChangeBtn: 'none',
    spotStyle: 'sty4',
    width: 200,
    height: 260,
    duration: 2000
})
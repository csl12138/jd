let logoTimer = null,
    logoGif = $('.logo-gif'),
    logoDec = $('.logo .dec');

$('.logo').mouseenter(function () {
    logoGif.removeClass("mouse-leave");
    if (!logoGif.hasClass('animation-start')) {
        logoGif.css('backgroundImage', `url("//img1.360buyimg.com/da/jfs/t1/31918/19/6335/274370/5c90a8beEefd9bfb9/e24970e34ce77262.gif?v=${Math.random()}")`)
        logoGif.fadeIn().removeClass('animation-end').addClass('animation-start');
        logoTimer = setTimeout(() => {
            logoDec.fadeIn();
        }, 3500)
        setTimeout(() => {
            logoGif.removeClass('animation-start').addClass('animation-end')
            if (logoGif.hasClass('mouse-leave')) {
                logoGif.fadeOut().removeClass('mouse-leave')
                logoDec.hide();
            }
        }, 6000)
    }  
}).mouseleave(function () {
    if (logoGif.hasClass('animation-end')) {
        logoGif.fadeOut();
        logoDec.hide();
    } else {
        logoGif.addClass('mouse-leave');
    }
})

let searchTimer = null;
const searchInp = $('#search-inp'),
      searchList = $('.search-list');
searchInp.on('input', () => {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => {
        const val = searchInp.val();
        $.ajax({
            method: 'GET',
            url: 'https://suggest.taobao.com/sug',
            data: {
                code: 'utf-8',
                q: val,
                callback: 'csl1'
            },
            dataType: 'jsonp'
        })
    }, 500);
})
function csl1(res) {
    let htmlStr = '';
    res = res.result;
    if (res.length !== 0) {       
        res.forEach((res) => {
            htmlStr += `<li><span class='words'>${res[0]}</span><span class="numbers">约${parseInt(res[1])}件商品</span></li>`
        })
        searchList.show().html(htmlStr);
    }  
}
searchList.on('click', 'li', function() {
    searchInp.val($(this).find('.words').text());
}).mouseleave(function() {
    $(this).fadeOut();
})

const placeHolders = ['海尔空调', '蓝月亮洗手液', '积木', '无线路由器'];
function random(max, min) {
    return parseInt(Math.random() * (max - min) + min)
}
setInterval(() => {
    const random1 = random(0, 5);
    searchInp.attr('placeholder', placeHolders[random1])
}, 4000);

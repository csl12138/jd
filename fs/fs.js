let menuListData = null;
$.ajax({
    type: 'GET',
    url: '../data/fs-menu.json',
    success(res) {
        renderMenu(res)
        menuListData = res;
    }
})

$('.swiper-wrapper>.fs-primary').swiper({
    animateType: 'fade',
    domList: $('.fs-primary>.items'),
    spotPosition: 'left',
    width: 590,
    height: 480
})
$('.swiper-wrapper>.fs-second').swiper({
    animateType: 'fade',
    domList: $('.fs-second>.items'),
    showChangeBtn: 'hover',
    showSpotBtn: false,
    width: 190,
    height: 480,
    duration: 4500
})

const menuList = $(".menu-list").eq(0),
      menu = $(".menu").eq(0);

menu.on("mouseenter", "li", function() {
    $(this).addClass("hover").siblings().removeClass("hover");
    renderMenuList(menuListData[$(this).index()].content);
    menuList.show();
})
$('.fs-left').mouseleave(function() {
    menu.find("li.hover").removeClass("hover");
    menuList.hide();
})

function renderMenu(data) {
    const fragment = $(document.createDocumentFragment());
    data.forEach((item) => {
        const oLi = $('<li></li>');
        let htmlStr = '';
        item.titles.forEach((title, index, self) => {
            if (index === self.length - 1) {
                htmlStr += `<a href="#">${title}</a>`
            } else {
                htmlStr += `<a href="#">${title}/&nbsp</a>`
            }
        })
        oLi.html(htmlStr);
        fragment.append(oLi);
    })
    menu.append(fragment)
}

function renderMenuList(data) {
    let firstLi = '';
    const fragment = $(document.createDocumentFragment());
    data.tabs.forEach((tabs) => {
        firstLi += `<li><a href="#">${tabs} ></a></li>`
    })
    data.subs.forEach((subs) => {
        const oDl = $('<dl class="clear-f"></dl>'),
              oDt = $(`<dt><a href="#">${subs.title} ></a></dt>`),
              oDiv = $(`<div class="dt-container"></div>`);
        let ddStr = '';
        subs.items.forEach((item) => {
            ddStr += `<dd><a href="#">${item}</a></dd>`
        })
        oDiv.html(ddStr);
        oDl.append(oDt).append(oDiv);
        fragment.append(oDl);
    })
    let imgSrc = '';
    data.imgs.forEach((src, index, self) => {
        if (index >= self.length - 2) {
            imgSrc += `<img class="sample" src=${src} alt="">`
        } else {
            imgSrc += `<img class="brand" src=${src} alt="">`
        }
    })
    // 图片
    menuList.find('.right').empty().html(imgSrc);
    // 顶部
    menuList.find('.first-nav').empty().html(firstLi);
    // 主要内容
    menuList.find('.second-nav').empty().append(fragment);
}

const frames = $('.fs-right>.icons>.frame'),
      layer = $('.fs-right>.layer'),
      iframe = layer.find('iframe');
let layerShow = false;
frames.mouseenter(function() {
    if ($(this).find('p').hasClass('layer-on')) {
        return;
    }
    layer.find('.loading').show();
    if (!layerShow) {
        layerShow = true;
        frames.not('.game').css('transform', 'translateY(-35px)');
        if ($(this).hasClass('game')) {
            $(this).css("transform", 'translateY(-95px)')
        }
        layer.css("bottom", "0px")
    }
    $(this).siblings().find('p').removeClass('layer-on').end().end().find('p').addClass('layer-on');   
    iframe.on('load', () => {
        layer.find('.loading').hide();
    })
    iframe.attr('src', 'https://chongzhi.jd.com/jdhome-czindex-2017.html');
})
layer.find('.close-btn').click(function() {
    frames.css('transform', 'translateY(0px)')
    layer.css("bottom", "-215px");
    layerShow = false;
    frames.find('.layer-on').removeClass('layer-on');
})
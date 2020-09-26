/**
 * JQ插件-轮播图
 * @author: csl
 */
$.fn.extend({
    swiperFunc(wrap, {
        animateType = 'animation',
        isAutoChange = true,
        domList = [],
        showChangeBtn = 'always',
        showSpotBtn = true,
        spotPosition = 'center',
        spotStyle = 'sty1',
        width = wrap.width(),
        height = wrap.height(),
        duration = 3000
    }) {
        return class swiperFunc {
            constructor() {
                this.wrapper = wrap,
                    this.animateType = animateType,
                    this.isAutoChange = isAutoChange,
                    this.domList = domList,
                    this.showChangeBtn = showChangeBtn,
                    this.showSpotBtn = showSpotBtn,
                    this.spotPosition = spotPosition,
                    this.spotStyle = spotStyle,
                    this.width = width,
                    this.height = height,
                    this.duration = duration,
                    this.nowIndex = 0,
                    this.len = domList.length,
                    this.timer = null,
                    this.lock = false;
            }
            // 初始化布局
            initLayout() {
                const ul = $("<ul class='csl-ul-wrapper'></ul>"),
                    showChangeBtn = this.showChangeBtn,
                    showSpotBtn = this.showSpotBtn;
                let rbtn, lbtn, circleContainer;

                if (showChangeBtn !== 'none') {
                    rbtn = $("<div class='csl-rbtn csl-btn'>&gt</div>"),
                        lbtn = $("<div class='csl-lbtn csl-btn'>&lt</div>");
                }
                if (showSpotBtn) {
                    circleContainer = $("<div class='csl-circleContainer'></div>");
                }
                for (let i = 0; i < this.len; i++) {
                    const li = $("<li class='csl-li-item'></li>");
                    $(this.domList[i]).appendTo(li);
                    li.appendTo(ul);
                    // 小圆点
                    if (showSpotBtn) {
                        const span = $(`<span class=${this.spotStyle}></span>`);
                        span.appendTo(circleContainer);
                    }
                }
                this.wrapper.append(ul);
                if (showSpotBtn) {
                    this.wrapper.append(circleContainer)
                }
                if (showChangeBtn !== 'none') {
                    this.wrapper.append(rbtn).append(lbtn)
                }
            }
            // 初始化样式
            initStyle() {
                const ul = $('.csl-ul-wrapper', this.wrapper),
                    wrap = this.wrapper;
                $(wrap).css({
                    position: 'relative'
                }).find('.csl-circleContainer').css('textAlign', this.spotPosition);
                if (this.showChangeBtn === 'hover') {
                    wrap.find('.csl-lbtn').css({
                            visibility: 'hidden',
                            opacity: 0
                        })
                        .end().find('.csl-rbtn').css({
                            visibility: 'hidden',
                            opacity: 0
                        });
                    wrap.hover(function () {
                        $(this).find('.csl-lbtn').css({
                                visibility: 'visible',
                                opacity: 1
                            })
                            .end().find('.csl-rbtn').css({
                                visibility: 'visible',
                                opacity: 1
                            });
                    }, function () {
                        $(this).find('.csl-lbtn').css({
                                visibility: 'hidden',
                                opacity: 0
                            })
                            .end().find('.csl-rbtn').css({
                                visibility: 'hidden',
                                opacity: 0
                            });
                    })
                }
                if (this.animateType === 'animation') {
                    const altLi = ul.find('.csl-li-item').eq(0).clone();
                    altLi.insertAfter($('.csl-li-item', this.wrapper).eq(this.len - 1));
                    ul.css({
                        width: this.width * (this.len + 1),
                        height: this.height,
                        position: 'absolute',
                        listStyle: 'none',
                        left: 0,
                        top: 0
                    }).find('.csl-li-item').css('float', 'left')
                } else if (this.animateType === 'fade') {
                    ul.find('.csl-li-item').css('position', 'absolute').hide().eq(this.nowIndex).show();
                }
                $(this.wrapper).find('.csl-circleContainer > span').eq(0).addClass('active');
            }
            // 从左到右轮播，如果->,则nowIndex的下一张出现，为<-，则nowIndex的上一张出现
            move(direction = '->') {
                const ul = $('.csl-ul-wrapper', this.wrapper);
                if (direction === '->') {
                    this.nowIndex++;
                    if (this.nowIndex > this.len) {
                        this.nowIndex = 1;
                        ul.css('left', 0);
                    }
                } else if (direction === '<-') {
                    this.nowIndex--;
                    if (this.nowIndex < 0) {
                        ul.css('left', -this.len * this.width)
                        this.nowIndex = this.len - 1;
                    }
                }
                this.renderCircle(this.nowIndex > this.len - 1 ? 0 : this.nowIndex);
                ul.animate({
                    left: -this.nowIndex * this.width
                }, 300, 'swing', () => {
                    this.lock = false;
                })
            }
            // 淡入淡出轮播，如果->,则nowIndex的下一张淡入，为<-，则nowIndex的上一张淡入
            fade(direction = '->') {
                if (direction === '->') {
                    this.nowIndex = this.nowIndex + 1 > this.len - 1 ? 0 : this.nowIndex + 1;
                } else if (direction === '<-') {
                    this.nowIndex = this.nowIndex - 1 < 0 ? this.len - 1 : this.nowIndex - 1;
                }
                this.renderCircle(this.nowIndex)
                $('.csl-ul-wrapper .csl-li-item', this.wrapper).fadeOut().eq(this.nowIndex).fadeIn(() => {
                    this.lock = false;
                });
            }
            // 渲染小圆点选中时的样式
            renderCircle(nowIndex) {
                if (!showSpotBtn) {
                    return
                }
                $('.csl-circleContainer > span', this.wrapper).removeClass('active').eq(nowIndex).addClass('active');
            }
            // 绑定事件
            bindEvent() {
                $('.csl-lbtn', this.wrapper).on('click', () => {
                    if (!this.lock) {
                        this.lock = true;
                        if (this.animateType === 'animation') {
                            this.move('<-');
                        } else if (this.animateType === 'fade') {
                            this.fade('<-');
                        }
                    }
                })
                $('.csl-rbtn', this.wrapper).on('click', () => {
                    if (!this.lock) {
                        this.lock = true;
                        if (this.animateType === 'animation') {
                            this.move('->');
                        } else if (this.animateType === 'fade') {
                            this.fade('->');
                        }
                    }
                })
                this.wrapper.on('mouseenter', () => {
                    clearInterval(this.timer);
                    this.timer = null;
                })
                this.wrapper.on('mouseleave', () => {
                        this.autoPlay();
                })
                $('.csl-circleContainer span', this.wrapper).on('mouseenter', (e) => {
                    if (!this.lock) {
                        e.stopPropagation();
                        const showIndex = $(e.target).index();
                        if (this.animateType === 'animation') {
                            // 因为move()方法是让当前nowIndex的下一张出现，所以这里我们想让他显示当前选中的图片的话，需要先让nowIndex-1
                            this.nowIndex = showIndex - 1;
                            this.move()
                        } else if (this.animateType === 'fade') {
                            if (this.nowIndex === showIndex) {
                                return;
                            } else {
                                // 因为move()方法是让当前nowIndex的下一张出现，所以这里我们想让他显示当前选中的图片的话，需要先让nowIndex-1
                                this.nowIndex = showIndex - 1;
                            }
                            this.fade();
                        }
                    }
                })
            }
            // 自动轮播
            autoPlay() {
                if (this.isAutoChange) {
                    clearInterval(this.timer);
                    if (this.animateType === 'animation') {
                        this.timer = setInterval(() => {
                            this.move();
                        }, this.duration) 
                    } else if (this.animateType === 'fade') {
                        this.timer = setInterval(() => {
                            this.fade();
                        }, this.duration)
                    }
                }
            }
            // 初始化轮播图
            initAll() {
                this.initLayout();
                this.initStyle();
                this.autoPlay();
                this.bindEvent();
            }
        }
    },

    swiper(config) {
        const swiperConstruct = this.swiperFunc(this, config);
        const swiperObj = new swiperConstruct();
        swiperObj.initAll();
    }
})
import $ from "jquery";
import Swiper from './swiper.js';
import formstyler from './jquery.formstyler.js';
import Masonry from 'masonry-layout';
import filedrag from './filedrag';

window.jQuery = $;
window.$ = $;

require('@fancyapps/fancybox');

$(function() {

    /* - - - Подключение fancybox - - - */
    $('[data-fancybox]').fancybox({
        buttons: [
            "zoom",
            //"share",
            "slideShow",
            "fullScreen",
            //"download",
            //"thumbs",
            "close"
        ]
    });

    // 
    $('.js-auth-check').change(function(){

        $('.window-one__change').addClass('window-one__hide');

        $('#form-' + $(this).val()).removeClass('window-one__hide');
    });

    // Стилизация элементов
    $('select').styler();

	// Прикрепляем шапку
    let headerOffsetTop = $(".main-header").offset().top;

    $(window).scroll(function () {

        let winTop = $(window).scrollTop();

        if (winTop > headerOffsetTop) $(".main-header").addClass("main-header_fixed");
		else $(".main-header").removeClass("main-header_fixed");
    });

    // Меню
    if ($(window).width() < 768)
    {
        $('.menu-main-btn').click(function(){

           // $('.menu-main').css('max-height', $(window).height() - 114);

            $('.menu-main').slideToggle();
        });   
    }

    if ($(window).width() < 992)
    {
        $('.menu-main__lvl1-link_parent').click(function(e){

            e.preventDefault();

            $(this).next('.menu-main__lvl2').slideToggle();
        });
    }

    // Табы #1
    $('.tabs-block-links__link').click(function(){

        var block = $(this).parents('.tabs-block');

        var num = block.find('.tabs-block-links__link').index($(this));

        block.find('.tabs-block-links__link_active').removeClass('tabs-block-links__link_active');

        block.find('.tabs-block-block__inner_active').removeClass('tabs-block-block__inner_active');

        $(this).addClass('tabs-block-links__link_active');

        block.find('.tabs-block-block__inner').eq(num).addClass('tabs-block-block__inner_active');
    });

    // Табы #2
    $('.tabs2-block-links__link').click(function(){

        if ($(this).hasClass('tabs2-block-links__link_disabled')) return false;

        var block = $(this).parents('.tabs2-block');

        var num = block.find('.tabs2-block-links__link').index($(this));

        block.find('.tabs2-block-links__link_active').removeClass('tabs2-block-links__link_active');

        block.find('.tabs2-block-block__inner_active').removeClass('tabs2-block-block__inner_active');

        $(this).addClass('tabs2-block-links__link_active');

        block.find('.tabs2-block-block__inner').eq(num).addClass('tabs2-block-block__inner_active');
    });

    // Раскрытие текста
    $('.js-show-text').click(function(){

        $('#' + $(this).data('id')).slideToggle();

        $(this).toggleClass('btn-link_active');
    });

    // Раскрытие текста в товаре
    $('.js-show-text-two').click(function(){

        $('#' + $(this).data('id')).toggleClass('product-text__text_show');

        $(this).toggleClass('btn-link_active');
    });

    // Показ всех товаров
    $('.js-show-product').click(function(){

        $('.product-list2__item:nth-child(n+4)').toggle();

        $(this).toggleClass('btn-link_active');
    });

    // Главный слайдер
    let intSlideMainCount = $('.slider-main__slide').length;

    let sliderMain = new Swiper('.slider-main__slider', {
        loop: true,
        navigation: {
            prevEl: '.slider-main__prev',
            nextEl: '.slider-main__next',
        },
        pagination: {
            clickable: true,
            el: '.slider-main__pagination',
            bulletClass: 'slider-pagination__point',
            bulletActiveClass: 'slider-pagination__point_active',
        },
    });

    $('.slider-main__count-prev').text(intSlideMainCount + ' / ' + intSlideMainCount);
    $('.slider-main__count-next').text('2 / ' + intSlideMainCount);

    sliderMain.on('slideChange', function () {

        let intActive = sliderMain.activeIndex;

        if (intActive > intSlideMainCount) intActive = intActive - intSlideMainCount;
        
        let intPrev = intActive - 1;
        let intNext = intActive + 1;

        if (intPrev < 1) intPrev = intSlideMainCount + intPrev;
        if (intNext > intSlideMainCount) intNext = intNext - intSlideMainCount;

        $('.slider-main__count-prev').text(intPrev + ' / ' + intSlideMainCount);
        $('.slider-main__count-next').text(intNext + ' / ' + intSlideMainCount);
    });

    // Слайдер как мы работаем
    if ($(window).width() < 992)
    {
        new Swiper('.we-working__slider', {
            loop: true,
            slidesPerView: 1,
            spaceBetween: 20,
            breakpoints: {
                576: {
                    slidesPerView: 2,
                    spaceBetween: 24,
                },
            },
            pagination: {
                clickable: true,
                el: '.we-working__pagination',
                bulletClass: 'slider-pagination__point',
                bulletActiveClass: 'slider-pagination__point_active',
            },
        });
    }

    // Слайдер отзывы
    new Swiper('.review-slider__slider', {
        loop: true,
        loopAdditionalSlides: 1,
        slidesPerView: 1,
        spaceBetween: 75,
        breakpoints: {
            992: {
                slidesPerView: 2,
                spaceBetween: 40,
            },
        },
/*        navigation: {
            prevEl: '.review-slider__prev',
            nextEl: '.review-slider__next',
        },*/
        pagination: {
            clickable: true,
            el: '.review-slider__pagination',
            bulletClass: 'slider-pagination__point',
            bulletActiveClass: 'slider-pagination__point_active',
        },
    });

    // Слайдер клиенты
    new Swiper('.client-slider__slider', {
        loop: true,
        loopAdditionalSlides: 1,
        slidesPerView: 1,
        spaceBetween: 10,
        breakpoints: {
            576: {
                slidesPerView: 3,
                spaceBetween: 10,
            },
            992: {
                slidesPerView: 5,
                spaceBetween: 10,
            },
        },
        pagination: {
            clickable: true,
            el: '.client-slider__pagination',
            bulletClass: 'slider-pagination__point',
            bulletActiveClass: 'slider-pagination__point_active',
        },
    });

    // Слайдер новостей
    let intDelete = 3;

    if ($(window).width() < 576)
    {
        intDelete = 1;
    }
    else if ($(window).width() < 992)
    {
        intDelete = 2;
    }

    let intSliderNewsCount = Math.ceil($('.news-slider__slide').length / intDelete);

    $('.news-slider__count').text('1 / ' + intSliderNewsCount);

    let sliderNews = new Swiper('.news-slider__slider', {
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: 20,
        breakpoints: {
            576: {
                slidesPerView: 2,
                slidesPerGroup: 2,
                spaceBetween: 30,
            },
            992: {
                slidesPerView: 3,
                slidesPerGroup: 3,
                spaceBetween: 25,
            },
        },
        navigation: {
            prevEl: '.news-slider__prev',
            nextEl: '.news-slider__next',
            disabledClass: 'str-disabled'
        },
        on: {
            imagesReady: function () {

                let intSliderNewsElemHeight = 0;

                $('.news-slider__item').each(function(){

                    if ($(this).height() > intSliderNewsElemHeight)
                    {
                        intSliderNewsElemHeight = $(this).height();
                    }
                });

                $('.news-slider__item').height(intSliderNewsElemHeight);
            },
            slideChange: function () {

                $('.news-slider__count').text(Math.ceil(sliderNews.activeIndex / intDelete + 1) + ' / ' + intSliderNewsCount);
            },
        }
    });

    // Cлайдер страница Product
    let galleryThumbs = new Swiper('.slider-product-thumbs__slider', {
		spaceBetween: 10,
		slidesPerView: 4,
		freeMode: true,
		watchSlidesVisibility: true,
		watchSlidesProgress: true,
	});

    let intSlideProductCount = $('.slider-product__slide').length;

    let sliderProduct = new Swiper('.slider-product__slider', {
        loop: true,
        spaceBetween: 10,
        navigation: {
            prevEl: '.slider-product__prev',
            nextEl: '.slider-product__next',
        },
		thumbs: {
			swiper: galleryThumbs,
			slideThumbActiveClass: 'slider-product-thumbs__item_active',
		},
        pagination: {
            clickable: true,
            el: '.slider-product__pagination',
            bulletClass: 'slider-pagination__point',
            bulletActiveClass: 'slider-pagination__point_active',
        },
    });

    //sliderProduct.controller.control = galleryThumbs;

    $('.slider-product__count-prev').text(intSlideProductCount + ' / ' + intSlideProductCount);
    $('.slider-product__count-next').text('2 / ' + intSlideProductCount);

    sliderProduct.on('slideChange', function () {

        let intActive = sliderProduct.activeIndex;

        if (intActive > intSlideProductCount) intActive = intActive - intSlideProductCount;
        
        let intPrev = intActive - 1;
        let intNext = intActive + 1;

        if (intPrev < 1) intPrev = intSlideProductCount + intPrev;
        if (intNext > intSlideProductCount) intNext = intNext - intSlideProductCount;

        $('.slider-product__count-prev').text(intPrev + ' / ' + intSlideProductCount);
        $('.slider-product__count-next').text(intNext + ' / ' + intSlideProductCount);
    });

    // Слайдер Faq
    let intDeleteFaq = 3;

    if ($(window).width() < 992)
    {
        intDeleteFaq = 1;
    }

    let intSliderFaqCount = Math.ceil($('.slider-faq__slide').length / intDeleteFaq);

    $('.slider-faq__count').text('1 / ' + intSliderFaqCount);

    let sliderFaq = new Swiper('.slider-faq__slider', {
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: 20,
        breakpoints: {
            992: {
                slidesPerView: 3,
                slidesPerGroup: 3,
                spaceBetween: 25,
            },
        },
        navigation: {
            prevEl: '.slider-faq__prev',
            nextEl: '.slider-faq__next',
            disabledClass: 'str-disabled'
        },
        on: {
            slideChange: function () {

                $('.slider-faq__count').text(Math.ceil(sliderFaq.activeIndex / intDeleteFaq + 1) + ' / ' + intSliderFaqCount);
            },
        }
    });

    $('.slider-faq__name').click(function(){

        $(this).next('.slider-faq__text').slideToggle();
    });

    // Cлайдер отзывов
    new Swiper('.review-slider2', {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        pagination: {
            clickable: true,
            el: '.review-slider2__pagination',
            bulletClass: 'slider-pagination__point',
            bulletActiveClass: 'slider-pagination__point_active',
        },
    });

    // Установка рейтинга в форме отзыва
    $('.js-set-rating').click(function(){

        $('.star-line_set').removeClass('star-line_set');
        $(this).addClass('star-line_set');

        $('#' + $(this).data('input')).val($(this).data('value'));
    });

    // Табы на мобилке (product-calc)
	function changeTab(tabId) {
        $('.product-calc-tabs__link_active').removeClass('product-calc-tabs__link_active');
		$('.product-calc-tabs__link[href="' + tabId + '"]').addClass('product-calc-tabs__link_active');

        $('.product-calc__part_active').removeClass('product-calc__part_active');
		$(tabId).addClass('product-calc__part_active');

		let positionTop = $(".product-calc-tabs").offset().top - ($('.main-header').outerHeight() + 5);
		$('html').animate({
				scrollTop: positionTop
			}, 200
		);
	}

    $('.product-calc-tabs__link').click(function(){
		changeTab($(this).attr('href'));

        return false;
    });

	$('.product-calc__btn--change-tab').on('click', function() {
		let currentTab = $(".product-calc-tabs__link_active");
		let changeTo = $(this).data("changeTo");
		let nextTab;

		if (changeTo === "next") {
			nextTab = currentTab.next();
		} else if (changeTo === "prev") {
			nextTab = currentTab.prev();
		}

		nextTab.trigger("click");
	})

    // Наш инстаграм
    new Swiper('.our-ig__slider', {
        slidesPerView: 2,
        loop: true,
        breakpoints: {
            575: {
                slidesPerView: 3,
            },
            767: {
                slidesPerView: 4,
            },
            1280: {
                slidesPerView: 5,
            },
            1600: {
                slidesPerView: 6,
            },
        },
    });

    // Faq
    $('.faq-list__link').click(function(){

        $(this).toggleClass('faq-list__link_active');

        $(this).next().slideToggle();
    });

    // Наша команда
    new Swiper('.about-team__slider', {
        slidesPerView: 1,
        spaceBetween: 40,
        loop: true,
        breakpoints: {
            576: {
                slidesPerView: 2,
            },
            992: {
                slidesPerView: 3,
            },
            1150: {
                slidesPerView: 4,
            },
        },
        pagination: {
            clickable: true,
            el: '.about-team__pagination',
            bulletClass: 'slider-pagination__point',
            bulletActiveClass: 'slider-pagination__point_active',
        },
    });

    // Показ кнопок на странице Product после расчета
    $('body').on("click", ".js-show-basket", function() {

        $('.product-select__price_active').removeClass('product-select__price_active');

        $(this).addClass('product-select__price_active');

        $('.product-calc__btn').addClass('d-none');

        $('#btn-show-basket').removeClass('d-none');
    });

    $('body').on("click", ".js-show-order", function() {

        $('.product-select__price_active').removeClass('product-select__price_active');

        $(this).addClass('product-select__price_active');

        $('.product-calc__btn').addClass('d-none');

        $('#btn-show-order').removeClass('d-none');
    });

    // Оформление заказа (шаги, кнопка "Изменить")
    $('.basket-main__action-link').on('click', function(){

        $('.basket-main__block_active').removeClass('basket-main__block_active');

        var elem = $(this).parents('.basket-main__block');

        elem.addClass('basket-main__block_active');

        $('html, body').animate({

            scrollTop: elem.offset().top - 110

        }, 500);
    });

    $('.js-basket-next').on('click', function(){

        $('.basket-main__block_active').removeClass('basket-main__block_active');

        var elem = $(this).parents('.basket-main__block').next('.basket-main__block');

        elem.addClass('basket-main__block_active');

        $('html, body').animate({

            scrollTop: elem.offset().top - 110

        }, 500);
    });

    // Оформление заказа (доставка, выбор способа доставки)
    $('.delivery-method__link').click(function(){

        $('.delivery-method__link_active').removeClass('delivery-method__link_active');

        $(this).addClass('delivery-method__link_active');

        $('.delivery-method-choice_active').removeClass('delivery-method-choice_active');

        $('#' + $(this).data('id')).addClass('delivery-method-choice_active');
    });

    // Оформление заказа (доставка, выбор доставки)
    $('.delivery-line').click(function(){

        $('.delivery-line_active').removeClass('delivery-line_active');

        $(this).addClass('delivery-line_active');

        $('.delivery-block_active').removeClass('delivery-block_active');

        $(this).next('.delivery-block').addClass('delivery-block_active');
    });

    // Оформление заказа (отправить другу)
    $('.send-friend').click(function(){

        $(this).toggleClass('send-friend_active');

        $('.send-friend-form').slideToggle()
    });

    // Оформление заказа (юр лицо скрыть)
    $('.js-payer-hide').click(function(){

        $('.basket-payer-form').slideUp()
    });

    // Оформление заказа (юр лицо показать)
    $('.js-payer-show').click(function(){

        $('.basket-payer-form').slideDown()
    });

    $('.tool-block-activate').on('mouseenter mouseleave', function(event) {
        let isModalShow = event.type === 'mouseenter';
        let $toolBlock = $(this);
        let $toolModal = $toolBlock.find('.tool-block');

        if ($toolModal.hasClass('tool-block_adaptive')) {
            let toolModalHeight = $toolModal.outerHeight() + 45;
            let toolBlockTop = $toolBlock.offset().top;
            let windowScrollTop = $(window).scrollTop();
            let mainHeaderHeight = $('.main-header').outerHeight();
            let isEnoughSpaceInTop = toolBlockTop - (windowScrollTop + mainHeaderHeight) > toolModalHeight;

            $toolModal.toggleClass('tool-block_top', isEnoughSpaceInTop);
        }

        $toolModal.toggleClass('tool-block_active', isModalShow);
    });
});

$(window).bind('load', function() {

    // Расположение блоков
    if ($('.grid').length > 0 && $(window).width() > 575)
    {
        new Masonry('.grid', {
            itemSelector: '.grid-item',
            percentPosition: true
        });
    }

    $('body').removeClass('preloader-set');
});
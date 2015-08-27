define(function(){
	"use strict";

	//swipe module
	var Swipe = function(select, options){}
	
	var defaults = {
    	container : '.swiper-wrapper',
    	swipeWrap : '.swiper',
    	indicatorWrap : '.swiper-pagination',
    	indicatorIS : true,
    	indicatorDom : '<span></span>',
    	indicatorActiveClass : 'on',
    	listPerView : 1,
    	autoLoopIS : false,
    	autoLoopTime:5000,
    	duration : 500
    };

	var opts = $.extend({}, defaults, options);
	var _that = this;
	var $container = $(select)[0] === $(opts.container)[0] ? $(select) : $(select).find(opts.container);
	var $swiperWrap = $container.find(opts.swipeWrap);
	var $swiper = $swiperWrap.children();
	var $indicatorWrap = $(select).find(opts.indicatorWrap);
	var $indicator = null;
	var swipeLen = $swiper.length;
	var counter = 0;
	var globalIndex = 0;
	var indicatorIndex = 0;
	var oddIS = (swipeLen%2 != 0) ? true : false;
	var arrPos = [];
	var radius = Math.floor(swipeLen / 2);
	var sw, sh, swipeWidth, swipeHeight, turnPoint, autoInterval, translate;
	var startX, startY, endX, endY, distX, distY, touchPos;
	var bubbleIS = true;
	var duration = 0;
	
	Swipe.prototype = {
		init:function(){
			var that = this;
			duration = support.transforms3d || support.transforms ? opts.duration * 0.001 : opts.duration;
			if(opts.indicatorIS) that.addIndicator();
			that.setup();
			that.autoLoop(true);
			that.addEvent();
		},
		setup:function(){
			var that = this;
			var translate;

			swipeWidth = $swiperWrap.width();
			$swiper.css({width:swipeWidth});
			swipeHeight = $swiper.first().height();
			$swiperWrap.css({height:swipeHeight});

			turnPoint = swipeWidth*radius;

			for(var i=0; i<swipeLen; i++){
				arrPos[i] = counter;
				if(i == radius){
					if(oddIS) counter = counter + swipeWidth;
					counter = -counter;
				}
				counter += swipeWidth;

				support.setDisplay($swiper.eq(i), i);
				slideForTransition($swiper.eq(i), i, 0);
			}
		},
		addEvent:function(){
			var that = this;

			if(support.touch){
				support.addEvent($container[0], 'touchstart', onTouchStart);
				support.addEvent($container[0], 'touchmove', onTouchMove);
				support.addEvent($container[0], 'touchend', onTouchEnd);
				support.addEvent($container[0], 'touchcancel', onTouchCancel);
			}else{
				support.addEvent($container[0], 'mousedown', onTouchStart);
			}
		},
		addIndicator:function(){
			var that = this;
			var indiTxt = '';

			for(var i=0; i<swipeLen; i++){
				indiTxt += opts.indicatorDom;
			}

			$indicatorWrap.append(indiTxt);
			$indicator = $indicatorWrap.children();
			$indicator.eq(globalIndex).addClass(opts.indicatorActiveClass);

			$indicator.each(function(i){
				support.addEvent($(this)[0], 'click', function(e){
					if(!$(this).hasClass(opts.indicatorActiveClass)){
						$(this).addClass(opts.indicatorActiveClass);
						globalIndex = $(this).index();
						that.active();
						support.setIndicatorActive(globalIndex);
					}
				});
			});
		},
		active:function(){
			var posIndex, zindex;

			for(var i=0; i<swipeLen; i++){
				posIndex = i - globalIndex;
				if(posIndex < 0) {
					posIndex = i - globalIndex + swipeLen;
				}else{
					posIndex = i - globalIndex;
				}

				//duration = (Math.abs(arrPos[posIndex]) == turnPoint) ? '0s':'0.5s';
				support.setDisplay($swiper.eq(i), posIndex);
				slideForTransition($swiper.eq(i), posIndex, duration);
			}

			if(opts.indicatorIS) support.setIndicatorActive(globalIndex);
		},
		nextSlide:function(){
			var that = this;
			globalIndex++;
			if(globalIndex >= swipeLen) globalIndex = 0;
			that.active();
		},
		prevSlide:function(){
			var that = this;
			globalIndex--;
			if(globalIndex < 0) globalIndex = swipeLen - 1;
			that.active();
		},
		resize:function(){
			var that = this;
			$swiper.removeAttr('style');

			counter = 0;
			globalIndex = 0;
			arrPos = [];
			
			that.setup();
		},
		destroy:function(){
			var that = this;
			if(support.touch){
				support.removeEvent($container[0], 'touchstart', onTouchStart);
				support.removeEvent($container[0], 'touchmove', onTouchMove);
				support.removeEvent($container[0], 'touchend', onTouchEnd);
				support.removeEvent($container[0], 'touchcancel', onTouchCancel);
			}else{
				support.removeEvent($container[0], 'mousedown', onTouchStart);
			}
		},
		autoLoop:function(type){
			if(opts.autoLoopIS){
				var that = this;
				if(type){
					autoInterval = setInterval(function(){
						that.nextSlide();
					}, opts.autoLoopTime);
				}else{
					clearInterval(autoInterval);
				}
			}
		}
	}

	Swipe.prototype.constructor = Swipe;

	function slideForTransition($target, index, fps){
		if(support.transforms3d || support.transforms){
			if(support.transforms3d) translate = "translate3d(" + (arrPos[index]) + "px,0,0)";
			if(support.transforms) translate = "translate(" + (arrPos[index]) + "px,0)";
			$target.css({"zIndex":support.getZindex(index), "-moz-transition-duration": fps+'s', "-moz-transform": translate, "-ms-transition-duration": fps+'s', "-ms-transform": translate, "-webkit-transition-duration": fps+'s', "-webkit-transform": translate, "transition-duration": fps+'s', "transform": translate});
		}else{
			$target.stop().animate({'left':arrPos[posIndex]}, fps);
		}
	}

	function onTouchStart(e){
		var touchobj = (support.touch) ? e.touches[0] : e;
		startX = touchobj.clientX;
		startY = touchobj.clientY;

		if(!support.touch){
			support.addEvent(document, 'mousemove', onTouchMove);
			support.addEvent(document, 'mouseup', onTouchEnd);
			e.preventDefault();
		}

		_that.autoLoop(false);
	}

	function onTouchMove(e){
		var touchobj = (support.touch) ? e.touches[0] : e;
		var posIndex, translate;

		distX = startX - parseInt(touchobj.clientX);
		distY = startY - parseInt(touchobj.clientY);
		touchPos = distX;

		for(var i=0; i<swipeLen; i++){
			posIndex = i - globalIndex;
			if(posIndex < 0) {
				posIndex = i - globalIndex + swipeLen;
			}else{
				posIndex = i - globalIndex;
			}

			if(support.transforms3d){
				translate = "translate3d(" + (arrPos[posIndex] - touchPos) + "px,0,0)";
				$swiper.eq(i).css({"-moz-transition-duration": "0s", "-moz-transform": translate, "-ms-transition-duration": "0s", "-ms-transform": translate, "-webkit-transition-duration": "0s", "-webkit-transform": translate, "transition-duration": "0s", "transform": translate});
			}else{
				$swiper.eq(i).css({'left':arrPos[posIndex] - touchPos});
			}
		}

		if(Math.abs(distX) < Math.abs(distY) && bubbleIS){
			if(support.touch) support.removeEvent($container[0], 'touchmove', onTouchMove);
		}else{
			bubbleIS = false;
			e.preventDefault();
		}
	}

	function onTouchEnd(e){
		if(touchPos > 20 && !bubbleIS) _that.nextSlide();
		if(touchPos < -20 && !bubbleIS) _that.prevSlide();
		if(touchPos < 20 && touchPos > -20 && !bubbleIS) _that.active();
		if(touchPos < 5 && touchPos > 5  && !bubbleIS) return true;

		bubbleIS = true;
		if(support.touch){
			support.addEvent($container[0], 'touchmove', onTouchMove);
		}else{
			support.removeEvent(document, 'mousemove', onTouchMove);
			support.removeEvent(document, 'mouseup', onTouchEnd);

			e.preventDefault();
		}

		_that.autoLoop(true);
	}

	function onTouchCancel(e){
		console.log('touchcancel');
	}


	var support = {
		addEvent:function($target, evt, func){
			if(window.addEventListener || document.addEventListener){
				$target.addEventListener(evt, func);
			}else{
				$target.attachEvent('on'+ evt, func);
			}
		},
		removeEvent:function($target, evt, func){
			if(window.addEventListener){
				$target.removeEventListener(evt, func);
			}else{
				$target.detachEvent('on'+ evt, func);
			}
		},
		getZindex:function(index){
			return (Math.abs(arrPos[index]) == 0) ? 10 : 1;
		},
		setIndicatorActive : function(index){
			$indicator.eq(indicatorIndex).removeClass(opts.indicatorActiveClass);
			indicatorIndex = index;
			$indicator.eq(indicatorIndex).addClass(opts.indicatorActiveClass);
		},
		setDisplay : function($target, index){
			if(index >= 0 && index <= opts.listPerView || index >= swipeLen-(opts.listPerView+1) && index <= swipeLen-1){
				$target.css({'display':'block'});
			}else{
				$target.css({'display':'none'});
			}
		},
        touch : (window.Modernizr && Modernizr.touch === true) || (function () {
            'use strict';
            return !!(('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch);
        })(),

        transforms3d : (window.Modernizr && Modernizr.csstransforms3d === true) || (function () {
            'use strict';
            var div = document.createElement('div').style;
            return ('webkitPerspective' in div || 'MozPerspective' in div || 'OPerspective' in div || 'MsPerspective' in div || 'perspective' in div);
        })(),

        transforms : (window.Modernizr && Modernizr.csstransforms === true) || (function () {
            'use strict';
            var div = document.createElement('div').style;
            return ('transform' in div || 'WebkitTransform' in div || 'MozTransform' in div || 'msTransform' in div || 'MsTransform' in div || 'OTransform' in div);
        })(),

        transitions : (window.Modernizr && Modernizr.csstransitions === true) || (function () {
            'use strict';
            var div = document.createElement('div').style;
            return ('transition' in div || 'WebkitTransition' in div || 'MozTransition' in div || 'msTransition' in div || 'MsTransition' in div || 'OTransition' in div);
        })()
    }

	return Swipe;
});
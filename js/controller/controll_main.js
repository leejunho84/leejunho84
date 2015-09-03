define(['Base', 'modules/module_colorPicker', 'modules/module_swipe', 'modules/module_carousel'], function(Base, ColorPicker, Swipe, Carousel){
	"use strict";
    
    //colorPicker
    var arrColor = ['#FF0000', '#FF00F7', '#0000FF', '#00FFFF', '#00FF00', '#FFFF00', '#FF0000'];
    var colorPicker = new ColorPicker('.colorMixerSect', arrColor, 10).init().addSlider();

    //swiper carousel
    var swipes = new Swipe($('.swiper-container')).init();
    var carousel = new Carousel($('.carousel')).init();

    //circle Illusion
    var $circleCon = $('#circle');
    var $circle = $circleCon.children();
    var len = $circle.length * 2;
    var rw = ($circleCon.width() / 2);
    var rh = ($circleCon.height() / 2);
    var arrPos = [];
    var counter = 0;

    $circle.each(function(i){
        var radian = (360 / len) * i * Math.PI/180;
        var posX = Math.round(rw * Math.cos(radian));
        var posY = Math.round(rh * Math.sin(radian));
        var array = [];
        array[0] = posX;
        array[1] = posY;
        arrPos.push(array);
    });

    function active($target, posX, posY, duration, index){
        var translate = null;
        var timer = null;
        if(Base.support.transforms3d || Base.support.transforms){
            if(Base.support.transforms) translate = 'translate(' + posX + 'px,' + posY + 'px)';
            if(Base.support.transforms3d) translate = 'translate3d(' + posX + 'px, ' + posY + 'px, 0)';

            $target.css({
                '-moz-transition': 'all ' + duration + 's', 
                '-moz-transform': translate, 
                '-ms-transition': 'all ' + duration + 's', 
                '-ms-transform': translate, 
                '-webkit-transition': 'all ' + duration + 's', 
                '-webkit-transform': translate, 
                'transition': 'all ' + duration + 's', 
                'transform': translate
            });
        }else{
            $target.stop().animate({'left':posX, 'top':posY}, duration);
        }

        arrPos[index][0] = -posX;
        arrPos[index][1] = -posY;
    }


    animate();
    function animate(){
        if(counter > $circle.length - 1) counter = 0;
        active($circle.eq(counter), arrPos[counter][0], arrPos[counter][1], 4, counter);
        counter++;
        setTimeout(animate, 400);
    }


    //PC & MOBILE
    if(Base.agentChk.getDevice() == 'MOBILE'){
        
    }else if(Base.agentChk.getDevice() == 'PC'){
        
    }


    var Main = function(){}
    Main.prototype = {
        resize:function(e){
            var docWidth = $(document).width();
            swipes.resize();
        }
    }

    Main.prototype.constructor = Main;

    return Main;
});






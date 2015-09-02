define(['Base', 'modules/module_colorPicker', 'modules/module_swipe', 'modules/module_carousel'], function(Base, ColorPicker, Swipe, Carousel){
	"use strict";
    
    //colorPicker
    var arrColor = ['#FF0000', '#FF00F7', '#0000FF', '#00FFFF', '#00FF00', '#FFFF00', '#FF0000'];
    var colorPicker = new ColorPicker('.colorMixerSect', arrColor, 10).init().addSlider();

    //swiper carousel
    var swipes = new Swipe($('.swiper-container')).init();
    var carousel = new Carousel($('.carousel')).init();



    //
    /*$("#date").click(function(e){
        var $that = $(this);
        var replaceTxt = '';
        var focusIndex = 0;

        setTimeout(function(){
            focusIndex = e.target.selectionStart;
            replaceTxt = $that.val().charAt(focusIndex);
        }, 10);

        $(this).keypress(function(e){
           e.stopPropagation();
        });

        $(this).keyup(function(e){
            var currentVal = $(this).val();

            $(this).val(currentVal.replace(replaceTxt, ''));
            e.target.selectionStart = focusIndex;
            e.target.selectionEnd = focusIndex;
            replaceTxt = $that.val().charAt(focusIndex);
        });
    });

    $('textarea').focusout(function(e){
        $(this).off('keyup');
    });*/


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






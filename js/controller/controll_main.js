define(['Base', 'modules/module_colorPicker', 'modules/module_swipe', 'modules/module_carousel', 'modules/module_illusionCircle'], function(Base, ColorPicker, Swipe, Carousel, Illusion){
	"use strict";
    
    //colorPicker
    var arrColor = ['#FF0000', '#FF00F7', '#0000FF', '#00FFFF', '#00FF00', '#FFFF00', '#FF0000'];
    var colorPicker = new ColorPicker('.colorMixerSect', arrColor, 10).init().addSlider();

    //swiper carousel
    var swipes = new Swipe($('.swiper-container')).init();
    var carousel = new Carousel($('.carousel')).init();
    //var illusion = new Illusion('#circle').init();
    

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






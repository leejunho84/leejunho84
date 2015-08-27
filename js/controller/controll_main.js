define(['Base', 'modules/module_colorPicker'], function(Base, ColorPicker){
	"use strict";
    
    //colorPicker
    var arrColor = ['#FF0000', '#FF00F7', '#0000FF', '#00FFFF', '#00FF00', '#FFFF00', '#FF0000'];
    var colorPicker = new ColorPicker('.colorMixerSect', arrColor).init().addSlider();

    //PC & MOBILE
    if(Base.agentChk.getDevice() == 'MOBILE'){
        
    }else if(Base.agentChk.getDevice() == 'PC'){
        
    }


    var Main = function(){}
    Main.prototype = {
        resize:function(e){
            var docWidth = $(document).width();
            console.log(docWidth);
        }
    }

    Main.prototype.constructor = Main;

    return Main;
});
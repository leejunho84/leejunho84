define(
    [
        'Base', 
        'modules/module_colorPicker',
        'modules/module_swipe',
        'modules/module_carousel',
        'modules/module_illusionCircle',
        'modules/module_pagiNation',
        'modules/module_freeLayer',
        'modules/module_canvas',
        'modules/module_coverFlowCounter'
    ], function(Base, ColorPicker, Swipe, Carousel, Illusion, PagiNation, FreeLayer, Canvas, CoverFlowCounter){
        
	"use strict";
    
    //colorPicker
    //var arrColor = ['#6F62A6', '#B3BF81', '#4F8D9B', '#8D5337', '#DEBA8E', '#9A6A82', '#49DBA8'];
    var arrColor = ['#f7a2c9','#dea6d1','#c5aad8','#a3b2e3','#93b8ea','#7fbeec','#74c1e2','#74c1e2','#70c5c1','#70caac','#77ca98','#8ac692','#a0c485','#b4cb7e','#c8cf7b','#d9c977','#ecba75','#faad75','#faa585','#fa9f9a'];
    var colorPicker = new ColorPicker('.colorMixerSect', arrColor, 5).init().addSlider();

    //swiper carousel
    var swipes = new Swipe($('.swiper-container')).init();
    var carousel = new Carousel($('.carousel')).init();
    var illusion = new Illusion('#circle');


    //pagiNation
    var pagiNation = new PagiNation('.paging', {
        totalList:1000,
        pagePerView:30,
        pagePerBlock:10,
        onPageChangeStart:function(pagiNation){
            console.log('currentPage : ' + pagiNation.getCurrentPage());
            pagiNation.setPaging();
        }
    }).init();  



    //finterest freeLayer
    var freeLayer = new FreeLayer();
    freeLayer.setLayerOptions({
        lineNum : 3,
        listMargin: 10
        //container : '.container',
        //list : '.list',
        //listWidth : 280, 
    }).init('.free-layer-box').setLayerPos();



    //coverFlow Number
    var coverFlowCounter = new CoverFlowCounter('.coverflow-counter__wrap');


    //canvas
    var canvas = new Canvas().init();
    var btn = document.getElementsByTagName('button');
    for(var i=0; i<btn.length; i++){
        btn[i].addEventListener('click', function(e){
            switch(this.getAttribute('data-type')){
                case 'start':
                    canvas.start();
                    break;
                case 'stop':
                    canvas.stop();
                    break;
                case 'particle':
                    canvas.particle();
                    break;
                case 'delete':
                    canvas.clearAnimate();
                    break;
            }
        });
    }


    //막대 그래프
    var $graphWrap = $('.graph__wrap')
    var maxValue = $graphWrap.attr('aria-maxvalue');
    var maxValue1 = 400;
    $('.graph__button').click(function(e){
        e.preventDefault();
        console.log('asdf');
        $graphWrap.find('.graph__line').each(function(i){
            var $this = $(this);
            var value = $this.attr('aria-value');
            var percent = Math.round((value/maxValue)*100);
            var height = Math.round((maxValue/100)*percent);
            var percent1 = Math.round((height/maxValue1)*100);
            $this.css({'left':40 * i});

            console.log(percent + '%, ' +height + 'px, ' + percent1 + '%');

            $this.css({'height':0}).stop().animate({'height':percent+'%'}, 1000, function(){
                console.log('complete');
            });
        });
    });


    //PC & MOBILE
    if(Base.agentChk.getDevice() == 'MOBILE'){
        
    }else if(Base.agentChk.getDevice() == 'PC'){
        
    }


    var Main = function(){};
    Main.prototype.resize = function(e){
        //var docWidth = $(document).width();
        //swipes.resize();
    };

    return Main;
});






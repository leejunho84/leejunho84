var initSetObj = {
    page:'main',
    cookie:'main'
}

requirejs.config({
    baseUrl:'js',
    paths: {
        'jquery':'lib/jquery/jquery',
        'lazy':'lib/jquery/jquery-lazy',
        'jqueryTmpl':'lib/jquery/jquery.tmpl.min',
        'idangerSwiper':'lib/idangerous/idangerous_2.5.5',
        'iscroll':'lib/iscroll/iscroll_5.1.1',
        'Base':'common/base',
        'PlugIn':'common/plugin',
        'Common':'controller/controll_common',
        'controll_main':'controller/controll_main',
    },
    shim:{
        'lazy':{
            deps:['jquery'],
            exports:'lazy'
        },
        'PlugIn':{
            deps:['idangerSwiper', 'iscroll', 'jquery'],
            exports:'PlugIn'
        }
    }
});

require(
    [
        'Common', 
        'controll_' + initSetObj.page
    ],
    function(Common, Templete){
        "use strict";

        var common = new Common();
        var page = new Templete();

        //common Event
        $(window).on({
            resize:function(e){
                page.resize();
            },
            scroll:function(){
                common.scroll();
            }
        });

        $(window).trigger('scroll');


        $(document).on('touchend', function(e){
            common.touchend();
        });
    }
);
define(['Base'], function(Base){

	"use strict";

	if(!Array.prototype.repeat){
		Array.prototype.repeat = function(defult){
			var len = this.length;
			while(len){
				this[--len] = defult;
			}
			return this;
		}
	}

	var freeLayerOption = {
		container : '.container',
		list : '.list',
		lineNum : 3,
		listWidth : 280,
		listMargin: 20,
		startPosY : 0
	}

	var FreeLayer = function(){}
	FreeLayer.prototype.init = function(selector){
		var _that = this;
		_that.$target = $(selector);
		_that.$container = _that.$target.find(freeLayerOption.container);
		_that.$list = _that.$target.find(freeLayerOption.list);
		_that.listTotalNum = _that.$list.length;
		return _that;
	}
	FreeLayer.prototype.setLayerPos = function(){
		var _that = this;
		var arrHeight = new Array(freeLayerOption.lineNum).repeat(freeLayerOption.startPosY);


		_that.$list.each(function(i){
			var index = _that.getArrIndex(arrHeight, i);

			$(this).css({'top':arrHeight[index], 'left':(index * (freeLayerOption.listWidth + freeLayerOption.listMargin))});
			arrHeight[index] = arrHeight[index] + $(this).height() + freeLayerOption.listMargin;			
		});

		return _that;
	}
	FreeLayer.prototype.setLayerOptions = function(param){
		for(var key in param){
			freeLayerOption[key] = param[key];
		}
		return this;
	}
	FreeLayer.prototype.getArrIndex = function(arr, i){
		var index = 0;
		var minPos = arr[0];
		if(i >= freeLayerOption.lineNum){
			for(var key in arr){				
				if(minPos > arr[key]){
					minPos = arr[key];
					index = key;
				}
			}
		}else{
			index = i;
		}

		return index;
	}

	return FreeLayer;
});
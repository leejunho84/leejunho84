define(['jquery'], function($){
	var template = '<span class="num">{{count}}</span>';
	var pattern = /{{count}}/g;

	var CoverflowCounter = function(selector){
		var _that = this;
		_that.$that = $(selector);
		_that.target = _that.$that.find('em.coverflow-counter__total');
		_that.totalCount = _that.$that.attr('data-count');
		_that.init();
		return _that;
	}

	CoverflowCounter.prototype.init = function(){
		var _that = this;
		_that.target.empty();

		var totalNum = _that.totalCount.length;
		var totalCount = _that.totalCount.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
		_that.target.append(template.replace(pattern, totalCount));

		return this;
	}
	CoverflowCounter.prototype.start = function(){
		var _that = this;
		$that.fadeIn('slow', function(){
			_that.active();
		});
	}
	CoverflowCounter.prototype.active = function(){
		var _that = this;
		_that.target.children().each(function(i){
			var count = _that.totalCount.charAt(i);
			$(this).stop().delay(i * 100).animate({backgroundPositionY:-(15*count)}, 1000);
		});

		setTimeout(function(){
			_that.destroy();
		}, 4000);

		return _that;
	}
	CoverflowCounter.prototype.destroy = function(){
		var _that = this;
		$that.stop().fadeOut('slow', function(){
			_that.target.children().each(function(i){
				$(this).removeAttr('style');
			});
		});
		return _that;
	}

	return CoverflowCounter;
});
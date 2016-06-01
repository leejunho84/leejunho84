define(function(){
	var aDom = '<div data-_.bltthgno="466" class="talk-item"><div class="itemWrap"><p><span>span<img src="http:www.naver.com" /></span></p></div></div>';
	var bDom = '<div data-bltthgno="465" class="talk-item"></div>';


	function comparator(dom){
		var compara = dom.match(/<[a-z]+[^>]*>|<\/[a-z]+>/g);
		return compara;
	}

	window.diff = comparator;
});
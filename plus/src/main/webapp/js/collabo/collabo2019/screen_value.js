function getScrollBody() {
	return $(window);
}

/*
 * 현재 윈도우 창의 가로, 세로 길이
 */
function fn_getWindowSize() {
	var WindowSize = {};
	WindowSize.width = $(window).width();
	WindowSize.height = $(window).height();
	return WindowSize;
}

/*
 * 현재 문서의 브라우저의 가로, 세로 길이
 */
function fn_getBrowserSize() {
	var BrowserSize = {};

	BrowserSize.width = document.body.scrollWidth;
	BrowserSize.height = document.body.scrollHeight;
	return BrowserSize;
}

/*
 * 현재 스크롤의 위치
 */
function fn_getScrollPosition() {
	var Position = {};

	if (window.pageYOffset) {
		Position.y = window.pageYOffset;
		Position.x = window.pageXOffset;
	} else {
		Position.y = $(window).scrollTop();
		Position.x = $(window).scrollLeft();
	}
	return Position;
}

/*
 * 스크롤이 TOP 에서 얼마나 떨어져 있나 체크
 */
function fn_getScrollTopPosition() {
	var Browser = cmf_browser();
	if (Browser.ieYn) {
		// return Math.ceil($(document).find("body").scrollTop());
		return Math.ceil($(window).scrollTop());
	} else if (Browser.edge) {
		//Microsoft Edge버그로 인하여 +1 함
		return Math.ceil($(window).scrollTop() + 2);
	} else {
		return Math.ceil($(window).scrollTop());
	}
}

function scrollPosition() {

    var position = {};
    var scrollBody = getScrollBody();
    
    function saveScrollPosition() {
        position = {
            "top": scrollBody.scrollTop(),
            "left": scrollBody.scrollLeft()
        };
    }

    function loadScrollPosition() {
        scrollBody.scrollTop(position.top);
        scrollBody.scrollLeft(position.left);
    }

    function clearScrollPosition() {
        position = {};
    }
 
    
    return {
        save: saveScrollPosition,
        load: loadScrollPosition,
        clear: clearScrollPosition
    };
}

function windowDualMonitor (nWidth, nHeight) { 
	
	var curX = window.screenLeft;
	var curY = window.screenTop;
	var curWidth = document.body.clientWidth;
	var curHeight = document.body.clientHeight;
	  
	var nLeft = curX + (curWidth / 2) - (nWidth / 2);
	var nTop = curY + (curHeight / 2) - (nHeight / 2);
	
	clog(nLeft)
	return [nLeft , nTop]

}
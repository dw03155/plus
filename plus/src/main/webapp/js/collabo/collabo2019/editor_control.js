var tmpEditor;

var editor_control = (function() {
	
	var g_clipboard = [];
	
	return {
		saveClipBoard : saveClipBoard,			//@유민호 : 클립보드 저장해놓기 190607
		disableKey : disableKey,				//@유민호 : 글작성2.0 외 영역에서 key가 안먹도록 하는 함수  190305
		getClipboardData : getClipboardData,	//@유민호 : 브라우저별 클립토드가져오기 20191114
		dropLayerClose : dropLayerClose,		//@유민호 : 드롭레이어 켜질경우 끌수있게 버튼 생성 190703
		pasteClipboard : pasteClipboard,
	};

	function saveClipBoard(event, text, time) {
		var b_exists = false;
		if(g_clipboard.length > 0 && g_clipboard.length < 5 ){
			g_clipboard.forEach(function(data){
				if(data.CONTENT === text){
					data.TIME = time;
					b_exists = true;
					return false;
				} else {
					b_exists = false;
				}
			});
		} else if(g_clipboard.length >= 5){
			g_clipboard.sort(function(a,b){
				return a["TIME"] - b["TIME"];
			});
			g_clipboard.splice(0,1);
		} else {
			//done
		}
		
		if(!b_exists){
			g_clipboard.push({"CONTENT":text,"TIME":time});
		}
		var tempClip = $(".SAVE_CLIP_BOARD");
		tempClip.text(text);
		tempClip.attr('time',time);
		
	    var clipboardData = getClipboardData(event); 
	    if(clipboardData){
			clipboardData.setData('text/plain', text);
	    	tempClip.attr('mode', 'C');
	    	event.preventDefault();
	    } else {
	    	tempClip.attr('mode', 'X');
	    }
	}
	
	function disableKey(x,e){
	   var ret=true;
	    if(e.ctrlKey || e.metaKey){
	        switch(e.keyCode){
	            case 66: //ctrl+B or ctrl+b
	            case 98: ret=false; break;
	            case 73: //ctrl+I or ctrl+i
	            case 105: ret=false; break;
	            case 85: //ctrl+U or ctrl+u
	            case 117: ret=false; break;
	        }
	    }
	    return ret;
	} 

	function getClipboardData(e) {
		if(true){	
			if(e.clipboardData && e.clipboardData.getData){
				return e.clipboardData;
			} else if (window.clipboardData && window.clipboardData.getData) {
				return window.clipboardData;
			} else {
				return e.originalEvent.clipboardData;
			}
		} else {
			return e.clipboardData || window.clipboardData || e.originalEvent.clipboardData; 
		}
	}

	
	function dropLayerClose(e){		
		var _ITEM = $('<a id="uploadCloseBtn"><img src=""></a>');
		_ITEM.css({
		    'top'		: '10px',
		    'right'		: '15px',
		    'position'	: 'absolute',
		    'cursor'	: 'pointer',
		    'z-index'   : '1000'
		});
		_ITEM.find('img').attr('src', '/design2/img_rn/main/btn_layerstyle4_close.png');
		_ITEM.off('click').on('click', function(){
			clog("upload-status-layer hide ###");
			$(this).parents("#upload-status-layer").hide();
		});
		
		var targetObj;
		if($(e.target).parents("#post-input-layer").length > 0){
			targetObj = $("#post-input-layer");
		} else if ($(e.target).parents("#post-edit-layer").length > 0){
			targetObj = $(e.target).parents("#post-edit-layer");
		} else if ($(e.target).parents("#remark-layer").length > 0){
			targetObj = $(e.target).parents("#remark-layer");
		} 
			
		if(targetObj.find("#upload-status-layer").find("#uploadCloseBtn").length == 0){
			targetObj.find("#upload-status-layer").prepend(_ITEM);

		}
	}

	function pasteClipboard(event, b_layer, _upload){
		var clipboardData = null;
		var divNm = "div[contenteditable='true']";
        if (b_layer && ( $(event.target).is(divNm) || $(event.target).parents(divNm).length > 0)){
        	event.preventDefault();
        	clipboardData = getClipboardData(event);
        	clog('input paste text ### ' + clipboardData.getData('text'));
        	if(Browser.ieYn){ // ie
        		tmpEditor = clipboardData.getData("text");
        		clog(clipboardData.getData("text"));
        		pasteHtmlAtCaret(fn_xEventHandler(clipboardData.getData("text")));	//@jkw 2020.4.20 crosssite script 제거
        	} else { // ie말고 chrome 등등
                applyPastedData(event, clipboardData, function (file) {
                	_upload.sendFileToServer("", file, "CLIPBOARD_IMG");
                });
        	}
        }
	}
	
})();
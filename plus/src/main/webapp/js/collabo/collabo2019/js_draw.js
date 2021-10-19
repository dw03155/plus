//@유민호 : JS DRAW FUNCTION 190808
var jsDraw = (function() {

	var isDrawTooltipFirst = true;

	return {
		alert : alert,
		confirm : confirm,
		prompt : prompt,
		loading : loading,
		loadingStop : loadingStop,
		tooltip : tooltip,
		notice : notice,
	};

	function init(){

		if(typeof c18n == "undefined"){

			function c18n(code, val){
				return val;
			}

		}

	}

	function tooltip(data){

		/*
		jsDraw.tooltip({
			drawToObj : '$("")',
			logoUrl : '/design2/',
			logoName : '타이틀',
			text : '내용을 적어주세요',
			moreUrl : 'https://flow.team',
			isDownArrow : true,
			set_func : function(obj){},
			close_func : function(obj){}
		});
		*/

		var _ID = "jsDraw_tooltip";
		var $drawParent = data["drawToObj"];
		var isDownArrow = coalesce3(data["isDownArrow"], true);
		var logoUrl = coalesce3(data["logoUrl"],"");
		var logoName = coalesce3(data["logoName"],"What is Feature?");
		var tooltipText = coalesce(data["text"], "What is Contents?");
		var moreUrl = coalesce3(data["moreUrl"], "");
		var drawTimeoutSec = coalesce3(data["drawTimeoutSec"], "1");
		var fadeTimeSec = coalesce3(data["fadeTimeSec"], "0.5");

		if($("#"+_ID).length > 0){
			$("#"+_ID).remove();
		}

		var $tooltip = $('' +
			'<div class="tooltip-wrap">\n' +
			'<div class="tooltip-header">' +
			(logoUrl === "" ? '<div class="tooltip-title"><div class="tooltip-title-new">NEW</div><div class="tooltip-title-cont"></div></div>' :
				'<div class="tooltip-logo"><span class="blind"></span></div>') +
			'</div>\n' +
			'<div class="tooltip-text"><p class="tooltip-p"></p>\n' +
			(moreUrl === "" ? '' : '<a class="tooltip-more">'+c18n('H207','자세히 보기')+'</a>') +
			'</div>\n' +
			'<button class="tooltip-close"><span class="blind">close</span></button>\n' +
			'</div>').attr('id', _ID);

		var tooltipStyle =  {
			"tooltip-header" : "padding: 9px 0 7px 0;background: #fff;text-align: center;border-radius: 4px 4px 0px 0;",
			"tooltip-logo" : "display: inline-block;width: 85px;height:15px;",
			"tooltip-title" : "display: inline-block;height:15px;",
			"tooltip-title-new" : "display: inline-block;background:#ff074d; color: #fff; padding: 3px 4px; margin-right: 5px;font-weight: 600;font-size: 10px; border-radius:50px;vertical-align: top;",
			"tooltip-title-cont" : "display: inline-block;",
			"tooltip-text" : "padding: 8px 16px 9px 16px;line-height: 22px;background: #307cff;color: #fff;font-size: 14px;text-align: center;border-radius: 0 0 4px 4px;",
			"tooltip-p" : "word-break:keep-all;",
			"tooltip-more" : "display:block;margin-top:6px;padding: 2px 0px;border: 1px solid #fff;border-radius: 4px;font-size: 12px;color: #fff;text-align: center;",
			"tooltip-close" : "position: absolute;top: -6px;right: -4px;display:block;width:16px;height:16px;border-radius:50%;background:#5c5c5c;"
		};
		$tooltip.css({
			'z-index':'9999',
			'position': 'absolute',
			'width': '208px',
			'box-shadow': '0px 0px 6px 4px rgba(0,0,0,0.1)',
			'cursor':'default',
			'display':'none'
		})

		for(var key in tooltipStyle) {
			tooltipStyle[key] = '{'+('\"'+tooltipStyle[key]
				.replace(/:/ig,'\":\"').replace(/;/ig,'\",\"')
				.replace(/\" /ig,'\"')+'\"').replace(/,\"\"/,'') +'}';
			$tooltip.find('.'+key).css(JSON.parse(tooltipStyle[key]));
		}

		$tooltip.find(".tooltip-p").html(tooltipText);
		$tooltip.find(".tooltip-more").off('click').on('click', openTooltipMoreUrl)
		$tooltip.find(".tooltip-close").off('click').on('click', closeTooltip)
		$tooltip.addClass( isDownArrow ? 'down' : 'up');
		$tooltip.css( isDownArrow ? {'top':'-150px','left':'-20px'} : {'top':'45px','left':'-20px'})
		if(logoUrl === ""){
			$tooltip.find(".tooltip-title-cont").text(logoName);
		} else {
			$tooltip.find(".tooltip-logo > .blind").text(logoName);
			$tooltip.find(".tooltip-logo").css("background", "url('" + logoUrl + "') no-repeat");
		}

		if (typeof data.set_func === "function"){
			data.set_func($tooltip);
		}

		if(isDrawTooltipFirst){
			$('body').prepend(''+
				'<style>' +
				'.tooltip-wrap.up::after{position: absolute;top: -14px;bottom:inherit;left: 17px;display:block;content:"";border-right: 7px solid transparent;border-top: 7px solid transparent;border-left: 7px solid transparent;border-bottom: 7px solid #fff;}' +
				'.tooltip-wrap.down::after{position: absolute;bottom: -7px;left: 17px;display:block;content:"";border-right: 7px solid transparent;border-top: 7px solid #307cff;border-left: 7px solid transparent;}' +
				'.tooltip-close::before,.tooltip-close::after{display: block;content: "";position: absolute;right: 7px;top: 3px;width: 2px;height: 10px;background: #fff;border-radius:4px;transform: rotate(45deg);}' +
				'.tooltip-close::after{transform: rotate(-45deg);}' +
				'</style>')
			isDrawTooltipFirst = false;
		} else {
			//pass
		}

		$drawParent.prepend($tooltip);

		var drawTimeoutSec = coalesce3(data["drawTimeoutSec"], "1");
		var fadeTimeSec = coalesce3(data["fadeTimeSec"], "0.5");

		var drawTimeout = setTimeout(function(){
			$("#"+_ID).fadeIn(Number(fadeTimeSec)*1000);
			clearTimeout(drawTimeout);
		}, Number(drawTimeoutSec)*1000)

		function openTooltipMoreUrl(){
			window.open(moreUrl, 'tooltip-connect');
		}

		function closeTooltip(){
			$("#"+_ID).remove();
			if (typeof data.close_func === "function"){
				data.close_func($tooltip);
			}
		}

	}

	function alert(data, callback){
		init()
		clog("jsdraw alert ###");
		var _ID = "jsDraw_alert";
		var workingTimer = -1;
		var type, msg, timer = "";

		if("" !== coalesce(data)){
			type 	= coalesce2(data.type,"1");
			msg 	= coalesce2(data.msg,"");
			timer 	= coalesce2(data.timer,2500);
		} else {
			//done
		}
		if("" == msg){
			return;
		}

		var _ITEM = $('<div id='+_ID+'><div class="alert_wrap"><div class="alert_box"><p class="alert_msg"></p></div></div></div>');

		var css = {};
		css["alert_wrap"]   = "z-index:99999;top:50px; left:50%;margin-left:-205px;text-align:center;min-width:400px;position: fixed;min-width: 400px;";
		css["alert_box"] 	= "padding-top:5px;letter-spacing:-1px;padding-bottom: 10px;";
		css["alert_msg"] 	= "font-weight:bold;margin-top:5px;margin-left:14px; margin-right:14px;";
		if("1" == type){			/*info*/ css["alert_wrap"] += "background-color: #ebffda;border: 1px solid #c2d49b;"; css["alert_msg"] += "color:#555;"
		} else if ("2" == type){	/*warn*/ css["alert_wrap"] += "background-color: #ffdcda;border: 1px solid #d49e9b;"; css["alert_msg"] += "color:#555;"
		} else if ("3" == type){	/*eror*/ css["alert_wrap"] += "background-color: #fff8d6;border: 1px solid #dacd89;"; css["alert_msg"] += "color:#555;"
		} else if ("4" == type){	/*flow*/ css["alert_wrap"] += "background-color: #5f5ab9;border: 1px solid #afaddc;"; css["alert_msg"] += "color:#fff;"
		} else if ("5" == type){	/*join*/ css["alert_wrap"] += "background-color: #307cff;border: 1px solid #7faeff;"; css["alert_msg"] += "color:#fff;"
		} else {					/*info*/ css["alert_wrap"] += "background-color: #ebffda;border: 1px solid #c2d49b;"; css["alert_msg"] += "color:#555;"
		}

		for(var key in css) {
			css[key] = '{'+('\"'+css[key].replace(/:/ig,'\":\"').replace(/;/ig,'\",\"').replace(/\" /ig,'\"')+'\"').replace(/,\"\"/,'') +'}';
			_ITEM.find('.'+key).css(JSON.parse(css[key]));
		}

		_ITEM.find(".alert_msg").text(msg);
		$('body').prepend(_ITEM);

		if (workingTimer > 0) {
			clearInterval(workingTimer);
			workingTimer = -1;
		}

		workingTimer = setTimeout(function(){
			jkwlog("ID = "+ _ID);
			$('body').find("#"+_ID).remove();
			workingTimer = -1;
			if(callback)callback()
		}, coalesce(timer,2000))

	}

	function confirm(data){
		init()

		clog("jsdraw confirm ###");

		var _ID = "jsDraw_confirm";
		var _RST = "N";

		//HTML
		var _ITEM = $('<div id=' + _ID + '><div class="back"></div><div class="layer"><div>'
			 	 	 +'<div class="head"><div class="title"></div><a class="close"><span class="close2"></span></a></div>'
			 	 	 +'<div class="body"><div><div class="center"><div class="cont"></div>'
			 	 	 +'<div class="btn"><button class="no"></button><button class="yes"></button></div></div></div>'
			 	 	 +'</div></div></div></div>');

		//CSS
		var width = '350px';
		var height = 'auto';
		var marginLeft = '-175px';	// width / 2
		if('' !== coalesce(data) && data.css) {
			width = coalesce(data.css["width"], width);
			height = coalesce(data.css["height"], height);
			marginLeft = coalesce(data.css["marginLeft"], marginLeft);
		}

		var css = {};
		css["back"] = "position: fixed; width: 100%;height: 100%;overflow: hidden;background: rgb(0, 0, 0);opacity: 0.3;z-index: 11000";
		css["layer"] = "width: " + width + ";z-index: 11000;height: " + height + ";background: rgb(255, 255, 255);position: fixed;top: 40%;left: 50%;margin-left: " + marginLeft + ";border-radius: 7px";
		css["head"] = "height: 43px; background: #f4f4f4; border-radius: 7px 7px 0px 0px";
		css["title"] = "position: relative; padding: 11px 0px 0px 16px; font-size: 16px; font-weight: normal; color: #111; margin-block-end: 1em; margin-inline-start: 0px; margin-inline-end: 0px";
		css["close"] = "display: block; position: absolute; top: 15px; right: 15px; width: 14px; height: 14px; background-image: url(/design2/img_rn/btn/btn_layerstyle4_close2.png?1); cursor: pointer";
		css["close2"] = "color: transparent";
		css["body"] = "padding: 20px";
		css["center"] = "text-align:center;word-break: break-all;white-space:break-spaces;";
		css["btn"] = "padding-top: 20px; width: 100%;";
		css["no"] = "width: 45%; margin-right: 10px; height: 30px; font-size: 14px;color: #4c4c4c;font-weight: bold;border: 1px solid #c9c9c9;border-radius: 2px;background-color: #fff";
		css["yes"] = "width: 45%; color: #fff; border-color: #307cff; background-color: #307cff; height: 30px; font-size: 14px; font-weight: bold; border: 1px solid #c9c9c9; border-radius: 2px";

		for(var key in css) {
			css[key] = '{'+('\"'+css[key].replace(/:/ig,'\":\"').replace(/;/ig,'\",\"').replace(/\" /ig,'\"')+'\"').replace(/,\"\"/,'') +'}';
			_ITEM.find('.'+key).css(JSON.parse(css[key]));
		}

		//TEXT
		var text = {"title":"삭제", "cont": c18n("AA0157","삭제해도 되겠습니까?"), "no":c18n("CD755","취소"), "yes":c18n("H359","확인")};
		if('' !== coalesce(data) && data.text){
			text["title"] 	= coalesce(data.text["title"],text["title"]);
			text["cont"] 	= coalesce(data.text["cont"],text["cont"]);
			text["no"] 		= coalesce(data.text["no"],text["no"]);
			text["yes"] 	= coalesce(data.text["yes"],text["yes"]);
		} else {
			//done
		}

		//SHOW
		if($('body').find("#"+_ID).length == 0){

			for(var key in text) {
				_ITEM.find('.'+key).html(text[key]);
			}

			$('body').prepend(_ITEM);
			$('body').css("overflow","hidden");
			$('body').css("overflow-y","hidden");
		} else {

			for(var key in text) {
				$('body').find("#"+_ID).find('.'+key).html(text[key]);
			}

			$('body').find("#"+_ID).show();
			$('body').css("overflow","hidden");
			$('body').css("overflow-y","hidden");
		}

		//EVENT
		var _OBJ = $('body').find("#"+_ID);

		//SET_FUNC
		if(data && data.set_func != null){
			data.set_func(_OBJ);
		} else {
			//done
		}

		_OBJ.find('.close').off('click').on('click',function(){
			close();
		});

		_OBJ.find('.back').off('click').on('click',function(e){
			if($(e.target).hasClass('back')){
				close();
			} else {
				return;
			}
		});

		_OBJ.find('button').off('click').on('click',function(){
			close();
			if($(this).hasClass('yes')){
				if(coalesce3(data.tmp_files) !== ""){
					data.yes_func(data.tmp_files);
				} else {
					data.yes_func();
				}
			} else {
				if(data && data.no_func != null){
					data.no_func();
				} else {
					//done
				}
				close();
			}
		});

		setKeydown(close);

	    $('body').on("keydown", function (e) {
			if (e.keyCode == 13 && coalesce3(_OBJ.css('display'),'block') === 'block') {
				if(coalesce3(data.tmp_files) !== ""){
					data.yes_func(data.tmp_files);
				} else {
					data.yes_func();
				}
				close();
			} else {
				//done
			}
		});

		function close(){

			//CLOSE_FUNC
			if(data && data.close_func != null){
				_OBJ.hide();
				$('body').css("overflow","visible");
				$('body').css("overflow-y","auto");
				return data.close_func(_OBJ);
			} else {
				//done
			}

			_OBJ.hide();
			$('body').css("overflow","visible");
			$('body').css("overflow-y","auto");
		}

	}

	function prompt_pack(gb){

		init()

		var _STR1 = c18n("AA0160","입력해주세요!");

		var _NM_CONT_STR = c18n("H331","이름");
		var _ID_CONT_STR = c18n("FL561","아이디");
		var _EM_CONT_STR = c18n("AA0126","이메일");
		var _PW_CONT_STR = c18n("H362","비밀번호");
		var _CN_CONT_STR = c18n("H330","회사명");
		var _BS_CONT_STR = c18n("CB1244","부서명");
		var _ZC_CONT_STR = c18n("CB1248","직책");
		var _HP_CONT_STR = c18n("H358","휴대폰번호");
		var _CP_CONT_STR = c18n("AA0158","회사번호");
		var _WT_CONT_STR = c18n("AA0159","담당업무");
		var _CH_CONT_STR = c18n("CB1246","회사연락처");
		var _IH_CONT_STR = "내선번호"
		var _SG_CONT_STR = "슬로건"

		var _NM_PLACE_STR = c18n("H443","이름을 입력해주세요!");
		var _ID_PLACE_STR = adjustI18n("reverse",_ID_CONT_STR,_STR1);
		var _EM_PLACE_STR = c18n("H440","이메일을 입력해주세요!");
		var _CN_PLACE_STR = c18n("DH351","회사명을 입력해주세요!");
		var _BS_PLACE_STR = adjustI18n("reverse",_BS_CONT_STR,_STR1);
		var _ZC_PLACE_STR = adjustI18n("reverse",_ZC_CONT_STR,_STR1);
		var _HP_PLACE_STR = c18n("AA0161","휴대폰번호는 '-'를 제외하고 입력해주세요!");
		var _PW_PLACE_STR ;
		var _CH_PLACE_STR = "회사연락처는 '-'를 제외하고 입력해주세요"
		var _IH_PLACE_STR = "내선번호를 입력해주세요."
		var _SG_PLACE_STR = "슬로건을 입력해주세요."
		if(b_kimchang){
			_PW_PLACE_STR = "비밀번호는 8자 이상 숫자/문자/특수기호 중 3가지 이상 조합해야 가능합니다!";
		} else {
			_PW_PLACE_STR = c18n("AA0162","비밀번호는 6자 이상 영문,숫자만 가능합니다!");
		}
		var _CP_PLACE_STR = adjustI18n("reverse",_CP_CONT_STR,_STR1);
		var _WT_PLACE_STR = adjustI18n("reverse",_WT_CONT_STR,_STR1);

		var _SUB_STR1 = c18n("XXX","필수정보");
		var _SUB_STR2 = c18n("XXX","추가정보입력");

		var _DESC_STR1 = c18n("XXX","외부인 등록후, '이메일주소/비밀번호'를 입력하여 로그인가능합니다.");
		var _DESC_STR2 = c18n("XXX","비밀번호는 웹화면 [설정→비밀번호변경] 메뉴에서 추후 변경가능합니다.");
		//추가 [송제섭]
		if(gb === "admin2") {
			var dat = {};
			dat["input_arch"] = ["sub", 4, "hr", "sub", 4, "desc"];
			dat["input_class"] = ["nm", "id", "em", "pw", "cn", "dv", "jb", "hp"];
			dat["input_type"] = ["text", "text", "text", "password", "text", "text", "text", "text"];
			dat["input_max"] = [50, 30, 30, 20, 100, 100, 100, 20];
			dat["input_place"] = [_ID_PLACE_STR, _NM_PLACE_STR, _EM_PLACE_STR, _PW_PLACE_STR, _CN_PLACE_STR, _BS_PLACE_STR, _ZC_PLACE_STR, _HP_PLACE_STR];
			dat["input_cont"] = [ _ID_CONT_STR + "*", _NM_CONT_STR + "*",_EM_CONT_STR + "*", _PW_CONT_STR + "*", _CN_CONT_STR, _BS_CONT_STR, _ZC_CONT_STR, _HP_CONT_STR];

			dat["input_sub"] = [_SUB_STR1, _SUB_STR2];
			dat["input_desc"] = ["<p>※ " + _DESC_STR1 + "</p>" + "<p>※ " + _DESC_STR2 + "</p>"];

			return dat;
		}
		if(gb === "admin"){
			var dat = {};
			dat["input_arch"] 	 = ["sub",5,"hr","sub",6,"desc"];
			dat["input_class"] 	 = ["id", "nm", "em", "hp", "pw",  "cn", "dv", "jb", "ch", "ih", "sg"];
			dat["input_type"] 	 = ["text", "text", "email",  "text", "password", "text", "text", "text", "text", "text", "text"];
			dat["input_max"] 	 = [30, 30, 50, 11, 100, 100, 100, 50, 11, 4, 50];
			dat["input_place"] 	 = [_ID_PLACE_STR, _NM_PLACE_STR, _EM_PLACE_STR,_HP_PLACE_STR, _PW_PLACE_STR, _CN_PLACE_STR, _BS_PLACE_STR, _ZC_PLACE_STR, _CH_PLACE_STR, _IH_PLACE_STR, _SG_PLACE_STR];
			dat["input_cont"] 	 = [_ID_CONT_STR+"*",_NM_CONT_STR+"*", _EM_CONT_STR+"*", _HP_CONT_STR+"*", _PW_CONT_STR+"*", _CN_CONT_STR, _BS_CONT_STR, _ZC_CONT_STR ,_CH_CONT_STR , _IH_CONT_STR, _SG_CONT_STR];

			dat["input_sub"] 	 = [_SUB_STR1, _SUB_STR2];
			dat["input_desc"]  	 = ["<p>※ "+_DESC_STR1+"</p>" + "<p>※ "+_DESC_STR2+"</p>"];

			return dat;
		}else if(gb === "guest"){
			var dat = {};
			dat["input_arch"] 	 = ["sub",5,"hr","sub",6,"desc"];
			dat["input_class"] 	 = ["id", "nm", "em", "hp", "pw",  "cn", "dv", "jb", "ch", "ih", "sg"];
			dat["input_type"] 	 = ["text", "text", "email",  "text", "password", "text", "text", "text", "text", "text", "text"];
			dat["input_max"] 	 = [30, 30, 50, 11, 100, 100, 100, 50, 11, 4, 50];
			dat["input_place"] 	 = [_ID_PLACE_STR, _NM_PLACE_STR, _EM_PLACE_STR,_HP_PLACE_STR, _PW_PLACE_STR, _CN_PLACE_STR, _BS_PLACE_STR, _ZC_PLACE_STR, _CH_PLACE_STR, _IH_PLACE_STR, _SG_PLACE_STR];
			dat["input_cont"] 	 = [_ID_CONT_STR+"*",_NM_CONT_STR+"*", _EM_CONT_STR+"*", _HP_CONT_STR+"*", _PW_CONT_STR+"*", _CN_CONT_STR, _BS_CONT_STR, _ZC_CONT_STR ,_CH_CONT_STR , _IH_CONT_STR, _SG_CONT_STR];

			dat["input_sub"] 	 = [_SUB_STR1, _SUB_STR2];
			dat["input_desc"]  	 = ["<p>※ "+_DESC_STR1+"</p>" + "<p>※ "+_DESC_STR2+"</p>"];
			_CH_CONT_STR
			_IH_CONT_STR
			_SG_CONT_STR
			return dat;
		} else if(gb === "lang"){
			var dat = {};
			dat["input_arch"] 	 = ["sub",5,"hr","sub",1];
			dat["input_class"] 	 = ["lc", "kv", "ev", "cv", "jv", "gubun"];
			dat["input_type"] 	 = ["text", "text", "text", "text", "text", "text"];
			dat["input_max"] 	 = [30, 1000, 1000, 1000, 1000, 20];
			dat["input_place"] 	 = ["다국어코드를 입력해주세요!", "한국어를 입력해주세요!", "영어를 입력해주세요!",
				"중국어를 입력해주세요!", "일본어를 입력해주세요!", "화면구분값을 입력해주세요!"];
			dat["input_cont"] 	 = ["다국어코드*", "한국어*", "영어*", "중국어", "일본어", "구분"];

			dat["input_sub"] 	 = ["다국어정보", "추가정보입력"];
			return dat;
		} else if(gb === "userEdit"){
			var dat = {};
			dat["input_arch"] 	 = ["sub",4,"hr","sub",3,"desc"];
			dat["input_class"] 	 = [ "id", "nm", "em",   "cn", "dv", "jb", "hp"];
			dat["input_max"] 	 = [30, 30, 50, 100, 100, 100, 11];
			dat["input_place"] 	 = [ "아이디를 입력해주세요!", "이름을 입력해주세요!", "이메일을 입력해주세요!",
				"회사명을 입력해주세요!", "부서명을 입력해주세요!", "직책을 입력해주세요!"
				, "휴대폰번호는 '-'를 제외하고 입력해주세요!" ];
			dat["input_cont"] 	 = ["아이디(사번)*", "이름*", "이메일*","회사명", "부서명", "직책", "휴대폰번호"];

			dat["input_sub"] 	 = ["필수정보", "추가정보입력"];
			dat["input_desc"]  	 = ["<p>※ 사번은 플로우에서 변경 하실 수 없습니다.</p>"
								 + "<p>※ 정확한 정보 변경은 IM 인사정보 테이블 수동 배치를 이용해주세요.</p>"];
			return dat;
		} else if(gb === "func"){
			var dat = {};
			dat["input_arch"] 	 = ["sub",3,"hr","sub",5,"desc"];
			dat["input_class"] 	 = ["id", "nm", "ds","lv", "ld", "lu", "li", "yn"];
			dat["input_type"] 	 = ["text", "text", "text", "text", "text", "text", "text", "text"];
			dat["input_max"] 	 = [50, 50, 50, 50, 50, 50, 50, 1];
			dat["input_place"] 	 = ["기능아이디를 입력해주세요!", "이름을 입력해주세요!", "설명을 입력해주세요!", "", "", "", "", ""];
			dat["input_cont"] 	 = ["기능아이디*", "기능이름", "기능설명","적용레벨", "적용도메인", "적용이용기관", "적용아이디", "활성화 유무"];
			dat["input_sub"] 	 = ["기능 선택", "적용 정보"];
			dat["input_desc"]  	 = ["<p>※ 활성화유무는 등록후 수정가능합니다!</p>"];
			return dat;
		} else if(gb === "ver"){
			var dat = {};
			dat["input_arch"] 	 = ["sub",3,"hr","sub",3,"desc"];
			dat["input_class"] 	 = ["av", "iv", "pv","tt", "dt", "gb"];
			dat["input_type"] 	 = ["text", "text", "text", "text", "text", "text"];
			dat["input_max"] 	 = [3, 4, 5, 50, 200, 1];
			dat["input_place"] 	 = ["", "", "", "제목을 입력해주세요!", "설명을 입력해주세요!", "", "", ""];
			dat["input_cont"] 	 = ["주버전*", "부버전*", "패치버전*","제목*", "설명", "구분"];
			dat["input_sub"] 	 = ["버전", "내용"];
			dat["input_desc"]  	 = ["<p>※ 제목은 필수입니다!</p>"];
			return dat;
		} else if(gb === "notice" || gb === "noticeModify"){
			var dat = {};
			dat["input_arch"] 	 = ["sub",8,"desc"];
			dat["input_class"] 	 = ["tt", "cn", "bn","ln", "iu", "gb","start","ed"];
			dat["input_type"] 	 = ["text", "text", "text", "text", "text", "text","text" ,"text"];
			dat["input_max"] 	 = [20, 101, 10, 100, 101, 10, 8];
			dat["input_place"] 	 = ["제목을 입력해주세요!", "내용을 입력해주세요!", "버튼명을 입력해주세요!", "링크를 입력해주세요!", "이미지주소를 입력해주세요!", "기기구분을 선택해주세요","시작일자를 입력해주세요." ,"종료일자를 입력해주세요"];
			dat["input_cont"] 	 = ["제목*", "내용*", "버튼명*","링크*", "이미지주소*", "기기구분*","시작일자*" ,"종료일자*"];
			dat["input_sub"] 	 = ["정보" ];
			dat["input_desc"]  	 = ["<p>※ 모든 내용은 필수입니다!</p>"];
			dat["text"]          = ["yes"];
 			dat["text"]["yes"]   = gb == "notice" ?  "확인": "수정";
			return dat;
		} else {
			//done
		}
	}

	function prompt(data,callback){

		init()

		clog("jsdraw prompt ###");

		var _ID, _MODE, _FOCUS 	= "",_GB;

		if("" !== coalesce(data)){

			_ID 	= "jsDraw_prompt_" + data["code"];
			_GB = data["ADMIN_GB"];
			_MODE 	= data["code"];

			_FOCUS 	= data["focus"];
			_PROMT_PACK = data["prompt_pack"];

			if(_PROMT_PACK != null){
				data = $.extend({}, data, _PROMT_PACK);
			} else {
				if( (_MODE ==="RGST" ||_MODE ==="EDIT") && _GB ==='ADMIN_USER' )
				{
					data = $.extend({}, data, prompt_pack("admin2"));
				}
				else if(_MODE === "RGST" || _MODE === "EDIT"){
					data = $.extend({}, data, prompt_pack("admin"));
				}
				else if(_MODE === "GUEST_EDIT" || _MODE === "GUEST_RGST"){
					data = $.extend({}, data, prompt_pack("guest"));
				} else if(_MODE === "LANG_EDIT" || _MODE === "LANG_RGST"){
					data = $.extend({}, data, prompt_pack("lang"));
				} else if (_MODE === "EDIT") {
					data = $.extend({}, data, prompt_pack("userEdit"));
				} else if (_MODE === "FUNC") {
					data = $.extend({}, data, prompt_pack("func"));
				} else if (_MODE === "VER") {
					data = $.extend({}, data, prompt_pack("ver"));
				} else if (_MODE === "NOTICE") {
					data = $.extend({}, data, prompt_pack("notice"));
				} else if(_MODE === "NOTICE_MODIFY"){
					data = $.extend({}, data, prompt_pack("noticeModify"));
				}
			}

		} else {
			//done
		}

		//HTML
		var html = '';
		html += '<div id =' + _ID + '><div class="back"></div><div class="layer"><div class="top">';
		html += '<h1 class="head"><span class="title"></span><input class="close" type="button"></h1></div>';
		html += '<div class="body"><div class="cont">';
		if(data && data.input_arch){
			data.input_arch.forEach(function(v,i){
				html += makeInputElement(v);
			});
		}
		html += '</div>';
		html += '<div class="btn"><a class="yes"></a><a class="no">취소</a></div>';
		html += '</div></div></div>';
		var _ITEM = $(html);

		//INPUT SET
		_ITEM.find(".inputc").each(function(i,v){
			$(v).addClass((data && data.input_class ? data.input_class[i] : "class"+i));
			$(v).attr("type", (data && data.input_type ? data.input_type[i] : "text"));
			$(v).attr("maxlength", (data && data.input_max ? data.input_max[i] : 20));
			$(v).attr("placeholder", (data && data.input_place ? data.input_place[i] : ""));
			$(v).parents("tr").find(".thc").html(data && data.input_cont ? data.input_cont[i] : "입력"+i);
		});

		_ITEM.find(".sub").each(function(i,v){
			$(v).html((data && data.input_sub ? data.input_sub[i] : "sub"+i));
		});

		_ITEM.find(".desc").each(function(i,v){
			$(v).html((data && data.input_desc ? data.input_desc[i] : "desc"+i));
		});

		//TEXT
		_ITEM.find(".title").text(data && data.text ? coalesce2(data.text["title"],"추가") : "추가");
		_ITEM.find(".yes").text(data && data.text ? coalesce2(data.text["yes"],"확인") : "확인");
		_ITEM.find(".no").text(data && data.text ? coalesce2(data.text["no"],"취소") : "취소");

		//CSS
		var css = {};
		css["back"] = "position: fixed; width: 100%;height: 100%;overflow: hidden;background: rgb(0, 0, 0);opacity: 0.3;z-index: 5000";
		css["layer"] = "width:500px;height: auto;margin-left: -250px;z-index: 10000;position: fixed;top: 3%;left: 50%;background-color: #fff;";
		css["top"] = "padding: 25px 30px 0 30px;";
		css["head"] = "padding-bottom: 14px;font-size: 19px;color: #111111;font-weight: 700;border-bottom: 1px solid #e6e6e6;";
		css["title"] = "font-size: 19px;color: #111111;font-weight: 700;";
		css["close"] = "cursor:pointer;display: block;position: absolute;top: 20px;right: 30px;width: 30px;height: 30px;border: 0;background: url(/design2/flow_admin_2019/img/btn_popclose.gif) no-repeat center;";
		css["body"] = "padding: 0 30px;margin-bottom: 30px;";
		css["cont"] = "margin-top: 10px;";
		css["colc"] = "width:100px";
		css["sub"] = "margin-bottom: 10px; color: rgb(48, 124, 255);";
		css["thc"] = "height: 22px;padding-right: 12px; font-size: 14px;color: #4f545d;padding: 5px 0 6px 0;vertical-align: middle;text-align: left;font-weight: bold;";
		css["tdc"] = "height: 22px;padding: 5px 0 6px 0;vertical-align: middle;text-align: left;";
		css["inputc"] = "width: 98.5%;padding-left: 10px;height: 30px;font-size: 13px;vertical-align: middle;border: 1px solid #e6e6e6;border-radius: 1px;";
		css["hr"] = "border-bottom: 1px solid #e6e6e6;margin: 20px 0;";
		css["desc"] = "font-size: 13px;margin: 20px 0;line-height: 24px;";
		css["btn"] = "margin-top: 15px;text-align: center;width:100%";
		css["no"] = "cursor:pointer;min-width: 120px;height: 36px;line-height: 34px;font-size: 16px;border: 1px solid #c5c6cb;border-radius: 3px;display: inline-block; margin-left:10px";
		css["yes"] = "cursor:pointer;color: #fff;background-color: #307cff;min-width: 120px;height: 36px;line-height: 34px;font-size: 16px;border: 1px solid #c5c6cb;border-radius: 3px;display: inline-block;";
		//css["reset"] = "display:none";
		for(var key in css) {
			css[key] = '{'+('\"'+css[key].replace(/:/ig,'\":\"').replace(/;/ig,'\",\"').replace(/\" /ig,'\"')+'\"').replace(/,\"\"/,'') +'}';
			_ITEM.find('.'+key).css(JSON.parse(css[key]));
		}

		//SHOW
		if($('body').find("#"+_ID).length == 0){
			$('body').prepend(_ITEM);
			$('body').css("overflow","hidden");
			$('body').css("overflow-y","hidden");
		} else {
			$('body').find("#"+_ID).show();
			$('body').css("overflow","hidden");
			$('body').css("overflow-y","hidden");
		}

		//EVENT
		var _OBJ = $('body').find("#"+_ID);

		//SET_FUNC
		if(data && data.set_func != null){
			data.set_func(_OBJ);
		} else {
			//done
		}

		//INPUT : FOCUS
		_OBJ.find("input."+ coalesce2(_FOCUS,"nm")).focus();

		//X-BTN CANCEL
		_OBJ.find('.close').off('click').on('click',function(){
			cancel();
		});

		//BACK CANCEL
		_OBJ.find('.back').off('click').on('click',function(e){
			if($(e.target).hasClass('back')){
				cancel();
			} else {
				return;
			}
		});

		setKeydown(cancel);
		//송제섭 변경
		//YES OR NO
		_OBJ.find('.btn').children().off('click').on('click',function(){
			if(callback){
				callback();
			} else {
				//pass
			}
			if($(this).hasClass('yes')){
				if(data && data.yes_func != null){
					data.yes_func(_OBJ);
				} else {
					//done
				}
			} else {
				if(data && data.no_func != null){
					data.no_func(_OBJ);
				} else {
					cancel();
					return;
				}
			}
			if(callback){
				//pass
			} else {
				close();
			}
		});

		function makeInputElement(gb){
			if(gb === "sub"){
				return '<h3 class="sub"></h3>'
			} else if (gb === "hr") {
				return '<div class="hr"></div>'
			} else if	(gb === "desc") {
				return '<div class="desc"></div>'
			} else if	(typeof(gb) === "number"){
				var tray = '<table><colgroup><col class="colc"><col></colgroup><tbody>';
				for(var i = 0; i < gb ; i++){
				tray += '<tr><th class="thc"></th><td class="tdc"><input class="inputc"></td></tr>';
				}
				tray += '</tbody></table>'
				return tray;
			} else {
				return gb;
			}
		}
		function cancel(){
			if(data && data.clear_func != null){
				data.clear_func(_OBJ);
			}
			_OBJ.remove();
			//_OBJ.hide();
			//_OBJ.find('.inputc').val('');
			$('body').css("overflow","visible");
			$('body').css("overflow-y","auto");
		}
		function close(){
			if(data && data.close_func != null){
				var rs = data.close_func(_OBJ)
                if(null2void(rs,"")!== "" && !rs){
                	return;
				}
			}
			_OBJ.remove();
			//_OBJ.hide();
			//_OBJ.find('.inputc').val('');
			$('body').css("overflow","visible");
			$('body').css("overflow-y","auto");
		}

	}

	function loading(data){

		init()

		clog("loading ###");
		clog(data)

		var _ID 	= "jsDraw_load";
		var _OBJ 	= $('body');
		var _BG_YN 	= "Y";
		var _PEND 	= "PRE";

		if("" !== coalesce(data)){
			_OBJ 	= data["obj"] ? coalesce2(data["obj"], $('body')) : $('body');
			_BG_YN 	= data["bg_yn"] ? coalesce2(data["bg_yn"], "Y") : "Y";
			_PEND 	= data["pend"] ? coalesce2(data["pend"], "") : "";
		} else {
			//done
		}

		//HTML
		var _ITEM = $('<div id='+_ID+'><div class="load_wrap"><div class="load_wrap2">'
				 	+'<p class="load_line"></p>'
				 	+'<div class="load_box"><div class="loader1"></div></div></div></div></div>');

		//CSS
		var css = {};
		css["load_wrap"] 	= "z-index: 10000;position: fixed; top:0; left:0; right:0; bottom:0; text-align:center;";
		css["load_wrap2"] 	= "display:inline-block;font-size:16px;background-color:#fff;";
		css["load_line"] 	= "padding-top: 35px;margin-bottom:25px;text-align:center;";
		css["load_box"] 	= "padding-bottom: 30px;";
		css["loader1"] 		= "margin: 10px auto;font-size: 10px; border-top: 0.8em solid rgba(96,90,216, 0.2); border-right: 0.8em solid rgba(96,90,216, 0.2);"
							+ "border-bottom: 0.8em solid rgba(96,90,216, 0.2); border-left: 0.8em solid #605ad8;-ms-transform: translateZ(0);"
							+ "border-radius: 50%;width: 5em;height: 5em; animation: load8 1.1s infinite linear;"
		if(_BG_YN === "Y"){
			css["load_wrap"]  += "background-color:rgba(0,0,0, .2);";
			css["load_wrap2"] += "margin-top:15em;width:320px;border-radius:10px;";
		} else {
			css["load_wrap2"] += "width:100%;height:100%";
		}

		for(var key in css) {
			css[key] = '{'+('\"'+css[key].replace(/:/ig,'\":\"').replace(/;/ig,'\",\"').replace(/\" /ig,'\"')+'\"').replace(/,\"\"/,'') +'}';
			_ITEM.find('.'+key).css(JSON.parse(css[key]));
		}

		//KEYFRAME
		if($('style[src=load8]').length == 0){
			var style = document.createElement('style');
			style.src = 'load8';
			style.type = 'text/css';
			var keyFrames = '\
				@-webkit-keyframes load8 {\
				  0% {\-webkit-transform: rotate(0deg);\transform: rotate(0deg);\}\
				  100% {\-webkit-transform: rotate(360deg);\transform: rotate(360deg);\}\
				}\
				@keyframes load8 {\
				  0% {\-webkit-transform: rotate(0deg);\transform: rotate(0deg);\}\
				  100% {\-webkit-transform: rotate(360deg);\transform: rotate(360deg);\}\
				}';
			style.innerHTML = keyFrames;
			document.getElementsByTagName('head')[0].appendChild(style);
		}

		//TEXT
		var text = {"load_line":c18n('AA0166','불러오는 중입니다.')+'<br>'+c18n('AA0167','잠시만 기다려 주세요!')};
		if('' !== coalesce(data) && data.text){
			clog(data.text)
			_ITEM.find(".load_line").html(coalesce2(data.text["load_line"],text["load_line"]));
		} else {
			_ITEM.find(".load_line").html(text["load_line"]);
		}

		//SHOW
		if(_OBJ.find("#"+_ID).length == 0){
			if(_PEND === "PRE"){
				_OBJ.prepend(_ITEM);
			} else {
				_OBJ.append(_ITEM);
			}
			$('body').css("overflow","hidden");
			$('body').css("overflow-y","hidden");
		} else {
			_OBJ.find("#"+_ID).show();
			$('body').css("overflow","hidden");
			$('body').css("overflow-y","hidden");
		}

		if('' !== coalesce(data) && data.load_func){
			data.load_func(function(){
				//STOP
				_OBJ.find("#"+_ID).hide();
				$('body').css("overflow","visible");
				$('body').css("overflow-y","auto");
			});
		} else {
			//done
		}

		//SET_FUNC
		if(data && data.set_func != null){
			data.set_func(_OBJ);
		} else {
			//done
		}


		/* 예시)
		   var load = function(loadEnd){
		   	 	setTimeout(function(){
		   	 	loadEnd()
		   	 	}, 3000);
		   	}
		   jsDraw.loading({"load_func": load});
		*/

	}

	function loadingStop(rm_yn){

		init()

		var _ID 	= "jsDraw_load";
		var _OBJ 	= $('body');
		var _BG_YN 	= "Y";
		var _RM_YN 	= coalesce3(rm_yn,"N");

		if(rm_yn === "Y"){
			_OBJ.find("#"+_ID).remove();
		} else {
			_OBJ.find("#"+_ID).hide();
		}

		$('body').css("overflow","visible");
		$('body').css("overflow-y","auto");
	}

	function setKeydown(close_func){

		init()

		$('body').off('keydown').on('keydown',function(e){
			if (e.keyCode === 27 ) {

				if(coalesce($('body').find("#jsDraw_confirm").css("display"),"none") === "block"){
					$('body').find("#jsDraw_confirm").hide();
					$('body').css("overflow","visible");
					$('body').css("overflow-y","auto");
					if(typeof close_func == 'function'){
						close_func();
					} else {
						//done
					}
					return;
				} else {
					//done
				}

				if(coalesce($('body').find("#jsDraw_prompt_RGST").css("display"),"none") === "block"){
					$('body').find("#jsDraw_prompt_RGST").hide();
					$('body').css("overflow","visible");
					$('body').css("overflow-y","auto");
					if(typeof close_func == 'function'){
						close_func();
					} else {
						//done
					}
					return;
				} else {
					//done
				}
				if(coalesce($('body').find("#jsDraw_prompt_EDIT").css("display"),"none") === "block"){
					$('body').find("#jsDraw_prompt_EDIT").hide();
					$('body').css("overflow","visible");
					$('body').css("overflow-y","auto");
					if(typeof close_func == 'function'){
						close_func();
					} else {
						//done
					}
					return;
				} else {
					//done
				}

			} else {
				// done
			}
		});
	}
	function notice(data) {
		var _ID = "jsDraw_notice";
		var _RST = "N";

		//HTML
		var _ITEM = $('<div id=' + _ID + '><div class="back"></div><div class="layer"><div>'
			+'<div class="head"><div class="title"></div><a class="close"><span class="close2"></span></a></div>'
			+'<div class="body"><div><div class="center"><div class="cont"></div>'
			+'<div class="btn"><button class="yes"></button></div></div></div>'
			+'</div></div></div></div>');

		//CSS
		var width = '350px';
		var height = 'auto';
		var marginLeft = '-175px';	// width / 2
		if('' !== coalesce(data) && data.css) {
			width = coalesce(data.css["width"], width);
			height = coalesce(data.css["height"], height);
			marginLeft = coalesce(data.css["marginLeft"], marginLeft);
		}

		var css = {};
		css["back"] = "position: fixed; width: 100%;height: 100%;overflow: hidden;background: rgb(0, 0, 0);opacity: 0.3;z-index: 11000";
		css["layer"] = "width: " + width + ";z-index: 11000;height: " + height + ";background: rgb(255, 255, 255);position: fixed;top: 40%;left: 50%;margin-left: " + marginLeft + ";border-radius: 7px";
		css["head"] = "height: 43px; background: #f4f4f4; border-radius: 7px 7px 0px 0px";
		css["title"] = "position: relative; padding: 11px 0px 0px 16px; font-size: 16px; font-weight: normal; color: #111; margin-block-end: 1em; margin-inline-start: 0px; margin-inline-end: 0px";
		css["close"] = "display: block; position: absolute; top: 15px; right: 15px; width: 14px; height: 14px; background-image: url(/design2/img_rn/btn/btn_layerstyle4_close2.png?1); cursor: pointer";
		css["close2"] = "color: transparent";
		css["body"] = "padding: 20px";
		css["center"] = "text-align:center;word-break: break-all;"
		css["btn"] = "padding-top: 20px; width: 100%;";
		css["no"] = "width: 45%; margin-right: 10px; height: 30px; font-size: 14px;color: #4c4c4c;font-weight: bold;border: 1px solid #c9c9c9;border-radius: 2px;background-color: #fff";
		css["yes"] = "width: 45%; color: #fff; border-color: #307cff; background-color: #307cff; height: 30px; font-size: 14px; font-weight: bold; border: 1px solid #c9c9c9; border-radius: 2px";

		for(var key in css) {
			css[key] = '{'+('\"'+css[key].replace(/:/ig,'\":\"').replace(/;/ig,'\",\"').replace(/\" /ig,'\"')+'\"').replace(/,\"\"/,'') +'}';
			_ITEM.find('.'+key).css(JSON.parse(css[key]));
		}

		//TEXT
		var text = {"title":"삭제", "cont": c18n("AA0157","삭제해도 되겠습니까?"), "no":c18n("CD755","취소"), "yes":c18n("H359","확인")};
		if('' !== coalesce(data) && data.text){
			text["title"] 	= coalesce(data.text["title"],text["title"]);
			text["cont"] 	= coalesce(data.text["cont"],text["cont"]);
			text["no"] 		= coalesce(data.text["no"],text["no"]);
			text["yes"] 	= coalesce(data.text["yes"],text["yes"]);
		} else {
			//done
		}
		//SHOW
		if($('body').find("#"+_ID).length == 0){

			for(var key in text) {
				_ITEM.find('.'+key).html(text[key]);
			}

			$('body').prepend(_ITEM);
			$('body').css("overflow","hidden");
			$('body').css("overflow-y","hidden");
		} else {

			for(var key in text) {
				$('body').find("#"+_ID).find('.'+key).html(text[key]);
			}
			$('body').find("#"+_ID).find(".no").remove();
			$('body').find("#"+_ID).show();
			$('body').css("overflow","hidden");
			$('body').css("overflow-y","hidden");
		}
		var _OBJ = $('body').find("#"+_ID);
		//event
		_OBJ.find('.yes').off('click').on('click',function(){
			close();
		})
		_OBJ.find('.close').off('click').on('click',function(){
			close();
		})

		function close(){
			if(data && data.close_func != null){
				var rs = data.close_func(_OBJ)
				if(null2void(rs,"")!== "" && !rs){
					return;
				}
			}
			_OBJ.remove();
			_OBJ.hide();
			$('body').css("overflow","visible");
			$('body').css("overflow-y","auto");
		}
	}

})();

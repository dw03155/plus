// push 확인
function setFuncDeployList(){
	var jexAjax = jex.createAjaxUtil("COLABO2_FUNC_R003");
	jexAjax.set("USER_ID", coalesce3(_USER_ID,$("#_USER_ID").val()));
	jexAjax.set("RGSN_DTTM", coalesce3(_RGSN_DTTM,$("#_RGSN_DTTM").val()));
	jexAjax.execute(function (dat) {
		if (!jex.isError(dat)) {
			setLocal("FUNC_DEPLOY_LIST", dat.FUNC_DEPLOY_LIST);
		} else {
			//done
		}
	});
}

//@유민호 : cnts_Null2Void는 너무너무 헷갈리니 이렇게 만듬 190711
function coalesce(org, sub){
	return ((org == null) ? (sub == undefined ? "" : sub) : org);
}

function coalesce2(org, sub){
	return ((org === "" || org == null) ? (sub == undefined ? "" : sub) : org);
}

function coalesce3(org, sub){
	return ((org === "" || org == null || org == undefined) ? (sub == undefined ? "" : sub) : org);
}

//@유민호 : 객체를 스트링으로 190729
function json(data){
	return JSON.stringify(data);
}

//@유민호 : 3번까지 시간 찍기
function start3(name){
	if(isTestServer() || _USER_ID === 'dellose' || _USER_ID === 'rumor1993' || _USER_ID === 'wawa2646' || _USER_ID === 'greenjkw'){
		console.time("start3 " + name);
	} else {
		//done
	}
}
function stop3(name){
	if(isTestServer() || _USER_ID === 'dellose' || _USER_ID === 'rumor1993' || _USER_ID === 'wawa2646' || _USER_ID === 'greenjkw'){
		console.timeEnd("start3 " + name);	
	} else {
		//done
	}
}

//@유민호 : 2.5초 알람 토스트
function toast(type, msg, timer){
	if(!timer){
		timer = 2500;
	}
	timer = (timer  < 2500)? 2500 : timer;
	var dat = {"type":type, "msg":msg, "timer": timer};
	//if( coalesce(msg, "") != ""){
		jsDraw.alert(dat);
		//}else{
		//doen.
		//}
}

//@유민호 : 바디스크롤 설정/해제 190618
function bodyScroll(scroll_yn){
	if(scroll_yn){
		$('body').css("overflow","visible");
		$('body').css("overflow-y","auto");
	} else {
		$('body').css("overflow","hidden");
		$('body').css("overflow-y","hidden");
	}
}

function clog(msg) {
	try{
		if (_DEV_REAL != "REAL"){
			console.log(msg);
		}else{
			//done.
		}
	}catch(e){
		
	}
}
function jkwlog(msg) {
	clog("redjkw ="+ msg);
}

function rumorlog(msg) {
	clog("rumor1993 ="+ msg);
}
function dablog(msg) {
	clog("dablog93 =", msg);
}
function csylog(msg){
	clog("csyTest ="+ msg);
}
/**
 * 센터위치.
 * @param obj
 */
function cmf_centerLocation(obj) {
	obj.css("position", "fixed");
	obj.css("top", "50%");
	obj.css("left", "50%");
	obj.css("margin-top", -obj.outerHeight() / 2 + 'px');
	obj.css("margin-left", -obj.outerWidth() / 2 + 'px');
}

function cmf_centerTopLocation(top) {
	var height = 200;
	if (!!top) {
		height = top;
	}
	return Math.max(0, (($(window).height() - $(this).outerHeight()) / 2) + $(window).scrollTop()) + height + "px";
}

function cmf_browser() {

	var Browser = {
		chk: navigator.userAgent.toLowerCase()
	}
	Browser = {
		ie: Browser.chk.indexOf('msie') != -1,
		ie6: Browser.chk.indexOf('msie 6') != -1,
		ie7: Browser.chk.indexOf('msie 7') != -1,
		ie8: Browser.chk.indexOf('msie 8') != -1,
		ie9: Browser.chk.indexOf('msie 9') != -1,
		ie10: Browser.chk.indexOf('msie 10') != -1,
		ie11: Browser.chk.indexOf('msie 11') != -1,
		ieYn: Browser.chk.indexOf('netscape') != -1 || Browser.chk.indexOf('trident') != -1 || Browser.chk.indexOf('msie') != -1,
		edge: Browser.chk.indexOf('edge') != -1,
		opera: !!window.opera,
		safari: Browser.chk.indexOf('safari') != -1,
		safari3: Browser.chk.indexOf('applewebkir/5') != -1,
		mac: Browser.chk.indexOf('mac') != -1,
		chrome: Browser.chk.indexOf('chrome') != -1,
		firefox: Browser.chk.indexOf('firefox') != -1
	}
	return Browser;
}

cf_setCookie = function(name, value, expiredays) {
	//alert("쿠키셋팅하기여기에");
	var todayDate  = new Date();
	var strExpOpt  = "";
	var strExpDt   = "";
	if (cnts_Null2Void(expiredays, "") != "") {
		todayDate.setDate( todayDate.getDate() + expiredays );
		strExpOpt = "expires=";
	    strExpDt = todayDate.toGMTString() + ";";
	}
    document.cookie = name + "=" + escape( value ) + "; path=/; "+ strExpOpt + strExpDt + ((location.protocol == "http:")? "":"; secure" );
};
/**
 *  쿠키 설정값 가져오기
 *  @param  name : 쿠키 설정키
 */
cf_getCookie = function( name ) {
	//alert("쿠키셋팅가져오기여기에");
    var nameOfcookie = name + "=";
    var x = 0;
    while ( x <= document.cookie.length )
    {
        var y = (x+nameOfcookie.length);
        if ( document.cookie.substring( x, y ) == nameOfcookie ) {
                if ( (endOfcookie=document.cookie.indexOf( ";", y )) == -1 )
         //     if ( (endOfcookie=document.cookie.indexOf( "; ", y )) == -1 )
                        endOfcookie = document.cookie.length;
                return unescape( document.cookie.substring( y, endOfcookie ) );
        }
        x = document.cookie.indexOf( " ", x ) + 1;
        if ( x == 0 ) break;
    }
    return "";
};

//@유민호 : 전문 실행 191115
function excuteAPI(_DATA){
	if(coalesce3(_DATA) == "" || coalesce3(_DATA.API_NM) == "") return;
	
	var jexAjax = jex.createAjaxUtil(_DATA.API_NM);

	for(key in _DATA){
		if(key != "API_NM" || key != "ASYNC" || key != "RSLT_FUNC")
		jexAjax.set(key	, _DATA[key]);
	}
	
	jexAjax.setAsync(coalesce3(_DATA.ASYNC,true));
	jexAjax.execute(function (dat) {
		if (jex.isError(dat)) return; 
		if(coalesce3(_DATA.RSLT_FUNC) !== ""){
			_DATA.RSLT_FUNC(dat);
		} else {
			//done
		}
	});
}


//@유민호 : autocomplete 묶는 함수 200211
function srchMethod(obj, func){	
	obj.autocomplete({
		minLength: 0,
		autoFocus: true,
		search: function () {
			func();
		},
		source: function () {
			//func();
		}
	});
}
//@유민호 : mCustomScrollbar 묶는 함수 200219
function setMscroll(obj, scr_func) {

	var os = userOsCheck()
	var mCustomOption

	if (os == "OS_X") {
		mCustomOption = {
			scrollInertia: 2000,

			scrollButtons: {
				enable: true
			},
			autoHideScrollbar : true,
			mouseWheel: {
				preventDefault: true,
				deltaFactor: "auto",
				scrollAmount: 40
			},
			callbacks: {
				whileScrolling: function () {
					var pct = this.mcs.topPct;
					if (pct >= 75) {
						if(typeof scr_func == "function"){
							scr_func();
						} else{
							//done
						}
					}
				}
			}
		}
	} else {
		mCustomOption = {
			scrollInertia: 50,

			scrollButtons: {
				enable: true
			},
			autoHideScrollbar : true,
			mouseWheel: {
				preventDefault: true,
				deltaFactor: "auto",
				scrollAmount: 40
			},
			callbacks: {
				whileScrolling: function () {
					var pct = this.mcs.topPct;
					if (pct >= 75) {
						if(typeof scr_func == "function"){
							scr_func();
						} else{
							//done
						}
					}
				}
			}
		}
	}
	// 채팅 스크롤설정
	obj.mCustomScrollbar("destroy");
	obj.mCustomScrollbar(mCustomOption);


}

var b_gtm = true;

function collectTagManager(_JSON) {
	//에러일
	try {
		if (_ENTER_YN == 'Y') return;
	}catch(e){
		//done.
	}

	if(( location.href.indexOf('flow.team') > -1 || location.href.indexOf('flowtest.info') > -1 )   ){
		
		_JSON.userId = btoa(unescape(encodeURIComponent(_JSON.userId)));

	    window.dataLayer = window.dataLayer || [];
	    window.dataLayer.push(_JSON);

	    if(b_gtm){
	    	
	    	b_gtm = false;

		    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
		    	new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
		    	j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
		    	'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
		    	})(window,document,'script','dataLayer','GTM-PJMHRLW');
		    
	    } else {
	    	//done
	    }

	} else {
		//done
	}
}
var _FLOW_LANG 			= "ko";
var _FLOW_TIMEZONE 		= "+900";
var _FLOW_SUMMERTIME 	= "false";
var _SERVER_DOMAIN		= location.host;

jQuery.loadScript = function (url, callback) { 
	jQuery.ajax({ 
		url: url,
        dataType: 'script',
        success: callback,
        async: false
    });
}


$(document).ready(function() {
	if (typeof String.format === 'function') return;

	String.prototype.format = function() {
		var args = arguments;
		return this.replace(/{(\d+)}/g, function(match, index) {
			return args[index] ? args[index] : match;
		});
	}
});

//@주광욱 : 정적 워드 관련 다국어 처리함수 190313
function setlanguage(lang, execute){
	cf_setCookie("FLOW_LANG", lang, 30 * 12 * 10);
	_FLOW_LANG = lang;
	jQuery.i18n.properties({
	    name:'messages', 
	    path:'js/collabo/message/', 
	    mode:'both',
	    language:lang,
	    async: false, //true일때 우선순위가 뒤로 밀려서 안되더라. false가 비동기인가?
	    callback: function(LANG_DATA) {
	    	setDataLangcode(lang, execute);
	    	if(location.href.indexOf('flow_layout') > -1){
		    	if(b_hyundaicar){
		    		setBizlang('HYUNDAI');
		    	} else if (b_joins){
		    		setBizlang('JOINS');
		    	} else {
		    		//done
		    	}
	    	}
	    }
	});
}   

function setBizlang(code){
	if(code === "JOINS"){
		convCdVal("FL556", 'CC671', "공개방 검색");
		convCdVal("CO931", 'CC673', "공개방");
		convCdVal("H197", 'CC674', "전체");
		convCdVal("CL608", 'CC675', "관심그룹");
		convCdVal("CL604", 'CC676', "협업방 만들기");
		convCdVal("CD748", 'CC677', "중요글");
		convCdVal("CM1314", 'CD852', "방 공개여부");
		convCdVal("CM1315", 'CD853', "공개방 카테고리");
		convCdVal("H140", 'CD854', "방만들기");
		
	} else if(code === "HYUNDAI"){
		//done
		convCdVal("FL556", 'HYUN556', "오픈 프로젝트");
		convCdVal("CO933", 'HYUN933', "오픈 프로젝트 만들기");
		
	}
	
	function convCdVal(prevCd, convCd, convVal){
		jQuery.i18n.map[prevCd] = [c18n(convCd,convVal)];
		$("[data-langcode="+prevCd+"]").attr('data-langcode',convCd);
		$("[data-langcode="+convCd+"]").text(c18n(convCd, convVal));
	}
}
 
//@주광욱 : data langcode를 세팅
function setDataLangcode(language, execute){
	//@유민호 : ko는 따로 가져오지 않음 190425
	if(language === "ko" && !execute){
		return;
	}

	// if(location.href.indexOf("borawork") > -1 && language === "en" && !execute){
	// 	return;
	// }
	
	$('[data-langcode]').each(function() {
		var $this = $(this);

		var _tmpStr = coalesce3(jQuery.i18n.prop($this.data('langcode')),"[" + coalesce3($this.data('langcode'),'translate') +"]");
		_tmpStr		= (_tmpStr === "$!$EMPTY$!$" ?"" : _tmpStr);
		_tmpStr		= (_tmpStr.indexOf("$!$O$!$") > -1 ? _tmpStr.replace("$!$O$!$","") : _tmpStr);

		try{
    		if($this.attr('placeholder')){			$this.attr('placeholder',_tmpStr);
    		} else if ($this.attr('alt')){			$this.attr('alt',_tmpStr);
    		} else if ($this.attr('title')){		$this.attr('title',_tmpStr);
    		} else if ($this.attr('ico-text')){		$this.attr('ico-text',_tmpStr);
    		} else {
    			if('INPUT' === $this.prop('tagName') && 'button' === $this.attr('type')){
    				$this.val(_tmpStr);
    			} else {
    				$this.html(_tmpStr);
    			}
    		}
		} catch (e) {
			//done
		}
	});
}

//@유민호 : 코드로 JS 뽑기 190318
function c18n(code,str,subject,b_interval){

	var _addCode = ""
	if(_FLOW_LANG == 'ko'){
		_addCode = "";
	} else if(_SERVER_DOMAIN.indexOf("develop.flow.team") > -1 || checkLocationDomain("DEV_TEST")) {
		_addCode = "["+coalesce3(code,'translate')+"] ";
	} else {
		_addCode = "";
	}

	var _tmpStr = coalesce3(i18n(code), _addCode + str);

	//빈값 처리
	if(_tmpStr === "$!$EMPTY$!$"){
		_tmpStr = "";
	} else {
		//pass
	}

	//변수 처리
	if(_tmpStr.indexOf("$!$O$!$") > -1){
		_tmpStr		= _tmpStr.replace("$!$O$!$",coalesce3(subject));
	} else {
		_tmpStr		= coalesce3(subject) + (b_interval ? " " : "") + _tmpStr;
	}

	return _tmpStr;

}

function i18n(code){
	try{
		if(jQuery.i18n.map[code]){ //이처리를 해줘야 렝쓰 오류가 안뜸
			return jQuery.i18n.prop(code);
		} else {
			return "";
		}
	} catch (e) {
		return "";
	}
}

function translateTaskType(taskType) {
	switch(taskType) {
		case "요청":
			return cnts_Null2Void(i18n('ui.label.taskType.request'), taskType);
		case "진행":
			return cnts_Null2Void(i18n('ui.label.taskType.progress'), taskType);
		case "피드백":
			return cnts_Null2Void(i18n('ui.label.taskType.feedback'), taskType);
		case "완료":
			return cnts_Null2Void(i18n('ui.label.taskType.complete'), taskType);
		case "보류":
			return cnts_Null2Void(i18n('ui.label.taskType.hold'), taskType);
		default:
			return taskType;
	}
}

//@유민호 : date-ko-kr.js에 의존하는 데이트다 보니 이렇게 바꿔져야할 것 같았음 요일은 190426 
function convertWeekday(str){
    switch(str) {
	    case "월": return cnts_Null2Void(i18n('CLP1043'),"월"); break;
	    case "화": return cnts_Null2Void(i18n('CLP1044'),"화"); break;
	    case "수": return cnts_Null2Void(i18n('CLP1045'),"수"); break;
	    case "목": return cnts_Null2Void(i18n('CLP1046'),"목"); break;
	    case "금": return cnts_Null2Void(i18n('CLP1047'),"금"); break;
	    case "토": return cnts_Null2Void(i18n('CLP1048'),"토"); break;
	    case "일": return cnts_Null2Void(i18n('CLP1049'),"일"); break;
	    default: return str; break;
	}
}

//@유민호 : date-ko-kr.js에 의존하는 데이트다 보니 이렇게 바꿔져야할 것 같았음 요일은 190426 
function convertMonth(str){
    switch(str) {
	    case "01월": return cnts_Null2Void(i18n('H104'),"01월"); break;
	    case "02월": return cnts_Null2Void(i18n('H105'),"02월"); break;
	    case "03월": return cnts_Null2Void(i18n('H106'),"03월"); break;
	    case "04월": return cnts_Null2Void(i18n('H107'),"04월"); break;
	    case "05월": return cnts_Null2Void(i18n('H108'),"05월"); break;
	    case "06월": return cnts_Null2Void(i18n('H109'),"06월"); break;
	    case "07월": return cnts_Null2Void(i18n('H110'),"07월"); break;
	    case "08월": return cnts_Null2Void(i18n('H111'),"08월"); break;
	    case "09월": return cnts_Null2Void(i18n('H112'),"09월"); break;
	    case "10월": return cnts_Null2Void(i18n('H113'),"10월"); break;
	    case "11월": return cnts_Null2Void(i18n('H114'),"11월"); break;
	    case "12월": return cnts_Null2Void(i18n('H115'),"12월"); break;
	    default: return str; break;
	}
}

//전역변수 _INTERVAL_
var _INTERVAL_ = adjustI18n("interval");

//@유민호 : 다국어 적용시 디자인 맞추기 위한 함수 190426 
function adjustI18n(mode, _this, _this2){
    switch(mode) {
	    case "collabo3_make":
	    	if(_FLOW_LANG === "en"){
	    		_this.css('float','right');
	    		_this.css('width','320px');
	    	} else {
	    		_this.css('float','');
	    		_this.css('width','');
	    	}
	    break;
	    
	    case "flow_left":
	    	if(_FLOW_LANG === "en"){
	    		_this.css('width','395px');
	    	} else {
	    		_this.css('width','426px');
	    	}
	    break;
	    
	    case "collabo3_task":
	    	if(_FLOW_LANG === "en"){
	    		_this.css('white-space','inherit');
	    	} else {
	    		_this.css('white-space','nowrap');
	    	}
	    break;
	    
	    case "flow_schd":
	    	if(_FLOW_LANG === "en"){
	    		if(_this.html().length < 6 && _this.html() !== 'March'){ //4,5,6,7월
	    			_this.css('margin','8px 0 0 23px');
	    		} else if (_this.html() === 'March' || _this.html() === 'August'){ //3,8월
	    			_this.css('margin','8px 0 0 13px');
	    		} else if (_this.html() === 'October'){ //10월
	    			_this.css('margin','8px 0 0 8px');
	    		} else { // 1,2,9,11,12월
	    			_this.css('margin','8px 0 0 3px'); 
	    		}
	    	} else {
	    		_this.css('margin','8px 0 0 23px');
	    	}
	    break;
	    
	    //영어일 띄어쓰기할 때가 있음 예) 1명 -> 1 person
	    case "interval":
	    	if(_FLOW_LANG === "en"){
	    		return " "
	    	} else {
	    		return ""
	    	}
	    break;
	    
	    //영어일 경우 글자 순서를 바꿔줘야 할때가 있음 예) 2 선택 -> select 2
	    case "reverse":
	    	if(_FLOW_LANG === "en"){
	    		return _this2 + " " + _this
	    	} else {
	    		return _this + " " + _this2
	    	}
	    break;
	    
	    //영어일 경우 글자 순서를 바꿔줘야 할때가 있음 예) 전체에서 검색 -> search in total
	    case "reverse2":
	    	if(_FLOW_LANG === "en"){
	    		return _this2 + " " + _this
	    	} else {
	    		return _this + _this2
	    	}
	    break;
	    
	    //영어일 경우 글자가 없어야 될때가 있음 예) 월요일 -> MON, 건 -> X
	    case "empty":
	    	if(_FLOW_LANG === "en"){
	    		return ""
	    	} else {
	    		return cnts_Null2Void(_this, _this2);
	    	}
	    break;
	    
	    //영어일 경우 글자를 스킵해야될때 있음 예) 1명 -> 스킵
	    case "skip":
	    	clog('?')
	    	
	    	if(_FLOW_LANG === "en"){
	    		return " others"
	    	} else {
	    		return _this;
	    	}
	    break;
	
	    default:
	    break;
	}
    
}

//@유민호 : 다국어 및 타임존 설정 190325
function setI18nTz(){	
	_FLOW_LANG 			 = cnts_Null2Void(cf_getCookie("FLOW_LANG"),"");
	_FLOW_TIMEZONE		 = cnts_Null2Void(cf_getCookie("FLOW_TIMEZONE"),"");
	//LANG 처리
	if("" === _FLOW_LANG){
		//DEFAULT 처리
		cf_setCookie("FLOW_LANG","ko", 30 * 3 * 10000);
		setlanguage("ko"); 	
		
		//비동기 처리
		$.get("https://ipinfo.io", function(response) {		 
			switch (response.country){
				case "KR" : _FLOW_LANG = "ko"; break;
				default	  : _FLOW_LANG = "en"; break;
			}
			cf_setCookie("FLOW_LANG", _FLOW_LANG, 30 * 3 * 10000);
			setlanguage(_FLOW_LANG); 			
		}, "jsonp");
	} else if ("ko" === _FLOW_LANG){
		//done
	} else {
		setlanguage(_FLOW_LANG);
	}
	
	//TIMEZONE 처리
	if("" === _FLOW_TIMEZONE){
		_FLOW_TIMEZONE = "+900";
		cf_setCookie("FLOW_TIMEZONE", "+900", 30 * 3 * 10000);
	} else {
		//done
	}
	
	setContent();

}

function setContent(){
	$('body').prepend(
		'<style>'+ 
		'.icon-focused-move:before { 	content: "'+c18n('C1786','이동')+'"	}'+
		'.icon-focused-delete:before {	content: "'+c18n('H381','삭제')+'"	}'+
		'</style>'
	);
}

//@유민호 : 타임존 190319 
/*
 *  +900 korea(ko), japan(jp) 
 *  +800 singapole(sp), china(cn), Philippines(pp)
 *  +700 Vietnam(vn), Cambodia(cb), Thailand(tl)
 *  +530 India
 *  +100 Germany, Spain, Italy, France
 *  +000 England
 *  -300 Brazil
 *  -330 Canada
 *  -500 USA
 *  -600 USA
 *  -700 USA
 *  -800 USA, MEXICO
 */
function tzTime(time, mode){
	if(!time || time.length < 14 || !Date.parseExact(time, "yyyyMMddHHmmss")){
		return time;
	} 

	var tz = cnts_Null2Void(_FLOW_TIMEZONE,"");
	var timeSec = "";

	//넣을때는 input 모드로 하여 역으로 계산할 수 있게함
	if(mode === "input"){
		timeSec = Date.parseExact(time, "yyyyMMddHHmmss")
			.addHours("9").addHours(-1 * tz.slice(0,2)).addMinutes(-1*(tz.slice(0,1)+tz.slice(2,4)));
	} else {
		timeSec = Date.parseExact(time, "yyyyMMddHHmmss")
			.addHours("-9").addHours(tz.slice(0,2)).addMinutes(tz.slice(0,1)+tz.slice(2,4));
	}
	//서머타임 기간이면서 서머타임이 적용되는 국가일 경우 적용
	if(DST() && _FLOW_SUMMERTIME === "true"){
		if(mode === "input"){
			timeSec.addHours(+1);
		} else {
			timeSec.addHours(-1);
		}
	}

	return String(timeSec.getFullYear())
	+zeroPlus(timeSec.getMonth()+1)
	+zeroPlus(timeSec.getDate())
	+zeroPlus(timeSec.getHours())
	+zeroPlus(timeSec.getMinutes())
	+zeroPlus(timeSec.getSeconds());
	
}

//@유민호 : 시간에서 한자리를 두자리로 190326
function zeroPlus(num){
	if(String(num).length == 1){
		return "0"+num;
	} else {
		return String(num);
	}
}

//@유민호 : 써머타임 구하는 함수 190401 
function DST(){
	
	var today = new Date;
	var yr = today.getFullYear();
	var dst_start = new Date("March 10, "+yr+" 02:00:00"); 	// 2nd Sunday in March can't occur after the 14th 
	var dst_end = new Date("November 03, "+yr+" 02:00:00"); // 1st Sunday in November can't occur after the 7th
	var day = dst_start.getDay();							// day of week of 14th
	dst_start.setDate(14-day); 								// Calculate 2nd Sunday in March of this year
	day = dst_end.getDay(); 								// day of the week of 7th
	dst_end.setDate(7-day); 								// Calculate first Sunday in November of this year
	if (today >= dst_start && today < dst_end){ 			//does today fall inside of DST period?
	return true; 											//if so then return true
	}
	return false; 											//if not then return false
}

/*
 * @유민호 : 시간을 AM 12:00로 바꾸는 함수 190326
 * @param time    		인풋시간
 * @param onlyTimeYn    True(오전,오후로만), False(데이트로도 표현)
 */
function convertDateTime(time, onlyTimeYn){
	if(time == null ||  time.length < 14 ){
		return time;
	} 
	var amPm = cnts_Null2Void(i18n('DCC2626'),'오전');
	var hour = time.slice(8,10);
	
	if(time.slice(0,8) === tzTime(getNowTime()).slice(0,8) || onlyTimeYn){
		if(time.slice(8,10) < 12 ){
			amPm = cnts_Null2Void(i18n('DCC2626'),'오전');
			hour = zeroPlus(time.slice(8,10));
		} else {
			amPm = cnts_Null2Void(i18n('DCC2627'),'오후');
			hour = (time.slice(8,10) == 12 ? 12 : zeroPlus(time.slice(8,10)-12));
		}
		return amPm + " " +  hour + ":" + time.slice(10,12);
	} else {	
		return time.slice(0,4) + "-" + time.slice(4,6) + "-" + time.slice(6,8);
	}
	
}

/*
 * @유민호 : 시간을 방금, 5분전, 2시간 전으로 바꾸는 함수 190326
 * @param time    	인풋시간
 * @param mode		main(메인리스트), alarm(알람리스트)
 */
function convertDateMsg(time, mode){
	if(time == null || time.length < 14){
		return time;
	} 
	
	var nowDate = Date.parseExact(tzTime(getNowTime()), "yyyyMMddHHmmss");
	var timeDate = Date.parseExact(time, "yyyyMMddHHmmss");
	if(timeDate != null && nowDate != null){
		var dateGap = Math.round((nowDate.getTime() - timeDate.getTime()) / (1000*60)); //분차이
		var msgTime = cnts_Null2Void(i18n('DCC2628'),'방금');
		if(mode !== "viewer"){
			if(dateGap < 3){ 										//3분
				msgTime = cnts_Null2Void(i18n('DCC2628'),'방금');
			} else if (dateGap >= 3 && dateGap < 60){ 				//60분
				msgTime = dateGap+adjustI18n("interval")+cnts_Null2Void(i18n('DCC2629'),'분전');
			} else if (dateGap >= 60 && dateGap < 780) {
				msgTime = Math.round(dateGap / 60)+adjustI18n("interval")+cnts_Null2Void(i18n('DCC2630'),'시간전');
			} else {
				if(mode === "main"){
					if(time.slice(4,5) === "0"){
						msgTime = time.slice(5,6) + "/";
					} else {
						msgTime = time.slice(4,6) + "/"; 
					}
					if(time.slice(6,7) === "0"){
						msgTime += time.slice(7,8);
					} else {
						msgTime += time.slice(6,8);
					}
				} else {
					msgTime = time.slice(0,4) + "-" + time.slice(4,6) + "-" + time.slice(6,8) + " | " 
							+ time.slice(8,10) + ":" + time.slice(10,12);
				}
			}
		} else {
			msgTime = time.slice(0,4) + "-" + time.slice(4,6) + "-" + time.slice(6,8) + " "
			+ time.slice(8,10) + ":" + time.slice(10,12);
		}		
		return msgTime;
	} else {	
		return time;
	}
}

//@유민호 : 현재시간가져오기 190214
function getNowTime(){
	var now = new Date();

	if(_FLOW_LANG === 'ko'){
		// LANG CODE가 한국일 때 강제로 한국시간으로 맞추기
		var utc = now.getTime() + (now.getTimezoneOffset() * 60 * 1000);
		var KR_TIME_DIFF = 9 * 60 * 60 * 1000;
		now = new Date(utc + (KR_TIME_DIFF));
	}

    return (now.getFullYear() + '' + 
    	   (((now.getMonth() + 1) < 10) ? ("0" + (now.getMonth() + 1)) : (now.getMonth() + 1)) + '' +
    	   ((now.getDate() < 10 ) ? ("0"+now.getDate()):(now.getDate()))+ '' +    		
    	   ((now.getHours() < 10 ) ? ("0"+now.getHours()):(now.getHours())) + '' + 
    	   ((now.getMinutes() < 10) ? ("0" + now.getMinutes()) : (now.getMinutes())) + '' +
    	   ((now.getSeconds() < 10) ? ("0" + now.getSeconds()) : (now.getSeconds())));
}

//@유민호 : 현재시간기준 일요일 날자 가져오기 190503
function getWeekStart(sum){
	var now = new Date();
    var nowDayOfWeek = now.getDay(); 
    var nowDay = now.getDate();
    var nowMonth = now.getMonth(); 
    var nowYear = now.getYear(); 
    nowYear += (nowYear < 2000) ? 1900 : 0; 
    if(sum == null){
    	sum = 0;
    }
    var weekStartDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek + sum);
    return nowYear+""+zeroPlus(weekStartDate.getMonth()+1)+""+zeroPlus(weekStartDate.getDate());
}



//@주광욱 : date 값을 넘기면 YYYYMMDDHHmmss 형식으로 보냄
function getConvtTime(date){
    return (date.getFullYear() + '' + 
    	   (((date.getMonth() + 1) < 10) ? ("0" + (date.getMonth() + 1)) : (date.getMonth() + 1)) + '' +
    	   ((date.getDate() < 10 ) ? ("0"+date.getDate()):(date.getDate()))+ '' +    		
    	   ((date.getHours() < 10 ) ? ("0"+date.getHours()):(date.getHours())) + '' + 
    	   ((date.getMinutes() < 10) ? ("0" + date.getMinutes()) : (date.getMinutes())) + '' +
    	   ((date.getSeconds() < 10) ? ("0" + date.getSeconds()) : (date.getSeconds())));
}

function getNowMilTime(){
	var now = new Date();
    return (((now.getHours() < 10 ) ? ("0"+now.getHours()):(now.getHours())) + '' + 
    	   ((now.getMinutes() < 10) ? ("0" + now.getMinutes()) : (now.getMinutes())) + '' +
    	   ((now.getSeconds() < 10) ? ("0" + now.getSeconds()) : (now.getSeconds())) + '' +
    	   ((now.getMilliseconds() < 100) ? ("0" + now.getMilliseconds()) : (now.getMilliseconds())))
    	   ;
}

function str2formNotMoment(dttm){
	return dttm.slice(0, 4) + "-" + dttm.slice(4,6) + "-" + dttm.slice(6,8);
}

var DateConverter = (function() {
	
	return {
		str2form : str2form
	};

	function str2form(dttm, type){
		
		var tmpDate = "";
		var tmpFormat = "";
		var rst = "";

		if(coalesce3(dttm) == "") dttm = "";
		if(coalesce3(type) == "") type = "";
		
        if(dttm.length == 18){
        	dttm = dttm.slice(0,14);
        }

		if(dttm.length == 14){
			tmpDate  = moment(tzTime(dttm).slice(0, 8) + 'T' + tzTime(dttm).slice(8));
		// @소문혁 업무모아보기 시간추가 
		} else if (dttm.length == 12){
			tmpDate  = moment(tzTime(dttm).slice(0, 8) + 'T' + tzTime(dttm).slice(8));
		} else if (dttm.length == 8){
			tmpDate  = moment(tzTime(dttm));
		} else {
			tmpDate  = moment(); //현재시간
		}

		
		if(type == 1){
			tmpFormat = "YYYY-MM-DD HH:mm";
		} else if (type == 2){
			tmpFormat = "YYYY-MM-DD";
		} else if (type == 3){
			tmpFormat = "ddd";
		} else if (type == 4){
			tmpFormat = "M/DD";
		} else if (type == 5){
			tmpFormat = "YYYY-MM-DD (ddd)";
		// @소문혁 업무모아보기 시간추가 
		} else if (type == 6){
			tmpFormat = "YYYY-MM-DD (ddd), HH:mm";
		} else if (type == 7){
			tmpFormat = "(ddd), HH:mm";
		} else if (type == 8){
			tmpFormat = "a HH:mm";
		} else {
			tmpFormat = "";
		}

		if(tmpFormat === ""){
			rst = tmpDate;
		} else {
			rst = tmpDate.format(tmpFormat);
		}
		
		return rst;
	}
	
})();
//@유민호 : 3번서버까지 가능하게 190319
function isTestServer() {
	if (location.host.indexOf("flowdev.info") > -1 ||
		location.host.indexOf("flowteam.info") > -1 ||
		location.host.indexOf("flowtest.info") > -1 ||
		location.host.indexOf("develop.flow.team") > -1 ||
		location.host.indexOf("staging.flow.team") > -1) {
		return true;
	} else {
		return false;
	}
}

function checkLocationDomain(checkMode) {
	if ("ALL_TEST" === checkMode){
		return isTestServer()
	} else if ("REAL_TEST" === checkMode){
        return (location.host.indexOf("develop.flow.team") > -1 ||
            location.host.indexOf("staging.flow.team") > -1)
    } else if ("DEV_TEST" === checkMode) {
        return (
            location.host.indexOf("localhost") > -1 ||
            location.host.indexOf("flowdev.info") > -1 ||
            location.host.indexOf("flowteam.info") > -1 ||
            location.host.indexOf("flowtest.info") > -1)
    } else {
		return false
	}
}

//enter cokkie
function setCookie(cookie_name, value) {
	document.cookie = cookie_name + '=' + value;
}
function getCookie(cookie_name) {
	var x, y;
	var val = document.cookie.split(';');

	for (var i = 0; i < val.length; i++) {
		x = val[i].substr(0, val[i].indexOf('='));
		y = val[i].substr(val[i].indexOf('=') + 1);
		x = x.replace(/^\s+|\s+$/g, ''); // 앞과 뒤의 공백 제거하기
		if (x == cookie_name) {
			return unescape(y); // unescape로 디코딩 후 값 리턴
		}
	}
}
function setCookieEnter(boolean){
	setCookie('enter_yn',boolean);
}
function getCookieEnter() {
	var YN = getCookie('enter_yn');
	if (YN == null || YN == undefined || YN == "true") {
		return 'Y';
	}
	else {
		return 'N';
	}
}


//@유민호 : 플로우 팀에서만 작동 190625
function isFlowTeam(){
	//@안광선 : location.origin에서 location.href로 수정 (이유 : IE9, 10에서 오류)
	if(location.href.indexOf("flow.team") > -1){
		return true;
	} else {
		return false;
	}
}

//@유민호 : 마드라스체크 이용기관만 가능하게 190401
function isMadras(){
	if(_USE_INTT_ID === "UTLZ_1608261809693" || _USER_ID === "madrascheck" ){
		return true;
	} else {
		return false;
	}
}

//@유민호 : 조인스 유알엘에서만 가능하게 190619
function isJoins(){		//@주광욱 2019.7.16 조인스 구분 없어짐.
	if(location.href.indexOf("joinsflow") > -1 ){
		return true;
	} else {
		return false;
	}
}

//@유민호 : 투어 여부 확인 함수 190517 / 나중에 투어 프로젝트들은 전문으로 불러오는 처리가 필요할듯! / Array.of("")는 IE먹지않음 / includes도 IE안먹음
function isTour(){
	//투어플로우 계정이거나 투어방일때 투어다, 단, 마드라스체크는 제외
	var _COLABO_SRNO = $('#projectSrno').text();
	var _SRNOS = ["449508", "449509", "449511", "449512", "449513", "449519", "449524",
				  "449522", "449528", "449527", "449520", "449529", "449518", "449517"];
	clog("IS TOUR COLABO SRNO ### " + _COLABO_SRNO);
	if (_USER_ID === "tour@flow.team" ||
		(($('#project-detail').css('display') === "block") &&_SRNOS.join().indexOf(_COLABO_SRNO)) > 0){
		if(isMadras()){
			return false;
		} else {
			return true;
		}
	} else {
		return false
	}
}

function isGuest(){
	var splitId = _USE_INTT_ID.split("_");

	if(	((splitId[0] == "KAKAO" || splitId[0] == "GMAIL" || splitId[0] == "APPLE" || splitId[0] == "FLOW" || splitId[1] == "2" ) && _BUY_YN !== "P")
		||
		("Y" == getLocal("SERP_YN") &&   "F" == getLocal("STTS")	)
		||
		(splitId[0] == "UTLZ" &&   "F" == getLocal("STTS")	)

	){
		return true;
	} else {
		return false;
	}
}


//@주광욱 2019.9.16
function isHyundaiCar(){
	if(	(location.href.indexOf(".info") > -1 && _USER_ID == "hyundai1")
		|| location.href.indexOf("flow.hmc.co.kr") > -1
		|| location.href.indexOf("flow.kia.co.kr") > -1
		|| location.href.indexOf("211.252.134.175")	> -1	//VIP
		|| location.href.indexOf("211.252.134.167") > -1	//#1
		|| location.href.indexOf("211.252.134.177")	> -1	//#2
	){
		return true;
	}else{
		return false;
	}
}



//@주광욱 : 현대모비스 2019.10.14
function isMobis(){
	if(location.href.indexOf("flow.mobis.co.kr") > -1 || location.href.indexOf("flow_mobis.flowdev.info") > -1){
		return true;
	} else {
		return false;
	}
}

/**
 * <pre>
 * COLLABO PROJECT
 * @COPYRIGHT (c) 2009-2012 WebCash, Inc. All Right Reserved.
 *
 * @File Name      : auth_layer.js
 * @File path    	 : COLLABO_PT_STATIC/web/js/collabo/collabo2020
 * @author       	 : 주광욱 ( greenjkw@naver.com )
 * @Description    : 인증 레이어
 * @History      	 : 20200630111632, 주광욱
 * </pre>
 **/
var auth_layer = (function() {

	var authLayer;
	var successFunction = "";

	return {
		emailAuthCheck: emailAuthCheck,	//회원가입시 인증 체크 레이어 뜨도록 한다.
		createAuthLayer: createAuthLayer,
		setSuccessFunction: setSuccessFunction
	};

	//회원가입일시 이메일로 인증번호를 보낸다.
	function emailAuthCheck(userId) {
		var authData = {};
		authData["AUTH_TYPE"] 	= "E";
		authData["EML"] 		= userId;
		authData["USER_ID"] 	= userId;

		createAuthLayer(authData);

		//이메일로 전송처리.
		fn_authSend(authData);
		

	}
	//인증 팝업 뷰 만드는 부분
	function authView(callback, dat) {
		if( !authLayer){
			//하단에 authLayer를 붙여준다.
			$("body").append("<div id='authLayerTemp'></div>");
			$("#authLayerTemp").load("/collabo/collabo2020/auth_layer_view.jsp",
				function () {
					authLayer = $("#authLayerTemp").find("#authLayer");
					callback(dat);
				}
			);
		} else {
			callback(dat);
		}
	}

	function setSuccessFunction(func) {
		if (!func) {
			successFunction = "";
		}
		if (!(func instanceof Function)) {
			jkwlog("인증 후 콜백이 함수가 아닙니다.");
			return;
		}
		successFunction = func;
		return;
	}

	function successFunc(callback, dat) {
		callback(dat);
	}

	function failFunc(callback, dat) {
		callback(dat);
	}

	/*
	 * 인증체크로직.
	 */
	function createAuthLayer(dat) {
		authView(authLayerEvent, dat);
	}
	
	function authLayerEvent(dat) {
		$("#collabo_mod_bg_layer").css("z-index", "90000").fadeIn();
		cmf_centerLocation(authLayer);
		$("#authErrMsgLayer").hide();
		authLayer.css("z-index", "90001").fadeIn();
		
		
	
		// close
		authLayer.find("#authLayerClose").off();
		authLayer.find("#authLayerClose").on("click", function () {
			initAuthLayer();
		});
		
	
		// 닫기.
		authLayer.find("#authLayerExit").off();
		authLayer.find("#authLayerExit").on("click", function () {
			initAuthLayer();
		});
	
		authLayer.find(".iptbx").off();
		authLayer.find(".iptbx").on("click", function () {
			authLayer.find("#AUTH_NO").focus();
	
		});
		// 6자리 인증번호 체크
		authLayer.find("#AUTH_NO").off();
		authLayer.find("#AUTH_NO").on("keyup", function (e) {
	
	
			if (authLayer.find("#AUTH_NO").val().length == 6) {
				authLayer.find("#authSendBtn").removeClass("off").addClass("on");
	
				if (e.keyCode && e.keyCode == 13) {
					fn_authConfirm(dat);
				} else {
	
				}
			} else {
				authLayer.find("#authSendBtn").removeClass("on").addClass("off");
			}
	
	
		});
	
	
	
	
		// 인증번호 확인
		authLayer.find("#authSendBtn").off();
		authLayer.find("#authSendBtn").on("click", function () {
			if (authLayer.find("#authSendBtn").hasClass("on")) {
				// 인증 번호를 호출.
				fn_authConfirm(dat);
	
	
			}
	
		});
	
		// 재전송.
		authLayer.find("#authReSend").off();
		authLayer.find("#authReSend").on("click", function () {
			fn_authSend(dat);
	
		});
	
		if (cnts_Null2Void(dat.ERR_CD, "") == "6001") { // 그룹웨어에서 이메일주소를 등록해주세요.
			authLayer.find("#authNoLayer").fadeIn();
			authLayer.find("#authNoLayer").find("#authNoNm1").text(cnts_Null2Void(i18n('DL173'),"이메일주소"));
			authLayer.find("#authNoLayer").find("#authNoNm2").text(cnts_Null2Void(i18n('DL173'),"이메일주소"));
			authLayer.find("#authCheckLayer").hide();
		} else if (cnts_Null2Void(dat.ERR_CD, "") == "6002") { // 그룹웨어에서 휴대폰번호를
																// 등록해주세요.
			authLayer.find("#authNoLayer").fadeIn();
			authLayer.find("#authNoLayer").find("#authNoNm1").text(cnts_Null2Void(i18n('H358'),"휴대폰번호"));
			authLayer.find("#authNoLayer").find("#authNoNm2").text(cnts_Null2Void(i18n('H358'),"휴대폰번호"));
			authLayer.find("#authCheckLayer").hide();
		} else {
			authLayer.find("#authNoLayer").hide();
			authLayer.find("#authCheckLayer").fadeIn();
	
			if (cnts_Null2Void(dat.AUTH_TYPE, "") == "E") { // 이메일 인증
				var strEml = "";
				if (cnts_Null2Void(dat.EML, "").indexOf("@") > -1) {
					strEml = cnts_Null2Void(dat.EML, "").substr(0, cnts_Null2Void(dat.EML, "").indexOf("@") - 2) + "**" + cnts_Null2Void(dat.EML, "").substr(cnts_Null2Void(dat.EML, "").indexOf("@"));
				} else {
					// done.
				}
				authLayer.find("#authText").text(strEml);
			} else if (cnts_Null2Void(dat.AUTH_TYPE, "") == "H") { // 휴대폰번호 인증
				var strClphNo = cmf_convrClphNo(cnts_Null2Void(dat.CLPH_NO, "")).replace(/ /gi, "-");
				strClphNo = strClphNo.substr(0, strClphNo.length - 2) + "**";
				authLayer.find("#authText").text(strClphNo);
			} else if (cnts_Null2Void(dat.AUTH_TYPE, "") == "A") { // 둘다 보내기
				authLayer.find("#authText").text(dat.CLPH_NO+"\n"+dat.EML);
			}
	
			authLayer.find("#AUTH_NO").focus();
			authLayer.find("#authTime").focus();
	
	
			var AUTH_TIME_MM = "3";
			if (cnts_Null2Void(dat.AUTH_TIME_MM) == "") {
				AUTH_TIME_MM = "3";
			} else {
				AUTH_TIME_MM = cnts_Null2Void(dat.AUTH_TIME_MM);
			}
			authLayer.find("#authTime").data("AUTH_TIME_MM", AUTH_TIME_MM);
			CountDownTimer(parseInt(AUTH_TIME_MM));
	
	
		}
	}
	function fn_authSend(dat){
		var jexAjax = jex.createAjaxUtil("FLOW_AUTH_NO_CHECK_R002");
		
		//@jkw 2020.6.29
		/*
		if ($("#_SERVICE_VERSION").val() == "" &&  $("#main").find("#REG_1").css("display") != "none") {	//일반 회원가입
			jexAjax.set("USER_ID",  $.trim($("#main").find("#USER_ID").val())	);
		}else if( $("#_SERVICE_VERSION").val() == "" && $("#businessMngrSignUpPopup").find("#businessCreateAccount").css("display") != "none"){
			jexAjax.set("USER_ID",  $("#businessMngrSignUpPopup").find("#businessCreateAccount").find("input[name=email]").val());
		}else if ($("#_SERVICE_VERSION").val() == "B" && $("#businessLoginDiv").find("#signUpBox").css("display") != "none"){
			jexAjax.set("USER_ID",  $("#businessLoginDiv").find("#signUpBox").find("input[name=email]").val());	
		}else {
			if($("#enterpriseLoginDiv").find("input[name=email]").val() == ""){
				jexAjax.set("USER_ID",  $("#main").find("#USER_ID").val());	
			} else {
				jexAjax.set("USER_ID", $("#enterpriseLoginDiv").find("input[name=email]").val());	
			}		
		}
		*/
		jexAjax.set("USER_ID", dat.USER_ID);
		
		
		if (cnts_Null2Void($("#upgradePopup").css("display"), "none") != "none") {	//일반회원
			setGuid(jexAjax, "");
		} else if (window.location.pathname.indexOf("/ktflow/sign_up.jsp") > -1
			|| window.location.href.indexOf("ktworks.co.kr") > -1 || window.location.href.indexOf("ktflow.co.kr") > -1
			|| window.location.href.indexOf("ktbizworks.co.kr") > -1
		) {
			setGuid(jexAjax, "");
		} else {
			setGuid(jexAjax, clientIp);
		}
	
		jexAjax.execute(function (dat) {
			authLayer.find("#AUTH_NO").val("");
			authLayer.find("#AUTH_NO").focus();
			clearInterval(authLayer.find("#authTime").data("timer"));
			authLayer.find("#authErrMsgLayer").hide();
	
			var AUTH_TIME_MM = "3";
			if (cnts_Null2Void(dat.AUTH_TIME_MM) == "") {
				AUTH_TIME_MM = "3";
			} else {
				AUTH_TIME_MM = cnts_Null2Void(dat.AUTH_TIME_MM);
			}
			
			//@jkw 2020.7.13 개발일 경우에만 인증번호값이 넘어옵니다.
			if( cnts_Null2Void(dat.AUTH_NO) != ""){
				alert("개발일 경우에는 인증번호가 세팅되니다.");
				authLayer.find("#AUTH_NO").val(dat.AUTH_NO);
			}else{
				//done.
			}
			authLayer.find("#authTime").text(AUTH_TIME_MM + ":00");
			authLayer.find("#authTime").data("AUTH_TIME_MM", AUTH_TIME_MM);
	
			CountDownTimer(parseInt(AUTH_TIME_MM));
		});
	}
	function fn_authConfirm(dat) {
		if( cnts_Null2Void(authLayer.find("#AUTH_NO").val(), "") == ""){
			alert("인증번호를 입력하시기 바랍니다.");
			return;
		}else{
			
		}
		var jexAjax = jex.createAjaxUtil("FLOW_AUTH_NO_CHECK_R001");
		
		/*
		//@jkw 2020.6.29 
		if ($("#_SERVICE_VERSION").val() == "" &&  $("#main").find("#REG_1").css("display") != "none") {	//일반 회원가입
			jexAjax.set("USER_ID",  $.trim($("#main").find("#USER_ID").val())	);
		}else if( $("#_SERVICE_VERSION").val() == "" && $("#businessMngrSignUpPopup").find("#businessCreateAccount").css("display") != "none"){
			jexAjax.set("USER_ID",  $("#businessMngrSignUpPopup").find("#businessCreateAccount").find("input[name=email]").val());
		}else if ($("#_SERVICE_VERSION").val() == "B" && $("#businessLoginDiv").find("#signUpBox").css("display") != "none"){
			jexAjax.set("USER_ID",  $("#businessLoginDiv").find("#signUpBox").find("input[name=email]").val());
		}else {
			if ($("#_SERVICE_VERSION").val() == "E") {
				jexAjax.set("USER_ID", $("#enterpriseLoginDiv").find("input[name=email]").val());
			}else if ($("#_SERVICE_VERSION").val() == "B") {
				jexAjax.set("USER_ID", $("#businessMngrSignUpPopup").find("#businessCreateAccount").find("input[name=email]").val());
			}else{
				jexAjax.set("USER_ID", $("#main").find("#USER_ID").val());
			}
		}
		*/
		jexAjax.set("USER_ID", dat.USER_ID);


		jexAjax.set("AUTH_NO", authLayer.find("#AUTH_NO").val());
		jexAjax.set("AUTH_TIME_MM", authLayer.find("#authTime").data("AUTH_TIME_MM"));


		if (cnts_Null2Void($("#upgradePopup").css("display"), "none") != "none") {	//일반회원
			setGuid(jexAjax, "");
		} else if (window.location.pathname.indexOf("/ktflow/sign_up.jsp") > -1
			|| window.location.href.indexOf("ktworks.co.kr") > -1 || window.location.href.indexOf("ktflow.co.kr") > -1
			|| window.location.href.indexOf("ktbizworks.co.kr") > -1
		) {
			setGuid(jexAjax, "");
		} else {
			setGuid(jexAjax, clientIp);
		}

		jexAjax.execute(function (dat) {
			if (cnts_Null2Void(dat.RSLT_CD, "") != "0000") {
				authLayer.find("#authErrMsg").text(dat.ERR_MSG);
				authLayer.find("#authErrMsgLayer").show();
			} else {
				initAuthLayer();
				//@[song] 2020.09.29 kt flow 처리를 위해 register User 하는 부분. set success function 을 하고 후에 콜백한다.
				if (successFunction) {
					successFunction();
					return;
				}
				//@jkw 2020.6.29 회원가입일 경우
				if (cnts_Null2Void($("#upgradePopup").css("display"), "none") != "none") {	//일반회원
					upgrade.registerUser();
				} else if ($("#_SERVICE_VERSION").val() == "" && cnts_Null2Void($("#main").find("#REG_1").css("display"), "none") != "none") {	//일반회원
					fn_registerC001();
				} else if ($("#_SERVICE_VERSION").val() == "" && cnts_Null2Void($("#businessMngrSignUpPopup").css("display"), "") != "none") {		//일반기업회원
					bisSignup.registerUser();
				} else if ($("#_SERVICE_VERSION").val() == "B" && cnts_Null2Void($("#businessLoginDiv").find("#signUpBox").css("display"), "") != "none") {	//@jkw 2020.6.29 기업용 회원가입일 경우
					bisLogin.registerUser();
				} else {
					// main 로직
					if ($("#_SERVICE_VERSION").val() == "E") {
						entLogin.fn_goLogin(_ID_GB);
					}else if ($("#_SERVICE_VERSION").val() == "B") {
						bisLogin.fn_goLogin(_ID_GB);
					}else{
						fn_goLogin(_ID_GB);
					}
				}
				
			}
		});
	}
	
	function initAuthLayer() {
		authLayer.css("z-index", "1100").hide();
		$("#collabo_mod_bg_layer").css("z-index", "1000").hide();
		authLayer.find("#AUTH_NO").val("");
		clearInterval(authLayer.find("#authTime").data("timer"));
		authLayer.find("#authErrMsgLayer").hide();
	}
	
	function CountDownTimer(AUTH_TIME_MM) {
		var end = new Date();
		end.setMinutes(end.getMinutes() + AUTH_TIME_MM);
		var _second = 1000;
		var _minute = _second * 60;
		var _hour = _minute * 60;
		var _day = _hour * 24;
		var timer;
	
		function showRemaining() {
			var now = new Date();
			var distance = end - now;
			if (distance < 0) {
				clearInterval(timer);
				authLayer.find("#authErrMsg").text(cnts_Null2Void(i18n('DL175'),"인증시간이 초과되었습니다."));
				authLayer.find("#authErrMsgLayer").show();
				return;
			}
			var days = Math.floor(distance / _day);
			var hours = Math.floor((distance % _day) / _hour);
			var minutes = Math.floor((distance % _hour) / _minute);
			var seconds = Math.floor((distance % _minute) / _second);
			if (seconds < 10) {
				seconds = "0" + seconds;
			} else {
				// done.
			}
	
			authLayer.find("#authTime").text(minutes + ":" + seconds);
		}
		timer = setInterval(showRemaining, 1000);
		authLayer.find("#authTime").data("timer", timer);
	}
})();

function numkeyCheck(e) {
	var keyValue = event.keyCode;
	if (((keyValue >= 48) && (keyValue <= 57)))
		return true;
	else
		return false;
}

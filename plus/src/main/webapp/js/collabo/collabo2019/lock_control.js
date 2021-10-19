//@주광욱 20191016
var lock_control = (function() {
	return {
		active : active,
		lockCheck : lockCheck,
		setLockTimeOutId : setLockTimeOutId,
		screenLockEventCheck : screenLockEventCheck,
	};
	
	//=======================================================
	//=======================================================
	//=======================================================
	//=======================TIME 결정 =======================
	var lockTimeHours;					
	//=======================TIME 결정 =======================
	//=======================================================
	//=======================================================
	//=======================================================
	//=======================================================
	
	
	var lockTimeoutID;
	var mouseTimeoutID;
	
	function active(){	
		//우리 이용기관 추가
		var b_active = !g_var.g_electronYn;
		if( b_active){
			$("#lockMode").show();
		}else{
			$("#lockMode").hide();
		}
		return b_active;
		
	}
	
	//@주광욱 2019.10.14
	function lockCheck(e){
		if( !active()) return;
		if( cnts_Null2Void(cf_getCookie("LOCK_MODE_YN"+cnts_Null2Void(cf_getCookie("FLOW_DUID"), "")), "N") != "Y") return;
		
		
		//jkwlog("lockCheck");
		setLockTime();
		
		$("body").off("mouseenter").on("mouseenter",function (e1) {
			setMouseTimeOutId();
		}).off("mouseleave").on("mouseleave",function (e1) {
			setMouseTimeOutId();
			
			/*
			 * 다른 브라우져간의 시간 체크를 하는 방법 2가지
			 * 1. mouseOn이거나 leave일 때 값을 모두 공유하는 방법
			 * 
			 * */
			var obj = {
					"CHAT_CODE": "MOUSEMOVE0001",
					"ROOM_SRNO": _USER_ID,
					"WEB_USER_ID": _USER_ID,
					"DUID": cf_getCookie('FLOW_DUID')
			};
			socket.emit('sendMessage', obj);
		});
		
		//setTimeout 값을 저장하고 있다가 갱신해줘야한다.
	}
	function setMouseTimeOutId(){
		if( !$("#serviceBlockPopup").is(":visible")) {
			setLockTime();
			if( cnts_Null2Void(mouseTimeoutID, "") != ""){
				clearTimeout(mouseTimeoutID);
				//jkwlog("mouseTimeoutID clearTimeout end = " + mouseTimeoutID);
			}
			mouseTimeoutID = setTimeout(	setLockTimeOutId() , 1000 * 5);
			//jkwlog("mouseTimeoutID = "+ mouseTimeoutID);
		}else{
			//done.
		}
		
	}

	function setLockTimeOutId(){
		//=======================================================
		//=======================================================
		//=======================================================
		//=======================TIME 결정 =======================
		lockTimeHours = 1/60/60 * 60* 1 * cf_getCookie("LOCK_MODE_MIN"+cnts_Null2Void(cf_getCookie("FLOW_DUID"), ""));		//1분 * xx분
		//=======================TIME 결정 =======================
		//=======================================================
		//=======================================================
		//=======================================================
		//=======================================================
		
		//존재할 경우에만 clear
		if( cnts_Null2Void(lockTimeoutID, "") != ""){
			window.clearTimeout(lockTimeoutID);
			//jkwlog("lockTimeoutID clearTimeout end = " + lockTimeoutID);
		}else{
			//done.
		}
		
		lockTimeoutID  = window.setTimeout(function () {
			//4시간후에 시간이 넘어가면 잠금 모드가 되어야 한다. 
			lockLogic();
		}, 1000 * 60*60*lockTimeHours);	
		//jkwlog("lockTimeoutID = "+ lockTimeoutID);
		
		
	}
	
	/*
	 * @주광욱 2019.10.14 잠금모드를 할 것인지 비교 로직.
	 */
	
	function lockLogic(){
	
		var nowTime = getNowTime();
		
		
		//var accessTime = Date.parseExact(cf_getCookie("LOCK_"+cnts_Null2Void(cf_getCookie("FLOW_DUID"), "")), "yyyyMMddHHmmss").addHours(4);
		var lockTime = cf_getCookie("LOCK_"+cnts_Null2Void(cf_getCookie("FLOW_DUID"), ""));
		var lockAddTime = getConvtTime(Date.parseExact(lockTime, "yyyyMMddHHmmss").addHours(lockTimeHours));
		
		jkwlog("nowTime = "+ nowTime +  " / "+ "lockAddTime = "+ lockAddTime);
		if(nowTime >= lockAddTime  ){
			
			
			/*
			 * 다른 브라우져간의 시간 체크를 하는 방법
			 * 세션 시간이 다 되면 모두 로그 아웃
			 * 
			 * */
			var obj = {
					"CHAT_CODE": "LOGOUT0002",
					"ROOM_SRNO": _USER_ID,
					"WEB_USER_ID": _USER_ID,
					"DUID": cf_getCookie('FLOW_DUID')
			};
			socket.emit('sendMessage', obj);
			
			return;
		}else{
			//done.
		}
	}
	/*
	 *@주광욱 2019.10.14 
	 *현재 시간으로 세팅
	 */
	function setLockTime(){
		cf_setCookie("LOCK_"+cnts_Null2Void(cf_getCookie("FLOW_DUID"), ""), getNowTime() , 10);
	}
	/*
	 *@주광욱 2019.10.14 
	 *현재 저장된 시간 가져오기
	 */
	function getLockTime(){
		return cf_getCookie("LOCK_"+cnts_Null2Void(cf_getCookie("FLOW_DUID"), ""));
	}
	
	//base.js 에서 가져옴
	function screenLockEventCheck(target){
		// if((_STR_BASE_URL == "http://seco.flowteam.info") || (g_var.g_electronYn && cnts_Null2Void(cf_getCookie("SECO_COMPANY_CODE"), "") != "")){
		if(_USE_INTT_ID.indexOf("SECO") > -1 && g_var.g_electronYn || _USE_INTT_ID.indexOf("ZOOMOK") > -1 && g_var.g_electronYn) {
			target.off('mouseenter mouseleave mousedown keypress').on('mouseenter mouseleave mousedown keypress' , function(){
				try {
					fn_lockScreenInitForElectron();			
				} catch (e) {
					//done
				}
			});
		}
	}
	
})();
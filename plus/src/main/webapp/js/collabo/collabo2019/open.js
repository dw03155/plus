if (isZoomok() || isSeco()) {
	cmf_chatOpen = cmf_chatOpenOriginal
} else {
	// done
}

function checkStrBaseUrl(){
	if(typeof _STR_BASE_URL === "undefined"){
		_STR_BASE_URL = location.host;
	} else {
		//done
	}
}

var windowChilren = {};
var electronChatWin = null;

//채팅방 오픈 Original
// 기존 cmf_chatOpen 이 변경되면서 기존의 안되는부분들은 기존으로 돌려야함
function cmf_chatOpenOriginal(ROOM_GB, ROOM_SRNO, NEW_CHAT, BDG, LIST_OBJ) {
	cmf_createSession();
	var w = 420;
	var h = 640;

	var parentLeft = 0,
		parentTop = 0,
		left = 0,
		top = 0;
	parentLeft = window.screenLeft;
	left = parentLeft + ($(window).width() - w) / 2;
	parentTop = window.screenTop;
	top = parentTop + ($(window).height() - h) / 2;

	if (cmf_getClientOSInfo().isWin7) {
		if (left < -1) {
			left = 0;
		}
		if (top < -1) {
			top = 0;
		}
	}

	var b_popUpExist = false;
	if (!getElectronYn()) {
		var newWindow;

		clog("ROOM_SRNO " + ROOM_SRNO)
		clog("ROOM_GB " + ROOM_GB)
		clog("NEW_CHAT " + NEW_CHAT)

		var specs  = "width=" + w + "px, height=" + h + "px, top=" + top + ", left=" + left;
		var target = "POPUP_CHAT_" + cnts_Null2Void(ROOM_SRNO, "");
		newWindow = window.open("", target, specs);

		try{
			if (newWindow.location.href.indexOf("chat.act") > -1 && ROOM_GB != 0) {
				b_popUpExist = true;
			} else {
				b_popUpExist = false;
			}
		} catch (e) {
			b_popUpExist = false;
		}

		if (!b_popUpExist) {
			var s_var_list = "";
			s_var_list += "<input type='hidden' name='ROOM_GB' value='" + cnts_Null2Void(ROOM_GB, "") + "'/>";
			s_var_list += "<input type='hidden' name='ROOM_SRNO' value='" + cnts_Null2Void(ROOM_SRNO, "") + "'/>";
			s_var_list += "<input type='hidden' name='NEW_CHAT' value='" + NEW_CHAT + "'/>";
			s_var_list += "<input type='hidden' name='CHAT_DEPLOY_YN' value='" + coalesce3($("#topViewer").attr("CHAT_DEPLOY_YN"), (typeof(_CHAT_DEPLOY_YN) !== "undefined" ? _CHAT_DEPLOY_YN : "")) + "'/>";
			s_var_list += "<input type='hidden' name='CHAT_MSG_REV_YN' value='" + coalesce3($("#topViewer").attr("CHAT_MSG_REV_YN"), (typeof(_CHAT_MSG_REV_YN) !== "undefined" ? _CHAT_MSG_REV_YN : "")) + "'/>";
			s_var_list += "<input type='hidden' name='CHAT_SCR_REV_YN' value='" + coalesce3($("#topViewer").attr("CHAT_SCR_REV_YN"), (typeof(_CHAT_SCR_REV_YN) !== "undefined" ? _CHAT_SCR_REV_YN : "")) + "'/>";
			s_var_list += "<input type='hidden' name='BDG' value='" + BDG + "'/>";
			s_var_list += "<input type='hidden' name='PC_DOWN_YN' value='" + _PC_DOWN_YN + "'/>";
			s_var_list += "<input type='hidden' name='ENTER_YN' value='" + _ENTER_YN + "'/>";

			if(LIST_OBJ && LIST_OBJ.COLABO_SRNO) s_var_list += "<input type='hidden' name='COLABO_SRNO' value='" + LIST_OBJ.COLABO_SRNO + "'/>";
			encodeURI(json(LIST_OBJ)).length > 500 ? clog("500자 이상") : s_var_list += "<input type='hidden' name='LIST_OBJ' value='" + encodeURI(json(LIST_OBJ)) + "'/>";

			var $frmObj = $("<form id='chat_form' name='chat_form'></form>");
			$frmObj.attr("method", "post");
			$frmObj.appendTo("body");
			$frmObj.append(s_var_list);
			if (NEW_CHAT == "NEW") {
				$frmObj.attr("action", "chat.act?invite");
			} else {
				$frmObj.attr("action", "chat.act");
			}
			$frmObj.attr("action", "chat.act");
			$frmObj.attr("target", "POPUP_CHAT_" + cnts_Null2Void(ROOM_SRNO, ""));
			$frmObj.submit();
			$frmObj.remove();

			if(newWindow){
				newWindow.focus();
			}

			return newWindow;
		}

		else {
			newWindow.focus();
		}

	} else {
		var now = new Date();
		var time = now.getTime();
		var url = _STR_BASE_URL.replace("http://","https://") + "/chat.act";
		url += '?ROOM_GB=' + cnts_Null2Void(ROOM_GB, "");
		url += '&ROOM_SRNO=' + cnts_Null2Void(ROOM_SRNO, "");
		encodeURI(json(LIST_OBJ)).length > 500 ? clog("500자 이상") : url += '&LIST_OBJ=' + encodeURI(json(LIST_OBJ));
		url += '&time=' + time;
		url += ((cnts_Null2Void(NEW_CHAT) != "") ? '&NEW_CHAT=' + NEW_CHAT : "");
		url += '&CHAT_DEPLOY_YN=' + coalesce3($("#topViewer").attr("CHAT_DEPLOY_YN"), (typeof(_CHAT_DEPLOY_YN) !== "undefined" ? _CHAT_DEPLOY_YN : ""));
		try {
			var electronChatWin = fn_chatOpenForElectron(url, "POPUP_CHAT_" + cnts_Null2Void(ROOM_SRNO, ""), w, h + 40, left, top);
		} catch (e) {
			window.open(url, "POPUP_CHAT_" + cnts_Null2Void(ROOM_SRNO, ""), "width=" + w + "px, height=" + (h + 40) + "px, top=" + top + ", left=" + left);
		}
	}
}

//@유민호 : 채팅방 오픈 VER2 20200630
function cmf_chatOpenVer2(encUrl, roomSrno, dat, cb) {

	// secure 도메인 처리가 안되는 이슈

	/* (ROOM_GB, ROOM_KIND, NEW_CHAT) */
	cmf_createSession();

	var w = 420;
	var h = 640;

	var parentLeft = window.screenLeft;
	var parentTop = window.screenTop;
	var left = parentLeft + ($(window).width() - w) / 2;
	var	top = parentTop + ($(window).height() - h) / 2;

	if (cmf_getClientOSInfo().isWin7) {
		if (left < -1) left = 0;
		if (top < -1) top = 0;
	} else {
		//done
	}

	var tmpUrl = encUrl + '&d=' + encodeURI(JSON.stringify(dat)) + '&time=' + new Date().getTime();
	try {
		if(cnts_Null2Void(dat.VIDEO_CONF_YN) != '') tmpUrl += makeInputHidden("VIDEO_CONF_YN", dat.VIDEO_CONF_YN)
		electronChatWin = fn_chatOpenForElectron(tmpUrl, "POPUP_CHAT_" + roomSrno, w, h + 40, left, top);
		if (cb && typeof cb == "function") {
			cb();
		}
	} catch (e) {

		if(!cmf_browser().ieYn && !cmf_browser().safari && !cmf_browser().firefox){
			if(Object.keys(windowChilren).length > 0){
				for (key in windowChilren){
					if(Math.abs(windowChilren[key].screenLeft - left) < 5 && Math.abs(windowChilren[key].screenTop - top) < 5){
						top += 30;
						left += 30;
					} else {
						//done
					}
					windowChilren[key].focus();
				}
			} else {
				//done
			}
		} else {
			//done
		}

		var targetName = "POPUP_CHAT_"+roomSrno;
		var specs = "width=" + w + "px, height=" + (h + 40) + "px, top=" + top + ", left=" + left;
		//ENCRPYPT_GET방식
		//var newWindow = window.open(tmpUrl, targetName, specs);
		//POST방식
		if(!cmf_browser().ieYn && windowChilren[targetName] && windowChilren[targetName].parent != null){
			windowChilren[targetName].focus();
		} else {
			var newWindow = window.open("", targetName, specs);
			var s_var_list = makeInputHidden("ROOM_SRNO", roomSrno)+makeInputHidden("ROOM_KIND",  dat.ROOM_KIND) +makeInputHidden("NEW_CHAT", dat.NEW_CHAT) + makeInputHidden("VIDEO_CONF_YN", dat.VIDEO_CONF_YN);
			var $frmObj = $("<form id='chat_form' name='chat_form'></form>");
			$frmObj.attr("method", "post");
			$frmObj.appendTo("body");
			$frmObj.append(s_var_list);
			$frmObj.attr("action", "chat.act");
			$frmObj.attr("target", targetName);
			$frmObj.submit();
			$frmObj.remove();

			if(!cmf_browser().ieYn){
				windowChilren[targetName] = newWindow;
			} else {
				//pass
			}
		}
	}
	function makeInputHidden(name, value){
		return "<input type='hidden' name='"+name+"' value='" + value + "'/>";
	}
}

//채팅방 오픈.
function cmf_chatOpen(ROOM_GB, ROOM_SRNO, _NEW_CHAT, BDG, LIST_OBJ, VIDEO_CONF_YN, cb) {

	var _TMP_ROOM_KIND 	= (_NEW_CHAT === "NEW" ? "" : _NEW_CHAT);
	var _TMP_NEW_CHAT 	= (_NEW_CHAT === "NEW" ? "NEW" : "");

	var jexAjax = jex.createAjaxUtil("COLABO2_CHAT_C001");
	jexAjax.set("USER_ID", _USER_ID);
	jexAjax.set("RGSN_DTTM", _RGSN_DTTM);
	jexAjax.set("ROOM_SRNO", ROOM_SRNO);
	jexAjax.setAsync(true);
	jexAjax.execute(function(dat){
		if (jex.isError(dat)) return;
		cmf_chatOpenVer2(dat.CONNECT_URL, dat.ROOM_SRNO, {
			ROOM_KIND : _TMP_ROOM_KIND,
			NEW_CHAT : _TMP_NEW_CHAT,
			VIDEO_CONF_YN: VIDEO_CONF_YN
		}, cb);
	});
}

/**
 * popup 창 열기 함수
 * @param url, width, height
 * @return newWindow
 *
 */
//@소문혁 [8388] 기존의 브라우저의 크기를 구하던것을 해상도를 구해서 계산하도록함 (190222)
function cmf_openPopupWindow(url, name, width, height) {

	var w = screen.availWidth ;
	var h = screen.availHeight;

	var left = cnts_Null2Void(screenLeft,0) + (screen.availWidth - w) / 2;
	var top = cnts_Null2Void(screenTop,0) + (screen.availHeight - h) / 2;


	// @소문혁 [8966] 긴글 클릭시 팝업이 너무 크게열림
	if(cnts_Null2Void(name,"").indexOf('chatLong') > -1 ){
		w = width
		h = height
	}

	//@유민호 : 구글드라이브 로그인 팝업 너무 크게 열림 190705 / 채팅방 드롭박스, 구글드라이브 파일 보기 190718
	if(name === "Google" || name === "BASIC"){
		w = 800;
		h = 800;
		left = (screen.availWidth - w)/2 ;
		top = (screen.availHeight - h)/2 ;
	}

	if (getElectronYn()) {
		try {
			fn_windowOpenForElectron(url, "POPUP_" + name, width, height, left, top);
		} catch (e) {
			var newWindow = window.open(url, "POPUP_" + name, "width=" + w + "px, height=" + h + "px, top=" + top + ", left=" + left);
		}
	} else {
		var newWindow = window.open(url, "POPUP_" + name, "width=" + w + "px, height=" + h + "px, top=" + top + ", left=" + left);
	}
	return newWindow;
}

/**
 * electron일 경우 외부링크로 열리도록
 *
 */
function cmf_openWindow(url, name, specs) {
	if (getElectronYn()) {
		try {
			fn_openExternalLinkforElectron(url);
		} catch (e) {
			window.open(url, name);
		}
	} else {
		//@안광선 specs을 3번째 파라미터에 넣게되면 IE에서 팝업으로 열려버림.
		window.open(url, name);
	}
}

/**
 * electron일 경우 내부 타겟 윈도우로 열리도록
 *
 */
function cmf_openTargetWindow(url, target) {
	if (g_var.g_electronYn) {
		try {
			fn_openTargetWindowForElectron(url, target);
		} catch (e) {
			window.open(url, target);
		}
	} else {
		window.open(url, target);
	}
}

function cmf_openFile(b_viewer, data, mode, b_access) {

	/*
	* b_viewer : 문서뷰어 작동여부
	* data : 전달된 데이터
	* mode : "" - 빈값 / "remark" - 댓글 / "chatbot" - 챗봇
	* b_access : 내가 접근가능한 파일인가? (관리자일때 내가쓴글인지)
	* */

	var b_dbfiDrm 	= (condJson.get["isDbfi"] && cnts_Null2Void(data.DRM_YN, "N") =="N");
	var fileInfo 	= cmf_getFileInfo(data.ATCH_SRNO);
	var randKey 	= (("" === mode) ? coalesce3(fileInfo.randKey, data.RAND_KEY) : mode);
	var fileSrno 	= (("" === mode) ? fileInfo.fileSrno : data.ATCH_SRNO);
	var b_onlyDown 	= enter_control.enableOnlyDownload();

	//파일기간만료시 제한팝업
	if (coalesce3(data.EXPRY_YN, "N") == "Y") {
		fn_restrictPopUpOpen();
		return;
	}

	//이용기관급에서 다운을 막았을 경우 안내
	if(_PC_DOWN_YN == "Y" && !b_viewer ){
		toast("2", c18n("AA0052","파일 다운로드 제한설정이 되어있습니다.")+"\n "+c18n("CLP1028","관리자에게 문의하세요."))
		return;
	}

	//접근불가능한 파일이거나 URL 비어있으면 안내
	if(!b_access){
		toast('2', c18n('DCC436', '관리자 또는 작성자만 조회 가능합니다.'));
		return;
	}

	if ((coalesce3(data.ATCH_URL, coalesce3(data.FILE_DOWN_URL, "")) == "")) {
		toast('2', c18n('C1823', '잠시 후 다시 시도해주세요.'));
		return;
	}

	//챗봇이면 바로 다운
	if ("chatbot" === mode) {
		cmf_openChatbotFile("Y", data.ATCH_URL, data.FILE_NAME, data.FILE_SIZE);
		return;
	}

	//구글드라이브, 드롭박스는 새창 처리
	if (randKey === "DROPBOX" || randKey === "GOOGLEDRIVE") {
		cmf_openWindow(data.ATCH_URL, '_blank');
		return;
	}

	if (isFuncDeployList('FILE_DOWNLOAD_ONLY')) {
		if (b_dbfiDrm) {
			cmf_saveFile(randKey + "_" + fileSrno, data.ATCH_URL + "&IMG_DOWN=Y&ATCH_SRNO=" + cmf_getAtchSrno(data.ATCH_SRNO), 'N', data.FILE_NAME, data.FILE_SIZE);
		} else {
			cmf_saveFile(randKey + "_" + fileSrno, data.ATCH_URL + "&IMG_DOWN=Y&ATCH_SRNO=" + cmf_getAtchSrno(data.ATCH_SRNO), 'Y', data.FILE_NAME, data.FILE_SIZE);
		}
	} else if (b_onlyDown) {
		if (b_dbfiDrm) {
			cmf_layerMsg('2', "모바일에서 올린 파일은 보안상 다운로드 하실 수 없습니다.");
		} else {
			cmf_saveFile(randKey + "_" + fileSrno, data.ATCH_URL + "&IMG_DOWN=Y&ATCH_SRNO=" + cmf_getAtchSrno(data.ATCH_SRNO), 'Y', data.FILE_NAME, data.FILE_SIZE);
		}
	} else if (b_viewer) {
		if (b_dbfiDrm) {
			cmf_docViewer(randKey + "_" + fileSrno, data.ATCH_URL + "&ATCH_SRNO=" + cmf_getAtchSrno(data.ATCH_SRNO), 'N', data.FILE_NAME, data.FILE_SIZE);
		} else {
			cmf_docViewer(randKey + "_" + fileSrno, data.ATCH_URL + "&ATCH_SRNO=" + cmf_getAtchSrno(data.ATCH_SRNO), 'Y', data.FILE_NAME, data.FILE_SIZE);
		}
	} else {
		if (b_dbfiDrm) {
			cmf_layerMsg('2', "모바일에서 올린 파일은 보안상 다운로드 하실 수 없습니다.");
		} else {
			cmf_saveFile(randKey + "_" + fileSrno, data.ATCH_URL + "&IMG_DOWN=Y&ATCH_SRNO=" + cmf_getAtchSrno(data.ATCH_SRNO), 'Y', data.FILE_NAME, data.FILE_SIZE);
		}
	}
}

function cmf_openChatbotFile(downloadYn, filePath, fileName, fileSize) {

	checkStrBaseUrl();
	cmf_createSession();

	if(chatApi && chatApi.isChatFunc && chatApi.isChatFunc("CHATBOT_VIEWER")){
		var file_type = fn_getFileType(fileName);
		if (isDocExtension(file_type)){
			if (true/*g_var.g_electronYn*/) {

				var e_winWidth = screen.width / 1.5;
				var e_winHeight = screen.height / 1.5;
				var s_var_list = "";
				filePath = encodeURIComponent(filePath);
				if (cnts_Null2Void(downloadYn, "N") == "Y") {
					s_var_list += "&downloadUrl="+filePath;
				}else{
					//done.
				}


				var requestUrl = location.origin+"/flow_viewer.act?fileName=" + encodeURIComponent(fileName) +"&fid=1&filePath="+filePath+ s_var_list;
				cmf_openPopupWindow(requestUrl, "preview", e_winWidth, e_winHeight);
			} else {
				var s_var_list = "";
				s_var_list += "<input type='hidden' name='fid' value='1'/>";
				s_var_list += "<input type='hidden' name='filePath' value='" + filePath + "'/>";
				s_var_list += "<input type='hidden' name='downloadUrl' value='" + filePath + "'/>";
				var $frmObj = $("<form id='viewer_form' name='viewer_form'></form>");
				$frmObj.attr("method", "post");
				$frmObj.appendTo("body");
				$frmObj.append(s_var_list);
				$frmObj.attr("action", "flow_viewer.act?fileName=" + encodeURIComponent(fileName));
				$frmObj.attr("target", filePath);
				$frmObj.submit();
				$frmObj.remove();
			}
		} else {
			toast("2","문서뷰어에서 지원하지 않는 형식입니다");
		}
		return;
	} else {
		if (g_var.g_electronYn) {
			try {
				if (chatData) {
					fn_chatFileDownloadForElectron(filePath, fileName, fileSize, chatData.ROOM_SRNO);
				} else {
					fn_fileDownloadForElectron(filePath, fileName, fileSize);
				}
			} catch (e) {
				if(filePath.indexOf("flow_viewer.act") > -1){
					toast("2","문서뷰어 형식의 url은 다운불가합니다.");
				} else if (isImageFormat(fileName)){
					toast("2","이미지 형식의 url은 다운불가합니다.");
				} else {
					window.open(filePath, "_parent");
				}
			}
			return;
		} else {
			if(filePath.indexOf("flow_viewer.act") > -1){
				toast("2","문서뷰어 형식의 url은 다운불가합니다.");
			} else if (isImageFormat(fileName)){
				toast("2","이미지 형식의 url은 다운불가합니다.");
			} else {
				window.open(filePath, "_parent");
			}
		}

		function isImageFormat(fileName){
			return false;
		}
	}
}


function cmf_openImage(imageList, nowSequence, isAccessible) {
	if (!isAccessible) {
		cmf_layerMsg('2', cnts_Null2Void(i18n('DCC436'),'관리자 또는 작성자만 조회 가능합니다.'));
	} else {
		fn_openImgViewer(encodeURIComponent(JSON.stringify(imageList)), nowSequence);
	}
}

function cmf_openOneImage(imageData, nowSequence, isAccessible) {
	if (coalesce3(imageData.EXPRY_YN, "N") == "Y") {
		fn_restrictPopUpOpen();
		return;
	}

	if (!isAccessible) {
		cmf_layerMsg('2', cnts_Null2Void(i18n('DCC436'),'관리자 또는 작성자만 조회 가능합니다.'));
	} else {
		fn_openImgViewer(encodeURIComponent('['+JSON.stringify(imageData)+']'), nowSequence);
	}
}

function cmf_docViewer(fid, filePath, downloadYn, fileName, fileSize, roomSrno) {

	if( _PC_DOWN_YN == "Y"){
		downloadYn = "N";
	}else{
		if(_STR_BASE_URL.indexOf("flow_mobis") > -1 || _STR_BASE_URL.indexOf("flow.mobis.co.kr") > -1)	//@191015 안광선 : 모비스일 땐 문서뷰어 다운로드 X
		{
			downloadYn = "N";
			var originFilePath = filePath;
			filePath = filePath + "&DOCVIEWER=Y"
		}
	}

	cmf_createSession();	//세션 생성 한번 한 후에 작업.

	if(_USER_ID == "madrascheck"){
		clog("filePath1 == " + filePath);
	}

	if( filePath.indexOf("/flowImg") > -1){

	}else if( filePath.indexOf("FLOW_") > -1){
		if(filePath.indexOf("/FLOW_DOWNLOAD_R001.act?") > -1 || filePath.indexOf("https://flow.team/FLOW_DOWNLOAD_R001.act?") > -1){
			//done
		} else {
			filePath = _STR_BASE_URL + "/FLOW_DOWNLOAD_R001.act?"+filePath;
		}
	}else{

	}
	if (cnts_Null2Void(filePath, "") != "") {
		filePath = filePath.replace("amp;", "");
	} else {
		//done. 
	}

	//clog("filePath1 == " + filePath);
	if (cnts_Null2Void(filePath, "").indexOf("FLOW_DOWNLOAD_R001") > -1) {
		if(_INNER_NETWORK_YN == "Y"){
			if( _STR_BASE_URL.indexOf("https://flow-wgpp.bizplay.co.kr") > -1 ){		//웹케시일 때 문서뷰어처리
				//filePath = "https://flowmob-wgpp.bizplay.co.kr/" + cnts_Null2Void(filePath, "").substr(cnts_Null2Void(filePath, "").indexOf("FLOW_DOWNLOAD_R001") - 1);
				cmf_saveFile(fid, filePath, downloadYn, fileName, fileSize, roomSrno);
				return;

			}else{
				filePath = _STR_BASE_URL + cnts_Null2Void(filePath, "").substr(cnts_Null2Void(filePath, "").indexOf("FLOW_DOWNLOAD_R001") - 1);
			}
		}else{
			filePath = location.origin + cnts_Null2Void(filePath, "").substr(cnts_Null2Void(filePath, "").indexOf("FLOW_DOWNLOAD_R001") - 1);
		}

		clog("filePath ### " + filePath);
	} else {

	}

	if(typeof img_control !== "undefined"){
		filePath = img_control.replaceDomain(filePath);
	} else {
		//pass
	}

	if (isFuncDeployList('FILE_DOWNLOAD_ONLY')) {
		cmf_saveFile(fid, filePath, downloadYn, fileName, fileSize, roomSrno);
		return;
	} else if( isHyundaiCar() || _STR_BASE_URL.indexOf("bgfretail") > -1){
		cmf_saveFile(fid, filePath, downloadYn, fileName, fileSize, roomSrno);
		return;
	}

	//허용되지 않은 확장자일 경우 -> cmf_saveFile 호출해주세요!
	var file_type = fn_getFileType(fileName);
	if (isDocExtension(file_type)) {

		if (g_var.g_electronYn) {

			var e_winWidth = screen.width / 1.5;
			var e_winHeight = screen.height / 1.5;
			var s_var_list = "";
			filePath = encodeURIComponent(filePath);
			if (cnts_Null2Void(downloadYn, "N") == "Y") {
				s_var_list += "&downloadUrl="+filePath;
			}else{
				//done.
			}

			var requestUrl = location.origin+"/flow_viewer.act?fileName=" + encodeURIComponent(fileName) +"&fid="+fid +"&filePath="+filePath+ s_var_list;
			cmf_openPopupWindow(requestUrl, "preview", e_winWidth, e_winHeight);

		} else {

			var s_var_list = "";

			if (cnts_Null2Void(downloadYn, "N") == "Y") {
				s_var_list += "<input type='hidden' name='downloadUrl' value='" + filePath + "'/>";
			}else{
				//done.
			}

			s_var_list += "<input type='hidden' name='fid' value='" + fid + "'/>";
			s_var_list += "<input type='hidden' name='filePath' value='" + filePath + "'/>";


			var $frmObj = $("<form id='viewer_form' name='viewer_form'></form>");
			$frmObj.attr("method", "post");
			$frmObj.appendTo("body");
			$frmObj.append(s_var_list);
			$frmObj.attr("action", "flow_viewer.act?fileName=" + encodeURIComponent(fileName));
			$frmObj.attr("target", fid);
			$frmObj.submit();
			$frmObj.remove();
		}
	} else {
		if(_STR_BASE_URL.indexOf("flow_mobis") > -1 || _STR_BASE_URL.indexOf("flow.mobis.co.kr") > -1)	//@191015 안광선 : 문서뷰어로 안열때는 DOCVIEWER='N' 값으로 내리기.
		{
			filePath = originFilePath;
		}

		cmf_saveFile(fid, filePath, downloadYn, fileName, fileSize, roomSrno);
	}
}

function cmf_saveFile(fid, filePath, downloadYn, fileName, fileSize, roomSrno, saveUseInttId) {

	checkStrBaseUrl();

	//IE - startsWith 먹히지 않는 이슈
	if (!String.prototype.startsWith) {
		String.prototype.startsWith = function(search, pos) {
			return this.substr(!pos || pos < 0 ? 0 : +pos, search.length) === search;
		};
	}

	var isInnoN = (filePath.indexOf("BFLOW_200804114215") > -1 || saveUseInttId === "BFLOW_200804114215");
	var isColma = (filePath.indexOf("BFLOW_210115151827") > -1 || saveUseInttId === "BFLOW_210115151827");
	var isMadrasInnerIp = (_CLIENT_IP.indexOf("222.108.28.43") > -1);
	var isInnoNInnerIp = (_CLIENT_IP.indexOf("218.238.95.245") > -1);
	var isColmaInnerIp = (_CLIENT_IP.indexOf("218.238.95.242") > -1);

	if(_PC_DOWN_YN === "Y" && cnts_Null2Void(roomSrno) !== '-9999'){
		jsDraw.alert({
			type:"2",
			timer: 3500,
			msg:c18n("AA0052","파일 다운로드 제한설정이 되어있습니다.")+"\n "+c18n("CLP1028","관리자에게 문의하세요.")
		});
		return;
	} else if((_CLIENT_IP.startsWith("10.") || _CLIENT_IP.startsWith("192.")) && _USE_INTT_ID == "MOBIS_1"){
			jsDraw.alert({
			type:"2",
			timer: 3500,
			msg:c18n("AA0052","사외대역 다운로드 제한설정이 되어있습니다.")
		});
		return;
	} else if (isFunc('DOWNLOAD_PREVENT') && ((isInnoN && !(isInnoNInnerIp || isMadrasInnerIp)) || (isColma && !(isColmaInnerIp || isMadrasInnerIp)))) {
		jsDraw.alert({
			type: "2",
			timer: 3500,
			msg: (isInnoN ? "inno.N" : isColma ? "kolmar" : "") + " SBC에서만 다운로드 가능합니다."
		});
		return;
	} else {
    	//done
    }

	// @복다빈 : 파일 다운로드 3번이상 받을 시 다운로드 제한 경고창 출력로직
	var expire = new Date();
	expire.setTime(expire.getTime() + (10*1000));
	if(cnts_Null2Void(cf_getCookie("down"+fid)) == "") {
		document.cookie = "down"+fid + "=" + 1 + "; expires=" + expire.toGMTString() + "; path=/";
	} else if(Number(cnts_Null2Void(cf_getCookie("down"+fid))) < 3){
		var time =Number(cf_getCookie("down"+fid))+1
		document.cookie = "down"+fid + "=" + time + "; expires=" + 0 + "; path=/"; // cookie destroy
		document.cookie = "down"+fid + "=" + time + "; expires=" + expire.toGMTString() + "; path=/";
	} else {
		jsDraw.alert({
			type : "2",
			msg : "다운로드 중입니다. 10초 후, 다시 시도해주세요.",
			timer : 2500
		});
		return;
	}

	if(isFuncDeployList("DOWN_ALERT")){
		jsDraw.alert({
			type : "1",
			msg : "다운로드를 시작했습니다.",
			timer : 4000
		})
	} else {
		//pass
	}

	cmf_createSession();

	//@191015 안광선 : 모비스일 땐 문서뷰어 다운로드 X
	if(_STR_BASE_URL.indexOf("flow_mobis") > -1 || _STR_BASE_URL.indexOf("flow.mobis.co.kr") > -1)	{
		filePath = cmf_getDownloadUrl(filePath)+"&DUID=";
	} else if(_STR_BASE_URL.indexOf("bgfretail") > -1) {
		filePath = cmf_getDownloadUrl(filePath);
	} else if (roomSrno === "FILE_STORE") {
		filePath = filePath+"&DUID="+cnts_Null2Void(cf_getCookie("FLOW_DUID"), "");
	} else {
		filePath = cmf_getDownloadUrl(filePath)+"&DUID="+cnts_Null2Void(cf_getCookie("FLOW_DUID"), "");
	}

	if (	_STR_BASE_URL.indexOf("localhost") > -1 ) {
		//done.
	} else if ( _ENTER_YN == 'N' || condJson.get["isEland"] || condJson.get["isKtWorks"]) {
		filePath = filePath.replace('http:', 'https:');
	}

	if(typeof img_control !== "undefined"){
		filePath = img_control.replaceDomain(filePath);
	} else {
		//pass
	}

	if (getElectronYn()) {
		if (cnts_Null2Void(filePath) === "") {
			alert(cnts_Null2Void(i18n('C1823'),'잠시 후에 다시 시도해주세요!'));
			return;
		} else {
			try {
				if (fid.indexOf('chat_') > -1) {
					fn_chatFileDownloadForElectron(filePath, fileName, fileSize, roomSrno);
				} else {
					fn_fileDownloadForElectron(filePath, fileName, fileSize);
				}
			} catch (e) {
				window.open(filePath, "_parent");
			}
		}
		return;
	} else {
		clog("cmf_saveFile filePath 2 ### " + filePath);
		if(location.hostname.indexOf("flowdev.info") > -1){
			filePath = filePath.replace("https", "http");
		}
		window.open(filePath, "_parent");

		/* //@유민호 : 새창에서 깜빡 거리는 것을 막기 위해 했던 것인데 다운자체가 안된다는 케이스가 있어서 주석
		if(cmf_browser().ieYn || cmf_browser().isEdge){
			window.open(filePath, "_parent");
		}else{
			var tmpId = encodeURIComponent(filePath);
			if(!document.getElementById(tmpId)){
				$('body').append($('<iframe id="' + tmpId +'" class="downCenter" style="visibility:hidden" src="" width="1" height="1"></iframe>'));
			}
			document.getElementById(tmpId).src = filePath;
			//document.getElementById(tmpId).remove();
			if(roomSrno === "IMG"){
				var tmpId = encodeURIComponent(filePath);
				if(!document.getElementById(tmpId)){
					$('body').append($('<iframe id="' + tmpId +'" class="downCenter" style="visibility:hidden" src="" width="1" height="1"></iframe>'));
				}
				document.getElementById(tmpId).src = filePath;
			} else if (roomSrno === "FILE_STORE"){
				var tmpId = encodeURIComponent(filePath);
				if(!document.getElementById(tmpId)){
					$('body').append($('<iframe id="' + tmpId +'" class="downCenter" style="visibility:hidden" src="" width="1" height="1"></iframe>'));
				}
				document.getElementById(tmpId).src = filePath;
			} else {
				window.open(filePath, "_parent");
			}

		}
		*/
	}
}

function cmf_getAtchSrno(atchSrno){
	var ATCH_SRNO = cnts_Null2Void(atchSrno, "").split(":");
	if( ATCH_SRNO.length > 2){
		ATCH_SRNO = ATCH_SRNO[2];
	}else{
		ATCH_SRNO = cnts_Null2Void(atchSrno, "");
	}
	return ATCH_SRNO;
}

function cmf_getDownloadUrl(filePath){
	if (cnts_Null2Void(filePath, "").indexOf("/FLOW_DOWNLOAD_R001") > -1) {
		filePath = location.protocol + "//" + location.host + filePath.substr(filePath.indexOf("/FLOW_DOWNLOAD_R001.act"));
	} else {
		if( filePath.indexOf("/flowImg") > -1){
			filePath = location.protocol + "//" + location.host + filePath.substr(filePath.indexOf("/flowImg"));
		}else if( filePath.indexOf("FLOW_") > -1){
			filePath = location.protocol + "//" + location.host +  "/FLOW_DOWNLOAD_R001.act?"+filePath;
		}else{

		}
	}
	return filePath;
}

function joinsFlowUserPrflOpen(userid) {
	if(getElectronYn() && location.href.indexOf("joinsflow") > -1){

		var USER_PRFL_PHTG;

		var group_cd = $("#group_layerPop").attr("group_cd")
		var curX = window.screenLeft +15;
		var curY = window.screenTop;
		var curWidth = document.body.clientWidth;
		var curHeight = document.body.clientHeight;

		var interval = 5;

		var nLeft = screen.width - (curX % screen.width + curWidth)  > 305 ? curX + curWidth : curX - 305;
		var nTop = curY;

		var data = {
			"code" : "userPrflShow",
			"userID" : userid
		}

		try{
			var url = location.origin + '/collabo/joinsmini_layout_userprfl_view.jsp?';
			joinsWindowOpenForElectron(url,"userPrfl",300,650,nLeft,nTop,data);
			//fn_popupOpenForElectron(url,"userPrfl",300,600,nLeft,nTop,data)
		} catch(e) {

		}
	} else {
		openProfile(userid);
	}
}

function openProfile(userId) {
	profile_popup.showPopup(userId);
}

function isCanSeeDocumentViewer(projAuth, mngrDsnc, rgsrId){
	/**
	 * 문서뷰어 정책 2020.12.14
	 * Admin 다운로드 제한 (O) 프로젝트 다운로드 제한 (O) : 다운 X 문서뷰어 X
	 * Admin 다운로드 제한 (O) 프로젝트 다운로드 제한 (X) : 다운 X 문서뷰어 O
	 * Admin 다운로드 제한 (X) 프로젝트 다운로드 제한 (O) : 다운 X 문서뷰어 X
	 * Admin 다운로드 제한 (X) 프로젝트 다운로드 제한 (X) : 다운 O 문서뷰어 O
	 */
	return _PC_DOWN_YN === 'Y' && (projAuth === 'N' ||  (projAuth === 'Y' && (mngrDsnc === 'Y' || rgsrId === _USER_ID)))
}

function isZoomok() {
	return location.href.indexOf("zoomok.flow.team") > -1
}

function isSeco() {
	return location.href.indexOf("seco.flow.team") > -1
}

function isDocExtension(file_type){


	if(
		file_type.indexOf("DOC") > -1 || file_type.indexOf("DOCX") > -1 || file_type.indexOf("PPT") > -1 || file_type.indexOf("PPTX") > -1 ||
		file_type.indexOf("XLS") > -1 || file_type.indexOf("XLSX") > -1 || file_type.indexOf("PDF") > -1 ||
		file_type.indexOf("TXT") > -1 || file_type.indexOf("GIF") > -1 || file_type.indexOf("PNG") > -1 || file_type.indexOf("TIF") > -1 ||
		file_type.indexOf("JPG") > -1 || file_type.indexOf("JPEG") > -1 || file_type.indexOf("BMP") > -1 ||
		(isFuncDeployList("VIEWER_HWPX") ? file_type.indexOf("HWP") > -1 : file_type == "HWP")
	){
		return true;
	}else{
		return false;
	}
}

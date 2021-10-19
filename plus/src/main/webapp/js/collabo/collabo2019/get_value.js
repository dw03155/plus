//현재일자를 가지고 옴
function cmf_dateYYYYMMDD() {
	var _date = new Date();
	var d = _date.getDate();
	var day = (d < 10) ? '0' + d : d;
	var m = _date.getMonth() + 1;
	var month = (m < 10) ? '0' + m : m;
	var yy = _date.getYear();
	var year = (yy < 1000) ? yy + 1900 : yy;

	var ret = year +""+ month + day;
	return ret;
}

//현재일자를 가지고 옴
function cmf_dateYYYYMMDDHHMMSS() {
	var _date = new Date();
	
	var yy = _date.getYear();
	var m = _date.getMonth() + 1;
	var d = _date.getDate();
	var hh = _date.getHours();
	var mm = _date.getMinutes();
	var ss = _date.getSeconds();	

	var day = (d < 10) ? '0' + d : d;
	var month = (m < 10) ? '0' + m : m;
	var year = (yy < 1000) ? yy + 1900 : yy;

	var hh = (hh < 10) ? '0' + hh : hh;
	var mm = (mm < 10) ? '0' + mm : mm;
	var ss = (ss < 10) ? '0' + ss : ss;

	var ret = year +""+ month + day + hh + mm + ss;
	return ret;
}

//IE버전 체크 함수
function cmf_get_version_of_IE() {
	var word;
	var version = "N/A";
	var agent = navigator.userAgent.toLowerCase();
	var name = navigator.appName;
	// IE old version ( IE 10 or Lower ) 
	if (name == "Microsoft Internet Explorer") word = "msie ";
	else {
		// IE 11 
		if (agent.search("trident") > -1) word = "trident/.*rv:";
		// Microsoft Edge  
		else if (agent.search("edge/") > -1) word = "edge/";
	}
	var reg = new RegExp(word + "([0-9]{1,})(\\.{0,}[0-9]{0,1})");
	if (reg.exec(agent) != null) version = RegExp.$1 + RegExp.$2;
	return version;
}

//OS정보
function cmf_getClientOSInfo() {
	var ua = navigator.userAgent.toLowerCase();
	var OSInfo = {
		isWin: ua.indexOf("windows") > -1,
		isMac: ua.indexOf("macintosh") > -1,
		isWin7: ua.indexOf("windows nt 6.1") > -1,
		isWin8: ua.indexOf("windows nt 6.2") > -1,
		isWin10: ua.indexOf("windows nt 10.0") > -1,
	};
	return OSInfo;
}

//한글포함 문자열 길이를 구한다
function cmf_getTextLength(str) {
	var len = 0;
	for (var i = 0; i < str.length; i++) {
		if (escape(str.charAt(i)).length == 6) {
			len++;
		}
		len++;
	}
	return len;
}

function cmf_comma(num) {
	var len, point, str;
	num = num + "";
	point = num.length % 3;
	len = num.length;
	str = num.substring(0, point);
	while (point < len) {
		if (str != "") str += ",";
		str += num.substring(point, point + 3);
		point += 3;
	}
	return str;
}

//파일다운로드를 위한 정보 구하기 (구 f_RandKey, f_FileSrno)
function cmf_getFileInfo(atchSrno) {
	var f_RandKey = "";
	var f_FileSrno = "";
	var f_FileSrnoArray = atchSrno.split(":");
	if (f_FileSrnoArray[0] == "ECA") {
		f_RandKey = cnts_Null2Void(f_FileSrnoArray[1]);
	} else {
		if (atchSrno.indexOf("GOOGLEDRIVE") > 0 || atchSrno.indexOf("DROPBOX") > 0 ) {
			f_RandKey = cnts_Null2Void(f_FileSrnoArray[1]);
		} else {
			//pass
		}
	}
	f_FileSrno = cnts_Null2Void(f_FileSrnoArray[2]);
	return {
		randKey: f_RandKey,
		fileSrno: f_FileSrno,
	};
}
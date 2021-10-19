//검색시 노란색 하이라이트 함수
/*
function cmf_highLight(cntn) {
	if (g_var.sch_opt == "1") {
		var srch_wd = cnts_Null2Void($("#collaboSrchWd").val());
		srch_wd = srch_wd.replace("[", "").replace("]", "");
		if (srch_wd.indexOf(" ") > -1) {
			var tmpString = srch_wd.split(" ");
			for (var t = 0; t < tmpString.length; t++) {
				if ("" == tmpString[t]) continue;
				var regexp = new RegExp(tmpString[t], "gi");
				cntn = cntn.replace(regexp, function (str, p1, offset, s) {
					return "<span class='sword'>" + str + "</span>";
				});
			}
		} else {
			var regexp = new RegExp(srch_wd, "gi");
			cntn = cntn.replace(regexp, function (str, p1, offset, s) {
				return "<span class='sword'>" + str + "</span>";
			});
		}
	}
	return cntn;
}
*/

function convertSpecialCode2str(txt){
	var tempSpan = $("<span></span>");
	if(txt.match(/(&)([a-z0-9\#]+)(;)/)){
		tempSpan.html(txt.replace(/\</ig, "&lt;").replace(/\>/ig, "&gt;"));
	} else {
		tempSpan.text(txt);
	}
	return tempSpan.text();
}

function make_highLight(srch_wd,cntn) {
	cntn = fn_xEventHandler(cntn)
	srch_wd = fn_xEventHandler(srch_wd)
	if (srch_wd.indexOf(" ") > -1) {
		var tmpString = srch_wd.split(" ");
		for (var t = 0; t < tmpString.length; t++) {
			if ("" == tmpString[t]) continue;
			var regexp = new RegExp(tmpString[t], "gi");
			cntn = cntn.replace(regexp, function (str, p1, offset, s) {
				return "<span class='sword'>" + str + "</span>";
			});
		}
	} else {
		// @복다빈 : (변경이유) 검색어(srch_wd)에 특수문자가 포함될 경우 정규식 exception 발생. 기호 앞에 \가 필요 ex) ( -> \( 
		var regexp = new RegExp(srch_wd.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&"), "gi");
		// var regexp = new RegExp(srch_wd, "\\$&"), "gi");
		//cntn = cntn.replace(regexp, "<span class='sword'>"+srch_wd+"</span>");
		
		cntn = cntn.replace(regexp, function (str, p1, offset, s) {
			return "<span class='sword'>" + str + "</span>";
		});
	}
	
	return cntn;	
}

function cmf_highLight(cntn) {
	if (g_var.sch_opt == "1") {
		var srch_wd = cnts_Null2Void($("#collaboSrchWd").val());

		srch_wd = srch_wd.replace("[", "").replace("]", "");

		cntn = make_highLight(srch_wd,cntn);		
	}
	return cntn;
}

function alam_highLight(cntn) {
	var cntn;	
	var srch_wd = cnts_Null2Void($("#alamSrchWd").val());
	
	if(srch_wd != "")
	{
		srch_wd = srch_wd.replace("[", "").replace("]", "");	
		cntn = make_highLight(srch_wd,cntn);
	}
	
	return cntn;
	
}

//유투브 url인 경우 동영상 플레이어 html 추출
function getYoutubeHtml(url) {
	if (url.indexOf("https://youtu.be/") > -1 ) {
		url = url.replace("https://youtu.be/", "");
	}
	
	return '<iframe width="560" height="315" src="https://www.youtube.com/embed/' + url + '" frameborder="0" allowfullscreen></iframe>';
}

//파일사이즈 구하는 함수
function cmf_getFileSize(file_size) {
	var size = 0;
	var vol = "";
	var fileSize = "";
	size = parseInt(file_size);
	if (file_size > 1024 * 1024) { //MB
		size = file_size / (1024 * 1024);
		vol = " MB";
	} else if (file_size > 1024) { //KB
		size = file_size / 1024;
		vol = " KB";
	} else if (file_size > 0) { //BYTE
		size = file_size;
		vol = " B";
	} else {
		return "0 B";
	}
	try {
		fileSize = size.toFixed(2) + vol;
	} catch (e) {
		fileSize = size + vol;
	}
	return fileSize;
}

//파일타입 구하는 함수
function fn_getFileType(file_name) {
	var startIndex = file_name.lastIndexOf(".") + 1;
	var lastIndex = file_name.length;
	var fileType = file_name.substring(startIndex, lastIndex).toUpperCase();
	if (startIndex == 0) {
		fileType = cnts_Null2Void(i18n('C1800'),"파일");
	}
	return fileType;
}

//<,> 변환하는 함수
function fn_xEventHandler(str) {
	str = cnts_Null2Void(str, "");
	var regexp1 = new RegExp("<", "gi");
	str = str.replace(regexp1, "&lt;");
	var regexp2 = new RegExp(">", "gi");
	str = str.replace(regexp2, "&gt;");
	return str;
}
function fn_xReverseEventHandler(str) {
	str = cnts_Null2Void(str, "");
	var regexp1 = new RegExp("&lt;", "g");
	str = str.replace(regexp1, "<");
	var regexp2 = new RegExp("&gt;", "g");
	str = str.replace(regexp2, ">");
	return str;
}

//날짜 1991-10-10 22:30 바꾸는 함수
function cmf_convertDate(rgsnDate) {
	if (rgsnDate.length == 14) {
		return rgsnDate.substring(0, 4) + "-" + rgsnDate.substring(4, 6) + "-" + rgsnDate.substring(6, 8) + " " + rgsnDate.substring(8, 10) + ":" + rgsnDate.substring(10, 12);
	} else if (rgsnDate.length == 12) {
		return rgsnDate.substring(0, 4) + "-" + rgsnDate.substring(4, 6) + "-" + rgsnDate.substring(6, 8) + " " + rgsnDate.substring(8, 10) + ":" + rgsnDate.substring(10, 12);
	}
}

//휴대전화 포멧 변경
function fn_phoneNoFormat(num) {
	return num.replace(/(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/, "$1-$2-$3");
}

//날짜 1991.10.10 22:30
function cmf_getParsedDateTime(strDateTime) {
	var date = "";
	var time = "";
	if ("" != strDateTime) {
		if (strDateTime.length == 14) {
			date = strDateTime.substring(0, 4) + "." + strDateTime.substring(4, 6) + "." + strDateTime.substring(6, 8);
			time = strDateTime.substring(8, 10) + ":" + strDateTime.substring(10, 12);
		}else if (strDateTime.length == 8) {
			date = strDateTime.substring(0, 4) + "." + strDateTime.substring(4, 6) + "." + strDateTime.substring(6, 8);
		}
		return date + " " + time;
	} else {
		return "";
	}
}

//'":<| 제거 함수
function cmf_getEscape(val) {
	val = val.replace(/'/gi, '').replace(/"\\/g, '').replace(/:/g, '').replace(/"*/g, '').replace(/""/g, '').replace(/</g, '').replace(/>/g, '').replace(/|/g, '');
	return val;
}

//번호 변환 함수
function cmf_convrClphNo(str) {
	/*
			@js.wise10 modify this.
			@ 예외사항 Filiter 안되는거 많아서 정규식으로 수정.
	*/
	str = cnts_Null2Void(str, "-");
	var convertStr = "";
	if(!str.length < 8) {
		convertStr = str.replace(/[^0-9]/g, "").replace(/(^02|^0505|^1[0-9]{3}|^0[0-9]{2})([0-9]+)?([0-9]{4})$/,"$1-$2-$3").replace("--", "-");
		//convertStr = convertStr.substring(1,convertStr.length+1);
	}
	else {
		convertStr = "-"
	}

	return convertStr;
}

/**
 * @param {string} FILE_NM - 파일이름. 확장자 체크하기 위해 가져온다.
 * @param {string} RAND_KEY - 구글드라이브/드롭박스일 경우 찾기위해 받아온다.
 * @description 파일 컴포넌트의 로고이미지(확장자에 따라 다르다)를 찾기 위한 함수
 */
function fn_getFileIcon(FILE_NM, RAND_KEY) {

	var file_img = "";
	var file_type = fn_getFileType(FILE_NM);
	if (cnts_Null2Void(RAND_KEY, "") == "DROPBOX") {
		file_img = "/design3/img_rn/ico/file_icon2_dropbox.png";
	} else if (cnts_Null2Void(RAND_KEY, "") == "GOOGLEDRIVE") {
		file_img = "/design3/img_rn/ico/file_icon2_drive.png";
	} else if (file_type.indexOf("DOC") > -1) {
		file_img = "/design3/img_rn/ico/file_icon2_DOC.png";
	} else if (file_type.indexOf("HWP") > -1) {
		file_img = "/design3/img_rn/ico/file_icon2_hwp.png";
	} else if (file_type.indexOf("PDF") > -1) {
		file_img = "/design3/img_rn/ico/file_icon2_PDF.png";
	} else if (file_type.indexOf("PPT") > -1) {
		file_img = "/design3/img_rn/ico/file_icon2_PPT.png";
	} else if (file_type.indexOf("XLS") > -1) {
		file_img = "/design3/img_rn/ico/file_icon2_XLS.png";
	} else if (file_type.indexOf("ZIP") > -1) {
		file_img = '/design3/img_rn/ico/file_icon2_zip.png';
	} else if (file_type.indexOf("PSD") > -1) {
		file_img = '/design3/img_rn/ico/file_icon2_PSD.png';
	} else if (file_type.indexOf("JPG") > -1 || file_type.indexOf("JPEG") > -1 || file_type.indexOf("PNG") > -1 || file_type.indexOf("GIF") > -1 || file_type.indexOf("BMP") > -1) {
		file_img = '/design3/img_rn/ico/file_icon2_IMG.png';
	} else if (file_type.indexOf("AI") > -1) {
		file_img = '/design3/img_rn/ico/file_icon2_Ai.png';
	} else if (file_type.indexOf("KEY") > -1) {
		file_img = '/design3/img_rn/ico/file_icon2_KEY.png';
	} else if (file_type.indexOf("AVI") > -1 || file_type.indexOf("MP") > -1 || file_type.indexOf("WMV") > -1 || file_type.indexOf("ASF") > -1 || file_type.indexOf("ASX") > -1 || file_type.indexOf("FLV") > -1 || file_type.indexOf("RM") > -1 || file_type.indexOf("MOV") > -1 || file_type.indexOf("DAT") > -1 ||
		file_type.indexOf("OGG") > -1 || file_type.indexOf("WMA") > -1 || file_type.indexOf("WAV") > -1 || file_type.indexOf("AU") > -1 || file_type.indexOf("MID") > -1) {
		file_img = "/design3/img_rn/ico/file_icon2_mov.png";
	} else if (file_type.indexOf("HTML") > -1) {
		file_img = "/design3/img_rn/ico/file_icon2_html.png";
	} else {
		file_img = "/design3/img_rn/ico/file_icon2_down.png";
	}
	return file_img;
}

/**
 * 파일 아이콘(댓글, 파일모아보기)
 * @param {string} FILE_NM 파일이름
 * @param {string} RAND_KEY 
 */
function fn_getFileTypeImg(FILE_NM, RAND_KEY) {
	var file_img = "";
	var file_type = fn_getFileType(FILE_NM);
	if (cnts_Null2Void(RAND_KEY, "") == "DROPBOX") {
		file_img = "/design2/img_rn/ico/icon_sq_DROPBOX.gif";
	} else if (cnts_Null2Void(RAND_KEY, "") == "GOOGLEDRIVE") {
		file_img = "/design2/img_rn/ico/icon_sq_Drive.gif";
	} else if (file_type.indexOf("DOC") > -1) {
		file_img = "/design2/img_rn/ico/icon_sq_DOC.gif";
	} else if (file_type.indexOf("HWP") > -1) {
		file_img = "/design2/img_rn/ico/icon_sq_hwp.gif";
	} else if (file_type.indexOf("PDF") > -1) {
		file_img = "/design2/img_rn/ico/icon_sq_PDF.gif";
	} else if (file_type.indexOf("PPT") > -1) {
		file_img = "/design2/img_rn/ico/icon_sq_PPT.gif";
	} else if (file_type.indexOf("XLS") > -1) {
		file_img = "/design2/img_rn/ico/icon_sq_XLS.gif";
	} else if (file_type.indexOf("ZIP") > -1) {
		file_img = '/design2/img_rn/ico/icon_sq_zip.gif';
	} else if (file_type.indexOf("PSD") > -1) {
		file_img = '/design2/img_rn/ico/icon_sq_PSD.gif';
	} else if (file_type.indexOf("JPG") > -1 || file_type.indexOf("JPEG") > -1 || file_type.indexOf("PNG") > -1 || file_type.indexOf("GIF") > -1) {
		file_img = '/design2/img_rn/ico/icon_sq_IMG.gif';
	} else if (file_type.indexOf("AI") > -1) {
		file_img = '/design2/img_rn/ico/icon_sq_AI.gif';
	} else if (file_type.indexOf("AVI") > -1 || file_type.indexOf("MP") > -1 || file_type.indexOf("WMV") > -1 || file_type.indexOf("ASF") > -1 || file_type.indexOf("ASX") > -1 || file_type.indexOf("FLV") > -1 || file_type.indexOf("RM") > -1 || file_type.indexOf("MOV") > -1 || file_type.indexOf("DAT") > -1 ||
		file_type.indexOf("OGG") > -1 || file_type.indexOf("WMA") > -1 || file_type.indexOf("WAV") > -1 || file_type.indexOf("AU") > -1 || file_type.indexOf("MID") > -1) {
		file_img = "/design2/img_rn/ico/icon_sq_mov.gif";
	} else if (file_type.indexOf("HTML") > -1) {
		file_img = "/design3/img_rn/ico/icon_sq_HTML.gif";	
	} else {
		file_img = "/design2/img_rn/ico/icon_sq_DOWN.gif";
	}

	return file_img;
}

/**
 * 파일 확장자 별 아이콘
 * @param fileNm
 * @returns {String}
 */
function fn_fileImg(fileNm) {
	var file_type = fn_getFileType(fileNm);
	var file_img = "";
	if (file_type.indexOf("DOC") > -1) {
		file_img = "file_icon2_DOC";
	} else if (file_type.indexOf("HWP") > -1) {
		file_img = "file_icon2_hwp";
	} else if (file_type.indexOf("AI") > -1) {
		file_img = "file_icon2_Ai";
	} else if (file_type.indexOf("JPG") > -1 || file_type.indexOf("JPEG") > -1 || file_type.indexOf("PNG") > -1 || file_type.indexOf("GIF") > -1) {
		file_img = "file_icon2_IMG";
	} else if (file_type.indexOf("PDF") > -1) {
		file_img = "file_icon2_PDF";
	} else if (file_type.indexOf("PPT") > -1) {
		file_img = "file_icon2_PPT";
	} else if (file_type.indexOf("PSD") > -1) {
		file_img = "file_icon2_PSD";
	} else if (file_type.indexOf("XLS") > -1) {
		file_img = "file_icon2_XLS";
	} else if (file_type.indexOf("ZIP") > -1) {
		file_img = "file_icon2_zip";
	} else if (file_type.indexOf("AVI") > -1 || file_type.indexOf("MP") > -1 || file_type.indexOf("WMV") > -1 || file_type.indexOf("ASF") > -1 || file_type.indexOf("ASX") > -1 || file_type.indexOf("FLV") > -1 || file_type.indexOf("RM") > -1 || file_type.indexOf("MOV") > -1 || file_type.indexOf("DAT") > -1 ||
		file_type.indexOf("OGG") > -1 || file_type.indexOf("WMA") > -1 || file_type.indexOf("WAV") > -1 || file_type.indexOf("AU") > -1 || file_type.indexOf("MID") > -1) {
		file_img = "file_icon2_mov";
	} else if (file_type.indexOf("CAD") > -1) {
		file_img = "file_icon2_autocad";
	} else if (file_type.indexOf("GOOGLEDRIVE") > -1) {
		file_img = 'file_icon2_drive';
	} else if (file_type.indexOf("DROPBOX") > -1) {
		file_img = 'file_icon2_dropbox';
	} else {
		file_img = "file_icon2_down";
	}
	return file_img;
}

//@유민호 : 이미지, 파일을 글자말고 태그로 바꾸기 190624
function imgFileConvTag(cntn, atch_gb){
	var imgDis = '';
	var fileDis = '';
	if("I" === atch_gb){
		imgDis = 'inline';
		fileDis = 'none';
	} else if ("F" === atch_gb){
		imgDis = 'none';
		fileDis = 'inline';
	} else if ("C" === atch_gb){
		imgDis = 'inline';
		fileDis = 'inline';
	} else{
		return cntn;
	}
	cntn += ' ';
	if(imgDis !== 'none'){
		cntn += '<span id="IMG_ATCH" style="display:'+imgDis+';">';
		cntn += '<img src="/design2/img_rn/ico/ico_s_photo.png" alt="">';
		cntn += '&nbsp;<span style="color:#969696">'+c18n('CD745','이미지')+'</span></span>'; 
	}
	if(fileDis !== 'none'){
		cntn += '<span id="ATCH" style="display:'+fileDis+';">';
		cntn += '<img src="/design2/img_rn/ico/ico_s_file.png" alt="">';
		cntn += '&nbsp;<span style="color:#969696">'+c18n('FL588','파일')+'</span></span>';
	}
	return cntn;
}

//이미지 이름 표현 방식 
function cfn_imgName(name) {
	if (cnts_Null2Void(name, "") != "") {
		if (name.length > 0) {
			if (name.indexOf(" ") > -1) { //스페이스가 포함되었을 경우 각 맨앞 2글자만 출력.
				name = name.substr(0, 1) + name.substr(name.indexOf(" ") + 1, 1);
			} else {
				var pattern = /[^(가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z)]/gi; // 특수문자/숫자 제거
				if (pattern.test(name)) {
					name = name.replace(pattern, "");
				}
				if (name.length > 3) { //3자리가 넘으면 제거한다.
					name = name.substr(0, 3);
				} else {
					//done.
				}
			}
		} else {
			//done.
		}
	} else {
		//done.
	}
	return name;
}

function changeLimitCntStr(cnt, limitCnt){
	var rstCnt = "";
	if(coalesce3(cnt) == ""){
		//done
	} else {
		var thisLimitCnt = coalesce3(limitCnt, "999");
		if(Number(cnt) > Number(thisLimitCnt)){
			rstCnt = thisLimitCnt + "+";
		} else {
			rstCnt = cnt;
		}
	}
	return rstCnt;
}

function removePlus(cnt){
	return cnt.indexOf("+")>-1 ? cnt.replace("+","") : cnt;
}



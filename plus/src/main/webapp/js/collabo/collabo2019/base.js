/** flow_main.js
 * 첨부이미지 삭제
 * @param target > delete btn
 */
function fn_deletePic(target) {
    if ($(target).parent().parent().find(".file.new_atch").length === 1) {
        $(target).parent().parent().parent().parent().parent().parent().find(".pst_btn_bx").find(".btn.app_pic").find(".imageicon").addClass('off').removeClass('on');
        $(target).parent().parent().parent().parent().parent().find(".photo_loll_wrap").hide();
        $(target).parent().parent().parent().parent().parent().find(".photo_loll_fix").hide();
    }

    if ($(target).parents("li[name=PIC_LI]").hasClass("new_atch")) {
        $(target).parents("li[name=PIC_LI]").remove();
    } else {
        $(target).parents("li[name=PIC_LI]").hide();
    }
}

function fn_setImgOneMoreStyle(target, customSize) {
    var imgWidth = target.width;
    var imgHeight = target.height;
    var divOffsetW = 320; // 이미지를 감싸는 div width
    var divOffsetH = 320; // 이미지를 감싸는 div height
    if (customSize) { //if [customSize] is undefined, return false. (customSize != undefined) is not working:(
        divOffsetW = parseInt(customSize);
        divOffsetH = parseInt(customSize);
    }

    if (imgWidth <= imgHeight) {
        target.style.cssText = 'width:100%;';
    } else {
        target.style.cssText = 'height:100%;';
    }
}

/** flow_main.js
 * 첨부이미지 로드시 리사이징
 * @param target >  img
 */
function fn_setImgOneStyle(target) {
    var imgWidth = target.width;
    var imgHeight = target.height;

    if (imgHeight <= imgWidth) { // 이미지 width가 긴 경우 height를 div에 맞추고 width에 중앙으로 맞춤
        target.style.cssText = 'width:648px;';
    } else { // 이미지 height가 긴 경우 width를 div에 맞추고 height에 중앙으로 맞춤
        target.style.cssText = 'height:648px;';
    }

    $(target).css('border', '1px solid #d4d4d4');
}


/** flow_main.js && colabo3_content.js
 * 첨부파일 리스트 html (다운로드 링크)
 * @param dat    첨부파일 recode
 * @param mode   수정모드 (U)
 * @param key1
 * @param key2
 * @returns {String}
 */
function fn_makeAtchHtml(dat, mode, key1, key2) {
    var tmpHtml = "";
    var tmpStr = "";
    $.each(dat, function (i, v) {
        var f_FileNm = cnts_Null2Void(v.ORCP_FILE_NM,
            cnts_Null2Void(i18n('DCC416'), "알 수 없는 파일"));
        var f_FileSize = fileSizeFormmat(cnts_Null2Void(
            v.FILE_SIZE, "0"));
        var f_FileSrno = v.ATCH_SRNO;
        var f_RandKey = v.RAND_KEY;

        var f_Ext = "";
        if (f_RandKey == "DROPBOX" || f_RandKey == "GOOGLEDRIVE")
            f_Ext = fn_fileImg("." + f_RandKey);
        else
            f_Ext = fn_fileImg(f_FileNm);

        if ("Y" == cnts_Null2Void(v.CLOUD_YN, "N")) {
            tmpStr = "_WE_DRIVER.download('" + f_RandKey + "');";
        } else {
            tmpStr = "javascript:location.href='/fileDownload_0001.act?PTL_ID=" + v.PTL_ID + "&CHNL_ID=" + v.CHNL_ID + "&USE_INTT_ID=" + v.USE_INTT_ID + "&ATCH_SRNO=" + f_FileSrno + "&RAND_KEY=" + f_RandKey + "'";
        }
        if (cnts_Null2Void(mode) != "U") { // 조회모드
            tmpHtml += "<li class='file' name='ATCH_LI'>";
            tmpHtml += "	<span class='file_icon'><img src='/design2/img_rn/ico/" + f_Ext + ".png' alt=''></span>";
            tmpHtml += "	<a class='txt' onclick=\"" + tmpStr + "\">" + f_FileNm + "</a>";
            tmpHtml += "	<input type='hidden' id='F_RAND_KEY' name='F_RAND_KEY' value='" + f_RandKey + "'>";
            tmpHtml += "	<span class='capacity'>" + f_FileSize + "</span>";
            tmpHtml += "</li>";
        } else { // 수정모드
            var f_info = {
                "RAND_KEY": f_RandKey,
                "IMG_PATH": v.FILE_STRG_PATH,
                "FILE_NM": v.ORCP_FILE_NM,
                "FILE_SIZE": v.FILE_SIZE,
                "CLOUD_YN": v.CLOUD_YN,
                "ATCH_SRNO": v.ATCH_SRNO
            };
            tmpHtml += "<li class='file' name='ATCH_LI'>";
            tmpHtml += "	<span class='file_icon'><img src='/design2/img_rn/ico/" + f_Ext + ".png' alt=''></span>";
            tmpHtml += "	<a class='txt'>" + f_FileNm + "</a>";
            tmpHtml += "	<input type='hidden' id='F_RAND_KEY' name='F_RAND_KEY' value='" + f_RandKey + "'>";
            tmpHtml += "	<input type='hidden' id='F_INFO' name='F_INFO' value='" + encodeURIComponent(JSON.stringify(f_info)) + "'>";
            tmpHtml += "	<span class='capacity'>" + f_FileSize + "</span>";
            if (cnts_Null2Void(key1) != "" && cnts_Null2Void(key2) != "") {
                tmpHtml += "	<a class='del' onclick='fn_deleteAtch(this);'></a>";
            } else {
                tmpHtml += "	<a class='del' onclick='fn_deleteAtch(this);'></a>";
            }
            tmpHtml += "</li>";
        }
    });
    return tmpHtml;

}

/** flow_task.js & flow_text.js
 * 전체파일 다운로드 함수 v.2.1.2 추가
 * @return
 */
function fn_downAllAtch(ptlId, chnlId, useInttId, tblNm, lnkdKey1, lnkdKey2, colaboUseInttId) { // 20150309 첨부파일수정
    var isAllCloud = true;
    var attFile = [];
    var jexAjax = jex.createAjaxUtil("comm_atch_r001");
    jexAjax.set("PTL_ID", ptlId);
    jexAjax.set("CHNL_ID", chnlId);
    jexAjax.set("USE_INTT_ID", useInttId);
    jexAjax.set("TBL_NM", tblNm);
    jexAjax.set("LNKD_KEY1", lnkdKey1);
    jexAjax.set("LNKD_KEY2", cnts_Null2Void(lnkdKey2, ""));
    jexAjax.set("COLABO_USE_INTT_ID", cnts_Null2Void(colaboUseInttId, ""));
    jexAjax.set("_LODING_BAR_YN_", "N");
    jexAjax.setAsync(false);
    jexAjax.execute(function (dat) {
        if (!jex.isError(dat)) {
            $.each(dat.ATCH_REC, function (i, v) {
                if (v.RAND_KEY.indexOf("FLOW_") > -1) {
                    isAllCloud = false;
                } else {
                    if ("Y" == v.CLOUD_YN) {
                        var tmpJsonFile = {};
                        tmpJsonFile["FILE_IDNT_ID"] = v.RAND_KEY;
                        attFile.push(tmpJsonFile);
                    } else {
                        isAllCloud = false;
                    }
                }
            });
        }
    });

    if (isAllCloud) {
        _WE_DRIVER.multiDownload(attFile);
    } else {
        var $frmObj = $("<form id='frm_down_all_atch' name='frm_down_all_atch'></form>");
        $frmObj.attr("action", "zipfileDownload_0001.act");
        $frmObj.attr("target", "_parent");
        $frmObj.attr("method", "post");
        $frmObj.appendTo("body");

        var s_ptl_id = $("<input type='hidden' name='PTL_ID' value='" + ptlId + "'/>");
        var s_chnl_id = $("<input type='hidden' name='CHNL_ID' value='" + chnlId + "'/>");
        var s_use_intt_id = $("<input type='hidden' name='USE_INTT_ID' value='" + useInttId + "'/>");
        var s_tbl_nm = $("<input type='hidden' name='TBL_NM' value='" + tblNm + "'/>");
        var s_lnkd_key1 = $("<input type='hidden' name='LNKD_KEY1' value='" + lnkdKey1 + "'/>");
        var s_lnkd_key2 = $("<input type='hidden' name='LNKD_KEY2' value='" + cnts_Null2Void(lnkdKey2, "") + "'/>");
        var s_colabo_use_intt_id = $("<input type='hidden' name='COLABO_USE_INTT_ID' value='" + cnts_Null2Void(colaboUseInttId, "") + "'/>");
        $frmObj.append(s_ptl_id).append(s_chnl_id).append(s_use_intt_id).append(s_tbl_nm).append(s_lnkd_key1).append(s_lnkd_key2).append(s_colabo_use_intt_id);
        $frmObj.submit();
        $frmObj.remove();
    }
}

function fn_downZipAtch(randKeys) {
    var $frmObj = $("<form id='frm_down_all_atch' name='frm_down_all_atch'></form>");
    $frmObj.attr("action", "zipfileDownload_0001.act");
    $frmObj.attr("target", "_parent");
    $frmObj.attr("method", "post");
    $frmObj.appendTo("body");

    var s_ptl_id = $("<input type='hidden' name='PTL_ID' value='" + _PTL_ID + "'/>");
    var s_chnl_id = $("<input type='hidden' name='CHNL_ID' value='" + _CHNL_ID + "'/>");
    var s_rand_key = $("<input type='hidden' name='RAND_KEY' value='" + randKeys + "'/>");
    $frmObj.append(s_ptl_id).append(s_chnl_id).append(s_rand_key);
    $frmObj.submit();
    $frmObj.remove();
}

/** flow_layout.js
 * 프로필 조회
 * @param e     클릭 위치
 * @param obj    IDNT_GB : 필수항목 구분, IDNT_ID : 필수 항목 key
 */
function cmf_openLayerInfo(e, obj) {
    var user = jQuery.parseJSON(decodeURIComponent(obj));
    if (user.IDNT_GB == "U") {
        fn_profile(user.IDNT_ID);
    } else {
        //done.
    }
}

/**
 * (콜라보 공통) 확인 msg alert
 * @param type  1:등록 2:삭제 3:수정
 * @param msg  msg text
 */
var cmf_layerMsg = (function (type, msg) {

    // clog("cmf_layerMsg ### ");
    // clog("cmf_layerMsg ### " + type + "/" + msg);

    var workingTimer = -1;

    function getAlertClass(type) {
        switch (type) {
            case "1":
                return "info";
            case "2":
                return "error";
            case "3":
                return "info";
            default:
                return "default";
        }
    }

    return function (type, msg) {

        var alertStyleClass = getAlertClass(type);
        $("#layerAlert").addClass(alertStyleClass);

        if ($("#layerAlert").find("p").length > 0) {
            $("#layerAlert").find("p").text(msg);
        } else {
            $("#layerAlert").find("pre").text(msg);
        }

        $("#layerAlert").show();

        if (workingTimer > 0) {
            clearInterval(workingTimer);
            workingTimer = -1;
        }

        workingTimer = setTimeout(function () {
            $("#layerAlert").hide();
            $("#layerAlert").removeClass(alertStyleClass);
            workingTimer = -1;
        }, 2000);
    }
})();

/**
 * (콜라보 공통) Confirm msg
 * @param event
 * @param type
 * @param callbackFn
 * @param arg(argument)
 */
function fn_layerComfirm(e, type, callbackFn, arg, msg) {

    clog("fn_layerComfirm ### " + type + "/" + msg);

    $("#commLayerWrap").empty();

    var typeMsg = "";
    var confirmMsg1 = "";
    var confirmMsg2 = cnts_Null2Void(i18n('CD755'), "취소");
    var top, left;

    if (type == "") {
        return false;
    }
    if (type == "1") { // 보관함 삭제
        confirmMsg1 = cnts_Null2Void(i18n('H381'), "삭제");
        typeMsg = cnts_Null2Void(i18n('DCC419'), "보관함을 삭제하시겠습니까?<br>보관함에 포함된 프로젝트는 삭제되지 않습니다.");
        e.stopPropagation();
        // 소문혁 보관함삭제 e.stopPropagation();
    }
    if (type == "2") { // 콜라보 나가기
        confirmMsg1 = cnts_Null2Void(i18n('DCC420'), "나가기");
        typeMsg = cnts_Null2Void(i18n('DFL89'), "정말 나가기를 하시겠습니까?<br>한번 나가기를 한 프로젝트는 다시 초대되기 전까지<br>입장이 불가능합니다.");
    }
    if (type == "3") { // 연락처 미지정 담기
        confirmMsg1 = cnts_Null2Void(i18n('DFL90'), "담기");
        typeMsg = cnts_Null2Void(i18n('DFL91'), "연락처 그룹을 선택하지 않아 미지정 그룹으로 등록됩니다.");
    }


    if (cnts_Null2Void(e, '') != '') {
        var pos = fn_absPos(e);
        top = pos.y + "px";
        left = pos.x + "px";
    } else {
        top = ($(window).innerHeight() / 2) + "px";
        left = ($(window).innerWidth() / 2) + "px";
    }

    if (type == "4") { //일정변경
        confirmMsg1 = cnts_Null2Void(i18n('FNS1776'), "알림");
        confirmMsg2 = cnts_Null2Void(i18n('DCC425'), "알리지 않음");
        typeMsg = cnts_Null2Void(i18n('DCC426'), "변경이 완료되었습니다. 변경된 일정을 참여자들에게 다시 알리시겠습니까?");
        top = "40%";
        left = "35%";
    }

    if (type == "5") {
        confirmMsg1 = cnts_Null2Void(i18n('CLP967'), "변경");
        confirmMsg2 = cnts_Null2Void(i18n('CD755'), "취소");
        typeMsg = msg;
    }

    if (type == "6") { //초대팝업 나가기, 업그레이드 팝업 나가기
        top = (($(window).innerHeight() / 2) - 47) + "px";
        left = (($(window).innerWidth() / 2) - 160) + "px";
        confirmMsg1 = cnts_Null2Void(i18n('FIP1532'), "예");
        confirmMsg2 = cnts_Null2Void(i18n('FIP1531'), "아니오");
        typeMsg = msg;
    }

    if (type == "7" || type == "8") { //취소 확인
        top = (($(window).innerHeight() / 2) - 200) + "px";
        left = (($(window).innerWidth() / 2) - 160) + "px";
        confirmMsg1 = cnts_Null2Void(i18n('H359'), "확인");
        confirmMsg2 = cnts_Null2Void(i18n('CD755'), "취소");
        typeMsg = msg;
    }

    var tmpHtml = "";
    if (type == "6") {
        tmpHtml += "<div id='commlayer' esc_callback='fn_confirmCancelType6' style='width:100%;height:100%;position:fixed;top:0;left:0;z-index:9002;'>";
    } else {
        tmpHtml += "<div id='commlayer' style='width:100%;height:100%;position:fixed;top:0;left:0;z-index:1110;'>";
    }
    tmpHtml += "<div class='layerstyle1' style='display:block;top:" + top + ";left:" + left + ";'><div class='layerstyle1_po'>";
    tmpHtml += "	<div class='layerstyle1_cont'><p>" + typeMsg + "</p>";

    if (type == "6") {
        tmpHtml += "		<div class='lp_btn_wrap'><a class='btn_style2' onclick=\"event.stopPropagation();fn_confirmCancelType6();return false;\"><span>" + confirmMsg2 + "</span></a>&nbsp;<a class='btn_style1' onclick=\"event.stopPropagation();fn_confirmCallbackType6('" + callbackFn + "','" + cnts_Null2Void(arg) + "');return false;\"><span>" + confirmMsg1 + "</span></a></div>";
    } else if (type == "7") {
        tmpHtml += "		<div class='lp_btn_wrap'><a class='btn_style2' onclick=\"event.stopPropagation();fn_confirmCancel();prjFavoriteSettings.viewCheckImptYn();return false;\"><span>" + confirmMsg2 + "</span></a>&nbsp;<a class='btn_style1' onclick=\"event.stopPropagation();prjFavoriteSettings.fn_clearAllImpt(prjFavoriteSettings.fn_setImptUseY);return false;\"><span>" + confirmMsg1 + "</span></a></div>";
    } else if (type == "8") {
        tmpHtml += "		<div class='lp_btn_wrap'><a class='btn_style2' onclick=\"event.stopPropagation();fn_confirmCancel();prjFavoriteSettings.viewCheckImptYn();return false;\"><span>" + confirmMsg2 + "</span></a>&nbsp;<a class='btn_style1' onclick=\"event.stopPropagation();prjFavoriteSettings.fn_clearAllImpt(prjFavoriteSettings.hidePopup);return false;\"><span>" + confirmMsg1 + "</span></a></div>";
    } else {
        tmpHtml += "		<div class='lp_btn_wrap'><a class='btn_style2' onclick=\"event.stopPropagation();fn_confirmCancel();return false;\"><span>" + confirmMsg2 + "</span></a>&nbsp;<a class='btn_style1' onclick=\"event.stopPropagation();fn_confirmCallback('" + callbackFn + "','" + cnts_Null2Void(arg) + "');return false;\"><span>" + confirmMsg1 + "</span></a></div>";
    }

    tmpHtml += "	</div></div></div></div>";
    var $msgBox = $("#commLayerWrap");
    $msgBox.append(tmpHtml);

    if (type == "4") { //일정변경
        $("#modifySchdPush").show();
        $msgBox.find("#commlayer").css("z-index", "10001");
    } else if (type == "6") { //업그레이드
        $msgBox.find("#commlayer").css("z-index", "13001");

    }
    if (type != "6") {
        document.body.style.overflow = 'hidden';
    }
}


/** flow_layout.js
 * event position
 * @param ev
 * @returns
 */
function fn_absPos(e) {
    // x, y: 현재 마우스 위치
    var xPos = e.clientX;
    var yPos = e.clientY;
    if (xPos + 300 > document.documentElement.clientWidth) xPos = xPos - 200;
    if (yPos + 160 > document.documentElement.clientHeight) yPos = yPos - 200;
    var pos = {
        x: xPos,
        y: yPos
    };
    return pos;
}

/**
 * callback confirm msg
 *
 * @param callbackFn
 * @param arg
 */
function fn_confirmCallback(callbackFn, arg) {
    $("#modifySchdPush").hide();
    window[callbackFn](arg);
    $("#commLayerWrap").empty();
    document.body.style.removeProperty('overflow');
}

function fn_confirmCancel() {
    $("#collabo_mod_bg_layer").hide();
    $("#modifySchdPush").hide();
    $('#commLayerWrap').empty();
    document.body.style.removeProperty('overflow');
}

/**
 * callback confirm callback for type6
 * @param callbackFn    : object
 * @param arg            : function
 */
function fn_confirmCallbackType6(callbackFn, arg) {
    $("#modifySchdPush").hide();
    window[callbackFn][arg]();
    $("#commLayerWrap").empty();
}

function fn_confirmCancelType6() {
    $("#modifySchdPush").hide();
    $('#commLayerWrap').empty();
}

/**============================== collabo3 부터는 공통은 cmf_로 통일한다. ================================= **/
/** flow_layout.js & flow_project.js
 * 콜라보 숨김처리
 * @param key
 * @param opt  :  숨기기(Y), 취소(N)
 */
function cmf_hiddenCollabo(key, opt) {
    var b_success = false;
    var jexAjax = jex.createAjaxUtil("COLABO2_C105");
    jexAjax.set("COLABO_SRNO", key);
    jexAjax.set("HIDDEN_YN", cnts_Null2Void(opt, "N"));
    jexAjax.set("USER_ID", _USER_ID);
    jexAjax.set("RGSN_DTTM", _RGSN_DTTM);
    jexAjax.setAsync(false);
    jexAjax.execute(function (dat) {
        if (!jex.isError(dat)) { // authorization check
            b_success = true;
            if ($("#contentWrap").css("display") != "none") { //메인 리스트일 때.
                $("#mainList").find("#callabo_tr_" + key).remove();
            } else {
                //done.
            }

        } else {
            b_success = false;
        }
    });
    return b_success;
}

function fn_profile(user_id) {

    //@유민호 : 투어계정 제한 190517
    if (isTour()) {
        fn_openServiceBlockPopup("projectMakeTourLimit");
        return;
    }

    if (user_id == "ALL") {
        return;
    }

    var jexAjax = jex.createAjaxUtil("COLABO2_USER_PRFL_R002");
    jexAjax.set("USER_ID", _USER_ID);
    jexAjax.set("RGSN_DTTM", _RGSN_DTTM);
    jexAjax.set("SRCH_USER_ID", user_id);
    jexAjax.errorTrx = false;

    jexAjax.execute(function (dat) {
        if (!jex.isError(dat)) {

            var profilePop = $("#profilePopup")

            //김승훈 화상회의 버튼 분기처리
            if (isFunc('VIDEO_CONFERENCE')) {


                if (_USER_ID == dat.USER_ID) {
                    profilePop.find("#profileModifyBtn").show();
                    profilePop.find("#profileVideoBtn").hide();
                } else {
                    profilePop.find("#profileModifyBtn").hide();
                    profilePop.find("#profileVideoBtn").show();
                }

                profilePop.find('.prof_btn').hide();
                profilePop.find('.prof-menu').show();
            } else {
                profilePop.find('.prof_btn').show();
                profilePop.find('.prof-menu').hide();
            }

            $("#profilePopup").find("#PRFL_PHTG").css({
                'width': '300px',
                'height': '300px',
            });

            setImageSrc($("#profilePopup").find("#PRFL_PHTG"), cnts_Null2Void(dat.PRFL_PHTG, "/design2/img_rn/img_photo_null_for_prfl.png"));
            $("#profilePopup").find("#FLNM").text(cnts_Null2Void(dat.FLNM, ""));

            if (cnts_Null2Void(dat.JBCL_NM, cnts_Null2Void(dat.RSPT_NM, "")) != "") {
                $("#profilePopup").find("#JBCL_NM").text(cnts_Null2Void(dat.JBCL_NM, cnts_Null2Void(dat.RSPT_NM, "")));
            } else {
                $("#profilePopup").find("#JBCL_NM").text('');
            }

            //@김승훈 프로필 회사명 , 직책 표시 수정
            if(dat.CMNM != "") {
                $("#profilePopup").find("#CMNM").show();
                $("#profilePopup").find("#CMNM").text(cnts_Null2Void(dat.CMNM));
            }
            else {
                $("#profilePopup").find("#CMNM").hide();
            }

            if(dat.DVSN_NM != "") {
                $("#profilePopup").find("#DVSN_NM").show();
                $("#profilePopup").find("#DVSN_NM").text(cnts_Null2Void(dat.DVSN_NM));
            }
            else {
                $("#profilePopup").find("#DVSN_NM").hide();
            }

            var profilePopupInProject = $("#profilePopup");

            var EML = cnts_Null2Void(dat.EML, "-");

            var CLPH_NTNL_CD = cnts_Null2Void(dat.CLPH_NTNL_CD, "KR_82");
            var CLPH_NO = cnts_Null2Void(dat.CLPH_NO, "")
            var clph_noConverted = classfyKoreanOrForeign(CLPH_NTNL_CD, CLPH_NO);
            setClickToCallIntoNumber(clph_noConverted, "CLPH_NO");

            var CMPN_TLPH_NTNL_CD = cnts_Null2Void(dat.CMPN_TLPH_NTNL_CD, CLPH_NTNL_CD);
            var CMPN_TLPH_NO = cnts_Null2Void(dat.CMPN_TLPH_NO, "");
            var cmpn_tlph_no_Converted = classfyKoreanOrForeign(CMPN_TLPH_NTNL_CD, CMPN_TLPH_NO);
            setClickToCallIntoNumber(cmpn_tlph_no_Converted, "CMPN_TLPH_NO");

            var SLGN = cnts_Null2Void(dat.SLGN, "-");
            var extns_noConverted = validateAndConvertEXTNS_NO(dat.EXTNS_NO);

            profilePopupInProject.find("#EML").text(EML);
            profilePopupInProject.find("#CLPH_NO").text(clph_noConverted);
            profilePopupInProject.find("#CMPN_TLPH_NO").text(cmpn_tlph_no_Converted);
            profilePopupInProject.find("#SLGN").text(SLGN);
            profilePopupInProject.find("#EXTNS_NO").text(extns_noConverted);

            /* setting icon js.wise10 */
            $('#CLPH_NO').css('background-image', 'url(/joins_flow/joins_img/icon_cellPhone2.png)');
            $('#EXTNS_NO').css('background-image', 'url(/joins_flow/joins_img/icon_comPhone.png)');
            $('#CMPN_TLPH_NO').css('background-image', 'url(/joins_flow/joins_img/icon_call.png)');
            $('#EML').css('background-image', 'url(/joins_flow/joins_img/icon_mail2.png)');
            $('#SLGN').css('background-image', 'url(/joins_flow/joins_img/icon_Introduce.png)');
            $('#prof_menuBox').css('margin-top', '45px');

            /* profile show/hide functionalize */
            var hideIconCnt = 0;
            if(isFuncDeployList("SHOW_INNER_NUMBER")) {
                $("#EXTNS_NO").show();
            }
            else {
                $("#EXTNS_NO").hide();
                hideIconCnt++;
            }
            if(isFuncDeployList("SHOW_SLOGAN")) {
                $("#SLGN").show();
            }
            else {
                $("#SLGN").hide();
                hideIconCnt++;
            }

            /* post-processing margin after hide icon */
            if(hideIconCnt === 1) {
                $(".prof_bx .prof_info .prof_btn").css('margin-top', '30px');
                $(".prof-menu").css('margin-top', '30px');
            }
            else if(hideIconCnt === 2) {
                $(".prof_bx .prof_info .prof_btn").css('margin-top', '5px');
                $(".prof-menu").css('margin-top', '5px');
            }
            else if(hideIconCnt === 0) {
                $(".prof_bx .prof_info .prof_btn").css('margin-top', '54px');
                $(".prof-menu").css('margin-top', '54px');
            }
            else {
                //done.
            }
            hideIconCnt = 0;

            // //TODO 여기부터 값하나 하나 확인.
            // if(isFuncDeployList("SHOW_SLOGAN") && document.querySelector('#profilePopup').style.getPropertyValue('display') == 'block') {
            //     var getMarginValue = document.querySelector('.prof-menu').style.getPropertyValue('margin-top').substring(0,document.querySelector('.prof-menu').style.getPropertyValue('margin-top').length-2)
            //     var expandSize = calculateExpendMarginSize($('#SLGN').height());
            //     console.log(expandSize);
            //     var setExpandSize = Number(expandSize) + Number(getMarginValue);
            //
            //     $(".prof-menu").css('margin-top', setExpandSize+'px');
            //
            // }

            $("#profilePopup").find("#userPrflClose").on("click", function () {
                fn_profileClose();
            });

            $("#profilePopup").find(".chat-btn").off("click").on("click", function (e) {

                //@유민호 : 투어계정 제한 190517
                if (isTour()) {
                    fn_openServiceBlockPopup("projectMakeTourLimit");
                    return;
                }

                fn_profileClose();
                fn_oneToOneChatStart(user_id);
            });
            $("#profileVideoBtn").off("click").on("click", function (e) {
                if(location.href.indexOf("ktworks.co.kr") > -1 || location.href.indexOf("ktbizworks.co.kr") > -1) {
                    var yes_func = function () {
                        localStorage.setItem("VIDEO_CONF_YN", "Y");
                        fn_oneToOneChatStart(user_id, "Y")
                    }
                    var no_func = function () {
                        return;
                    }
                    var dat = []
                    dat["text"] = {
                        "title": c18n("ui.preferences.label.videomeet", "화상회의"),
                        "cont": "KT BizMeet 화상회의를 진행하시겠습니까?"
                    }
                    dat["yes_func"] = yes_func
                    jsDraw.confirm(dat)
                } else {
                    if(limitGuest.isLimitGuest(e, 'zoomGuestLimit')){
                        return;
                    }
                    flowJexAjax.executeApi("FLOW_EXT_SERVICE_R001", {"USER_ID": _USER_ID}, function (data) {
                        fn_profileClose();
                        if ((!data.EXT_SERVICE_REC || data.EXT_SERVICE_REC.length < 1 || data.EXT_SERVICE_REC[0] == "") && _ENTER_YN === "N") {
                            fn_openServiceBlockPopup('zoomPopupEnterprise')
                            return;
                        } else if(_ENTER_YN === "Y") {
                            var inputJson = {
                                "USER_ID": _USER_ID,
                                "RGSN_DTTM" : _RGSN_DTTM,
                            }
                            flowJexAjax.executeApi("COLABO_ZOOM_AUTH_R001", inputJson, function (dat) {
                                if (dat.ERR_YN === "Y") {
                                    jsDraw.notice({text: {title: "화상회의", cont: dat.ERR_MSG}})
                                    return;
                                }
                                fn_confirmVideoMsg();
                            })
                        } else {
                            fn_confirmVideoMsg();
                        }


                    })
                }
            })
            function fn_confirmVideoMsg() {
                var yes_func = function () {
                    localStorage.setItem("VIDEO_CONF_YN", "Y");
                    fn_oneToOneChatStart(user_id, "Y")
                }
                var no_func = function () {
                    return;
                }
                var dat = []
                dat["text"] = {
                    "title": c18n("ui.preferences.label.videomeet", "화상회의"),
                    "cont": c18n("ui.label.chat.zoom.progress", "ZOOM 화상회의를 진행하시겠습니까?")
                }
                dat["yes_func"] = yes_func;
                jsDraw.confirm(dat);
            }
            $("#profileModifyBtn").off("click").on("click", function (e) {
                fn_profileClose();
                if (isEditingInProject()) {
                    //@ 김시훈 201013 프로필 수정 누른 후 참석자 상태 안꺼지는 현상 수정
                    if($("body").find("#attendeeRead").css("display") === "block") {
                        $("body").find("#attendeeRead").find("#atdCfCloseBtn").click();
                    }
                    openOutConfirm(function () {
                        fn_collabo_setting();
                    });
                } else {
                    fn_collabo_setting();
                    if ($("body").find("#all-sendience-layer").css('display') === 'block') {
                        $("#all-sendience-layer-close-btn").click();
                    }
                    //@ 김시훈 201013 프로필 수정 누른 후 참석자 상태 안꺼지는 현상 수정
                    if($("body").find("#attendeeRead").css("display") === "block") {
                        $("body").find("#attendeeRead").find("#atdCfCloseBtn").click();
                    }
                }
            })
            if (_USER_ID == dat.USER_ID && _USE_INTT_ID != 'JOINS_1') {
                $("#profilePopup").find("#PROFILE_EDIT").show();
                $("#profilePopup").find("#PROFILE_EDIT").off("click");
                if ($("#project-detail").length > 0) {
                    $("#profilePopup").find("#PROFILE_EDIT").on("click", function (e) {
                        fn_profileClose();
                        if (isEditingInProject()) {
                            openOutConfirm(function () {
                                fn_collabo_setting();
                            });
                        } else {
                            fn_collabo_setting();
                            //[송제섭] 프로필 수정 누른 후 창 안꺼지는 현상 수정 [ 2020-06-04 ]
                            if ($("body").find("#all-sendience-layer").css('display') === 'block') {
                                $("#all-sendience-layer-close-btn").click();
                            }
                        }
                    });
                } else {
                    $("#profilePopup").find("#PROFILE_EDIT").on("click", function (e) {
                        fn_profileClose();
                        if (!cmf_outConfirm(fn_collabo_setting)) {
                            return;
                        }
                        fn_collabo_setting();
                        if ($("body").find("#all-sendience-layer").css('display') === 'block') {
                            $("#all-sendience-layer-close-btn").click();
                        }
                    });
                }

            } else {
                $("#profilePopup").find("#PROFILE_EDIT").hide();
            }

            $("#collabo_mod_bg_layer1").fadeIn();
            cmf_centerLocation($("#profilePopup"));
            $("body").css({
                overflow: 'hidden'
            }).bind('touchmove', function (e) {
                e.preventDefault()
            });
            $("#profilePopup").fadeIn();

            // @js.wise10 아래 함수는 무조건 fadeIn 이후에 적용됨.
            if(isFuncDeployList('SHOW_SLOGAN')) {
                calculateExpendMarginSize();
            }

        }
    });

}

function getDataUserPrfl(SRCH_USER_ID) {
    var jexAjax = jex.createAjaxUtil("COLABO2_USER_PRFL_R002");
    jexAjax.set("USER_ID", _USER_ID);
    jexAjax.set("RGSN_DTTM", _RGSN_DTTM);
    jexAjax.set("SRCH_USER_ID", SRCH_USER_ID);
    jexAjax.setAsync(false);
    jexAjax.errorTrx = false;

    var returnData;
    jexAjax.execute(function (dat) {
        if (!jex.isError(dat)) {
            clog(JSON.stringify(dat));
        }
        returnData = dat;
    });
    return returnData
}

function fn_profileClose() {
    //@유민호 :전체보기 프로필 누르고 끌때 다 꺼지는 문제 처리 190313
    if ($("body").find("#all-sendience-layer").css('display') !== 'block') {
        $("body").css("overflow", "auto").unbind('touchmove');
    }
    $("#collabo_mod_bg_layer1").hide();
    $("#profilePopup").hide();

    // @유민호 : flow_sendience.js 이중 ESC 처리 190313
    if (cnts_Null2Void($("#all-sendience-layer").css("display"), "none") == "block") {
        $('#all-sendience-layer-srch input').focus();
    }
}

/** flow_layout 다수
 * 보관함 번호를 넘기면 체크를 하도록 처리한다.
 * @param COLABO_FLD_SRNOS
 */

function cmf_fldLayoutListCheck(COLABO_FLD_SRNOS) {
    if (cnts_Null2Void(COLABO_FLD_SRNOS, "") != "") {
        for (var i = 0; i < COLABO_FLD_SRNOS.length; i++) {
            var dataCnt = cmf_fldLayoutDataCnt(COLABO_FLD_SRNOS[i]);
            dataCnt = parseInt(dataCnt + 1);
            cmf_fldLayoutCheckView(COLABO_FLD_SRNOS[i], dataCnt);
            $("#setFldLayout").find(".folderlist_scroll").find("ul").find("#FLD_ID_" + COLABO_FLD_SRNOS[i]).attr("data-cnt", dataCnt);
        }
    }
}

function cmf_fldLayoutDataCnt(COLABO_FLD_SRNO) {
    return parseInt(cnts_Null2Void($("#setFldLayout").find(".folderlist_scroll").find("ul").find("#FLD_ID_" + COLABO_FLD_SRNO).attr("data-cnt"), "0"));
}

/**
 * 보관함 check처리를 한다.
 * @param COLABO_FLD_SRNO
 * @param dataCnt
 */

function cmf_fldLayoutCheckView(COLABO_FLD_SRNO, dataCnt) {
    if (dataCnt > 1) { //여러개선택된 경우
        $("#setFldLayout").find(".folderlist_scroll").find("ul").find("#FLD_ID_" + COLABO_FLD_SRNO).removeClass("on");
        $("#setFldLayout").find(".folderlist_scroll").find("ul").find("#FLD_ID_" + COLABO_FLD_SRNO).removeClass("off");
        $("#setFldLayout").find(".folderlist_scroll").find("ul").find("#FLD_ID_" + COLABO_FLD_SRNO).addClass("checked");
    } else if (dataCnt == 1) { //한개일 때
        $("#setFldLayout").find(".folderlist_scroll").find("ul").find("#FLD_ID_" + COLABO_FLD_SRNO).removeClass("off");
        $("#setFldLayout").find(".folderlist_scroll").find("ul").find("#FLD_ID_" + COLABO_FLD_SRNO).removeClass("checked");
        $("#setFldLayout").find(".folderlist_scroll").find("ul").find("#FLD_ID_" + COLABO_FLD_SRNO).addClass("on");
    } else {
        $("#setFldLayout").find(".folderlist_scroll").find("ul").find("#FLD_ID_" + COLABO_FLD_SRNO).removeClass("on");
        $("#setFldLayout").find(".folderlist_scroll").find("ul").find("#FLD_ID_" + COLABO_FLD_SRNO).removeClass("checked");
        $("#setFldLayout").find(".folderlist_scroll").find("ul").find("#FLD_ID_" + COLABO_FLD_SRNO).addClass("off");
    }
}

//모바일앱 전송
function fn_mobileAppSend() {

    if ($.trim($("#mobileClphNo").val()) == "") {
        alert(cnts_Null2Void(i18n('DCC431'), "휴대폰 번호를 입력하시기 바랍니다."));
        $("#mobileClphNo").focus();
        return;
    }
    if ($.trim($("#mobileClphNo").val()).length < 10) {
        alert(cnts_Null2Void(i18n('DCC431'), "휴대폰 번호를 입력하시기 바랍니다."));
        $("#mobileClphNo").focus();
        return;
    }

    var jexAjax = jex.createAjaxUtil("COLABO2_SMS_C001");
    jexAjax.set("CLPH_NO", $.trim(cnts_Null2Void($("#mobileClphNo").val(), "")));
    jexAjax.set("CLPH_NTNL_CD", $.trim(cnts_Null2Void($("#CLPH_NTNL_CD").text(), "")));
    if ($(".signup_top").length > 0) {
        alert(c18n('DCC432', "로 다운로드주소가 발송되었습니다.", $.trim($("#mobileClphNo").val())));
    } else {
        alert(c18n('DCC432', "로 다운로드주소가 발송되었습니다.", $.trim($("#mobileClphNo").val())));
    }

    jexAjax.execute(function (dat) {
    });

}

//모바일앱 다운로드 layer
function fn_mobileLayerShow() {
    $("#mobileLayer").show();
}

function fn_mobileLayerHide() {
    $("#mobileLayer").hide();
}

//일대일 문의 저장.
function cmf_oneToOneQuestSave(USER_ID, cntn, alertMsg) {

    var jexAjax = jex.createAjaxUtil("COLABO2_COMMT_C101");
    jexAjax.set("USER_ID", USER_ID);
    jexAjax.set("RGSN_DTTM", _RGSN_DTTM);
    jexAjax.set("COLABO_GB", "1");
    jexAjax.set("CNTN", cntn);
    //jexAjax.set("COMMT_ATCH_REC"	, commtAtchRECS);
    jexAjax.errorTrx = false;
    jexAjax.execute(function (dat) {
        if (!jex.isError(dat)) { // authorization check
            if (!alertMsg) {
                cmf_layerMsg("1", cnts_Null2Void(i18n('DCC433'), "문의되었습니다."));
            } else {
                cmf_layerMsg("1", alertMsg);
            }
        }
    });
    fn_oneToOneQuestCancel();
}

/*
 * 알림건수를 한번 호출함으로써 세션을 다시 만든다.
 */
function cmf_createSession(callback) {
    var jexAjax = jex.createAjaxUtil("COLABO2_ALAM_R101");
    jexAjax.set("USER_ID", _USER_ID);
    jexAjax.set("RGSN_DTTM", _RGSN_DTTM);
    jexAjax.setAsync(false);

    jexAjax.execute(function (dat) {
        if (!jex.isError(dat)) {
            if (typeof callback === 'function')
                callback();
        }
    });
}

function cmf_copyTextToClipboard(txt, msg) {
    msg = cnts_Null2Void(msg, cnts_Null2Void(i18n('DCC437'), "클립보드에 복사되었습니다."));
    var aux = $("<input type='text' id='aux' value='' />");
    aux.val(txt);
    $("body").append(aux);
    $("#aux").select();

    var succeed;
    try {
        succeed = document.execCommand("copy");
    } catch (e) {
        succeed = false;
    } finally {
        if (succeed) {
            cmf_layerMsg("3", msg);
        }
        $("body").find("#aux").remove();
        delete succeed;
    }
}

$.fn.singleAndDouble = function (singleClickFunc, doubleClickFunc) {

    var timeOut = 200;
    var timeoutID = 0;
    var ignoreSingleClicks = false;

    this.on('click', function (event) {
        if (!ignoreSingleClicks) {
            // The double click generates two single click events
            // and then a double click event so we always clear
            // the last timeoutID
            clearTimeout(timeoutID);

            timeoutID = setTimeout(function () {
                singleClickFunc(event);
            }, timeOut);
        }
    });

    this.on('dblclick', function (event) {
        clearTimeout(timeoutID);
        ignoreSingleClicks = true;

        setTimeout(function () {
            ignoreSingleClicks = false;
        }, timeOut);

        doubleClickFunc(event);
    });

};

/**
 * 파일처리 statusbar 구현
 * @param obj
 */

function createStatusbar(obj) {
    this.statusbar = $("<div class='statusbar'></div>");
    this.filename = $("<div class='filename'></div>").appendTo(this.statusbar);
    this.size = $("<div class='filesize'></div>").appendTo(this.statusbar);
    this.progressBar = $("<div class='progressBar'><div></div></div>").appendTo(this.statusbar);
    this.abort = $("<div class='abort'>" + cnts_Null2Void(i18n('DCC439'), "중지") + "</div>").appendTo(this.statusbar);              //obj.after(this.statusbar);

    this.setFileNameSize = function (name, size) {
        var sizeStr = "";
        var sizeKB = size / 1024;
        if (parseInt(sizeKB) > 1024) {
            var sizeMB = sizeKB / 1024;
            sizeStr = sizeMB.toFixed(2) + " MB";
        } else {
            sizeStr = sizeKB.toFixed(2) + " KB";
        }
    };
    this.setProgress = function (progress) {
        var progressBarWidth = progress * this.progressBar.width() / 100;

    };
    this.setAbort = function (jqxhr) {
        clog("setAbort");
    };
}

/**
 * 파일 목록을 서버에 업로드 처리
 * @param ary_formData
 * @param status
 */
function sendFileListToServer(ary_formData, RESULT_CALLBACK, obj, type) {
    var clipboardYN = obj.CLIPBOARD_IMG; // 클립보드 이미지 판단
    var uploadURL = "/FLOW_UPLOAD_C001.jct";
    var send_len = ary_formData.length;
    var response_len = 1;
    var xhr = [];
    var result = "";
    var percent = 0;
    var fileName = "";

    for (var i = 0; i < send_len; i++) {
        var interval;

        clog(ary_formData[i]);

        if (clipboardYN == "Y") {
            fileName = getFileNameWhenClipboard();
            ary_formData[i].append("FILE_NAME", fileName);
        } else {
            ary_formData[i].append("FILE_NAME", "");
        }
        xhr[i] = new XMLHttpRequest();
        xhr[i].upload.addEventListener('progress', function (e) {
            var position = event.loaded || event.position;
            var total = event.total;
            if (e.lengthComputable) {
                if (event.lengthComputable) {
                    //percent = Math.ceil(position / total * 100 * ((response_len==0?1:response_len)/send_len));
                    percent = Math.ceil(position / total * 100);
                }
                if (cnts_Null2Void(obj, "") != "") {
                    if (obj.find(".post_dnd_ly").length > 0) {
                        obj.find(".post_dnd_ly").find(".status_bar").css("width", percent + "%");
                        obj.find(".post_dnd_ly").find(".pctfilenm").find("strong").text(percent + "%");
                    } else {
                        if (obj.find("#PROGRESS").length > 0) {
                            obj.find("#PROGRESS").find("#WIDTH_PER").css("width", percent + "%");
                        }
                    }
                } else {
                    //done.
                }                 //status.setProgress(percent);
            }
        }, false);
        xhr[i].addEventListener('abort', function () {
            clog("abort");
        }, false);
        xhr[i].addEventListener('error', function (e) {
            clog("error");
        }, false);
        xhr[i].addEventListener('load', function () {
            clog("load");
        }, false);
        xhr[i].open("POST", uploadURL, true); //동기화
        xhr[i].onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                if (send_len > response_len) {
                    result = this.responseText;
                    response_len++;
                    //status.setProgress((response_len/send_len)*100);
                }
                if (send_len == response_len) {
                    result = this.responseText;
                }
                if (cnts_Null2Void(obj, "") != "") {
                    obj.find(".post_dnd_ly").css("display", "none");
                } else {
                    //done.
                }
                RESULT_CALLBACK(result, obj, type);
            }
        };
        xhr[i].send(ary_formData[i]);


    }
}


/**
 * 해당 사이트의 메타정보 가져오기
 * @param strUrl
 * @param status
 */
function getScrapHtml(strUrl, status) {
    var SCRAP_URL = "/url_scrap.act?URL=";

    if ((strUrl.indexOf("http://") > -1 || strUrl.indexOf("https://") > -1)) {
        //done.
    } else {
        strUrl = "http://" + strUrl;
    }
    var dataForm = "URL=" + strUrl;
    var scrapURL = SCRAP_URL + strUrl; //Upload URL

    var jqXHR = $.ajax({
        xhr: function () {
            var xhrobj = $.ajaxSettings.xhr();
            if (xhrobj.upload) {
                xhrobj.upload.addEventListener('progress', function (event) {
                    var percent = 0;
                    var position = event.loaded || event.position;
                    var total = event.total;
                    if (event.lengthComputable) {
                        percent = Math.ceil(position / total * 100);
                    }             //Set progress

                    status.setProgress(percent);
                }, false);
            }
            return xhrobj;
        },
        url: scrapURL,
        dataType: "text",
        //type: "POST",
        contentType: false,
        processData: false,
        cache: false,
        data: dataForm,
        success: function (data) {
            status.setProgress(100);
            var dat = JSON.parse(data);

            if (typeof dat.image == "undefiend" || dat.image == null) {
                $("#face").attr("src", "").css("background", "#ffffff");
            } else {
                $("#face").attr("src", dat.image);
            }
            $("#face_detail").html("" + dat.description + "\n" + dat.url);

            if (typeof strUrl != "undefiend" && strUrl != null && strUrl.indexOf("https://youtu.be/") > -1) {
                $("#urling").append(getYoutubeHtml(strUrl));
            }
        },
        error: function (request, status, error) {
            clog("code: " + request.status + "\n" + "message: " + request.responseText + "\n" + "error: " + error);
        }
    });
    status.setAbort(jqXHR);
}

/**
 * 플로우 접속을 위한 토큰 얻어오기
 */
function cmf_getFlowToken() {
    var result = "";
    var jexAjax = jex.createAjaxUtil("FLOW_TOKEN_R001");
    jexAjax.set("USER_ID", _USER_ID);
    jexAjax.set("RGSN_DTTM", _RGSN_DTTM);
    jexAjax.setAsync(false);
    jexAjax.errorTrx = false;
    jexAjax.execute(function (dat) {
        result = cnts_Null2Void(dat.TOKEN, "");
    });
    return result;
}

/**
 * IE에서 이미지 찌그러지는것 방지를 위해 아래와 같은 방식으로 src를 넣어준다.
 * @param {object} imgElement img jQuery object
 * @param {string} src
 */
function setImageSrc(imgElement, src) {
    var imageSrc = typeof src === 'object' ? $(src).val() : src;
    imageSrc = cnts_Null2Void(imageSrc, '/design3/img_rn/thumb26.gif');

    if (imageSrc.indexOf("/flowImg/") > -1 && isFuncDeployList('IMAGE_PROCESSING')) {
        imageSrc = imageSrc.split('?')[0];
        var queries = [];
        var dpr = window.devicePixelRatio > 1 ? 1.5 : 1;
        var width = imgElement.width() || 40;
        var height = imgElement.height() || 40;
        queries.push('width=' + Math.round(width * dpr));
        queries.push('height=' + Math.round(height * dpr));
        imageSrc += '?' + queries.join('&');
    }

    // @안광선 : 200529 사진 짤리는것 방지하기위해 background 처리
    imgElement.attr("onerror", "");
    try {
        imgElement.css("background-image", "url(\"" + imageSrc + "\")");
        imgElement.css({
            "background-size": "cover",
            "background-repeat": "no-repeat"
        });
    } catch (e) {
        clog(e);
    }

    var Browser = cmf_browser();
    if (Browser.ieYn) {
        imgElement.attr("onerror", "").attr("src", "");
        try {
            imgElement.css("background-image", "url(\"" + imageSrc + "\")");
            imgElement.css({
                "background-position": "center",
                "background-size": "cover",
                "background-repeat": "no-repeat"
            });
        } catch (e) {
        }

    } else {
        imgElement.attr("src", imageSrc).on("error", function (e) {
            imgElement.attr("src", "/design3/img_rn/thumb26.gif");
        });
    }
}

/**
 *
 * @param {object} imgElement img jQuery object
 */
function getImageSrc(imgElement) {
    var Browser = cmf_browser();
    var result = "";
    var backgroundUrlRegexp = /(url\()(\S+)(\))/ig;
    result = cnts_Null2Void(imgElement.css("background-image"), "").replace(backgroundUrlRegexp, '$2');
    if (Browser.ieYn) {
        var backgroundUrlRegexp = /(url\()(\S+)(\))/ig;
        result = cnts_Null2Void(imgElement.css("background-image"), "").replace(backgroundUrlRegexp, '$2');
    } else {
        result = imgElement.attr("src");
    }
    return result;
}

/**
 * 로그인 페이지로 이동
 */
function goToLoginPage(uri) {
    var loginUri = '/login.act';
    if (cf_getCookie("electronYn") === "Y") {
        try {
            loginUri += "?electronYn=Y&version=" + fn_ElectronVersionCheck();
        } catch (e) {
            loginUri += "?electronYn=Y&version=" + cnts_Null2Void(cf_getCookie("electronVer"), "1_1_0");
        }
    }
    //clog("로그인 페이지로 ")
    if (cnts_Null2Void(uri, "") != "") {
        //location.href = uri;
        location.replace(uri);
    } else {
        location.replace(loginUri);
    }
}

/**
 *
 * @param {string} fileSize 첨부파일 크기 (FILE_SIZE)
 * @param {string} fileIdntId (FILE_IDNT_ID)
 */
function getAttachedFileSize(fileSize, fileIdntId) {
    var result = "";
    if (fileIdntId === "GOOGLEDRIVE") {
        result = cnts_Null2Void(i18n('DCC415'), "구글 드라이브에서 가져옴");
    } else if (fileIdntId === "DROPBOX") {
        result = cnts_Null2Void(i18n('CD738'), "드롭박스에서 가져옴");
    } else {
        result = fileSizeFormmat(cnts_Null2Void(fileSize, "0"));
    }
    return result;
}

/**
 * flow-desktop version정보 cookie에 넣기
 * 2019-03-29 소문혁 버전체크 수정
 */
function setDesktopCookieValue() {

    var latestDesktopVersionUsingUrlVersion = "1_0_6"; // url로 버전을 넘기는 데스크탑 버전 중 최신
    var electronVersion;

    // 1.0.7 버전
    try {
        electronVersion = getFlowDesktopVersion();
    } catch (e) {
        // done
    }

    // 1.0.7 버전 이후
    try {
        electronVersion = fn_ElectronVersionCheck();
    } catch (e) {
        // done
    }
    // 버전정보는 항상 들어가야 체크가 가능하므로 밖으로
    cf_setCookie("electronVer", cnts_Null2Void(electronVersion, latestDesktopVersionUsingUrlVersion), 30 * 12); // getFlowDesktopVersion 함수는 flow-desktop의 preload.js 에 선언되어 있음 (1.0.7 버전부터)

    try {
        fn_browserCustomNotificationForElectron("check"); // 구버전 신버전 모두 포함한 함수를통해서 체크
        cf_setCookie("electronYn", "Y", 30 * 12); // getFlowDesktopVersion 함수가 존재할 때만 electronYn을 Y로 셋팅함(getFlowDesktopVersion 함수 없으면 catch로 넘어간다)
    } catch (e) {
        cf_setCookie("electronYn", "N", 30 * 12);
        cf_setCookie("electronVer", "", 0);
    }
}

function autoUpdateForElectronByServer() {
    if (cf_getCookie("1.2.3") !== "Y" && getElectronYn() && b_flowCloud) {
        cf_setCookie("1.2.3", "Y", 30 * 12);
        autoUpdateOnForElectron()
    } else {
        // pass
    }
}


function getElectronYn() {

    try {
        fn_browserCustomNotificationForElectron("check"); // 구버전 신버전 모두 포함한 함수를통해서 체크
        return true // getFlowDesktopVersion 함수가 존재할 때만 electronYn을 Y로 셋팅함(getFlowDesktopVersion 함수 없으면 catch로 넘어간다)
    } catch (e) {
        return false
    }
}


function cmf_btnClear(e) {
    if(e != undefined){
        $(e.target).parent().find(".btn-clear-text").on('click', function (e) {
            $(e.target).parent().find("input").val("");
            $(e.target).parent().find("input").focus();
            $(e.target).parent().removeClass('error').removeClass('ok');
        });
    }
}

/*
 * electron version 정보 가져오기
 */
function getElectronVer() {
    try {
        return fn_ElectronVersionCheck();
    } catch (e) {
        return "";
    }
}

/*
 * electron main url 가져오기
 */
function getElectronUrl() {
    if (g_var.g_electronYn) {
        try {
            return fn_getElectronUrl();
        } catch (e) {
            return "";
        }
    } else {
        return "";
    }
}

/*
 * electron main url 세팅
 */
function setElectronUrl(url) {
    if (g_var.g_electronYn) {
        fn_setElectronUrl(url);
    } else {

    }
}

function screenLockEventCheck(target) {
    // if((_STR_BASE_URL == "http://seco.flowteam.info") || (g_var.g_electronYn && cnts_Null2Void(cf_getCookie("SECO_COMPANY_CODE"), "") != "")){
    if (_USE_INTT_ID.indexOf("SECO") > -1 && g_var.g_electronYn || _USE_INTT_ID.indexOf("ZOOMOK") > -1 && g_var.g_electronYn) {
        target.off('mouseenter mouseleave mousedown keypress').on('mouseenter mouseleave mousedown keypress', function () {
            try {
                fn_lockScreenInitForElectron();
            } catch (e) {
                //done
            }
        });
    }
}

//데스크탑 앱 직접다운로드
// @복다빈 : pc 다운로드의 roomSrno를 -9999로 하여 cmf_docViewer에서 pc버전 install파일임을 판단.(파일다운 제한이어도 설치파일받을수 있게)
function fn_direcktPcDownload(isRenewal) {

    var pck_nm = "team.flow.flowMini"
    var pck_gb = userOsCheck()
    var isNext = true

    if (b_joins) { // 조인스
        pck_nm = "team.flow.joinsMini"
    } else if (b_gware) { // 지톡
        pck_nm = "team.flow.GTalkMini"
    } else if (b_enter) { // 플로우 엔터
        pck_nm = "team.flow.flowEntMini"
    }else if (condJson.get["isKtWorks"]) {
        // NOTE : 제섭님 해당부분 추가해줘요
        pck_nm = "kt.ktflow.ktflowMini"
    } else if (isRenewal){
        pck_nm = isFunc("MINI_SECURE_DOWNLOAD")? "secure.team.flow.flowMiniRenewal" : "team.flow.flowMiniRenewal"
    }
     else { // b_flowCloud
        // NOTE : 제섭님 해당부분 추가해줘요
        // pck_nm = kt.ktflow.ktflowMini
        pck_nm = "team.flow.flowMini"
    }


    var jexAjax = jex.createAjaxUtil("FLOW_UPDATE_R001");
    jexAjax.set("USER_ID", _USER_ID);
    jexAjax.set("RGSN_DTTM", _RGSN_DTTM);
    jexAjax.set("PCK_NM", pck_nm);
    jexAjax.set("GB", pck_gb);
    jexAjax.setAsync(false);
    jexAjax.errorTrx = false;

    jexAjax.execute(function (dat) {
        if (!jex.isError(dat)) {
            if (cnts_Null2Void(dat.flow_rec[0], "") != "") {
                if (location.href.indexOf("cowork.bgfretail.com") > -1) {
                    // bgf는 파일이 web server에 있어서 url이 다름
                    window.open(dat.flow_rec[0].LINK_URL, '_blank');
                } else {
                    if (getElectronYn()) {
                        fn_fileDownloadForElectron(dat.flow_rec[0].LINK_URL, '');
                    } else {
                        window.open(dat.flow_rec[0].LINK_URL, '_blank');
                    }
                }

                isNext = false;
            }
        }
    });

    if (!isNext) {
        return;
    }

    var downloadUrl = "";
    var ua = navigator.userAgent;

    if (location.href.indexOf("flow-wgpp.bizplay.co.kr") > -1) {
        if (_USE_INTT_ID.indexOf("UTLZ_226") > -1) {
            if (ua.indexOf("Macintosh") != -1) { // 맥
                cmf_docViewer('FLOW_201906151224211_4f122b16-d1c5-4986-ac6c-fe0b7699caea', 'https://flow-wgpp.bizplay.co.kr/FLOW_DOWNLOAD_R001.act?RAND_KEY=FLOW_201906151224211_4f122b16-d1c5-4986-ac6c-fe0b7699caea&ATCH_SRNO=2845076&OBJ_CNTS_NM=', 'Y', 'flowMini-Webcash-1.1.1.dmg', 56577341, "-9999");
            } else if (ua.indexOf("Linux") != -1) {
                alert(cnts_Null2Void(i18n('DCC440'), 'linux 운영체제는 지원하지 않습니다.'));
                return;
            } else { // 윈도우
                cmf_docViewer('FLOW_201906151186259_66e431b1-0d48-4ede-b14e-70028c7add76', 'https://flow-wgpp.bizplay.co.kr/FLOW_DOWNLOAD_R001.act?RAND_KEY=FLOW_201906151186259_66e431b1-0d48-4ede-b14e-70028c7add76&ATCH_SRNO=2845075&OBJ_CNTS_NM=', 'Y', 'flowMini-Webcash-Setup 1.1.1.exe', 78724144, "-9999");
            }
        } else {
            //done.
        }
    } else {

        if (_USE_INTT_ID.indexOf("SECO") > -1) {
            if (ua.indexOf("Macintosh") != -1) { // 맥
                cmf_docViewer('FLOW_201904162786012_e0b0568c-2fdd-45dd-8a11-7569021d6fb0_1023465', 'https://seco.flow.team/FLOW_DOWNLOAD_R001.act?RAND_KEY=FLOW_201911191466854_44594569-634a-4f4a-8391-2c23947da1dc&ATCH_SRNO=1199813&OBJ_CNTS_NM=', 'Y', 'flowMini-Seco-1.1.1.dmg', 56577341, "-9999");
            } else if (ua.indexOf("Linux") != -1) {
                alert(cnts_Null2Void(i18n('DCC440'), 'linux 운영체제는 지원하지 않습니다.'));
                return;
            } else { // 윈도우
                cmf_docViewer('FLOW_201904162798916_ceddb7d6-86d7-49a8-95e1-70067f550b63_1023466', 'https://seco.flow.team/FLOW_DOWNLOAD_R001.act?RAND_KEY=FLOW_201911191450947_885eac6f-b9cb-4882-9d90-f3fbc5bb5c27&ATCH_SRNO=1199811&OBJ_CNTS_NM=', 'Y', 'flowMini-Seco-Setup 1.1.1.exe', 78724144, "-9999");
            }
        } else if (_USE_INTT_ID.indexOf("ZOOMOK") > -1) {
            if (ua.indexOf("Macintosh") != -1) { // 맥
                cmf_docViewer('FLOW_201904163132355_54eeed86-1b0c-49fb-85a7-a6b35db9cf04_1004020', 'https://zoomok.flow.team/FLOW_DOWNLOAD_R001.act?RAND_KEY=FLOW_201911191450947_885eac6f-b9cb-4882-9d90-f3fbc5bb5c27&ATCH_SRNO=1199811&OBJ_CNTS_NM=', 'Y', 'flowMini-Zoomok-1.1.1.dmg', 56577379, "-9999");
            } else if (ua.indexOf("Linux") != -1) {
                alert(cnts_Null2Void(i18n('DCC440'), 'linux 운영체제는 지원하지 않습니다.'));
                return;
            } else { // 윈도우
                cmf_docViewer('FLOW_201904163180858_58028233-bd41-4aef-92b5-ca172b6a1d43_1004021', 'https://zoomok.flow.team/FLOW_DOWNLOAD_R001.act?RAND_KEY=FLOW_201906053587857_12cba7c7-9631-43ab-9145-89f2e5a470e9&ATCH_SRNO=1008118&OBJ_CNTS_NM=', 'Y', 'flowMini-Zoomok-Setup 1.1.1.exe', 78724240, "-9999");
            }

        } else if (_USE_INTT_ID == "BFLOW_190104150850") {
            if (ua.indexOf("Macintosh") != -1) { // 맥
                cmf_docViewer('FLOW_201904163132355_54eeed86-1b0c-49fb-85a7-a6b35db9cf04_1004020', 'https://flowdev.info/FLOW_DOWNLOAD_R001.act?RAND_KEY=FLOW_201905143724325_a919e6ca-77c6-41c9-b6fd-41da122c657a&ATCH_SRNO=1003741&OBJ_CNTS_NM=', 'Y', 'flowMini-Zoomok-1.1.1.dmg', 56577379, "-9999");
            } else if (ua.indexOf("Linux") != -1) {
                alert(cnts_Null2Void(i18n('DCC440'), 'linux 운영체제는 지원하지 않습니다.'));
                return;
            } else { // 윈도우
                cmf_docViewer('FLOW_201904163180858_58028233-bd41-4aef-92b5-ca172b6a1d43_1004021', 'https://flowdev.info/FLOW_DOWNLOAD_R001.act?RAND_KEY=FLOW_201905143724325_a919e6ca-77c6-41c9-b6fd-41da122c657a&ATCH_SRNO=1003741&OBJ_CNTS_NM=', 'Y', 'flowMini-Zoomok-Setup 1.1.1.exe', 78724240, "-9999");
            }

        } else if (_USE_INTT_ID.indexOf("HOTTRACKS") > -1) {
            if (ua.indexOf("Macintosh") != -1) { // 맥
                cmf_docViewer('FLOW_201904161651238_faa08647-3210-4600-ad40-255888377dcd_1000038', 'https://hottracks.flow.team/FLOW_DOWNLOAD_R001.act?RAND_KEY=FLOW_201904305058459_3540cc69-3b7d-4aa7-a0cd-e533fb66f89c&ATCH_SRNO=1000048&OBJ_CNTS_NM=', 'Y', 'flowMini-hottracks-1.1.1.dmg"', 56577295, "-9999");
            } else if (ua.indexOf("Linux") != -1) {
                alert('linux 운영체제는 지원하지 않습니다.');
                return;
            } else { // 윈도우
                cmf_docViewer('FLOW_201904162242426_7b34eba3-d432-427a-8367-f6b9958fde9e_1000039', 'https://hottracks.flow.team/FLOW_DOWNLOAD_R001.act?RAND_KEY=FLOW_20190430518943_50d0d6d2-a7c0-4bbe-a717-0fd355974c90&ATCH_SRNO=1000049&OBJ_CNTS_NM=', 'Y', 'flowMini-hottracks-Setup 1.1.1.exe', 78724264, "-9999");
            }

        } else if (_USE_INTT_ID.indexOf("SEOULSEMICON") > -1) {
            if (ua.indexOf("Macintosh") != -1) { // 맥
                cmf_docViewer('FLOW_201904163640424_1d965ecc-0513-4910-8e2c-7b10dbd46e89_1000038', 'https://seoulsemicon.flow.team/FLOW_DOWNLOAD_R001.act?RAND_KEY=FLOW_201904305414012_7e2cb426-6a6e-4785-9798-08ab8978691f&ATCH_SRNO=1000020&OBJ_CNTS_NM=', 'Y', 'flowMini-Seoul-1.1.1.dmg"', 56577336, "-9999");
            } else if (ua.indexOf("Linux") != -1) {
                alert('linux 운영체제는 지원하지 않습니다.');
                return;
            } else { // 윈도우
                cmf_docViewer('FLOW_201904163687429_2c600d1e-5449-4466-a3a7-a9cb6667290b_1000013', 'https://seoulsemicon.flow.team/FLOW_DOWNLOAD_R001.act?RAND_KEY=FLOW_201904305492415_0d1d07b3-9f9b-4aff-bd53-cc74f6849009&ATCH_SRNO=1000021&OBJ_CNTS_NM=', 'Y', 'flowMini-Seoul-Setup 1.1.1.exe', 78722216, "-9999");
            }
        } else if (_USE_INTT_ID.indexOf("MOBIS") > -1) {
            if (ua.indexOf("Macintosh") != -1) { // 맥
                cmf_docViewer('FLOW_201904163640424_1d965ecc-0513-4910-8e2c-7b10dbd46e89_1000038', 'https://seoulsemicon.flow.team/FLOW_DOWNLOAD_R001.act?RAND_KEY=FLOW_201904305414012_7e2cb426-6a6e-4785-9798-08ab8978691f&ATCH_SRNO=1000020&OBJ_CNTS_NM=', 'Y', 'flowMini-Seoul-1.1.1.dmg"', 56577336, "-9999");
            } else if (ua.indexOf("Linux") != -1) {
                alert('linux 운영체제는 지원하지 않습니다.');
                return;
            } else { // 윈도우
                cmf_docViewer('FLOW_201904163687429_2c600d1e-5449-4466-a3a7-a9cb6667290b_1000013', 'https://flow.mobis.co.kr/FLOW_DOWNLOAD_R001.act?RAND_KEY=FLOW_201911054041057_de56cab2-e6a5-4125-a078-78d1eb776139&ATCH_SRNO=1000997&OBJ_CNTS_NM=', 'Y', 'flowMini-Seoul-Setup 1.1.1.exe', 78722216, "-9999");
            }
        } else if (_USE_INTT_ID.indexOf("BGF") > -1) {
            if (ua.indexOf("Macintosh") != -1) { // 맥
                cmf_docViewer('FLOW_202005204620420_547415be-be66-44ec-bbc3-34029c202956', 'http://cowork.bgfretail.com/cdn/flowMini-1.1.5.dmg', 'Y', 'flowMini-1.1.5.dmg"', 69926767, "-9999");
            } else if (ua.indexOf("Linux") != -1) {
                alert('linux 운영체제는 지원하지 않습니다.');
                return;
            } else { // 윈도우
                cmf_docViewer('FLOW_202005204640547_79fb2c41-6230-4870-bcd5-beaede5abc4f', 'http://cowork.bgfretail.com/cdn/flowMini%20Setup%201.1.5.exe', 'Y', 'flowMini Setup 1.1.5.exe', 96300224, "-9999");
            }
        } else { // 플로우.

            /*if (ua.indexOf("Macintosh") != -1) { // 맥
                cmf_docViewer('FLOW_201904254504931_e1dea58d-720e-4d67-84d1-b8e477bc91f6_1005449', 'http://g-talk.enage.com/FLOW_DOWNLOAD_R001.act?RAND_KEY=FLOW_201904254504931_e1dea58d-720e-4d67-84d1-b8e477bc91f6&ATCH_SRNO=1005449&OBJ_CNTS_NM=', 'Y', 'G-Talk-1.0.5.dmg', 53372211);
            } else if (ua.indexOf("Linux") != -1) {
                alert(cnts_Null2Void(i18n('DCC440'),'linux 운영체제는 지원하지 않습니다.'));
                return;
            } else { // 윈도우
                cmf_docViewer('FLOW_201904254543633_65d4f4f8-6ccf-461c-9865-3c89f216bf7d_1005450', 'http://g-talk.enage.com/FLOW_DOWNLOAD_R001.act?RAND_KEY=FLOW_201904254543633_65d4f4f8-6ccf-461c-9865-3c89f216bf7d&ATCH_SRNO=1005450&OBJ_CNTS_NM=', 'Y', 'G-Talk Setup 1.0.5.exe', 73084368);
            }*/

            if (ua.indexOf("Macintosh") != -1) { // 맥
                cmf_docViewer('FLOW_20190416769516_c3a4409f-df4a-43f0-a9da-9f8ed8e63e4a_2605555', 'https://flow.team/FLOW_DOWNLOAD_R001.act?RAND_KEY=FLOW_202002202485441_ff4140f3-1b7b-4b12-9f73-2b809fd66dbb&ATCH_SRNO=1000540&OBJ_CNTS_NM=', 'Y', 'flow-1.0.8.dmg', 56583393, "-9999");
            } else if (ua.indexOf("Linux") != -1) {
                alert(cnts_Null2Void(i18n('DCC440'), 'linux 운영체제는 지원하지 않습니다.'));
                return;
            } else { // 윈도우
                cmf_docViewer('FLOW_20190416709720_a53389d3-269e-43bb-8c9b-f2a175139a33_2605557', 'https://flow.team/FLOW_DOWNLOAD_R001.act?RAND_KEY=FLOW_202002202432057_cf482aa3-4949-490b-aa23-793577e3ce0a&ATCH_SRNO=1000541&OBJ_CNTS_NM=', 'Y', 'flow Setup 1.0.8.exe', 78729192, "-9999");
            }
        }
    }
}

/*
 * 기기아이디
 */
function setGuid(jexAjax, client_Ip) {
    var flowDuid = cnts_Null2Void(cf_getCookie("FLOW_DUID"), "");
    if (flowDuid == "") {
        //현대모비스일 때는 ip로 넣어주는 로직.
        try {
            if (cnts_Null2Void(client_Ip, "") != "") {
                if ((b_mobis) && (client_Ip.split(".")[0] == "10" || client_Ip.split(".")[0] == "192")) {
                    flowDuid = client_Ip;
                } else {
                    flowDuid = Math.round(Math.random() * 1000000) + "-" + Math.round(Math.random() * 1000) + "-" + Math.round(Math.random() * 1000) + "-" + Math.round(Math.random() * 1000000)
                }
            } else {
                flowDuid = Math.round(Math.random() * 1000000) + "-" + Math.round(Math.random() * 1000) + "-" + Math.round(Math.random() * 1000) + "-" + Math.round(Math.random() * 1000000)
            }
        } catch (e) {
            flowDuid = Math.round(Math.random() * 1000000) + "-" + Math.round(Math.random() * 1000) + "-" + Math.round(Math.random() * 1000) + "-" + Math.round(Math.random() * 1000000);
        }
    } else {
        // done.
    }
    jexAjax.set("DUID", flowDuid);
    cf_setCookie("FLOW_DUID", flowDuid, 30 * 12 * 10);

    if (cf_getCookie("electronYn") == "Y") {
        jexAjax.set("DUID_NM", "DESKTOP_" + flowDuid);
        cf_setCookie("FLOW_DUID_NM", "DESKTOP_" + flowDuid, 30 * 12 * 10);
    } else {
        var mobileFlag = /Mobile|iP(hone|od)|Windows (CE|Phone)|Minimo|Opera M(obi|ini)|BlackBerry|Nokia/;
        //모바일일경우
        if (navigator.userAgent.match(mobileFlag) && !navigator.userAgent.match(/iPad/)) {
            jexAjax.set("DUID_NM", "MWEB_" + flowDuid);
            cf_setCookie("FLOW_DUID_NM", "MWEB_" + flowDuid, 30 * 12 * 10);
        }
        //모바일 Device와 Android가 포함이 안되어 있을 경우
        else if (navigator.userAgent.match(/iPad|Android/)) {
            jexAjax.set("DUID_NM", "TABLET_" + flowDuid);
            cf_setCookie("FLOW_DUID_NM", "TABLET_" + flowDuid, 30 * 12 * 10);
        } else {

            var agent = navigator.userAgent.toLowerCase();
            if ((agent.indexOf("chrome") != -1)) {
                flowDuid = "CHROME_" + flowDuid;
            } else if (agent.indexOf("opera") != -1) {
                flowDuid = "OPERA_" + flowDuid;
            } else if (agent.indexOf("firefox") != -1) {
                flowDuid = "FIREFOX_" + flowDuid;
            } else if ((agent.indexOf("safari") != -1)) {
                flowDuid = "SAFARI_" + flowDuid;
            } else {
                flowDuid = "IE_" + flowDuid;
            }

            jexAjax.set("DUID_NM", "PC_" + flowDuid);
            cf_setCookie("FLOW_DUID_NM", "PC_" + flowDuid, 30 * 12 * 10);
        }
    }


}

function testForelectron() {
    clog("@@@@ testForElectron");
}

//@190524 안광선 : DatePick 템플릿
function makeDatePick(ObjectLayer, startDT, endDT) {

    var todayDate = new Date();
    var firstDate = new Date(todayDate.getFullYear(), todayDate.getMonth() - 6, todayDate.getDate());

    ObjectLayer.find(startDT).datepicker();
    ObjectLayer.find(startDT).datepicker("option", "dateFormat", "yy-mm-dd");
    ObjectLayer.find(startDT).on("change", function () {
        var tmpStartDate = Date.parseExact(getConvDate($(this)), "yyyyMMdd");
        $(this).datepicker("setDate", tmpStartDate.toString("yyyy-MM-dd"));
        $(this).val(tmpStartDate.toString("yyyy-MM-dd (ddd)"));
        $(this).attr("STTG_DT", tmpStartDate.toString("yyyyMMdd"));
        var selectDate = ObjectLayer.find(startDT).attr("STTG_DT");
        var startDate = Date.parseExact(selectDate, "yyyyMMdd");
        ObjectLayer.find(startDT).val(startDate.toString("yyyy-MM-dd (ddd)"));
        ObjectLayer.find(startDT).attr("STTG_DT", startDate.toString("yyyyMMdd"));


        var startSelectDate = ObjectLayer.find(startDT).attr("STTG_DT");
        var endSelectDate = ObjectLayer.find(endDT).attr("FNSH_DT");

        if (Number(startSelectDate) > Number(endSelectDate)) {
            cmf_layerMsg("2", c18n("DCD308", "종료일이 시작일 이전 날짜로 되어 있습니다."));
            ObjectLayer.find(startDT).val("");
            ObjectLayer.find(startDT).attr("");
        }

        $(this).blur();
    });
    // 종료날짜
    ObjectLayer.find(endDT).datepicker();
    ObjectLayer.find(endDT).datepicker("option", "dateFormat", "yy-mm-dd");
    ObjectLayer.find(endDT).on("change", function () {
        var tmpEndDate = Date.parseExact(getConvDate($(this)), "yyyyMMdd");
        $(this).datepicker("setDate", tmpEndDate.toString("yyyy-MM-dd"));
        $(this).val(tmpEndDate.toString("yyyy-MM-dd (ddd)"));
        $(this).attr("FNSH_DT", tmpEndDate.toString("yyyyMMdd"));
        var startSelectDate = ObjectLayer.find(startDT).attr("STTG_DT");
        var endSelectDate = ObjectLayer.find(endDT).attr("FNSH_DT");
        if (Number(startSelectDate) > Number(endSelectDate)) {
            cmf_layerMsg("2", c18n("DCD308", "종료일이 시작일 이전 날짜로 되어 있습니다."));
            ObjectLayer.find(endDT).val("");
            ObjectLayer.find(endDT).attr("");
        }
        $(this).blur();
    });

    ObjectLayer.find(startDT).val(firstDate.toString("yyyy-MM-dd (ddd)"));
    ObjectLayer.find(endDT).val(todayDate.toString("yyyy-MM-dd (ddd)"));
    ObjectLayer.find(startDT).attr("STTG_DT", firstDate.toString("yyyyMMdd"));
    ObjectLayer.find(endDT).attr("FNSH_DT", todayDate.toString("yyyyMMdd"));
}

function getConvDate(obj) {
    if (obj.val().indexOf("(") > -1) {
        return $.trim(obj.val().substr(0, obj.val().indexOf("("))).replace(/-/g, "");
    } else {
        return $.trim(obj.val()).replace(/-/g, "");
    }
}

//@190524 안광선 : input 해당 월 달 만들기
function makeMonthList(ObjectLayer, input) {
    var date = new Date();
    for (var i = 1; i < 13; i++) {
        if (i == date.getMonth() + 1) ObjectLayer.find(input).append("<option value=" + i + " selected='selected' data=" + date.getFullYear() + (i < 10 ? String("0" + (i)) : String(i)) + ">" + date.getFullYear() + "-" + (i < 10 ? String("0" + (i)) : String(i)) + "</option>");
        else ObjectLayer.find(input).append("<option value=" + i + " data=" + date.getFullYear() + (i < 10 ? String("0" + (i)) : String(i)) + ">" + date.getFullYear() + "-" + (i < 10 ? String("0" + (i)) : String(i)) + "</option>");
    }
}

//@유민호 : 어디서든 로더를 꺼내쓸수있는 함수 190715, 1번째인자 : 어디든붙이기, 2번쨰인자, 배경유무
function openLoad(obj, b_bg) {

    var _ITEM = $('<div id="loadLayer"><div class="load_wrap"><div class="load_wrap2">'
        + '<p class="load_line">' + c18n('AA0166', '불러오는 중입니다.') + '<br>' + c18n('AA0167', '잠시만 기다려 주세요!') + '</p>'
        + '<div class="load_box"><div class="loader1"></div></div></div></div></div>');
    _ITEM.find('.load_wrap').css({
        'z-index': '10000',
        'position': 'fixed',
        'top': '0', 'left': '0', 'right': '0', 'bottom': '0',
        'text-align': 'center'
    });
    _ITEM.find('.load_wrap2').css({
        'display': 'inline-block',
        'font-size': '16px',
        'border-radius': '10px',
        'background-color': '#fff'
    });
    _ITEM.find('.load_line').css({
        'padding-top': '35px',
        'margin-bottom': '25px',
        'text-align': 'center'
    });
    _ITEM.find('.load_box').css({
        'padding-bottom': '30px'
    });
    if (b_bg) {
        _ITEM.find('.load_wrap').css('background-color', 'rgba(0,0,0, .2)');
        _ITEM.find('.load_wrap2').css({
            'margin-top': '15em',
            'width': '320px'
        });
    } else {
        _ITEM.find('.load_wrap2').css({
            'margin-top': '60px',
            'width': '100%'
        });
    }
    if (obj.find("#loadLayer").length == 0) {
        obj.prepend(_ITEM);
    } else {
        obj.find("#loadLayer").show();
    }
}

function closeLoad() {
    $("#loadLayer").hide();
}

//@주광욱 2019.7.24 scrollPosition 상속
//이전화면 정보
//
function prevScreenInfo() {
    var pageNo = 1;
    var b_MainImView = false;
    var prevScroll = new scrollPosition();

    function setPageNo(_pageNo) {
        pageNo = _pageNo
    }

    function getPageNo(_pageNo) {
        return pageNo;
    }

    return {
        setPageNo: setPageNo,
        getPageNo: getPageNo,
        saveScrollPosition: prevScroll.save,
        loadScrollPosition: prevScroll.load,
        clearScrollPosition: prevScroll.clear
    };

}

function electronBtnClick() {
    $("#set").on("click", function () {
        fn_openContextMenuForElectron("set");
    });

    $("#elec_btn-fold").on("click", function () {
        fn_openContextMenuForElectron("fold");
    });

    $("#elec_btn-close").on("click", function () {
        fn_openContextMenuForElectron("close");
    });

    $("#elec_btn-max").on("click", function () {
        fn_openContextMenuForElectron("maximize");
    });
}


function getSecoCompanyName(USER_ID) {
    var code = USER_ID.substring(0, 2);
    var companyName = "";
    switch (code) {
        case "CL":
            companyName = "서진산업";
            break;
        case "CB":
            companyName = "서진오토모티브";
            break;
        case "CD":
            companyName = "서진캠";
            break;
        case "CA":
            companyName = "에코플라스틱";
            break;
        case "CC":
            companyName = "코모스";
            break;
        case "CI":
            companyName = "아이아";
            break;
        case "CO":
            companyName = "영풍기계";
            break;
        case "CE":
            companyName = "세코글로벌";
            break;
        case "CH":
            companyName = "미보기아";
            break;
        case "CJ":
            companyName = "연합";
            break;
        case "CP":
            companyName = "미래I&T";
            break;
        case "CG":
            companyName = "인베스터유나이티드";
            break;
        case "CM":
            companyName = "SECO R&D센터";
            break;
        case "CQ":
            companyName = "파인우드";
            break;
        case "CK":
            companyName = "나래";
            break;
        case "CN":
            companyName = "두리";
            break;
        case "CR":
            companyName = "TPS";
            break;
    }
    return companyName;
}

//절전모드
function powerMonitorSuspend() {

}

// 절전모드 해제
function powerMonitorResume() {
    if (socket.connected) {
        //location.reload()
    }
    socket.connect();
    // NOTE [@소문혁] : 절전모드 동안 누락된 뱃지카운트 갱신
    fn_initNotiCntCheck(); 		// 프로젝트 뱃지
    fn_initChatNotiCntCheck(); 	// 채팅뱃지

    if ($("#chatLayer").is(":visible")) {
        $("#chatAreaMnt").click();
    } else if ($("#flowLayer").is(":visible")) {
        $("#flowAreaMnt").click();
    } else {
        // done
    }
}

function userOsCheck() {
    var os = "";
    var ua = navigator.userAgent;

    if (ua.indexOf("Macintosh") != -1) { // 맥
        os = "OS_X";
    } else if (ua.indexOf("Linux") != -1) {
        os = "LINUX";
    } else { // 윈도우
        os = "WINDOWS";
    }
    return os;
}

function electronSetTitleBar() {
    try {
        if (userOsCheck() == "WINDOWS") {
            // done
        } else {
            if (fn_ElectronVersionCheck() >= "1_0_9") {
                $(".window_top.mac").find(".section").hide();
            }
        }
    } catch (e) {

    }

}

function captureBtn() {
    var height = window.innerHeight;
    var width = $(document).width();
    var $mask = $('<div id="screenshot_mask"></div>').css("border-width", "0 0 " + height + "px 0");
    var $focus = $('<div id="screenshot_focus"></div>');

    $("body").append($mask);  // dimmed 추가
    $("body").append($focus);  // 마우스 커서에 따라 캡쳐 영역을 만들 div

    var selectArea = false;

    $("body").one("mousedown", function (e) {  // 캡쳐 영역 선택 시작
        e.preventDefault();
        selectArea = true;
        startX = e.clientX;
        startY = e.clientY;
    }).one('mouseup', function (e) {  // 캡쳐 시작

        selectArea = false;
        $("body").off('mousemove', mousemove);  // 이벤트 삭제
        $("#screenshot_focus").remove();  // 마우스 포커스 삭제
        $("#screenshot_mask").remove();  // 딤 삭제

        var x = e.clientX;
        var y = e.clientY;
        var top = Math.min(y, startY);
        var left = Math.min(x, startX);
        var width = Math.max(x, startX) - left;
        var height = Math.max(y, startY) - top;


        html2canvas(document.body).then(function (canvas) {  // 전체 화면 캡쳐
            var img = canvas.getContext('2d').getImageData(left, top, width, height);  // 선택
            // 영역만큼
            // crop

            var c = document.createElement("canvas");
            c.width = width;
            c.height = height;
            c.getContext('2d').putImageData(img, 0, 0);
            save(c);  // crop한 이미지 저장
        });
    }).on("mousemove", mousemove);  // 캡쳐 영역 크기 변경


    function mousemove(e) {
        var x = e.clientX;
        var y = e.clientY;
        $focus.css("left", x);  // 마우스 커서 따라 좌표 포커스 이동
        $focus.css("top", y);

        if (selectArea) {  // 캡쳐 영역 선택 그림
            var top = Math.min(y, startY);
            var right = width - Math.max(x, startX);
            var bottom = height - Math.max(y, startY);
            var left = Math.min(x, startX);
            $mask.css("border-width", [top + 'px', right + 'px', bottom + 'px', left + 'px'].join(' '));
        }

    }


    function save(canvas) {  // 파일로 저장
        if (navigator.msSaveBlob) {
            var blob = canvas.msToBlob();
            return navigator.msSaveBlob(blob, '파일명.jpg');
        } else {
            var el = document.getElementById("captureTarget");
            el.href = canvas.toDataURL("image/png");
            el.download = '파일명.jpg';
            el.click();
        }
    }
}

function menuSettingsElectron(props) {
    try {
        fn_sendValueForElectron(props);
    } catch (e) {
        // doen
    }
}

//flowMini 비밀번호 보이기
function passwdShow(mainObj, e) {
    mainObj.find(".mask").addClass("on")
    mainObj.find("#PWD, #log_pass").attr("type", "text")

}

//flowMini 비밀번호 보이기 
function passwdHide(mainObj, e) {
    mainObj.find(".mask").removeClass("on")
    mainObj.find("#PWD, #log_pass").attr("type", "password")
}

//web 비밀번호 보이기 
function passwordShowBrowser(e) {
    $(e.target).addClass("active")
    $(e.target).siblings('input').attr("type", "text")
}

//web 비밀번호 숨기기
function passwordHideBrowser(e) {
    $(e.target).removeClass("active")
    $(e.target).siblings('input').attr("type", "password")
}


function capslock(mainObj, e) {
    if (event.getModifierState("CapsLock")) {
        mainObj.find(".mask").addClass("on")
    } else {
        mainObj.find(".mask").removeClass("on")
    }
}

function electronConfirm(title, message1, yesFunc, noFunc) {
    var dat = {}
    result = '';
    dat["text"] = {"title": title, "cont": message1}

    dat["yes_func"] = function () {
        yesFunc()
    }
    dat["no_func"] = function () {
        noFunc()
    }

    jsDraw.confirm(dat);
}

//일대일 채팅방
function fn_oneToOneChatStart(USER_ID) {
    var SENDIENCE_REC = [];
    var jsonValue = {};
    jsonValue["IN_RCVR_USER_ID"] = USER_ID;
    SENDIENCE_REC.push(jsonValue);
    fn_chatC001("", SENDIENCE_REC);
}


// 일렉트론 alert창 사용시 Input 먹통되는 이슈
window.old_alert = window.alert;

window.alert = function (message1) {
    if (getElectronYn()) {
        var alertData = {
            type: "1",
            msg: message1,
            timer: 2000
        }
        jsDraw.alert(alertData)
        //cmf_layerMsg(alertData)
    } else {
        return old_alert(message1);
    }

};

//@유민호 : 기능제어함수 200401 
function isFunc(nm) {
    return isFuncDeployList(nm);
}

//@유민호 : 기능제어함수 200401 
function isFuncDeployList(nm) {
    var tmpFlowDeployList = getLocal('FUNC_DEPLOY_LIST') || getLocal("N_ONLY_FUNC_LIST");
    if (coalesce3(tmpFlowDeployList).length > 0 && "" !== coalesce3(nm) && "" !== coalesce3(JSON.parse(tmpFlowDeployList)[nm])) {
        return true;
    } else {
        return false;
    }
}

// electron.js 작성예정임
function electronSettingChangeDetection(config) {
    //console.log("config == ", config)
}

function electronUpdate() {

    if (_USER_ID == 'elli3406@naver.com') return;

    flowUpdateR001(getPackName(), userOsCheck(), function (data) {
        var updateRec = data;

        if (!updateRec || !updateRec.flow_rec[0]) return;
        if (getElectronYn() && getElectronVer().replace(/_/gi, "") < updateRec.flow_rec[0].MINI_VER.replace(/\./ig, "") && isFuncDeployList("DESKTOP_UPDATE_POPUP")) {
            var popupLayerSelector = "#flowDesktopUpdatePopup"
            var ua = navigator.userAgent
            $(popupLayerSelector).find(".flowupdt_lypop").css("margin-left", "0").css("height", "195px").css("padding-bottom", "0px");
            $(popupLayerSelector).find(".flowupdt_bg_top").css("background-image", "url('/design3/img_rn/bg/bg_flowbiz_09.png')");
            $(popupLayerSelector).find("#popupTitle").text("플로우 신규 업데이트");
            $(popupLayerSelector).find("#popupTitle").css('font-size', '18px')

            $(popupLayerSelector).find("#popupContents").css('font-size', '12px').css('padding', '8px');

            $(popupLayerSelector).find(".flowupdt_txt_btm").css('padding', '15px 25px');
            //mac

            var macLink = 'https://support.flow.team/hc/ko/articles/360038630092-Mac';
            var windowsLink = 'https://support.flow.team/hc/ko/articles/4407450466073';
            if (ua.indexOf("Macintosh") !== -1) {
                if (!b_enter) {
                    $(popupLayerSelector).find(".flowupdt_txt_btm").append("<p class='os_help' target='_blank'>설치에 어려움이 있으신가요?</p>")
                    $(popupLayerSelector).find(".os_help").on('click', function (){ cmf_openWindow(macLink) });
                }
                $(popupLayerSelector).find("#popupContents").html(updateRec.flow_rec[0].REASON);
            } else if (ua.indexOf("Linux") != -1) {
                alert(cnts_Null2Void(i18n('DCC440'), 'linux 운영체제는 지원하지 않습니다.'));
                return;
            } else {
                //windows
                if (!b_enter) {
                    $(popupLayerSelector).find(".flowupdt_txt_btm").append("<p class='os_help' target='_blank'>설치에 어려움이 있으신가요?</p>");
                    $(popupLayerSelector).find(".os_help").on('click', function (){ cmf_openWindow(windowsLink) });
                }
                $(popupLayerSelector).find("#popupContents").html(updateRec.flow_rec[0].REASON);
            }
            var atchUrl = updateRec.flow_rec[0].LINK_URL
            $(popupLayerSelector).find(".os_help").css("margin-top", "0px")
                .css("background-color", "white")
                .css("color", "blue")
                .css("line-height", "30px")
                .css("font-size", "12px")
                .css("height", "auto")
                .css("font-weight", "normal")
                .css("cursor", "pointer")
            $(popupLayerSelector).find(".flowupdt_lypop").css("height", "195px").css("border-radius", "10px")
            $(popupLayerSelector).find("#downloadLatestDesktopApp").text("업데이트").on("click", function () {
                if (cnts_Null2Void(atchUrl, "") !== "") {
                    fn_direcktPcDownload(true);
                }

                cf_setCookie("electron110Update", true, 1);
            });

            var isUnderSelectVer = getElectronVer().replace(/_/gi, "") > updateRec.flow_rec[0].SELECT_VER.replace(/\./ig, "");
            if(isUnderSelectVer){
                $(popupLayerSelector).on("click", function (e) {
                    var isBackground = $(e.target).closest('.flowupdt_lypop').length === 0;
                    isBackground && $(popupLayerSelector).remove();
                });
            }

            $(popupLayerSelector).show();
        }
    });
}

function getPackName() {
    var pck_nm = "team.flow.joinsMini"

    if (b_joins) {
        pck_nm = "team.flow.joinsMini"
    } else if (b_gware) {
        pck_nm = "team.flow.GTalkMini"
    } else if (b_enter) {
        pck_nm = "team.flow.flowEntMini"
    } else {
        pck_nm = "team.flow.flowMini"
    }

    // SK인포섹 // 동운아나텍
    if ((_USE_INTT_ID == 'BFLOW_190806105742' || _USE_INTT_ID == 'BFLOW_200108155423') ) {
        pck_nm = "secure.flow.team"
    }


    return pck_nm;
}

function flowUpdateR001(pck_nm, pck_gb, callback) {
    var jexAjax = jex.createAjaxUtil("FLOW_UPDATE_R001");
    jexAjax.set("USER_ID", _USER_ID);
    jexAjax.set("RGSN_DTTM", _RGSN_DTTM);
    jexAjax.set("PCK_NM", pck_nm);
    jexAjax.set("GB", pck_gb);
    jexAjax.execute(function (dat) {
        if (!jex.isError(dat)) {
            callback(dat);
        }
    });
}

function isUploadFileExtension(extension) {
    if (coalesce3(_EXTENSION_BLOCK_LIST) === "") {
        //if(_EXTENSION_BLOCK_LIST==null){
        _EXTENSION_BLOCK_LIST = getLocal("EXTENSION_BLOCK_LIST");

        if (coalesce3(_EXTENSION_BLOCK_LIST) === "") {
            extensionBlockListInit()
        }
    } else {
        //done
    }


    if (_EXTENSION_BLOCK_LIST != null && _EXTENSION_BLOCK_LIST.indexOf(extension) > -1) {
        var message = '업로드할 수 없는 확장자입니다. (' + extension + ')';
        toast("2", message, 1000);
        return false;
    } else {
        return true;
    }
}

function getFileExtension(fileName) {
    var tmpArray = fileName.split('.');
    var size = tmpArray.length;
    var extension = tmpArray[size - 1];

    return extension;
}

function getFileNameWhenClipboard() {
    var now = new Date();
    var month = now.getMonth() + 1 < 10 ? '0' + (now.getMonth() + 1) : '' + now.getMonth() + 1;
    var day = now.getDate() < 10 ? '0' + now.getDate() : '' + now.getDate();
    var hours = now.getHours() + '' + now.getMinutes() + '' + now.getSeconds() + '' + now.getMilliseconds();
    return 'flow_' + now.getFullYear() + '-' + month + '-' + day + '_' + hours + '.png';
}

function setLocal(k, v) {
    localStorage.setItem(k, v);
}

function getLocal(k) {
    return localStorage.getItem(k);
}

function extensionBlockListInit() {
    var _EXTENSION_BLOCK_LIST = [];
    if (isFunc('FILE_EXTENSION_BLOCK')) {
        var jexAjax = jex.createAjaxUtil("COLABO2_FILE_EXTENSION_BLOCK_R001");
        jexAjax.set("USER_ID", _USER_ID);
        jexAjax.set("RGSN_DTTM", _RGSN_DTTM);
        jexAjax.execute(function (dat) {
            if (!jex.isError(dat)) {
                var data = dat.FILE_EXTENSION_LIST;
                data.forEach(function (v, i) {
                    _EXTENSION_BLOCK_LIST.push(v.EXTENSION);
                })
                setLocal("EXTENSION_BLOCK_LIST", _EXTENSION_BLOCK_LIST);
            }
        })
    } else {
        setLocal("EXTENSION_BLOCK_LIST", _EXTENSION_BLOCK_LIST);
    }
}

function getConvertTimezoneForZoom() {
    var timezone = getCookie("FLOW_TIMEZONE")
    switch (timezone) {
        case "+900":
            return "Asia/Seoul"
        case "+800":
            return "Asia/Singapore"
        case "+700":
            return "Asia/Saigon"
        case "+200":
            return "Europe/Berlin"
        case "+100":
            return "Europe/London"
        case "-400":
            return "America/New_York"
        case "-500":
            return "America/Chicago"
        case "-600":
            return "America/Denver"
        case "-700":
            return "America/Los_Angeles"
    }
}

function classfyKoreanOrForeign(nationalClassifyCode, inputNumber) {
    if (inputNumber === '' || inputNumber === null || inputNumber.length < 1) {
        return '-';
    }
    if (nationalClassifyCode === 'KR_82') {
        return cmf_convrClphNo(inputNumber);
    } else if (nationalClassifyCode !== 'KR_82') {
        var arrayNationalClassifyCode = nationalClassifyCode.split('_');
        var nationalCode = arrayNationalClassifyCode[1];
        return '+' + nationalCode + ' ' + inputNumber.substring(1, inputNumber.length + 1);
    }
}

// 내선번호 validation
function validateAndConvertEXTNS_NO(inputEXTNS_NO) {
    var regexNumber = /^[0-9]*$/;
    if (cnts_Null2Void(inputEXTNS_NO, "").length > 0 && regexNumber.test(inputEXTNS_NO)) {
        return inputEXTNS_NO;
    } else {
        return '-';
    }
}

// 전화걸기 기능 입히기
function setClickToCallIntoNumber(inputCallNumber, targetArea) {
    if(inputCallNumber.length < 1  && inputCallNumber == "-") {
        return;
    }

    if(targetArea == "CLPH_NO") {
        $("#profilePopup").find("#CLPH_NO").css('cursor', 'pointer');

        if(isFuncDeployList("IPT_FUNC")) {
            $("#profilePopup").find("#CLPH_NO").off("click").on("click", function () {
                clickToCall(inputCallNumber, "IPT_FUNC");
            });
        }
        else if(isFuncDeployList("CLICK_TO_CALL_DGB")) {
            $("#profilePopup").find("#CLPH_NO").off("click").on("click", function () {
                clickToCall(inputCallNumber, "CLICK_TO_CALL_DGB");
            });
        }
        else {
            $("#profilePopup").find("#CLPH_NO").css('cursor', 'unset');
            $("#profilePopup").find("#CLPH_NO").off("click");
        }
    }
    else if(targetArea == "CMPN_TLPH_NO") {
        $("#profilePopup").find("#CMPN_TLPH_NO").css('cursor', 'pointer');

        if(isFuncDeployList("IPT_FUNC")) {
            $("#profilePopup").find("#CMPN_TLPH_NO").off("click").on("click", function () {
                clickToCall(inputCallNumber, "IPT_FUNC");
            });
        }
        else if(isFuncDeployList("CLICK_TO_CALL_DGB")) {
            $("#profilePopup").find("#CMPN_TLPH_NO").off("click").on("click", function () {
                clickToCall(inputCallNumber, "CLICK_TO_CALL_DGB");
            });
        }
        else {
            $("#profilePopup").find("#CMPN_TLPH_NO").css('cursor', 'unset');
            $("#profilePopup").find("#CMPN_TLPH_NO").off("click");
        }
    }

}

function clickToCall(callee, gubun) {
    if (gubun == "IPT_FUNC") {
        var userData = getDataUserPrfl(_USER_ID);
        if (!userData.CMPN_TLPH_NO || !callee) return;

        socketIPT.emit('iptCallTo', {
            CID: userData.CMPN_TLPH_NO,
            DID: callee,
            FALG: 1
        });
    } else if(isFuncDeployList("CLICK_TO_CALL_DGB")) {
        var userData = getDataUserPrfl(_USER_ID);
        if (!userData.CMPN_TLPH_NO || !callee) return;

        dgbIptCall(userData.CMPN_TLPH_NO, callee);
    }
}

//js.wise10 프로젝트/채팅에서 해당부서가 있는지 확인하는 함수
//separator : PROJECT / CHAT , SRNO : COLABO_SRNO / ROOM_SRNO, DVSNCODE : DVSN_CD
function isParticipatingDepartment(separator, srno, dvsnCode) {
    if(_USE_INTT_ID == 'BFLOW_210118174434' ||_USE_INTT_ID == 'BFLOW_210118150405') {
	//done
    }else{
	return false;
	}
    var isExistInputDepartment = "INIT_VALUE";
    var jexAjax = jex.createAjaxUtil("COLABO2_GET_JOIN_STATE");
    jexAjax.set("USER_ID", _USER_ID);
    jexAjax.set("SRNO", srno);
    jexAjax.set("GB", separator);
    jexAjax.set("DVSN_CD", dvsnCode);
    jexAjax.setAsync(false);
    jexAjax.execute(function (dat) {
        if (!jex.isError(dat)) {
            var isExistValue = dat.EXIST_YN;
            if ("Y" === isExistValue) {
                isExistInputDepartment = "Y"
            } else {
                isExistInputDepartment = "N"
            }
        }
    });
    if("Y" === isExistInputDepartment) {
        return true;
    }
    else if("N" === isExistInputDepartment) {
        return false;
    }
    else {
        //done;
    }
}

function validateAndConvertEXTNS_NO(inputEXTNS_NO) {
    var regexNumber = /^[0-9]*$/;
    if (cnts_Null2Void(inputEXTNS_NO, "").length > 0 && regexNumber.test(inputEXTNS_NO)) {
        return inputEXTNS_NO;
    } else {
        return '-';
    }
}

function showTooltipWhenUnRead(tooltipId, callback) {
    var jexAjax = jex.createAjaxUtil("COLABO_TOOLTIP_LOG_R001");
    jexAjax.set("USER_ID", _USER_ID);
    jexAjax.set("RGSN_DTTM", _RGSN_DTTM);
    jexAjax.set("TOOLTIP_ID", tooltipId);
    jexAjax.set("GUBUN", 'P');
    jexAjax.execute(function (dat) {
        if (jex.isError(dat)) {
            alert('ERROR!');
            return false;
        }else{
            if(!callback){
                // done
            }else if(typeof callback === 'function'){
                callback(dat);
            }
        }
    });
}

function isGantt(){
    return $('#timelineCalendar').length > 0;
}

function openProject(colaboSrno, colaboCommtSrno, colaboRemarkSrno){
    cmf_createSession();

    var w = screen.availWidth ;
    var h = screen.availHeight;

    var left = cnts_Null2Void(screenLeft,0) + (screen.availWidth - w) / 2;
    var top = cnts_Null2Void(screenTop,0) + (screen.availHeight - h) / 2;
    var origin = location.protocol + '//'+ location.host;
    var moveUrl;

    if (referer.indexOf("/main.act") > -1) {
        moveUrl = origin + '/main.act' + (colaboSrno ? '?detail/'+colaboSrno : '');
    } else {
        moveUrl = origin + '/flow_layout.act';
    }

    if (getElectronYn()) {
        cf_setCookie("electronYn", "Y", 30 * 12);
        cf_setCookie("electronMode", "M", 30 * 12);
        fn_openProjectForElectron(moveUrl, colaboSrno , colaboCommtSrno ,colaboRemarkSrno ,left, top);
    } else {
        var s_var_list =  '<input type="hidden" name="T_COLABO_SRNO" id="COLABO_SRNO" value="' + colaboSrno + '">'+
            '<input type="hidden" name="T_COLABO_COMMT_SRNO" id="T_COLABO_COMMT_SRNO" value="' + colaboCommtSrno + '">'+
            '<input type="hidden" name="T_COLABO_REMARK_SRNO" id="T_COLABO_REMARK_SRNO" value="' + colaboRemarkSrno + '">';
        var $frmObj = $("<form id='flow_layout' name='flow_layout'></form>");
        $frmObj.attr("method", "post");
        $frmObj.appendTo("body");
        $frmObj.append(s_var_list);
        $frmObj.attr("action", moveUrl);
        $frmObj.attr("target", "flow_layout");
        $frmObj.submit();
        $frmObj.remove();
    }
}

//@js.wise10 2021.02.04 슬로건 줄 수에 따른 Margin값 변경
function calculateExpendMarginSize() {
    var preMarginValue = document.querySelector('.prof-menu').style.getPropertyValue('margin-top').substring(0,document.querySelector('.prof-menu').style.getPropertyValue('margin-top').length-2)

    var calculateMarginSize = ($('#profilePopup').find('#SLGN').height() / 16) - 1;
    if(calculateMarginSize < 0) {
        calculateMarginSize = calculateMarginSize * -1;
    }
    var setMarginValue = Number(preMarginValue) + (16 * calculateMarginSize);
    $(".prof-menu").css('margin-top', setMarginValue+'px');
    $(".prof_btn").css('margin-top', setMarginValue+'px');

}

/**
 *
 * NOTE : \D (숫자 문자가 아닌 문자에 대응됩니다. [^0-9]와 동일합니다.)
 * @param str
 * @returns {*}
 */
function extractIntegersFromString(str) {
    return str.replace(/\D/g, "")
}

function validateSubTaskTitleLength(title) {
    if(title.length >= 50){
        cmf_layerMsg("2", cnts_Null2Void(i18n('DCM14'),"제목은 50자 이내로 작성해주세요."));
    }
}
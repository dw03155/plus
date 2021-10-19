var enter_control = (function () {
    return {
        setDefault: setDefault,					//엔터기본설정
        enablePwdEdit: enablePwdEdit,				//비밀번호설정가능
        enableChatUpgrade: enableChatUpgrade,		//채팅 업그레이드 : 시크릿,삭제,이모티콘,읽음확인,상단고정,이름변경
        enableChatScrYn: enableChatScrYn,		// 채팅 시크릿 활성여부
        enableChatRevYn: enableChatRevYn,		// 채팅 삭제 활성여부
        initMobisSapFuncYn: initMobisSapFuncYn,		// 모비스 성과관리 시스템 활성여부
        enableGuestLogin: enableGuestLogin, 		//외부인로그인가능
        enableAddMap: enableAddMap,				//지도첨부가능
        enableRemoveMapEvent: enableRemoveMapEvent, //일정 지도이벤트 삭제
        enableOnlyDownload: enableOnlyDownload,    //문서뷰어없어 오직다운로드만
        setAdmin: setAdmin,						//관리자설정
        setFuncDeployList: setFuncDeployList,
        initVideoConference: initVideoConference,  // 화상회의 셋팅
        getFuncDeployList: getFuncDeployList,
        isguestInputRequiredValueModelPopup: isguestInputRequiredValueModelPopup,

        //set enter in test server
        setCookieEnter: setCookieEnter,
        getCookieEnter: getCookieEnter
    };

    function setFuncDeployList(callback) {
        var jexAjax = jex.createAjaxUtil("COLABO2_FUNC_R003");
        jexAjax.set("USER_ID", _USER_ID);
        jexAjax.set("RGSN_DTTM", _RGSN_DTTM);
        jexAjax.setAsync(false);
        jexAjax.execute(function (dat) {
            if (jex.isError(dat)) return;
            setLocal("FUNC_DEPLOY_LIST", dat.FUNC_DEPLOY_LIST);
            if (callback !== undefined && typeof callback === 'function') {
                callback();
            } else {
                //done
            }
        });
    }

    function isEnterAdmin() {
        var jexAjax = jex.createAjaxUtil("COLABO2_MNGR_R003");
        jexAjax.set("USER_ID", _USER_ID);
        jexAjax.set("RGSN_DTTM", _RGSN_DTTM);
        jexAjax.setAsync(false);
        jexAjax.execute(function (dat) {
            if (jex.isError(dat)) {
                alert('에러가 발생하였습니다.');
                $('[data=flow-block-file-extension]').remove();
                return false;
            } else {
                var isAdmin = dat.CNT;
                if (isAdmin > 0) {
                    $('[data=flow-block-file-extension]').show();
                } else {
                    $('[data=flow-block-file-extension]').remove();
                }
                return true;
            }
        });
    }

    // @임석현 : 감사자인지 확인 (최고 감사자 인지 확인)
    function isAuditor() {
        if ($("#isAuditor").val() == 1) {
            $('[data=flow-auditor-chat]').show();
            $("#flow-admin-left").find(".lnb_menu_box").find("#chatAuditorTitle").show();
            $('[data=flow-auditor-setting]').remove();
        } else if ($("#isAuditor").val() == -1) {
            $('[data=flow-auditor-setting]').show();
            $('[data=flow-auditor-chat]').remove();
            $("#flow-admin-left").find(".lnb_menu_box").find("#chatAuditorTitle").show();
        } else if ($("#isAuditor").val() == 2) {
            // 관리자가 아닌 감사자일 경우
            $("#flow-admin-left").find(".flow-admin-menu").remove(); //모든 옵션 삭제
            $("#flow-admin-left").find(".title_admin").remove(); //모든 옵션 삭제
            $("#flow-company").hide();
            $("#flow-auditor-chat").show();
            $('[data=flow-auditor-chat]').addClass('on');
            showPage('flow-auditor-chat');
        } else {
            $('[data=flow-auditor-setting]').remove();
            $('[data=flow-auditor-chat]').remove();
            $("#flow-admin-left").find(".lnb_menu_box").find("#chatAuditorTitle").remove();
        }
    }


    //엔터기본설정
    function setDefault() {
        setFuncDeployList(function () {

            if (b_enter) {
                //done
            } else {
                $("#content_setting_area").find("ul.sv_step").remove();	//계정 정보 스텝 화면 제거
            }

            if (_USE_INTT_ID.indexOf("SEC_1") > -1) {
                $("#userPopup").find("#help, #appDownload").remove();	//도움말,다운로드 제거
            } else if (condJson.get["isDbfi"]) {
                $("#menuWrap").find("#pcVersionDownloadBtn").parent().hide();
            } else {
                //done
            }

            if (isFuncDeployList("DESKTOP_DOWN_BLOCK")) {
                $("#userPopup").find("#appDownload").remove();
                $("#menuWrap").find("#pcVersionDownloadBtn").parent().hide();
                $("#leftViewPcVersionDownloadBtn").parent().hide();
            } else {
                //done
            }

        });
    }

    //비밀번호설정가능
    function enablePwdEdit() {
        setFuncDeployList(function () {
            if (_DEV_REAL.indexOf("DEV") > -1 ||
                _USE_INTT_ID.indexOf("FLOW") > -1 ||
                _USE_INTT_ID.indexOf("ZOOMOK_1") > -1 ||
                _USE_INTT_ID.indexOf("HOTTRACKS_1") > -1 ||
                _USE_INTT_ID.indexOf("HYUNDAI_1") > -1 ||
                _USE_INTT_ID.indexOf("MOBIS_1") > -1 ||
                _USE_INTT_ID.indexOf("SEOULSEMICON_1") > -1 ||
                _USE_INTT_ID.indexOf("SEC_1") > -1 ||
                _USE_INTT_ID.indexOf("UTLZ") > -1 ||
                _USE_INTT_ID.indexOf("FASTBOX_1") > -1 ||
                isFuncDeployList("PWD_EDIT")
            ) {
                $("#lfSetting").find("#pwdSetting").show();
            } else {
                $("#lfSetting").find("#pwdSetting").remove();
            }
        });
    }

    //채팅 업그레이드 : 시크릿,삭제,이모티콘,읽음확인,상단고정,이름변경
    function enableChatUpgrade(deploy_yn) {
        if (_USE_INTT_ID.indexOf("SEC_1") > -1) {
            $("#topViewer").attr("CHAT_DEPLOY_YN", "Y");
        } else {
            $("#topViewer").attr("CHAT_DEPLOY_YN", coalesce3(deploy_yn, "N"));
        }
    }

    function enableChatRevYn(chatRev_yn) {
        if (_USE_INTT_ID.indexOf("DBFI_1") > -1) {
            $("#topViewer").attr("CHAT_MSG_REV_YN", "Y");
        } else {
            $("#topViewer").attr("CHAT_MSG_REV_YN", coalesce3(chatRev_yn, "N"));
        }
    }

    function enableChatScrYn(chatScr_yn) {
        if (_USE_INTT_ID.indexOf("DBFI_1") > -1) {
            $("#topViewer").attr("CHAT_SCR_REV_YN", "Y");
        } else {
            $("#topViewer").attr("CHAT_SCR_REV_YN", coalesce3(chatScr_yn, "N"));
        }
    }

    function initMobisSapFuncYn() {
        if (getFuncDeployList("MOBIS_SAP_FUNC")) {
            var head = document.getElementsByTagName('head')[0];
            var link = document.createElement('link');
            link.id = 'mobis_result.css';
            link.rel = 'stylesheet';
            link.type = 'text/css';
            link.href = '/design2/css/mobis/mobis_result.css';
            link.media = 'all';
            head.appendChild(link);
        }
    }

    function initVideoConference() {
        if (isFuncDeployList("SECO_VIDEO_CONFERENCE")) {
            var head = document.getElementsByTagName('head')[0];
            var link = document.createElement('link');
            link.id = 'seco_video.css';
            link.rel = 'stylesheet';
            link.type = 'text/css';
            link.href = '/design2/css/seco/seco_video.css';
            link.media = 'all';
            head.appendChild(link);
        }
    }

    //외부인로그인가능
    function enableGuestLogin(sub_dom) {
        if (isFunc("GUEST_LOGIN")) {
            $("#guestLoginBtn").parent().show();
            $("#guestLoginBtn").parent().prev().show();
        } else if (sub_dom == "FLOW_MOBIS" || sub_dom == "MOBIS" || sub_dom == "SEC") {
            // 예외
            $("#guestLoginBtn").parent().hide();
            $("#guestLoginBtn").parent().prev().hide();
        } else {
            $("#guestLoginBtn").parent().hide();
            $("#guestLoginBtn").parent().prev().hide();
        }
    }

    //지도첨부가능
    function enableAddMap() {
        if (_USE_INTT_ID.indexOf("SEC_1") > -1 || location.host === "flow-wgpp.bizplay.co.kr" || !isFuncDeployList("GOOGLE_MAP") || isFunc("INTRANET_USE")) {
            $(".btn.place").remove();
        } else {
            //done
        }
    }

    function enableRemoveMapEvent() {
        if (_USE_INTT_ID.indexOf("SEC_1") > -1 || location.host === "flow-wgpp.bizplay.co.kr" || !isFuncDeployList("GOOGLE_MAP") || isFunc("INTRANET_USE") ) {
            return false;
        } else {
            return true;
        }
    }

    //문서뷰어없어 오직다운로드만
    function enableOnlyDownload() {
        if (_USE_INTT_ID.indexOf("SEC_1") > -1 || isFuncDeployList("ONLY_DOWNLOAD")) {
            return true;
        } else {
            return false;
        }
    }

    //관리자설정
    function setAdmin() {

        setFuncDeployList(function () {

            // DB금투 채팅 감사자
            if (isFuncDeployList('CHAT_AUDITOR')) {
                isAuditor();
                $("#flowAuditorChatAll").remove();
            } else if (isFuncDeployList('CHAT_AUDITOR_ALL')) {
                $("#flowAuditorSetting").remove();
                $("#flowAuditorChat").remove();
            } else {
                $("#chatAuditor").remove();
                $("#chatAuditorTitle").remove();
            }

            if (!isFuncDeployList('CHAT_AUDITOR_ALL')) {
                $("#flowAuditorChatAll").remove();
            }

            //#회사탭

            //외부인 관리 -- 운영자계정 또는 엔터 중 일부기업(섹,모비스) 제외
            if (isFunc('GUEST_MNGR')) {
                //pass
            } else {
                $("#flow-admin-left").find(".lnb_menu_box").find(".flow-guest").remove();
            }

            //직원부서일괄등록
            if (isFunc('EMPL_DVSN_BATCH')) {
                //pass
            } else {
                $("#flow-admin-left").find(".lnb_menu_box").find(".flow-excel-api").remove();
            }

            //직원부서일괄등록 - 엑셀밀어넣기
            var b_inviteExcel = (_USE_INTT_ID == "UTLZ_1608261809693" || condJson.get["isDev"] || (isFunc("INVITE_EXCEL")));
            if (_USE_INTT_ID.indexOf("BFLOW") > -1 || b_inviteExcel) {
                //pass
            } else {
                $("#flow-admin-left").find(".lnb_menu_box").find("[data=flow-invite]").remove();
            }
            if (b_inviteExcel) {
                //pass
            } else {
                $("#flow-invite #USER_EXCEL_UPLOAD").remove();
                $("#flow-invite #INVITE_EXCEL_UI").remove();
                $("#flow-invite #INVITE_EMAIL").addClass('on');
                $("#flow-invite #INVITE_EMAIL_UI").css('display', 'block');
            }

            //#통계/리포트탭

            //업무통계 -- 마드라스체크만
            if (_USE_INTT_ID == "UTLZ_1608261809693" || checkLocationDomain("DEV_TEST")) {
                //pass
            } else {
                $("#flow-admin-left").find(".lnb_menu_box").find(".flow-task-stat").remove();
            }

            //#보안설정탭

            //2차인증 -- 엔터 중 일부기업(현기차, 모비스) 모두 제외하고 보여줌
            if (isFunc("TWO_FACTOR") || _USE_INTT_ID === "HYUNDAI_1" || _USE_INTT_ID === "MOBIS_1" || _USE_INTT_ID === "SOIL_1") {
                //pass
            } else {
                $("#flow-admin-left").find(".lnb_menu_box").find(".flow-two-factor").remove();
            }

            //앱 캡쳐방지, 파일다운로드제한
            if (isFunc("ONLY_WEB_USE") || _USE_INTT_ID === "SEC_1") {
                $("#flow-admin-left").find(".lnb_menu_box").find(".flow-capt-setting").remove();	//앱 캡쳐방지 설정 제거
                $("#flow-mbdown-limit").find("#mbDownLimitActivity").parent().parent().remove();	//파일 다운로드 제한 모바일 제거
                $("#flow-mbdown-limit").find(".infotxt1_style").find("li:last").remove();			//파일 다운로드 제한 문구 변경
            } else {
                //pass
            }

            //파일확장자차단 - 엔터에서는 관리자가 제어가능하며, 클라우드는 전체적용되는거라서 제어되지 않아야함
            if (isFunc('FILE_EXTENSION_BLOCK')) {
                if (!b_enter && _USER_ID === "madrascheck") {
                    $('[data=flow-block-file-extension]').show();
                } else if (checkLocationDomain("REAL_TEST") && _USER_ID === "madrascheck") {
                    $('[data=flow-block-file-extension]').show();
                } else if (b_enter) {
                    isEnterAdmin();
                } else {
                    $('[data=flow-block-file-extension]').remove();
                }
            } else {
                $('[data=flow-block-file-extension]').remove();
            }

            //파일 업로드 설정
            if (isFunc('AD_FILE_UPLOAD')) {
                //pass
            } else {
                $('[data=flow-file-upload]').remove();
            }

            //채팅 자동삭제 기간 설정
            if (isFunc('AD_CHAT_DELETE')) {
                //pass
            } else {
                $('[data=flow-chat-delete]').remove();
            }

            //채팅 첨부파일 저장 기간 설정
            if (isFunc('AD_CHAT_FILE')) {
                //pass
            } else {
                $('[data=flow-chat-file]').remove();
            }

            //#로그

            //화면캡쳐이력
            if (isFunc("ONLY_WEB_USE") || _USE_INTT_ID === "SEC_1") {
                $("#flow-admin-left").find(".lnb_menu_box").find("[data=flow-capt-hstr]").remove();	//화면캡쳐이력 제거
            } else {
                //pass
            }

            //관리자변경이력
            if (isFunc("ADMIN_HISTORY_LOG")) {
                //pass
            } else {
                $("#flow-admin-left").find(".lnb_menu_box").find("[data=flow-edit-log]").remove();	//화면캡쳐이력 제거
            }

            //#결제

            //결제정보 -- 엔터빼고 비플로우만 보여주디 결제리스트는 마드라스체크일때만
            if ((_ENTER_YN == "N" && _USE_INTT_ID.indexOf("BFLOW") > -1) || location.href.indexOf("flowdev") > -1) {
                $("#flow-admin-left").find(".lnb_menu_box").find(".flow-pay, .flow-pay-content").show();
                if (_USER_ID === "madrascheck" || _USE_INTT_ID == "UTLZ_1608261809693") {
                    $("#flow-admin-left").find(".lnb_menu_box").find(".flow-pay-list").show();
                } else {
                    $("#flow-admin-left").find(".lnb_menu_box").find(".flow-pay-list").remove();
                }
            } else {
                $("#flow-admin-left").find("h2[data-langcode=FA1428]").remove();
                $("#flow-admin-left").find(".lnb_menu_box").find(".flow-pay-content").remove();
            }

            //권한그룹 관리
            if(isFunc('AUTH_GROUP')) {
                //pass
            } else {
                $("#flow-admin-left").find(".lnb_menu_box").find("[data=flow-auth-group]").remove();
            }
            if(isFunc('ZOOM_AUTH')){

            } else {
                $("#flow-admin-left").find(".lnb_menu_box").find("[data=flow-zoom-auth]").remove();
            }
            //#감사

            // DB금투 채팅 감사자
            // DB금투 채팅 감사자
            if (isFuncDeployList('CHAT_AUDITOR')) {
                isAuditor();
                $("#flowAuditorChatAll").remove();
            } else if (isFuncDeployList('CHAT_AUDITOR_ALL')) {
                $("#flowAuditorSetting").remove();
                $("#flowAuditorChat").remove();
            } else {
                $("#chatAuditor").remove();
                $("#chatAuditorTitle").remove();
            }

            if (!isFuncDeployList('CHAT_AUDITOR_ALL')) {
                $("#flowAuditorChatAll").remove();
            }
            //#기타

            //추천인
            if (_ENTER_YN == "N") {
                $("#flow-admin-left").find(".lnb_menu_box").find("#recommandTap").hide();
            } else {
                $("#flow-admin-left").find(".lnb_menu_box").find("#recommandTap").remove();
            }

            $("#flow-admin-left").find(".lnb_menu_box").show();
        });
    }

    function getFuncDeployList(deployName) {
        return isFunc(deployName);
    }

    function isguestInputRequiredValueModelPopup(userData) {
        if(isFunc('GUEST_INPUT_REQUIRED')){
            var isBlank = false;
            var head = document.getElementsByTagName('head')[0];
            var link = document.createElement('script');
            link.type = 'text/javascript';
            link.src = '/js/collabo/collabo3_insert_require.js';
            head.appendChild(link);

            var link2 = document.createElement('link');
            link2.id = 'ktuser.css';
            link2.rel = 'stylesheet';
            link2.type = 'text/css';
            link2.href = '/css/ktflow/ktuser.css';
            link2.media = 'all';
            head.appendChild(link);

            var $guestModalObj = $("#guest-first-modal");

            $guestModalObj.find("#guest_name").val(userData.FLNM);
            $guestModalObj.find("#guest_email").val(userData.EML);
            $guestModalObj.find("#guest_phoneNum").val(userData.CLPH_NO);
            $guestModalObj.find("#guest_cmnm").val(userData.CMNM);
            $guestModalObj.find("#guest_dvsn").val(userData.DVSN_NM);
            $guestModalObj.find("#guest_jbcl").val(userData.JBCL_NM);
            $guestModalObj.find("#guest_cmnm_clph_no").val(userData.CMPN_TLPH_NO);

            $guestModalObj.show();

            //@안광선 Fixed : 일단 loop로 돌려놓았는데.. 배열에다가 인자값 넣어두는게 더 낫을지도..
            $guestModalObj.find("input").on("keyup",function() {
                $guestModalObj.find("input").each(function(i,value){
                    console.log($(value).val() == "")
                    if($(value).val() == "") {
                        isBlank = true;
                    } else {
                        isBlank = false;
                    }
                });

                console.log(isBlank)

                if(!isBlank){
                    $guestModalObj.find("#guest-setup-btn").addClass('on')
                } else {
                    $guestModalObj.find("#guest-setup-btn").removeClass('on')
                }
            });

            $("#guest-setup-btn").on('click', function(){
                var authLogin_Name_value = $.trim(coalesce($guestModalObj.find('input#guest_name').val(),""));
                var required_Email_value = $.trim(coalesce($guestModalObj.find('input#guest_email').val(),""));
                var required_Chphno_value = $.trim(coalesce($guestModalObj.find('input#guest_phoneNum').val(),""));
                var required_CmnmNm_value = $.trim(coalesce($guestModalObj.find('input#guest_cmnm').val(),""));
                var requied_Dvnm_value = $.trim(coalesce($guestModalObj.find('input#guest_dvsn').val(),""));
                var required_Jbclnm_value = $.trim(coalesce($guestModalObj.find('input#guest_jbcl').val(),""));
                var required_CmpnNo_value = $.trim(coalesce($guestModalObj.find('input#guest_cmnm_clph_no').val(),""));


                if (required_Email_value === "" || required_Email_value.length < 1) {
                    toast("2", c18n("H440", "이메일을 입력하시기 바랍니다."));
                    $guestModalObj.find('input#guest_email').focus();
                    return;
                } else {
                    if (cmf_emailcheck(required_Email_value)) {
                        toast("2", c18n("DL158", "이메일 주소를 확인하시기 바랍니다."));
                        $guestModalObj.find('input#guest_email').focus();
                        return;
                    }
                }

                if (required_Chphno_value === "") {
                    toast("2", c18n("DL159","휴대폰번호를 11자리로 작성해주세요."));
                    $guestModalObj.find('input#guest_phoneNum').focus();
                    return;
                }

                if(required_Chphno_value.length !== 11){
                    toast("2", c18n("DL159","휴대폰번호를 11자리로 작성해주세요."));
                    $guestModalObj.find('input#guest_phoneNum').focus();
                    return;
                } else {
                    //done
                }

                if(required_CmnmNm_value === "" || required_CmnmNm_value.legnth < 1) {
                    toast("2", c18n("DL159","회사명을 입력해주세요."));
                    $guestModalObj.find('input#guest_cmnm').focus();
                    return;
                }

                if(requied_Dvnm_value === "" || requied_Dvnm_value.legnth < 1) {
                    toast("2", c18n("DL159","부서명을 입력해주세요."));
                    $guestModalObj.find('input#guest_dvsn').focus();
                    return;
                }

                if(required_Jbclnm_value === "" || required_Jbclnm_value.legnth < 1) {
                    toast("2", c18n("DL159","직책을 입력해주세요."));
                    $guestModalObj.find('input#guest_jbcl').focus();
                    return;
                }

                var dat = {};
                dat["text"]  = {"title":" 플로우 설정하기", "cont": "등록하시겠습니까?"}
                dat["yes_func"] = function(obj){
                    var jexAjax = jex.createAjaxUtil("COLABO2_USER_PRFL_U002");
                    jexAjax.set("USER_ID", _USER_ID);
                    jexAjax.set("RGSN_DTTM", _RGSN_DTTM);
                    jexAjax.set("FLNM", authLogin_Name_value);
                    jexAjax.set("EML", required_Email_value);
                    jexAjax.set("CLPH_NO", required_Chphno_value);
                    jexAjax.set("CMNM", required_CmnmNm_value);
                    jexAjax.set("DVSN_NM", requied_Dvnm_value);
                    jexAjax.set("JBCL_NM", required_Jbclnm_value);
                    jexAjax.set("CMPN_TLPH_NO", required_CmpnNo_value);

                    jexAjax.execute(function(dat){
                        if (jex.isError(dat)) return;

                        $guestModalObj.remove();
                        toast("1", "설정이 완료되었습니다.");
                    });
                }
                jsDraw.confirm(dat);

            })
        } else {
            toast("2", "사용권한이 없습니다.");
        }
    }
})();

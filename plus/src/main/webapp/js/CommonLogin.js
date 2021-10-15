var CommonLogin = (function () {

    var $findEmailInput;

    return {
        goLogin: goLogin,
        goAutoLogin: goAutoLogin,
        EncodeAES: encodeAES,
        setAutoCheck: setAutoCheck,
        clickAutoCheck: clickAutoCheck,
        keydownLoginInput: keydownLoginInput,
        keyupPasswordInput: keyupPasswordInput,
        addClickEventOnSignIn: addClickEventOnSignIn,
    }

    function addClickEventOnSignIn() {

        //로그인
        $("#userId").off("keydown").on("keydown", keydownLoginInput);
        $("#password").off("keydown").on("keydown", keydownLoginInput);
        $("#password").off("keyup").on("keyup", keyupPasswordInput);
        $("#pwdViewBtn").off("mousedown mouseup").on({
            mouseup: CommonJoin.mouseupViewButton,
            mousedown: CommonJoin.mousedownViewButton,
        });
        $("#normalLoginButton").off("click").on("click", NormalLogin.clickNormalLoginButton);
        $("#googleLoginButton").off("click").on("click", GoogleLogin.clickGoogleLoginButton);
        $("#kakaoLoginButton").off("click").on("click", KakaoLogin.clickKakaoLoginButton);
        $("#appleLoginButton").off("click").on("click", AppleLogin.clickAppleLoginButton);
        $("#autoCheck").off("click").on("click", clickAutoCheck);
        $("#autoCheckLabel").off("click").on("click", clickAutoCheck);
        $("#bottomSection").off("click").on("click", clickBottomSection);

        //비밀번호재설정
        $("#findEmailInput").off("keydown").on("keydown", keyDownFindEmailInput);
        $("#findSubmit").off('click').on('click', sendPwdChangeEmail);
        $("#findBottomSection").off('click').on('click', clickFindBottomSection);
    }

    function clickBottomSection(e) {
        var $eTarget = $(e.target);

        var $idFind = $eTarget.findUp(".js-id-find");
        if ($idFind.length > 0) {
            Often.toast("info", "아직 준비중입니다!!");
            return;
        }

        var $passwordFind = $eTarget.findUp(".js-password-find");
        if ($passwordFind.length > 0) {
            var $passwordInput = $("#password");
            if($passwordInput.hasClass("bizplay")) {
                Often.submitForm("bizSetPwd", "https://www.bizplay.co.kr/comm_0023_01.act", "_self", {});
                return;
            }
            toggleLayer(true);
            $findEmailInput = $("#findEmailInput");
            $findEmailInput.focus();
        }
    }

    function clickFindBottomSection(e) {
        var $eTarget = $(e.target);

        var $signupText = $eTarget.findUp(".js-signup-text");
        if ($signupText.length > 0) {
            location.href = "/signup.act";
            return;
        }

        var $signinText = $eTarget.findUp(".js-signin-text");
        if ($signinText.length > 0) {
            toggleLayer(false);
        }
    }

    function toggleLayer(isPasswordFind) {
        var $findPassword = $("#findPassword");
        var $findEmailInput = $("#findEmailInput");
        $("#loginLayer").css("display", isPasswordFind ? "none" : "block");
        $findPassword.css("display", isPasswordFind ? "block" : "none");
        $findEmailInput.val($("#userId").val());
        $findEmailInput.removeClass('input-error')
        $findPassword.find(".js-password-alert").text("");
    }

    function keyDownFindEmailInput(event) {
        var isEnter = event.keyCode === 13;
        isEnter && sendPwdChangeEmail();
    }

    function keydownLoginInput(e) {

        var $eTarget = $(e.target);
        var $errorText = _IsMini ? $("#errorText") : $eTarget.parent().find(".error-text");

        if (Often.null2Void($errorText.text()) !== "") {
            clearError($eTarget);
            $errorText.text("");
            return;
        }

        if ('Enter' === e.key && !isErrorBeforeNormalLogin()) {
            NormalLogin.clickNormalLoginButton();
        }
    }

    function keyupPasswordInput(e) {
        var $eTarget = $(e.target);
        var isExistPassword = "" !== $eTarget.val();

        $("#pwdViewBtn").css("display", isExistPassword ? "block" : "none");
    }

    function clickAutoCheck(e) {
        if (_IsMini) return MiniLogin.clickMiniAutoCheck(e)
        $(e.currentTarget).toggleClass('auto-login-active');
        var isChecked = $(e.currentTarget).hasClass('auto-login-active');
        LocalUtil.setLocal("ONLY_AUTO_LOGIN_YN", isChecked ? "Y" : "N");
        Often.setCookie("autoLogin", isChecked);
    }

    function setAutoCheck() {
        var isAutoCheck = Often.getCookie("autoLogin");
        if (_IsMini) return MiniLogin.setMiniAutoCheck(isAutoCheck);
        $("#autoCheck").attr('class', 'auto-login-label' + (isAutoCheck ? ' auto-login-active' : ''));
    }

    function goLogin(passJson) {

        var isNormal = passJson.ID_GB === SignCode.TYPE.NORMAL;
        var isGoogle = passJson.ID_GB === SignCode.TYPE.GOOGLE;

        if (isNormal && isErrorBeforeNormalLogin()) return;
        Often.setCookie("googleLoginYn", isGoogle ? "Y" : "N");
        var deviceJson = Often.getDeviceJson(_CLIENT_IP);

        Ajax.executeApi(RestApi.GET.FLOW_CUR_TIME_R001, {}, function (dat) {
            Often.setCookie("DATE_TIME", dat['CUR_DTTM']);
            Ajax.executeApi(RestApi.GET.COLABO2_LOGIN_R003, $.extend({}, deviceJson, passJson, {
                packetOption: Ajax.OPTION.PREVENT_EXECUTE,
                PWD: encodeAES(passJson["PWD"], dat['CUR_DTTM']),
                SUB_DOM: Often.null2Void(SUB_DOM),
            }), function (dat) {
                if (isErrorAfterLogin(dat)) return;
                if (Often.null2Void(dat.AUTH_TYPE, "") !== "" && Often.null2Void(dat.AUTH_YN, "N") === "N") {
                    var authId = EmailAuth.getAuthId(dat);
                    if (authId === "") return;
                    EmailAuth.openAuthView(dat.USER_ID, authId, dat.AUTH_TYPE, false, successTwoFactor);
                    EmailAuth.setCounter(dat);
                    return;
                } else if (Often.null2Void(dat.AUTH_TYPE, "") === "" && _IsMini) {
                    // 로그인 수정필요
                    // loginOnGware(dat, passJson);
                    // return;
                }
                _IsMini && Often.setCookie("MINI_USER_ID", passJson.USER_ID, 30 * 12);
                createAutoLoginKey(passJson.USER_ID);
                moveMainPage();
            })
        })
    }

    function goAutoLogin() {

        var isElectron = Electron.isElectronApp();
        var autoLoginKey = Often.getCookie((isElectron? "mini" : "") + "flowLogin");
        var isAutoLogin = ("" !== autoLoginKey);
        var autoLoginKeyJson = splitAutoLoginKey(autoLoginKey);

        if ((ServerChecker.isSeco && Seco.is("LIMIT_AUTO_LOGIN")) || !isAutoLogin || Object.keys(autoLoginKeyJson).length === 0) return;

        Ajax.executeApi(RestApi.GET.COLABO2_AUTO_LOGIN_R002, autoLoginKeyJson, function (dat) {
            var isIncorrectRandkey = (dat.RESULT_CODE === "0001");
            if (isIncorrectRandkey) return Often.toast("error", i18next.t('front.alert.error'));
            moveMainPage()
        });
    }

    function isErrorBeforeNormalLogin() {
        var checkJson = Validation.checkInput($("#loginForm input"));
        var errorObj = checkJson.errorObj;
        $(".error-text").text("");
        if (Object.keys(checkJson).length === 0) return false;
        if (_IsMini) {
            $("#errorText").attr('data-error-code', checkJson.errorCode).text(checkJson.errorMessage);
            createError(errorObj);
            return true;
        }
        errorObj.parent().find(".error-text").text(checkJson.errorMessage);
        createError(errorObj);
        return true;
    }

    function isErrorAfterLogin(dat) {
        var $errorInput;
        var errorCode = Often.null2Void(dat['ERR_CD'], "0");
        if (errorCode === SignCode.ERROR.NO_PROBLEM) return false;

        if (subDomainError(errorCode)) return true;

        var isErrorId = errorCode === SignCode.ERROR.NOT_EXISTS_ID || errorCode === SignCode.ERROR.ID_ERROR;
        $errorInput = (isErrorId ? $("#userId") : $("#password"));
        createError($errorInput);

        var $errorText = _IsMini ? $("#errorText") : $errorInput.parent().find(".error-text");

        if (errorCode === SignCode.ERROR.ACCOUNT_LOCKED) {
            $errorText.text(i18next.t('front.alert.accountLocked'));
            return true;
        }

        if(errorCode === SignCode.ERROR.BIZPLAY_PASSWORD_ERROR){
            $errorInput.addClass("bizplay");
        } else {
            $errorInput.removeClass("bizplay");
        }

        if (Number(errorCode) > 0) {
            $errorText.text(Often.null2Void(dat['ERR_MSG'], $errorInput.attr("data-login-err-msg")))
                .attr('data-error-code', errorCode);
            return true;
        }

        $errorText.text($errorInput.attr("data-login-err-msg")).attr('data-error-code', errorCode);
        return true;
    }

    function createError(targetObj) {
        if (_IsMini) return MiniLogin.createMiniError(targetObj);
        targetObj.addClass("input-error").focus();
    }

    function clearError($eTarget) {
        if (_IsMini) return MiniLogin.clearMiniError($eTarget);
        $eTarget.removeClass("input-error");
    }

    function subDomainError(errorCode) {
        if (SUB_DOM === "") return false;
        if (errorCode === SignCode.ERROR.WAIT_JOIN) {
            $(".js-link-home").css("display", "none");
            $("#waitJoinLayer").css("display", "block");
            return true;
        }

        if (errorCode === SignCode.ERROR.REJECT_JOIN) { // 회사 가입 거절 시, 화면 작업 이전 임시 처리
            Often.toast("error", "참여 거절 되었습니다. 관리자에게 다시 초대 요청 하시기 바랍니다.");
            return true;
        }

        if (errorCode === SignCode.ERROR.NOT_EXISTS_DOMAIN) { //해당 도메인 사용자 없음
            Often.toast("error", "해당 도메인의 사용자가 존재하지 않습니다.");
            return true;
        }
    }

    function moveMainPage() {
        var pageUrl = (_IsMini ? "miniMain.act" : "main.act");
        Often.submitForm("invite_form", pageUrl, "_self", {
            INVT_KEY: CONNECT_INVITE_KEY,
            T_COLABO_SRNO: CONNECT_PROJECT_SRNO,
            T_COLABO_COMMT_SRNO: CONNECT_POST_SRNO,
            T_COLABO_REMARK_SRNO: CONNECT_REMARK_SRNO,
            SUB_DOM: SUB_DOM,
        })
    }

    function createAutoLoginKey(userId) {
        var isAutoCheck = "Y" === LocalUtil.getAutoLogin();
        var isElectron = Electron.isElectronApp();

        if (!isAutoCheck) {
            Often.setCookie((isElectron ? "mini" : "") + "flowLogin", "");
            return;
        }

        Ajax.executeApi(RestApi.GET.COLABO2_AUTO_LOGIN_R001, {
            USER_ID: userId,
            OBJ_CNTS_NM: (isElectron ? "desktop" : "")
        }, function (dat) {
            Often.setCookie((isElectron ? "mini" : "") + "flowLogin", userId + "|" + dat.RAND_KEY, 30 * 12);
        })
    }

    function encodeAES(plainText, currentDate) {
        var key = "aes256-global-flow";
        GibberishAES.size(256);
        return GibberishAES.aesEncrypt(plainText, key + Often.null2Void(currentDate, "00000000000000"));
    }

    function splitAutoLoginKey(autoLoginKey) {
        var isElectron = Electron.isElectronApp();
        if (autoLoginKey && autoLoginKey.indexOf("|") > -1) {
            var autoLoginKeyArray = autoLoginKey.split("|");
            var isExistsKey = (autoLoginKeyArray.length === 2 &&
                "" !== Often.null2Void(autoLoginKeyArray[0]) &&
                "" !== Often.null2Void(autoLoginKeyArray[1]))
            return isExistsKey && {
                USER_ID: autoLoginKeyArray[0],
                RAND_KEY: autoLoginKeyArray[1],
                OBJ_CNTS_NM: (isElectron ? "desktop" : "")
            }
        }
        return {}
    }

    function sendPwdChangeEmail() {
        var $pwdAlertText = $("#findPassword").find(".js-password-alert");

        var findEmailVal = $.trim($findEmailInput.val());
        Ajax.executeApi(RestApi.GET.COLABO2_PWD_R001, {USER_ID: findEmailVal, RENEWAL_YN: "Y"}, function (dat) {
            if (Often.null2Void(dat.ERR_CD, "") !== "0000") {
                var errText = dat.ERR_CD === "2001" ?
                    "일치하는 아이디 정보가 없습니다. 다시 확인해주세요." : dat.ERR_CD;
                $pwdAlertText.html(Often.null2Void(dat.ERR_MSG, errText));
                $findEmailInput.focus();
                $findEmailInput.addClass('input-error');
                return;
            }
            $pwdAlertText.empty();
            $findEmailInput.removeClass('input-error');
            Often.toast("success", i18next.t('front.alert.checkPasswordEmail'))
        });
    }

    function successTwoFactor() {
        var userId = $.trim($("#userId").val());
        var password = $.trim($("#password").val());
        var isElectron = Electron.isElectronApp();
        goLogin({
            USER_ID: userId,
            PWD: password,
            ID_GB: SignCode.TYPE.NORMAL,
            ENCRYPT_YN: SignCode.ENCRYPT.SERVER_TIME_CHECK,
            OBJ_CNTS_NM: (isElectron ? "desktop" : "")
        })
    }

    function loginOnGware(dat, passJson) {
        var pageUrl = "miniMain.act";
        var gwareUrl = Often.null2Void(dat.GWARE_URL, "");
        var rndKey = Often.null2Void(dat.RNDKEY, "");
        Often.setCookie("flowGwareUrl", gwareUrl, 30 * 12); // 30일 * 12월 = 1년.
        Often.setCookie("flowRndkey", rndKey, 30 * 12); // 30일 * 12월 = 1년.

        if (Often.getLocOrigin().indexOf("talk") > -1) {
            if (Often.null2Void(dat.FLOW_URL, "").indexOf(location.host) > -1) {
                pageUrl = "miniMain.act";
            } else {
                Often.setCookie("miniAddr", Often.null2Void(dat.FLOW_URL, "").replace("/MGateway", "")
                    + "/miniSignIn.act", 30 * 12 * 10);
                pageUrl = Often.null2Void(dat.FLOW_URL, "").replace("/MGateway", "") + "/miniSignIn.act";
            }
        }

        Often.submitForm("gtalk_form", pageUrl, "_self", {
            GWARE_URL: gwareUrl,
            RNDKEY: rndKey,
            USER_ID: passJson["ID"],
            PWD: passJson["PWD"],
        })
    }

})()
var EmailAuth = (function () {

    var $emailAuthLayer, $openedAuthLayer;
    var _userId, _authId, _authType, deviceJson, successCallback, isGuest, isClosed, timer, isExpired;

    return {
        openAuthView: openAuthView,
        getAuthId: getAuthId,
        sendToServer: sendToServer,
        setCounter: setCounter
    }

    //회원가입일시 이메일로 인증번호를 보낸다.
    //로그인 시 인증 메일 두번 가기 때문에 분리
    function openAuthView(userId, authId, authType, isUserGuest, callback) {

        setAuthValue();
        PopupDraw.drawAuth({
            await: true,
            contents: {
                title: '인증번호 입력',
                main: getAuthIdText(),
                id: "authCounter",
            },
            callback: {
                submit: confirmAuth,
                close: closeAuthView
            }
        });
        $("#tempPopup #authInput").off("keyup").on("keyup", keyupAuthInput).val("");
        $("#tempPopup #resendAuth").off("click").on("click", resendAuthToEmail);

        function setAuthValue() {
            _userId = userId;
            _authId = authId;
            _authType = authType;
            successCallback = callback;
            deviceJson = Often.getDeviceJson((isEmptyClientIp() ? "" : _CLIENT_IP));
            isGuest = isUserGuest;
            $emailAuthLayer = $("#emailAuthLayer");
        }
    }

    function sendToServer(userId, authId, authType, isUserGuest, callback) {
        var tempPopup = $('#tempPopup');
        var isOpened = tempPopup.length !== 0;
        if(isOpened) {
            tempPopup.find('#authInput').val("");
            clearInterval(timer);
        } else {
            openAuthView(userId, authId, authType, isUserGuest, callback);
        }

        Ajax.executeApi(RestApi.GET.FLOW_AUTH_NO_CHECK_R002, $.extend({}, deviceJson, {
            "USER_ID": _userId,
            "EML": _authId,
            "AUTH_TYPE": _authType,
        }), function (dat) {
            setCounter(dat);
        })
    }

    function setCounter(dat) {
        $openedAuthLayer = $("#tempPopup .auth-popup");

        var authLimitMinutes = Often.null2Void(dat.AUTH_TIME_MM, "3");
        var $authCounter = $openedAuthLayer.find("#authCounter");
        $authCounter.text(authLimitMinutes + ":00").attr('data-auth-limit-minutes', authLimitMinutes);
        startCounter($authCounter, authLimitMinutes);
        var isDevAuth = ("" !== Often.null2Void(dat.AUTH_NO));
        if (isDevAuth && Often.isServerModeByHost("ALL_TEST") &&
            _userId.indexOf("@yopmail.com") > -1 && _userId.indexOf("test") > -1) {
            Often.toast("info", "테스트 서버이면서 XXtestXX@yopmail.com 도메인일 경우 1초 뒤에 자동으로 인증번호가 채워집니다.");
            setTimeout(function () {
                $openedAuthLayer.find("#authInput").val(dat.AUTH_NO);
                $emailAuthLayer.find(".confirm-button").addClass("on");
            }, 900);
        }
    }

    function getAuthIdText() {
        var authIdText = "";
        if (_authType === "E") {
            authIdText = _authId.substr(0, _authId.indexOf("@") - 2) + "**" + _authId.substr(_authId.indexOf("@"));
        } else if (_authType === "H") {
            authIdText = Profile.convertClphNo(_authId).replace(/ /gi, "-");
            if(authIdText.length > 2) authIdText = authIdText.substr(0, authIdText.length - 2) + "**";
        }
        return authIdText;
    }

    function resendAuthToEmail() {
        deleteErrorMessage();
        sendToServer(_userId, _authId, _authType, isGuest, successCallback);
        $("#tempPopup #authInput").focus();
    }

    function isEmptyClientIp() {
        return (isGuest || ServerChecker.isKtWorks || ServerChecker.isKtFlow || (ServerChecker.isKtWorks && KtWorks.isLoginPage));
    }

    function closeAuthView() {
        deleteErrorMessage();
        isClosed = true;
        PopupDraw.closePopup();
    }

    function deleteErrorMessage() {
        $openedAuthLayer.find("#unValidAuth").css("display", "none");
        $openedAuthLayer.find("#resendAuth").css("display", "none");
    }

    function keyupAuthInput(e) {
        if(KeyCheck.isKey(e, "ENTER")) return confirmAuth();
        var input = e.target.value;
        warningNumericOnly(input)
        if (input.length === 6) $openedAuthLayer.find(".confirm-button").addClass("on")
        else $emailAuthLayer.find(".confirm-button").removeClass("on");
    }

    function confirmAuth() {
        var authInputVal = $openedAuthLayer.find("#authInput").val();
        if (authInputVal === "" || authInputVal.length !== 6) {
            Often.toast("error", "인증번호를 입력하시기 바랍니다.");
            return;
        }

        Ajax.executeApi(RestApi.GET.FLOW_AUTH_NO_CHECK_R001, $.extend({}, deviceJson, {
            USER_ID: _userId,
            AUTH_NO: authInputVal,
            AUTH_TIME_MM: $("#authCounter").attr("data-auth-limit-minutes")
        }), function (dat) {
            if ("0000" !== Often.null2Void(dat.RSLT_CD)) {
                $openedAuthLayer.find("#unValidAuth").css("display", isExpired? "none" : "inline-block");
                $openedAuthLayer.find("#resendAuth").css("display", "inline-block");
                return;
            }

            if (typeof successCallback === "function") {
                successCallback();
            }

            closeAuthView();
        })
    }

    function startCounter(targetObj, authLimitMinutes) {
        var end = new Date();
        end.setMinutes(end.getMinutes() + Number(authLimitMinutes));
        var _second = 1000;
        var _minute = _second * 60;
        var _hour = _minute * 60;
        $openedAuthLayer.find("#unValidAuth, #timeoutAuth, #resendAuth").css("display", "none");
        timer = setInterval(countInterval, 1000);
        targetObj.data("timer", timer);

        function countInterval() {
            var now = new Date();
            var distance = end - now;
            if (distance < 0) {
                isExpired = true;
                clearInterval(timer);
                $openedAuthLayer.find("#unValidAuth").css("display", "none");
                $openedAuthLayer.find("#timeoutAuth").css("display", "inline-block");
                $openedAuthLayer.find("#resendAuth").css("display", "inline-block");
                return;
            }
            if (isClosed) {
                clearInterval(timer);
                isClosed = false;
                return;
            }

            var minutes = Math.floor((distance % _hour) / _minute);
            var seconds = Math.floor((distance % _minute) / _second);
            if (seconds < 10) seconds = "0" + seconds;
            targetObj.text(minutes + ":" + seconds);
        }
    }

    function getAuthId(dat) {
        if (dat.AUTH_TYPE && dat.AUTH_TYPE === "E") return dat.EML;
        else if (dat.AUTH_TYPE && dat.AUTH_TYPE === "H") return dat.CLPH_NO;
        return "";
    }

    /**
     * 숫자 이외의 문자를 적었을때 경고 메세지 출력
     * @param input 사용자가 입력한 값
     */
    function warningNumericOnly(input) {
        if (isIntegerOnly(input)) {
            $openedAuthLayer.find("#noneNumericAuth").css("display", "none");
        } else {
            $openedAuthLayer.find("#noneNumericAuth").css("display", "inline-block");
            $openedAuthLayer.find("#authInput").val(rewriteAuthCode(input));
        }

    }

    /**
     * 숫자로 작성하다가 알파벳을 적었을 경우 마지막 글자만 삭제
     * 그렇지 않을 경우 (Copy & Paste로 간주하여 비움
     * @param input 사용자가 입력한 값
     * @returns {string} 숫자 판별하여 빈 값 또는 마지막 String 삭제한 값
     */
    function rewriteAuthCode(input) {
        var removedLastChar = input.slice(0,-1);
        return isIntegerOnly(removedLastChar) ? removedLastChar : "";
    }

    /**
     * 숫자만 허용할 수 있게 regex 검사
     * @param input 사용자가 입력한 값
     * @returns {boolean} 숫자만 있는지 없는지 확인 (숫자가 있을때 true)
     */
    function isIntegerOnly(input) {
        var regexp = /^[0-9]*$/
        return regexp.test(input);
    }

})()
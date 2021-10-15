var LockControl = (function () {

    var lockModeMin, lockModeYn;
    var lockTimeMins;
    var lockTimeoutID, mouseTimeoutID;
    var deviceId;
    var currentDateTime = 0;

    return {
        isLockMode: isLockMode,
        initSetting: initSetting,
        startLockModeAfterMinutes: startLockModeAfterMinutes,
    }

    function isLockMode() {
        return (location.hash === "lock");
    }

    function initSetting() {

        lockModeMin = LocalUtil.getLocalValue("ONLY_USER_SETTING", "LOCK_MODE_MIN");
        lockModeMin = Often.null2Void(lockModeMin) === "" ? "" : lockModeMin;

        if (Often.isServerModeByHost("DEV_TEST")) {
            // lockModeMin = 30; //테스트용 - 30분
        } else {

        }

        lockModeYn = LocalUtil.getLocalValue("ONLY_USER_SETTING", "LOCK_MODE_YN");
        lockModeYn = Often.null2Void(lockModeYn) === "" ? "N" : lockModeYn;
        ServerChecker.isMobis && (lockModeYn = Mobis.get("LOCK_MODE_YN"))
        ServerChecker.isHyundaicar && (lockModeYn = Hyundaicar.get("LOCK_MODE_YN"));

        if (Often.isServerModeByHost("DEV_TEST")) {
            // lockModeYn = "Y"; //테스트용
        } else {

        }

        var deviceId = LocalUtil.getDeviceId()
        LocalUtil.setLocal("ONLY_LOCK_MODE_MIN_" + deviceId, lockModeMin);
        LocalUtil.setLocal("ONLY_LOCK_MODE_YN_" + deviceId, lockModeYn);

        addMouseEventForUsingCheck();
    }

    function addMouseEventForUsingCheck() {

        lockTimeoutID && clearInterval(lockTimeoutID);
        mouseTimeoutID && clearTimeout(mouseTimeoutID);

        var $body = $("body");
        $body.off("mousemove").off("mouseleave")

        if (lockModeYn === "N") return;

        deviceId = LocalUtil.getDeviceId()
        setLockTime();

        $body.on({
            mousemove: function () {
                setMouseTimeOutId();
            },
            mouseleave: function () {
                setMouseTimeOutId();
                SocketControl.sendMessage({
                    CHAT_CODE: SocketAPI.COMM.MOUSE_MOVE,
                    ROOM_SRNO: _USER_ID,
                    DUID: deviceId,
                })
            }
        });

        //여러번의 마우스 인앤아웃 마지막 동작 시점 5초 후에 로직 태움.
        function setMouseTimeOutId() {
            var $toastPopup = $("#toastPopup.js-lock-timer");
            $toastPopup.fadeOut(200, function () {
                $toastPopup.remove();
            })
            setLockTime();
            lockTimeoutID && clearInterval(lockTimeoutID);
            mouseTimeoutID && clearTimeout(mouseTimeoutID);
            mouseTimeoutID = setTimeout(startLockModeAfterMinutes, 1000 * 5);
        }
    }

    function startLockModeAfterMinutes() {

        var TOAST_SEC = 60;

        lockTimeMins = (Number(LocalUtil.getLocal("ONLY_LOCK_MODE_MIN_" + deviceId))); //min => hours
        var lockTimeSec = TOAST_SEC * lockTimeMins;

        if (lockTimeoutID) {
            location.hash = "";
            currentDateTime = 0;
            clearInterval(lockTimeoutID);
        }

        var isTimerToast = false;
        lockTimeoutID = setInterval(function () {

            currentDateTime++;

            var remainTime = lockTimeSec - currentDateTime;
            if (Often.isFunc(Func.LOG.LOCK) && remainTime < TOAST_SEC && remainTime > 0) {
                var remainText = remainTime + "초 뒤에 잠금모드로 전환됩니다";
                if (isTimerToast) {
                    $("#toastPopup.js-lock-timer").find(".text").text(remainText);
                } else {
                    isTimerToast = true;
                    PopupDraw.drawToast({
                        type: "success",
                        msg: remainText,
                        sec: 100000, //임의값 : 100초 (다른 곳에서 컨트롤 됨)
                    })
                    $("#toastPopup").addClass("js-lock-timer")
                }
            }

            if (remainTime < 0) {
                //잠금모드 On
                $("#toastPopup.js-lock-timer").fadeOut(200);
                location.hash = "lock";
                SocketControl.sendMessage({
                    CHAT_CODE: SocketAPI.COMM.TEMP_LOGOUT,
                    ROOM_SRNO: _USER_ID,
                    DUID: deviceId,
                    MINS: lockTimeMins,
                })
                currentDateTime = 0;
                clearInterval(lockTimeoutID);
            }
        }, 1000);
    }

    //현재 시간으로 세팅
    function setLockTime() {
        LocalUtil.setLocal("ONLY_BASE_TIME_BY_LOCK_" + deviceId, Tz.momentConversion("current"));
    }

})()
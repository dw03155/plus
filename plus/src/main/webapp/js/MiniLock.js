var MiniLock = (function () {

    var $miniLockLayer;
    var mainWidthBefore, mainHeightBefore;
    var lockSec, electronLockSecValue;

    var miniLockMode = false;
    var isAutoLockSetting = false;
    var isFirstStop = false;
    var sec = 0;
    var timer = 0;

    var LockSec = {
        KIMCHANG_1: 60 * 30,
        BFLOW_210118174434: 60 * 60,
        SOIL_1: 300,
    }

    return {
        isLockMode : isLockMode,

        initLockData: initLockData,
        showLockLayer: showLockLayer,
        setLockState: setLockState,
    }

    function isLockMode(){
        return miniLockMode;
    }
    
    function initLockData() {
        isAutoLockSetting = Electron.getLockSettingValue("default");
        electronLockSecValue = Often.null2Void(Electron.getLockSettingValue("lockSec"),"10");
        setLockSecData();

        function setLockSecData() {
            if (ServerChecker.isKimchang) {
                isAutoLockSetting = true;
                lockSec = LockSec.KIMCHANG_1;
            } else if (_USE_INTT_ID === 'SOIL_1'){
                lockSec = LockSec.SOIL_1;
            } else if (_USE_INTT_ID === 'BFLOW_210118174434'){
                lockSec = LockSec.BFLOW_210118174434;
            } else {
                lockSec =  60 * electronLockSecValue;
            }
        }
    }
    
    function startLockTimeCheck() {
        isFirstStop = false;
        timer = setInterval(function () {
            sec++;
            if(sec === 600) {
                MiniState.sendStatusSocket(ProfileState.OUT);
                MiniState.updateUserStateData(ProfileState.OUT);
            } else if (isAutoLockSetting && sec >= lockSec) {
                setLockState(true);
                showLockLayer();
                isFirstStop = true;
            }
        }, 1000);
    }

    /**
     * 
     * @param isLock true면 잠금모드상태 / false면 카운트 체킹상태
     */
    function setLockState(isLock) {
        if(isLock){
            sec = 0;
            isFirstStop = true;
            clearInterval(timer);
        } else {
            if(_USER_ID === "") return;
            /**
             * @Note. 10분 안움직여서 자리비움 되었다가 다시 움직여서 온라인되는 경우와
             *  직접 자리비움 지정하는 경우 등을 구분해야함. -> 상황별 기획 다시해서 전달주기로함 210719 장소이
             */
            // MiniState.sendStatusSocket(ProfileState.ONLINE);
            // MiniState.updateUserStateData(ProfileState.ONLINE);
            isFirstStop && startLockTimeCheck();
        }
    }

    function showLockLayer() {
        clearInterval(timer);

        MiniState.sendStatusSocket(ProfileState.OUT);
        MiniState.updateUserStateData(ProfileState.OUT);
        showElectronLock();
        Electron.lockScreen();
        miniLockMode = true;

        function showElectronLock(){
            $miniLockLayer = $("#miniLock");
            $miniLockLayer.css('display', 'block');
            setLockLayerData();
            initLockLayer();

            if(!Electron.getElectronConfig().b_fullMode){
                $('#miniLeft, #miniWrap').css('display', 'none')
                var config = Electron.getElectronConfig();
                mainWidthBefore = config.mainMiniWindowWidth;
                mainHeightBefore = config.mainMiniWindowHeight;
                Electron.setWindowMinSize(380, 600, 'logout');
            } else {
                $('#allMainContent').css('display', 'none')
            }
        }
    }

    function setLockLayerData() {
        $('.mini-lock-profile').css('background-image', 'url(' + ImageUtil.removeDomain("PROFILE", _PRFL_PHTG) + ')')
        $('.mini-lock-userNm').text(_USER_NM)
    }

    function initLockLayer() {
        var $miniPassInput = $miniLockLayer.find("#miniPassInput");
        $miniPassInput.val("").off("keyup").on("keyup", lockKeyUpEvent);
        $miniLockLayer.off("click").on("click", lockClickEvent);
        $("#pwdViewBtn").off("mousedown mouseup").on({
            mouseup: mouseupViewButton,
            mousedown: mousedownViewButton,
        });

        function mousedownViewButton() {
            $miniPassInput.attr('type', 'text');
        }

        function mouseupViewButton() {
            $miniPassInput.attr('type', 'password');
        }
    }

    function lockKeyUpEvent() {
        var isEnterKey = event.keyCode === 13;
        if (isEnterKey) {
            unLockScreen();
            return;
        }
        var $miniPassInput = $miniLockLayer.find("#miniPassInput");
        var isExistPassword = $miniPassInput.val().length > 0
        $("#pwdViewBtn").css("display", isExistPassword ? "block" : "none");
        if (isExistPassword) $miniPassInput.removeClass("mini-mode-alert-color-1");
    }

    function lockClickEvent() {
        var $eTarget = $(event.target);
        if (isConfirmBtnAndAction($eTarget)) return;
        if (isLogoutBtnAndAction($eTarget)) return;
    }

    function isConfirmBtnAndAction($eTarget) {
        var $miniConfirmBtn = $eTarget.findUp('#miniConfirmBtn')
        if ($miniConfirmBtn.length === 0) return false;
        unLockScreen();
        return true;
    }

    function isLogoutBtnAndAction($eTarget) {
        var $miniLockLogoutBtn = $eTarget.findUp('#miniLockLogoutBtn')
        if ($miniLockLogoutBtn.length === 0) return false;
        Often.tryLogout();
        return true;
    }

    function lockPwdErrorCheck() {
        var $miniPassInput = $("#miniPassInput");
        var checkJson = Validation.checkInput($miniPassInput);
        var errorObj = checkJson.errorObj;
        if (Object.keys(checkJson).length === 0) return false;
        $("#miniLockErrorMsg").attr('data-error-code', checkJson.errorCode).text(checkJson.errorMessage);
        createPwdError(errorObj);
        $miniPassInput.addClass("mini-mode-alert-color-1");
        return true;
    }

    function createPwdError(errorObj) {
        errorObj.addClass('mini-mode-alert-color-1').focus();
    }

    function unLockScreen() {
        var $miniPassInput = $('#miniPassInput')

        if (lockPwdErrorCheck()) return;

        var _SECO_CD = Often.getCookie('SECO_COMPANY_CODE');
        var _DUID = LocalUtil.getDeviceId();
        var _ID_GB = Often.null2Void(Often.getCookie("_ID_GB"), "4");
        var loginValue = {
            "ID_GB": _ID_GB,
            "PWD": $.trim($miniPassInput.val()),
            "USER_NM": "",
            "PRFL_PHTG": "",
            "EMAIL": "",
            "SUB_DOM": "",
            "CMPN_CD": _SECO_CD,
            "DUID": _DUID,
            "OBJ_CNTS_NM": "desktop",
        }

        Ajax.executeApi(RestApi.GET.COLABO2_LOGIN_R003, loginValue, function (dat) {
            if (dat.ERR_MSG !== null && dat.ERR_MSG !== '' && dat.ERR_CD !== '0000') {
                showErrorText(dat.ERR_MSG.substr(0, 17));
                return;
            }
            if(_IsMini) window.resizeTo(mainWidthBefore, mainHeightBefore);
            location.href = location.origin + (_IsMini? "/miniMain.act" : "/main.act");
            miniLockMode = false;
            Electron.unLockScreen();
        })

        function showErrorText(msg) {
            var $miniLockErrorMsg = $('#miniLockErrorMsg')
            $miniLockErrorMsg.css('display', 'inline-block').text(msg);
            $miniLockLayer.find("#miniPassInput").addClass("mini-mode-alert-color-1");
        }
    }
})();
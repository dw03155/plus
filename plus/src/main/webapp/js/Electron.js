var Electron = (function () {

    return {
        getVersion: getVersion,
        isElectronApp: isElectronApp,
        initSetting: initSetting,
        logout: logout,
        focusBrowser: focusBrowser,
        getElectronConfig: getElectronConfig,
        getElectronName: getElectronName,

        openWindow: openWindow,
        openGoogleSignIn: openGoogleSignIn,
        openElectronMessenger: openElectronMessenger,
        openElectronProject: openElectronProject,
        openGoogleDrivePost: openGoogleDrivePost,
        openMiniSettingMenu: openMiniSettingMenu,
        openExternalLinkforElectron: openExternalLinkforElectron,
        openExternalLink: openExternalLink,
        openDropbox: openDropbox,

        setWindowState: setWindowState,
        setWindowMinSize: setWindowMinSize,
        setWindowSize: setWindowSize,

        downloadFile: downloadFile,
        downloadFileForChat: downloadFileForChat,

        changeProjectWindowView: changeProjectWindowView,
        electronSettingChangeDetection: electronSettingChangeDetection,

        powerMonitorResume: powerMonitorResume,
        powerMonitorOffline: powerMonitorOffline,
        powerMonitorUnlock: powerMonitorUnlock,

        showNoti: showNoti,
        hideNoti: hideNoti,
        showDenyNoti: showDenyNoti,
        showModalMenu: showModalMenu,

        lockScreen: lockScreen,
        unLockScreen: unLockScreen,
        getLockSettingValue: getLockSettingValue,

        showVersionLimit: showVersionLimit,
    }

    function openDropbox() {
        try {
            var isRoomSrnoExist = typeof _ROOM_SRNO != "undefined";
            openDesktopDropbox(isRoomSrnoExist ? _ROOM_SRNO : "");
        } catch (e) {

        }
    }


    function showVersionLimit() {
        if (!isElectronApp()) return;
        if (!Often.isFunc(Func.CLOUD.STOP_FLOWNEW)) return;

        if (getElectronName().indexOf('new') > -1) {
            Company.drawServiceBlock(BLOCK_TYPE.STOP_FLOWNEW, function () {
                DownloadApp.desktopDownload();
                window.close();
            }, '');
            $("#tempPopup").addClass("serviceStop");
        }
    }


    function openExternalLink(url) {
        try {
            fn_openExternalLinkforElectron(url)
        } catch (e) {
            Often.toast('error', i18next.t('front.alert.errorTryAgain'));
        }
    }

    function lockScreen() {
        try {
            fn_lockScreenOnForElectron();
        } catch (e) {
            Often.toast('error', i18next.t('front.alert.errorTryAgain'));
        }
    }

    function unLockScreen() {
        try {
            fn_lockScreenShowForElectron();
        } catch (e) {
            Often.toast('error', i18next.t('front.alert.errorTryAgain'));
        }
    }

    function getLockSettingValue(state) {
        try {
            return fn_lockScreenSettingStateForElectron(state);
        } catch (e) {
            Often.toast('error', i18next.t('front.alert.errorTryAgain'));
        }
    }

    /**
     * @description  잠금모드 : MiniLock.showLockLayer();
     *               로그아웃 : Often.tryLogout();
     */
    function openMiniSettingMenu() {
        try {
            fn_openContextMenuForElectron("set");
        } catch (e) {
            Often.toast('error', i18next.t('front.alert.errorTryAgain'));
        }
    }

    function openExternalLinkforElectron(url, name) {
        try {
            fn_openExternalLinkforElectron(url);
        } catch (e) {
            window.open(url, name);
        }
    }

    /**
     * @description 프로젝트 윈도우를 열려고 할 때, 이미 윈도우가 켜져있을때는 electron 로직에서 이 함수를 실행시킴.
     */
    function changeProjectWindowView(projectSrno, postSrno, remarkSrno) {
        if (projectSrno) ViewChanger.loadPageJson({
            code: 'detail',
            first: projectSrno,
        });
        if (postSrno) {
            PostPopup.togglePostView(projectSrno, postSrno, remarkSrno, null, true);
        }
    }

    function electronSettingChangeDetection(config) {
        LocalUtil.setLocalValue("ONLY_USER_SETTING", "LOCK_MODE_MIN", config[4]['val']);
        LockControl.initSetting();
    }

    //PC 잠금모드시 Windows/Mac
    //절전모드시 Windows/Mac
    function powerMonitorOffline() {
        MiniState.sendStatusSocket(ProfileState.OFFLINE);
        MiniState.updateUserStateData(ProfileState.OFFLINE);
    }

    //PC 잠금모드 해제시 Windows/Mac
    function powerMonitorUnlock() {
        Chatting.drawTopNotReadCount();
        MiniLeft.setProjectBadgeCount();
        MiniState.sendStatusSocket(ProfileState.ONLINE);
        MiniState.updateUserStateData(ProfileState.ONLINE);
    }

    //절전모드해제시 Windows/Mac
    function powerMonitorResume() {
        if (SocketControl.getSocket().connected) location.reload();
        Chatting.drawTopNotReadCount();
        MiniLeft.setProjectBadgeCount();
        MiniState.updateUserStateData(ProfileState.ONLINE);
        SocketControl.isDisconnectAndConnect('powerMonitorResume', {}, function () {
            MiniState.sendStatusSocket(ProfileState.ONLINE);
        });
        if ($("#miniChatting").is(":visible")) MiniLeft.movePage('Chatting') && MiniLeft.setSearchMode('Chatting')
        else if ($("#miniProject").is(":visible")) MiniLeft.movePage('Project') && MiniLeft.setSearchMode('Project')
    }

    function focusBrowser() {
        try {
            fn_browserFocusForElectron();
        } catch (e) {
            Often.toast('error', i18next.t('front.alert.errorTryAgain'));
        }

    }

    function getElectronConfig() {
        try {
            var config = fn_getConfigsForElectron();
            return config;
        } catch (e) {
            Often.toast('error', i18next.t('front.alert.errorTryAgain'));
        }
    }

    function getElectronName() {
        try {
            return fn_ElectronNameCheck();
        } catch (e) {
            //pass
        }
    }

    function showNoti(roomSrno) {
        try {
            fn_browserNotificationForElectron(roomSrno && roomSrno !== 'noti_post' ? ("POPUP_CHAT_" + roomSrno) : "MAIN");
        } catch (e) {
            Often.toast('error', i18next.t('front.alert.errorTryAgain'));
        }
    }

    function hideNoti(roomSrno) {
        try {
            fn_browserNotificationOffForElectron(roomSrno ? ("POPUP_CHAT_" + roomSrno) : "MAIN");
        } catch (e) {
            Often.toast('error', i18next.t('front.alert.errorTryAgain'));
        }
    }

    function showDenyNoti(param) {
        try {
            if (Notification.permission === 'denied') {
                fn_browserCustomNotificationForElectron("cnpl", param);
            }
        } catch (e) {
            Often.toast('error', i18next.t('front.alert.errorTryAgain'));
        }
    }

    /**
     *
     * @param menuGubun         메뉴구분 (모달의 id와 동일하게 설정. 일렉트론에서 해당 아이디의 메뉴를 보여줌)
     * @param modalInitParam    모달의 위치/크기 설정값
     * @param modalValue        모달에서 기능에 필요한 부서코드/id 등 넘김
     */
    function showModalMenu(menuGubun, modalInitParam, modalValue) {
        try {
            fn_showModalMenuForElectron(menuGubun, modalInitParam, modalValue);
        } catch (e) {
            Often.toast('error', i18next.t('front.alert.errorTryAgain'));
        }
    }

    function getVersion() {
        return LocalUtil.getLocal("ONLY_ELECTRON_VER");
    }

    function isElectronApp() {
        return LocalUtil.getElectronYn() === "Y";
    }

    function logout(dat) {
        _IsMini && location.replace(Often.null2Void(dat['REDIRECT_URI'], '/miniSignIn.act'));
        fn_logoutForElectron()
        menuVisibleValue({
            logoutMenuVisible: false,
            lockMenuVisible: false,
            windowModeVisible: false,
        })
    }

    function menuVisibleValue(settingJson) {
        try {
            var electronMenuOptions = $.extend({}, {
                code: "MENU0001",
                userId: Often.null2Void(_USER_ID, ''),
            }, settingJson);
            fn_sendValueForElectron(electronMenuOptions);
        } catch (e) {
            Often.toast('error', i18next.t('front.alert.errorTryAgain'));
        }
    }

    function openElectronMessenger(url, target, w, h, l, t) {
        try {
            fn_chatOpenForElectron(url, target, w, h, l, t);
        } catch (e) {
            Often.toast('error', i18next.t('front.alert.errorTryAgain'));
        }
    }

    /**
     * 플로우로 이동
     * @param colaboSrno {String} 프로젝트 번호
     * @param [colaboCommtSrno] {String} 게시물 번호
     * @param [colaboRemarkSrno] {String} 댓글 번호
     * @param [isInit] {boolean} 첫 minimain 로드시 / 플젝윈도우 없는 상태로 잠금 후 다시 unlock 할때 true
     */
    function openElectronProject(url, colaboSrno, colaboCommtSrno, colaboRemarkSrno, l, t, isInit) {
        try {
            fn_openProjectForElectron(url, colaboSrno, colaboCommtSrno, colaboRemarkSrno, l, t, isInit);
        } catch (e) {
            Often.toast('error', i18next.t('front.alert.errorTryAgain'));
        }
    }

    function openWindow(url, target, w, h, l, t) {
        try {
            fn_windowOpenForElectron(url, target, w, h, l, t);
        } catch (e) {
            Often.toast('error', i18next.t('front.alert.errorTryAgain'));
        }
    }

    function openGoogleSignIn(url, target) {
        var left = (window.screenLeft + ($(window).width() - 600) / 2);
        var top = (window.screenTop + ($(window).height() - 600) / 2);
        try {
            fn_openGoogleSignInForElectron(url, target, 600, 600, left, top);
        } catch (e) {
            Often.toast('error', i18next.t('front.alert.errorTryAgain'));
        }
    }

    function openGoogleDrivePost(token) {
        try {
            fn_googleDrivePostForElectron(token);
        } catch (e) {
            Often.toast('error', i18next.t('front.alert.errorTryAgain'));
            window.close();
        }
    }

    function setWindowState(menu) {
        try {
            fn_openContextMenuForElectron(menu);
        } catch (e) {
            Often.toast('error', i18next.t('front.alert.errorTryAgain'));
        }
    }

    /**
     *
     * @param mode 'logout' mode인 경우는 setResizable false 처리됨.
     */
    function setWindowMinSize(width, height, mode) {
        try {
            windowMinResizeForElectron(width, height, mode);
        } catch (e) {
            Often.toast('error', i18next.t('front.alert.errorTryAgain'));
        }
    }

    function setWindowSize(target, width, height, x, y) {
        try {
            popupResizeForElectron(target, width, height, x, y);
        } catch (e) {
            Often.toast('error', i18next.t('front.alert.errorTryAgain'));
        }
    }

    function setWindowSize(target, width, height, x, y) {
        try {
            popupResizeForElectron(target, width, height, x, y);
        } catch (e) {
            Often.toast('error', i18next.t('front.alert.errorTryAgain'));
        }
    }

    function downloadFile(filePath, fileName, fileSize) {
        try {
            fn_fileDownloadForElectron(filePath, fileName, fileSize);
        } catch (e) {
            Often.toast('error', i18next.t('front.alert.errorTryAgain'));
        }
    }

    function downloadFileForChat(filePath, fileName, fileSize, roomSrno) {
        try {
            fn_chatFileDownloadForElectron(filePath, fileName, fileSize, roomSrno);
        } catch (e) {
            Often.toast('error', i18next.t('front.alert.errorTryAgain'));
        }
    }

    /**
     *
     * @param isLoginState  true면 로그인된 상태 / false면 로그아웃상태
     */
    function initSetting(isLoginState) {

        //1.오토업데이트체크
        //2.로컬밸류세팅
        //3.메뉴제어
        //4.잠금모드체크
        //5.네브바 노출

        if (!isElectronAvailable()) {
            LocalUtil.setLocal("ONLY_ELECTRON_YN", "N");
            LocalUtil.removeLocal("ONLY_ELECTRON_VER");
            return;
        }

        var userIdByCookie = Often.getCookie("MINI_USER_ID");
        if(userIdByCookie !== ""){
            $("#userId").val(userIdByCookie);
            $("#password").focus();
        }

        if (Often.getCookie("2.1.1") !== "Y") {
            Often.setCookie("2.1.1", "Y", 30 * 12);
            try {
                autoUpdateOnForElectron();
            } catch (e) {
                Often.toast('error', i18next.t('front.alert.errorTryAgain'));
            }
        }

        !Often.isMessenger() && menuVisibleValue({
            logoutMenuVisible: isLoginState,
            lockMenuVisible: isLoginState  && _USE_INTT_ID.indexOf("KAKAO") === -1 && _USE_INTT_ID.indexOf("APPLE") === -1 && _USE_INTT_ID.indexOf("GMAIL") === -1,   //소셜로그인x
                // && StatusCode.UN_BFLOW.GUEST !== LocalUtil.getLocalValue("ONLY_BUY_SETTING", "STTS")    //게스트x
            windowModeVisible: isLoginState,
            serverMenuVisible: (ServerChecker.isMadras || Often.isServerModeByHost("DEV_TEST"))
        })

        if (ServerChecker.isSeco || ServerChecker.isZoomok) {
            $('body').off('mouseenter mouseleave mousedown keypress').on('mouseenter mouseleave mousedown keypress', function () {
                MiniLock.setLockState(true);
            });
        }

    }

    function isElectronAvailable() {
        try {
            var electronVersion = Often.null2Void(fn_ElectronVersionCheck(), '1_1_7');
            LocalUtil.setLocal("ONLY_ELECTRON_VER", electronVersion);
            LocalUtil.setLocal("ONLY_ELECTRON_YN", "Y");
            return true
        } catch (e) {
            return false
        }
    }

    function clickNaviBar() {

    }

})()
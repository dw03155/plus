$(document).ready(function () {

    Often.setCookie("RENEWAL_MAINTAIN", "Y", 30 * 12 * 10);

    Internationalization.initSetting(function () {

        SocketControl.connectSocket(Secure.preventOverlapLogin);
        SearchFilter.initTongSearchMemory();

        BaseSetting.setUserSetting(function () {
            InvitePopup.checkInviteAndAction(function (isShowMainNotice) {
                ViewChanger.loadFirstPage();
                !ViewChanger.isPage("main") && AlarmUpdate.drawTopNotReadCount();
                isShowMainNotice && BaseSetting.showMainNotice();
            });
            if (Electron.isElectronApp()) {
                MiniLock.initLockData()
            } else {
                LockControl.initSetting();
            }

            SentryMonitor.setExtra("LOCALSTORAGE", localStorage);
        });

        if (Electron.isElectronApp()) {
            MiniState.sendStatusSocket(ProfileState.ONLINE);
            MiniState.updateUserStateData(ProfileState.ONLINE);
            Electron.initSetting(true);
        }

        BaseSetting.setBuySetting(function (buyData) {
            Bottom.initSetting();
            Left.initView(); //간트 기능키 목록 불러온 이후 메뉴 활성화
            Company.initSetting(buyData);
            Electron.showVersionLimit();
            SlideNotice.drawRenewalSlideNotice();
            Func.init();
            Top.setRecommendEvent()
        });

        AllLabel.drawLeftLabelList();

        Chatting.drawTopNotReadCount();

        BrowserNoti.initSetting();
        MySettings.initSetting();
        FileUtil.initSetting();

        Search.fillTopSearchBar();
    });
})

$(window).load(function () {
    DocumentEvent.addEvent();
    Top.addClickEvent();
    Left.addClickEvent();
    Bottom.addClickEvent();
    ViewChanger.addBackEvent();
    Internationalization.languageCodeDebug();
    LinkControl.controlZendesk();
    Electron.isElectronApp() && ElectronEvent.addReloadMouseDownEvent();
    if (Electron.isElectronApp() && Often.isFunc(Func.CLOUD.ELECTRON_NAVI)) $('#electronNavi').removeClass('d-none');

    setTimeout(function () {
        ThirdPartyUtil.load("main");
        MonitorUtil.load();
    }, 1000)
})


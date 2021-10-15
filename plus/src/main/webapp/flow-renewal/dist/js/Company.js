var Company = (function () {

    var CompJson = {}

    return {
        initSetting: initSetting,
        getEndTimeComment: getEndTimeComment,
        drawServiceBlock: drawServiceBlock,
        controlPopup: controlPopup,
        test: function () {
            drawServiceBlock(BLOCK_TYPE.SERVICE_ADMIN, movePayPage, drawLogOutPopup);
            $("#tempPopup").addClass("serviceStop");
        }
    };

    function initSetting(dat) {
        setCompanyJson(dat);
        controlSetting(); //세팅
        controlButton();  //버튼
        controlTopBanner(); //상단배너
        controlPopup(); //팝업
    }

    function setCompanyJson(dat) {
        var buyCode = Often.null2Void(dat.BUY_YN, "N");
        var statusCode = Often.null2Void(dat.STTS, "N");
        var remainDate = Often.null2Void(dat.GRC_DT, "7");
        var userCnt = Number(Often.null2Void(dat.USER_CNT, "1"));

        CompJson.isBflow = (_USE_INTT_ID.indexOf("BFLOW_") === 0)
        CompJson.isUtlz = (_USE_INTT_ID.indexOf("UTLZ_") === 0)
        CompJson.isFlow = (_USE_INTT_ID.indexOf("FLOW_") === 0)
        CompJson.isGoogle = (_USE_INTT_ID.indexOf("GMAIL_") === 0)
        CompJson.isAvailableService = (Often.null2Void(dat.USE_YN, "Y") === "Y");
        CompJson.isManager = (Often.null2Void(dat.MNGR_DSNC, "N") === "Y");
        CompJson.isDailyOnce = (Often.isServerModeByHost("DEV_TEST") || (Often.null2Void(dat.DAILY_INIT_YN, "N") === "Y"));
        CompJson.isDvsnTree = (Often.null2Void(dat.DVSN_TREE_YN, "N") === "Y");
        CompJson.isCardBanner = (Often.null2Void(dat.CARD_BANNER_YN, "N") === "Y");
        CompJson.isSerp = (Often.null2Void(dat.SERP_YN, "N") === "Y");


        CompJson.buyCode = buyCode;
        CompJson.statusCode = statusCode;
        CompJson.remainDate = remainDate;
        CompJson.userCnt = userCnt;

        LocalUtil.setLocalJson('ONLY_COMPANY_JSON', CompJson);
        SentryMonitor.setExtra("COMPANY_INFO", CompJson);
    }

    function controlButton() {
        //회사 공개 프로젝트, 서비스 업그레이드, 관리자설정, 직원초대
        var isPaidCompany = CompJson.buyCode === BuyCode.PAID_COMPANY;
        var isFreelancer = CompJson.buyCode === BuyCode.FREELANCER;
        var isLeftControl = {
            'open': (isPaidCompany),
            'service-upgrade': (!isPaidCompany && !isFreelancer),
            'manager-admin': (CompJson.isManager && (CompJson.isBflow || CompJson.isUtlz || (_ENTER_YN === "Y"))),
            'invite-member': (CompJson.isManager && CompJson.isBflow),
        }

        //조직도
        var isTopControl = {
            'organizationTopButton': (CompJson.isDvsnTree),
        }

        //서비스 업그레이드, 결제, 탈퇴하기
        var isMySettingControl = {
            'upgradeBanner': (CompJson.statusCode === StatusCode.UN_BFLOW.GUEST),
            'companyParticipationBtn': (CompJson.statusCode === StatusCode.UN_BFLOW.GUEST && (CompJson.isFlow || CompJson.isGoogle)),
            'paymentLeftMenu': (CompJson.buyCode === BuyCode.FREELANCER),
            'leaveFlowBtn': (CompJson.statusCode === StatusCode.UN_BFLOW.GUEST || CompJson.buyCode === BuyCode.FREELANCER),
            'passwordArea': (CompJson.isUtlz || CompJson.isFlow || CompJson.isBflow),
            'bizplayPasswordInput': CompJson.isUtlz,
            'normalPasswordInput': !CompJson.isUtlz,
        }

        var isProjectMakeControl = {
            'open-yn': CompJson.buyCode === BuyCode.PAID_COMPANY,
        }

        var $leftArea = $("#leftArea");
        var $topBtns = $("#rightTopMenu");
        var $mySettingPopup = $("#mySettingPopup");
        var $projectMakeLayer = $("#projectMakeLayer");

        for (var key in isLeftControl) {
            $leftArea.find("[data-code=" + key + "]").css('display', isLeftControl[key] ? 'block' : 'none');
        }

        if ($leftArea.find("#leftBottomUl").find(".left-menu-item:visible").length === 0) {
            $leftArea.find("#leftBottomUl").css("display", "none");
        }

        for (var key in isTopControl) {
            $topBtns.find("#" + key).css('display', isTopControl[key] ? 'inline-block' : 'none');
        }

        for (var key in isMySettingControl) {
            $mySettingPopup.find("#" + key).css('display', isMySettingControl[key] ? 'block' : 'none');
        }

        for (var key in isProjectMakeControl) {
            $projectMakeLayer.find("." + key).css('display', isProjectMakeControl[key] ? 'block' : 'none');
        }

        //채팅 감사자 "FLOW_AUDITOR_R006"
    }

    function controlTopBanner() {

        if (Often.isFunc(Func.CLOUD.VOUCHER_BANNER) && (CompJson.buyCode !== BuyCode.PAID_COMPANY && CompJson.buyCode !== BuyCode.FREELANCER)) {
            //바우처 배너
        } else {

        }

        if (CompJson.isCardBanner && !_IsMini ) {
            Top.setBanner("end-time");
        }

        //상단배너 - 유효기간 onoff
    }

    function controlSetting() {
        var fullTextVersion = i18next.t('front.common.version', {val: '$t(' + getVersionName() + ')'})
        $("#versionTab").find(".js-business-nm").text(fullTextVersion);
        $("#mySettingPopup").find("#version").text(fullTextVersion);
        $("#accountLayer").find(".js-version").text(fullTextVersion);
        if (Electron.isElectronApp()) {
            !Electron.getElectronConfig().b_fullMode && $('#logoutBtn').css('display', 'none');
            $('#prevVersionBtn, #miniOpenBtn, #desktopDownloadBtn').css('display', 'none');
        }

        function getVersionName() {
            var isGuest = CompJson.statusCode === StatusCode.UN_BFLOW.GUEST || (CompJson.isSerp &&CompJson.isCardBanner);
            var isFreelancer = CompJson.buyCode === BuyCode.FREELANCER;
            if (ServerChecker.isKtWorks) return KtWorks.get("VERSION_NAME")
            if (ServerChecker.isKyungrinara) return Kyungrinara.getVersionName(isGuest);
            return (isGuest ? "dictionary.guest" : isFreelancer ? "dictionary.freelance" : "front.common.businessBasic")
        }
    }

    function controlPopup() {

        if ($('#paymentLayer').is(':visible')) return;

        //결제 권유 팝업
        if (CompJson.statusCode === StatusCode.BFLOW.REMAIN_WEEK && CompJson.isManager && CompJson.isDailyOnce) {
            drawRecommendPayPopup(CompJson.remainDate);
            return;
        }

        //서비스 중지 - 관리자
        if (CompJson.statusCode === StatusCode.BFLOW.END_ADMIN) {
            drawServiceBlock(BLOCK_TYPE.SERVICE_ADMIN, movePayPage, drawLogOutPopup);
            $("#tempPopup").addClass("serviceStop");
            return;
        }

        //서비스 중지 - 유저
        if (CompJson.statusCode === StatusCode.BFLOW.END_USER) {
            Often.logoutDirect(true);
            drawServiceBlock(BLOCK_TYPE.SERVICE_USER, Often.logoutDirect, drawLogOutPopup);
            $("#tempPopup").addClass("serviceStop");
            return;
        }

        //이용중지
        if (!CompJson.isAvailableService) {
            Often.logoutDirect(true);
            drawServiceBlockPopup();
            return;
        }

        //Todo. 유효기간 만료
        if (CompJson.statusCode === "R") {

            return;
        }

        var isBlockFirstPopup = Often.null2Void(Often.getCookie("FIRST_INVITE_POPUP"), "N") === "Y";
        if (CompJson.isManager && CompJson.userCnt === 1 && !isBlockFirstPopup && !_IsMini) {
            InviteEmployee.openInviteEmployeeLayer(true);
        }
    }

    function drawLogOutPopup() {
        var logOutConfirm = confirm(i18next.t('front.alert.redirectLogin'));
        if (logOutConfirm) Often.logoutDirect();
    }

    function movePayPage() {
        if (Electron.isElectronApp()) {
            Electron.openElectronProject(Often.getLocOrigin() + '/main.act', 'paymentPage');
        } else {
            Payment.openPaymentLayer("business");
        }
    }

    function drawServiceBlockPopup() {

        if (ServerChecker.isEland) {
            drawServiceBlock($.extend({}, BLOCK_TYPE.USE, {main: i18next.t('front.alert.contact', {val: "ITHELP@ELAND.CO.KR"})}));
            return;
        }

        if (Often.isFunc(Func.CLOUD.RESTRICT_POPUP_MANAGER)) {
            Ajax.executeApi(RestApi.GET.COLABO2_MNGR_R001, {}, function (dat) {
                var strAdministrator = "";
                dat.MNGR_REC && $.each(dat.MNGR_REC, function (i, v) {
                    if (i > 0) strAdministrator += ', ';
                    var isExistName = (Often.null2Void(v.USER_NM, "") !== "");
                    isExistName && (strAdministrator += i18next.t('front.common.user', {user: v.USER_NM}))
                });
                drawServiceBlock($.extend({}, BLOCK_TYPE.USE,
                    {main: i18next.t('front.alert.askToAdmin', {val: strAdministrator})}));
            })
            return;
        }

        drawServiceBlock(BLOCK_TYPE.USE, drawLogOutPopup, drawLogOutPopup);
        $("#tempPopup").addClass("serviceStop");
    }

    function drawRecommendPayPopup(remainDate) {
        var dataJson = $.extend({}, BLOCK_TYPE.EXPERIENCE);
        var isPlusRemainDate = Number(remainDate) > -1;
        isPlusRemainDate && (dataJson.title = getEndTimeComment(remainDate));
        drawServiceBlock(dataJson, movePayPage);
    }

    function drawServiceBlock(blockContents, submitCallback, closeCallback) {
        if (!_IsMini) PopupDraw.closePopup();
        PopupDraw.drawBlock({
            await: true,
            class: blockContents === BLOCK_TYPE.STOP_FLOWNEW ? 'invite' : 'service',
            contents: blockContents,
            callback: {
                submit: submitCallback, close: closeCallback, final: function ($currentPopup) {
                    $currentPopup.css("z-index", "100000");
                }
            }
        })
    }

    function getEndTimeComment(remainDate) {
        if (Number(remainDate) < 0) return i18next.t('front.alert.trialEnd', {
            version: '$t(front.common.businessBasic)'
        });
        return i18next.t('front.alert.trialExpiredDate', {
            version: '$t(front.common.businessBasic)',
            count: remainDate
        });
    }

})();

var Top = (function () {

    var bannerArray = [];

    return {
        addClickEvent: addClickEvent,
        closeacconutModal: closeacconutModal,
        closeHelpCenterLayer: closeHelpCenterLayer,
        setBanner: setBanner,
        removeBanner: removeBanner,
        isRightWrap: isRightWrap,
        setRecommendEvent: setRecommendEvent,
    }

    function isRightWrap() {
        var $topLayer = {
            alarmLayer: $("#alarmLayer"),
            chattingLayer: $("#chattingLayer"),
            organizationLayer: $("#organizationLayer"),
        }
        var isOnRightWrap = false;
        for (var key in $topLayer) {
            isOnRightWrap = isOnRightWrap || ($topLayer[key].is(":visible") && $topLayer[key].css("opacity") === "1")
        }
        return isOnRightWrap;
    }

    function setBanner(key) {

        setBodyAttr(key);

        var $topBanner = $("#topBanner");
        var isManager = (LocalUtil.getBuyManger() === "Y");
        var isSerp = (LocalUtil.getSerpYn() === "Y");
        var remainDay = LocalUtil.getBuyGrcDt();

        if (key === 'alarm-step-1') {
            //pass
        } else if (key === 'end-time') {
            var $versionTab = $("#versionTab")

            if(isSerp) {
                $versionTab.find(".js-grc-dt").findUp(".d-day").css("display", "none");
            }else{
                $versionTab.find(".js-grc-dt").text(remainDay);
            }


            $("#versionMessage").html(Interpolation.breakLine(i18next.t('front.top.toolTipBusinessFree', {count: remainDay})));
            if (isManager) {
                $versionTab.find(".js-pay").css('display', 'inline-block').on('click', function () {
                    Payment.openPaymentLayer("business");
                });
            } else {
                $versionTab.find(".js-pay").css('display', 'none');
            }
            $versionTab.find(".js-manager-call").css('display', isManager ? 'none' : 'block');
            $versionTab.css("display", "inline-block");
        }
        $topBanner.off('click').on('click', clickTopBanner)
    }

    function setRecommendEvent() {
        // 작성자 : 우성호 / 소문내기 이벤트 기능키
        Often.showOrHideByFunc("RECOMMEND_EVENT", $("#recommendEvtTopBtn"));
        Often.showOrHideByFunc("RECOMMEND_EVENT", $("#recommendEvtListBtn"));
    }

    function removeBanner(key) {
        var $body = $("body");
        $body[0].removeAttribute('banner1');
        $body[0].removeAttribute('banner2');
        $body[0].removeAttribute('banner3');

        bannerArray.forEach(function (v, i) {
            if (key === 'alarm-step-all') {
                if (v === 'alarm-step-1' || v === 'alarm-step-2') bannerArray.splice(i, 1);
            } else {
                if (v === key) bannerArray.splice(i, 1);
            }
        })

        bannerArray.forEach(function (v, i) {
            $body.attr('banner' + (i + 1), v);
        })

        if (key === 'alarm-step-1') {
            setBanner('alarm-step-2');
        }
    }

    function setBodyAttr(key) {
        var $body = $("body");
        bannerArray.push(key);
        bannerArray.forEach(function (v, i) {
            $body.attr('banner' + (i + 1), v);
        })
    }

    function clickTopBanner(e) {
        var $eTarget = $(e.target);
        var bannerId = $eTarget.findUp(".top-banner-1").attr('banner');
        var $closeButton = $eTarget.findUp(".top-banner-close-button");
        var $alarmTry = $eTarget.findUp(".js-alarm-try");
        var $alarmLater = $eTarget.findUp(".js-alarm-later");
        var $alarmNo = $eTarget.findUp(".js-alarm-no");

        if ($closeButton.length > 0) return removeBanner(bannerId);
        if ($alarmTry.length > 0) return BrowserNoti.requestNotificationPermission();
        if ($alarmLater.length > 0) return BrowserNoti.closeAlarmBanner(false);
        if ($alarmNo.length > 0) return BrowserNoti.closeAlarmBanner(true);
    }

    function addClickEvent() {
        $("#organizationTopButton").off("click").on("click", function (e) {
            e.stopPropagation();
            checkWriting(Organization.toggleLayer);
        });
        $("#chattingTopButton").off("click").on("click", function (e) {
            e.stopPropagation();
            checkWriting(Chatting.toggleLayer);
        });
        $("#alarmTopButton").off("click").on("click", function (e) {
            e.stopPropagation();
            checkWriting(Alarm.toggleLayer);
        });
        $("#electronNavi").off("click").on("click", function (e) {
            e.stopPropagation();
            ElectronEvent.clickNaviBar($(e.target));
        });

        $("#accountTopButton").off("click").on("click", toggleacconutModal);
        $("#acconutModal").off("click").on("click", clickAccount);
        $("#searchPopupTopButton").off("click").on("click", SearchEvent.clickTopSearchBar);
        $("#recommendEvtTopBtn").off("click").on("click", function (e) {location.href = "/event"});

        function checkWriting(callback) {
            if (!$("#postPopup").is(":visible")) return callback();
            PostPopup.checkWritingAndShowPopup(callback, "SIDE_POP");
        }
    }

    function clickAccount(e) {
        $(this).fadeOut(200);
        var $eTarget = $(e.target);
        var $mySettingOpenBtn = $eTarget.findUp("#mySettingOpenBtn");
        var $desktopDownloadBtn = $eTarget.findUp("#desktopDownloadBtn");
        var $miniOpenBtn = $eTarget.findUp("#miniOpenBtn");
        var $logoutBtn = $eTarget.findUp("#logoutBtn");
        var $topProfile = $eTarget.findUp("#topProfile");
        var $prevVersion = $eTarget.findUp("#prevVersionBtn");
        var $recommendEvtTopBtn = $eTarget.findUp("#recommendEvtTopBtn");
        var $recommendEvtListBtn = $eTarget.findUp("#recommendEvtListBtn");
        if ($mySettingOpenBtn.length > 0) return MySettings.openPopup();
        if ($desktopDownloadBtn.length > 0) return DownloadApp.desktopDownload();
        if ($miniOpenBtn.length > 0) return OpenUtil.openMini();
        if ($logoutBtn.length > 0) return Often.tryLogout();
        if ($topProfile.length > 0) return Profile.drawProfilePopup(_USER_ID);
        if ($prevVersion.length > 0) {
            LocalUtil.removeAllLocal();
            location.href = "/flow_layout.act";
        }
        if ($recommendEvtListBtn.length > 0) { location.href = "/event"; }
    }

    function toggleacconutModal() {
        var $acconutModal = $("#acconutModal");
        $("#accountTopButton").addClass('active')
        if ($acconutModal.is(":visible")) return closeacconutModal();
        $acconutModal.fadeIn(200);
    }

    function closeacconutModal() {
        $("#accountTopButton").removeClass('active')
        $("#acconutModal").fadeOut(200);
    }

    function closeHelpCenterLayer() {
        $("#helpCenterLayer").fadeOut(200);
    }

})()
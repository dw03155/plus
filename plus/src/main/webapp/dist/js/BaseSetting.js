var BaseSetting = (function () {

    return {
        setBuySetting: setBuySetting,
        setUserSetting: setUserSetting,
        setFuncSetting: setFuncSetting,
        showMainNotice: showMainNotice,
    };

    function setFuncSetting(callback) {
        Ajax.executeApi(RestApi.GET.COLABO2_FUNC_R003, {}, function (dat) {
            LocalUtil.setLocal("ONLY_FUNC_LIST", dat["FUNC_DEPLOY_LIST"]);
            (typeof callback === "function") && callback();
        });
    }

    function setBuySetting(callback) {
        Ajax.executeApi(RestApi.GET.COLABO2_BUY_R001, {
            DUID: Often.getCookie("FLOW_DUID")
        }, function (buyData) {
            LocalUtil.setLocal("ONLY_FUNC_LIST", buyData["FUNC_DEPLOY_LIST"]);
            LocalUtil.setLocal("ONLY_CHATBOT_ID_LIST", JSON.stringify(buyData["CHATBOT_REC"]));
            var settingJson = {}
            for (var key in buyData) {
                if (key !== 'FUNC_DEPLOY_LIST' && key !== 'CHATBOT_REC' && key !== 'COMMON_HEAD') {
                    settingJson[key] = buyData[key];
                } else {
                    //pass
                }
            }
            ServerChecker.isKyungrinara = settingJson.SERP_YN === "Y";
            LocalUtil.setLocal("ONLY_BUY_SETTING", JSON.stringify(settingJson));
            (typeof callback === "function") && callback(buyData)
        });
    }

    function setUserSetting(callback) {
        Ajax.executeApi(RestApi.GET.COLABO2_SET_R101, {}, function (setData) {
            var settingJson = {}
            for (var key in setData) {
                for (var key in setData) {
                    key !== 'COMMON_HEAD' && (settingJson[key] = setData[key])
                }
            }
            LocalUtil.setLocal("ONLY_USER_SETTING", JSON.stringify(settingJson));
            (typeof callback === "function") && callback(setData)
        });
    }

    function showMainNotice() {
        var isElectron = Electron.isElectronApp();
        var gbName = isElectron ? "D" : "P";
        Ajax.executeApi(RestApi.GET.COLABO2_ADM_R002, {GUBUN: gbName}, function (noticeData) {
            if (Often.null2Void(noticeData.READ_YN, "Y") === "Y") return;

            var $flowNoticePop = PopupDraw.getPopupWrapObj();
            $flowNoticePop.find(".contents").html($("#flowNoticeDiv").html());
            $flowNoticePop.find(".js-ttl").text(noticeData.TTL);
            $flowNoticePop.find(".js-cntn").html(noticeData.CNTN.replace("\\n", "<br>"));
            $flowNoticePop.find(".js-link").text(noticeData.BTN_NM);

            $flowNoticePop.on("click", function (e) {
                var $eTarget = $(e.target);
                var $link = $eTarget.findUp(".js-link");
                var $notShow = $eTarget.findUp(".js-not-show");
                var $close = $eTarget.findUp(".js-close");

                if ($link.length > 0) return submitNoticePopup();
                if ($notShow.length > 0) return readNotice();
                if ($close.length > 0) return PopupDraw.closePopup();

                if ($eTarget.findUp(".back-area").length > 0 &&
                    $eTarget.findUp("#flowNotice").length === 0) {
                    PopupDraw.closePopup();
                }
            })

            var noticeImageEl = new Image();
            noticeImageEl.src = noticeData.IMG_URL;
            noticeImageEl.onload = function () {
                $(noticeImageEl).addClass("js-img");
                var $originImgArea = $flowNoticePop.find(".js-img");
                $originImgArea.after($(noticeImageEl));
                $originImgArea.remove();
                $("body").append($flowNoticePop);
                $flowNoticePop.fadeIn(200);
            };

            function submitNoticePopup() {
                if (isElectron) return Electron.openWindow(noticeData.LNK, "notice", 1200, 800)
                window.open(noticeData.LNK, "_blank");
            }

            function readNotice() {
                Ajax.executeApi(RestApi.POST.COLABO2_ADM_C002, {
                    GUBUN: gbName,
                    NOTICE_SRNO: noticeData.NOTICE_SRNO,
                    packetOption: Ajax.OPTION.PREVENT_EXECUTE,
                }, PopupDraw.closePopup);
            }
        });

    }

})();

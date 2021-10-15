var QuickGuide = (function () {

    var pageData = {
        PG_NO: 1,
        NEXT_YN: "Y"
    }

    var $bottomToolList, $quickButton, $quickLayer, $quickClose;

    return {
        openQuickGuide: openQuickGuide,
        closeQuickGuide: closeQuickGuide,
        drawQuickGuide: drawQuickGuide,
    }

    function set$element() {
        $bottomToolList = $("#bottomToolList");
        $quickButton = $bottomToolList.find(".js-quick-button");
        $quickClose = $bottomToolList.find(".js-quick-close");
        $quickLayer = $bottomToolList.find(".js-bottom-quick-layer");
    }

    function openQuickGuide() {
        var $quickGuideList = $("#quickGuideList");
        if (!$quickGuideList.empty()) return open();
        findQuickGuideList(function (dat) {
            $quickGuideList.drawListHelper({
                records: dat.FLOW_SERVICE_CENTER_REC,
                callback: {
                    item: getQuickGuideListHtml,
                    click: clickQuickGuideList,
                    final: open,
                }
            })
        })

        function open() {
            set$element();
            $quickClose.css("display", "inline-block");
            $quickButton.css("display", "none");
            $quickLayer.fadeIn(300);
        }
    }

    function closeQuickGuide(logData) {
        set$element();
        $quickLayer.fadeOut(300, function () {
            $quickClose.css("display", "none");
            $bottomToolList.find(".js-quick-button").css("display", "inline-block");
        });
        if (logData) {
            createTooltipLog(logData);
        } else {
            checkFirstLogin(createTooltipLog);
        }

        function createTooltipLog(_logData) {
            if ("0" !== _logData.CNT) return;
            Ajax.executeApi(RestApi.POST.COLABO_TOOLTIP_LOG_C001, {
                TOOLTIP_ID: "QUICK_GUIDE",
                GUBUN: "P",
                QUICKGUIDE_YN: "Y",
                SHOW_YN: "N",
                packetOption: Ajax.OPTION.PREVENT_EXECUTE,
            });
        }
    }

    function drawQuickGuide() {
        checkFirstLogin(function (logData) {
            if ("0" === logData.CNT) openQuickGuide();
            else closeQuickGuide(logData);
        });
    }

    function findQuickGuideList(callback) {
        Ajax.executeApi(RestApi.GET.FLOW_SERVICE_CENTER_R001, {
            GUBUN: "USE"
        }, callback)
    }

    function checkFirstLogin(callback) {
        Ajax.executeApi(RestApi.GET.COLABO_TOOLTIP_LOG_R001, {
            TOOLTIP_ID: "QUICK_GUIDE",
            SHOW_YN: "N",
            QUICKGUIDE_YN: "Y"
        }, callback);
    }

    function getQuickGuideListHtml(record) {
        var returnHtml = "";
        var baseHtml = $("#quickGuideItem").html();
        var isElectron = Electron.isElectronApp();
        $.each(record, function (i, quickGuide) {
            var isWebUse = quickGuide.USE_WEB === "Y";
            var isElectronUse = quickGuide.USE_ELECTRON === "Y";

            if (!(quickGuide.USE_YN === "Y" && ((!isElectron && isWebUse) || (isElectron && isElectronUse)))) return;
            returnHtml += ListHelper.replaceJson(baseHtml, {
                href: 'href="' + quickGuide.LINK + '"',
                service_name: quickGuide.SERVICE_NM,
                new: quickGuide.NEW_MARK_YN === "Y" ? '<em class="new">New </em>' : '',
            });
        });
        return returnHtml;
    }

    function clickQuickGuideList() {
        event.preventDefault();
        var $eTarget = $(event.target);
        var $quickGuideLi = $eTarget.findUp(".quickGuideLi");
        if (!$quickGuideLi || $quickGuideLi.length === 0) return false;
        var url = $quickGuideLi.attr('href');

        if (Electron.isElectronApp()) {
            Electron.openExternalLinkforElectron(url);
        } else {
            OpenUtil.openWindow(url, "_blank");
        }
        return true;
    }

})();
var Bottom = (function () {

    return {
        initSetting: initSetting,
        addClickEvent: addClickEvent,
    }

    function initSetting() {
        var $quickGuideMenu = $("#bottomToolList").find("#quickGuideMenu");
        if (Often.isFunc(Func.CLOUD.QUICK_GUIDE)) {
            $quickGuideMenu.css("display", "block");
            QuickGuide.drawQuickGuide();
        } else {
            $quickGuideMenu.css("display", "none");
        }
    }

    function addClickEvent() {
        $("#bottomToolList").off("click").on("click", function (e) {
            var $eTarget = $(e.target);
            var $btnHelpTalk = $eTarget.findUp(".js-btn-help-talk");
            var $toolItem = $eTarget.findUp(".js-tool-item");
            var $quickButton = $eTarget.findUp(".js-quick-button");
            if ($btnHelpTalk.length > 0) {
                getOneColaboSrno(function () {
                    QuickGuide.closeQuickGuide();
                    if ($.trim($("#allUpgradeStep").html()) !== "") {
                        Upgrade.drawCloseConfirm(function () {
                            ViewChanger.loadPageJson({code: "detail", first: _ONE_COLABO_SRNO});
                        })
                        return;
                    }
                    ViewChanger.loadPageJson({code: "detail", first: _ONE_COLABO_SRNO});
                })
            }
            if ($toolItem.length > 0) {
                var dataCode = $toolItem.attr("data-code");
                if (dataCode === 'write') return PostPopup.openRegistrationView(ViewChanger.getProjectSrno(), DetailCode.WRITE, true);
                if (dataCode !== 'quick') return;
            }
            if ($quickButton.length > 0) return QuickGuide.openQuickGuide();
            if ($eTarget.findUp(".js-quick-close").length > 0) return QuickGuide.closeQuickGuide();
        })

        function getOneColaboSrno(callback) {
            if ("" !== _ONE_COLABO_SRNO) return callback();
            Ajax.executeApi(RestApi.GET.FLOW_ONE_PROJ, {}, function (dat) {
                if (dat.ONE_COLABO_SRNO === "") {
                    Often.toast("error", i18next.t('front.alert.noColaboProject'));
                    return;
                }
                _ONE_COLABO_SRNO = dat.ONE_COLABO_SRNO;
                callback();
            });
        }
    }
})()
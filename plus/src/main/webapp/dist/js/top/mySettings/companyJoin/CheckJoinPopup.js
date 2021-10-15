var CheckJoinPopup = (function () {

    var $checkJoinPopup
    var subDomain;

    return {
        openCheckJoinPopup: openCheckJoinPopup,
        closeCheckJoinPopup: closeCheckJoinPopup,
    }

    function openCheckJoinPopup(subDom) {
        subDomain = subDom;
        Ajax.executeApi(RestApi.GET.FLOW_SUB_DOM_R001, {
            SUB_DOM: subDomain,
        }, function (dat) {
            if ("2000" === dat.ERR_CD) {
                Often.toast("error", i18next.t('front.alert.inviteUrlError'));
                return;
            }

            $checkJoinPopup = $("#checkJoinPopup");
            $checkJoinPopup.find("#companyLogoUrl").css("background-image", "url(" + dat.SUB_DOM_LOGO_URL + ")");
            $checkJoinPopup.find("#companyName").text(dat.SUB_DOM_NM);
            $checkJoinPopup.find("#companyName").css("display", dat.SUB_DOM_LOGO_URL ? "none" : "block");
            $checkJoinPopup.find("#companyUrl").text("https://" + dat.SUB_DOM_URL);
            $checkJoinPopup.css("display", "block");
            addEvent();
        });
    }

    function closeCheckJoinPopup() {
        $checkJoinPopup.css("display", "none");
    }

    function addEvent() {
        $checkJoinPopup.off("click").on("click", clickCheckJoinPopup)
    }

    function clickCheckJoinPopup(e) {
        var $eTarget = $(e.target);

        if (isBackOrCloseBtnAndAction($eTarget)) return;
        if (isJoinSubmitAndAction($eTarget)) return;

        function isBackOrCloseBtnAndAction($eTarget) {
            var $popupLayer = $eTarget.findUp("#popupLayer");
            var $closePopupBtn = $eTarget.findUp("#closePopupBtn");

            if ($closePopupBtn.length === 0 && $popupLayer.length !== 0) return false;
            closeCheckJoinPopup();
            return true;
        }

        function isJoinSubmitAndAction($eTarget) {
            var $joinSubmit = $eTarget.findUp("#joinSubmit");
            if ($joinSubmit.length === 0) return false;
            submitJoin();
            return true;
        }
    }

    function submitJoin() {
        Ajax.executeApi(RestApi.POST.FLOW_JOIN_C001, {
            SUB_DOM: subDomain,
            packetOption: Ajax.OPTION.PREVENT_EXECUTE,
        }, function (dat) {
            if (Often.null2Void(dat.JNNG_ATHZ_YN, "") === "") {
                Often.toast("error", i18next.t('front.alert.errorTryAgain'));
                return;
            }

            if ("N" === dat.JNNG_ATHZ_YN) {
                closeCheckJoinPopup();
                var drawData = {
                    COMPANY_NAME: $checkJoinPopup.find("#companyName").text(),
                    COMPANY_URL: $checkJoinPopup.find("#companyURl").text(),
                }
                CompanyWaitJoinLayer.openWaitLayer(drawData);
                return;
            }
        })
    }
})();
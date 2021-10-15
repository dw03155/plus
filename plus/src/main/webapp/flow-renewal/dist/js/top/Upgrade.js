var Upgrade = (function () {

    var $userStep, $upgradeStep, $allUpgradeStep, $allMainContent;

    return {
        showUpgradeLayer: showUpgradeLayer,
        closeUpgradePage: closeUpgradePage,
        drawCloseConfirm: drawCloseConfirm,
    }

    function showUpgradeLayer() {
        PopupDraw.closePopup();
        $allUpgradeStep = $("#allUpgradeStep");
        $allUpgradeStep.load("/flow-renewal/view/mainview/upgrade.jsp", function () {

            $allMainContent = $("#allMainContent");
            $userStep = $allUpgradeStep.find("#userStep");
            var $upgradeTopBanner = $("#upgradeTopBanner");
            $("#noUpgradeLayer").remove();

            //기본 event
            $upgradeTopBanner.find("#closeUpgradePageBtn").off("click").on("click", drawCloseConfirm);

            var isFlowAccount = (_USE_INTT_ID.indexOf("KAKAO") === -1 && _USE_INTT_ID.indexOf("APPLE") === -1)
            if (isFlowAccount) {
                $upgradeStep = $allUpgradeStep.find("#flowUpgradeStep")
                $upgradeStep.find("#userStart").text(i18next.t('front.common.startAs', {val: _USER_ID}))
                setFlowUpgradeStepEvent($upgradeStep);
            } else {
                $upgradeStep = $allUpgradeStep.find("#kakaoUpgradeStep");
                setKakaoAndAppleUpgradeStepEvent($upgradeStep);
            }

            //display
            $allMainContent.css("display", "none");
            $userStep.css("display", "none");
            $upgradeStep.fadeIn(200);

        })
    }

    function setFlowUpgradeStepEvent($flowUpgradeStep) {
        $flowUpgradeStep.find("input").off("keyup").on("keyup", CommonJoin.keyupJoinInput);
        $flowUpgradeStep.find("#upgradeTeamSector").off("change").on("change", CommonJoin.changeTeamSector);
        $flowUpgradeStep.find("#upgradeFinalStepButton").off("click").on("click", CommonJoin.moveFinalStepButton);
        $flowUpgradeStep.find(".js-compare-button").off("click").on("click", function () {
            window.open("/price.act", "_blank");
        })
        $flowUpgradeStep.find("#nowJoinButton").off("click").on("click", function () {
            $upgradeStep.fadeOut(0);
            $userStep.fadeIn(200);
            CommonJoin.setUserStepEvent();
        })
    }

    function setKakaoAndAppleUpgradeStepEvent($kakaoUpgradeStep) {
        $("#kakaoUpgradeStepButton").off("click").on("click", function () {
            $kakaoUpgradeStep.fadeOut(0);
            $userStep.fadeIn(200);
        })
        CommonJoin.setUserStepEvent();
    }

    function drawCloseConfirm(callback) {
        PopupDraw.drawConfirm({
            contents: {
                main: i18next.t('front.common.ask', {
                    val: '$t(dictionary.upgrade)',
                    status: '$t(dictionary.cancel)'
                })
            },
            callback: {
                submit: function () {
                    closeUpgradePage();
                    (typeof callback === "function") && callback();
                },
            }
        })
    }

    function closeUpgradePage() {
        PopupDraw.closePopup()
        $allUpgradeStep.children().remove();
        $allMainContent.fadeIn(200);
        var subPath = Often.null2Void(LocalUtil.getLocalValue("SUB_PATH"), "main");
        (subPath === "main") && ViewChanger.loadPage(subPath);
    }

})()
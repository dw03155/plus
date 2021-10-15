var AllSendience = (function () {

    var $allSendiencePopup;
    var searchTimer;

    return {
        openAllSendiencePopup: openAllSendiencePopup,
        closeAllSendiencePopup: closeAllSendiencePopup,
    }

    function openAllSendiencePopup() {
        $allSendiencePopup = $("#allSendiencePopup");
        $allSendiencePopup.find("#allSendienceSearch").val("");
        drawAllSendience();
        $allSendiencePopup.off("click").on("click", clickPopupArea).off("keyup").on("keyup", keyupPopupArea);
    }

    function closeAllSendiencePopup() {
        $allSendiencePopup = $("#allSendiencePopup");
        $allSendiencePopup.find("#allSendienceUl").scrollTop(0);
        $allSendiencePopup.css("display", "none");
        $(".plus-popup").fadeOut(200);
    }

    function drawAllSendience() {
        Member.initPage();
        Member.makeMemberList(
            $allSendiencePopup.find("#allSendienceUl"),
            $allSendiencePopup.find("#allSendienceSearch"),
            "",
            InviteType.ALLSENDIENCE,
            function () {
                memberFinalCallback()
                $allSendiencePopup.fadeIn(200);
            });
    }

    function keyupPopupArea(e) {
        var $eTarget = $(e.target);

        if (isAllSendienceSearchAndAction($eTarget)) return;

        function isAllSendienceSearchAndAction($eTarget) {
            var $allSendienceSearch = $eTarget.findUp("#allSendienceSearch");
            if ($allSendienceSearch.length === 0) return false;
            var $searchInput = $allSendiencePopup.find("#allSendienceSearch");
            searchTimer && clearTimeout(searchTimer);
            searchTimer = setTimeout(function () {
                Member.initPage();
                Member.makeMemberList($allSendiencePopup.find("#allSendienceUl"), $searchInput,
                    "", InviteType.ALLSENDIENCE, memberFinalCallback);
            }, 200);
            return true;
        }
    }

    function memberFinalCallback() {
        var isManager = Authority.isAuthorityCheck("ADMIN");
        $allSendiencePopup.find("#allSendienceUl").find(".my-check-2").css("display", "none");
        isManager && $allSendiencePopup.find("#allSendienceUl").find(".project-invite-plus-1").css("display", "block");
        $allSendiencePopup.find('li[data-id="' + _USER_ID + '"]').find(".project-invite-plus-1").css("display", "block");
        !isManager && $allSendiencePopup.find('li[data-id="' + _USER_ID + '"]').find("#managerBtn").css("display", "none")
        $allSendiencePopup.find('li[sendience_gb="3"]').append(getManagerBadgeHtml());
    }

    function clickPopupArea(e) {
        var $eTarget = $(e.target);

        if (isCloseButtonAndAction($eTarget)) return;
        if (isBackClickAndAction($eTarget)) return;
        if (isPlusBtnAndAction($eTarget)) return;
        if (isPlusPopupAndAction($eTarget)) return;
        if (isServiceHelperAndOpenWindow($eTarget)) return;
        if (isProfileAndAction($eTarget)) return;
        if (isParticipantItemAndAction($eTarget)) return;

        function isBackClickAndAction($eTarget) {
            var $allSendienceLayer = $eTarget.findUp("#allSendienceLayer");
            var $plusPopup = $eTarget.findUp("#plusPopup");
            if ($allSendienceLayer.length !== 0 || $plusPopup.length !== 0) return false;
            closeAllSendiencePopup();
            return true;
        }

        function isCloseButtonAndAction($eTarget) {
            var $closeButton = $eTarget.findUp("#closeButton");
            if ($closeButton.length === 0) return false;
            closeAllSendiencePopup();
            return true;
        }

        function isPlusBtnAndAction($eTarget) {
            var $plusBtn = $eTarget.findUp("#plusBtn");
            if ($plusBtn.length === 0) return false;
            if ($plusBtn.nextAll("#plusPopup").is(":visible")) {
                $plusBtn.nextAll("#plusPopup").fadeOut(200);
            } else {
                var isManager = $plusBtn.parents("li").attr("sendience_gb") === "3";
                var isMyInfo = $plusBtn.parents("li").attr("data-id") === _USER_ID;
                var $plusPopup = $plusBtn.nextAll("#plusPopup");

                $(".plus-popup").fadeOut(200);
                $plusPopup.find("#export div").text(i18next.t(isMyInfo ? 'dictionary.leave' : 'dictionary.dismiss'));
                $plusPopup.find("#managerBtn div").text(i18next.t(!isManager ? "front.common.setManager" : "front.common.releaseManager"));
                $plusPopup.fadeIn(200);
            }
            return true;
        }

        function isPlusPopupAndAction($eTarget) {
            var $plusPopup = $eTarget.findUp("#plusPopup");
            if ($plusPopup.length === 0) {
                $(".plus-popup").fadeOut(200);
                return false;
            }

            var userId = $eTarget.parents("li").attr("data-id");
            var sendienceGb = $eTarget.parents("li").attr("sendience_gb");

            var $exportBtn = $eTarget.findUp("#export");
            if ($exportBtn.length !== 0) {
                exportSendience(userId, sendienceGb);
                return true;
            }

            var $managerBtn = $eTarget.findUp("#managerBtn");
            if ($managerBtn.length !== 0) {
                var isManager = $managerBtn.find("div").text() === i18next.t('front.common.releaseManager');
                if (isManager && $allSendiencePopup.find(".js-participant-item[sendience_gb=3]").length === 1) {
                    Often.toast("error", "프로젝트 관리자는 최소 한명이 존재해야 합니다.");
                    return true;
                }
                updateSendienceGubun(userId, isManager ? "1" : "3", function () {
                    Participant.drawProjectParticipantItems(Detail.getProjectSrno(), true);
                    changeManagerStatus();
                    drawAllSendience();
                    $eTarget.parents("li").attr("sendience_gb", isManager ? "1" : "3");
                    $managerBtn.find("div").text(i18next.t(isManager ? 'front.common.setManager' : 'front.common.releaseManager'));
                    if (isManager) $managerBtn.parents("li").find(".manager-badge").remove();
                    else $managerBtn.parents("li").append(getManagerBadgeHtml());
                    $plusPopup.fadeOut(200);
                });
            }
            return true;

            function changeManagerStatus(){
                if(_USER_ID === userId) {
                    LocalUtil.setLocalValue("CURRENT_PROJECT_SETTING", "MNGR_DSNC", isManager ? "N" : "Y");
                    if(LocalUtil.getLocalValue("POP_PROJECT_SETTING", "COLABO_SRNO") !== Detail.getProjectSrno()) return;
                    LocalUtil.setLocalValue("POP_PROJECT_SETTING", "MNGR_DSNC", isManager ? "N" : "Y");
                } else {
                    //pass
                }
            }
        }

        function isServiceHelperAndOpenWindow($eTarget) {
            var $serviceHelperButton = $eTarget.findUp(".js-sendience-service-helper");
            if (!$serviceHelperButton || $serviceHelperButton.length === 0) return false;
            var targetUrl = FlowServiceHelper.SENDIENCE;
            window.open(targetUrl, "_blank");
            return true;
        }

        function isProfileAndAction($eTarget) {
            var $profile = $eTarget.findUp(".js-profile");
            if ($profile.length === 0) return false;
            var userId = $profile.parents(".js-participant-item").attr("data-id");
            Profile.drawProfilePopup(userId);
            return true;
        }

        function isParticipantItemAndAction($eTarget) {
            var $participantItem = $eTarget.findUp(".js-participant-item");
            if ($participantItem.length === 0) return false;
            var userId = $participantItem.attr("data-id");
            Profile.drawProfilePopup(userId);
            return true;
        }
    }

    function exportSendience(userId, sendienceGb) {
        var isExit = userId === _USER_ID;
        PopupDraw.drawConfirm({
            contents: {
                main: Interpolation.breakLine(
                    i18next.t(isExit ? 'front.alert.askLeaveProject' : 'front.alert.dismissParticipant'))
            },
            callback: {submit: submitExportSendience}
        })

        function submitExportSendience() {
            if ($allSendiencePopup.find('.js-participant-item[sendience_gb="3"]').length === 1 && sendienceGb === "3") {
                Often.toast("error", "프로젝트 관리자는 최소 한명이 존재해야 합니다.");
                return;
            }
            DetailSetting.deleteSendience("U", userId, function () {
                PopupDraw.closePopup();
                if (userId === _USER_ID) {
                    closeAllSendiencePopup();
                    return;
                }
                drawAllSendience();
                Participant.drawProjectParticipantItems(Detail.getProjectSrno(), true, function () {
                    //Todo. 참여자 내보내기 문구 상단에 붙이기
                    //UpdateElements.autoUpdateElem({ONLY_POST: true});
                });
            });
        }
    }

    function updateSendienceGubun(userId, sendienceGubun, callback) {
        Ajax.executeApi(RestApi.PUT.COLABO2_SENDIENCE_U001, {
            COLABO_SRNO: Detail.getProjectSrno(),
            IN_RCVR_USER_ID: userId,
            SENDIENCE_GB: sendienceGubun,
        }, function () {
            if (sendienceGubun === "3") Often.toast("success", i18next.t('front.alert.successfullyChange', {status: '$t(dictionary.edit)'}));
            else Often.toast("success", i18next.t('front.alert.successfullyChange', {status: '$t(dictionary.edit)'}));

            if (typeof callback === "function") callback();
        }, function (dat) {
            if (dat.COMMON_HEAD.CODE === "S0154") {
                Often.toast("error", i18next.t('front.alert.leaveProjectError'));
                PopupDraw.closePopup();
            }
        })
    }

    function getManagerBadgeHtml() {
        return '<a href="#" class="admin-invite-button-1 manager-badge"><span>' + i18next.t('dictionary.administrator') + '</span></a>'
    }
})();
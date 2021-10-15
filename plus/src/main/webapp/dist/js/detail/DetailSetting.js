var DetailSetting = (function () {

    var isFirst;
    var $detailSettingLayer;

    return {
        openDetailSettingLayer: openDetailSettingLayer,
        closeDetailSettingLayer: closeDetailSettingLayer,
        clickDetailSettingBtn: clickDetailSettingBtn,
        removeWorker: removeWorker,
        changeProjectColor: changeProjectColor,
        deleteSendience: deleteSendience,
    }

    function openDetailSettingLayer() {
        $("#detailSettingProjectSrno").text(Detail.getProjectSrno());
        var isProjectManager = Authority.isAuthorityCheck("ADMIN");
        var prefix = "#detailSettingProject";
        $detailSettingLayer.find(prefix + "UpdateBtn, " + prefix + "DeleteBtn, " + prefix + "ManagerBtn").css("display", isProjectManager ? "block" : "none");
        $detailSettingLayer.css("display", "block");
        $("#detailSettingGroup").off("click").on("click", clickDetailSettingGroup);
    }

    function closeDetailSettingLayer() {
        init();
        $detailSettingLayer.css("display", "none");
    }

    function clickDetailSettingBtn(e) {
        e.stopPropagation();
        init();
        !$detailSettingLayer.is(":visible") ? openDetailSettingLayer() : closeDetailSettingLayer();
    }

    function init() {
        var isHide = LocalUtil.getProjectHiddenYn() === "Y";
        $detailSettingLayer = $("#detailSettingLayer");
        $("#hideText").html('<i class="icon-set-hide"></i>' + i18next.t(isHide ? 'front.common.unHide' : 'dictionary.hide'));
        isFirst = true;
    }

    function clickDetailSettingGroup(e) {
        var $eTarget = $(e.target);
        closeDetailSettingLayer();
        if (isTarget($eTarget, "detailSettingColorBtn")) return changeProjectColor()
        if (isTarget($eTarget, "detailSettingLabelBtn")) return changeProjectLabel();
        if (isTarget($eTarget, "detailSettingPushAlarmBtn")) return changeProjectPushAlarm();
        if (isTarget($eTarget, "detailSettingHideBtn")) return changeProjectHideSetting()
        if (isTarget($eTarget, "detailSettingProjectExitBtn")) return exitProject()
        if (isTarget($eTarget, "detailSettingProjectDeleteBtn")) return clickDeleteProject()
        if (isTarget($eTarget, "detailSettingProjectUpdateBtn")) return updateProject(e)

        function isTarget($eTarget, id) {
            return $eTarget.findUp("#" + id).length > 0;
        }
    }

    function changeProjectColor() {
        var currentColorCode = LocalUtil.getProjectBgColorCd();
        PopupDraw.drawColorSetting({
            callback: {
                submit: submitColorSetting,
                final: finalColorSetting,
            }
        })

        function finalColorSetting($popupObj) {
            $popupObj.find(".color-item").removeClass("project-color-check-active-1");
            $popupObj.find(".color-item.project-color-type-" + currentColorCode).addClass("project-color-check-active-1");
        }

        function submitColorSetting($popupObj) {
            var updateColorCode = Often.null2Void($popupObj.find(".project-color-check-active-1").attr('color-code'), '0');
            if (currentColorCode === updateColorCode) return;
            editProjectColors(updateColorCode, PopupDraw.closePopup);
        }
    }

    function changeProjectLabel() {
        PopupDraw.drawLabelSetting({
            callback: {submit: submitLabelSetting}
        })

        function submitLabelSetting($popupObj) {
            var $labelItems = $popupObj.find(".flow-content-check-type-2").parents(".label-item");
            editProjectLabels($labelItems, PopupDraw.closePopup);
        }
    }

    function changeProjectPushAlarm() {
        PopupDraw.drawPushAlarmSetting({
            callback: {submit: submitPushAlarmSetting}
        })

        function submitPushAlarmSetting($popupObj) {
            var $pushAlarmContent = $popupObj.find(".push-alarm-content");
            editProjectPushAlarm($pushAlarmContent, PopupDraw.closePopup());
        }
    }

    function changeProjectHideSetting() {
        var currentHiddenYn = LocalUtil.getProjectHiddenYn();
        var changeHiddenYn = currentHiddenYn === "Y" ? "N" : "Y";

        var settingData = {
            COLABO_SRNO: Detail.getProjectSrno(),
            HIDDEN_YN: changeHiddenYn,
            packetOption: Ajax.OPTION.PREVENT_EXECUTE,
        }

        Ajax.executeApi(RestApi.POST.COLABO2_C105, settingData, function () {
            var isHide = changeHiddenYn === "Y";
            LocalUtil.setLocalValue("CURRENT_PROJECT_SETTING", "HIDDEN_YN", changeHiddenYn);
            $("#hideText").html('<i class="icon-set-hide"></i>' + i18next.t(isHide ? 'front.common.unHide' : 'dictionary.hide'));
            Often.toast("success", i18next.t('front.alert.successfullyChange', {status: '$t(dictionary.apply)'}));
        });
    }

    function editProjectColors(colorCode, callback) {
        (typeof callback === "function") && callback()
        updateProjectColor(colorCode);
    }

    function updateProjectColor(colorCode) {
        Ajax.executeApi(RestApi.PUT.COLABO2_BG_COLOR_U001, {
            "COLABO_SRNO": Detail.getProjectSrno(),
            "BG_COLOR_CD": colorCode,
        }, function () {
            LocalUtil.setLocalValue("CURRENT_PROJECT_SETTING", "BG_COLOR_CD", colorCode);
            changeColor($("#projectColor, #openInviteLayerBtn, #projectTitleColor"));
            AllCalendar.reloadCalendar();

            function changeColor($colorTarget) {
                ListHelper.removeAllColorClass($colorTarget);
                $colorTarget.addClass("color-code-" + colorCode);
            }
        });
    }

    function editProjectLabels($labelItems, callback) {
        (typeof callback === "function") && callback()
        updateProjectLabels($labelItems);
    }

    function updateProjectLabels($labelItems) {
        var selectLabelsList = [];
        var labelSrnos = "";
        $.each($labelItems, function (i, v) {
            selectLabelsList.push({
                COLABO_FLD_KIND: $(v).attr("data-label-kind"),
                COLABO_FLD_SRNO: $(v).attr("data-label-srno"),
                ICO_CODE: $(v).attr("data-label-ico")
            })
            labelSrnos += selectLabelsList[i].COLABO_FLD_SRNO + ",";
        })
        Ajax.executeApi(RestApi.POST.COLABO2_C103, {
            COLABO_SRNO: LocalUtil.getLocalValue("CURRENT_PROJECT_SETTING", "COLABO_SRNO"),
            COLABO_FLD_REC: selectLabelsList,
            packetOption: Ajax.OPTION.PREVENT_EXECUTE,
        }, function (dat) {
            LocalUtil.setLocalValue("CURRENT_PROJECT_SETTING", "LABEL_SRNOS", labelSrnos.slice(0, -1));
            Often.toast("success", i18next.t('front.alert.successfullyChange', {status: '$t(dictionary.apply)'}));
        })
    }

    function editProjectPushAlarm($pushAlarmContent, callback) {
        (typeof callback === "function") && callback()
        updateProjectPushAlarm($pushAlarmContent);
    }

    function updateProjectPushAlarm($pushAlarmContent) {
        var pushAlarmYn = $pushAlarmContent.find(".alarm-popup-set").attr("data-push-alarm");
        var apiJson = {
            COLABO_SRNO: LocalUtil.getLocalValue("CURRENT_PROJECT_SETTING", "COLABO_SRNO"),
            PUSH_ALAM_YN: pushAlarmYn,
            PUSH_COMMT_ALAM_YN: $pushAlarmContent.find(".js-push-commt").attr("data-push"),
            PUSH_REMARK_ALAM_YN: $pushAlarmContent.find(".js-push-remark").attr("data-push"),
            ALAM_LIST: $pushAlarmContent.find(".alarm").attr("data-alarm-list"),
        }
        Ajax.executeApi(RestApi.PUT.COLABO2_NOTI_U101, apiJson, function () {
            DetailHeader.setProjectIcon(apiJson);
            Often.toast("success", i18next.t('front.alert.successfullyChange', {status: '$t(dictionary.apply)'}));
        })
    }

    function exitProject() {
        PopupDraw.drawConfirm({
            contents: {main: Interpolation.breakLine(i18next.t('front.alert.askLeaveProject'))},
            callback: {submit: deleteSelf}
        })

        function deleteSelf() {
            deleteSendience("U", _USER_ID);
        }
    }

    function removeWorker(data) {
        PopupDraw.drawConfirm({
            contents: {main: data.CONTENTS},
            callback: {
                submit: data['CALLBACK'],
                cancel: cancelRemoveWorkerPopup,
            }
        })

        function cancelRemoveWorkerPopup() {
            Often.toast("error", i18next.t('front.common.canceled'));
        }
    }

    function deleteSendience(rcvrGb, userId, callback) {
        //관리자 최소 한명 예외 추가해야함
        var sendienceData = {
            COLABO_SRNO: Detail.getProjectSrno(),
            RCVR_GB: rcvrGb,
            RCVR_USER_ID: userId,
        }

        Ajax.executeApi(RestApi.DELETE.COLABO2_SENDIENCE_D001, sendienceData, function () {
            if (userId === _USER_ID) {
                Often.toast("success", i18next.t('front.alert.leaveProject'));
                ViewChanger.loadPage("main");
                PopupDraw.closePopup();
            } else {
                Often.toast("success", i18next.t('front.alert.successfullyChange', {status: '$t(dictionary.dismiss)'}));
            }
            if (typeof callback === "function") callback();
        }, function (dat) {
            var errorCode = dat.COMMON_HEAD.CODE;
            if (errorCode === "S0151") Often.toast("error", i18next.t('front.alert.leaveProjectError'));
            if (errorCode === "WCB013") Often.toast("error", i18next.t('front.alert.cannotLeaveProject'));
            PopupDraw.closePopup();
        })
    }

    function clickDeleteProject() {
        if (isPostExist()) {
            Often.toast("error", i18next.t('front.alert.leaveProjectError'));
            return;
        }

        PopupDraw.drawConfirm({
            contents: {
                main: i18next.t('front.common.ask', {
                    val: '$t(dictionary.project)',
                    status: '$t(dictionary.delete)'
                })
            },
            callback: {submit: deleteProject}
        })
    }

    function isPostExist() {
        return $("#detailUl").find(".detail-item").length > 0;
    }

    function deleteProject() {
        PopupDraw.closePopup();
        var projectData = {
            COLABO_SRNO: Detail.getProjectSrno(),
        }

        Ajax.executeApi(RestApi.DELETE.COLABO_D101, projectData, function () {
            //Todo. setBuySetting 꼭 해야하나?
            BaseSetting.setBuySetting(function () { //게스트 프로젝트 생성 수 제한 갱신
                Often.toast("success", i18next.t('front.alert.successfullyChange', {status: '$t(dictionary.delete)'}));
                ViewChanger.loadPage("main");
            });
        })
    }

    function updateProject(e) {
        setProjectUpdatePopup();
        ProjectMake.openPopup(e);
    }

    function setProjectUpdatePopup() {
        var localJson = LocalUtil.getLocalJson("CURRENT_PROJECT_SETTING");
        var projectMakeData = {
            TITLE: localJson.TTL,
            CONTENTS: localJson.CNTN,
            OPEN_YN: localJson.OPEN_YN,
            CATEGORY_SRNO: localJson.CNTS_CATG_SRNO,
            CATEGORY_NM: localJson.CNTS_CATG_NM,
            MANAGER_PERMIT_YN: localJson.JNNG_ATHZ_YN,
            MANAGER_WRITE_YN: localJson.MNGR_WR_YN,
            MANAGER_WRITE_REMARK_YN: localJson.MNGR_WR_CM_YN,
            MANAGER_LOOKUP_YN: localJson.SRCH_AUTH_YN,
            MANAGER_DOWNLOAD_YN: localJson.PRJ_AUTH,
        }

        ProjectMake.setProjectMakeData(projectMakeData);
    }
})();
var PushAlarmSetting = (function () {

    return {
        drawPushAlarmSetting: drawPushAlarmSetting,
    }

    function drawPushAlarmSetting($pushAlarmPopup) {
        var isMain = ViewChanger.isPage("main");
        var isSelectInMain = $("#mainContent").find(".project-item.active:visible");
        var isSelectOnlyOneInMain = isSelectInMain.length === 1;
        if (isMain && !isSelectOnlyOneInMain) return drawPushAlarm();
        var projectSrno = isSelectOnlyOneInMain ? isSelectInMain.attr('project-srno') : LocalUtil.getLocalValue("CURRENT_PROJECT_SETTING", "COLABO_SRNO");

        Ajax.executeApi(RestApi.GET.COLABO2_NOTI_R101, {COLABO_SRNO: projectSrno}, drawPushAlarm)

        function drawPushAlarm(dat) {
            var $pushAlarm = $(dat ? getDetailPushAlarmHtml(dat) : getAllPushAlarmHtml());
            if (dat && dat.PUSH_ALAM_YN === "Y") {
                $pushAlarm.find("#pushSettingBtn").addClass("active");
                $pushAlarm.find(".js-push-selected").removeClass("gray-push-selected").addClass("push-selected");
            } else {
                $pushAlarm.find("#pushSettingBtn").removeClass("active");
                $pushAlarm.find(".js-push-selected").removeClass("push-selected").addClass("gray-push-selected");
            }
            if (dat) {
                if (dat.ALAM_LIST === "Y") {
                    $pushAlarm.find("#allAlarm").prop("checked", "checked");
                } else {
                    $pushAlarm.find("#relatedAlarm").prop("checked", "checked");
                }
            }
            $pushAlarmPopup.append($pushAlarm);
            addPushAlarmClickEvent($pushAlarmPopup.parent());
        }
    }

    function addPushAlarmClickEvent($pushAlarmPopup) {
        $pushAlarmPopup.off('click').on('click', function (e) {

            e.preventDefault();

            var $eTarget = $(e.target);

            var $pushWrap = $pushAlarmPopup.find(".js-push-wrap");
            var $pushSettingBtn = $eTarget.findUp("#pushSettingBtn");
            var isActivePushSetting = $pushSettingBtn.hasClass("active");
            var $allPushSelected = $pushWrap.find(".js-push-selected");
            var $allPushList = $pushWrap.find(".js-push-list");
            var $pushListItem = $eTarget.findUp(".js-push-list-item");
            var $pushSelected = $eTarget.findUp(".js-push-selected");
            var $seviceHelperButton = $eTarget.findUp(".js-service-helper");
            var $alarmWrap = $pushAlarmPopup.find(".js-alarm-wrap");
            var $alarmItem = $eTarget.findUp(".js-alarm-item");

            $allPushList.removeClass("d-block");
            if ($seviceHelperButton.length > 0) {
                var isPushServiceButton = $seviceHelperButton.attr("service-code") === "NOTIFICATION";
                if (isPushServiceButton) window.open(FlowServiceHelper.NOTIFICATION, "_blank");
            }

            if ($pushSettingBtn.length > 0) {
                if (isActivePushSetting) {
                    $pushSettingBtn.removeClass("active");
                    $pushWrap.attr("data-push-alarm", "N");
                    $allPushSelected.removeClass("push-selected").addClass("gray-push-selected")
                    $allPushList.removeClass("d-block");
                } else {
                    $pushSettingBtn.addClass("active");
                    $pushWrap.attr("data-push-alarm", "Y");
                    $allPushSelected.removeClass("gray-push-selected").addClass("push-selected");
                }
                return;
            }

            if ($pushSelected.length > 0) {
                if ($pushWrap.attr("data-push-alarm") === "N") return;
                var $pushList = $pushSelected.next();
                $allPushSelected.removeClass("d-block");
                $pushList.addClass("d-block");
                return;
            }

            if ($pushListItem.length > 0) {
                var $pushList = $pushListItem.parent();
                $pushSelected = $pushList.prev();
                $pushSelected.attr("data-push", $pushListItem.attr("value")).text($pushListItem.text());
                return;
            }

            if ($alarmItem.length > 0) {
                var $alarmLabel = $alarmItem.find(".js-alarm-label");
                var $alarmInput = $alarmItem.find(".js-radio-input");
                $alarmInput.prop("checked", "checked");
                $alarmWrap.attr("data-alarm-list", $alarmLabel.hasClass("js-allAlarm") ? "Y" : "M");
            }
        });

    }

    function getAllPushAlarmHtml() {
        var baseHtml = getPushSettingContentsHtml();
        return ListHelper.replaceJson(baseHtml, {
            ACTIVE: "active",
            PUSH_ALAM_YN: "Y",
            PUSH_SELECTED_TYPE: "push-selected",
            PUSH_COMMT_ALAM_TEXT: i18next.t('dictionary.select'),
            PUSH_REMARK_ALAM_TEXT: i18next.t('dictionary.select'),
        })
    }

    function getDetailPushAlarmHtml(dat) {
        var baseHtml = getPushSettingContentsHtml();
        return ListHelper.replaceJson(baseHtml, {
            ALAM_LIST: dat.ALAM_LIST,
            PUSH_ALAM_YN: dat.PUSH_ALAM_YN,
            PUSH_COMMT_ALAM_YN: dat.PUSH_COMMT_ALAM_YN,
            PUSH_REMARK_ALAM_YN: dat.PUSH_REMARK_ALAM_YN,
            PUSH_COMMT_ALAM_TEXT: getSelectedCommtText(dat.PUSH_COMMT_ALAM_YN),
            PUSH_REMARK_ALAM_TEXT: getSelectedRemarkText(dat.PUSH_REMARK_ALAM_YN),
        })
    }

    function getPushSettingContentsHtml() {
        return $("#pushSettingContentsDiv").html();
    }

    function getSelectedCommtText(PUSH_COMMT_ALAM_YN) {
        return {
            "Y": i18next.t('front.projectTop.receiveAll'),
            "A": i18next.t('front.projectTop.mentionedAlarm'),
            "N": i18next.t('front.projectTop.mute'),
        }[PUSH_COMMT_ALAM_YN];
    }

    function getSelectedRemarkText(PUSH_REMARK_ALAM_YN) {
        return {
            "Y": i18next.t('front.projectTop.receiveAll'),
            "S": i18next.t('front.itemComponent.commentParticipatedAlarm'),
            "W": i18next.t('front.itemComponent.commentWroteAlarm'),
            "A": i18next.t('front.itemComponent.commentMentionAlarm'),
        }[PUSH_REMARK_ALAM_YN];
    }


})()
var Preferences = (function () {

    var $preferencesLayer;

    return {
        openPopupLayer: openPopupLayer,
        closePopupLayer: closePopupLayer,
        getPreferences: getPreferences,
        changeSetting: changeSetting,
        alarmPushSetting: alarmPushSetting,
        doNotDisturbSetting: doNotDisturbSetting,
        savePreferences: savePreferences,
    }

    function openPopupLayer() {
        $preferencesLayer = $("#preferencesLayer");
        getPreferences();
        addEvent();
        $preferencesLayer.removeClass('d-none').addClass('d-block');

        var notDisturbDaily = Often.isFunc(Func.CLOUD.NOTDISTURB);
        $preferencesLayer.find("#notDisturbDailyEmpty").css("display", notDisturbDaily ? "block" : "none");
        $preferencesLayer.find("#notDisturbDailyList").css("display", notDisturbDaily ? "block" : "none");
    }

    function closePopupLayer() {
        $("#preferencesLayer").removeClass('d-block').addClass('d-none');
    }

    function addEvent() {
        $("#pushAlamSetting").off("click").on("click", alarmPushSetting);
        $("#doNotDisturbSetting").off("click").on("click", doNotDisturbSetting);
        $("#projectAlamSetting, #chatAlamSetting").off("click").on("click", changeAlarmSetting);
        $("#doNotDisturbDayby").off("click").on("click", clickDoNotDisturbDayby);
        $("#doNotDisturbStartTime, #doNotDisturbEndTime").off("change").on("change", savePreferences);
    }

    function clickDoNotDisturbDayby(e) {
        var $eTarget = $(e.target);
        if ($eTarget.hasClass("day-of-the-week") || $eTarget.parents(".day-of-the-week").length === 0) return;
        if (!$("#doNotDisturbSetting").hasClass("active")) return;

        var dayOfTheWeek = $eTarget.hasClass("day-of-the-week") ? $eTarget : $eTarget.parents(".day-of-the-week");
        dayOfTheWeek.toggleClass("my-dayby-1").toggleClass("my-dayby-2");
        savePreferences();
    }

    function changeAlarmSetting(e) {
        var $eTarget = $(e.target);
        if (!$("#pushAlamSetting").hasClass("active")) return;
        $eTarget.toggleClass("my-check-2").toggleClass("my-check-2-1");
        savePreferences();
    }

    function changeSetting(e) {
        var $eCurrentTarget = $(e.currentTarget);
        $eCurrentTarget.toggleClass("active");
        savePreferences();
    }

    function alarmPushSetting(e) {
        var $eCurrentTarget = $(e.currentTarget);
        var $pushAlamGroup = $('#pushAlamGroup');
        $eCurrentTarget.toggleClass("active");
        ($eCurrentTarget.context.id === "pushAlamSetting" && $eCurrentTarget.hasClass('active'))
            ?
            $pushAlamGroup.addClass("active")
            :
            $pushAlamGroup.removeClass("active");
        savePreferences();
    }

    function doNotDisturbSetting(e) {
        var $eCurrentTarget = $(e.currentTarget);
        var $doNotDisturbGroup = $('#doNotDisturbGroup');
        $eCurrentTarget.toggleClass("active");
        ($eCurrentTarget.context.id === "doNotDisturbSetting" && $eCurrentTarget.hasClass('active'))
            ?
            $doNotDisturbGroup.addClass("active")
            :
            $doNotDisturbGroup.removeClass("active");
        savePreferences();
    }

    function savePreferences() {
        var lackTimeValue = $("#lockTime").val();
        if (!lackTimeValue) return;
        var lockTime = lackTimeValue.indexOf("시간") > -1
            ? Number(lackTimeValue.replace("시간", "")) * 60
            : lackTimeValue.replace("분", "");
        var dayOfTheWeekLi = $("#doNotDisturbDayby").find("li");
        var notdisturbDay = "";
        for (var i = 0; i < dayOfTheWeekLi.length; i++) {
            if (dayOfTheWeekLi.eq(i).hasClass("my-dayby-2")) {
                notdisturbDay !== "" ? notdisturbDay = notdisturbDay + "," + i : notdisturbDay = notdisturbDay + i;
            }
        }

        var settingData = {
            NOTDISTURB_ALAM: $("#doNotDisturbSetting").hasClass("active") ? "Y" : "N",
            NOTDISTURB_STIME: $("#doNotDisturbStartTime").val().replace(":", ""),
            NOTDISTURB_ETIME: $("#doNotDisturbEndTime").val().replace(":", ""),
            COMMT_ALAM: $("#pushAlamSetting").hasClass("active") ? "Y" : "N",
            FLOW_ALAM_YN: $("#projectAlamSetting").hasClass("my-check-2-1") ? "Y" : "N",
            CHAT_ALAM_YN: $("#chatAlamSetting").hasClass("my-check-2-1") ? "Y" : "N",
            LOCK_MODE_YN: $("#lockModeSetting").hasClass("active") ? "Y" : "N",
            LOCK_MODE_MIN: lockTime,
            NOTDISTURB_DAY: notdisturbDay,
        }

        Ajax.executeApi(RestApi.PUT.COLABO2_SET_U101, settingData, function () {
            Often.toast("success", i18next.t('front.alert.successfullyChange', {status: '$t(dictionary.change)'}));
            BaseSetting.setUserSetting();
            LocalUtil.setLocalValue("ONLY_USER_SETTING", "LOCK_MODE_YN", settingData.LOCK_MODE_YN);
            LocalUtil.setLocalValue("ONLY_USER_SETTING", "LOCK_MODE_MIN", settingData.LOCK_MODE_MIN);
            LockControl.initSetting();
            changeSelectBoxStatus();
        });
    }

    function getPreferences() {
        Ajax.executeApi(RestApi.GET.COLABO2_SET_R101, "", makePreferencesLayer);
    }

    function makePreferencesLayer(dat) {

        addAndRemoveClass($("#pushAlamSetting, #pushAlamGroup"), dat.COMMT_ALAM === "Y");
        addAndRemoveClass($("#doNotDisturbSetting, #doNotDisturbGroup"), dat.NOTDISTURB_ALAM === "Y");
        addAndRemoveClass($("#lockModeSetting"), dat.LOCK_MODE_YN === "Y");
        $("#projectAlamSetting").attr('class', '').attr('class', getYnClass(dat.FLOW_ALAM_YN === "Y"));
        $("#chatAlamSetting").attr('class', '').attr('class', getYnClass(dat.CHAT_ALAM_YN === "Y"));
        $("#lockTime").val(Often.null2Void(dat.LOCK_MODE_MIN, "240"));

        $preferencesLayer = $("#preferencesLayer");
        var $doNotDisturbStartTime = $preferencesLayer.find("#doNotDisturbStartTime");
        var $doNotDisturbEndTime = $preferencesLayer.find("#doNotDisturbEndTime");

        $doNotDisturbStartTime.val(substr2indexAndAddSelect($doNotDisturbStartTime, dat.NOTDISTURB_STIME));
        $doNotDisturbEndTime.val(substr2indexAndAddSelect($doNotDisturbEndTime, dat.NOTDISTURB_ETIME));
        changeSelectBoxStatus();

        var notDisturbDayArray = dat.NOTDISTURB_DAY.split(",");

        $preferencesLayer.find("#doNotDisturbDayby").find("li").attr("class", "day-of-the-week my-dayby-1");
        for (var i = 0; i < notDisturbDayArray.length; i++) {
            if (notDisturbDayArray[i] === "") return;
            var li = $preferencesLayer.find("#doNotDisturbDayby").find("li").eq(notDisturbDayArray[i]);
            li.removeClass("my-dayby-1").addClass("my-dayby-2");
        }

        //Note. 모바일에서 분단위로 방해 금지 모드가 설정되어 있을 경우 시작,종료 시간 못가져오는 이슈로 보이지 않는 option 추가
        function substr2indexAndAddSelect($targetTimeObj, str) {
            var substrData = str.substring(0, 2) + ":" + str.substring(2);
            if (str.substring(2) !== "00") {
                $targetTimeObj.find("option[style=\"display: none;\"]").remove();
                $targetTimeObj.append("<option style='display: none;'>" + substrData + "</option>");
            }
            return substrData;
        }

        function addAndRemoveClass($target, isActive) {
            if (isActive) $target.addClass("active");
            else $target.removeClass("active");
        }

        function getYnClass(isCheck) {
            return "my-check-2" + (isCheck ? "-1" : "");
        }
    }

    function changeSelectBoxStatus() {
        var isDoNotDisturbActive = $("#doNotDisturbSetting").hasClass("active");
        var isLockModeActive = $("#lockModeSetting").hasClass("active");

        $("#doNotDisturbStartTime, #doNotDisturbEndTime").prop("disabled", !isDoNotDisturbActive);
        $("#lockTime").prop("disabled", !isLockModeActive);
    }
})();
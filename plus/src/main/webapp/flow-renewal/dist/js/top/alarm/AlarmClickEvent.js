var AlarmClickEvent = (function () {

    return {
        clickProjectAlarm: clickProjectAlarm,
        clickAlarmUl: clickAlarmUl,
        clickAlarmSearchFilter: clickAlarmSearchFilter,
    }

    // 프로젝트 미확인 알람 클릭 이벤트
    function clickProjectAlarm(e) {
        var $eTarget = $(e.target);
        var $notReadAlarmItem = $eTarget.findUp('.not-read-alarm-item');
        if ($notReadAlarmItem.length === 0) return;
        var alarmDataSet = Often.getAttrs($notReadAlarmItem)[0];
        alarmDataSet.OPEN_POP = true;
        AlarmUpdate.readAlarmAndAction(alarmDataSet);
    }

    // 상단 알림의 클릭 이벤트
    function clickAlarmUl(e) {
        var $alarmItem = $(e.target).findUp(".js-alarm-item");
        if ($alarmItem.length === 0) return;
        var alarmDataSet = Often.getAttrs($alarmItem)[0];
        if ($alarmItem.hasClass("on")) {
            var postSrno = Number(Often.null2Void(alarmDataSet.COLABO_COMMT_SRNO, "-1"));
            if (postSrno > 0) {
                $(e.currentTarget).find(".js-alarm-item.alarm-" + postSrno).removeClass("on");
            } else {
                $alarmItem.removeClass("on");
            }
        }
        alarmDataSet.OPEN_POP = true;
        AlarmUpdate.readAlarmAndAction(alarmDataSet);
    }

    // 상단 알림의 검색 필터
    function clickAlarmSearchFilter() {
        var $alarmSearchFilterLayer = $("#alarmSearchFilterLayer");
        $alarmSearchFilterLayer.toggleClass("d-none");
        if ($alarmSearchFilterLayer.hasClass("d-none")) return;
        setSearchFilterByCode();
        $alarmSearchFilterLayer.off("click").on("click", clickSearchFilterItem);

        function clickSearchFilterItem(e) {
            var $eTarget = $(e.target);
            var $filterItem = $eTarget.findUp(".js-filter-item");
            var isOneItem = ($alarmSearchFilterLayer.find(".setup-active-type-1").length === 1)
            var isIamActive = ($filterItem.hasClass("setup-active-type-1"));
            if (isIamActive && isOneItem) return Often.toast("error", i18next.t('front.alert.searchOption'));
            if ($filterItem.length === 0) return;
            $filterItem.toggleClass("setup-active-type-1");
            LocalUtil.setLocal("ALARM_SEARCH_FILTER", getSearchFilterCode());
            var $alarmSearchInput = $("#alarmSearchInput");
            if ($.trim($alarmSearchInput.val()) === "") return;
            Alarm.drawAlarmList(true);
        }

        function setSearchFilterByCode() {
            var alarmSearchFilter = LocalUtil.getAlarmSearchFilter();
            $alarmSearchFilterLayer.find(".js-filter-item").removeClass("setup-active-type-1");
            alarmSearchFilter.split(",").forEach(function (number) {
                if (number === "") return;
                $alarmSearchFilterLayer.find(".js-filter-item[data-num=" + number + "]").addClass("setup-active-type-1");
            });
        }

        // 상단 알림의 검색 필터 Fragment
        //사이드에서는 안 씀
        function getSearchFilterCode() {
            var tempFilterCode = "";
            $.each($alarmSearchFilterLayer.find(".js-filter-item"), function (i, filterItem) {
                var isChecked = $(filterItem).hasClass("setup-active-type-1");
                isChecked && (tempFilterCode += $(filterItem).attr("data-num") + ",");
            });
            return tempFilterCode;
        }
    }

})()
var CalendarFilter = (function () {
    var $calendarFilter;

    return {
        openCalendarFilter: openCalendarFilter,
        getCalendarFilterJson: getCalendarFilterJson,
        isCalendarFilterAndAction: isCalendarFilterAndAction,
    }

    function set$element() {
        $calendarFilter = $("#leftFilter").find("#calendarFilter"); //좌측 일정 필터 영역
    }

    function initCalendarFilter() {
        var filterJson = getCalendarFilterJson();
        var $scheduleFilter = $calendarFilter.find("#scheduleFilter");
        var $taskFilter = $calendarFilter.find("#taskFilter");
        $scheduleFilter.find(".js-filter-button[gubun=\"" + filterJson["scheduleFilter"] + "\"]").find(".js-common-radio").addClass("all-checked");
        $taskFilter.find(".js-filter-button[gubun=\"" + filterJson["taskFilter"] + "\"]").find(".js-common-radio").addClass("all-checked");
    }

    function openCalendarFilter() {
        set$element();
        initCalendarFilter();
        $calendarFilter.css("display", "block");
    }

    function getCalendarFilterJson() {
        var allCalendarSetting = Often.null2Void(LocalUtil.getLocalJson('ALL_CALENDAR_SETTING'), {});
        return {
            scheduleFilter: Often.null2Void(allCalendarSetting.PROJECT_SCHD, "0,1"),
            taskFilter: Often.null2Void(allCalendarSetting.TASK_SCHD, "2"),
        }
    }

    function isCalendarFilterAndAction($eTarget) {
        if ($eTarget.findUp("#calendarFilter").length === 0) return false;

        if (isFilterButtonAndAction($eTarget)) return true;

        function isFilterButtonAndAction($eTarget) {
            var $filterButton = $eTarget.findUp(".js-filter-button");
            if ($filterButton.length === 0) return false;
            if ($filterButton.hasClass("all-checked")) return true;

            var changeFilterGubun = $filterButton.attr("gubun");
            var $scheduleFilter = $filterButton.findUp("#scheduleFilter");
            var $taskFilter = $filterButton.findUp("#taskFilter");
            if ($scheduleFilter.length !== 0) {
                $scheduleFilter.find(".all-checked").removeClass("all-checked");
                $filterButton.find(".js-common-radio").addClass("all-checked");
                LocalUtil.setLocalValue('ALL_CALENDAR_SETTING', 'PROJECT_SCHD', changeFilterGubun);
            } else {
                $taskFilter.find(".all-checked").removeClass("all-checked");
                $filterButton.find(".js-common-radio").addClass("all-checked");
                LocalUtil.setLocalValue('ALL_CALENDAR_SETTING', 'TASK_SCHD', changeFilterGubun);
            }
            AllCalendar.reloadCalendar();
            return true;
        }
    }
})();
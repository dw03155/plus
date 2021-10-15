var TaskFilter = (function () {

    var $taskFilterButton;
    var $taskFilterUl;
    var taskFilterJson = {};

    return {
        toggleTaskFilterButton: toggleTaskFilterButton,
        getTaskFilter: getTaskFilter,
        getTaskFilterJsonAfterDraw: getTaskFilterJsonAfterDraw,
        updateTaskFilterByJson: updateTaskFilterByJson,
        applyFilterOnOff: applyFilterOnOff,
    }

    function applyFilterOnOff() {
        var isOnTaskFilter = LocalUtil.getTaskFilter() === "ON";
        if (isOnTaskFilter) openFilter($("#leftArea"));
        else closeFilter($("#leftArea"));
    }

    function openFilter($taskFilterArea) {
        $taskFilterArea.find("#leftTask").removeClass("active");
        $taskFilterArea.find("#leftFilter").addClass("active");
        $taskFilterArea.find("#allTaskFilter").css("display", "block");
    }

    function closeFilter($taskFilterArea) {
        $taskFilterArea.find("#leftFilter").removeClass("active");
        $taskFilterArea.find("#leftTask").addClass("active");
        $taskFilterArea.find("#allTaskFilter").css("display", "none");
    }

    function toggleTaskFilterButton(e) {
        var $eCurrentTarget = $(e.currentTarget);
        var $filterArea = $eCurrentTarget.findUp("#leftArea");
        $taskFilterButton = $eCurrentTarget;
        $taskFilterUl = $filterArea.find("#allTaskFilter");
        var isOpenedFilter = $taskFilterButton.hasClass("close");
        $taskFilterUl.css("display", isOpenedFilter ? "block" : "none");
        LocalUtil.setLocal("TASK_FILTER", isOpenedFilter ? "ON" : "OFF");
    }

    function getTaskFilter($allTaskLayer, callback) {

        var $taskGroupFilter = $allTaskLayer.find("#allTaskFilter");
        $taskGroupFilter.find(".js-search-checkbox, .js-common-radio").removeClass("on");
        $taskGroupFilter.find(".js-search-checkbox, .js-common-radio").removeClass("all-checked");

        Ajax.executeApi(RestApi.GET.FLOW_TASK_FILTER_R001, {packetOption: Ajax.OPTION.PREVENT_CALLBACK}, function (filterData) {
            (typeof callback === "function") && callback(filterData);
        });
    }

    function getTaskFilterJsonAfterDraw($allTaskLayer, filterData) {
        var filterJson = getTaskFilterJson(filterData);
        $taskFilterUl = $("#leftArea").find("#allTaskFilter");
        $taskFilterUl.off("click").on("click", clickTaskFilterUl);
        setFilters($taskFilterUl, filterJson);
        return filterJson;
    }

    function setFilters($taskFilterUl, filterData) {

        if (filterData) taskFilterJson = filterData;
        initStatusFilter();

        setFilterByOne('filter-gb', taskFilterJson.FILTER_GB);
        setFilterByMulti('status-filter', taskFilterJson.FIL_STTS);
        setFilterByMulti('priority-filter', taskFilterJson.FIL_PRIORITY);
        setFilterByOne('start-gb-filter', Often.null2Void(questionMark2Zero(taskFilterJson.FIL_START_DT_GUBUN), "0"));
        setFilterByOne('end-gb-filter', Often.null2Void(taskFilterJson.FIL_END_DT_GUBUN, "0"));
        setFilterDisplay($taskFilterUl, taskFilterJson);
        setScrollPosition();

        function setFilterDisplay($taskFilterUl, taskFilterJson) {
            var isStatusVisible = Often.null2Void(taskFilterJson.STTS_VIEW_YN, "N") === "Y";
            var isPriorityVisible = Often.null2Void(taskFilterJson.PRIORITY_VIEW_YN, "N") === "Y";
            var isStartDateVisible = Often.null2Void(taskFilterJson.START_DT_VIEW_YN, "N") === "Y";
            var isEndDateVisible = Often.null2Void(taskFilterJson.END_DT_VIEW_YN, "N") === "Y";

            isStatusVisible && $taskFilterUl.find("#taskStatusFilter .menu-accordion-button").addClass("active");
            isPriorityVisible && $taskFilterUl.find("#taskPriorityFilter .menu-accordion-button").addClass("active");
            isStartDateVisible && $taskFilterUl.find("#taskStartDateFilter .menu-accordion-button").addClass("active");
            isEndDateVisible && $taskFilterUl.find("#taskEndDateFilter .menu-accordion-button").addClass("active");

        }

        function setFilterByOne(key, value) {
            clearFilter(key);
            setFilter(key, value);
        }

        function setFilterByMulti(key, commaString) {
            var valueArray = commaString.split(",");
            $.each(valueArray, function (i, value) {
                setFilter(key, value);
            })
        }


        function setFilter(key, value) {
            var $filter = $taskFilterUl.find(".seach-check-text[" + key + "=" + value + "]");
            $filter.addClass("on");
            $filter.find(".js-search-checkbox, .js-common-radio").addClass("all-checked");
        }

        function clearFilter(key) {
            var $filter = $taskFilterUl.find(".seach-check-text[" + key + "]");
            $filter.removeClass("on");
            $filter.find(".js-search-checkbox, .js-common-radio").removeClass("all-checked");
        }

        function initStatusFilter() {
            var $statusFilterButton = $taskFilterUl.find("#taskStatusFilter").find(".js-filter-button");
            $statusFilterButton.find(".js-search-checkbox, .js-common-radio").removeClass("all-checked");
        }

        function setScrollPosition() {
            var $scrollLayer = $taskFilterUl.find(".js-filter-scroll");
            $.each($scrollLayer, function (i, filter) {
                var $filter = $(filter);
                $filter.scrollTop(0);
                var filterOffsetTop = $filter.offset().top;
                var firstCheckedOffsetTop = $filter.find(".all-checked:first").offset().top;
                var layerHeight = $filter.outerHeight();
                var scrollTop = (firstCheckedOffsetTop > filterOffsetTop + layerHeight) ? firstCheckedOffsetTop - filterOffsetTop : 0
                $filter.scrollTop(scrollTop);
            })
        }
    }

    function questionMark2Zero(text) {
        return (text === "?" ? "" : text)
    }

    function updateTaskFilterByJson(json) {
        Ajax.executeApi(RestApi.PUT.FLOW_TASK_FILTER_U001, json, AllTask.drawTaskInitList);
    }

    function clickTaskFilterUl(e) {

        var $eTarget = $(e.target);
        var $accordionButton = $eTarget.findUp(".js-accordion-button");
        if ($accordionButton.length > 0) {
            $accordionButton.toggleClass("active");
            getUpdateFilterDisplay($accordionButton);
            return;
        }
        var $selectTaskFilterButton = $eTarget.findUp(".js-filter-button");
        var $selectTaskFilterGroup = $eTarget.parents(".js-filter-type");
        var $checkedButton = $selectTaskFilterGroup.find(".js-filter-button.on");
        var $taskFilterUl = $eTarget.parents("#allTaskFilter");
        if ($selectTaskFilterButton.length === 0) return;
        var isRadioButton = $selectTaskFilterGroup.attr("filter-type") === "radio";
        if ($checkedButton.length === 1 && $selectTaskFilterButton.hasClass("on") && !isRadioButton) {
            Often.toast("error", i18next.t('front.alert.checkMoreThanOne'));
            return;
        }

        if (isRadioButton) {
            $selectTaskFilterGroup.find(".js-filter-button").removeClass("on");
            $selectTaskFilterGroup.find(".js-search-checkbox, .js-common-radio").removeClass("all-checked");
        } else {
            //pass
        }

        if ($selectTaskFilterButton.length > 0) {
            $selectTaskFilterButton.toggleClass("on");
            $selectTaskFilterButton.find(".js-search-checkbox, .js-common-radio").toggleClass("all-checked");
            var groupId = $selectTaskFilterGroup.attr("id");
            var $checkButtons = $selectTaskFilterGroup.find(".js-filter-button");
            var updateFilterJson = getUpdateFilterJson(groupId, $checkButtons);
            updateTaskFilterByJson(updateFilterJson);
            taskFilterJson = $.extend({}, taskFilterJson, updateFilterJson);
            setFilters($taskFilterUl);
        } else {
            //pass
        }

        function getUpdateFilterDisplay($accordionButton) {
            var $statusFilter = $accordionButton.parent("#taskStatusFilter");
            var $priorityFilter = $accordionButton.parent("#taskPriorityFilter");
            var $startFilter = $accordionButton.parent("#taskStartDateFilter");
            var $endFilter = $accordionButton.parent("#taskEndDateFilter");
            var isActive = $accordionButton.hasClass("active");
            var updateJson = {};
            if ($statusFilter && $statusFilter.length > 0) {
                updateJson["STTS_VIEW_YN"] = (isActive ? "Y" : "N");

            } else if ($priorityFilter && $priorityFilter.length > 0) {
                updateJson["PRIORITY_VIEW_YN"] = (isActive ? "Y" : "N");

            } else if ($startFilter && $startFilter.length > 0) {
                updateJson["START_DT_VIEW_YN"] = (isActive ? "Y" : "N");

            } else if ($endFilter && $endFilter.length > 0) {
                updateJson["END_DT_VIEW_YN"] = (isActive ? "Y" : "N");
            }

            if (updateJson === {}) return;
            updateTaskFilterByJson(updateJson);
        }

        function getUpdateFilterJson(groupId, $checkButtons) {

            var returnJson = {};
            var filterTypeJson = checkedFilterType(groupId);
            var updateValue = checkedValue($checkButtons, filterTypeJson.DATATYPE);

            AllTask.setTaskJson(filterTypeJson.DATAKEY, updateValue)
            returnJson[filterTypeJson.DATAKEY] = updateValue;
            if (groupId === "taskEndDateFilter" && updateValue === "6") {
                returnJson.DEADLINE_START_DT = "";
                returnJson.DEADLINE_END_DT = "";
            }
            return returnJson;

            function checkedValue($button, dataType) {
                var returnValue = [];
                $.each($button, function (i, v) {
                    var isOn = $(v).hasClass("on");
                    isOn && returnValue.push($(v).attr(dataType))
                });
                return returnValue.join(",");
            }

            function checkedFilterType(parentId) {
                var returnJson = {};
                if (parentId === "taskGroupFilter") {
                    returnJson.DATATYPE = "filter-gb";
                    returnJson.DATAKEY = "FILTER_GB";
                } else if (parentId === "taskStatusFilter") {
                    returnJson.DATATYPE = "status-filter";
                    returnJson.DATAKEY = "FIL_STTS";
                } else if (parentId === "taskPriorityFilter") {
                    returnJson.DATATYPE = "priority-filter";
                    returnJson.DATAKEY = "FIL_PRIORITY";
                } else if (parentId === "taskStartDateFilter") {
                    returnJson.DATATYPE = "start-gb-filter";
                    returnJson.DATAKEY = "FIL_START_DT_GUBUN";
                } else if (parentId === "taskEndDateFilter") {
                    returnJson.DATATYPE = "end-gb-filter";
                    returnJson.DATAKEY = "FIL_END_DT_GUBUN";
                }
                return returnJson;
            }
        }
    }

    function getTaskFilterJson(filterData) {
        return {
            PG_NO: 1,
            VIEW_GB: Often.null2Void(filterData.VIEW_GB, "3"),
            ORDER_TYPE: Often.null2Void(filterData.ORDER_TYPE, "RGSN_DT"),
            ORDER_VALUE: Often.null2Void(filterData.ORDER_VALUE, "0"),
            FILTER_GB: Often.null2Void(filterData.FILTER_GB, "1"),
            FIL_STTS: Often.null2Void(filterData.FIL_STTS, "0,1,2,3,4"),
            FIL_PRIORITY: Often.null2Void(filterData.FIL_PRIORITY, "0,1,2,3,4"),
            FIL_START_DT_GUBUN: Often.null2Void(questionMark2Zero(filterData.FIL_START_DT_GUBUN), "0"),
            FIL_END_DT_GUBUN: Often.null2Void(filterData.FIL_END_DT_GUBUN, "0"),
            END_START_DT: Often.null2Void(filterData.DEADLINE_START_DTTM, ""),
            END_END_DT: Often.null2Void(filterData.DEADLINE_END_DTTM, ""),
            MOD_DT_GB: Often.null2Void(filterData.MODIFIED_DT_GUBUN, "0"),
            MOD_START_DT: Often.null2Void(filterData.MODIFIED_START_DTTM, ""),
            MOD_END_DT: Often.null2Void(filterData.MODIFIED_END_DTTM, ""),
            STTS_VIEW_YN: Often.null2Void(filterData.STTS_VIEW_YN, "Y"),
            PRIORITY_VIEW_YN: Often.null2Void(filterData.PRIORITY_VIEW_YN, "Y"),
            START_DT_VIEW_YN: Often.null2Void(filterData.START_DT_VIEW_YN, "N"),
            END_DT_VIEW_YN: Often.null2Void(filterData.END_DT_VIEW_YN, "N"),
        }
    }

})();
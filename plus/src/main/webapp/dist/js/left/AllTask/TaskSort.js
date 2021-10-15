var TaskSort = (function () {

    var $sortPopup;
    var sortColumn = [];

    return {
        openSortPopup: openSortPopup,
        initSortHeader: initSortHeader,
        drawSortHeader: drawSortHeader,
        getSortColumnHtml: getSortColumnHtml,
        closeSortPopup: closeSortPopup,
    }

    function openSortPopup() {
        var colArray = TaskCode.OPTION._COLUMN_REC;
        $sortPopup = getSortPopupObj(colArray).attr("id", "sortSettingPopup");
        $sortPopup.find("#taskSortList").sortable({
            handle: ".task-set-item",
            containment: "parent",
            tolerance: "pointer",
            axis: "y"
        });
        $sortPopup.off("click").on("click", clickSortSettingPopup);
        $("body").append($sortPopup)
    }

    function initSortHeader($allTaskLayer) {
        var $sortHeader = $allTaskLayer.find("#taskSortHeader");
        $sortHeader.empty();
        sortColumn = [];
    }

    function getSortColumnHtml() {
        var returnHtml = "";
        $.each(sortColumn, function (i, v) {
            var htmlType = TaskCode.OPTION._ITEM[v - 1];
            var replaceCode = TaskCode.OPTION._REPLACE[v - 1];
            var sortCode = TaskCode.OPTION._SORT[v - 1].toLowerCase();
            var cellClass = "task-" + sortCode + "-cell";
            var isTooltip = isTooltipElements(sortCode);
            var isEndDate = replaceCode === "END_DT";
            var mouseoverClass = isTooltip ? "js-mouseover" : "";
            returnHtml += $("#taskList" + htmlType + "Item").html();
            returnHtml = returnHtml.replace("{NOMAL}", "{" + replaceCode + "}")
                .replace("{NOMAL_CLASS}", "js-" + sortCode)
                .replace("{CELL_CLASS}", cellClass)
                .replace("{NOMAL_TEXT_CLASS}", "js-" + sortCode + "-text " + mouseoverClass + (isEndDate ? " {dead-line-class}" : ""))
                .replace("{mouseover}", isTooltip ? "mouseover-text='{MOUSEOVER_TEXT}'" : "");
        })
        return returnHtml;
    }

    function isTooltipElements(classCode) {
        var tooltipClassList = ["rgsr_nm"];
        return (tooltipClassList.indexOf(classCode) > 0);
    }

    function drawSortHeader($allTaskLayer, isDescend, orderType, successCallback) {
        Ajax.executeApi(RestApi.GET.FLOW_TASK_COLUMN_R001, {packetOption: Ajax.OPTION.PREVENT_CALLBACK}, function (taskSortArray) {
            TaskCode.OPTION._COLUMN_REC = taskSortArray.COL_REC;
            var $sortHeader = $allTaskLayer.find("#taskSortHeader");
            $sortHeader.append(getSortHeader(taskSortArray.COL_REC));
            $sortHeader.off("click").on("click", clickTaskSortHeader);
            var colSrno = (TaskCode.OPTION._SORT.indexOf(orderType)) + 1;
            var $taskSortButtonTitle = $sortHeader.find(".js-task-sort-button[col-srno=" + colSrno + "]").find(".title");
            $taskSortButtonTitle.attr("class", "title").addClass(isDescend ? "descend js-task-sort-inner-button" : "ascend js-task-sort-inner-button");
            (typeof successCallback === "function") && successCallback();
        })

        function getSortHeader(taskSortData) {
            var returnHtml = "";
            var baseHtml = $("#taskSortHeaderItem").html();
            $.each(taskSortData, function (i, sortData) {
                if (sortData.USE_YN === "Y") {
                    var columnSrno = sortData.COL_SRNO;
                    sortColumn.push(columnSrno);
                    returnHtml += ListHelper.replaceJson(baseHtml, {
                        COL_SRNO: columnSrno,
                        COL_NM: i18next.t(TaskCode.OPTION._TEXT[columnSrno - 1]),
                        COL_CLASS: setColumnClass(columnSrno),
                        COL_SPAN_CLASS : setSpanColumnClass(),
                    })
                }
            })
            return returnHtml;
        }

        function setColumnClass(colSrno) {
            var taskHeaderClass = "task-" + TaskCode.OPTION._SORT[colSrno - 1].toLowerCase() + "-cell";
            var defaultClass = "js-task-sort-button task-header-cell " + taskHeaderClass;
            return (colSrno === "4") ? defaultClass + " task-name js-task-more" : defaultClass;
        }

        function setSpanColumnClass() {
            return "js-task-sort-inner-button";
        }
    }

    function clickTaskSortHeader(e) {

        var $eTarget = $(e.target);
        var $taskSortHeader = $(e.currentTarget);
        var $sortButton = $eTarget.hasClass("js-task-sort-button") ? $eTarget : $eTarget.parents(".js-task-sort-button");
        if (!$sortButton.hasClass("js-task-sort-button")) return;
        if(!$eTarget.hasClass("js-task-sort-inner-button")) return;
        var $sortType = $sortButton.find(".title");
        var orderType = TaskCode.OPTION._SORT[($sortButton.attr("col-srno") - 1)];
        var isDescend = $sortType.hasClass("descend");
        var isActive = ($sortType.hasClass("descend") || $sortType.hasClass("ascend"));

        var updateJson = {
            ORDER_TYPE: orderType,
            ORDER_VALUE: "",
        }

        if (isActive) {
            updateJson.ORDER_VALUE = (isDescend ? "1" : "0");
            $sortType.attr("class", isDescend ? "title ascend js-task-sort-inner-button" : "title descend js-task-sort-inner-button");
        } else {
            updateJson.ORDER_VALUE = "0";
            $taskSortHeader.find(".title").attr("class", "title js-task-sort-inner-button");
            $sortButton.find(".title").addClass("descend");
        }

        AllTask.setTaskJson("ORDER_TYPE", orderType);
        AllTask.setTaskJson("ORDER_VALUE", updateJson.ORDER_VALUE);
        TaskFilter.updateTaskFilterByJson(updateJson);
    }

    function initSortList() {
        var $sortLi = $sortPopup.find('.js-sort-li');
        $.each($sortLi, function (i, sortData) {
            var colSrno = Number(Often.null2Void($(sortData).attr("col-srno"), 0));
            [1, 2, 3, 4, 5, 6, 7, 9].forEach(function (num) {
                (colSrno === num) && $(sortData).find(".js-sort-button").addClass("active");
            });
            [8, 10, 11].forEach(function (num) {
                (colSrno === num) && $(sortData).find(".js-sort-button").removeClass("active");
            });
        })
    }

    function getSortPopupObj(colArray) {
        var listHtml = "";
        var baseHtml = $("#taskSortPopupLiItem").html();
        var $sortPopup = $($("#taskSortSettingPopupItem").html());
        $.each(colArray, function (i, colData) {
            var colSrno = colData.COL_SRNO;
            var isColTitle = (colSrno === "4");
            listHtml += ListHelper.replaceJson(baseHtml, $.extend({}, colData, {
                "COL_NM": i18next.t(TaskCode.OPTION._TEXT[colSrno - 1]),
                "SORT_TITLE": (isColTitle ? "js-sort-title" : ""),
                "COL_CLASS": ((colData.USE_YN === "Y" || isColTitle) ? "active" : ""),
            }))
        });
        $sortPopup.find("#taskSortList").append($(listHtml));
        return $sortPopup;
    }

    function clickSortSettingPopup(e) {

        var $eTarget = $(e.target);
        var isBackArea = $eTarget.is(".back-area");
        var isCloseBtn = $eTarget.is(".close-button");
        var $sortButton = $eTarget.findUp(".js-sort-button");
        var $saveButton = $eTarget.findUp(".js-save-button");
        var $initButton = $eTarget.findUp(".js-init-button");

        if (isBackArea || isCloseBtn) return closeSortPopup();
        if ($initButton.length > 0) return initSortList();
        if ($sortButton.length > 0) {
            if ($sortButton.hasClass("js-sort-title")) return Often.toast("error", "업무명은 필수 항목입니다.");
            return $sortButton.toggleClass("active");
        }
        if ($saveButton.length > 0) {
            var taskSortList = $sortPopup.find("#taskSortList").find(".js-sort-li");
            var sortArray = []
            $.each(taskSortList, function (i, sortData) {
                var $sortData = $(sortData);
                var activeYn = ($sortData.find(".js-sort-button").hasClass("active") ? "Y" : "N");
                var colSrno = $sortData.attr("col-srno");
                var sortJson = {COL_SRNO: colSrno, COL_ORDER: i + 1, USE_YN: activeYn}
                sortArray[i] = sortJson;
            });
            var updateSortJson = {COL_REC: sortArray}
            updateTaskSort(updateSortJson);
            closeSortPopup();
        }
    }

    function updateTaskSort(sortJson) {
        Ajax.executeApi(RestApi.PUT.FLOW_TASK_COLUMN_U001, sortJson, function () {
            AllTask.drawTaskListWithFilter(true);
        })
    }

    function closeSortPopup() {
        $sortPopup.remove();
    }

})();

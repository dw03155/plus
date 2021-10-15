var AllTask = (function () {

    var $allTaskLayer;
    var $taskContentUl;

    var isProjectTasks;
    var totalTaskCount;

    var taskJson = {
        PG_NO: 1,
        PG_PER_CNT: 30,
        NEXT_YN: "Y"
    }

    return {
        openLayer: openLayer,

        drawTaskListWithFilter: drawTaskListWithFilter,
        drawTaskInitList: drawTaskInitList,

        closeBundleLayer: closeBundleLayer,
        closeSettingLayer: closeSettingLayer,

        searchTaskList: searchTaskList,

        setTaskJson: setTaskJson,
        removeTaskItem: removeTaskItem,
        changeTaskItem: changeTaskItem,

        getTotalTaskCount: getTotalTaskCount,
        getWorkerNameCommaArray: getWorkerNameCommaArray,
        getTaskApiJson: getTaskApiJson,

        get$allTaskLayer: get$allTaskLayer,
    }

    function get$allTaskLayer() {
        return $allTaskLayer;
    }

    function set$element() {
        $allTaskLayer = getAllTaskLayer(isProjectTasks);
        $taskContentUl = $allTaskLayer.find("#taskContentUl");
        /**
         * <div class="allTaskLayer">
         *     <section>
         *         <ul class="js-task-filter-area"></ul>
         *         <button id="taskFilterButton"></button>
         *         <div id="taskContentUl"></div>
         *     </section>
         * </div>
         */
    }

    function getTotalTaskCount() {
        return Number(Often.null2Void(totalTaskCount, '0'));
    }

    function openLayer(projectSrno) {
        isProjectTasks = ("" !== Often.null2Void(projectSrno));
        set$element();

        ListHelper.initPageData(taskJson, $taskContentUl);
        isProjectTasks && DetailHeader.drawInitProjectHeader("task", projectSrno);

        if (isProjectTasks) {
            taskJson.COLABO_SRNO = projectSrno;
            CONNECT_PROJECT_SRNO = projectSrno;
        } else {
            taskJson.COLABO_SRNO = "";
            CONNECT_PROJECT_SRNO = "";
        }

        if (Often.isFunc("EXTEND_TASK_FILTER")) {
            $("#allTaskFilter .js-extend-task-filter").css("display", "block");
        }
        if (Often.isFunc("NARROW_ROW_TASK")) $allTaskLayer.addClass("narrow-row");

        $allTaskLayer.find("li[view-gb='3']").css('display', isProjectTasks ? 'none' : 'block');
        $allTaskLayer.find(".js-task-add-btn")
            .text('+ ' + i18next.t('front.common.add', {val: '$t(dictionary.task)'}))
            .css("display", isProjectTasks ? "block" : "none");
        $allTaskLayer.find("#ganttChartButton").css("display", Often.isFunc(Func.CLOUD.GANTT) ? "block" : "none");

        drawTaskListWithFilter();
        addClickEvent();
    }

    function drawTaskInitList(isUpdate) {
        ListHelper.initPageData(taskJson, (isUpdate ? '' : $taskContentUl));
        drawTaskList();
    }

    function searchTaskList() {
        ListHelper.initPageData(taskJson);
        drawTaskList();
    }

    function drawTaskListWithFilter(isSort) {
        TaskSearch.initSetting($allTaskLayer);
        TaskSort.initSortHeader($allTaskLayer);
        TaskFilter.applyFilterOnOff($allTaskLayer);

        TaskFilter.getTaskFilter($("#leftArea"), function (filterData) {
            if (filterData.VIEW_GB === "4") {
                filterData.VIEW_GB = "0";
            }

            var taskReportFlag = Often.null2Void(LocalUtil.getLocal("TASK_REPORT"));
            if ("" !== taskReportFlag) {
                //업무리포트 접근시 상태 외 모든 언필터 처리
                filterData.FILTER_GB = "3";
                filterData.FIL_STTS = taskReportFlag;
                filterData.FIL_START_DT_GUBUN = "0";
                filterData.FIL_END_DT_GUBUN = "0";
                filterData.FIL_PRIORITY = "";
                LocalUtil.removeLocal("TASK_REPORT");
            }

            taskJson = $.extend(taskJson, TaskFilter.getTaskFilterJsonAfterDraw($allTaskLayer, filterData));
            var isDescend = (taskJson.ORDER_VALUE === "0");
            TaskSort.drawSortHeader($allTaskLayer, isDescend, taskJson.ORDER_TYPE, function () {
                drawTaskList(isSort);
            });
        });
    }

    function getAllTaskLayer(isProjectTasks) {
        return (isProjectTasks ? $("#detailCollectView") : $("#allCollectView")).find(".allTaskLayer");
    }

    function addClickEvent() {

        $allTaskLayer.find(".js-task-add-btn").off("click").on("click", openTaskRegistrationPopup);
        $allTaskLayer.find("#taskFilterButton, .js-filter-area").off("click").on("click", TaskFilter.toggleTaskFilterButton);
        $allTaskLayer.find("#ganttChartButton").off("click").on("click", openGanttChartByProjectSrno);
        $allTaskLayer.find("#excelDownButton").off("click").on("click", TaskExcel.downAllTaskExcel);
        $allTaskLayer.find("#taskSettingButton").off("click").on("click", clickAllTaskSetting);
        $allTaskLayer.find("#sortPopupButton").off("click").on("click", TaskSort.openSortPopup);
        $allTaskLayer.find("#bundleButton").off("click").on("click", clickBundle);
        $allTaskLayer.find("#bundleLayer").off("click").on("click", clickBundleLayer);
        $allTaskLayer.find(".js-task-search-input").off("keyup").on("keyup", TaskSearch.keydownSearchInput);
        $allTaskLayer.find(".js-task-detail-search-button").off("click").on("click", TaskSearch.clickDetailSearchTopButton);

        function openGanttChartByProjectSrno() {
            var projectSrno = Often.null2Void(taskJson.COLABO_SRNO);
            OpenUtil.openGanttChart(projectSrno)
        }

        function clickBundle(e) {
            var $eTarget = $(e.target);
            var $bundleButton = $eTarget.findUp(".js-task-bundle-button");
            if ($bundleButton.length > 0) {
                var $bundleLayer = $allTaskLayer.find("#bundleLayer");
                //Note. 일단 하드코딩으로 간격 맞춤
                var bundleLayerLeft = -$bundleLayer.outerWidth() - 60;
                $bundleLayer.toggle().css("left", bundleLayerLeft);
            }
            return;
        }

        function clickBundleLayer(e) {
            var $eTarget = $(e.target);
            var $bundleLi = $eTarget.findUp(".js-bundle-li");
            if ($bundleLi.length > 0) {
                var viewGb = $bundleLi.attr("view-gb");
                TaskFilter.updateTaskFilterByJson({VIEW_GB: viewGb});
                taskJson.VIEW_GB = viewGb;
                $(".js-alltask-setting-layer").css("display", "none");
                $(".js-task-search-input").focus();
            }
            return;
        }
    }

    function clickAllTaskSetting(e) {
        var $eTarget = $(e.target);
        var $settingButton = $eTarget.findUp(".js-alltask-setting-button");
        var $settingLayer = $settingButton.next(".js-alltask-setting-layer");
        var isVisibleLayer = $settingLayer.is(":visible");
        $settingLayer.css("display", isVisibleLayer ? "none" : "block");
        isVisibleLayer && closeSettingLayer();
    }

    function closeBundleLayer() {
        $("#bundleButton").removeClass("active");
    }

    function closeSettingLayer() {
        $(".js-alltask-setting-layer").css("display", "none");
        $(".js-task-bundle-layer").css("display", "none");
    }

    function openTaskRegistrationPopup() {
        var projectSrno = (ViewChanger.getCurrentPageId() === "task" ? "" : Detail.getProjectSrno());
        PostPopup.openRegistrationView(projectSrno, DetailCode.TASK, false);
    }

    function getTaskApiJson() {
        var $taskDetailSearch = $allTaskLayer.find(".js-task-detail-search-layer");
        var searchFilterJson = SearchFilter.getFilterJson($taskDetailSearch, true, taskJson.PG_NO > 1);
        return $.extend({packetOption: Ajax.OPTION.PREVENT_CALLBACK}, taskJson, {
            SEARCH_RECORD: [$.extend(searchFilterJson, {
                SRCH_WORD: SearchFilter.getSearchWord(searchAreaCode.IN_TASK),
            })],
        })
    }

    function isTaskSearch() {
        return SearchFilter.getSearchWord(searchAreaCode.IN_TASK) !== "";
    }

    function drawTaskList(isSort) {
        if (!isSort && taskJson.NEXT_YN === 'N') return;

        var isFirstPage = taskJson.PG_NO === 1;
        Ajax.executeApi(RenewalApi.GET.ACT_TASK_LIST, getTaskApiJson(), function (taskDataList) {
            $taskContentUl.drawListHelper({
                pageData: taskJson,
                nextYn: taskDataList["NEXT_YN"],
                records: taskDataList["TASK_RECORD"],
                noDataHtml: ListHelper.getNoDataHtml(isTaskSearch() ? "SEARCH" : "TASK"),
                callback: {
                    item: getTaskItemsHtml,
                    scroll: drawTaskList,
                    click: clickTaskContentsUl,
                    final: function () {
                        if (!isFirstPage) return;
                        $allTaskLayer.removeClass("d-none");
                        totalTaskCount = taskDataList.TOTAL_COUNT;
                        var isExistTaskCount = totalTaskCount > 0;
                        isExistTaskCount && $(".js-collection-total-count").text(Often.numberWithCommas(totalTaskCount));
                        $("#" + (isProjectTasks ? "projectCollectionCount" : "allCollectionCount")).css("display", isExistTaskCount ? "inline-block" : "none");
                    }
                }
            })
        })
    }

    function getOneTaskItemHtml(taskData, taskItemHtml, columnHtml) {
        taskItemHtml = taskItemHtml || $("#taskListItem").html();
        columnHtml = columnHtml || TaskSort.getSortColumnHtml();
        var isProjectType = (taskJson.VIEW_GB !== "3");
        var workerRecord = taskData.WORKER_RECORD ? taskData.WORKER_RECORD : taskData.WORKER_REC;
        var taskWorker = ItemTask.getWorkerCountJson(workerRecord);
        var baseHtml = ListHelper.replaceJson(taskItemHtml, {
            LI_STTS: (taskData.STTS === "2" || taskData.STTS === "3" ? TaskCode.OPTION._GB[taskData.STTS] : ""),
            COLUMN_LIST: columnHtml,
            COLABO_SRNO: taskData.COLABO_SRNO,
            COLABO_COMMT_SRNO: taskData.COLABO_COMMT_SRNO,
            TASK_SRNO: taskData.TASK_SRNO,
        });
        var priorityIcon = "icons-" + DetailCode.PRIORITY._GB[taskData.PRIORITY];
        var searchWord = SearchFilter.getSearchWord(searchAreaCode.IN_TASK);
        return ListHelper.replaceJson(baseHtml, $.extend({}, taskData, taskWorker, {
            PRJ_TTL: taskData.PRJ_TTL,
            STTS: TaskCode.OPTION._GB[taskData.STTS],
            STTS_TITLE: i18next.t(TaskCode.OPTION._GB_NM[taskData.STTS]),
            START_DT: Tz.momentTimeZone(taskData.START_DT, "type2"),
            END_DT: setTimeFormatForEndTime(taskData.END_DT),
            progress: ListHelper.setProgressBar(taskData.PROGRESS),
            PRIORITY_ICON: taskData.PRIORITY ? priorityIcon : "",
            PRIORITY: Often.null2Void(i18next.t(DetailCode.PRIORITY._TEXT[taskData.PRIORITY]), "-"),
            RGSN_DT: Tz.momentTimeZone(taskData.RGSN_DTTM, "type2"),
            EDTR_DT: Tz.momentTimeZone(taskData.EDTR_DTTM, "type2"),
            TASK_NM: TagUtil.text2highlight("SEARCH", taskData.TASK_NM, searchWord),
            TASK_NUM: TagUtil.text2highlight("SEARCH", taskData.TASK_NUM, searchWord),
            project_display: ListHelper.setDisplay(!isProjectTasks && isProjectType, "block"),
            MOUSEOVER_TEXT: taskData.RGSR_NM,
            MOUSEOVER_WORKER_LIST: ItemTask.getWorkerListText(workerRecord),
            'subtask-display': ListHelper.setDisplay(Number(taskData.SUBTASK_CNT) > 0, "inline-block"),
            'progress-class': (taskData.PROGRESS === "100") ? "on" : "",
            "dead-line-class": Often.isDeadlineExceeded(taskData.END_DT) ? "deadline-exceeded" : "",
        }))
    }

    /**
     * 마감 시간 리스팅 / 경우에 따른 타임 포멧 설정
     * @param time DB에서 가져온 dttm 형식의 시간
     * @returns {string} 타임존 처리와 경우에 따른 시간 반환
     */
    function setTimeFormatForEndTime(time) {
        var convertedTime = Tz.momentTimeZone(time, 'type16');
        var isToday = Tz.isToday(convertedTime);
        var isTimeExist = Tz.isTimeExists(convertedTime);
        var type = isToday && isTimeExist ? "type21" : "type2"
        return time !== "" ? Tz.momentConversion("convertOnly", type, convertedTime) : "-";
    }

    function getTaskItemsHtml(taskDataList) {
        var groupHtml = "", taskListHtml = ""
        var gubun = "", beforeGubun = "";
        var columnHtml = TaskSort.getSortColumnHtml();
        var isGroupView = (taskJson.VIEW_GB !== "0");
        var groupHeaderHtml = $("#taskListProjectItem").html();
        var taskItemHtml = $("#taskListItem").html();
        var isChangeGubun = false;
        var $lastGubunLi = "";  // 초기화

        //isGroupView, 묶어보기시에는 묶음단위로 li - ul - li로 묶임
        //묶음헤더를 그려놓고 보관해
        //그리고 다음 묶음헤더를 그릴때 여때까지 그린 애들을 넣고 초기화한다
        $.each(taskDataList, function (i, taskData) {
            gubun = taskData.GUBUN;
            taskData.TASK_CNT = Often.numberWithCommas(taskData.TASK_CNT);

            var isDifferentGroup = (gubun !== beforeGubun);
            if (isGroupView && isDifferentGroup) {
                groupHtml += ListHelper.replaceJson(groupHeaderHtml, $.extend({}, taskData, {TASK_UL: "{" + gubun + "}"}));
                if (i > 0) {
                    groupHtml = groupHtml.replace("{" + beforeGubun + "}", taskListHtml);
                    taskListHtml = "";
                }
            } else {
                //pass
            }

            $lastGubunLi = $taskContentUl.find(".js-gubun-li:last");
            if (taskJson.PG_NO > 1 && gubun === $lastGubunLi.attr("id") && !isChangeGubun) {
                taskListHtml = $lastGubunLi.find(".js-inner-task").html();
                isChangeGubun = true;
            }

            isGroupView && (beforeGubun = gubun);
            taskListHtml += getOneTaskItemHtml(taskData, taskItemHtml, columnHtml)
        });
        if (groupHtml === "") {
            groupHtml = taskListHtml;
        } else {
            groupHtml = groupHtml.replace("{" + gubun + "}", taskListHtml);
        }
        if (isChangeGubun && $lastGubunLi !== "") $lastGubunLi.remove();   // 묶어보기 구분이 바뀔때 이전 리스트 지워주는 시점 변경
        return (isGroupView ? groupHtml : taskListHtml);

    }

    function clickTaskContentsUl(e) {

        var $eTarget = $(e.target);
        if (clickGubunOnOff($eTarget)) return;
        if (clickDetailTaskButton($eTarget)) return;

        function clickGubunOnOff($eTarget) {
            var $gubunButton = $eTarget.findUp(".js-gubun-button");
            if ($gubunButton.length === 0) return false;
            var $gubunParent = $eTarget.parents(".js-gubun-li");
            var $taskList = $gubunParent.find(".js-inner-task");
            $eTarget.toggleClass("active");
            if ($eTarget.hasClass("active")) {
                $taskList.slideUp();
            } else {
                $taskList.slideDown();
            }
            return true;
        }

        function clickDetailTaskButton($eTarget) {
            var $taskItem = $eTarget.findUp(".task-item");
            if ($taskItem.length === 0) return false;
            var projectSrno = $taskItem.attr("data-project-srno");
            var postSrno = $taskItem.attr("data-post-srno");
            PostPopup.togglePostView(projectSrno, postSrno, "", function () {
                $("#taskContentUl").find(".highlight").removeClass("highlight");
                $taskItem.addClass("highlight");
            });
            return true;
        }
    }

    function setTaskJson(key, value) {
        taskJson[key] = value;
    }

    function getWorkerNameCommaArray(workerRec) {
        var workerNmList = [];
        $.each(workerRec, function (j, w) {
            workerNmList.push(w.WORKER_NM);
        });
        return workerNmList.join();
    }

    function removeTaskItem(postSrno) {
        var $taskItem = $allTaskLayer.find("#allTask-" + postSrno).filter(":visible");
        var isOnlyOneTaskItemByTotalArea = $taskContentUl.find(".task-item").length === 1;
        var isOnlyOneTaskItemByTargetArea = $taskItem.parent("ul").children(".task-item").length === 1;
        if (isOnlyOneTaskItemByTotalArea) return $taskContentUl.html(ListHelper.getNoDataHtml("TASK"));
        if (isOnlyOneTaskItemByTargetArea) return $taskItem.parents("li.js-gubun-li").remove();
        return $taskItem.remove();
    }

    function changeTaskItem(postSrno) {
        var $targetTaskItem = $allTaskLayer.find("#allTask-" + postSrno).filter(":visible");
        var postData = PostPopup.getOnePostData();
        $targetTaskItem.after(getOneTaskItemHtml($.extend({
            COLABO_SRNO: postData.COLABO_SRNO,
            COLABO_COMMT_SRNO: postData.COLABO_COMMT_SRNO,
        }, postData.TASK_REC[0])));
        $targetTaskItem.remove();
    }

})();
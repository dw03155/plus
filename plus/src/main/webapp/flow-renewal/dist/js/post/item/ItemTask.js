var ItemTask = (function () {

    var isViewPost, isEditPost;
    var taskSrno;
    var $popupBefore;

    return {
        //event
        clickTaskComponent: clickTaskComponent,

        //html
        getLookHtml: getLookHtml,
        getWorkersComponentHtml: getWorkersComponentHtml,

        //json
        makeTaskJson: makeTaskJson,
        getWorkerCountJson: getWorkerCountJson,

        //action
        initEdit: initEdit,
        getWorkerListText: getWorkerListText,
        drawUpdateTask: drawUpdateTask,
        drawUpdateTaskWorker: drawUpdateTaskWorker,
        changeTaskViewByData: changeTaskViewByData,
    }

    function clickTaskComponent(e) {
        $popupBefore = $(e.target).closest(".js-popup-before");
        var isTaskPost = $popupBefore.find(".js-post-nav").hasClass("task");
        if (!isTaskPost) return;
        isViewPost = ($popupBefore.attr("data-code") === "VIEW");
        isEditPost = ($popupBefore.attr("data-code") === "EDIT");
        taskSrno = $popupBefore.find(".task-number").attr("data-task");

        if ($.isTarget(e, ".js-stts")) return updateTaskStatus(e);
        if ($.isTarget(e, ".js-task-worker-layer")) return clickWorkerArea(e);
        if ($.isTarget(e, ".js-more-button")) return clickMoreButton(e);
        if ($.isTarget(e, ".js-date-layer")) return clickDateArea(e);
        if ($.isTarget(e, ".js-priority-layer")) return updateTaskPriority(e);
        if ($.isTarget(e, ".js-progress-button")) return updateTaskProgress(e);
    }

    function getLookHtml(taskData, isEdit) {
        if (!taskData) isEdit = true;
        taskData = taskData || {}

        var statusCode = Often.null2Void(taskData.STTS, "0");
        var priorityCode = Often.null2Void(taskData.PRIORITY, '');
        var progressCode = Often.null2Void(taskData.PROGRESS, "0");
        var startDate = isEdit ? "" : Often.null2Void(taskData.START_DT, '');
        var endDate = isEdit ? "" : Often.null2Void(taskData.END_DT, '');

        var isStartDateExist = startDate.length > 0;
        var isEndDateExist = endDate.length > 0;

        var workerArray = taskData && taskData.WORKER_REC && taskData.WORKER_REC.length > 0 ? taskData.WORKER_REC : [];
        var isStartFullDate = startDate.length > 8;
        var isEndFullDate = endDate.length > 8;

        var isExistsEveryCode = statusCode === "0" && priorityCode.length > 0 && Number(progressCode) > 0 &&
            isStartDateExist && isEndDateExist && workerArray.length > 0;

        var startDateTz = Tz.momentConversion("convertOnly", isStartFullDate ? "type6" : "type5", startDate);
        var endDateTz = Tz.momentConversion("convertOnly", isEndFullDate ? "type6" : "type5", endDate);

        return ListHelper.replaceJson($("#taskComponent").html(), {
            'status-code': DetailCode.STATUS._GB[statusCode],
            'start-date': isStartDateExist ? i18next.t('front.common.from', {val: startDateTz}) : "",
            'end-date': isEndDateExist ? i18next.t('front.common.to', {val: endDateTz}) : "",
            'platpickr-start-date': startDate,
            'platpickr-end-date': endDate,
            'priority-code': Often.null2Void(priorityCode, ""),
            'priority-gb': DetailCode.PRIORITY._GB[priorityCode],
            'priority-text': i18next.t(DetailCode.PRIORITY._TEXT[priorityCode]),
            'progress': getProgressComponentHtml(progressCode),
            'progress-code': progressCode,
            'progress-width': 'style="width:' + progressCode + '%"',
            'progress-class': progressCode === "100" ? "on" : "",
            'workers': getWorkersComponentHtml(workerArray),
            'data-worker-layer-display': ListHelper.setDisplay(isEdit || workerArray.length > 0, "table"),
            'date-layer-display': ListHelper.setDisplay((isStartDateExist || isEndDateExist), "table"),
            'start-date-button-display': ListHelper.setDisplay(!isStartDateExist, "inline-block"),
            'start-date-text-display': ListHelper.setDisplay(isStartDateExist, "inline-block"),
            'end-date-button-display': ListHelper.setDisplay(!isEndDateExist, "inline-block"),
            'end-date-text-display': ListHelper.setDisplay(isEndDateExist, "inline-block"),
            'priority-display': ListHelper.setDisplay((priorityCode !== ''), "table"),
            'priority-button-display': ListHelper.setDisplay((priorityCode === ''), "inline-block"),
            'priority-text-display': ListHelper.setDisplay((priorityCode !== ''), "inline-block"),
            'more-button-display': ListHelper.setDisplay(!isExistsEveryCode, "block"),
            "progress-display": ListHelper.setDisplay(progressCode !== "0", "table"),
            "dead-line-class": Often.isDeadlineExceeded(endDate) ? "deadline-exceeded" : "",
            "manager-text": i18next.t(workerArray.length > 0 ? 'front.common.change' : 'front.common.add', {val: '$t(dictionary.manager)'}),
        });
    }

    function getProgressComponentHtml() {
        var returnHtml = "";
        for (var i = 0; i <= 10; i++) {
            returnHtml += '<span class="js-progress-button" data-progress-value="' + (i * 10) + '"><em>' + (i * 10) + '%</em></span>'
        }
        return returnHtml;
    }

    function getWorkersComponentHtml(workersArray) {
        var returnHtml = "";
        for (var i = 0; i < workersArray.length; i++) {
            var worker = workersArray[i];
            var baseHtml = $("#taskSelectedWorkerItem").html();
            var profile = worker.WORKER_PRFL_PHTG ? worker.WORKER_PRFL_PHTG : worker.PRFL_PHTG;
            returnHtml += ListHelper.replaceJson(baseHtml, $.extend({
                WORKER_PRFL_PHTG: profile,
                profile: ListHelper.setProfile(profile),
            }, worker));
        }
        return returnHtml;
    }

    /**
     * Note
     * 업무 게시글 상태 옵션( 시작일시, 마감일시, 우선순위, 진척도 ) display 제어
     */

    function initEdit($postPopup) {
        var buttonArray = ["startDate", "endDate", "priority"];
        buttonArray.forEach(function (buttonName) {
            PostPopup.initButtonByCode($postPopup, buttonName);
        })
        var $taskOption = $postPopup.find(".js-task-option:visible");
        var $moreButton = $postPopup.find(".js-more-button");
        var isEmptyStartDate = $.trim($taskOption.find(".js-start-flatpickr .js-pickr-text").text()).length === 0;
        var $startDateLayer = $taskOption.find(".js-start-date-layer");
        $startDateLayer.css("display", isEmptyStartDate ? "none" : "table");

        var isEmptyEndDate = $.trim($taskOption.find(".js-end-flatpickr .js-pickr-text").text()).length === 0;
        var $endDateLayer = $taskOption.find(".js-end-date-layer");
        $endDateLayer.css("display", isEmptyEndDate ? "none" : "table");

        var isEmptyPriority = $taskOption.find(".js-priority").attr("data-priority") === "";
        $taskOption.find(".js-priority-layer").css("display", isEmptyPriority ? "none" : "table")

        var isEmptyProgress = $taskOption.find(".js-progress-bar").attr("data-progress") === "0";
        $taskOption.find(".js-progress-layer").css("display", isEmptyProgress ? "none" : "table");

        var $taskWorkerLayer = $taskOption.find(".js-task-worker-layer");
        var isAdd = PostCondition.getPopupMode($postPopup) === "ADD";
        var isEmptyWorker = isAdd || $taskWorkerLayer.find(".js-registration").length > 0;
        $taskWorkerLayer.css("display", isEmptyWorker ? "table" : "none");

        if ((!isEmptyStartDate && !isEmptyEndDate) && !isEmptyPriority && !isEmptyProgress && isEmptyWorker) $moreButton.css("display", "none");

        if (Often.isFunc(Func.CLOUD.INVITATION_POPUP)) {
            addInputWorkerEvent($postPopup, $taskOption);
        }
    }

    function addInputWorkerEvent($postPopup, $taskOption) {
        var isViewPost = ($postPopup.attr("data-code") === "VIEW");
        $taskOption.find(".js-worker-input").css("display", isViewPost ? "none" : "inline-block");
        $taskOption.find(".js-worker-button").css("display", isViewPost ? "inline-block" : "none");
        if (!isViewPost) WorkerPopup.addInputWorkerEvent($postPopup, function (workerData) {
            var $workers = $taskOption.find(".js-workers");
            var isSame = false;
            $.each($workers.find(".js-registration"), function (i, worker) {
                if ($(worker).attr("data-worker-id") === workerData[0].WORKER_ID) {
                    isSame = true;
                    return false;
                }
            });
            if (isSame) return Often.toast("error", "이미 등록된 참여자입니다.");
            $workers.append(getWorkersComponentHtml(workerData));
        });
    }



    function addDatePickerOnTask() {
        var $pickrLayer;
        var selectDate;
        var isSame = false;

        var defaultTime = Tz.roundMomentByMinutes(10);
        var defaultHour = defaultTime.split(" ")[0];
        var defaultMinute = defaultTime.split(" ")[1];

        var $taskOption = $popupBefore.find(".js-task-option:visible");

        DatePicker.makeFlatPickr({
            defaultHour: defaultHour,
            defaultMinute: defaultMinute,
            dateFormat: "YmdHi00",
            startDate: $taskOption.find(".js-start-flatpickr .js-pickr-date").val(),
            endDate: $taskOption.find(".js-end-flatpickr .js-pickr-date").val(),
            inputObj: {
                start: $taskOption.find(".js-start-flatpickr"),
                end: $taskOption.find(".js-end-flatpickr"),
            },
            callback: {
                close: setFunction,
            },
            enableTime: true,
            time_24hr: true,
            dateVer: true,
            minuteIncrement: Often.isFunc(Func.CLOUD.EDIT_TIME_TEXT) ? 1 : 10,
        });

        function setFunction($flatpickr, selectDatePick, isSameDate) {
            $pickrLayer = $flatpickr;
            selectDate = selectDatePick;
            isSame = isSameDate;
            updateCallback();
        }

        function updateCallback() {
            if (isSame) return;
            var isStartPickr = $pickrLayer.hasClass("js-start-flatpickr");

            drawUpdateTask({
                OBJECT: isStartPickr ? "START_DT" : "END_DT",
                TASK_SRNO: taskSrno,
                VALUE: selectDate
            }, setDate, isViewPost, $popupBefore);

            function setDate() {
                var $datePickrLayer = $pickrLayer.closest(".js-pickr-layer");
                var $pickrLabel = $datePickrLayer.find(".js-date-label");
                var $pickrInput = $datePickrLayer.find(".js-pickr-date");
                var $pickrText = $datePickrLayer.find(".js-pickr-text");
                var $dateBackLayer = $datePickrLayer.find(".js-date-back-layer");
                var $removeButton = $datePickrLayer.find(".js-remove-date");
                var isFullDate = selectDate.length > 8;
                $pickrInput.val(selectDate);
                $pickrLabel.css("display", "none");
                $dateBackLayer.css("display", "block");
                $removeButton.css("display", "inline-block");
                var convertDate = Tz.momentConversion("convertOnly", isFullDate ? "type6" : "type5", selectDate);
                $pickrText.text(i18next.t('front.common.' + (isStartPickr ? 'from' : 'to'), {val: convertDate})).css("display", "inline-block");
                DatePicker.checkOverDate($pickrText, selectDate);
            }
        }
    }


    function drawUpdateTaskWorker(mode, value, callback, isViewPost, $popupBefore) {
        var contents = {
            EDIT: i18next.t('front.common.ask', {val: '$t(dictionary.manager)', status: '$t(dictionary.edit)'}),
            DELETE: i18next.t('front.common.ask', {val: '$t(dictionary.manager)', status: '$t(dictionary.delete)'}),
        }

        if (!isViewPost) return callback();
        PopupDraw.drawConfirm({
            contents: {main: contents[mode]},
            callback: {submit: submitUpdateTaskWorker}
        })

        function submitUpdateTaskWorker() {
            updateWorker(callback, value, $popupBefore);
        }
    }

    function drawUpdateTask(json, callback, isViewPost, $postTarget, isRemove) {
        var contents = {
            STTS: i18next.t('front.common.ask', {val: '$t(dictionary.status)', status: '$t(dictionary.change)'}),
            PRIORITY: i18next.t('front.common.ask', {
                val: '$t(front.common.priority)',
                status: '$t(dictionary.change)'
            }),
            START_DT: i18next.t('front.common.ask', {
                val: '$t(front.common.startDate)',
                status: isRemove ? '$t(dictionary.delete)' : '$t(dictionary.change)'
            }),
            END_DT: i18next.t('front.common.ask', {
                val: '$t(front.common.dueDate)',
                status: isRemove ? '$t(dictionary.delete)' : '$t(dictionary.change)'
            }),
        }

        if (json.OBJECT.indexOf("_REMOVE") > -1) json.OBJECT = json.OBJECT.replace("_REMOVE", "");

        if (!isViewPost) return callback();
        if (json.OBJECT === "PROGRESS") return submitUpdateTask();

        PopupDraw.drawConfirm({
            contents: {main: contents[json.OBJECT]},
            callback: {submit: submitUpdateTask}
        })

        function submitUpdateTask() {
            var $targetObject = ($postTarget ? $postTarget : $popupBefore);
            var projectSrno = $targetObject.attr("data-project-srno");
            var postSrno = $targetObject.attr("data-post-srno");
            var remarkSrno = $targetObject.find(".remark-item:last").attr("remark-srno");
            Ajax.executeApi(RenewalApi.GET.ACT_ONE_TASK_STATE, {
                COLABO_SRNO: projectSrno,
                COLABO_COMMT_SRNO: postSrno,
                OBJECT: json.OBJECT,
                VALUE: json.VALUE,
            }, function (dat) {
                if (Often.null2Void(dat.RETURN_MSG, "N") === "Y") {
                    updateTask(callback, json, $postTarget);
                } else {
                    callback();
                    updateTaskStateRemark(projectSrno, postSrno, remarkSrno);
                    var messageType = {
                        STTS: "상태",
                        START_DT: "시작일",
                        END_DT: "마감일",
                        PRIORITY: "우선순위",
                        PROGRESS: "진척도",
                    }
                    if (Often.null2Void(json.VALUE) !== "") Often.toast("info", "이미 동일한 " + messageType[json.OBJECT] + " 로 변경되었습니다.");
                    else Often.toast("info", "이미 삭제되었습니다.");
                }
            });
        }
    }

    function updateTaskStatus(e) {
        var $eTarget = $(e.target);
        var $statusButton = $eTarget.closest(".js-stts");
        if (!isAvailableWrite(getRegisterId($eTarget))) return;
        var isSameData = $statusButton.parents(".js-task-state").attr("data-status") === $statusButton.attr("stts");
        if (isSameData) return;
        var statusValue = DetailCode.STATUS._GB.indexOf($statusButton.attr("stts"));
        drawUpdateTask({
            OBJECT: "STTS",
            TASK_SRNO: taskSrno,
            VALUE: statusValue
        }, setStatus, isViewPost);

        function setStatus() {
            var $statusTarget = $eTarget.parents(".js-task-state");
            $statusTarget.attr("class", "").addClass("js-task-state state-button-group clearfix " + $statusButton.attr("stts"));
            $statusTarget.attr("data-status", $statusButton.attr("stts"));

            if (statusValue === taskStatusCode.COMPLETION && PostCondition.getPopupMode($popupBefore) === "VIEW") {
                var $taskOption = $eTarget.closest(".js-task-option");
                var $progressLayer = $taskOption.find(".js-progress-layer");
                var $progressBar = $progressLayer.find(".js-progress-bar");
                var $progressText = $progressLayer.find(".js-progress-text");
                $progressLayer.css("display", "table").addClass("on");
                $progressBar.css("width", "100%").attr("data-progress", "100");
                $progressText.text("100%");
            }

        }
    }

    function updateTaskProgress(e) {
        var $eTarget = $(e.target);
        var $progressBar = $eTarget.closest(".js-progress-button");
        if (!isAvailableWrite(getRegisterId($eTarget))) return true;

        var isSameData = $progressBar.parents(".js-progress").find(".js-progress-bar").attr("data-progress") === $progressBar.attr("data-progress-value")
        if (isSameData) return false;
        var progressValue = $progressBar.attr("data-progress-value");
        drawUpdateTask({
            OBJECT: "PROGRESS",
            TASK_SRNO: taskSrno,
            VALUE: progressValue
        }, setProgress, isViewPost);
        return true;

        function setProgress() {
            var $progressLayer = $eTarget.closest(".js-progress-layer");
            var progressData = $.trim($eTarget.text());
            $progressLayer.find(".js-progress-bar").css("width", progressData);
            $progressLayer.find(".js-progress-bar").attr("data-progress", progressData.replace("%", ""));
            $progressLayer.find(".js-progress-text").text(progressData);
            if (progressData === "100%") $progressLayer.addClass("on");
            else $progressLayer.removeClass("on");
            ($eTarget.closest(".js-popup-before").attr("data-code") === "VIEW") && Often.toast("success", "진척도가 변경되었습니다.");
        }
    }

    function clickWorkerArea(e) {
        var $eTarget = $(e.target);
        var $workerLayer = $eTarget.closest(".js-task-worker-layer");
        if (!isAvailableWrite(getRegisterId($eTarget))) return;

        //추가버튼
        var $addWorkerButton = $eTarget.closest(".js-worker-button");
        var postSrno = $popupBefore.attr('data-post-srno');
        var isUpdateManager = $addWorkerButton.length > 0 && !!postSrno;
        var remarkSrno = $popupBefore.find(".remark-item:last").attr("remark-srno");

        if (isUpdateManager && Often.isFunc("INVITATION_POPUP")) {
            InvitationPopup.openManagerPopup($popupBefore.attr('data-post-srno'), taskSrno, remarkSrno)
            return;
        } else if ($addWorkerButton.length > 0 || (isUpdateManager && !Often.isFunc("INVITATION_POPUP"))) {
            WorkerPopup.toggleWorkerPopup($popupBefore, submitInWorkerPopup, $addWorkerButton, makeWorkerCallback)
            return;
        }

        //삭제버튼
        var $removeWorkerButton = $eTarget.closest(".js-remove-worker");
        if ($removeWorkerButton.length > 0) {
            var removeWorkerId = $removeWorkerButton.parents(".js-registration").attr("data-worker-id")
            drawUpdateTaskWorker("DELETE", {
                TASK_SRNO: taskSrno,
                WORKER_REC: makeWorkerRecord($popupBefore, removeWorkerId),
            }, removeWorker, isViewPost, $eTarget.closest(".detail-item"))
            return;
        }

        //담당자프로필
        var $workerMoreProfile = $eTarget.closest(".js-registration");
        if ($workerMoreProfile.length > 0) {
            var workerId = $workerMoreProfile.attr("data-worker-id");
            Profile.drawProfilePopup(workerId);
            return;
        }

        function removeWorker() {
            $removeWorkerButton.parents(".js-registration").remove()
        }

        function submitInWorkerPopup(submitWorkerRecord) {
            var isChangeWorker = false;
            var checkWorkerRecord = makeWorkerRecord($workerLayer);
            if (submitWorkerRecord.length !== checkWorkerRecord.length) {
                isChangeWorker = true;
            } else {
                $.each(submitWorkerRecord, function (i, submitWorker) {
                    if (submitWorker.WORKER_ID !== checkWorkerRecord[i].WORKER_ID) {
                        isChangeWorker = true;
                        return false;
                    }
                })
            }
            if (!isChangeWorker) return;
            drawUpdateTaskWorker("EDIT", {
                TASK_SRNO: taskSrno,
                WORKER_REC: submitWorkerRecord,
            }, setWorker, isViewPost, $popupBefore)

            function setWorker() {
                $workerLayer.find(".js-registration").remove();
                $workerLayer.find(".js-workers").append(getWorkersComponentHtml(submitWorkerRecord));
            }
        }

        function makeWorkerCallback() {
            return makeWorkerRecord($popupBefore);
        }
    }

    function clickDateArea(e) {
        var $eTarget = $(e.target);
        var $dateLayer = $eTarget.closest(".js-date-layer");
        if (!isAvailableWrite(getRegisterId($eTarget))) return true;

        var $flatPickrLayer = $eTarget.closest(".js-pickr-layer");
        var isStartPickr = $flatPickrLayer.hasClass("js-start-flatpickr");
        var $removeDateButton = $eTarget.closest(".js-remove-date")
        if ($removeDateButton.length > 0) {
            e.stopPropagation();
            e.preventDefault();
            drawUpdateTask({
                OBJECT: isStartPickr ? "START_DT" : "END_DT",
                TASK_SRNO: taskSrno,
                VALUE: "",
            }, removeDate, isViewPost, '', true);
            return;
        }

        if ($flatPickrLayer.length > 0) {
            addDatePickerOnTask();
        }
        return true;

        function removeDate() {
            var $dateParent = $removeDateButton.parents(".js-date-option");
            $dateParent.find(".js-date-text").text("");
            $dateParent.find(".js-date-label input").val("");
            $dateParent.find(".js-pickr-text").css("display", "none");
            $dateParent.find(".js-date-label ").css("display", "block");
            $dateParent.find(".js-date-back-layer").css("display", "none");
            $removeDateButton.css("display", "none");
            $dateParent.find(".js-date-label").css("z-index", "0").css("position", "");
        }
    }

    function clickMoreButton(e) {
        var $eTarget = $(e.target);
        var $moreButton = $eTarget.closest(".js-more-button");
        if (!isAvailableWrite(getRegisterId($eTarget))) return true;

        var $taskOption = $moreButton.parents(".js-task-option");
        var $summaryPost = $taskOption.parents("#summaryPost:visible");
        if ($summaryPost.css("max-height") === "400px") $summaryPost.css("max-height", "548px"); //기존 400px => 영역 늘어나면 548px
        $moreButton.css("display", "none");
        $taskOption.find(".js-more-task-li").css("display", "table");
        $taskOption.find(".js-date-layer").css("display", "table");
        return true;
    }

    function updateTaskPriority(e) {
        var $eTarget = $(e.target);
        var $priorityLayer = $eTarget.closest(".js-priority-layer");
        if (!isAvailableWrite(getRegisterId($eTarget))) return true;

        var $taskOption = $priorityLayer.parents(".js-task-option");
        var $priority = $priorityLayer.find(".js-priority");
        var $priorityList = $taskOption.find(".js-priority-setting-layer");
        var $priorityButton = $eTarget.closest(".js-priority-setting-button");
        var $priorityRemove = $eTarget.closest(".js-remove-priority");
        var $addPriority = $eTarget.closest(".js-priority-button");
        var $prioritySpan = $eTarget.closest("#prioritySpan");
        var priorityCode = $priorityButton.attr("data-priority-code");

        if ($priorityButton.length > 0) {
            var isSameData = DetailCode.PRIORITY._GB.indexOf(priorityCode) === Number(Often.null2Void($priority.attr("data-priority"), "-1"));
            if (isSameData) {
                $priorityList.css("display", "none");
            } else {
                drawUpdateTask({
                    OBJECT: "PRIORITY",
                    TASK_SRNO: taskSrno,
                    VALUE: DetailCode.PRIORITY._GB.indexOf(priorityCode)
                }, changePriority, isViewPost);
            }
            return true;
        }

        if ($priorityRemove.length > 0) {
            drawUpdateTask({
                OBJECT: "PRIORITY",
                TASK_SRNO: taskSrno,
                VALUE: ""
            }, removePriority, isViewPost);
            return true;
        }

        if ($addPriority.length > 0 || $prioritySpan.length > 0) {
            var isListVisible = $priorityList.is(":visible");
            $priorityList.css("display", isListVisible ? "none" : "block");
            return true;
        }

        function removePriority() {
            $priority.attr("data-priority", "");
            $priorityLayer.find("#prioritySpan").css("display", "none");
            $priorityLayer.find("#priorityButton").css("display", "block");
            $priorityList.css("display", "none");
        }

        function changePriority() {
            var selectPriorityText = $priorityButton.text();
            var selectPriorityCode = $priorityButton.attr("data-priority-code");
            var selectPriorityIcon = $priorityButton.find("i:first").attr("class");
            $priorityLayer.find(".js-priority").attr("data-priority", DetailCode.PRIORITY._GB.indexOf(selectPriorityCode));
            $priorityLayer.find(".js-priority-text").text(selectPriorityText);
            $priorityLayer.find("#prioritySpan i:first").attr("class", selectPriorityIcon);
            $priorityLayer.find("#prioritySpan").css("display", "inline-block");
            $priorityLayer.find("#priorityButton").css("display", "none");
            $priorityList.css("display", "none");
        }
    }

    function makeTaskJson($postPopup) {
        var taskJson = {};
        var isInput = $postPopup.find(".js-post-title:visible").is("textarea") || $postPopup.find(".js-post-title:visible").is("input");
        var taskName = (isInput ? $postPopup.find(".js-post-title:visible").val() : $postPopup.find(".js-post-title:visible").text());
        var $taskOption = $postPopup.find(".js-task-option:visible");
        taskJson["TASK_NM"] = Often.null2Void($.trim(taskName));
        taskJson["STTS"] = TaskCode.OPTION._GB.indexOf(Often.null2Void($taskOption.find(".js-task-state:visible").attr("data-status"), "request"));
        taskJson["WORKER_REC"] = Often.null2Void(makeWorkerRecord($postPopup), []);
        taskJson["START_DT"] = Often.null2Void($.trim($taskOption.find(".js-start-flatpickr .js-pickr-date").val()), "");
        taskJson["END_DT"] = Often.null2Void($.trim($taskOption.find(".js-end-flatpickr .js-pickr-date").val()), "");
        taskJson["PROGRESS"] = Often.null2Void($.trim($taskOption.find(".js-progress-bar:visible").attr("data-progress")));
        taskJson["PRIORITY"] = Often.null2Void($.trim($taskOption.find(".js-priority:visible").attr("data-priority")), "");
        return [taskJson];
    }

    function makeWorkerRecord($popupBefore, targetWorkerId) {
        var workerRec = [];
        $popupBefore.find(".js-registration:visible").each(function (i, worker) {
            var workerId = $(worker).attr("data-worker-id");
            var workerName = $(worker).attr("data-worker-name");
            var workerProfile = $(worker).attr("data-worker-profile");
            if (workerId && (workerId === targetWorkerId)) return;
            workerRec.push({
                WORKER_ID: workerId,
                WORKER_NM: workerName,
                WORKER_PRFL_PHTG: workerProfile,
            });
        });
        return workerRec;
    }

    function updateWorker(callback, updateJson, $postTarget) {

        Ajax.executeApi(RestApi.PUT.FLOW_TASK_WORKER_U002, $.extend({}, updateJson), function () {
            (typeof callback === 'function') && callback();
            var $targetObject = ($postTarget ? $postTarget : $popupBefore);
            var projectSrno = $targetObject.attr("data-project-srno");
            var postSrno = $targetObject.attr("data-post-srno");
            var remarkSrno = $targetObject.find(".remark-item:last").attr("remark-srno");
            console.log(remarkSrno);
            updateTaskStateRemark(projectSrno, postSrno, remarkSrno);

            var updateWorkerJson = {
                OBJECT: "WORKER",
                WORKER_REC: updateJson.WORKER_REC,
            }

            UpdateElements.autoUpdateElem({
                PROJECT_SRNO: projectSrno,
                POST_SRNO: postSrno,
                TASK_DATA: updateWorkerJson,
            });
        })
    }

    function updateTask(callback, updateJson, $postTarget) {
        Ajax.executeApi(RestApi.PUT.COLABO2_TASK_U001, $.extend({}, updateJson), function () {
            (typeof callback === 'function') && callback();
            var $targetObject = ($postTarget ? $postTarget : $popupBefore);
            var projectSrno = $targetObject.attr("data-project-srno");
            var postSrno = $targetObject.attr("data-post-srno");
            var remarkSrno = $targetObject.find(".remark-item:last").attr("remark-srno");
            var isProgressUpdate = (updateJson.OBJECT === "PROGRESS");

            if (!isProgressUpdate) { // 댓글 업데이트
                updateTaskStateRemark(projectSrno, postSrno, remarkSrno);
            }

            UpdateElements.autoUpdateElem({
                PROJECT_SRNO: projectSrno,
                POST_SRNO: postSrno,
                TASK_DATA: updateJson,
            });

            if (updateJson.OBJECT === "STTS" && updateJson.VALUE === 2) {
                updateTask("", {
                    OBJECT: "PROGRESS",
                    TASK_SRNO: updateJson.TASK_SRNO,
                    VALUE: "100"
                });
            }

        });
    }

    function updateTaskStateRemark(projectSrno, postSrno, remarkSrno) {
        UpdateElements.autoUpdateElem({
            PROJECT_SRNO: projectSrno,
            POST_SRNO: postSrno,
            REMARK_SRNO: remarkSrno,
            REMARK_UPDATE: true,
        });
    }

    function getWorkerListText(workerRecord) {
        if (!workerRecord) return "";
        var workerList = "";
        var workerCount = workerRecord.length - 1;
        $.each(workerRecord, function (i, worker) {
            workerList += worker.WORKER_NM;
            (workerCount > i) && (workerList += ", ");
        })
        return workerList;
    }

    function getWorkerCountJson(data) {
        var workerRecord = Often.null2Void(data, []);
        var firstWorker = workerRecord.length > 0 ? workerRecord[0].WORKER_NM : "-";
        var workerCount = workerRecord.length > 1 ? "외 " + (workerRecord.length - 1) + "명" : "";
        return {WORKER: firstWorker, WORKER_COUNT: workerCount};
    }

    function changeTaskViewByData($postPopup, taskRecord) {
        var $taskOption = $postPopup.find(".js-task-option:visible");
        if (taskRecord.STTS.length > 0) {
            $taskOption.find(".js-task-state").attr({
                "data-status": DetailCode.STATUS._GB[taskRecord.STTS],
                "class": "js-task-state state-button-group clearfix " + DetailCode.STATUS._GB[taskRecord.STTS]
            });
        }
        if (!SpaceSelectable.isSharePost($postPopup) && taskRecord.WORKER_REC.length > 0) {
            $taskOption.find(".js-workers").append(ItemTask.getWorkersComponentHtml(taskRecord.WORKER_REC));
        }
        if (taskRecord.START_DT.length > 0) {
            var isStartFullDate = taskRecord.START_DT.length > 8;
            var startTime = Tz.momentTimeZone(taskRecord.START_DT, isStartFullDate ? "type6" : "type5")
            $taskOption.find(".js-start-flatpickr .js-pickr-date").val(taskRecord.START_DT);
            $taskOption.find(".js-start-flatpickr .js-date-label").css("display", "none");
            $taskOption.find(".js-start-flatpickr .js-date-text").text(i18next.t('front.common.from', {val: startTime}));
            $taskOption.find(".js-start-flatpickr .js-date-back-layer").css("display", "inline-block");
            $taskOption.find(".js-start-flatpickr .js-remove-date").css("display", "inline-block");
        }
        if (taskRecord.END_DT.length > 0) {
            var isEndFullDate = taskRecord.END_DT.length > 8;
            var endTime = Tz.momentTimeZone(taskRecord.END_DT, isEndFullDate ? "type6" : "type5");
            $taskOption.find(".js-end-flatpickr .js-pickr-date").val(taskRecord.END_DT);
            $taskOption.find(".js-end-flatpickr .js-date-label").css("display", "none");
            $taskOption.find(".js-end-flatpickr .js-date-text").text(i18next.t('front.common.to', {val: endTime}));
            $taskOption.find(".js-end-flatpickr .js-date-back-layer").css("display", "inline-block");
            $taskOption.find(".js-end-flatpickr .js-remove-date").css("display", "inline-block");
        }
        if (taskRecord.PRIORITY.length > 0) {
            $taskOption.find(".js-priority").attr("data-priority", taskRecord.PRIORITY);
            $taskOption.find("#prioritySpan i:first").attr("class", "icons-" + DetailCode.PRIORITY._GB[taskRecord.PRIORITY] + " small");
            $taskOption.find(".js-priority-text").text(i18next.t(DetailCode.PRIORITY._TEXT[taskRecord.PRIORITY]));
        }
        if (taskRecord.PROGRESS.length > 0) {
            $taskOption.find(".js-progress-layer").addClass(taskRecord.PROGRESS === "100" ? "on" : "")
            $taskOption.find(".js-progress-bar").attr("data-progress", taskRecord.PROGRESS);
            $taskOption.find(".js-progress-bar").css("width", taskRecord.PROGRESS + "%");
            $taskOption.find(".js-progress-text").text(taskRecord.PROGRESS + "%");
        }
    }

    /**
     *
     *
     * @param registerId
     * @returns {boolean} TRUE - 글작성가능
     */
    function isAvailableWrite(registerId) {
        if (registerId !== _USER_ID &&
            !Authority.isAuthorityCheck("WRITE") &&
            !isEditPost) {
            Often.toast("error", "관리자만 글/댓글 작성 가능한 게시물입니다.");
            return false;
        }
        return true;
    }

    function getRegisterId($eTarget) {
        return Often.null2Void($eTarget.closest(".detail-item").attr("data-rgsr-id"));
    }

})()

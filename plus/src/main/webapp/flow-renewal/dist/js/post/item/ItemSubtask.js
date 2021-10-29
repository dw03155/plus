var ItemSubtask = (function () {

    var $popupBefore;
    var isViewPost, isEditPost, isSubtaskEditLayer;
    var taskSrno;

    return {
        clickSubtaskComponent: clickSubtaskComponent,

        initEdit: initEdit,
        initEditSubtask: initEditSubtask,
        getLookHtml: getLookHtml,
        getCompHtml: getCompHtml,
        drawSubtaskLi: drawSubtaskLi,
        makeSubtaskRecord: makeSubtaskRecord,
        makePriorityHtml: makePriorityHtml,
        getSubtaskJson: getSubtaskJson,
        addAndDrawSubtask: addAndDrawSubtask,
        getSubtaskCount: getSubtaskCount,
        isSubtask: isSubtask,
        isEmptySubtaskArea: isEmptySubtaskArea,
        isSubtaskInputFocus: isSubtaskInputFocus,
        closeSubtaskPopup: closeSubtaskPopup,
        getTodayTime: getTodayTime,
        setSubtaskWorker: setSubtaskWorker,
        setSubtaskRemarkCount: setSubtaskRemarkCount,
    }

    function initEdit($popupBefore) {
        addSortableAction($popupBefore.find(".js-subtask-ul"))
    }

    function getLookHtml(subTaskData) {
        var subtaskCount;
        if (subTaskData && subTaskData.length > 0) subtaskCount = subTaskData.length;
        if (!Often.isFunc("SUB_TASK")) return "";
        return ListHelper.replaceJson($("#subTaskAreaItem").html(), {
            "subtask_count": subtaskCount,
            "SUBTASK_LIST": getCompHtml(subTaskData),
            "EDIT_LAYER": $("#subtaskInputItem").html(),
        });
    }

    function getCompHtml(subTaskData, isAdd) {
        var returnHtml = "";
        var isReadOnly = !Often.null2Void(isAdd);
        $.each(subTaskData, function (i, subtask) {
            var statusCode = DetailCode.STATUS._GB[Often.null2Void(subtask.STTS, "0")];
            var statusText = i18next.t(DetailCode.STATUS._TEXT[Often.null2Void(subtask.STTS, "0")]);
            var priorityCode = Often.null2Void(DetailCode.PRIORITY._CLASS[subtask.PRIORITY], "");
            var end_dt_text = Often.null2Void(subtask.END_DT, "");
            var remarkCount = Often.null2Void(subtask.REMARK_CNT, "0");
            var workerRecord = Often.null2Void(subtask.WORKER_REC, []);
            var workerCount = workerRecord.length - 1;
            var isDelete = (subtask.DELETE_YN === "Y" || subtask.RGSR_ID === _USER_ID)
            var isEmptyWorkerRecord = (!workerRecord || workerRecord.length === 0);
            var isEmptyDate = (!end_dt_text || end_dt_text === "");
            var isEmptyPriority = (!priorityCode || priorityCode === "");
            var isEmptyWorker = (!workerRecord || workerRecord.length === 0);
            var isEmptyRemark = (!remarkCount || remarkCount === "0");
            var isFullDate = end_dt_text.length > 8;
            var isEndSameDate = Often.isSameDay(subtask.END_DT);
            var selectDttm = Tz.momentTimeZone(subtask.END_DT, isFullDate ? "type6" : "type5");
            var toDay = isEndSameDate ? getTodayTime(isFullDate, subtask.END_DT) : selectDttm;
            var statusClass = (subtask.STTS === "2" ? "finished" : subtask.STTS === "3" ? "hold" : "");
            returnHtml += ListHelper.replaceJson($("#subTaskItem").html(), $.extend({}, subtask, {
                "index": subtask.INDEX ? subtask.INDEX : i,
                "status_code": statusCode,
                "status_text": statusText,
                "end_dt_text": isEndSameDate ? toDay : Tz.momentTimeZone(end_dt_text, isFullDate ? "type6" : "type5"),
                "priority_code": priorityCode,
                "worker_id_list": getWorkerData(workerRecord, "WORKER_ID"),
                "worker_name_list": getWorkerData(workerRecord, "WORKER_NM"),
                "data_worker_profile_list": getWorkerData(workerRecord, "WORKER_PRFL_PHTG"),
                "thumbnail_image": ListHelper.setProfile(isEmptyWorkerRecord ? "thumbnail" : workerRecord[workerCount].WORKER_PRFL_PHTG),
                "worker_count": workerRecord.length > 0 ? "+" + workerCount : "",
                "worker_count_display": ListHelper.setDisplay(!isEmptyWorkerRecord && workerRecord.length > 1, "inline-block"),
                "date_off": isEmptyDate ? "off" : "",
                "date_text_display": ListHelper.setDisplay(!isEmptyDate, "inline-block"),
                "priority_off": isEmptyPriority ? "off" : "",
                "priority_icon_display": ListHelper.setDisplay(!isEmptyPriority, "inline-block"),
                "worker_off": isEmptyWorker ? "off" : "",
                "worker_icon_display": ListHelper.setDisplay(!isEmptyWorker, "inline-block"),
                "remark_display": ListHelper.setDisplay(isReadOnly && !isEmptyRemark, "inline-block"),
                "mouseover-class": (isEmptyDate || isEndSameDate) ? "js-mouseover" : "",
                "mouseover-date": isEmptyDate ? i18next.t('front.common.add', {val: '$t(front.common.dueDate)'}) : Tz.momentTimeZone(end_dt_text, isFullDate ? "type6" : "type5"),
                "mouseover-priority": isEmptyPriority ? i18next.t('front.common.add', {val: '$t(front.common.priority)'}) : i18next.t(DetailCode.PRIORITY._TEXT[subtask.PRIORITY]),
                "mouseover-worker": isEmptyWorker ? i18next.t('front.common.add', {val: '$t(dictionary.manager)'}) : workerRecord.length + "명 - " + getWorkerData(workerRecord, "WORKER_NM"),
                "status-class": statusClass,
                "readonly_yn": isReadOnly ? "readonly" : "",
                "dead-line-class": Often.isDeadlineExceeded(end_dt_text) ? "deadline-exceeded" : "",
                "del-yn": isDelete ? "Y" : "N",
                "remove_display": 'style="display:' + (isDelete ? "" : 'none') + '" data',
            }))
        })
        return returnHtml;

        function getWorkerData(workerRecord, type) {
            if (!workerRecord) return "";
            var returnData = [];
            $.each(workerRecord, function (i, worker) {
                returnData.push(worker[type]);
            })
            return returnData.toString();
        }
    }

    function clickSubtaskComponent(e) {

        setTargetLayerAndOption(e);

        //Note. 엔터버튼은 작성권한과 무관!
        //Note. 기존 운영 기준 Status변경도 작성권한에 따라서 달라져서 우선 변경 처리!
        if ($.isTarget(e, ".js-subtask-enter-button")) return isEnterButtonAndAction(e);

        if ($.isTarget(e, ".js-subtask-status-layer")) return isStatusAndAction(e);
        if ($.isTarget(e, ".js-add-subtask-button")) return isSubtaskButtonAndAction(e);
        if ($.isTarget(e, ".js-subtask-date-layer")) return isDatePickerAndAction(e);
        if ($.isTarget(e, [".js-priority-button:visible", ".js-priority-setting-button"])) return isPriorityAndAction(e);
        if ($.isTarget(e, ".js-subtask-worker-layer")) return isWorkerAndAction(e);
        if ($.isTarget(e, ".js-subtask-remove")) return isSubtaskRemoveButtonAndAction(e);

        if ($.isTarget(e, ".js-subtask-li")) return isDetailSubtaskAndAction(e);
    }

    function setTargetLayerAndOption(e) {
        var $eTarget = $(e.target);
        $popupBefore = $eTarget.closest(".js-popup-before");
        isSubtaskEditLayer = $eTarget.closest(".js-subtask-edit-area").length > 0;
        isViewPost = ($popupBefore.attr("data-code") === "VIEW");
        isEditPost = ($popupBefore.attr("data-code") === "EDIT");
        taskSrno = $eTarget.closest(".js-subtask-li").attr("task-srno");
    }

    function isSubtaskButtonAndAction(e) {
        if (!isAvailableWrite(getRegisterId($(e.target)))) return;
        if (LimitGuest.isLimitGuest("subtask")) return;
        var $subtaskArea = $(e.target).closest(".js-subtask-area");
        $subtaskArea.addClass("on");
        $subtaskArea.find(".js-subtask-edit-layer .js-subtask-input").focus();
        return;
    }

    function isDetailSubtaskAndAction(e) {
        var $eTarget = $(e.target);
        var $subtaskLi = $eTarget.closest(".js-subtask-li");
        var isEditArea = $eTarget.closest(".js-subtask-edit-area").length > 0;
        if (!isViewPost || isEditArea || (!$subtaskLi || $subtaskLi.length === 0)) return;
        var projectSrno = $subtaskLi.attr("data-project-srno");
        var postSrno = $subtaskLi.attr("data-post-srno");
        PostPopup.togglePostView(projectSrno, postSrno, "", Detail.applySummarySlickImage);
    }

    function isStatusAndAction(e) {

        if (!isAvailableWrite(getRegisterId($(e.target)))) return;

        var $eTarget = $(e.target);
        var $statusLayer = $eTarget.closest(".js-subtask-status-layer");
        var $subtaskLi = $eTarget.closest(".js-subtask-li");
        var $statusButton = $eTarget.closest(".js-subtask-status-button");
        var $statusSettingButton = $eTarget.closest(".js-status-setting-button");
        var $statusSettingLayer = $statusLayer.find(".js-status-setting-layer");
        var isVisibleLayer = $statusSettingLayer.is(":visible");
        var statusCode = $statusSettingButton.attr("data_status_code");
        var statusGb = DetailCode.STATUS._GB[statusCode];
        var statusText = i18next.t(DetailCode.STATUS._TEXT[statusCode]);

        if ($statusSettingButton.length > 0) {
            ItemTask.drawUpdateTask({
                OBJECT: "STTS",
                TASK_SRNO: taskSrno,
                VALUE: statusCode
            }, setStatus, (isViewPost && !isSubtaskEditLayer), $subtaskLi);
            return;
        }
        closeSubtaskPopup(isVisibleLayer ? "ALL" : "STATUS");
        if (!isVisibleLayer) {
            $(".js-status-setting-layer").css("display", "none");
            var cssJson = drawPriorityLayerAndPosition($statusButton, $statusSettingLayer);
            $statusSettingLayer.css(cssJson);
        }

        function setStatus() {
            var $subtaskLi = $statusLayer.parents(".js-subtask-li");
            var isEditLayer = $subtaskLi.parents(".js-subtask-edit-layer").length > 0;
            if (!isEditLayer && statusCode === "2") $subtaskLi.attr("class", "js-subtask-li finished");
            else if (!isEditLayer && statusCode === "3") $subtaskLi.attr("class", "js-subtask-li hold");
            else if (!isEditLayer) $subtaskLi.attr("class", "js-subtask-li");
            else $subtaskLi.attr("class", "subtask-input-area js-subtask-li");
            $statusLayer.find(".js-subtask-status-button").attr({
                "class": "js-subtask-status-button js-task-state subtask-button subtask-status " + statusGb,
                "data_status": statusCode,
            }).text(statusText);
        }

    }

    function isPriorityAndAction(e) {
        if (!isAvailableWrite(getRegisterId($(e.target)))) return;
        var $eTarget = $(e.target);
        var $subtaskLi = $eTarget.closest(".js-subtask-li");
        var $priorityButton = $eTarget.closest(".js-priority-button:visible");
        var $prioritySettingButton = $eTarget.closest(".js-priority-setting-button");
        var $prioritySettingLayer = $subtaskLi.find(".js-priority-setting-layer");
        var priorityCode = $prioritySettingButton.attr("data_priority_code");
        var isVisibleLayer = $prioritySettingLayer.is(":visible");
        if ($prioritySettingButton.length > 0) {
            ItemTask.drawUpdateTask({
                OBJECT: "PRIORITY",
                TASK_SRNO: taskSrno,
                VALUE: priorityCode
            }, setPriority, (isViewPost && !isSubtaskEditLayer), $subtaskLi);
            closeSubtaskPopup();
            return;
        }
        closeSubtaskPopup(isVisibleLayer ? "ALL" : "PRIORITY");
        if (!isVisibleLayer) {
            var cssJson = drawPriorityLayerAndPosition($priorityButton, $prioritySettingLayer);
            $prioritySettingLayer.css(cssJson)
            $prioritySettingLayer.find(".js-priority-setting-button:first").focus();
        }

        function setPriority() {
            makePriorityHtml($prioritySettingButton);
        }

    }

    function makePriorityHtml($prioritySettingButton) {
        var $subtaskLi = $prioritySettingButton.parents(".js-subtask-li");
        var $priority = $subtaskLi.find(".js-subtask-priority-layer");
        var priorityCode = $prioritySettingButton.attr("data_priority_code");
        var priorityClass = DetailCode.PRIORITY._CLASS[priorityCode];
        var priorityLevel = Often.null2Void(priorityClass, "lv0");
        var isLevel0 = priorityLevel === "lv0";
        var tooltipText = isLevel0 ? i18next.t('front.common.add', {val: '$t(front.common.priority)'}) : i18next.t(DetailCode.PRIORITY._TEXT[priorityCode])
        $priority.attr({
            "data_priority": priorityCode,
            "mouseover-text": tooltipText,
        });
        $priority.find(".js-priority-button").css("display", isLevel0 ? "" : "none");
        $priority.find(".js-priority-level").attr({
            "class": "js-priority-level icon-subtask-level js-priority-button " + priorityLevel,
        }).css("display", isLevel0 ? "none" : "inline-block");
    }

    function isWorkerAndAction(e) {
        if (!isAvailableWrite(getRegisterId($(e.target)))) return;
        var $eTarget = $(e.target);
        var $workerLayer = $eTarget.closest(".js-subtask-worker-layer");
        var isVisiblePopup = $("#workerPopup").is(":visible");
        var $subtaskLi = $eTarget.closest(".js-subtask-li");
        var $workerButton = $eTarget.closest(".js-worker-button");
        closeSubtaskPopup(isVisiblePopup ? "ALL" : "WORKER");
        if ($workerButton.length > 0) {
            !isVisiblePopup && $eTarget.closest(".js-subtask-li").addClass("active");
            WorkerPopup.toggleWorkerPopup($popupBefore, drawSubtaskWorker, $workerButton, makeWorkerRecord);
        }

        function makeWorkerRecord() {
            if ($workerLayer.attr("data_worker_id_list").length === 0) return [];
            var returnRecord = [];
            var workerId = $workerLayer.attr("data_worker_id_list").split(",");
            var workerName = $workerLayer.attr("data_worker_name_list").split(",");
            var workerProfile = $workerLayer.attr("data_worker_profile_list").split(",");
            $.each(workerId, function (i, id) {
                returnRecord.push({
                    WORKER_ID: id,
                    WORKER_NM: workerName[i],
                    WORKER_PRFL_PHTG: workerProfile[i],
                })
            })
            return returnRecord;
        }

        function drawSubtaskWorker(submitWorkerRecord) {
            ItemTask.drawUpdateTaskWorker("EDIT", {
                TASK_SRNO: taskSrno,
                WORKER_REC: submitWorkerRecord,
            }, updateWorkerCallback, (isViewPost && !isSubtaskEditLayer), $subtaskLi)

            function updateWorkerCallback() {
                setSubtaskWorker($workerLayer, submitWorkerRecord)
            }
        }
    }

    function setSubtaskWorker($workerLayer, workerArray) {
        var workerId = [];
        var workerName = [];
        var workerProfile = [];
        var workerCount = (workerArray ? workerArray.length - 1 : 0);
        var defaultProfile = "/flow-renewal/assets/images/profile-default.png";
        var firstProfile = "";
        var isExistWorkerRecord = workerArray.length > 0;

        $.each(workerArray, function (i, worker) {
            workerId.push(worker.WORKER_ID);
            workerName.push(worker.WORKER_NM);
            workerProfile.push(worker.PRFL_PHTG);
        });
        $workerLayer.attr({
            "data_worker_id_list": workerId.toString(),
            "data_worker_name_list": workerName.toString(),
            "data_worker_profile_list": workerProfile.toString(),
            "mouseover-text": isExistWorkerRecord ?
                i18next.t('front.common.people', {count: workerArray.length}) + " - " + workerName.toString() :
                i18next.t('front.common.add', {val: '$t(dictionary.manager)'}),
        });
        if (isExistWorkerRecord) {
            firstProfile = Often.null2Void(workerArray[workerCount].PRFL_PHTG, workerArray[workerCount].WORKER_PRFL_PHTG);
            $workerLayer.find(".js-worker-box").css("display", "none");
            $workerLayer.find(".js-worker-thumb").css("display", "inline-block");
            $workerLayer.find(".js-thumb-image").css("background-image", "url(" + Often.null2Void(firstProfile, defaultProfile) + ")");
            $workerLayer.find(".subtask-manager-number").text("+" + workerCount)
                .css("display", (workerArray.length > 1 ? "inline-block" : "none"));
        } else {
            $workerLayer.find(".js-worker-box").css("display", "");
            $workerLayer.find(".js-worker-thumb").css("display", "none");
        }
    }

    function isDatePickerAndAction(e) {
        if (!isAvailableWrite(getRegisterId($(e.target)))) return;
        var $eTarget = $(e.target);
        closeSubtaskPopup("ALL");
        var $pickerObj = $eTarget.closest(".js-pickr-layer");
        $pickerObj.closest(".js-subtask-li").addClass("active");
        addDatePickerOnSubtask($pickerObj);
    }

    function isSubtaskRemoveButtonAndAction(e) {
        if (!isAvailableWrite(getRegisterId($(e.target)))) return;
        var $eTarget = $(e.target);
        var $removeButton = $eTarget.closest(".js-subtask-remove");
        var $subtaskLi = $eTarget.closest(".js-subtask-li");
        var isDelete = $subtaskLi.attr("data-del-yn") === "Y";
        if (!isDelete) Often.toast("error", "담당자 및 관리자만 삭제할 수 있습니다.")
        deleteAndRemoveSubtask(subtask, {
            COLABO_SRNO: $popupBefore.attr("data-project-srno"),
            COLABO_COMMT_SRNO: $popupBefore.attr("data-post-srno"),
            TASK_SRNO: $subtaskLi.attr("task-srno"),
        });

        function subtask() {
            var $subtaskUl = $eTarget.closest(".js-subtask-ul");
            $removeButton.closest(".js-subtask-li").remove();
            getSubtaskCount($subtaskUl);
        }
    }

    function isEnterButtonAndAction(e) {
        var $eTarget = $(e.target);
        var $enterButton = $eTarget.closest(".js-subtask-enter-button");
        var $editLayer = $eTarget.closest(".js-subtask-edit-layer");
        var $subtaskLi = $enterButton.closest(".js-subtask-li");

        var checkJson = Validation.checkInput($subtaskLi.find(".js-subtask-input"));
        if (Object.keys(checkJson).length > 0) {
            Often.toast("error", checkJson.errorMessage);
            checkJson.errorObj.focus();
            return;
        }
        var subtaskData = makeSubtaskRecord($editLayer, true);
        addAndDrawSubtask(addSubtaskCallback, subtaskData, $eTarget);
        initEditSubtask($editLayer);

        function addSubtaskCallback(callbackData) {
            drawSubtaskLi($editLayer, callbackData);
            getSubtaskCount($eTarget);
            if (isViewPost) ViewChanger.isPage("task") && UpdateElements.autoUpdateElem();
        }

    }

    function addDatePickerOnSubtask($inputTarget) {
        var $subtaskLi = $inputTarget.closest(".js-subtask-li");
        var $dateLayer = $inputTarget.closest(".js-subtask-date-layer");
        var $pickrLayer;
        var selectDate;
        var isSame = false;
        var defaultTime = Tz.roundMomentByMinutes(10);
        var defaultHour = defaultTime.split(" ")[0];
        var defaultMinute = defaultTime.split(" ")[1];

        DatePicker.makeFlatPickr({
            defaultHour: defaultHour,
            defaultMinute: defaultMinute,
            dateFormat: "YmdHi00",
            enableTime: true,
            time_24hr: true,
            dateVer: true,
            minuteIncrement: Often.isFunc(Func.CLOUD.EDIT_TIME_TEXT) ? 1 : 10,
            startDate: $dateLayer.attr("data_start_dt"),
            endDate: $dateLayer.attr("data_end_dt"),
            inputObj: {
                end: $inputTarget,
            },
            callback: {
                close: setFunction,
                remove: removeDate,
            }
        });

        function setFunction($flatpickr, selectDatePick, isSameDate) {

            $pickrLayer = $flatpickr;
            selectDate = selectDatePick;
            isSame = isSameDate;
            $inputTarget.closest(".js-subtask-li").removeClass("active");
            updateCallback();
        }

        function removeDate($calendarContainer, $flatPickr) {
            var $removeButton = $calendarContainer.find(".js-flatpickr-remove-button");
            var $subtaskDateLayer = $flatPickr.closest(".js-subtask-date-layer");
            if ("" === Often.null2Void($subtaskDateLayer.attr("data_end_dt"))) {
                $removeButton.css("display", "none");
                return;
            }
            $removeButton.off("click").on("click", function () {
                ItemTask.drawUpdateTask({
                    OBJECT: "END_DT",
                    TASK_SRNO: taskSrno,
                    VALUE: "",
                }, setRemoveDate, (isViewPost && !isSubtaskEditLayer), $subtaskLi);
            })

            function setRemoveDate() {
                $flatPickr.find(".js-subtask-date-text").css("display", "none");
                $flatPickr.find(".js-subtask-date-button").css("display", "").addClass("off");
                $flatPickr.find(".js-subtask-date-input").val("");
                $subtaskDateLayer.attr("data_end_dt", "").attr("mouseover-text", "");
                $calendarContainer.remove();
                $inputTarget.closest(".js-subtask-li").removeClass("active");
            }
        }

        function updateCallback() {
            if (isSame) return;
            ItemTask.drawUpdateTask({
                OBJECT: "END_DT",
                TASK_SRNO: taskSrno,
                VALUE: selectDate
            }, setDate, (isViewPost && !isSubtaskEditLayer), $subtaskLi);

            function setDate() {
                var $dateLayer = $pickrLayer.closest(".js-subtask-date-layer");
                var $dateButton = $dateLayer.find(".js-subtask-date-button");
                var $dateText = $dateLayer.find(".js-subtask-date-text");
                var isFullDate = selectDate.length > 8;
                var selectDttm = Tz.momentTimeZone(selectDate, isFullDate ? "type6" : "type5");
                var isEndSameDate = Often.isSameDay(selectDate);

                if (isEndSameDate) $dateLayer.addClass("js-mouseover");
                else $dateLayer.removeClass("js-mouseover");

                $dateLayer.attr("data_end_dt", selectDate);
                $dateLayer.attr("mouseover-text", selectDttm);
                $dateText.css("display", "inline-block").text(isEndSameDate ? getTodayTime(isFullDate, selectDate) : selectDttm);
                $dateButton.css("display", "none");
                DatePicker.checkOverDate($dateText, selectDate)
            }
        }
    }

    function getTodayTime(isFullDate, dttm) {
        return i18next.t('dictionary.today') + (isFullDate ? " " + Tz.momentTimeZone(dttm, "type20") : "");
    }

    function initEditSubtask($editLayer) {
        $editLayer.empty();
        $editLayer.append($("#subtaskInputItem").html());
        $editLayer.find(".js-subtask-input").focus();
    }

    function getSubtaskCount($eTarget) {
        var $subtaskArea = $eTarget.closest(".js-subtask-area");
        var $subtaskLi = $subtaskArea.find(".js-subtask-ul>li");
        $subtaskArea.find(".js-subtask-count").text($subtaskLi.length);
    }

    function drawSubtaskLi($editLayer, subtaskData) {
        var $subtaskLayer = $editLayer.prev(".js-subtask-ul");
        var subtaskLangth = $subtaskLayer.find(".js-subtask-li").length;
        if (subtaskLangth > 0) subtaskData[0].INDEX = subtaskLangth;
        var $subtaskLi = $(getCompHtml(subtaskData, !isViewPost));
        $subtaskLayer.append($subtaskLi);
    }

    function makeSubtaskRecord($postPopup, isEdit) {
        var returnRecord = [];
        var targetClassName = Often.null2Void(isEdit) ? ".js-subtask-edit-area" : ".js-subtask-area";
        var $subtask = $postPopup.find(targetClassName);
        var $subtaskArray = $subtask.find(".js-subtask-li");
        var popupMode = PostCondition.getPopupMode($postPopup);
        var isViewPost = (popupMode === "VIEW");
        var isSharePost = (popupMode === "SHARE_POST");
        $.each($subtaskArray, function (i, subtask) {
            var $subtask = $(subtask);
            if (isViewPost && $subtask.hasClass("subtask-input-area")) return;
            var subtaskJson = getSubtaskJson($subtask);
            if (isSharePost && Often.isFunc(Func.CLOUD.COPY_SUBTASK_CONTENTS)) $.extend(subtaskJson, {
                COLABO_SRNO: $subtask.attr("data-project-srno"),
                COLABO_COMMT_SRNO: $subtask.attr("data-post-srno"),
            });
            if (Object.keys(Often.null2Void(subtaskJson)).length > 0) returnRecord.push(subtaskJson);
        })
        return returnRecord;
    }

    function getSubtaskJson($subtask) {
        var isEditArea = $subtask.closest(".js-subtask-edit-area").length > 0;
        var subtaskTitle = $.trim($subtask.find(".js-subtask-input").val() ||
            $subtask.find(".js-subtask-input").text());
        var $subtaskDate = $subtask.find(".js-subtask-date-layer");
        var startDate = $subtaskDate.attr("data_start_dt");
        var endDate = $subtaskDate.attr("data_end_dt");
        var statusCode = $subtask.find(".js-subtask-status-button").attr("data_status");
        var progressData = Often.null2Void($subtask.attr("data-progress"), "0");
        var priorityCode = $subtask.find(".js-subtask-priority-layer").attr("data_priority");
        var $worker = $subtask.find(".js-subtask-worker-layer:visible");
        var workerArray = getWorkerArray($worker);
        var taskSrno = Often.null2Void($subtask.attr("task-srno"));
        var isModify = ("" !== taskSrno);

        if (isEditArea && subtaskTitle === "") {
            return {}; //IE 이슈로 빈객체 반환
        }

        return {
            TASK_NM: subtaskTitle,
            START_DT: startDate,
            END_DT: endDate,
            STTS: statusCode,
            PRIORITY: priorityCode,
            PROGRESS: progressData,
            WORKER_REC: workerArray,
            GUBUN: "",
            TASK_SRNO: taskSrno,
            MODIFY_YN: (isModify ? "Y" : "N"),
            RGSR_NM: (isModify ? "" : _USER_NM),
            RGSR_ID: (isModify ? "" : _USER_ID),
        };

        function getWorkerArray($worker) {
            var returnArray = [];
            if ($worker.length === 0) return returnArray;
            if ($worker.attr("data_worker_id_list") === "") return returnArray;
            var workerIdArray = $worker.attr("data_worker_id_list").split(",");
            var workerNameArray = $worker.attr("data_worker_name_list").split(",");
            var workerProfileArray = $worker.attr("data_worker_profile_list").split(",");

            $.each(workerIdArray, function (i, workerId) {
                returnArray.push({
                    WORKER_ID: workerId,
                    WORKER_NM: workerNameArray[i],
                    WORKER_PRFL_PHTG: workerProfileArray[i],
                })
            })
            return returnArray;
        }
    }

    function addAndDrawSubtask(callback, json, $target) {
        if (!isViewPost) return callback(json);
        addSubtask(callback, {
            COLABO_SRNO: $popupBefore.attr("data-project-srno"),
            COLABO_COMMT_SRNO: $popupBefore.attr("data-post-srno"),
            SUBTASK_REC: json,
        });
    }

    function deleteAndRemoveSubtask(callback, json) {
        if (!isViewPost && !isSubtaskEditLayer) return callback();
        PopupDraw.drawConfirm({
            contents: {
                main: i18next.t('front.common.ask', {
                    val: '$t(dictionary.subTask)',
                    status: '$t(dictionary.delete)'
                })
            },
            callback: {submit: submitSubtask}
        });

        function submitSubtask() {
            deleteSubtask(callback, json);
        }
    }

    function addSubtask(callback, addJson) {
        Ajax.executeApi(RestApi.POST.FLOW_SUBTASK_C001, $.extend({packetOption: Ajax.OPTION.PREVENT_EXECUTE}, addJson), function (addSubtaskData) {
            var returnData = [$.extend(addJson.SUBTASK_REC[0], {
                COLABO_SRNO: addJson.COLABO_SRNO,
                COLABO_COMMT_SRNO: addSubtaskData.COLABO_COMMT_SRNO,
                TASK_SRNO: addSubtaskData.TASK_SRNO,
            })]
            callback(returnData);
        })
    }

    function deleteSubtask(callback, deleteJson) {
        Ajax.executeApi(RestApi.DELETE.FLOW_SUBTASK_D001, $.extend({}, deleteJson), function () {
            callback();
        })
    }

    function addSortableAction($subtaskUl) {
        $.each($subtaskUl, function (i, $ul) {
            var isSortable = $($ul).hasClass("ui-sortable");
            var copyHelper;
            isSortable && $($ul).sortable({
                handle: ".drag-button",
                cursorAt: {top: 5, left: 5},
                scroll: false,
                tolerance: "pointer",
                placeholder: "document-item-highlight",
                opacity: 0.6,
                start: function (e, ui) {
                    $($ul).sortable("refreshPositions");
                },
                helper: function (e, li) {
                    closeSubtaskPopup("ALL");
                    var cloneLi = li.clone();
                    $(cloneLi).css('opacity', '0.3');
                    copyHelper = cloneLi.insertAfter(li);
                    //정렬중 객체의 뷰 제어
                    var $item = $(li);
                    !$item.hasClass('file-item') && $item.css('transform', 'scale(0.5) translate(-50%, -50%)');
                    $item.css('display', 'inline-block');
                    return li.clone();
                },
                stop: function (e, ui) {
                    var $item = $(ui.item);
                    var $popupBefore = $item.closest(".js-popup-before");
                    !$item.hasClass('file-item') && $item.css('transform', '');
                    $item.css('display', 'block');
                    copyHelper && copyHelper.remove();

                    var subtaskRecord = [];
                    var isViewPost = $popupBefore.attr("data-code") === "VIEW";

                    drawSubtaskAndSort();
                    if (isViewPost) updateSubtask();

                    function drawSubtaskAndSort() {
                        var $subtaskLis = $($ul).find(".js-subtask-li");
                        $.each($subtaskLis, function (i, li) {
                            if ($(li).attr("index") !== i) {
                                subtaskRecord.push({TASK_SRNO: $(li).attr("task-srno"), OTPT_SQNC: (i + 1)})
                                $(li).attr("index", i);
                            }
                        })
                    }

                    function updateSubtask() {
                        Ajax.executeApi(RestApi.PUT.FLOW_SUBTASK_U001, {
                            COLABO_SRNO: $popupBefore.attr("data-project-srno"),
                            COLABO_COMMT_SRNO: $popupBefore.attr("data-post-srno"),
                            TASK_REC: subtaskRecord,
                            packetOption: Ajax.OPTION.PREVENT_EXECUTE,
                        }, function () {
                            Often.toast("info", "하위 업무 순서를 변경했습니다.");
                        })
                    }

                },
            });
        })

    }

    function isEmptySubtaskArea($postPopup) {
        var $subtaskArea = $postPopup.find(".js-subtask-area");
        var isEmptySubtaskArea = $subtaskArea.length === 0;
        if (isEmptySubtaskArea) return true
        var $editSubtaskLayer = $subtaskArea.find(".js-subtask-edit-layer");
        var isEmptySubtaskLi = $subtaskArea.find(".js-subtask-ul .js-subtask-li").length === 0;
        var isEmptyEditSubtaskTitle = $.trim($editSubtaskLayer.find(".js-subtask-input").val()).length === 0;
        var ieEmptyEditSubtaskState = $editSubtaskLayer.find(".js-subtask-status-button").attr("data_status") === "0";
        var isEmptyEditSubtaskDate = $editSubtaskLayer.find(".js-subtask-date-layer").attr("data_end_dt") === "";
        var isEmptyEditSubtaskPriority = $editSubtaskLayer.find(".js-subtask-priority-layer").attr("data_priority") === "";
        var isEmptyEditSubtaskWorker = $editSubtaskLayer.find(".js-subtask-worker-layer").attr("data_worker_id_list") === "";
        var isEmptyEditLayer = (isEmptyEditSubtaskTitle && ieEmptyEditSubtaskState && isEmptyEditSubtaskDate && isEmptyEditSubtaskPriority && isEmptyEditSubtaskWorker);
        return (isEmptySubtaskArea || (isEmptySubtaskLi && isEmptyEditLayer));
    }

    function closeSubtaskPopup(target) {
        var closeTarget = Often.null2Void(target, "ALL");
        $(".js-subtask-li.active").removeClass("active");
        if (closeTarget === "ALL" || closeTarget !== "STATUS") $(".js-subtask-li .js-status-setting-layer").css("display", "none");
        if (closeTarget === "ALL" || closeTarget !== "PRIORITY") $(".js-subtask-li .js-priority-setting-layer").css("display", "none");
        if (closeTarget === "ALL" || closeTarget !== "WORKER") $(".js-subtask-li .js-worker-layer").remove();
    }

    function drawPriorityLayerAndPosition($button, $layer) {
        if (!$button || $button.length === 0) return false;
        var $postPopup = $button.closest("#postPopup");
        var isPostPopup = $postPopup.length > 0;
        var $popupBefore = $button.parents(".js-popup-before");
        var $subtaskOptionLayer = $button.closest(".js-subtask-layer");

        var popupBeforeOffset = $popupBefore.offset();
        var priorityOffset = $subtaskOptionLayer.offset();
        var priorityPosition = $subtaskOptionLayer.position();

        var windowHeight = window.innerHeight;
        var popupBeforeHeight = popupBeforeOffset.top + $popupBefore.height();
        var bottomHeight = (isPostPopup > 0 ? 80 : 100);
        var buttonHeight = $button.outerHeight();
        var layerHeight = $layer.outerHeight();
        var overPosition = Number("-" + (buttonHeight + layerHeight));
        var isOver = ((isPostPopup ? popupBeforeHeight : windowHeight) - bottomHeight) < (priorityOffset.top + buttonHeight + 150);
        $button.closest(".js-subtask-li").addClass("active");
        return {
            "display": ($layer.is(":visible") ? "none" : "block"),
            "top": isOver ? overPosition + 25 : buttonHeight + 20,
            "left": priorityPosition.left + (SpaceSelectable.isSharePost($postPopup) ? -20 : 0),
        }
    }

    function isSubtask(post) {
        return (post && post.UP_LINK_TASK_REC && post.UP_LINK_TASK_REC.length > 0);
    }

    function isSubtaskInputFocus(e) {
        var $eTarget = $(e.target);
        var $subtaskInput = $eTarget.closest(".js-subtask-input");
        if ($subtaskInput && $subtaskInput.length > 0) return true;
    }

    function setSubtaskRemarkCount(postSrno, count) {
        var $subtask = $("#subtask-" + postSrno);
        if ($subtask.length === 0) return;
        if (Often.null2Void(count, "0") === "0") return;
        $subtask.find(".subtask-comment").css("display", "inline-block")
        $subtask.find(".js-subtask-remark-count").text(count);
    }


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
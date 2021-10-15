var UpdateElements = (function () {

    return {
        autoUpdateElem: autoUpdateElem,
    }

    /**
     * 업데이트는 해당 해당 함수를 통해 실행!
     *
     * @param {object} [dataJson]
     * @param {string} dataJson.POST_MODE - "POST/EDIT/DELETE", //등록/수정/삭제
     * @param {string} dataJson.PIN_MODE - "UNPIN/PIN", //상단고정해제/상단고정
     * @param {boolean} dataJson.ALARM_POST_WRITE - 새글작성알림
     * @param {boolean} dataJson.ALARM_ALL_READ - 포스트읽음
     * @param {boolean} dataJson.ALARM_POST_READ - 전체읽음
     * @param {boolean} dataJson.REMARK_UPDATE - 댓글업데이트
     * @param {boolean} dataJson.BOOKMARK_RELEASE - 북마크해제
     * @param {object} dataJson.REACTION_POST_DATA - 포스트리액션
     * @param {object} dataJson.REACTION_REMARK_DATA - 댓글리엑션
     * @param {string} dataJson.PROJECT_SRNO - 프로젝트번호
     * @param {string} dataJson.POST_SRNO - 포스트번호
     * @param {object} dataJson.TASK_DATA - 일정변경
     * @param {object} dataJson.SCHEDULE_DATA - 일정변경
     * @param {object} dataJson.TODO_DATA - 할일변경
     * @returns {undefined|void}
     */
    function autoUpdateElem(dataJson) {

        var $postPopup = $("#postPopup:visible");
        var popupDataCode = $postPopup.attr("data-code");
        var isAlarmPostWrite = (dataJson && dataJson.ALARM_POST_WRITE);
        var isAlarmPostRead = (dataJson && dataJson.ALARM_POST_READ);

        //CASE1. 팝업발 수정중이라면 뷰팝업 띄우기
        if (!isAlarmPostWrite && !isAlarmPostRead) { //작성, 수정 팝업 중에 새 글이 오면 아무 동작 하지 않음
            if (popupDataCode === "EDIT") {
                PostPopup.togglePostView(PostPopup.getData().PROJECT_SRNO, PostPopup.getData().POST_SRNO, '', function () {
                    if (ViewChanger.isPage("task") && PostPopup.getData().POST_CODE === DetailCode.TASK) {
                        if (dataJson.POST_MODE && dataJson.POST_MODE === "EDIT") return AllTask.changeTaskItem(postSrno);
                    }
                });
            } else if (popupDataCode === "ADD") {
                PostPopup.removePopup();
            } else {
                //Note. 조회 중이면 꺼지지않아야함
            }
        }

        //CASE2. dataJson 정의 안 되어 있다면 페이지별 전체 갱신 하기
        if (typeof dataJson === "undefined") {
            if (ViewChanger.isPage("detail")) updatePost({detail: {top: true, post: true}});
            else if (ViewChanger.isPage("task")) updatePost({all: {task: true}});
            else if (ViewChanger.isPage("schd")) updatePost({all: {schd: true}});
            else if (ViewChanger.isPage("file")) updatePost({all: {file: true}});
            else if (ViewChanger.isPage("bookmark")) updatePost({allPosts: {bookmark: true}});
            else if (ViewChanger.isPage("mention")) updatePost({allPosts: {mention: true}});
            else if (ViewChanger.isPage("mypost")) updatePost({allPosts: {mypost: true}});
            return;
        }

        //CASE3. JSON 활용 부분 갱신하기
        var projectSrno = dataJson.PROJECT_SRNO;
        var postSrno = dataJson.POST_SRNO;
        var remarkSrno = dataJson.REMARK_SRNO;

        //CASE3-1. 화면 무관 갱신
        if (dataJson.REACTION_REMARK_DATA) return ItemReaction.updateReactionElements("REMARK", postSrno, remarkSrno, dataJson.REACTION_REMARK_DATA);
        if (dataJson.REACTION_POST_DATA) return ItemReaction.updateReactionElements("POST", postSrno, "", dataJson.REACTION_POST_DATA);
        if (dataJson.REMARK_UPDATE) return ItemRemark.updateRemarkData(projectSrno, postSrno, remarkSrno); //리스트형, 피드형 댓글수 갱신
        if (dataJson.TASK_DATA) return updateTaskElement(dataJson);
        if (dataJson.SUBTASK_DATA) return updateSubtask(dataJson);
        if (dataJson.SCHEDULE_DATA) return updateScheduleElement(dataJson);
        if (dataJson.TODO_DATA) return updateTodoElement(dataJson);

        //알람 읽음
        if (dataJson.ALARM_POST_WRITE || dataJson.ALARM_POST_READ || dataJson.ALARM_ALL_READ) {
            var socketJson = {ROOM_SRNO: _USER_ID, ALARM_DATA: dataJson};

            if (Often.isFunc(Func.CLOUD.ALARM_COUNT_SOCKET)) {
                SocketControl.sendMessage($.extend({}, socketJson, {CHAT_CODE: SocketAPI.MAIN.BADGE_SELF_UPDATE}));
            } else {
                AlarmUpdate.updateUnReadElementBySelf(dataJson);
            }

            return;
        }

        //CASE3-2. 화면 연계 갱신
        if (ViewChanger.isPage("detail")) {
            if (dataJson.PIN_MODE) return PinPost.controlPinElement(dataJson.PIN_MODE, projectSrno, postSrno);
            if (dataJson.POST_MODE) {
                Detail.updateOnePostElement(dataJson.POST_MODE, projectSrno, postSrno);
                updatePost({detail: {top: true}}); //업무리포트
                return;
            }

            if (dataJson.ONLY_POST) return updatePost({detail: {post: true}});
            if (typeof dataJson.BOOKMARK_RELEASE === "boolean") return;
            return updatePost({detail: {top: true, post: true}});
        }

        if (ViewChanger.isPage("task")) {
            if (dataJson.POST_MODE === "DELETE") return AllTask.removeTaskItem(postSrno);
            //if (dataJson.POST_MODE === "EDIT") return AllTask.changeTaskItem(postSrno);
        }

        if (ViewChanger.isPage("schd")) {
            updatePost({all: {schd: true}});
            return;
        }

        if (ViewChanger.isPage("file")) {
            updatePost({all: {file: true}});
            return;
        }

        if (ViewChanger.isPage("bookmark")) {
            if (dataJson.PIN_MODE || dataJson.ALARM_POST_READ || dataJson.ALARM_ALL_READ) return;
            if (dataJson.POST_MODE) return Detail.updateOnePostElement(dataJson.POST_MODE, projectSrno, postSrno);
            if (dataJson.BOOKMARK_RELEASE) return ItemBookmark.removeAnimate(postSrno);
            return updatePost({allPosts: {bookmark: true}})
        }

        if (ViewChanger.isPage("mention")) {
            updatePost({allPosts: {bookmark: true}});
            return;
        }

        if (ViewChanger.isPage("mypost")) {
            updatePost({allPosts: {mypost: true}});
        }

    }

    function updatePost(json) {
        (json.detail && json.detail.top) && Detail.drawPostInfo(Detail.getProjectSrno());
        (json.detail && json.detail.post) && Detail.drawPostList(true);
        (json.all && json.all.file) && AllFile.openLayer(Detail.getProjectSrno());
        (json.all && json.all.schd) && AllCalendar.reloadCalendar();
        (json.all && json.all.task) && AllTask.drawTaskInitList(true);
        (json.allPosts && json.allPosts.bookmark) && AllPosts.openLayer("BOOKMARK", true);
        (json.allPosts && json.allPosts.mention) && AllPosts.openLayer("MENTION", true);
        (json.allPosts && json.allPosts.mypost) && AllPosts.openLayer("SELF", true);
    }

    function updateTaskElement(dataJson) {
        var elementList = ["POPUP", "CARD", "LIST", "PIN", "TASK", "ALLPOSTS", "SUBTASK"];
        var taskData = dataJson.TASK_DATA;
        $.each(elementList, function (i, element) {
            var postId = UpdateElementsTarget[element].ID + dataJson.POST_SRNO;
            var $allTaskLayer = Often.null2Void(AllTask.get$allTaskLayer(), "");
            var $postObj;
            if (element === "TASK" && $allTaskLayer !== "" && $allTaskLayer.is(":visible")) {
                $postObj = $allTaskLayer.find(postId + ":visible");
            } else {
                $postObj = $(postId + ":visible");
            }
            if ($postObj.length === 0) return;
            var updateObject = taskData.OBJECT;
            (updateObject === "TASK_NM" && element === "SUBTASK") && setTitle($postObj, taskData);
            (updateObject === "STTS") && setState($postObj, element, taskData);
            (updateObject === "START_DT") && setDate($postObj, element, taskData);
            (updateObject === "END_DT") && setDate($postObj, element, taskData);
            (updateObject === "WORKER" || updateObject === "WORKER_REC") && setWorker($postObj, element, taskData);
            (updateObject === "PRIORITY") && setPriority($postObj, element, taskData);
            (updateObject === "PROGRESS") && setProgress($postObj, element, taskData);
        })

        function setTitle($postObj, taskData) {
            var $subtaskTitle = $postObj.find(".subtask-title:visible");
            if (Often.null2Void(taskData.VALUE) === '') return;
            if ($subtaskTitle.length === 0) return;
            var isInput = $postObj.find(".subtask-title:visible")[0].nodeName === "INPUT";
            isInput ? $subtaskTitle.val(taskData.VALUE) : $subtaskTitle.text(taskData.VALUE);
        }

        function setState($postObj, element, taskData) {
            if (isDetailPageAndSameFeedType(element)) return;
            var $state = $($postObj.find(".js-task-state:visible")[0]);
            var state = taskData.VALUE;
            var isCompletion = (DetailCode.STATUS._GB[state] === "completion");
            var isHold = (DetailCode.STATUS._GB[state] === "hold");
            var className = UpdateElementsTarget[element].STATUS_CLASS;
            $state.attr("class", className + DetailCode.STATUS._GB[state]);
            if (element === "TASK") {
                $postObj.attr("class", "task-item" + (isCompletion ? " completion" : isHold ? " hold" : ""));
            } else if (element === "SUBTASK") {
                $postObj.removeClass("finished").removeClass("hold").addClass(isCompletion ? "finished" : isHold ? "hold" : "")
            }

            if (element === "LIST" || element === "PIN" || element === "POPUP" || element === "CARD") {
                $postObj.find(".js-post-title").attr("class", UpdateElementsTarget[element].TITLE_CLASS +
                    (isCompletion ? "complete" : isHold ? "hold" : ""));
            }

            if (element === "TASK" || element === "LIST" || element === "PIN" || element === "ALLPOSTS" || element === "SUBTASK") {
                $state.text(i18next.t(DetailCode.STATUS._TEXT[state]));
            }
        }

        function setWorker($postObj, element, taskData) {
            if (element === "ALLPOSTS") return;
            var $worker = $postObj.find(".js-workers");
            var workerRecord = taskData.WORKER_REC;
            if (element === "TASK") {
                var workerData = ItemTask.getWorkerCountJson(workerRecord);
                $worker.find(".js-mouseover").attr("mouseover-text", ItemTask.getWorkerListText(workerRecord));
                $worker.find(".js-worker-name").text(workerData.WORKER);
                $worker.find(".js-worker-count").text(workerData.WORKER_COUNT);
            } else if (element === "POPUP" || element === "CARD") {
                $worker.empty().append(ItemTask.getWorkersComponentHtml(workerRecord));
                $postObj.find(".js-task-worker-layer .js-worker-button:visible").html(
                    i18next.t(workerRecord.length !== 0 ? 'front.common.change' : 'front.common.add', {val: '$t(dictionary.manager)'}));
            } else if (element === "SUBTASK") {
                ItemSubtask.setSubtaskWorker($postObj.find(".js-subtask-worker-layer"), workerRecord);
            }
        }

        function setDate($postObj, element, taskData) {
            if (element === "ALLPOSTS") return;

            var isStartLayer = (taskData.OBJECT === "START_DT");
            var date = taskData.VALUE;
            if (!(taskData.OBJECT === "START_DT" || taskData.OBJECT === "END_DT")) return;
            var isEmptyDate = (date.length === 0);
            var isFullDate = date.length > 8;
            var isDeadlineExceeded = Often.isDeadlineExceeded(date);
            if (element === "TASK") {
                var dateClass = ".js-" + (isStartLayer ? "start" : "end") + "_dt-text";
                $postObj.find(dateClass).text(Tz.momentTimeZone(date, isFullDate ? "type1" : "type2"));
                if (isStartLayer) return;
                if (isDeadlineExceeded) $postObj.find(dateClass).addClass("deadline-exceeded");
                else $postObj.find(dateClass).removeClass("deadline-exceeded");
                return;
            } else if (element === "SUBTASK") {
                var isEndSameDate = Often.isSameDay(date);
                var dttm = Tz.momentConversion("convertOnly", isFullDate ? "type6" : "type5", date);
                var toDay = isEndSameDate ? ItemSubtask.getTodayTime(isFullDate, date) : dttm;
                $postObj.find(".js-subtask-date-layer")
                    .attr((isStartLayer ? "data_start_dt" : "data_end_dt"), date).attr("mouseover-text", dttm);
                if (isStartLayer) return;
                $postObj.find(".js-subtask-date-button").css("display", isEmptyDate ? "" : "none");
                $postObj.find(".js-subtask-date-text").text(toDay).css("display", isEmptyDate ? "none" : "inline-block");
                if (isDeadlineExceeded) $postObj.find(".js-subtask-date-text").addClass("deadline-exceeded");
                else $postObj.find(".js-subtask-date-text").removeClass("deadline-exceeded");
                return;
            }
            var $dateLayer = $postObj.find(".js-" + (isStartLayer ? "start" : "end") + "-date-layer");
            !isEmptyDate && $dateLayer.css("display", "table");
            var $dateElement = $postObj.find(".js-" + (isStartLayer ? "start" : "end") + "-flatpickr");
            $dateElement.find(".js-date-label").css("display", isEmptyDate ? "inline-block" : "none");
            $dateElement.find(".js-date-back-layer").css("display", isEmptyDate ? "none" : "inline-block");
            $dateElement.find(".js-pickr-date").val(date);
            var designatedTime = Tz.momentTimeZone(date, isFullDate ? "type6" : "type5")
            $dateElement.find(".js-pickr-text").text(i18next.t(isStartLayer ? 'front.common.from' : 'front.common.to', {val: designatedTime}));
            if (isStartLayer) return;
            if (isDeadlineExceeded) $dateElement.find(".js-pickr-text").addClass("deadline-exceeded");
            else $dateElement.find(".js-pickr-text").removeClass("deadline-exceeded");
        }

        function setPriority($postObj, element, taskData) {
            if (element === "LIST" || element === "PIN" || element === "ALLPOSTS") return;
            var priority = taskData.VALUE;
            var isEmptyData = priority === "";

            if (element === "SUBTASK") {
                var $priorityLayer = $postObj.find(".js-subtask-priority-layer");
                var subtaskValue = priority === "" ? 0 : Number(priority) + 1;
                $priorityLayer.attr("data_priority", subtaskValue);
                $priorityLayer.find(".js-priority-level").attr("class", "js-priority-level icon-subtask-level js-priority-button lv" + subtaskValue);
                $priorityLayer.find(".js-priority-level").css("display", isEmptyData ? "none" : "inline-block")
                $priorityLayer.find(".js-subtask-priority").css("display", isEmptyData ? "" : "none");
                $priorityLayer.find(".js-subtask-priority i:first").attr("class", "icons-low");
            } else {
                var $priority = $postObj.find(".js-priority");
                var priorityIcon = "icons-" + DetailCode.PRIORITY._GB[priority] + " small";
                $priority.attr("data-priority", priority);
                $priority.find(".js-priority-text").text(i18next.t(DetailCode.PRIORITY._TEXT[priority]));
                $priority.find(".js-priority-span i:first").attr("class", priorityIcon);
                $priority.find(".js-priority-button").css("display", isEmptyData ? "inline-block" : "none");
                $priority.find(".js-priority-span").css("display", isEmptyData ? "none" : "inline-block");
                !isEmptyData && $postObj.find(".js-priority-layer").css("display", "table");
            }
        }

        function setProgress($postObj, element, taskData) {
            if (element === "LIST" || element === "PIN" || element === "ALLPOSTS") return;

            var $progress = $postObj.find(".js-progress-bar");
            var progress = taskData.VALUE;
            if (!progress) return;
            var progressText = progress + "%";
            $progress.css("width", progressText);
            $progress.attr("data-progress", progress);
            if (progress === "100") {
                if (element === "TASK") $progress.addClass("on");
                else if (element === "CARD" || element === "POPUP") {
                    var $progressLayer = $progress.parents(".js-progress-layer");
                    $progressLayer.addClass("on");
                    $progressLayer.find(".js-progress-text").text(progressText);
                }
            }
            (Number(progress) > 0) && $progress.findUp(".js-progress-layer").css("display", "table");
        }

        function isDetailPageAndSameFeedType(element) {
            // Page가 Detail일 때, Feed Type과 선택된 Element의 Type이 같은지 체크
            if (!ViewChanger.isPage("detail")) return false;
            var feedType = LocalUtil.getFeedType().toUpperCase();
            return ((element === "CARD" || element === "LIST") && element !== feedType);
        }
    }

    function updateScheduleElement(dataJson) {
        console.log('test')
        console.log(dataJson)
        var elementList = ["POPUP", "CARD"];
        var scheduleData = dataJson.SCHEDULE_DATA;
        $.each(elementList, function (i, element) {
            var postId = UpdateElementsTarget[element].ID + dataJson.POST_SRNO;
            var $postObj = $(postId + ":visible");
            console.log($postObj)
            if ($postObj.length === 0) return;
            var updateObject = scheduleData.OBJECT;

            (updateObject === "ATTENDENCE") && setAttendance($postObj, element, scheduleData);
        })

        function setAttendance($postObj, element, scheduleData) {
            var $attendence = $postObj.find(".js-attendance-layer .manager-group");
            var $attendenceInput = $postObj.find(".js-attendance-input");
            var attendenceRecord = scheduleData.ATTENDENCE_REC;
            var attendStatus;

            //참여자 수 갱신
            var $attendanceCount = $postObj.find("#attendanceCount");
            var attendanceIcon = '<span class="create-icon-box"><i class="icons-person-6"></i></span>';
            $attendanceCount.css("display", attendenceRecord.length === 0 ? "none" : "block");
            $attendanceCount.find("em").text("0");
            $postObj.find(".js-worker-button").html(attendanceIcon +
                i18next.t(attendenceRecord.length > 0 ? 'front.common.change' : 'front.common.add', {val: '$t(back.LangConvert.participant)'}));
            //참여 여부 수 갱신
            attendenceRecord.forEach(function (attendenceItem) {
                attendStatus = getStatus(attendenceItem.STATUS);
                if (attendStatus !== "") {
                    $attendanceCount.find("." + attendStatus + " em").text(Number($attendanceCount.find("." + attendStatus + " em").text()) + 1);
                } else {
                    //pass
                }
            })

            //참여자 목록 갱신
            $attendence.empty().append(ItemSchedule.getAttendanceItemComponentHtml(attendenceRecord));
            $attendenceInput.attr("data-attendance", replaceAttendanceList(attendenceRecord));

            //참여 여부 상태값 갱신(본인 참여자 등록 및 삭제 시)
            var attendInfo = ItemSchedule.getAttendInfo(attendenceRecord);
            if (attendInfo.isAttend && !$postObj.find("#attendanceSelect").is(":visible")) {
                attendStatus = getStatus(attendInfo.status);
                $postObj.find("." + attendStatus).addClass("on");
                $postObj.find("#attendanceSelect").css("display", "block");
                return;
            }

            if (!attendInfo.isAttend) {
                $postObj.find(".attendance-button").removeClass("on");
                $postObj.find("#attendanceSelect").css("display", "none");
            }
        }

        function getStatus(status) {
            return status === "1" ? "participate" : status === "2" ? "absence" : status === "3" ? "undetermined" : "";
        }

        function replaceAttendanceList(attendenceRecord) {
            return JSON.stringify(attendenceRecord).replace(/"/ig, "'");
        }
    }

    function updateTodoElement(dataJson) {
        var elementList = ["POPUP", "CARD", "LIST", "PIN"];
        var todoData = dataJson.TODO_DATA;
        var percent = 0;
        $.each(elementList, function (i, element) {
            var postId = UpdateElementsTarget[element].ID + dataJson.POST_SRNO;
            var $postObj = $(postId + ":visible");
            if ($postObj.length === 0) return;
            var updateObject = todoData.OBJECT;

            (updateObject === "TODO_STATUS") && setTodoStatus($postObj, element, todoData);
        })

        function setTodoStatus($postObj, element, todoData) {
            if (element === "CARD" && !$postObj.findUp("#detailUl").hasClass("card")) return;
            var statusJson = todoData.STATUS;
            var $todoItem = $postObj.find(".todo-item[todo-list-srno=" + statusJson.COLABO_TODO_LIST_SRNO + "]");
            var $todoArea = $todoItem.find(".todo-area");

            //card or popup에서 갱신한 percent로  list, pin 갱신
            if (element === "LIST" || element === "PIN") {
                $postObj.find(".js-todo-state").text(percent + "%");
                return;
            }

            //체크 갱신
            if (statusJson.STTS === "Y" && !$todoArea.hasClass("checked")) {
                $todoArea.addClass("checked");
            } else if (statusJson.STTS === "N" && $todoArea.hasClass("checked")) {
                $todoArea.removeClass("checked");
            } else {
                //done.
            }

            //완료 갯수 갱신
            var $progressCount = $postObj.find("#progressCount");
            var completeCount = $postObj.find(".todo-area.checked").length;
            $progressCount.text(completeCount);

            //percent, progressBar 갱신
            var totalCount = parseInt($postObj.find("#progressTotalCount").text());
            var todoPercent = parseInt((completeCount / totalCount) * 100);
            percent = todoPercent;
            $postObj.attr("todo-done-percent", todoPercent + "%");
            $postObj.find('.progress-percent').text(todoPercent + "%");
            $postObj.find('.todo-progress-bar span').animate({width: todoPercent + '%'}, 100);
        }
    }

    function updateSubtask(postData) {
        var subtaskData = postData.SUBTASK_DATA;
        Object.keys(subtaskData).forEach(function (key) {
            var taskDataJson = {};
            if (key === "WORKER_REC") {
                taskDataJson["OBJECT"] = "WORKER";
                taskDataJson["WORKER_REC"] = subtaskData[key];
            } else {
                taskDataJson["OBJECT"] = key;
                taskDataJson["VALUE"] = subtaskData[key];
            }
            UpdateElements.autoUpdateElem({
                PROJECT_SRNO: postData.PROJECT_SRNO,
                POST_SRNO: postData.POST_SRNO,
                TASK_DATA: taskDataJson,
            });
        });
    }

})();

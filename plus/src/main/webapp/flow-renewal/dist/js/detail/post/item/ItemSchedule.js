var ItemSchedule = (function () {
    var attendanceSearchTimer;
    var isViewPost;
    var attendancePageData = {
        PG_NO: 0,
        PG_PER_CNT: 10,
        NEXT_YN: "Y",
        ZERO_FIRST: true,
    }

    return {
        getLookHtml: getLookHtml,
        initEdit: initEdit,
        keyUpScheduleInput: keyUpScheduleInput,
        isScheduleEvent: isScheduleEvent,
        isOnedayButtonAndAction: isOneDayButtonAndAction,
        isAttendanceSelectAndAction: isAttendanceSelectAndAction,
        keyDownCheckPlaceInput: keyDownCheckPlaceInput,
        keyDownScheduleInput: keyDownScheduleInput,
        checkSendEditPush: checkSendEditPush,
        getAttendanceItemComponentHtml: getAttendanceItemComponentHtml,
        getAttendInfo: getAttendInfo,
        closeAttendancePopup: closeAttendancePopup,
    }

    function isScheduleEvent($eTarget) {
        var $popupBefore = $eTarget.findUp(".js-popup-before");
        var isSchedulePost = $popupBefore.find(".js-post-nav").hasClass("schedule");
        if (!isSchedulePost) return false;

        isViewPost = ($popupBefore.attr("data-code") === "VIEW");
        if (isVideoButtonAndAction($eTarget)) return true;
        if (isCancelVideoButtonAndAction($eTarget)) return true;
        if (isOneDayButtonAndAction($eTarget)) return true;
        if (isAttendanceAndAction($eTarget)) return true;
        if (isAttendanceSelectAndAction($eTarget)) return true;
        if (isPlaceSpanAndAction($eTarget)) return true;
    }

    function getLookHtml(scheduleData, isEdit) {
        if (!scheduleData) isEdit = true;
        scheduleData = scheduleData || {}
        var isVideoConference = VideoConference.isVC(scheduleData.VC_SRNO);
        var isAttendanceChange = scheduleData.ATTENDENCE_REC && scheduleData.ATTENDENCE_REC.length > 0;

        //Todo. 일정2.

        return ListHelper.replaceJson($("#scheduleComponent").html(), scheduleData && $.extend({}, getDisplayJson(), {
            'attendance-list': getAttendanceList(scheduleData.ATTENDENCE_REC),
            'addAttendenceText': i18next.t(isAttendanceChange ? 'front.common.change' : 'front.common.add', {val: '$t(back.LangConvert.participant)'}),
            'attendance': getAttendanceItemComponentHtml(scheduleData.ATTENDENCE_REC),
            'VC_SRNO': scheduleData.VC_SRNO,
            'attendance-count': scheduleData.ATD_ATTEND_CNT,
            'nonattendance-count': scheduleData.ATD_NONATTEND_CNT,
            'undefined-count': scheduleData.ATD_UNDEFINED_CNT,
            'place': scheduleData.PLACE,
            'memo': TagUtil.LinkData2Tag(Often.null2Void(scheduleData.MEMO)),
            'map-image-src': 'src="' + GoogleMap.convertGoogleMapImage(scheduleData.LOCATION) + '"',
            'alarm_time': getAlarmTime(scheduleData.PRE_ALAM),
        }));

        function getAttendanceList(attendanceList) {
            if (!attendanceList || attendanceList.length === 0) return "";
            return JSON.stringify(scheduleData.ATTENDENCE_REC).replace(/"/ig, "'");
        }

        function getDisplayJson() {
            if (isEdit) return "";
            return {
                'place-display': ListHelper.setDisplay(scheduleData.PLACE !== "", "table"),
                'video-display': ListHelper.setDisplay(isVideoConference),
                'video-active': isVideoConference ? 'd-none' : '',
                'alam-display': ListHelper.setDisplay(scheduleData.PRE_ALAM !== "0"),
                'memo-display': ListHelper.setDisplay(scheduleData.MEMO !== ""),
                'map-display': ListHelper.setDisplay(scheduleData.LOCATION !== "", 'inline-block'),
                'attendance-count-display': ListHelper.setDisplay(scheduleData.ATTENDENCE_REC.length !== 0),
                'attendance-select-display': ListHelper.setDisplay(getAttendInfo(scheduleData.ATTENDENCE_REC).isAttend),
                'participate-status': getAttendInfo(scheduleData.ATTENDENCE_REC).status === "1" ? "on" : "",
                'absence-status': getAttendInfo(scheduleData.ATTENDENCE_REC).status === "2" ? "on" : "",
                'undetermined-status': getAttendInfo(scheduleData.ATTENDENCE_REC).status === "3" ? "on" : "",
                'map-link': GoogleMap.getGoogleMapLink(scheduleData.LOCATION, scheduleData.PLACE),
            }
        }
    }

    function getAttendInfo(attendenceArray) {
        var attendJson = {
            isAttend: false,
            status: 0,
        }

        $.each(attendenceArray, function (i, attendence) {
            if (attendence.ATTENDENCE_ID === _USER_ID) {
                attendJson.isAttend = true;
                attendJson.status = attendence.STATUS;
            }
        })
        return attendJson;
    }

    function getAttendanceItemComponentHtml(attendanceArray) {
        if (!attendanceArray) return "";
        var returnHtml = "";
        var isEdit = Often.null2Void($("#postPopup").attr("data-code"), "VIEW") !== "VIEW";
        var baseHtml = getBaseHtml();

        attendanceArray.forEach(function (attendance, index) {
            if (index < 5 || isEdit) {
                returnHtml += ListHelper.replaceJson(baseHtml, {
                    "id": attendance.ATTENDENCE_ID,
                    "name": attendance.ATTENDENCE_NM,
                    'profile': ListHelper.setProfile(attendance.PRFL_PHTG),
                    'attendance-status': attendance.STATUS ? ScheduleCode.STATUS._GB[attendance.STATUS - 1] : "default",
                })
            } else if (attendanceArray.length === (index + 1)) {
                returnHtml += $("#attendanceMoreItem").html();
            }
        });

        return returnHtml;

        function getBaseHtml() {
            return $(isEdit ? "#attendanceEditItem" : "#attendanceViewItem").html();
        }
    }

    function initEdit($postPopup, post) {
        fillOption($postPopup, true);
        $postPopup.find("#attendanceCount, #videoSpan, #placeSpan, #urlPreview, #alarmSpan").addClass("d-none");
        $postPopup.find(".add-manager-button, #videoButton, #placeButton,#placeInput, #editDateTimeArea, #alarmButton").removeClass("d-none");
        $postPopup.find("#placeSpan").css("cursor", "default");
        $postPopup.find("#attendanceSelect").remove();
        if (post && post.SCHD_REC) $postPopup.find("#videoSpan").attr("data-vc-srno", post.SCHD_REC[0].VC_SRNO);
        setDate();
        isWriterAndAction($postPopup);

        if (Often.isFunc(Func.CLOUD.INVITATION_POPUP)) {
            addInputWorkerEvent();
        }

        if (Often.isFunc(Func.ENTER.GOOGLE_MAP)) {
            addGoogleMap();
        } else {
            //pass
        }

        var buttonArray = ["memo"];
        buttonArray.forEach(function (buttonName) {
            PostPopup.initButtonByCode($postPopup, buttonName);
        })

        if (Object.keys(post).length === 0) return;
        makeEditDate();

        function setDate(post) {
            var now = new Date();
            var isPostData = (post && post.SCHD_REC.length > 0);
            var isAllDay = isPostData && post.SCHD_REC[0].ALL_DAY_YN === "Y";
            var formatStartDate = isPostData ? post.SCHD_REC[0].STTG_DTTM : Often.getDateFormat(now, "MINUTES");
            now.setHours(now.getHours() + 1)
            var formatEndDate = isPostData ? post.SCHD_REC[0].FNSH_DTTM : Often.getDateFormat(now, "MINUTES");
            var startDate = Tz.momentConversion("convertOnly", "type19", formatStartDate);
            var endDate = Tz.momentConversion("convertOnly", "type19", formatEndDate);
            $postPopup.find(".js-start-flatpickr .js-pickr-date").val(startDate);
            $postPopup.find(".js-start-flatpickr .js-pickr-text").val(Tz.momentConversion("convertOnly", (isAllDay ? "type5" : "type6"), startDate));
            $postPopup.find(".js-end-flatpickr .js-pickr-date").val(endDate);
            $postPopup.find(".js-end-flatpickr .js-pickr-text").val(Tz.momentConversion("convertOnly", (isAllDay ? "type5" : "type6"), endDate));
        }

        function addGoogleMap() {
            var $placeInput = $postPopup.find("#placeInput");
            GoogleMap.addSearchEvent($placeInput, function (mapData) {
                $placeInput.val(mapData.PLACE);
                $postPopup.find("#LOCATION").val(mapData.LOCATION);
                $postPopup.find("#mapImage").attr("src", GoogleMap.convertGoogleMapImage(mapData.LOCATION));
                $postPopup.find("#placeSpan").fadeIn(200);
            });
        }

        function makeEditDate() {
            var scheduleDate = post.SCHD_REC[0];
            var isAllDay = scheduleDate.ALL_DAY_YN === "Y";
            var isExistPlace = scheduleDate.LOCATION !== "";

            var vals = {
                "#postTitle": scheduleDate.TTL,
                "#alarmButton": scheduleDate.PRE_ALAM,
                "#LOCATION": scheduleDate.LOCATION,
                "#placeInput": scheduleDate.PLACE,
            }

            $postPopup.find("#ondDay").prop("checked", isAllDay ? "checked" : "");
            fillOption($postPopup, true);
            for (var key in vals) {
                $postPopup.find(key).val(vals[key]);
            }

            setDate(post)
            $postPopup.find("#memoButton").html(scheduleDate.MEMO.replace(/\n/ig, "</br>"));
            $postPopup.find("#ondDay").prop("checked", isAllDay ? "checked" : "");

            if (scheduleDate.ATTENDENCE_REC && scheduleDate.ATTENDENCE_REC.length > 0) {
                $postPopup.find(".js-attendance-input").attr("data-attendance", JSON.stringify(scheduleDate.ATTENDENCE_REC))
                drawAttendance(scheduleDate.ATTENDENCE_REC);
            }

            // Zoom 버튼
            if (VideoConference.isVC(scheduleDate.VC_SRNO)) {
                var $zoomButton = $("#postPopup").find('#videoButton');
                $zoomButton.addClass("d-none");
                $zoomButton.next("#videoSpan").removeClass("d-none");
                $zoomButton.next("#videoSpan").find('.remove-button').removeClass("d-none")
                $zoomButton.next("#videoSpan").find('#zoomUrlCopy').addClass("d-none");
            }

            if (!isExistPlace) return;

            $postPopup.find("#mapImage").attr({
                "src": GoogleMap.convertGoogleMapImage(scheduleDate.LOCATION),
                "onerror": "this.src='" + ImageUtil.removeDomain("GOOGLE-MAP") + "'"
            });
            $postPopup.find("#placeInput, #placeSpan").removeClass("d-none");
            $postPopup.find("#placeButton").addClass("d-none");

        }

        function addInputWorkerEvent() {
            var isViewPost = ($postPopup.attr("data-code") === "VIEW");
            $postPopup.find(".js-worker-input").css("display", isViewPost ? "none" : "inline-block");
            $postPopup.find(".js-worker-button").css("display", isViewPost ? "inline-block" : "none");
            if (!isViewPost) WorkerPopup.addInputWorkerEvent($postPopup, inputWorkerEvent);
        }
    }

    function inputWorkerEvent(attendanceData) {
        var $postPopup = $("#postPopup");
        var $managers = $postPopup.find(".js-manager-group");
        var isSame = false;
        $.each($managers.find(".js-registration"), function (i, worker) {
            if ($(worker).attr("data-worker-id") === attendanceData[0].ATTENDENCE_ID) {
                isSame = true;
                return false;
            }
        });

        if (isSame) return Often.toast("error", "이미 등록된 참여자입니다.");
        var attendanceArray = JSON.parse(Often.null2Void($postPopup.find(".js-attendance-input").attr("data-attendance").replace(/'/ig, '"'), "{}"))
        attendanceArray.push(attendanceData[0])
        $managers.append(getAttendanceItemComponentHtml(attendanceData));
        $postPopup.find(".js-attendance-input").attr("data-attendance", JSON.stringify(attendanceArray))
        WorkerPopup.closeWorkerPopup();
    }

    function isWriterAndAction($postPopup) {
        if (!("ADD" === $postPopup.attr("data-code"))) return;
        var attendanceJson = [{
            ATTENDENCE_ID: _USER_ID,
            ATTENDENCE_NM: _USER_NM,
            JBCL_NM: "",
            PRFL_PHTG: _PRFL_PHTG,
            RCVR_CORP_NM: "",
            RCVR_DVSN_NM: "",
            RQST_USE_INTT_ID: _USE_INTT_ID,
            STATUS: "1",
        }]
        WorkerPopup.setSubmitRecord(attendanceJson)
        $postPopup.find(".js-attendance-input").attr("data-attendance", JSON.stringify(attendanceJson))
        drawAttendance(attendanceJson);

    }

    function drawAttendance(attendanceRecord) {
        $("#postPopup").find(".js-attendance-layer .manager-group").append(getAttendanceItemComponentHtml(attendanceRecord));
    }

    function fillOption($postPopup, isEdit) {
        var isAllDay = $postPopup.find("#ondDay").is(":checked");
        var isVideoConference = isEdit && Often.null2Void($postPopup.find("#videoSpan").attr("data-vc-srno"), "0") != 0;
        var optionArray = [];
        var returnHtml = '';

        if (isAllDay) {
            optionArray = [0, 1440, 2880, 10080];
            $postPopup.find("#videoButton").addClass("prevent-events").addClass("line-through");
        } else {
            optionArray = [0, 10, 30, 60, 120, 180, 1440, 2880, 10080];
            $postPopup.find("#videoButton").removeClass("prevent-events").removeClass("line-through");
        }
        optionArray.forEach(function (value) {
            if (!isAllDay || (isAllDay && (value <= 0 || value >= 1440))) {
                returnHtml += '<option value="' + value + '">' + getAlarmTime(value) + '</option>';
            }
        })
        if (isVideoConference) $postPopup.find(".oneday").addClass("prevent-events").addClass("line-through");
        else $postPopup.find(".oneday").removeClass("prevent-events").removeClass("line-through");
        $postPopup.find("#alarmButton").empty();
        $postPopup.find("#alarmButton").append(returnHtml);
    }


    function isAttendanceAndAction($eTarget) {

        var $attendanceLayer = $eTarget.findUp(".js-attendance-layer");
        if (!$attendanceLayer.length > 0) return false;

        var $postPopup = $eTarget.findUp("#postPopup");
        var $popupBefore = $eTarget.findUp(".js-popup-before");

        var projectSrno = $popupBefore.attr("data-project-srno");
        var postSrno = $popupBefore.attr("data-post-srno");
        var remarkSrno = $popupBefore.find(".remark-item:last").attr("remark-srno");

        //더보기 버튼을 눌렀을때
        var $moreAttendanceButton = $eTarget.findUp(".js-more-registration-button");
        if ($moreAttendanceButton.length > 0) {
            ListHelper.initPageData(attendancePageData);
            getAttendanceRecord($eTarget, true);
            return true;
        }

        //참여자 추가 버튼을 눌렀을때
        var $attendanceButton = $eTarget.findUp(".js-worker-button");
        if ($attendanceButton.length > 0) {
            if (!Authority.isAuthorityCheck("WRITE", projectSrno)) {
                Often.toast("error", "관리자만 글/댓글 작성 가능한 게시물입니다.");
                return;
            }

            if(Often.isFunc("INVITATION_POPUP")) {
                InvitationPopup.openParticipantPopup($popupBefore.attr('data-post-srno'))
            } else {
                WorkerPopup.toggleWorkerPopup($popupBefore, drawAttendancePopup, $attendanceButton, makeAttendanceRecord)
            }
            return true;
        }

        var $removeButton = $eTarget.findUp(".js-remove-worker");
        if ($removeButton.length > 0) {
            var attendanceArray = makeAttendanceRecord();
            var deleteAttendanceArray = makeDeleteAttendanceRecord();
            var attendanceIndex = 0;
            attendanceArray.forEach(function (attendance, index) {
                if (attendance.ATTENDENCE_ID === $removeButton.parents(".js-registration").attr("data-worker-id")) {
                    deleteAttendanceArray.push(attendance);
                    attendanceIndex = index;
                    return;
                }
            })
            attendanceArray.splice(attendanceIndex, 1);
            $popupBefore.find(".js-attendance-input").attr("data-attendance", JSON.stringify(attendanceArray));
            $popupBefore.find(".js-attendance-input").attr("data-attendance-delete", JSON.stringify(deleteAttendanceArray));
            $removeButton.parents(".js-registration").remove();
            return true;
        }

        //참여자 프로필
        var $attendanceProfile = $eTarget.findUp(".js-manager-group");
        if ($attendanceProfile.length > 0) {
            if (isViewPost) {
                ListHelper.initPageData(attendancePageData);
                getAttendanceRecord($eTarget, true);
            } else {
                var workerId = $eTarget.findUp(".js-registration").attr("data-worker-id");
                Profile.drawProfilePopup(workerId);
            }
            return true;
        }

        function makeAttendanceRecord() {
            var $attendanceInput = $popupBefore.find(".js-attendance-input");
            return JSON.parse(Often.null2Void($attendanceInput.attr("data-attendance").replace(/'/ig, '"'), "{}"));
        }

        function makeDeleteAttendanceRecord() {
            var $attendanceInput = $popupBefore.find(".js-attendance-input");
            return JSON.parse(Often.null2Void(Often.null2Void($attendanceInput.attr("data-attendance-delete"), "[]").replace(/'/ig, '"'), "{}"));
        }

        function drawAttendancePopup(submitAttendanceRecord) {

            var insertRecord = [];
            var deleteRecord = [];

            if (PostCondition.getPopupMode($postPopup) === "ADD") return setAttendance();

            makeInsertAndDeleteRecord();

            if (isViewPost) {
                PopupDraw.drawConfirm({
                    contents: {
                        main: i18next.t('front.common.ask', {
                            val: '$t(dictionary.participant)',
                            status: '$t(dictionary.edit)'
                        })
                    },
                    callback: {submit: submitAttendancePopup}
                })
            }

            function submitAttendancePopup() {
                updateAttendance(setAttendance, {
                    COLABO_SRNO: $popupBefore.attr("data-project-srno"),
                    COLABO_COMMT_SRNO: $popupBefore.attr("data-post-srno"),
                    INSERT_ATD_REC: insertRecord,
                    DELETE_ATD_REC: deleteRecord,
                })
            }

            function makeInsertAndDeleteRecord() {
                var personRecord = makeAttendanceRecord();
                $.each(personRecord, function (i, postAttendance) {
                    var isDeleteTarget = true;
                    $.each(submitAttendanceRecord, function (i, submitAttendance) {
                        if (submitAttendance.ATTENDENCE_ID === Often.null2Void(postAttendance.ATTENDENCE_ID, postAttendance.USER_ID)) {
                            isDeleteTarget = false;
                            return false;
                        }
                    })
                    isDeleteTarget && deleteRecord.push(postAttendance);
                })

                $.each(submitAttendanceRecord, function (i, submitAttendance) {
                    var isInsertTarget = true;
                    $.each(personRecord, function (i, postAttendance) {
                        if (submitAttendance.ATTENDENCE_ID === Often.null2Void(postAttendance.ATTENDENCE_ID, postAttendance.USER_ID)) {
                            isInsertTarget = false;
                            return false;
                        }
                    })
                    isInsertTarget && insertRecord.push(submitAttendance);
                })
                if (!isViewPost) return setAttendance();
            }

            function setAttendance(dat) {
                if (!isViewPost) { //조회 팝업 아닐 때
                    $postPopup.find(".js-registration").remove();
                    $popupBefore.find(".js-attendance-input").attr({
                        "data-attendance": JSON.stringify(submitAttendanceRecord),
                        "data-attendance-insert": JSON.stringify(insertRecord),
                        "data-attendance-delete": JSON.stringify(deleteRecord),
                    });
                    drawAttendance(submitAttendanceRecord);
                    return;
                }

                UpdateElements.autoUpdateElem({
                    PROJECT_SRNO: projectSrno,
                    POST_SRNO: postSrno,
                    REMARK_SRNO: remarkSrno,
                    REMARK_UPDATE: true,
                });

                var updateAttendenceJson = {
                    OBJECT: "ATTENDENCE",
                    ATTENDENCE_REC: dat.ATTENDENCE_REC,
                }

                UpdateElements.autoUpdateElem({
                    PROJECT_SRNO: $popupBefore.attr("data-project-srno"),
                    POST_SRNO: $popupBefore.attr("data-post-srno"),
                    SCHEDULE_DATA: updateAttendenceJson,
                });
            }
        }

        function openMoreAttendanceView(moreRecord) {
            var returnAttendanceLi = "";
            var baseHtml = getAttendanceListHtml();
            $.each(moreRecord, function (index, attendance) {
                returnAttendanceLi += ListHelper.replaceJson(baseHtml, {
                    "id": attendance.ATTENDENCE_ID,
                    "name": attendance.ATTENDENCE_NM,
                    "profile": ListHelper.setProfile(attendance.PRFL_PHTG),
                    "gubun": attendance.STATUS !== "" ? ScheduleCode.STATUS._GB[attendance.STATUS - 1] : "default",
                    "badge": attendance.STATUS !== "" ? i18next.t(ScheduleCode.STATUS._TEXT[attendance.STATUS - 1]) : "",
                    "badge-display": ListHelper.setDisplay(attendance.STATUS !== "", "inline-block"),
                    "position": attendance.JBCL_NM,
                    "company": attendance.CMNM,
                    "affiliation": attendance.DVSN_NM,
                })
            })
            return returnAttendanceLi;
        }

        function keyUpAttendanceInput(e) {
            var $eTarget = $(e.target);
            attendanceSearchTimer && clearTimeout(attendanceSearchTimer);
            attendanceSearchTimer = setTimeout(function () {
                ListHelper.initPageData(attendancePageData);
                $("#confirmationPopup").find("#participantUl").empty()
                getAttendanceRecord($eTarget, false);
            }, 200);
        }

        function getAttendanceRecord($eTarget, isFirst) {
            if (attendancePageData.NEXT_YN === "N") return;
            Ajax.executeApi(RestApi.GET.FLOW_SCHD_ATD_R02, $.extend({}, attendancePageData, {
                COLABO_SRNO: projectSrno,
                COLABO_COMMT_SRNO: postSrno,
                SEARCH_TEXT: Often.null2Void($eTarget.val()),
            }), function (attendancData) {
                isFirst && $("body").prepend(getAttendancePopupHtml());
                var $confirmationPopup = $("#confirmationPopup");
                var $participantUl = $confirmationPopup.find("#participantUl");
                $participantUl.drawListHelper({
                    pageData: attendancePageData,
                    nextYn: attendancData["NEXT_YN"],
                    records: attendancData["ATTENDENCE_REC"],
                    noDataHtml: ListHelper.getNoDataHtml("search"),
                    callback: {
                        click: clickParticipantUl,
                        item: openMoreAttendanceView,
                        scroll: function () {
                            getAttendanceRecord($eTarget, false);
                        },
                    }
                })
                if (!isFirst) return;
                addPopupEvent($confirmationPopup);
            })
        }

        function clickParticipantUl(e) {
            var $eTarget = $(e.target);

            var $participantItem = $eTarget.findUp(".js-participant-item");
            if ($participantItem.length > 0) {
                Profile.drawProfilePopup($participantItem.find(".js-user-id").attr("id"));
                return;
            }
        }

        function addPopupEvent($confirmationPopup) {
            $confirmationPopup.find("#confirmationPopupSearchText").off("keyup").on("keyup", keyUpAttendanceInput);
            $confirmationPopup.off("click").on("click", function (e) {
                var $eTarget = $(e.target);

                if ($eTarget.findUp("#confirmationInnerPopup").length === 0
                    || $eTarget.findUp("#confirmationPopupCloseBtn").length > 0) {
                    closeAttendancePopup();
                    return;
                }
            })
        }
    }

    function updateAttendance(callback, updateJson) {
        Ajax.executeApi(RestApi.PUT.FLOW_SCHD_ATD_U001, updateJson, callback)
    }

    function isVideoButtonAndAction($eTarget) {
        var $postPopup = $eTarget.findUp('.js-popup-before');
        var $videoButton = $eTarget.is("#videoButton") ? $eTarget : $eTarget.parent("#videoButton");
        if ($videoButton.length === 0) return false;

        //if (ServerChecker.isEnter) return false;
        if (LimitGuest.isLimitGuest("video", false)) return;
        // Zoom 연동이 되어있는지 확인후 없으경우 zoom 연동 페이지로 연결
        VideoConference.isZoomSynchronized(function () {
            $eTarget.addClass("d-none");
            $eTarget.next("#videoSpan").removeClass("d-none");
            $eTarget.next("#videoSpan").find('.remove-button').removeClass("d-none")
            $eTarget.next("#videoSpan").find('#zoomUrlCopy').addClass("d-none");
            $postPopup.find(".oneday").addClass("line-through").addClass("prevent-events");
        }, VideoConference.alertRequiredZoomSync);
        return true;
    }

    function isCancelVideoButtonAndAction($eTarget) {
        var $cancelContainer = $eTarget.findUp('#videoSpan');
        var $cancelButton = $eTarget.findUp('.remove-button');
        var $popupBefore = $eTarget.findUp('.js-popup-before');
        if ($cancelContainer.length === 0 || $cancelButton.length === 0) return false;

        var $videoButton = $cancelContainer.prev('#videoButton');
        $videoButton.removeClass("d-none");
        $cancelContainer.addClass("d-none");
        $popupBefore.find(".oneday").removeClass("line-through").removeClass("prevent-events");
    }

    function isOneDayButtonAndAction($eTarget) {
        var $scheduleLayer = $eTarget.findUp(".js-schedule-date-layer");
        if (!$scheduleLayer || $scheduleLayer.length === 0) return false;

        var isChecked = $scheduleLayer.find("#ondDay:checked").length > 0;
        var $oneDayCheckBox = $eTarget.findUp(".oneday");
        var $videoButton = $("#videoButton")
        if ($oneDayCheckBox.length > 0) {
            if (isChecked) {
                $oneDayCheckBox.find("#ondDay").removeProp("checked");
                isChecked = false;
                $videoButton.removeClass("prevent-events").removeClass("line-through");
            } else {
                $oneDayCheckBox.find("#ondDay").prop("checked", "checked");
                isChecked = true;
                $videoButton.addClass("prevent-events").addClass("line-through");
            }
            fillOption($eTarget.parents("#postPopup"));
        }


        setOneDay($scheduleLayer, isChecked);
        var $flatpickrLayer = $eTarget.findUp(".js-pickr-layer");
        if ($flatpickrLayer.length > 0) {
            addDatePickerOnSchedule($scheduleLayer, isChecked);
            return true;
        }
        return true;
    }

    function isPlaceSpanAndAction($eTarget) {
        var $placeSpan = $eTarget.findUp("#placeSpan, .js-place-span");
        if ($placeSpan.length === 0) return false;
        var mapLink = $placeSpan.attr("data-map-link");
        if (mapLink !== "") window.open(mapLink, "google_blank");
        return true;
    }

    function keyUpScheduleInput(e) {
        var $eTarget = $(e.target);

        if (keyUpCheckPlaceInput($eTarget)) return;
        if (keyUpCheckMemo($eTarget)) return;

        function keyUpCheckPlaceInput($eTarget) {
            if (!$eTarget.is("#placeInput")) return false;
            if (!Often.isFunc(Func.ENTER.GOOGLE_MAP)) {
                Often.toast("error", i18next.t('front.alert.errorTryAgain'));
                return true;
            }
            var $imageLayer = $eTarget.nextAll("#placeSpan");
            var $image = $imageLayer.find("#mapImage");
            GoogleMap.checkPlaceInput($eTarget, $imageLayer, $image);
            return true;
        }

        function keyUpCheckMemo($eTarget) {
            if (!$eTarget.is("#memoButton")) return false;
            var memoTextLength = $eTarget.text().length;
            if (memoTextLength <= 1000) return true;
            Often.toast("error", "메모는 1000자 까지만 입력가능합니다.");
            $eTarget.text($eTarget.text().slice(0, 1000));
            return true;
        }
    }

    function keyDownScheduleInput(e) {
        var $eTarget = $(e.target);

        if (keyDownCheckMemo($eTarget)) return;

        function keyDownCheckMemo($eTarget) {
            if (!$eTarget.is("#memoButton")) return false;
            if (KeyCheck.isStyleCommand(e)) {
                e.preventDefault()
                return true;
            }
        }
    }

    function isAttendanceSelectAndAction($eTarget) {

        var $attendanceSelect = $eTarget.findUp("#attendanceSelect");
        if ($attendanceSelect.length === 0 || !$eTarget.is("button")) return false;
        if ($eTarget.hasClass("on")) return true;

        var projectSrno = $eTarget.parents(".detail-item").attr("data-project-srno");
        var postSrno = $eTarget.parents(".detail-item").attr("data-post-srno");
        var beforeRemarkSrno = $eTarget.parents(".detail-item").find(".remark-item:last").attr("remark-srno");
        var status = 0;

        if ($eTarget.hasClass("participate")) status = 1;
        if ($eTarget.hasClass("absence")) status = 2;
        if ($eTarget.hasClass("undetermined")) status = 3;

        setAttendStatus();
        return true;

        function setAttendStatus() {
            var setData = {
                "COLABO_SRNO": projectSrno,
                "COLABO_COMMT_SRNO": postSrno,
                "STATUS": status,
                "packetOption": Ajax.OPTION.PREVENT_EXECUTE
            }
            Ajax.executeApi(RestApi.PUT.FLOW_SCHD_ATD_U002, setData, function () {
                changeAttendenceSelect($attendanceSelect, status);
                UpdateElements.autoUpdateElem({
                    PROJECT_SRNO: projectSrno,
                    POST_SRNO: postSrno,
                    REMARK_SRNO: beforeRemarkSrno,
                    REMARK_UPDATE: true,
                });
            })
        }
    }

    function changeAttendenceSelect($attendanceSelect, status) {
        var preStatus = $attendanceSelect.find('.on').attr("data-status");
        var $preStatusCount = $attendanceSelect.prev().find("#attendanceCount ." + preStatus + " em");
        var $statusCount = $attendanceSelect.prev().find("#attendanceCount ." + getFindClass() + " em");
        var $attendee = $attendanceSelect.prev().find(".js-registration[data-worker-id=\"" + _USER_ID + "\"]");

        $preStatusCount.text(parseInt($preStatusCount.text()) - 1);
        $statusCount.text(parseInt($statusCount.text()) + 1);
        $attendanceSelect.find('button').removeClass('on');
        $attendanceSelect.find("." + getFindClass()).addClass("on");
        $attendee.removeClass(preStatus).addClass(getFindClass());

        function getFindClass() {
            var isParticipate = status === 1;
            var isAbsence = status === 2;
            var isUndetermined = status === 3;

            return isParticipate ? "participate" : isAbsence ? "absence" : isUndetermined ? "undetermined" : "";
        }
    }

    function addDatePickerOnSchedule($flatpickrLayer) {

        var startFlatPickr = $flatpickrLayer.find(".js-start-flatpickr");
        var endFlatPickr = $flatpickrLayer.find(".js-end-flatpickr");
        var isAllDay = $flatpickrLayer.find("#ondDay").is(":checked");
        var $pickrLayer;
        var selectDate;
        var isSame = false;
        DatePicker.makeFlatPickr({
            dateFormat: "YmdHi00",
            enableTime: true,
            time_24hr: true,
            plugins: [new confirmDatePlugin({
                confirmText: i18next.t('dictionary.select'),
                showAlways: true
            }, updateCallback)],
            minuteIncrement: Often.isFunc(Func.CLOUD.EDIT_TIME_TEXT) ? 1 : 10,
            startDate: startFlatPickr.find(".js-pickr-date").val(),
            endDate: endFlatPickr.find(".js-pickr-date").val(),
            inputObj: {
                start: startFlatPickr,
                end: endFlatPickr,
            },
            allDay: isAllDay,
            rescheduling: true,
            callback: {
                close: setFunction,
            },
        });

        function setFunction($flatpickr, selectDatePick, isSameDate) {
            $pickrLayer = $flatpickr;
            selectDate = selectDatePick;
            isSame = isSameDate;
        }

        function updateCallback() {
            if (isSame) return;
            var $dateArea = $pickrLayer.parents(".js-schedule-date-layer");
            var $startPickr = $dateArea.find(".js-start-flatpickr .js-pickr-date");
            var $startPickrText = $dateArea.find(".js-start-flatpickr .js-pickr-text");
            var $endPickr = $dateArea.find(".js-end-flatpickr .js-pickr-date");
            var $endPickrText = $dateArea.find(".js-end-flatpickr .js-pickr-text");

            $startPickr.val(selectDate.startDate);
            $startPickrText.val(Tz.momentConversion("convertOnly", (isAllDay ? "type5" : "type6"), selectDate.startDate));
            $endPickr.val(selectDate.endDate);
            $endPickrText.val(Tz.momentConversion("convertOnly", (isAllDay ? "type5" : "type6"), selectDate.endDate));
            DatePicker.checkOverDate($startPickrText, selectDate)
        }
    }

    function setOneDay($scheduleLayer, isChecked) {
        var startDate = $scheduleLayer.find(".js-start-flatpickr");
        var endDate = $scheduleLayer.find(".js-end-flatpickr");
        var startDateValue = startDate.find(".js-pickr-date").val();
        var endDateValue = endDate.find(".js-pickr-date").val();
        startDate.find(".js-pickr-text").val(Tz.momentConversion("convertOnly", isChecked ? "type5" : "type6", startDateValue));
        endDate.find(".js-pickr-text").val(Tz.momentConversion("convertOnly", isChecked ? "type5" : "type6", endDateValue));
    }

    function getAttendancePopupHtml() {
        return $("#confirmationPopupDiv").html();
    }

    function getAttendanceListHtml() {
        return $("#participantItemLi").html();
    }


    function keyDownCheckPlaceInput(e) {
        var $eTarget = $(e.target);
        if (!$eTarget.is("#placeInput")) return false;
        $("#postPopup").focus();
        return true;
    }

    function checkSendEditPush() {
        PopupDraw.drawConfirm({
            contents: {
                main: i18next.t('front.alert.remindMembers'), //i18next.t('front.alert.remindMembers').replace(/\\n/, '\n') 이렇게 해야하나?
                submit: i18next.t('dictionary.yes'),
                cancel: i18next.t('dictionary.no'),
            },
            callback: {
                submit: makeScheduleEditPush,
            }
        });
    }

    function makeScheduleEditPush() {
        var postJson = JsonMaker.getPostJson();
        Ajax.executeApi(RestApi.POST.COLABO2_PUSH_C001, {
            COLABO_SRNO: postJson.COLABO_SRNO,
            COLABO_COMMT_SRNO: postJson.COLABO_COMMT_SRNO,
            packetOption: Ajax.OPTION.PREVENT_EXECUTE,
        }, function () {
            Often.toast("success", i18next.t('front.alert.sendMessageToMemers'));
        })
    }

    function closeAttendancePopup() {
        $("#confirmationPopup").remove();
    }

    /**
     * Integer + 시/분/초 + 전 미리알림 다국어 처리 및 공통화
     * @param timeInMinute 분 단위의 시간
     * @returns {String} 다국어 처리 된 텍스트
     */
    function getAlarmTime(timeInMinute) {
        if (!timeInMinute || Number(timeInMinute) === 0) return i18next.t('dictionary.none');
        var timeWithUnit;

        if (timeInMinute < 60) {
            timeWithUnit = i18next.t('front.common.js-minute', {count: timeInMinute})
        } else if (timeInMinute < (60 * 24)) {
            timeWithUnit = i18next.t('front.common.js-hour', {count: timeInMinute / 60})
        } else {
            timeWithUnit = i18next.t('front.common.day', {count: timeInMinute / (60 * 24)})
        }
        return i18next.t('front.common.scheduleReminder', {time: timeWithUnit})
    }
})()

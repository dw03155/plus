var AllCalendar = (function () {

    var $allCalendarLayer;
    var COLABO_SRNO;

    return {
        openLayer: openLayer,
        reloadCalendar: reloadCalendar,
    }

    function openLayer(projectSrno) {
        var isProjectCalendar = "" !== Often.null2Void(projectSrno);
        isProjectCalendar && DetailHeader.drawInitProjectHeader("calendar", projectSrno);
        $allCalendarLayer = $("#" + (isProjectCalendar ? "detail" : "all") + "CollectView .allCalendarLayer");
        $allCalendarLayer.find("#scheduleAdd")
            .text('+ ' + i18next.t('front.common.add', {val: '$t(dictionary.schedule)'}))
            .css("display", isProjectCalendar ? "block" : "none");
        COLABO_SRNO = Often.null2Void(projectSrno);
        drawCalendar();
        addClickEvent();
        drawSelectCalendar(); //2021-03-19 진영 추가
        LeftFilter.openLeftFilter();
    }

    function addClickEvent() {
        $allCalendarLayer.find("#scheduleAdd").off("click").on("click", openRegistrationPopup);
        $allCalendarLayer.find(".js-calendar-search-input").off("keyup").on("keyup", function (e) {
            if (KeyCheck.isKey(e, "ENTER")) drawSchedule();
        });
    }

    function openRegistrationPopup() {
        var projectSrno = (ViewChanger.getCurrentPageId() === "schd" ? "" : Detail.getProjectSrno());
        PostPopup.openRegistrationView(projectSrno, DetailCode.SCHEDULE, false);
    }

    function drawSchedule(firstDt, lastDt) {
        if (!ViewChanger.isPage("schd")) return;
        Loading.drawLoadingJson({
            CONTENTS: i18next.t('front.common.wait'),
        })
        var isExistFirstDt = Often.null2Void(firstDt, "") !== "";
        var isExistLastDt = Often.null2Void(lastDt, "") !== "";
        var fullCalendarView = $allCalendarLayer.find('#calendar').fullCalendar('getView');
        var filterJson = CalendarFilter.getCalendarFilterJson();
        firstDt = isExistFirstDt ? firstDt : fullCalendarView.start;
        lastDt = isExistLastDt ? lastDt : fullCalendarView.end;
        var calendarData = {
            "FIRST_DT": Tz.momentTimeZone(firstDt, 'type12', "input"),
            "LAST_DT": Tz.momentTimeZone(lastDt, 'type12', "input"),
            "PROJECT_SCHD_FILTER": "-1" === filterJson.scheduleFilter ? "" : "1" === filterJson.scheduleFilter ? "0,1" : filterJson.scheduleFilter,
            "TASK_SCHD_FILTER": "-1" === filterJson.taskFilter ? "" : filterJson.taskFilter,
            "COLABO_SRNO": COLABO_SRNO ? COLABO_SRNO : "",
        }
        Ajax.executeApi(RestApi.GET.COLABO2_SCHD_R005, calendarData, drawScheduleItems);
    }

    function drawScheduleItems(dat) {
        if (dat.SCHD_REC && dat.SCHD_REC === 0) return;

        var filterJson = CalendarFilter.getCalendarFilterJson();
        var schdRec = dat.SCHD_REC;
        var schdEvents = [];

        if (schdRec && schdRec.length > 0) {

            schdRec.forEach(function (schd) {

                var isHoliday = schd.GB === ScheduleCode.HOLIDAY;
                var isGeneralProject = schd.GB === ScheduleCode.GENERAL;
                var isTask = schd.GB === ScheduleCode.TASK;
                var isAllday = Often.null2Void(schd.ALL_DAY_YN, "N") === "Y";
                var isMatchSearchWord = schd.TTL.indexOf($allCalendarLayer.find(".js-calendar-search-input").val()) > -1;

                var AttendInfo = ItemSchedule.getAttendInfo(schd.ATTENDENCE_REC);
                var isViewSchedule = filterJson.scheduleFilter === "1" ? AttendInfo.isAttend : true;

                var sDay = Tz.momentTimeZone(schd.STTG_DTTM, isGeneralProject && isAllday ? "type2" : "", "input");
                var eDay = Tz.momentTimeZone(schd.FNSH_DTTM, isGeneralProject && isAllday ? "type2" : "", "input");

                var isDbOficialPbPROEJCT = schd.PB_SALES_SRNO > 0 && schd.OFFICIAL_YN === 'Y'
                var isComplete = schd.COMPLETE_YN === "Y";
                var isExistSttgDttm = Often.null2Void(schd.STTG_DTTM, "") !== "";
                var isExistFnshDttm = Often.null2Void(schd.FNSH_DTTM, "") !== "";

                //해당 부분 Tz에서 처리가능한지 확인 필요!
                var isUnValidStartDt = Tz.momentTimeZone(schd.STTG_DTTM) === schd.STTG_DTTM.substr(0, 14);
                var isUnValidEndDt =  Tz.momentTimeZone(schd.FNSH_DTTM) === schd.FNSH_DTTM.substr(0, 14);

                var eventJson = getDefaultEventJson();

                if (isGeneralProject && isMatchSearchWord && isViewSchedule) { //G: General-Project
                    isDbOficialPbPROEJCT && (eventJson.title = (isComplete ? '[활동완료]' : '[활동미완료]') + eventJson.title);
                } else if (isTask && isMatchSearchWord) {
                    eventJson.allDay = schd.ALL_DAY_YN === "Y"; //task는 항상 ALLDAY이다.
                    eventJson.title = getTaskStatus(schd.STTS) + " " + schd.TTL;
                    if (!isExistSttgDttm && !isExistFnshDttm) return; //일자가 하나라도 있으면 그 기준으로 뿌려주면 됨
                    var startDateTime, endDateTime;
                    if (isExistSttgDttm && !isExistFnshDttm) {
                        startDateTime = isUnValidStartDt ? Tz.momentConversion("current", "type2")
                            : Tz.momentTimeZone(schd.STTG_DTTM, "type2", "input");
                        eventJson.start = startDateTime;
                        eventJson.end = startDateTime;
                    } else if (!isExistSttgDttm && isExistFnshDttm) {
                        endDateTime = Tz.momentTimeZone(isUnValidEndDt ? Tz.momentConversion("current")
                            : schd.FNSH_DTTM).format(i18next.t("date.format.type2", {lng: 'ko'}));
                        eventJson.start = endDateTime;
                        eventJson.end = endDateTime;
                    } else {
                        startDateTime = isUnValidStartDt ? Tz.momentConversion("current", "type2")
                            : Tz.momentTimeZone(schd.STTG_DTTM, "type2", "input");
                        endDateTime = Tz.momentTimeZone(isUnValidEndDt ? Tz.momentConversion("current")
                            : schd.FNSH_DTTM).add(1, 'days').format(i18next.t("date.format.type2", {lng: 'ko'}));
                        eventJson.start = startDateTime;
                        eventJson.end = endDateTime;
                    }
                } else if (isHoliday) {
                    eventJson.title = TemporaryTranslation.koreanHolidaysFilter(schd.TTL)
                    //done.
                } else {
                    return;
                }

                schdEvents.push(eventJson);

                function getDefaultEventJson() {
                    return {
                        title: schd.TTL,
                        allDay: isAllday,
                        start: sDay,
                        end: eDay,
                        color: isHoliday ? "#a60602" : "",
                        gb: isHoliday ? "a" : isGeneralProject ? "c" : "b",
                        editable: false,
                        data: schd
                    }
                }
            });
        }

        $allCalendarLayer.find('#calendar').fullCalendar('removeEvents');
        $allCalendarLayer.find('#calendar').fullCalendar('addEventSource', schdEvents);
        // PopupDraw.closePopup();
        Loading.closeLoadingPop();

        function getTaskStatus(statusNo) {
            return "[" + i18next.t(TaskCode.OPTION._GB_NM[Number(statusNo)]) + "]";
        }
    }

    //2021-03-19 진영 수정
    function drawCalendar() {
        var flowLang = Internationalization.getCurrentLanguage();
        var calendarLang = flowLang === "ko" ? "ko" : flowLang === "en" ? "en" : flowLang === "jp" ? "jp" : "";

        var $oldCalendar = $allCalendarLayer.find('#calendar');
        var $newCalendar = $('<div id="calendar" class="all-calendar all-calendar-nav layer-scroll"></div>');
        $oldCalendar.after($newCalendar);
        $oldCalendar.remove();

        $allCalendarLayer.find('#calendar').fullCalendar({
            locale: calendarLang,
            header: {
                left: 'prev,title,next',
                center: '',
                right: 'month,agendaWeek,agendaDay,listMonth,today'
            },
            defaultDate: Tz.momentTimeZone(moment(), "type2"),
            nowIndicator: true,
            navLinks: true,
            viewRender: setViewRender,
            editable: false,
            eventLimit: true,
            eventOrder: "gb",
            eventClick: setEventClick,
            eventRender: setEventRender,
            windowResizeDelay: 100,
        });

        function setViewRender(view) {
            var fDate = view.start;
            var lDate = view.end.subtract(1, 'days');
            drawSchedule(fDate, lDate);
        }

        function setEventClick(event) {
            var data = event.data;
            var projectSrno = data.COLABO_SRNO;
            var postSrno = data.COLABO_COMMT_SRNO;
            var isHoliday = data.GB === ScheduleCode.HOLIDAY;
            if (isHoliday) return;
            PostPopup.togglePostView(projectSrno, postSrno, "", DetailEvent.applySummarySlickImage);
        }

        function setEventRender(event, element) {
            if (event.data.GB === ScheduleCode.HOLIDAY) {
                element.css("cursor", "default");
                return;
            }
            if (event.data.BG_COLOR_CD === "-1") return;
            element.addClass("color-code-" + event.data.BG_COLOR_CD);
            if (event.data.BG_COLOR_CD !== "0") return;
            element.css("color", "#555555");
        }
    }

    function drawSelectCalendar() {
        var rightBtn = $allCalendarLayer.find(".fc-header-toolbar .fc-right");
        if (rightBtn.find(".select-wr").length !== 0) return;
        var selectWr = document.createElement("div");
        selectWr.classList.add("select-wr");
        selectWr.insertAdjacentHTML('afterbegin', '<select class="select-box">\n' +
            '            <option value="month">' + i18next.t('date.string.month') + '</option>\n' +
            '            <option value="agendaWeek">' + i18next.t('date.string.week') + '</option>\n' +
            '            <option value="agendaDay">' + i18next.t('date.string.day') + '</option>\n' +
            '            <option value="listMonth">' + i18next.t('dictionary.list') + '</option>\n' +
            '        </select>');
        rightBtn.append(selectWr);
        $('.select-box').change(function () {
            $('.fc-' + this.value + '-button').trigger('click');
        });
    }

    function reloadCalendar() {
        drawSchedule();
    }
})();
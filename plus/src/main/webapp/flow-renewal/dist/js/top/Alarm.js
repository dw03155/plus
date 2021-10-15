var Alarm = (function () {

    var $alarmLayer;

    var alarmPageData = {
        PG_NO: 1,
        PG_PER_CNT: 50,
        NEXT_YN: "Y",
    }

    //Todo. PG_NO에 의한 페이징이기 때문에 읽어지는 알림에 따라 2페이징의 남은 알람이 나오지 않을 수 있어 ORDER 페이징으로 바꿔야함.
    //임시방편으로, PG_PER_CNT: 20 => 50으로 늘려 위의 케이스를 최소화함

    var projectAlarmPageData = {
        PG_NO: 1,
        PG_PER_CNT: 10,
        COLABO_SRNO: "",
    }

    var searchingTimer;
    var isNotReadMode;
    var isMoreAlarmActive;

    return {
        toggleLayer: toggleLayer,
        closeLayer: closeLayer,
        drawAlarmList: drawAlarmList,
        drawProjectAlarmItems: drawProjectAlarmItems,
        getAlarmItemsHtml: getAlarmItemsHtml,
        closeAlarmSearchFilter: closeAlarmSearchFilter,
        getRecentAlarmData: getRecentAlarmData,
        getOneAlarmData: getOneAlarmData,
        initProjectAlarmList: initProjectAlarmList,
    }

    function toggleLayer() {
        var $alarmLayer = $("#alarmLayer");
        if ($alarmLayer.is(":visible")) return closeLayer();
        var $alarmTopCount = _IsMini ? $("#allProjectTopAlarmCount") : $("#alarmTopCount");
        var isExistsCount = $alarmTopCount.is(":visible");
        $alarmLayer.find('.js-unread').attr("class", "js-alarm js-unread" + (isExistsCount ? " on" : " "));
        $alarmLayer.find('.js-read').attr("class", "js-alarm js-read" + (isExistsCount ? " " : " on"));
        drawAlarmList(true);
        addEvent();
        $alarmLayer.fadeIn(200);
    }

    function initProjectAlarmList() {
        ListHelper.initPageData(projectAlarmPageData, $("#projectAlarmArea").find("#notReadAlarmUl"));
    }

    function getOneAlarmData(data) {
        if (data && data.ALARM_REC && data.ALARM_REC.length > 0) return data.ALARM_REC[0]
        else return {}
    }

    // 상단 알림 클릭 이벤트
    function addEvent() {
        $("#notReadFilter").off("click").on("click", clickNotReadFilter);
        $("#alarmSearchFilterTopButton").off("click").on("click", AlarmClickEvent.clickAlarmSearchFilter);
        $("#alarmSearchInput").off('key').off('keyup').on('keyup', keyupAlarmSearchInput);
        $("#readAllAlarm").off("click").on("click", AlarmUpdate.readAllAlarm);
        $("#alarmLayer").find(".js-close-event").off("click").on("click", closeLayer);
    }

    // 상단 알림 리스트 출력 (필터 포함)
    function drawAlarmItems(isFocus) {

        if (alarmPageData.NEXT_YN === "N") return;
        var alarmSearchFilter = LocalUtil.getAlarmSearchFilter();
        var alarmSearchValue = $.trim($("#alarmSearchInput").val());
        var isSearch = "" !== alarmSearchValue;
        var $alarmUl = $("#alarmUl");
        Ajax.executeApi(RenewalApi.GET.ACT_ALARM_LIST, $.extend({}, alarmPageData, {
            SRCH_WORD: alarmSearchValue,
            GUBUN: alarmSearchFilter,
            MODE: (isNotReadMode ? "UNREAD" : "ALL")
        }), function (dat) {
            if (alarmPageData.PG_NO === 1) {
                var $targetAlarmCount = _IsMini ? $("#allProjectTopAlarmCount") : $("#alarmTopCount");
                !isSearch && AlarmUpdate.setBadgeCount($targetAlarmCount, dat.ALARM_COUNT, "inline-block");
            }
            $alarmUl.drawListHelper({
                pageData: alarmPageData,
                nextYn: dat["NEXT_YN"],
                records: dat["ALARM_REC"],
                noDataHtml: ListHelper.getNoDataHtml(isSearch ? "SEARCH" : "ALARM"),
                targetObj: {
                    focus: isFocus && $("#alarmSearchInput"),
                },
                callback: {
                    click: AlarmClickEvent.clickAlarmUl,
                    item: getAlarmItemsHtml,
                    scroll: drawAlarmItems,
                }
            })
        })
    }

    // 상단/ 프로젝트 알림의 HTML EXPORT
    function getAlarmItemsHtml(alarmArray, isProject) {
        var returnHtml = "";
        var baseHtml = (isProject ? $("#projectAlarmItem") : $("#alarmItem")).html();
        $.each(alarmArray, function (i, alarm) {
            var isTask = ("" !== Often.null2Void(alarm.TASK_NM, ""));
            var isReaction = ("" !== Often.null2Void(alarm.EMT_CD, ""));
            var isNotRead = ("N" === Often.null2Void(alarm.CONFM_YN, "N"));
            var isContainImg = ("Y" === Often.null2Void(alarm.IMG_ATCH_YN, "N"));
            var isContainFile = ("Y" === Often.null2Void(alarm.ATCH_YN, "N"));
            var alarmContents = $.trim(TagConvert.db2TwoStringByAlarm(alarm.ALAM_CNTN));

            if(isProject && alarm.ALARM_STATUS === "PROJECT_INVITE") return true; //contiune

            returnHtml += ListHelper.replaceJson(baseHtml, $.extend({}, alarm, {
                'TTL': alarm.TTL,
                'msg': alarm.ALAM_MSG,
                'contents': !isTask ? TagUtil.tag2html(alarmContents) : ListHelper.setEmTag(alarmContents, i18next.t('dictionary.context') + ":"),
                'emojiIcon': isReaction ? "icon-" + DetailCode.EMOJI._GB[alarm.EMT_CD - 1] : "",
                'date': Tz.momentTimeZone(alarm.RGSN_DTTM, "type1", 'fromNow'),
                'task-name': ListHelper.setEmTag(alarm.TASK_NM, i18next.t('front.common.taskTitle')) + (!isProject && isTask ? '<br>' : ''),
                'profile': ListHelper.setProfile(alarm.PRFL_PHTG),
                'not-read': (isNotRead ? "on" : ""),
                'task-yn': (isTask ? "d-block" : "d-none"),
                'img-display': ListHelper.setDisplay(isContainImg, "inline-block"),
                'file-display': ListHelper.setDisplay(isContainFile, "inline-block"),
            }))
        });
        return $(returnHtml);
    }

    // 프로젝트 알림 리스트 출력
    function drawProjectAlarmItems(projectSrno, record, totalCount, isInitProject) {

        var $projectAlarmArea = $("#projectAlarmArea");
        var $notReadAlarmUl = $("#notReadAlarmUl");
        var $moreButton = $("#notReadAlarmMore");

        if (record && record.length === 0) AlarmUpdate.removeNewUpdate();

        //Note. 프로젝트 간 이동하면 넘어오는 최초 시점
        // 상세에서 홈 이동 후 다시 동일 프로젝트 상세로 들어왔을 경우에도 미확인 알림영역 다시 그리도록 처리
        if (isInitProject) {
            ListHelper.initPageData(projectAlarmPageData, $notReadAlarmUl);
            isMoreAlarmActive = false;
            $notReadAlarmUl.off('click').on('click', AlarmClickEvent.clickProjectAlarm);
            projectAlarmPageData.COLABO_SRNO = projectSrno;
            if (record && record.length === 0) return $projectAlarmArea.css("display", "none");
        }

        AlarmUpdate.setBadgeCount($projectAlarmArea.find("#projectNotReadCount"), totalCount, "inline-block");

        // 알림 더보기가 처음 눌렀을때 Reload를 위함
        if (!isMoreAlarmActive) $notReadAlarmUl.empty();

        // 현재 페이지가 프로젝트가 아닐때
        // 상단 알림에서 조회된 프로젝트의 카운트만 업데이트 한다.
        if (ViewChanger.isPage("main")) {
            var $projectBadge = $('#project-' + projectSrno).find('.project-badge');
            AlarmUpdate.setBadgeCount($projectBadge, totalCount);
            return;
        }

        $notReadAlarmUl.append(getAlarmItemsHtml(record, true));

        var notReadAlarmItemLength = $notReadAlarmUl.find(".not-read-alarm-item").length;
        $moreButton.css("display", totalCount > notReadAlarmItemLength ? "block" : "none");
        $projectAlarmArea.css("display", notReadAlarmItemLength > 0 ? "block" : "none");

        $('#notReadAlarmMore').off('click').on('click', clickMoreButton);
        $('#readAllPostBnt').off('click').on('click', AlarmUpdate.readAllProjectAlarm);

        // 미확인 알림 더보기
        function clickMoreButton() {
            if (isMoreAlarmActive) projectAlarmPageData.PG_NO++;
            projectAlarmPageData.COLABO_SRNO = projectSrno;
            Ajax.executeApi(RenewalApi.GET.ACT_ALARM_LIST, $.extend({MODE: "UNREAD"}, projectAlarmPageData), function (dat) {
                drawProjectAlarmItems(projectSrno, dat["ALARM_REC"], totalCount);
                isMoreAlarmActive = true;
            })
        }
    }

    function getRecentAlarmData(callback) {
        Ajax.executeApi(RenewalApi.GET.ACT_ALARM_LIST, {PG_NO: 1, PG_PER_CNT: 1, MODE: "UNREAD"}, callback);
    }

    // 상단 미확인 알림만 보기
    function clickNotReadFilter(e) {
        var $alarmUl = $("#alarmUl");
        var $eTarget = $(e.target);
        var $alarm = $eTarget.findUp(".js-alarm");
        if ($alarm.length === 0) return;
        $("#notReadFilter").find(".js-alarm").removeClass("on")
        $alarm.addClass("on");
        isNotReadMode = $(".js-unread").hasClass("on");
        ListHelper.initPageData(alarmPageData);
        $alarmUl.off(); // 클릭했을때 동기화 문제로 모든 이벤트 remove
        drawAlarmItems(true);
    }

    // 상단 레이어 닫기
    function closeLayer(isNotFadeOut) {
        var timeOut = 0;
        if (!isNotFadeOut) {
            $("#alarmLayer").fadeOut(200);
            timeOut = 200;
        } else {
            $("#alarmLayer").css('display', 'none');
        }

        setTimeout(function () {
            resetAlarmTopAlarmList();
        }, timeOut)
    }

    // 상단 알림 리스트 (처음)
    function drawAlarmList(isFocus) {
        $alarmLayer = $("#alarmLayer");
        isNotReadMode = $alarmLayer.find(".js-unread").hasClass("on");
        ListHelper.initPageData(alarmPageData);
        drawAlarmItems(isFocus);
    }

    // 상단 알림의 검색 필터 레이어 닫기
    function closeAlarmSearchFilter() {
        $("#alarmSearchFilterLayer").addClass('d-none')
    }

    // 상단 알림의 검색 필터 Fragment
    function keyupAlarmSearchInput() {
        searchingTimer && clearTimeout(searchingTimer);
        searchingTimer = setTimeout(function () {
            drawAlarmList(true);
        }, 500);
    }

    function resetAlarmTopAlarmList() {
        $("#alarmSearchInput").val("")
        $("#alarmUl").empty();
    }

})()
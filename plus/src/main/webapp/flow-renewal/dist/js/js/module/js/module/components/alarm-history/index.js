import {item} from '../../items/AlarmHistoryItem';
//Ajax, ListHelper, Tz, AlarmUpdate

const AlarmHistory = (() => {

    const n2v = (v, d) => Often.null2Void(v, d);
    const alarmHistoryData = {
        PG_NO: 1,
        PG_PER_CNT: 50,
        NEXT_YN: "Y",
        MODE: "HISTORY",
    }
    const $element = {};
    let searchingTimer;

    return {
        openView(projectSrno) {
            alarmHistoryData.COLABO_SRNO = projectSrno;
            drawInitList()
        }
    }

    function drawInitList() {
        initView();
        drawList();
    }

    function drawSearchList() {
        ListHelper.initPageData(alarmHistoryData);
        drawList();
    }

    function initView() {
        set$element();
        ListHelper.initPageData(alarmHistoryData, $element.ul);
        $element.searchInput.off('keyup').val("");
        addEvent();
    }

    function addEvent() {
        $element.searchInput.off('keyup').on('keyup', clickSearchInput);
    }

    function set$element() {
        $element.wrap = $(".allHistoryLayer");
        $element.ul = $element.wrap.find("ul");
        $element.searchInput = $element.wrap.find("#historySearchInput");
    }

    function getListData() {
        const SRCH_WORD = n2v($element.searchInput.val()).trim();
        const inputData = Object.assign({}, alarmHistoryData, {SRCH_WORD, GUBUN: "0,1,2,"});
        return Ajax.executeApi("ACT_ALARM_LIST", inputData);
    }

    async function drawList() {
        const result = await getListData();
        $element.ul.drawListHelper({
            pageData: alarmHistoryData,
            nextYn: result["NEXT_YN"],
            records: result["ALARM_REC"],
            noDataHtml: ListHelper.getNoDataHtml("ALARM"),
            targetObj: {
                focus: $element.searchInput,
            },
            callback: {
                click: clickOneItem,
                item: makeOneItem,
                scroll: drawList,
            }
        })
    }

    function clickSearchInput() {
        searchingTimer && clearTimeout(searchingTimer);
        searchingTimer = setTimeout(function () {
            drawSearchList();
        }, 500);
    }

    function clickOneItem(e) {
        const $eTarget = $(e.target);
        const $alarmItem = $eTarget.closest('.js-alarm-item');
        if ($alarmItem.length === 0) return;
        const dataObj = Object.assign(Often.getAttrs($alarmItem)[0], {OPEN_POP: true});
        AlarmUpdate.readAlarmAndAction(dataObj)
    }

    function makeOneItem(arr) {
        return arr.map(v => ListHelper.replaceJson(item, convertOneItem(v)))
    }

    function convertOneItem(v) {
        const isReaction = ("" !== n2v(v.EMT_CD));
        const isContainImg = ("Y" === n2v(v.IMG_ATCH_YN, "N"));
        const isContainFile = ("Y" === n2v(v.ATCH_YN, "N"));
        const isTask = ("" !== n2v(v.TASK_NM));
        return Object.assign({}, v, {
            'emoti-class': isReaction ? "icon-" + DetailCode.EMOJI._GB[v.EMT_CD - 1] : "",
            'task-name-tag': ListHelper.setEmTag(v.TASK_NM, i18next.t('front.common.taskTitle')) + (isTask ? '<br>' : ''),
            'data-text': Tz.momentTimeZone(v.RGSN_DTTM, "type1", 'fromNow'),
            'profile-style': ListHelper.setProfile(v.PRFL_PHTG),
            'img-display': ListHelper.setDisplay(isContainImg, "inline-block"),
            'file-display': ListHelper.setDisplay(isContainFile, "inline-block"),
        })
    }

})()

export default AlarmHistory;
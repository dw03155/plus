var TaskExcel = (function () {

    var orderColumn = [
        {CODE: "COLABO_SRNO", NAME: "프로젝트 일련번호"},
        {CODE: "TASK_NUM", NAME: "업무번호"},
        {CODE: "PRIORITY", NAME: "우선순위"},
        {CODE: "TASK_NM", NAME: "업무제목"},
        {CODE: "STTS", NAME: "상태"},
        {CODE: "PROGRESS", NAME: "진척도"},
        {CODE: "WORKER_REC", NAME: "담당자"},
        {CODE: "START_DT", NAME: "시작일"},
        {CODE: "END_DT", NAME: "마감일"},
        {CODE: "PRJ_TTL", NAME: "프로젝트명"},
        {CODE: "RGSR_ID", NAME: "등록자ID"},
        {CODE: "RGSR_NM", NAME: "등록자명"},
        {CODE: "RGSN_DTTM", NAME: "등록일"},
        {CODE: "EDTR_DTTM", NAME: "수정일"},
    ]

    return {
        downAllTaskExcel: downAllTaskExcel,
    }

    function downAllTaskExcel() {
        var totalTaskCount = AllTask.getTotalTaskCount();
        if (totalTaskCount === 0) return Often.toast("info", "엑셀 내려받을 데이터가 존재하지 않습니다.");

        var excelData = [];
        var isCanceled = false;
        var percent = 1;
        var downExcelTaskData = {
            PG_NO: 1,
            PG_PER_CNT: 30,
            NEXT_YN: "Y",
        }

        drawPercentPopup();
        downloadExcelTaskData();

        function drawPercentPopup() {
            Loading.drawLoadingJson({
                CONTENTS: "엑셀 다운로드 진행 중입니다.(0%)",
                CALLBACK: {CANCEL: cancelDownload}
            })

            function cancelDownload() {
                // PopupDraw.closePopup();
                Loading.closeLoadingPop();
                isCanceled = true;
            }
        }

        function downloadExcelTaskData() {
            Ajax.executeApi(RenewalApi.GET.ACT_TASK_LIST, $.extend({}, AllTask.getTaskApiJson(), downExcelTaskData), function (dat) {
                if (isCanceled) return;
                $("#js-loading-popup").find(".popup-cont").text(getPopupContent());
                excelData = excelData.concat(dat.TASK_RECORD);
                if (dat.NEXT_YN === "N") {
                    $.each(excelData, function (i, v) {
                        var progress = Often.null2Void(v.PROGRESS, "0");
                        var state = v.STTS;
                        var priority = v.PRIORITY;
                        v.RGSN_DTTM = Tz.momentTimeZone(Often.null2Void(v.RGSN_DTTM, ""), "type12");
                        v.EDTR_DTTM = Tz.momentTimeZone(Often.null2Void(v.EDTR_DTTM, ""), "type12");
                        v.PROGRESS = addPercentSign(progress);
                        v.STTS = i18next.t(DetailCode.STATUS._TEXT[state]);
                        v.PRIORITY = i18next.t(DetailCode.PRIORITY._ALL_TEXT[priority]);
                        v.WORKER_REC = AllTask.getWorkerNameCommaArray(v.WORKER_RECORD);
                    })
                    Excel.down('업무목록_' + Tz.momentConversion("current"), excelData, orderColumn);
                    Loading.closeLoadingPop();
                } else {
                    downExcelTaskData.PG_NO++;
                    downloadExcelTaskData();
                }
            });
        }

        function getPopupContent() {
            var nowPercent = Math.ceil(percent++ / (totalTaskCount / downExcelTaskData.PG_PER_CNT) * 100);
            return "엑셀 다운로드 진행 중입니다.(" + (nowPercent > 99 ? 100 : nowPercent) + "%)";
        }

        function addPercentSign(value) {
            return value !== "" ? value + "%" : value;
        }
    }

})();
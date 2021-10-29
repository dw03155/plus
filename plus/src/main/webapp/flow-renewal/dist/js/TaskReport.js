var TaskReport = (function () {
    return {
        drawTaskReport: drawTaskReport,
        clickTaskReportLayer: clickTaskReportLayer,
    };

    function clickTaskReportLayer(e) {
        var $eTarget = $(e.target);
        var $taskChartInfo = $eTarget.parents(".task-chart-info");
        if ($taskChartInfo.length === 0) return;
        LocalUtil.setLocal("TASK_REPORT", $taskChartInfo.attr("data-code"));
        ViewChanger.loadPageJson({code: "task", first: Detail.getProjectSrno()});
    }

    function drawTaskReport(taskReportRecord) {
        var $taskReportArea = $("#taskReportArea");
        $taskReportArea.empty();
        $taskReportArea.find("#TASK_DONUT_CHART").empty();

        if (!taskReportRecord) return;
        if (taskReportRecord && taskReportRecord.length === 0) return;
        if (taskReportRecord && Number(taskReportRecord[0].TOTAL_CNT) === 0) return;

        var oneTaskReportData = taskReportRecord[0];
        oneTaskReportData.TOTAL_CNT = Often.numberWithCommas(taskReportRecord[0].TOTAL_CNT);
        var donutJson = {};
        var textJson = {
            REQ: i18next.t("dictionary.request"),
            PROG: i18next.t("dictionary.progress"),
            FEDBK: i18next.t("dictionary.feedback"),
            COMP: i18next.t("dictionary.complete"),
            HOLD: i18next.t("dictionary.hold"),
        };
        var replaceJson = {};
        var totalPercent = 0;

        for (var key in textJson) {
            var numberValue = Number(oneTaskReportData[key]);
            replaceJson[key] = Often.numberWithCommas(numberValue);
            textJson[key] && (donutJson[textJson[key]] = numberValue);
            replaceJson[key + "_NAME"] = textJson[key];
            replaceJson[key + "_PER"] = oneTaskReportData[key + "_PER"];
            totalPercent += Number(replaceJson[key + "_PER"]);
        }

        if (totalPercent !== 100) {
            //Note. 총합 100% 아닐 경우 가감하여 요청에 반영함.
            replaceJson["REQ_PER"] = Number(replaceJson["REQ_PER"]) + (100 - totalPercent);
        }

        var baseHtml = $("#taskReportItem").html();
        var $taskReportItem = $(ListHelper.replaceJson(baseHtml, $.extend(taskReportRecord[0], replaceJson)));
        $taskReportArea.empty();
        $taskReportArea.append($taskReportItem);
        var isExpandTaskReport = "Y" === LocalUtil.getLocalValue("CURRENT_PROJECT_SETTING", "TASK_REPORT_VIEW_YN");

        $taskReportArea.find("#TASK_DONUT_CHART").empty();
        drawChart("TASK_DONUT_CHART", donutJson);

        if (isExpandTaskReport) {
            $taskReportArea.find(".reports-button").removeClass("off");
            $taskReportArea.find(".js-task-report-layer").css('display', 'block');
        } else {
            $taskReportArea.find(".reports-button").addClass("off");
            $taskReportArea.find(".js-task-report-layer").css('display', 'none');
        }
    }

    function drawChart(targetId, donutJson) {
        graph.ready(["chart.builder"], function (chart) {
            chart("#" + targetId, {
                padding: 0,
                width: 100,
                height: 100,
                style: {tooltipBackgroundOpacity: 1},
                axis: {data: [donutJson]},
                brush: {
                    type: "donut",
                    size: 10,
                    colors: ["#4aaefb", "#50b766", "#f17a19", "#2e417e", "#d2d3d6"],
                },
                widget: [
                    {
                        type: "tooltip",
                        orient: "left",
                    },
                ],
            });
        });
    }
})();

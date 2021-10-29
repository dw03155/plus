var TaskGroupMore = (function () {

    return {
        getPgPerCnt: getPgPerCnt,
        initButton: initButton,
        getButtonHtml: getButtonHtml,
        addClickEvent: addClickEvent,
    }

    function getPgPerCnt(originPgPerCnt) {
        return isActive() ? 100 : originPgPerCnt;
    }

    function getButtonHtml() {
        if (!isActive()) return "";
        return '<button class="task-grouping-more-button">더보기</button>';
    }

    function initButton() {
        if (!isActive()) return;
        $(".task-grouping-more-button").remove();
    }

    function addClickEvent($allTaskLayer, callback) {
        if (!isActive()) return;
        if ($allTaskLayer.find(".task-grouping-more-button").length === 0) return;
        $allTaskLayer.find(".task-grouping-more-button").on("click", function () {
            if ($(this).attr("data-wait-yn") === "Y") return Often.toast("error", i18next.t('front.common.wait'));
            $(this).html('<i class="circle gray"></i><i class="circle gray"></i><i class="circle gray"></i><i class="circle gray"></i>')
                .attr("data-wait-yn", "Y");
            (typeof callback !== "undefined") && callback();
        });
    }

    function isActive(){
        return Often.isFunc("TASK_GROUPING_MORE_BTN");
    }

})()
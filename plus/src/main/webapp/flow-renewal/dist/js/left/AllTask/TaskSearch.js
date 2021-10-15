var TaskSearch = (function () {

    var $detailSearchLayer;

    return {
        initSetting: initSetting,
        clickDetailSearchTopButton: clickDetailSearchTopButton,
        closeDetailSearchLayer: closeDetailSearchLayer,
        keydownSearchInput: keydownSearchInput,
    }

    function clickDetailSearchTopButton(e) {
        var $taskDetailTopButton = $(e.currentTarget);
        $detailSearchLayer = $taskDetailTopButton.next();
        if ($detailSearchLayer.is(":visible")) {
            closeDetailSearchLayer();
        } else {
            SearchFilter.initFilter($detailSearchLayer, searchMode.TASK, true);
            SearchFilter.addEventOnSearchFilter($detailSearchLayer, searchTaskList, true);
            $taskDetailTopButton.addClass("active");
            $detailSearchLayer.fadeIn(200);
        }
    }

    function searchTaskList() {
        closeDetailSearchLayer();
        AllTask.searchTaskList();
    }

    function keydownSearchInput(e) {
        if (KeyCheck.isKey(e, "ENTER")) searchTaskList();
        if (KeyCheck.isKey(e, "ESC")) closeDetailSearchLayer();
    }

    function closeDetailSearchLayer($eTarget) {
        if ($eTarget && ($eTarget.hasClass("js-task-search-input"))) return;
        $detailSearchLayer && $detailSearchLayer.fadeOut(200);
        $detailSearchLayer && $detailSearchLayer.prev().removeClass("active");
    }

    function initSetting($allTaskLayer) {
        $detailSearchLayer = $allTaskLayer.find(".js-task-detail-search-layer");
        SearchFilter.initFilter($detailSearchLayer, searchMode.TASK);
        $allTaskLayer.find(".js-task-search-input").val("");
    }


})();
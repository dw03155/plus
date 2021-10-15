var FileFilter = (function () {

    return {
        isTotalFilter: isTotalFilter,
        getFileTypeOnFilter: getFileTypeOnFilter,
        toggleFilterButton: toggleFilterButton,
        setFileFilter: setFileFilter,
        clickFileFilterItem: clickFileFilterItem,
        initFileFilter: initFileFilter,
        closeFilter: closeFilter,
    }

    function isTotalFilter($fileTypeFilter) {
        return "TOTAL" === getFileTypeOnFilter($fileTypeFilter);
    }

    function getFileTypeOnFilter() {
        return Often.null2Void($("#fileFilter").find(".js-common-radio.all-checked").parents(".js-filter-button").attr("file-type"));
    }

    function toggleFilterButton(e) {
        e.stopPropagation();
        var $eCurrentTarget = $(e.currentTarget);
        var $filterArea = $eCurrentTarget.findUp("#leftArea");
        var $fileFilterButton = $eCurrentTarget;
        var $fileFilterUl = $filterArea.find("#fileFilter");
        var isOpenedFilter = $fileFilterButton.hasClass("close");
        $fileFilterUl.css("display", isOpenedFilter ? "block" : "none");
        LocalUtil.setLocal("FILE_FILTER", isOpenedFilter ? "ON" : "OFF");
    }

    function applyFilterOnOff() {
        var isOnFileFilter = LocalUtil.getFileFilter() === "ON";
        if (isOnFileFilter) openFilter($("#leftArea"));
        else closeFilter($("#leftArea"));
    }

    function openFilter($fileFilterArea) {
        $fileFilterArea.find("#leftTask").removeClass("active");
        $fileFilterArea.find("#leftFilter").addClass("active");
        $fileFilterArea.find("#fileFilter").css("display", "block");
    }

    function closeFilter($fileFilterArea) {
        $fileFilterArea.find("#leftFilter").removeClass("active");
        $fileFilterArea.find("#leftTask").addClass("active");
        $fileFilterArea.find("#fileFilter").css("display", "none");
    }

    function initFileFilter($fileFilterArea) {
        $fileFilterArea.find(".js-common-radio").removeClass("all-checked");
        $fileFilterArea.find(".js-filter-button[file-type=TOTAL]").find(".js-common-radio").addClass("all-checked");
        $fileFilterArea.find(".js-file-type-filter-icon").removeClass("on");
        applyFilterOnOff($fileFilterArea)
    }

    function setFileFilter($filterOption) {
        $filterOption.parents("#fileFilter").find(".js-common-radio").removeClass("all-checked");
        $filterOption.find(".js-common-radio").addClass("all-checked");
    }

    function clickFileFilterItem(e) {
        e.stopPropagation();
        var $eTarget = $(e.target);
        var $accordionButton = $eTarget.findUp(".js-accordion-button");
        if ($accordionButton.length > 0) {
            $accordionButton.toggleClass("active");
            return;
        }
        var $filterOption = $eTarget.findUp(".js-filter-button");
        if ($filterOption.length === 0) return;
        setFileFilter($filterOption);
        AllFile.drawListByFilter();
    }

})();
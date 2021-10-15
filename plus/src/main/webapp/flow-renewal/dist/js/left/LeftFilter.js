var LeftFilter = (function () {

    var $leftFilter, $leftFilterBtn;

    return {
        toggleLeftFilter: toggleLeftFilter,
        openLeftFilter: openLeftFilter,
        closeLeftFilter: closeLeftFilter,
        initLeftFilterUl: initLeftFilterUl,
    }

    function set$element() {
        $leftFilter = $("#leftFilter"); //좌측 필터 영역
        $leftFilterBtn = $("#leftFilterBtn"); //좌측 필터 버튼
    }

    function toggleLeftFilter(e) {
        set$element();
        if ($leftFilter.is(":visible")) return closeLeftFilter();
        openLeftFilter(e);
    }

    function openLeftFilter(e) {
        $leftFilter.addClass("active");
        $("#leftTask").removeClass("active");
        $leftFilterBtn.removeClass("open").addClass("close");
        $leftFilterBtn.find("span").text(i18next.t("dictionary.close"));
        initLeftFilterUl(e);
        $leftFilter.off("click").on("click", clickLeftFilter);
    }

    function closeLeftFilter() {
        set$element();
        $leftFilter.removeClass("active");
        $("#leftTask").addClass("active");
        $leftFilterBtn.removeClass("close").addClass("open");
        $leftFilter.find(".js-left-filter-ul").css("display", "none");
        $leftFilterBtn.find("span").text(i18next.t("dictionary.open"));
    }

    function initLeftFilterUl(e) {
        set$element();
        $leftFilter.find(".js-left-filter-ul").css("display", "none");
        if (ViewChanger.isPage("schd")) CalendarFilter.openCalendarFilter();
        if (ViewChanger.isPage("task")) TaskFilter.toggleTaskFilterButton(e);
        if (ViewChanger.isPage("file")) FileFilter.toggleFilterButton(e);
    }

    function clickLeftFilter(e) {
        var $eTarget = $(e.target);

        if (isLeftFilterItemAndAction($eTarget)) return;
        if (CalendarFilter.isCalendarFilterAndAction($eTarget)) return;

        function isLeftFilterItemAndAction($eTarget) {
            var $leftFilterItem = $eTarget.findUp(".js-left-filter-item");
            if ($leftFilterItem.length === 0) return false;
            if ($leftFilterItem.hasClass("active")) {
                $leftFilterItem.removeClass("active");
                $leftFilterItem.next().slideUp();
            } else {
                $leftFilterItem.addClass("active");
                $leftFilterItem.next().slideDown();
            }
            return true;
        }
    }
})();
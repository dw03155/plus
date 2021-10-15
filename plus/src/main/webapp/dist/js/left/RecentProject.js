var RecentProject = (function () {

    var RecentProjectPageData = {
        PG_NO: 1,
        PG_PER_CNT: 5,
        NEXT_YN: "Y",
    }

    var $RecentProjectButton, $RecentProjectUl, $recentProjectMore;

    return {
        reloadRecentProject: reloadRecentProject,
        clickRecentProjectLeftButton: clickRecentProjectLeftButton,
    }

    function set$Element() {
        $RecentProjectButton = $("#RecentProjectButton");
        $RecentProjectUl = $("#RecentProjectUl");
        $recentProjectMore = $("#recentProjectMore");
        /**
         * <div id="RecentProjectButton"></div>
         * <div class="menu-accordion">
         *       <ul id="RecentProjectUl"></ul>
         * </div>
         * <button id="recentProjectMore"></button>
         * */
    }

    function reloadRecentProject() {
        set$Element();
        var isActiveRecentProject = $RecentProjectButton.hasClass("active");
        if (!isActiveRecentProject) return;
        var isUnfold = $RecentProjectUl.children("li").length > 5;
        setTimeout(function () {
            drawRecentProjectList(isUnfold && "REFRESH");
        }, 500);
    }

    function drawRecentProjectList(code) {

        set$Element();

        code = code || "INIT";
        var isMore = code === "MORE";
        var isRefresh = code === "REFRESH";

        if (Often.isFunc(Func.CLOUD.BLOCK_WEB_LNB_PROJ_LIST)) return;

        if (isRefresh) {
            ListHelper.initPageData(RecentProjectPageData);
            RecentProjectPageData.PG_PER_CNT = 30;
        } else if (isMore) {
            RecentProjectPageData.PG_PER_CNT = 25;
        } else {
            ListHelper.initPageData(RecentProjectPageData);
            RecentProjectPageData.PG_PER_CNT = 5;
        }

        Ajax.executeApi(RenewalApi.GET.ACT_PROJECT_LIST, $.extend({}, RecentProjectPageData, {
            COLABO_FLD_KIND: "1",
            COLABO_FLD_SRNO: "11",
            MODE: "RECENT",
        }), function (dat) {

            var $RecentProjectUl = $("#RecentProjectUl");

            !isMore && ListHelper.initPageData({}, $RecentProjectUl);

            $RecentProjectUl.drawListHelper({
                pageData: RecentProjectPageData,
                nextYn: dat["NEXT_YN"],
                records: dat["PROJECT_RECORD"],
                callback: {
                    click: clickRecentProjectArea,
                    item: getRecentProjectItemsHtml,
                    final: callbackFinal,
                }
            });
            $RecentProjectUl.slideDown(300);
        })

        function callbackFinal() {

            $recentProjectMore.off("click").on("click", function () {
                var isFold = !$(this).hasClass("active");
                drawRecentProjectList(isFold ? "MORE" : "");
            })

            if (isMore || isRefresh) {
                setMoreButton(false);
            } else {
                if (RecentProjectPageData.NEXT_YN === 'N') {
                    $recentProjectMore.remove();
                } else {
                    setMoreButton(true);
                }
            }
        }
    }

    function setMoreButton(isUnFold) {
        if (isUnFold) {
            $recentProjectMore.removeClass("active");
            $recentProjectMore.text(i18next.t('dictionary.unfold'));
        } else {
            $recentProjectMore.addClass("active");
            $recentProjectMore.text(i18next.t('dictionary.fold'));
        }
    }

    function getRecentProjectItemsHtml(projectArray) {
        var returnHtml = "";
        var baseHtml = $("#recentProjectItem").html();
        $.each(projectArray, function (i, project) {
            var isBadge = ("0" !== Often.null2Void(project.BADGE_CNT, "0"));
            returnHtml += ListHelper.replaceJson(baseHtml, {
                'title': project.TTL,
                'project-srno': project.COLABO_SRNO,
                'color-code': project.BG_COLOR_CD,
                'new': (isBadge ? "new" : "")
            })
        });
        return returnHtml;
    }

    function clickRecentProjectArea(e) {
        var $eTarget = $(e.target);
        var $recentProjectItem = $eTarget.findUp(".recent-project-item");
        if ($recentProjectItem.length > 0) {
            var projectSrno = $recentProjectItem.attr("data-project-srno");
            var colorSrno = $recentProjectItem.attr("data-color-code");
            LocalUtil.setLocalValue("CURRENT_PROJECT_SETTING", "TTL", $recentProjectItem.text());
            LocalUtil.setLocalValue("CURRENT_PROJECT_SETTING", "BG_COLOR_CD", colorSrno);
            LocalUtil.setLocalValue("CURRENT_PROJECT_SETTING", "IMPT_YN", "N");
            var pageCode = ViewChanger.getPageCode();
            if (pageCode === "schd" || pageCode === "task" || pageCode === "file") {
                ViewChanger.loadPageJson({code: pageCode, first: projectSrno});
                return;
            }
            ViewChanger.loadPageJson({code: 'detail', first: projectSrno});
        } else {
            //pass
        }

    }

    function clickRecentProjectLeftButton(e) {
        var $eTarget = $(e.target);
        var $leftMenuItem = $eTarget.findUp(".left-menu-item");
        var $recentProjectMore = $("#recentProjectMore");
        $leftMenuItem.toggleClass("active");
        $recentProjectMore.toggleClass('d-none');
        var isTabOn = $leftMenuItem.hasClass("active");
        LocalUtil.setLocalValue("ONLY_LEFT_FOLD_SETTING", "RECENT", isTabOn ? "Y" : "N");
        var $RecentProjectUl = $("#RecentProjectUl");
        isTabOn && $RecentProjectUl.find("li").length === 0 ? drawRecentProjectList() : $RecentProjectUl.slideToggle();
        $RecentProjectUl.empty();
    }


})();
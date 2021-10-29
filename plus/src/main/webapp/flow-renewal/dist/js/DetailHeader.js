var DetailHeader = (function () {

    var clickTimer;
    var isClicking = false;

    var $detailTop, $detailSettingTopButton;

    return {
        drawProjectHeaderItem: drawProjectHeaderItem,
        drawTempProjectHeaderItem: drawTempProjectHeaderItem,
        drawInitProjectHeader: drawInitProjectHeader,
        setProjectIcon: setProjectIcon,
    }

    function set$element() {
        $detailTop = $("#detailTop");
        $detailSettingTopButton = $detailTop.find("#detailSettingTopButton");
        /**
         * <div>
         *     <div id="detailTop">
         *         <div id="detailSettingTopButton"></div>
         *     </div>
         * </div>
         */
    }

    function drawProjectHeaderItem(projectData, activeTabCode) {

        if (!projectData) return;

        set$element();

        var title = $.trim(projectData.TTL);
        var contents = $.trim(projectData.CNTN);
        var isStar = "Y" === projectData.IMPT_YN;
        var isSpecialProject = Often.null2Void(projectData.COLABO_GB, "") !== ""; // COLABO_GB - 8:샘플방 / 9: 일대일방
        var isCompanyProject = Often.null2Void(projectData.CMNM_YN, "N") !== "N"

        var colorClassName = ListHelper.getColorClassName(projectData.BG_COLOR_CD);
        var colorClassNameOnInviteBtn = ListHelper.getColorClassNameOnInviteBtn(projectData.BG_COLOR_CD);

        var $projectContents = $("#projectContents");
        var $projectColor = $("#projectColor");
        var $openInviteLayerBtn = $("#openInviteLayerBtn");
        var $projectStar = $("#projectStar");
        var $detailTab = $("#detailTab");

        $("#projectTitle").text(title).attr("mouseover-text", title);
        $("#participantCount").text(Often.numberWithCommas(projectData.SENDIENCE_CNT));
        setProjectIcon(projectData);
        document.title = title + " - " + i18next.t('front.common.flowTitle');

        $projectColor.attr('class', '').addClass('project-color').addClass(colorClassName);
        $openInviteLayerBtn.attr('class', '').addClass('project-invite-button').addClass(colorClassNameOnInviteBtn);
        $openInviteLayerBtn.css("display", isSpecialProject || isCompanyProject ? "none" : "block");

        drawStarProject($projectStar, isStar);
        $projectContents.text(contents);
        $projectContents.addClass("js-mouseover").attr("mouseover-text", contents);
        $projectContents.parent().css('display', contents === "" ? 'none' : 'block');
        $detailTab.find(".js-tab-item").removeClass("active");
        $detailTab.find(".js-tab-item[data-code=" + Often.null2Void(activeTabCode, "home") + "]").addClass("active");
        $detailTab.find(".js-tab-item.gantt").css("display", Often.isFunc(Func.CLOUD.GANTT) ? "block" : "none");
        $projectStar.off("click").on("click", setProjectStarOnDetail);
        $projectColor.off("click").on("click", DetailSetting.changeProjectColor);
        $detailTab.off("click").on("click", clickDetailTabWithThrottling);
        $detailSettingTopButton.off("click").on("click", DetailSetting.clickDetailSettingBtn);

        $detailTop.css("display", "block");

        function setProjectStarOnDetail() {
            var isStarMode = !$projectStar.hasClass("unstar");
            ProjectSetting.setProjectStar(projectData.COLABO_SRNO, isStarMode, function () {
                drawStarProject($projectStar, !isStarMode);
            })
        }

        function drawStarProject($projectStar, isStarMode) {
            $projectStar.attr('class', 'bookmark-button' + (isStarMode ? "" : " unstar"));
        }
    }

    function drawTempProjectHeaderItem(projectSrno) {
        set$element();
        if (projectSrno !== LocalUtil.getLocalValue("CURRENT_PROJECT_SETTING", "COLABO_SRNO")) {
            return $detailTop.css("display", "none");
        }
        drawProjectHeaderItem({
            TTL: LocalUtil.getLocalValue("CURRENT_PROJECT_SETTING", "TTL"),
            IMPT_YN: LocalUtil.getLocalValue("CURRENT_PROJECT_SETTING", "IMPT_YN"),
            BG_COLOR_CD: LocalUtil.getProjectBgColorCd(),
            SENDIENCE_CNT: LocalUtil.getLocalValue("CURRENT_PROJECT_SETTING", "SENDIENCE_CNT"),
        })
    }

    function drawInitProjectHeader(activeTabCode, projectSrno) {
        Detail.setProjectSrno(projectSrno);
        drawProjectHeaderItem(LocalUtil.getLocalJson("CURRENT_PROJECT_SETTING"), activeTabCode);
    }

    //프로젝트 설정 아이콘
    function setProjectIcon(projectData) {
        set$element();
        if (!projectData) return;
        projectData.PUSH_ALAM_YN && $("#unalarmIcon").css("display", projectData.PUSH_ALAM_YN === "N" ? "inline-block" : "none");
        projectData.JNNG_ATHZ_YN && $("#lockIcon").css("display", projectData.JNNG_ATHZ_YN === "Y" ? "inline-block" : "none");
        projectData.CMNM_YN && $("#companyIcon").css("display", projectData.CMNM_YN === "Y" ? "inline-block" : "none");
        projectData.OPEN_YN && $("#openProjIcon").css("display", projectData.OPEN_YN === "Y" ? "inline-block" : "none");
    }

    function clickDetailTabWithThrottling(e) {
        if (isClicking) return;
        clickDetailTab(e);
        isClicking = true;
        clickTimer = setTimeout(function () {
            isClicking = false;
            clearTimeout(clickTimer);
        }, 500);
    }

    function clickDetailTab(e) {
        var $eTarget = $(e.target);
        var $tabItem = $eTarget.closest(".js-tab-item");
        if ($tabItem.length === 0) return;
        var tabCode = Often.null2Void($tabItem.attr("data-code"), "home");
        var projectSrno = Detail.getProjectSrno();
        if (tabCode === "gantt") return OpenUtil.openGanttChart(projectSrno);

        ProjectSearch.hideSearchProjectList();
        DetailHeader.drawInitProjectHeader(tabCode, projectSrno);
        var tempJson = {first: projectSrno};
        if (tabCode === "task") return ViewChanger.loadPageJson($.extend({code: "task"}, tempJson));
        if (tabCode === "calendar") return ViewChanger.loadPageJson($.extend({code: "schd"}, tempJson));
        if (tabCode === "file") return ViewChanger.loadPageJson($.extend({code: "file"}, tempJson));
        if (tabCode === "history") return ViewChanger.loadPageJson($.extend({code: "history"}, tempJson));
        ViewChanger.loadPageJson($.extend({code: "detail"}, tempJson));
    }

})();
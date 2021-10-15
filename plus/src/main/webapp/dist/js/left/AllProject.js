var AllProject = (function () {

    var projectPageData = {
        PG_NO: 1,
        PG_PER_CNT: 100,
        NEXT_YN: "Y",
    }

    var projectMode = {
        MAIN: 'MAIN',
        STAR_FIRST: 'STAR_FIRST',
        COMBINE: 'COMBINE',
        LABEL: 'LABEL',
        NOKEEP: 'NOKEEP',
        UNREAD: 'UNREAD',
        STAR: 'STAR',
        HIDDEN: 'HIDDEN',
    }

    var isAddUnstarDiv = false;

    var filterJson = {}

    var isBoardType, typeId, isStarMode;

    return {
        getProjectMode: getProjectMode,
        showList: showList,
        getProjectItems: getProjectItemsHtml,
        clickProjectItems: clickProjectItems,
    }

    function getProjectMode() {
        return projectMode;
    }

    function showList(filterData) {
        //filterData 비어있으면 이전 필터를 따라감
        filterJson = filterData || filterJson;
        isStarMode = ("Y" === LocalUtil.getLocalValue("ONLY_USER_SETTING", "IMPT_USE_YN"));

        if (filterJson.MODE === projectMode.MAIN) {
            filterJson.MODE = (isStarMode ? projectMode.STAR_FIRST : projectMode.COMBINE);
            filterJson.IS_MAIN = true;
        } else if (filterJson.MODE === projectMode.STAR_FIRST || filterJson.MODE === projectMode.COMBINE) {
            filterJson.IS_MAIN = true;
        } else {
            filterJson.IS_MAIN = false;
        }

        isBoardType = _IsMini ? false : ("1" === LocalUtil.getLocalValue("ONLY_USER_SETTING", "LIST_VIEW_CD"));
        typeId = (isBoardType ? "Board" : "List");

        ListHelper.initPageData(projectPageData, filterJson.IS_NOT_EMPTY || filterJson.BADGE_UPDATE ? "" : $("#project" + typeId + "Ul"));
        drawProjectItems();
        $("#ListArea").css("display", isBoardType ? "none" : "block");

        if (_IsMini) return;

        $("#BoardArea").css("display", isBoardType ? "block" : "none");
        ProjectSetting.setProjectFilter(isBoardType);

        AlarmUpdate.drawTopNotReadCount(false);
        (filterJson.IS_MAIN) && JoinProject.drawJoinProjectCount();
    }

    function drawProjectItems() {

        if (projectPageData.NEXT_YN === "N") return;

        var projectOrder = LocalUtil.getProjectOrder();
        var isIamManager = LocalUtil.getProjectFilter() === "1";
        var $projectUl = $("#project" + typeId + "Ul");
        var isFirstDraw = projectPageData.PG_NO === 1;  // 프로젝트 상태값 Update 후 Select 로직이 있어서 그려주는 시점이 꼬이는 이슈

        Ajax.executeApi(RenewalApi.GET.ACT_PROJECT_LIST, $.extend({}, projectPageData, getModeByProjectList(filterJson), {
            MNGR_YN: isIamManager ? "Y" : "N",
            SORT_DESC: projectOrder,
            packetOption: isFirstDraw ? Ajax.OPTION.PREVENT_CALLBACK : Ajax.OPTION.ALLOW_EXECUTE,
        }), function (dat) {
            $projectUl.drawListHelper({
                pageData: projectPageData,
                nextYn: dat["NEXT_YN"],
                records: dat["PROJECT_RECORD"],
                noDataHtml: ListHelper.getNoDataHtml(Often.null2Void(filterJson.MODE)),
                targetObj: {
                    scroll: _IsMini ? $('#ListArea') : $("#mainContent"),
                },
                callback: {
                    click: clickProjectItems,
                    dblclick: clickProjectItems,
                    item: function (projectArray) {
                        return getProjectItemsHtml(projectArray, false, filterJson.IS_MAIN)
                    },
                    scroll: drawProjectItems,
                    final: function () {
                        if (!isBoardType && !_IsMini) $projectUl.addClass('section-list-1');
                    }
                }
            })
        })
    }

    function getProjectItemsHtml(projectArray, isJoinProject, isMain) {
        var returnHtml = "";
        var baseHtml = $("#allProject" + (isJoinProject ? "List" : typeId) + "Item").html();
        if (_IsMini) baseHtml = $("#allProjectListItem").html();

        //Note. 참여중 헤더섹션이 존재하는가?
        isAddUnstarDiv = ($("#project" + typeId + "Ul").find(".js-project-section.section-2").length > 0);

        $.each(projectArray, function (i, project) {

            var isBadge = ("0" !== Often.null2Void(project.BADGE_CNT, "0"));
            var isPush = ("Y" === Often.null2Void(project.PUSH_ALAM_YN, "Y"));
            var isOpenProject = ("Y" === Often.null2Void(project.OPEN_YN, "Y"));
            var isRequiredManagerApproval = ("Y" === Often.null2Void(project.JNNG_ATHZ_YN, "N"));
            var isCompany = ("Y" === Often.null2Void(project.CMNM_YN, "N"));
            var isStar = ("Y" === Often.null2Void(project.IMPT_YN, "N"));
            var labelHtml = "";

            //Note. 즐겨찾기 헤더섹션
            if (i === 0 && projectPageData.PG_NO === 1) {
                if (!ViewChanger.isPage("main") && !_IsMini) {
                    labelHtml += '<div class="section-1 js-project-section js-label-section"><p class="project-class"></p></div>';
                } else if (isStar) {
                    var favoriteText = i18next.t('dictionary.favorite');
                    if (_IsMini) {
                        labelHtml += '<ul class="mini-right-section-title js-non-search-item js-label-section">'
                            + ((isMain && isStarMode) ? favoriteText : '') + '</ul>';
                    } else {
                        labelHtml += '<div class="section-1 js-project-section js-label-section"><p class="project-class">'
                            + ((isMain && isStarMode) ? favoriteText : '') + '</p></div>';
                    }
                }
            } else {
                //pass
            }

            //Note. 참여중 헤더섹션
            if (isMain && !(isStarMode && isStar) && !isAddUnstarDiv) {
                isAddUnstarDiv = true;
                var myProjectText = i18next.t("front.main.myProject");
                if (_IsMini) {
                    labelHtml += '<ul class="mini-right-section-title js-non-search-item js-label-section" id="miniUnstarLine">' +
                        myProjectText + '</ul>';
                } else {
                    labelHtml += '<div class="section-2 middle-line js-project-section js-label-section"><p class="project-class join">' +
                        myProjectText + '</p></div>';
                }
            } else {
                //pass
            }

            returnHtml += ListHelper.replaceJson(baseHtml, {
                'label': labelHtml,
                'title': project.TTL,
                'label_srnos': project.COLABO_FLD_SRNOS,
                'project-number1': project.COLABO_SRNO,
                'project-number2': project.COLABO_SRNO,
                'member-count': project.SENDIENCE_CNT,
                'color-code': Often.null2Void(project.BG_COLOR_CD, "0"),
                'badge-count': ListHelper.limitNum2PlusNum(project.BADGE_CNT),
                'badge-display': ListHelper.setDisplay(isBadge, "inline-block"),
                'push-display': ListHelper.setDisplay(!isPush, "inline-block"),
                'restrict-display': ListHelper.setDisplay(!isPush, "inline-block"),
                'open-project-display': ListHelper.setDisplay(isOpenProject, "inline-block"),
                'company-display': ListHelper.setDisplay(isCompany, "inline-block"),
                'manager-display': ListHelper.setDisplay(isRequiredManagerApproval, "inline-block"),
                'star-class': "flow-content-star" + (isStar ? "" : "-un"),
                'star2-class': "flow-content-star-2" + (isStar ? "" : "-un"),
                'mini-star-class': "star-type-1" + (isStar ? "" : "-un"),
            })
        });
        return returnHtml;
    }

    function clickProjectItems(e) {

        var $eTarget = $(e.target);
        var $projectItem = _IsMini ? $eTarget.findUp('.mini-project-item') : $eTarget.findUp('.project-item');
        var isStarButton = _IsMini ? $eTarget.hasClass("mini-project-star") : $eTarget.hasClass("project-star");

        //일렉트론 미니창모드 - 즐겨찾기 버튼이 아닌 다른 리스트를 한번 클릭했을때는 클래스만 추가후 Return.
        if (Electron.isElectronApp() && _IsMini && e.type === 'click' && !isStarButton) {
            $('.mini-project-item').removeClass('on');
            $(e.target).addClass('on');
            return;
        }

        if (ProjectSetting.isTotalProjectEditMode()) {
            ProjectSetting.selectEditProject($projectItem);
            return;
        }

        if (isStarButton) {
            var $projectItem = _IsMini ? $eTarget.parents(".mini-project-item") : $eTarget.parents(".project-item")
            var isUnStar = _IsMini ? $eTarget.hasClass("star-type-1-un") :
                ($eTarget.hasClass("flow-content-star-2-un") || $eTarget.hasClass("flow-content-star-un"))
            var projectSrno = Often.null2Void($projectItem.attr('project-srno'), "");
            ProjectSetting.setProjectStar(projectSrno, !isUnStar, changeStarList)
            return;
        }

        if ($projectItem.length > 0) {
            var projectSrno = $projectItem.attr('project-srno');
            var projectLabelSrnos = Often.null2Void($projectItem.attr('label-srnos'), "");
            var $projectItem = $("#project-" + projectSrno);
            var title = $projectItem.find(".project-ttl").text();
            var colorCode = $projectItem.find(".color-code").attr("data-color");
            var statYn = ($projectItem.find(".project-star").hasClass("flow-content-star-2") ? "Y" : "N");
            var participantCount = $projectItem.find(".member-cnt").text();
            LocalUtil.setLocalValue("CURRENT_PROJECT_SETTING", "TTL", title);
            LocalUtil.setLocalValue("CURRENT_PROJECT_SETTING", "BG_COLOR_CD", colorCode);
            LocalUtil.setLocalValue("CURRENT_PROJECT_SETTING", "IMPT_YN", statYn);
            LocalUtil.setLocalValue("CURRENT_PROJECT_SETTING", "SENDIENCE_CNT", participantCount);
            LocalUtil.setLocalValue("CURRENT_PROJECT_SETTING", "LABEL_SRNOS", projectLabelSrnos);

            if (Electron.isElectronApp() && _IsMini) return MiniProject.openProjectPage(projectSrno);
            ViewChanger.loadPageJson({code: "detail", first: projectSrno});
        } else {
            //pass
        }
    }

    function changeStarList(projectSrno) {

        var $searchProjectListUl = $('#searchProjectListUl');
        var $projectLi = $('#' + typeId + 'Area').find('#project-' + projectSrno);
        var $projectStarIcon = _IsMini ? $projectLi.find('.mini-project-star') : $projectLi.find('.project-star');
        var unStarClassNm = _IsMini ? "star-type-1-un" : (isBoardType ? "flow-content-star-un" : "flow-content-star-2-un");
        var starClassNm = _IsMini ? "star-type-1" : "flow-content-star-2";
        var isDisableStar = $projectStarIcon.hasClass(unStarClassNm);
        var removeStarClass = isDisableStar ? unStarClassNm : starClassNm;
        var addStarClass = isDisableStar ? starClassNm : unStarClassNm;

        filterJson.IS_NOT_EMPTY = true;
        showList();

        if ($searchProjectListUl.is(':visible')) {
            $searchProjectListUl.find('#project-' + projectSrno + ' .mini-project-star')
                .removeClass(removeStarClass).addClass(addStarClass);
        } else {
            //pass
        }
    }

    function getModeByProjectList(filterJson) {
        if (!filterJson) return {COLABO_FLD_KIND: "1", COLABO_FLD_SRNO: "9", MODE:"ALL"};
        switch (filterJson.MODE) {
            case projectMode.STAR_FIRST :
                return {COLABO_FLD_KIND: "1", COLABO_FLD_SRNO: "9", MODE:"ALL"};
            case projectMode.COMBINE :
                return {COLABO_FLD_KIND: "1", COLABO_FLD_SRNO: "10", MODE:"COMBINE"};
            case projectMode.LABEL :
                return {COLABO_FLD_KIND: "3", COLABO_FLD_SRNO: filterJson.LABEL_SRNO, MODE:"LABEL"};
            case projectMode.NOKEEP :
                return {COLABO_FLD_KIND: "1", COLABO_FLD_SRNO: "2", MODE:"NOKEEP"};
            case projectMode.STAR :
                return {COLABO_FLD_KIND: "1", COLABO_FLD_SRNO: "3", MODE:"STAR"};
            case projectMode.HIDDEN :
                return {COLABO_FLD_KIND: "1", COLABO_FLD_SRNO: "4", MODE:"HIDDEN"};
            case projectMode.UNREAD :
                return {COLABO_FLD_KIND: "1", COLABO_FLD_SRNO: "5", MODE:"UNREAD"};
            default :
                return {COLABO_FLD_KIND: "1", COLABO_FLD_SRNO: "9", MODE:"ALL"};
        }
    }


})();
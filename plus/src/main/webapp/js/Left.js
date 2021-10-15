var Left = (function () {

    var isClicking = false;
    var clickTimer;

    return {
        initView: initView,
        addClickEvent: addClickEvent,
        closeProjectMorePopup: closeProjectMorePopup,
        controlProjectMore: controlProjectMore,
    }

    function initView() {
        var $leftArea = $("#leftArea");
        $leftArea.find("#leftMenuGantt").css("display", Often.isFunc(Func.CLOUD.GANTT) ? "block" : "none");
        $leftArea.find("#RecentProjectButton").parent("li").css("display", Often.isFunc(Func.CLOUD.BLOCK_WEB_LNB_PROJ_LIST) ? "none" : "block");

        if (Often.isFunc(Func.CLOUD.BLOCK_WEB_LNB_EXCEPT_BOOKMARK)) {
            ["task", "gantt", "schd", "file", "mention", "mypost"].forEach(function (v) {
                $leftArea.find(".left-menu-item[data-code=" + v + "]").css("display", "none");
            })
        }
    }

    function addClickEvent() {
        var $leftArea = $("#leftArea");
        $leftArea.off("click").on("click", clickLeftAreaWithThrottling);
        $leftArea.find("#leftFilterBtn").off("click").on("click", LeftFilter.toggleLeftFilter);
        var timer = setTimeout(function () {
            if (LocalUtil.getLeftFoldCollectYn() === "N") {
                $leftArea.find(".left-menu-item[data-code=collect-more]").trigger("click");
            }
            if (LocalUtil.getLeftFoldRecentYn() === "Y") {
                $leftArea.find("#RecentProjectButton").trigger("click");
            }
            if (LocalUtil.getLeftFoldLabelYn() === "Y") {
                $("#allLabelLeftButton").addClass("active");
                $("#allLabelUl").css("display", "block");
            }
            clearTimeout(timer);
        }, 500);
        $("#leftScroll").off("scroll").on("scroll", AllLabel.clearLayer);
    }

    function clickLeftArea(e) {

        e.preventDefault();
        hideProjectSettingMenu(e)

        var $eTarget = $(e.target);
        var $logo = $eTarget.findUp(".js-logo");
        var $projectMakeButton = $eTarget.findUp('#projectMakeButton');
        var isClickMoreLayerLi = $eTarget.findUp(".js-project-more-layer").length !== 0 && $eTarget.is("li");
        var $leftMenuItem = isClickMoreLayerLi ? $eTarget.find(".left-menu-item") : $eTarget.findUp('.left-menu-item');
        var isIamAdminUser = "Y" === LocalUtil.getBuyManger();
        var isSerp = (LocalUtil.getSerpYn() === "Y");
        var isGuest = "F" === LocalUtil.getLocalValue("ONLY_BUY_SETTING", "STTS");

        if ($logo.length > 0) {
            ViewChanger.loadPageJson({code: 'main'});
            RecentProject.reloadRecentProject();
            return;
        }

        if ($projectMakeButton.length > 0) return ProjectMake.openPopup(e);
        if ($leftMenuItem.length > 0) {
            var leftCode = $leftMenuItem.attr('data-code');
            switch (leftCode) {
                case "main" :
                    ViewChanger.loadPageJson({code: leftCode});
                    RecentProject.reloadRecentProject();
                    break;
                case "open" :
                    ViewChanger.loadPageJson({code: leftCode});
                    break;
                case "task" :
                case "schd" :
                case "file" :
                    if (LimitGuest.isLimitGuest("collect")) return;
                    ViewChanger.loadPageJson({code: leftCode});
                    break;
                case "bookmark" :
                case "mention" :
                case "mypost" :
                    ViewChanger.loadPageJson({code: leftCode});
                    break;
                case "hidden" :
                case "nokeep" :
                case "unread" :
                case "star" :
                    Often.setCookie("LEFT_PROJECT_MORE", leftCode);
                    controlProjectMore();
                    closeProjectMorePopup();
                    ViewChanger.loadPageJson({code: leftCode});
                    break;
                case "collect-more" :
                    $leftMenuItem.toggleClass("active");
                    $leftMenuItem.siblings('.menu-accordion').slideToggle();
                    LocalUtil.setLocalValue("ONLY_LEFT_FOLD_SETTING", "COLLECT", $leftMenuItem.hasClass("active") ? "Y" : "N");
                    break;
                case "recent-project-more" :
                    RecentProject.clickRecentProjectLeftButton(e);
                    break;
                case "label-more" :
                    AllLabel.clickAllLabelLeftButton(e);
                    break;
                case "project-more" :
                    controlProjectMore();
                    $leftMenuItem.find(".js-project-more-layer").toggleClass("d-none");
                    break;
                case "gantt" :
                    OpenUtil.openGanttChart();
                    break;
                case "invite-member" :
                    InviteEmployee.toggleInviteEmployeeLayer();
                    break;
                case "manager-admin" :
                    Often.setCookie("BASE_PAGE", "main.act");
                    Often.submitForm(leftCode, "/flow_admin.act", leftCode);
                    break;
                case "service-upgrade" :

                    //todo - serp 일 경우에는 제한팝업이 뜨고, 회사관리자문의하기가 존재해야하기에 아래 부분추가
                    if( isSerp ) {
                        if(isIamAdminUser) {
                            Payment.openPaymentLayer("business");
                        }else{
                            Often.toast("info", i18next.t('front.alert.askAdmin'));
                        }
                    }else {
                        if (isIamAdminUser || isGuest) {
                            PostPopup.checkWritingAndShowPopup(Upgrade.showUpgradeLayer);
                        } else {
                            Often.toast("info", i18next.t('front.alert.askAdmin'));
                        }
                    }
                    break;
                default :
                    break;
            }
        }
    }

    function clickLeftAreaWithThrottling(e) {
        if (isClicking) return;
        clickLeftArea(e);
        isClicking = true;
        clickTimer = setTimeout(function () {
            isClicking = false;
            clearTimeout(clickTimer);
        }, 500);
    }

    function controlProjectMore() {
        var targetLeftCode = Often.null2Void(Often.getCookie("LEFT_PROJECT_MORE"));
        if (targetLeftCode === "") return;
        var $leftArea = $("#leftArea");
        $leftArea.find("li.left-menu-item[data-code=nokeep]").add("li.left-menu-item[data-code=unread]")
            .add("li.left-menu-item[data-code=star]").add("li.left-menu-item[data-code=hidden]").css("display", "none");
        $leftArea.find("li.left-menu-item[data-code=" + targetLeftCode + "]").css("display", "block");
        $leftArea.find("button.left-menu-item").parent().css("display", "block");
        $leftArea.find("button.left-menu-item[data-code=" + targetLeftCode + "]").parent().css("display", "none");
    }

    function closeProjectMorePopup() {
        $("#leftArea").find(".js-project-more-layer").addClass("d-none");
    }

    function hideProjectSettingMenu(e) {
        var $eTarget = $(e.target);
        if ($eTarget.findUp(".left-menu-item").length === 0 &&
            $eTarget.findUp(".recent-project-item").length === 0 &&
            $eTarget.findUp(".label-item").length === 0) return;
        ($("#totalProjectEditBar").is(":visible")) && ProjectSetting.closeTotalProjectEditBar();
    }

})()
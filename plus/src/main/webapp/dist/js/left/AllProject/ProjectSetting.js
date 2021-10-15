var ProjectSetting = (function () {

    return {
        setProjectStar: setProjectStar,
        setProjectFilter: setProjectFilter,
        isTotalProjectEditMode: isTotalProjectEditMode,
        selectEditProject: selectEditProject,
        editProjectColors: editProjectColors,
        clearOrderPopup: clearOrderPopup,
        closeTotalProjectEditBar: closeTotalProjectEditBar,
    }

    function setProjectStar(projectSrno, isStarBeforeSet, callback) {
        Ajax.executeApi(RestApi.PUT.COLABO2_U001, {
            COLABO_SRNO: projectSrno,
            IMPT_YN: (isStarBeforeSet ? "N" : "Y")
        }, function () {
            Often.toast('success', i18next.t('front.alert.successfullyChange', {status: '$t(dictionary.apply)'}));
            (typeof callback === "function") && callback(projectSrno);
        });
    }

    function setProjectFilter(isBoardType) {
        initTypeButton(isBoardType);
        var $projectHomeTop = $("#projectHomeTop");
        $projectHomeTop.find(".type-button").off("click").on("click", clickTypeButton);
        $projectHomeTop.find("#projectOrderButton").off("click").on("click", clickOrderButton);
        $projectHomeTop.find("#totalProjectEditButton").off("click").on("click", clickTotalProjectEdit);
    }

    function isTotalProjectEditMode() {
        return $("#totalProjectEditBar").is(":visible");
    }

    function clickTotalProjectEdit() {
        $("#totalProjectEditButton").addClass('active');
        if (isTotalProjectEditMode()) return closeTotalProjectEditBar();
        drawTotalProjectEditBar();
    }

    function closeTotalProjectEditBar() {

        controlEditCheck(false);
        $("#totalProjectEditButton").removeClass('active');
        $("#projectBoardUl").find(".active").removeClass("active");
        $("#topSettingBar").css('display', 'block');
        $("#totalProjectEditBar").css('display', 'none');
        if (!ViewChanger.isPage("main")) return;
        var isExistCount = (Often.null2Void($("#joinProjectLayer").find(".badge-count").text(), "0") !== "0");
        JoinProject.showJoinProjectBar(isExistCount)
    }

    function drawTotalProjectEditBar() {
        selectProjHiddenButton();
        controlEditCheck(true);
        $("#joinArea").css('display', 'none');
        $("#totalProjectEditBar").fadeIn(200);
        $("#totalEditButton").off("click").on("click", clickTotalEditButton);
        $("#editBarCloseButton").off("click").on("click", closeTotalProjectEditBar);
        $("#totalEditSelect").find(".select-clear").off('click').on('click', unselectAllProject);
        $("#totalEditSelect").find(".select-count").text(i18next.t('front.projectTop.selectProject', {count: 0}))
    }

    function selectProjHiddenButton() {
        var isHidePage = ViewChanger.getCurrentPageId() === "hidden";
        if (isHidePage) {
            $(".js-hidden").css("display", "none")
            $(".js-cancel-hidden").css("display", "inline-block");
        } else {
            $(".js-hidden").css("display", "inline-block");
            $(".js-cancel-hidden").css("display", "none");
        }
    }

    function controlEditCheck(isShow) {
        $("#projectHomeLayer").find(".project-item").find(".edit-check").css('display', (isShow ? 'block' : 'none'));
        !isShow && unselectAllProject();
    }

    function selectEditProject($projectItem) {
        var $totalEditSelect = $("#totalEditSelect");
        $projectItem.toggleClass('active');
        $projectItem.find(".edit-check").toggleClass("flow-content-chk").toggleClass("flow-content-chk-1");
        var selectCount = $(".flow-content-chk-1").length;
        $totalEditSelect.find(".select-count").text(i18next.t('front.projectTop.selectProject', {count: selectCount}))
    }

    function unselectAllProject() {
        $("#totalEditSelect").find(".select-count").text(i18next.t('front.projectTop.selectProject', {count: 0}));
        $("#projectBoardUl").find(".active").removeClass("active");
        $("#projectListUl").find(".active").removeClass("active");
        $(".flow-content-chk-1").toggleClass("flow-content-chk").toggleClass("flow-content-chk-1");
    }

    function clickTotalEditButton(e) {
        var $eTarget = $(e.target);
        var $editLi = $eTarget.findUp(".edit-button");
        if ($editLi.length === 0) return;
        var $mainContent = $("#mainContent");
        var isCheckedProject = $mainContent.find(".project-item.active:visible").length > 0;
        if (!isCheckedProject) return Often.toast("error", "프로젝트를 선택하세요");
        if ($editLi.hasClass('color')) return PopupDraw.drawColorSetting({callback: {submit: submitColorSetting}});
        if ($editLi.hasClass('label')) return PopupDraw.drawLabelSetting({callback: {submit: submitLabelSetting}});
        if ($editLi.hasClass('push')) return PopupDraw.drawPushAlarmSetting({callback: {submit: submitPushAlarmSetting}});
        if ($editLi.hasClass('hidden')) return updateProjectHideSetting();

        function submitColorSetting($popupObj) {
            var colorCode = Often.null2Void($popupObj.find(".project-color-check-active-1").attr('color-code'), '0');
            editProjectColors(colorCode, PopupDraw.closePopup)
        }

        function submitLabelSetting($popupObj) {
            editProjectLabels($popupObj, PopupDraw.closePopup);
        }

        function submitPushAlarmSetting($popupObj) {
            editProjectPushAlarm($popupObj, PopupDraw.closePopup);
        }
    }

    function initTypeButton(isBoardType) {
        $("#" + (isBoardType ? "Board" : "List") + "TypeButton").addClass("on");
    }

    function clickOrderButton() {
        var $projectOrderButton = $("#projectOrderButton");
        var $projectOrderList = $("#projectOrderList");

        $projectOrderButton.toggleClass('active');
        if ($projectOrderList.is(":visible")) {
            clearOrderPopup()
            return;
        }

        var projectOrder = LocalUtil.getProjectOrder();
        var projectFilter = LocalUtil.getProjectFilter();
        $projectOrderList.find("li.order-item, li.filter-item").removeClass('on')
        $projectOrderList.find("li.order-item[code=" + projectOrder + "]").addClass('on')
        $projectOrderList.find("li.filter-item[code=" + projectFilter + "]").addClass('on')
        $projectOrderList.fadeIn(200);
        $projectOrderList.off("click").on("click", clickOrderItems);
    }

    function clearOrderPopup() {
        $("#projectOrderList").fadeOut(200);
        $("#projectOrderButton").removeClass("active");
    }

    function clickOrderItems(e) {

        var $eTarget = $(e.target);
        var $orderItem = ($eTarget.is("order-item") ? $eTarget : $eTarget.parents(".order-item"));
        var $filterItem = ($eTarget.is("filter-item") ? $eTarget : $eTarget.parents(".filter-item"))

        var isChange = false;
        if ($orderItem.length > 0) {
            isChange = true;
            LocalUtil.setLocal("ONLY_PROJECT_ORDER", $orderItem.attr('code'));
        } else if ($filterItem.length > 0) {
            isChange = true;
            LocalUtil.setLocal("ONLY_PROJECT_FILTER", $filterItem.attr('code'));
        } else {
            //pass
        }

        isChange && AllProject.showList();
    }

    function clickTypeButton(e) {
        var isBoardType = ("BoardTypeButton" === $(e.target).attr('id'));
        var listViewCd = (isBoardType ? "1" : "0");
        Ajax.executeApi(RestApi.PUT.COLABO2_SET_U101, {LIST_VIEW_CD: listViewCd}, function () {
            $("#" + (!isBoardType ? "Board" : "List") + "TypeButton").removeClass("on");
            LocalUtil.setLocalValue("ONLY_USER_SETTING", "LIST_VIEW_CD", listViewCd);
            AllProject.showList();
        })
    }

    function editProjectColors(colorCode, callback) {

        var $projectHomeLayer = $("#projectHomeLayer");
        var isTotalProjectMode = ($projectHomeLayer.is(":visible"));
        var selectProjects = [];

        (typeof callback === "function") && callback()

        if (isTotalProjectMode) {
            $.each($projectHomeLayer.find(".flow-content-chk-1"), function (index, obj) {
                selectProjects.push({
                    'COLABO_SRNO': $(obj).parents(".project-item").attr('project-srno')
                })
            });
            updateProjectColor(selectProjects, colorCode);
        } else {
            updateProjectColor('', colorCode);
        }
    }

    function updateProjectColor(selectProjects, colorCode) {
        var areaType = $("#BoardArea").is(":visible") ? "Board" : "List";
        Ajax.executeApi(RenewalApi.PUT.COLABO2_BG_COLOR_U002, {
            COLABO_SRNO_REC: selectProjects,
            BG_COLOR_CD: colorCode,
        }, function () {
            selectProjects.forEach(function (obj) {
                var $colorCode = $("#" + areaType + "Area").find("#project-" + obj.COLABO_SRNO).find(".color-code")
                ListHelper.removeAllColorClass($colorCode);
                $colorCode.addClass("color-code-" + colorCode);
            })
            Often.toast("success", i18next.t('front.alert.successfullyApplied'));
        });
    }

    function editProjectLabels(popupObj, callback) {
        var selectedPopupLabel = popupObj.find(".flow-content-check-type-2").parents(".label-item");
        var selectedProjects = $("#projectHomeLayer").find(".flow-content-chk-1").findUp(".project-item");
        updateProjectLabels(selectedPopupLabel, selectedProjects);
        (typeof callback === "function") && callback()
    }


    function updateProjectLabels(selectedPopupLabel, selectedProjects) {
        var labelData = getLabelData(selectedPopupLabel, selectedProjects);
        var labelSrnos = labelData.labelSrno.slice(0, -1);

        Ajax.executeApi(RenewalApi.POST.COLABO2_C104, {
            COLABO_FLD_REC: labelData.colaboFldRec,
            COLABO_SRNO_REC: getSelectedProjRec(selectedProjects),
        }, function () {
            $.each(selectedProjects, function (i, v) {
                $(v).attr('label-srnos', labelSrnos);
            })
            Often.toast("success", i18next.t('front.alert.successfullyChange', {status: '$t(dictionary.apply)'}));
        })
    }

    function getLabelData(popupLabelItems, selectedProjects) {
        var selectedLabelPage = $("#allLabelLeftButton").attr("data-select-label-srno");
        var isLabelPage = selectedLabelPage.length > 0;
        var colaboFldRec = [];
        var labelSrno = "";
        var isMaintainProj = false;
        $.each(popupLabelItems, function (i, item) {
            var fldSrno = $(item).attr("data-label-srno");
            if (isLabelPage && (fldSrno === selectedLabelPage)) isMaintainProj = true;
            colaboFldRec.push({
                COLABO_FLD_KIND: $(item).attr("data-label-kind"),
                COLABO_FLD_SRNO: fldSrno,
                ICO_CODE: $(item).attr("data-label-ico")
            })
            labelSrno += colaboFldRec[i].COLABO_FLD_SRNO + ",";
        });
        if (isLabelPage && !isMaintainProj) deleteProjectUi(selectedProjects);
        return {colaboFldRec: colaboFldRec, labelSrno: labelSrno};
    }

    function deleteProjectUi(selectedProjects) {
        $.each(selectedProjects, function (i, v) {
            v.remove();
        })
    }

    function getSelectedProjRec(selectedProjects) {
        var returnRec = [];
        $.each(selectedProjects, function (i, v) {
            returnRec.push({
                'COLABO_SRNO': $(v).attr('project-srno')
            })
        })
        return returnRec;
    }

    function editProjectPushAlarm($pushAlarmContent) {
        var selectProjects = [];
        $.each($("#projectHomeLayer").find(".flow-content-chk-1").findUp(".project-item"), function (i, project) {
            selectProjects.push({COLABO_SRNO: $(project).attr("project-srno")})
        })
        updateProjectPushAlarm($pushAlarmContent, selectProjects);
    }

    function updateProjectPushAlarm($pushAlarmContent, selectProjects) {
        var pushAlamYn = $pushAlarmContent.find(".alarm-popup-set").attr("data-push-alarm");
        var pushCommtAlamYn = $pushAlarmContent.find(".js-push-commt").attr("data-push");
        var pushRemarkAlamYn = $pushAlarmContent.find(".js-push-remark").attr("data-push");
        var alamList = $pushAlarmContent.find(".alarm").attr("data-alarm-list");
        var $selectProjectArea = $(($("#BoardArea").is(":visible") ? "#Board" : "#List") + "Area");
        if (pushAlamYn === "" || (pushAlamYn === "Y" && pushCommtAlamYn === "") ||
            (pushAlamYn === "Y" && pushRemarkAlamYn === "") || alamList === "") {
            Often.toast("error", i18next.t('front.alert.alarmNotificationSetting'));
            return;
        }
        var apiJson = {
            PUSH_ALAM_YN: pushAlamYn,
            PUSH_COMMT_ALAM_YN: pushCommtAlamYn,
            PUSH_REMARK_ALAM_YN: pushRemarkAlamYn,
            ALAM_LIST: alamList,
            COLABO_SRNO_REC: selectProjects,
        }
        Ajax.executeApi(RenewalApi.PUT.COLABO2_NOTI_U102, apiJson, function () {
            selectProjects.forEach(function (v) {
                var $alarmIcon = $selectProjectArea.find("#project-" + v.COLABO_SRNO).find(".flow-content-bl-ico");
                pushAlamYn === "Y" ? $alarmIcon.attr("style", "display:none") : $alarmIcon.attr("style", "display:inline-block");
            })
            Often.toast("success", i18next.t('front.alert.successfullyApplied'));
            DetailHeader.setProjectIcon(apiJson);
            PopupDraw.closePopup();
        })
    }

    function updateProjectHideSetting() {
        var textJson = {
            CONFIRM: {
                Y: i18next.t('front.alert.projectHide'),
                N: i18next.t('front.alert.projectUnHide'),
            }
        }

        var isNotHidePage = ViewChanger.getCurrentPageId() !== "hidden";
        var hiddenYn = isNotHidePage ? "Y" : "N";
        var contents = textJson.CONFIRM[hiddenYn];

        PopupDraw.drawConfirm({
            contents: {main: contents},
            callback: {submit: submitUpdateProjectHideSetting}
        });

        function submitUpdateProjectHideSetting() {
            var $projectHomeLayer = $("#projectHomeLayer");
            var selectProjectsList = $projectHomeLayer.find(".flow-content-chk-1").findUp(".project-item");
            $.each(selectProjectsList, function (i, project) {
                var projectSrno = $(project).attr("project-srno");
                Ajax.executeApi(RestApi.POST.COLABO2_C105, {
                    COLABO_SRNO: projectSrno,
                    HIDDEN_YN: hiddenYn,
                    packetOption: Ajax.OPTION.ALLOW_EXECUTE, //다건 처리 이슈로 중복 실행 허용
                }, function () {
                    closeTotalProjectEditBar();
                    $(project).remove();
                    PopupDraw.closePopup();
                    Often.toast("success", i18next.t('front.alert.successfullyChange', {status: '$t(dictionary.apply)'}))
                    if ($projectHomeLayer.find(".project-item:visible").length > 0) return;
                    var isBoardType = _IsMini ? false : ("1" === LocalUtil.getLocalValue("ONLY_USER_SETTING", "LIST_VIEW_CD"));
                    var typeId = (isBoardType ? "Board" : "List");
                    var $projectUl = $projectHomeLayer.find("#project" + typeId + "Ul");
                    $projectUl.empty().append(ListHelper.getNoDataHtml());
                });
            })
        }
    }
})()
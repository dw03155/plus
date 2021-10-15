var ProjectMake = (function () {

    var $projectMakeLayer, projectMakeData, preMakeData;
    var isCreate;

    return {
        openPopup: openPopup,
        closePopup: closePopup,
        getProjectMakeData: getProjectMakeData,
        setProjectMakeData: setProjectMakeData,
        checkWritingMakePopup: checkWritingMakePopup,
    }

    function openPopup(e) {
        isCreate = $(e.target).findUp("#projectMakeButton").length > 0;

        var isProjectMakeLimit = "Y" === LocalUtil.getBuyPrjMkLmtYn();
        if (isProjectMakeLimit && isCreate && LimitGuest.isLimitGuest("project", false)) return;

        $projectMakeLayer = $("#projectMakeLayer");
        $("#projectMakePopupTitle").html(i18next.t(isCreate ?'front.common.createProject' : 'front.projectTop.editProject'));
        initView(isCreate);
        switchMain();
        $projectMakeLayer.fadeIn(200, function () {
            $projectMakeLayer.find("input").focus();
        });
        addClickEvent();
        addKeyEvent();
    }

    function initView(isCreate) {

        if (isCreate) {
            initData();
        }

        $("#projectTitleInput").val(projectMakeData["TITLE"]);
        $("#projectContentsInput").val(projectMakeData["CONTENTS"]);

        var $openCheckArea = $projectMakeLayer.find(".open-yn").find(".check-area");
        var $permitCheckArea = $projectMakeLayer.find(".manager-permit-yn").find(".check-area");

        initToggle();
        $projectMakeLayer.find(".project-submit").addClass("un-value").text(i18next.t(isCreate ? 'dictionary.create' : 'dictionary.edit'));

        if ('N' === projectMakeData["OPEN_YN"]) {
            $openCheckArea.removeClass("active");
            $projectMakeLayer.find(".open-category-setting").addClass('d-none');
            $projectMakeLayer.find("#categoryName").text(i18next.t('dictionary.select')).removeClass('selected');
        } else {
            $openCheckArea.addClass("active")
            $projectMakeLayer.find(".open-category-setting").removeClass('d-none');
            var categoryName = LocalUtil.getLocalValue("CURRENT_PROJECT_SETTING", "CNTS_CATG_NM");
            var categorySrno = LocalUtil.getLocalValue("CURRENT_PROJECT_SETTING", "CNTS_CATG_SRNO");
            $projectMakeLayer.find('.category-option-active-1').attr("data-srno", categorySrno);
            $projectMakeLayer.find("#categoryName").text(categoryName).addClass('selected');
        }

        if ('N' === projectMakeData["MANAGER_PERMIT_YN"]) {
            $permitCheckArea.removeClass("active");
        } else {
            $permitCheckArea.addClass("active");
        }
    }

    function initToggle() {
        $projectMakeLayer.find(".js-project-toggle, .js-project-open-toggle").removeClass('active');
    }

    function initData() {
        projectMakeData = {
            TITLE: '',
            CONTENTS: '',
            OPEN_YN: 'N',
            CATEGORY_SRNO: '',
            CATEGORY_NM: '',
            MANAGER_PERMIT_YN: 'N',
            MANAGER_WRITE_YN: 'N',
            MANAGER_WRITE_REMARK_YN: 'N',
            MANAGER_LOOKUP_YN: 'N',
            MANAGER_DOWNLOAD_YN: 'N',
        }

        preMakeData = $.extend({}, projectMakeData);
    }

    function addClickEvent() {
        $projectMakeLayer.off('click').on('click', clickProjectMakeLayer);
        $projectMakeLayer.find(".check-area").off('click').on('click', changeCheckStatus);
        $projectMakeLayer.find(".open-category-setting").off('click').on('click', switchOpenCategory);
        $projectMakeLayer.find(".main-return-event").off('click').on('click', switchMain);
        $projectMakeLayer.find(".more-option-button").off('click').on('click', switchMoreOption);
        $projectMakeLayer.find(".project-submit").off('click').on('click', submitProject);
        $projectMakeLayer.find(".js-service-helper").on('click', openZendeskForMakeProject);
    }

    function openZendeskForMakeProject(e) {
        var $eTarget = $(e.currentTarget);
        var isCreateProjectZenDesk = $eTarget.attr('service-code') === "CREATE";
        var serviceUrl = (isCreateProjectZenDesk ? FlowServiceHelper.CREATE_PROJECT : FlowServiceHelper.CREATE_PROJECT_OPTION);
        window.open(serviceUrl, "_blank");
    }

    function clickProjectMakeLayer(e) {

        var $eTarget = $(e.target);
        var isBackArea = $eTarget.hasClass("back-area")
        var isCloseButton = $eTarget.findUp(".close-event").length > 0;

        if (isBackArea || isCloseButton) {
            checkWritingMakePopup(closePopup)
        }

    }

    function addKeyEvent() {
        $projectMakeLayer.find("#projectTitleInput").off("keyup").on("keyup", submitBtnChange);
    }

    function submitBtnChange() {
        var $projectMakeSubmit = $projectMakeLayer.find(".project-submit");
        var projectTitleVal = $.trim($(this).val());
        if (projectTitleVal.length >= 50) {
            Often.toast("error", i18next.t('front.alert.inputLimit', {subject: '$t(dictionary.title)', length: 50}), 2500);
            return false;
        }
        projectTitleVal.length !== 0 ? $projectMakeSubmit.removeClass("un-value") : $projectMakeSubmit.addClass("un-value");
    }

    function getProjectMakeData() {
        return projectMakeData;
    }

    function setProjectMakeData(prjMakeData) {
        projectMakeData = prjMakeData;
        preMakeData = $.extend({}, projectMakeData);
    }

    function closePopup() {
        $projectMakeLayer.fadeOut(200)
    }

    function switchPage(pageId) {

        if (pageId === 'main') {
            $projectMakeLayer.find(".input-main-layer").removeClass("d-none").addClass("d-block");
            $projectMakeLayer.find(".open-category-layer").removeClass("d-block").addClass("d-none");
            $projectMakeLayer.find(".more-option-layer").removeClass("d-block").addClass("d-none");
            $projectMakeLayer.find("input").focus();
        } else if (pageId === 'open-category') {
            $projectMakeLayer.find(".input-main-layer").removeClass("d-block").addClass("d-none");
            $projectMakeLayer.find(".open-category-layer").removeClass("d-none").addClass("d-block");
            $projectMakeLayer.find(".more-option-layer").removeClass("d-block").addClass("d-none");
            $projectMakeLayer.find("a").focus();
        } else if (pageId === 'more-option') {
            $projectMakeLayer.find(".input-main-layer").removeClass("d-block").addClass("d-none");
            $projectMakeLayer.find(".open-category-layer").removeClass("d-block").addClass("d-none");
            $projectMakeLayer.find(".more-option-layer").removeClass("d-none").addClass("d-block");
            if (!isCreate) {
                $projectMakeLayer.find(".more-option-layer").find(".lookup-option .check-area").addClass("disabled");
            } else {
                $projectMakeLayer.find(".more-option-layer").find(".lookup-option .check-area").removeClass("disabled");
            }
            $projectMakeLayer.find(".more-option-layer").find(".lookup-option .checked").removeClass("disabled");
            $projectMakeLayer.find(".more-option-layer").find(".scroll-mask").scrollTop(0);
            $projectMakeLayer.find("a").focus();
        } else {
            //pass
        }
    }

    function switchMain() {
        switchPage('main')
    }

    function switchOpenCategory() {
        OpenProject.getOpenCategory(clearOpenCategory, drawOpenCategory);
        $projectMakeLayer.find(".open-category-submit").off('click').on('click', submitOpenCategory);
        switchPage('open-category');

        function clearOpenCategory() {
            $projectMakeLayer.find(".open-category-ul").empty()
        }

        function drawOpenCategory(categoryArray) {
            var allCategoryHtml = "";
            $.each(categoryArray, function (i, category) {
                var categorySrno = category.CNTS_CATG_SRNO;
                var categoryName = category.CNTS_CATG_NM;
                var isChecked = (categorySrno === projectMakeData["CATEGORY_SRNO"])
                var tempHtml = '<li id="category-' + categorySrno + '" class="category-item' +
                    (isChecked ? ' category-option-active-1' : '') + '"  data-srno="' + categorySrno + '">' +
                    '<a href="#"><em></em><span id="categoryName">' + categoryName + '</span></a></li>';
                allCategoryHtml += tempHtml;
            });
            $projectMakeLayer.find(".open-category-ul").append(allCategoryHtml)
                .off('click').on('click', clickCategoryItems);
        }

        function clickCategoryItems(e) {
            var $eTarget = $(e.target);
            var $categoryItem = $eTarget.findUp(".category-item");
            if ($categoryItem.length === 0) return;
            $projectMakeLayer.find('.category-item').attr('class', '').addClass('category-item');
            $categoryItem.toggleClass('category-option-active-1');
        }

        function submitOpenCategory() {
            var $selectCategory = $projectMakeLayer.find('.category-option-active-1');
            var categorySrno = $selectCategory.attr('data-srno');
            var categoryNm = $selectCategory.find("#categoryName").text();
            projectMakeData["CATEGORY_SRNO"] = categorySrno;
            projectMakeData["CATEGORY_NM"] = categoryNm;
            $projectMakeLayer.find('#categoryName').text($selectCategory.text()).addClass('selected');
            switchMain();
        }
    }

    function switchMoreOption() {

        var isWriteAuthFuncIdActivated = Often.isFunc(Func.CLOUD.WRITE_AUTHORITY_SEPARATE);

        $projectMakeLayer.find(".more-option-layer").find(".check-area")
            .removeClass("checked")
            .off('click').on('click', changeCheckStatus);
        $projectMakeLayer.find(".more-option-submit").off('click').on('click', submitMoreOption);
        if (!isWriteAuthFuncIdActivated) writeAuthCheck();
        setMoreOptionCheck();
        switchPage('more-option');

        function writeAuthCheck() {
            $projectMakeLayer.find('.write-option dt').text(i18next.t('front.common.writePermission'));
            $projectMakeLayer.find('.remark-write-option').addClass('d-none');
        }

        function setMoreOptionCheck() {
            var managerWriteYn = Often.null2Void(projectMakeData["MANAGER_WRITE_YN"], "N");
            var managerRemarkWriteYn = Often.null2Void(projectMakeData["MANAGER_WRITE_REMARK_YN"], "N");
            var managerLookupYn = Often.null2Void(projectMakeData["MANAGER_LOOKUP_YN"], "N");
            var managerDownloadYn = Often.null2Void(projectMakeData["MANAGER_DOWNLOAD_YN"], "N");
            $projectMakeLayer.find("[data-manager-write-yn=" + managerWriteYn + "]").addClass("checked");
            $projectMakeLayer.find("[data-manager-remark-write-yn=" + managerRemarkWriteYn + "]").addClass("checked");
            $projectMakeLayer.find("[data-manager-lookup-yn=" + managerLookupYn + "]").addClass("checked");
            $projectMakeLayer.find("[data-manager-download-yn=" + managerDownloadYn + "]").addClass("checked");
        }

        function submitMoreOption() {
            var managerWriteYn = $projectMakeLayer.find(".write-option").find(".checked").attr('data-manager-write-yn');
            var managerRemarkWriteYn = !isWriteAuthFuncIdActivated ? managerWriteYn : $projectMakeLayer.find(".remark-write-option").find(".checked").attr('data-manager-remark-write-yn');
            var managerLookupYn = $projectMakeLayer.find(".lookup-option").find(".checked").attr('data-manager-lookup-yn');
            var managerDownloadYn = $projectMakeLayer.find(".download-option").find(".checked").attr('data-manager-download-yn');
            projectMakeData["MANAGER_WRITE_YN"] = managerWriteYn;
            projectMakeData["MANAGER_WRITE_REMARK_YN"] = managerRemarkWriteYn;
            projectMakeData["MANAGER_LOOKUP_YN"] = managerLookupYn;
            projectMakeData["MANAGER_DOWNLOAD_YN"] = managerDownloadYn;
            switchMain();
        }
    }

    function changeCheckStatus(checkAreaEvent) {

        var eCurrentTarget = $(checkAreaEvent.currentTarget);

        if (eCurrentTarget.parents('.more-option-layer').length > 0) {
            if (!isCreate && eCurrentTarget.findUp(".lookup-option").length > 0) return;
            if (eCurrentTarget.findUp(".check-area").hasClass("checked")) return;
            eCurrentTarget.parents("dl").find(".check-area").toggleClass("checked");
            return;
        }

        if (eCurrentTarget.hasClass("toggle-button")) {
            eCurrentTarget.removeClass('my-check-1');
            eCurrentTarget.toggleClass("active");
        } else {
            eCurrentTarget.toggleClass("my-check-1-1").toggleClass("my-check-1");
        }

        if (eCurrentTarget.parents('.open-yn').length > 0) {
            $projectMakeLayer.find(".open-category-setting").toggleClass('d-none');
            projectMakeData["OPEN_YN"] = (eCurrentTarget.hasClass("active") ? "Y" : "N");
        } else if (eCurrentTarget.parents('.manager-permit-yn').length > 0) {
            projectMakeData["MANAGER_PERMIT_YN"] = (eCurrentTarget.hasClass("active") ? "Y" : "N");
        } else {
            //pass
        }
    }

    function submitProject() {

        var $projectTitleInput = $("#projectTitleInput");
        var checkJson = Validation.checkInput($projectTitleInput);
        if (Object.keys(checkJson).length > 0) {
            Often.toast("error", checkJson.errorMessage);
            checkJson.errorObj.focus();
            return;
        }

        var isProjectCategory = $projectMakeLayer.find(".js-project-open-toggle").hasClass("active");
        var categorySrno = $.trim(projectMakeData["CATEGORY_SRNO"]);
        if (isProjectCategory && ("0" === categorySrno || "" === categorySrno)) {
            Often.toast("error", "프로젝트 카테고리를 선택해주세요!");
            return;
        }

        var projectTitleVal = $.trim($projectTitleInput.val());
        var projectContentsVal = $.trim($("#projectContentsInput").val());
        var projectSrno = LocalUtil.getLocalValue("CURRENT_PROJECT_SETTING", "COLABO_SRNO");
        var sendData = {
            COLABO_SRNO: projectSrno,
            TTL: projectTitleVal,
            CNTN: projectContentsVal,
            JNNG_ATHZ_YN: projectMakeData["MANAGER_PERMIT_YN"],
            OPEN_YN: projectMakeData["OPEN_YN"],
            CNTS_CATG_SRNO: projectMakeData["CATEGORY_SRNO"],
            MNGR_WR_YN: projectMakeData["MANAGER_WRITE_YN"],
            MNGR_WR_CM_YN: projectMakeData["MANAGER_WRITE_REMARK_YN"],
            SRCH_AUTH_YN: projectMakeData["MANAGER_LOOKUP_YN"],
            PRJ_AUTH: projectMakeData["MANAGER_DOWNLOAD_YN"],
        }

        if (isCreate) {
            sendData.packetOption = Ajax.OPTION.PREVENT_EXECUTE;
            Ajax.executeApi(RestApi.POST.COLABO2_C102, sendData, function (dat) {
                //Todo. setBuySetting은 이미 있는값 아닌가?
                BaseSetting.setBuySetting(function () { //게스트 프로젝트 생성 수 제한 갱신
                    ViewChanger.loadPageJson({code: "detail", first: dat.COLABO_SRNO})
                    closePopup();
                });
            });
            return;
        }

        Ajax.executeApi(RestApi.PUT.COLABO2_U101, sendData, function () {
            Often.toast("success", i18next.t('front.alert.successfullyChange', {status: '$t(dictionary.edit)'}));
            closePopup();
            updateTitleAndCntn();
            updateLocal();

            function updateTitleAndCntn() {
                var $projectContents = $("#projectContents");
                $("#projectTitle").text(projectTitleVal);
                $projectContents.text(projectContentsVal).attr("mouseover-text", projectContentsVal);
                $projectContents.parent().css('display', projectContentsVal === "" ? 'none' : 'block');
                DetailHeader.setProjectIcon(sendData);
            }

            function updateLocal() {
                var currentJson = LocalUtil.getLocalJson("CURRENT_PROJECT_SETTING");
                LocalUtil.setLocalJson("CURRENT_PROJECT_SETTING", $.extend({}, currentJson, {
                    TTL: projectTitleVal,
                    CNTN: projectContentsVal,
                    JNNG_ATHZ_YN: projectMakeData["MANAGER_PERMIT_YN"],
                    OPEN_YN: projectMakeData["OPEN_YN"],
                    CNTS_CATG_SRNO: projectMakeData["CATEGORY_SRNO"],
                    CNTS_CATG_NM: projectMakeData["CATEGORY_NM"],
                    MNGR_WR_YN: projectMakeData["MANAGER_WRITE_YN"],
                    MNGR_WR_CM_YN: projectMakeData["MANAGER_WRITE_REMARK_YN"],
                    SRCH_AUTH_YN: projectMakeData["MANAGER_LOOKUP_YN"],
                    PRJ_AUTH: projectMakeData["MANAGER_DOWNLOAD_YN"],
                }));
            }
        });
    }

    function checkWritingMakePopup(callback){
        var checkData = getProjectMakeData();
        checkData.TITLE = $.trim($("#projectTitleInput").val());
        checkData.CONTENTS = $.trim($("#projectContentsInput").val());
        if(JSON.stringify(preMakeData) === JSON.stringify(checkData)) return callback();
        PopupDraw.drawConfirm({
            contents: {main: i18next.t('front.alert.leaveWriting')},
            callback: {submit: callback}
        })
    }

})()
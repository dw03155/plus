var SpaceSelectable = (function () {

    var searchTimer;
    var $addedItem;

    var $projectSelectableLayer, $projectSelectableUl;
    var projectMaxSelection, projectSelectionMode;
    var selectedProjectArray = [];

    var projectPageData = {
        PG_NO: 1,
        PG_PER_CNT: 100,
        NEXT_YN: "Y",
    }

    return {
        getSelectedProjectArray: getSelectedProjectArray,
        addProjectSelectableView: addProjectSelectableView,
        isSharePost: isSharePost,
    }

    function isSharePost($postPopup) {
        return $postPopup.attr('data-code') === DetailCode.SHARE_POST.CODE;
    }

    function getSelectedProjectArray() {
        return selectedProjectArray;
    }

    function addProjectSelectableView($popupBefore, projectSelectableJson) {

        if (!projectSelectableJson) return;
        if (!projectSelectableJson.selectable) return;

        var maxSelection = Often.null2Void(projectSelectableJson.maxSelection, 1);
        var selectionMode = Often.null2Void(projectSelectableJson.mode, '');
        var isFirstEditor = projectSelectableJson.firstEditor || false;

        selectedProjectArray = [];
        projectMaxSelection = maxSelection;
        projectSelectionMode = selectionMode;

        $addedItem = $popupBefore;
        $projectSelectableLayer = $($("#projectSelectableLayer").html());

        $addedItem.before($projectSelectableLayer);
        changeLayer($projectSelectableLayer, isFirstEditor)

        $projectSelectableUl = $projectSelectableLayer.find('.js-share-project-list');
        ListHelper.initPageData(projectPageData, $projectSelectableUl);

        //$projectSelectableLayer.find(".js-project-select").css("display", projectSelectionMode === DetailCode.WRITE_ANYWHERE.CODE ? "none" : "block");

        initEvent();
        loadProjectList();
    }

    function searchProjectList(searchValue) {
        loadProjectList(searchValue);
    }

    function loadProjectList(searchValue) {
        searchValue = (typeof searchValue === "string" ? searchValue : "")
        if (projectPageData.NEXT_YN === "N") return;
        var isSearchMode = "" !== Often.null2Void(searchValue);
        var apiKey = RenewalApi.GET.ACT_PROJECT_LIST;
        var apiInputJson = $.extend({}, projectPageData, {
            COLABO_FLD_KIND: "1",
            COLABO_FLD_SRNO: "12",
            MODE: "COPY",
        }, isSearchMode ? {
            SEARCH_RECORD: [{
                SRCH_WORD: searchValue,
                ORDER_TYPE: "A", //A-정확도순, N-최신순
            }]
        } : {});
        var apiRecordName = "PROJECT_RECORD";

        Ajax.executeApi(apiKey, apiInputJson, function (dat) {
            $projectSelectableUl.drawListHelper({
                pageData: projectPageData,
                noDataHtml: ListHelper.getNoDataHtml(""),
                nextYn: dat["NEXT_YN"],
                records: dat[apiRecordName],
                targetObj: {
                    focus: $projectSelectableLayer.find(".js-share-project-srch"),
                    scroll: $projectSelectableUl.parent("div"),
                },
                callback: {
                    item: getSelectableProjectListHtml,
                    scroll: loadProjectList,
                    final: function () {
                        $projectSelectableLayer.find('.js-share-popup-ttl').text(i18next.t(DetailCode[projectSelectionMode].TEXT));
                        $addedItem.find('.js-project-selectable-header').css({
                            display: 'inline-block',
                        });
                    },
                },
            });
        });
    }

    function initEvent() {
        $addedItem.find('.btn-back, #selectedProject').off('click').on('click', function () {
            changeLayer($projectSelectableLayer, false);
        });
        $projectSelectableLayer.find(".js-share-project-srch").focus().off('keyup').on('keyup', keyupEventByAllProjectLayer);
        $projectSelectableLayer.off('click').on('click', clickEventByAllProjectLayer);
    }

    function setEditorContents(isLimit) {
        if (selectedProjectArray.length === 0) return $addedItem.find('.share-contents').addClass('create-post-container').removeClass('share-contents');
        $addedItem.find('.create-post-container').addClass('share-contents').removeClass('create-post-container');
        if (isLimit) {
            $addedItem.find('.manager-btn-group').html('<em>' + i18next.t('front.spaceSelectable.cannotSetManager') + '</em>');
        } else {
            //pass
        }
    }

    function setEditorHeader() {
        var $shareHeader = $addedItem.find('.share-header');

        if (selectedProjectArray.length === 0) {
            $addedItem.removeClass('share-wr');
            $addedItem.find('.create-post-header').css('display', 'block');
            $shareHeader.css('display', 'none');
            return;
        }

        var firstProjectData = selectedProjectArray[0];
        var projectTtl = firstProjectData.TTL + (selectedProjectArray.length > 1 ? (" 외 " + (selectedProjectArray.length - 1) + "개") : "");
        var projectSrno = firstProjectData.COLABO_SRNO;

        PostPopup.setData({PROJECT_SRNO: projectSrno})
        $addedItem.addClass('share-wr');
        $addedItem.find('.create-post-header').css('display', 'none');

        $shareHeader.css('display', 'block');
        $shareHeader.find('.project-ttl').text(projectTtl);
        ListHelper.removeAllColorClass($shareHeader.find('.color-code'));
        $shareHeader.find('.color-code').addClass('color-code-' + firstProjectData.BG_COLOR_CD);
    }

    function changeLayer($allProjectListLayer, isEditor) {
        $allProjectListLayer.css("display", isEditor ? "none" : "table");
        $addedItem.css("display", isEditor ? "block" : "none");
    }

    function clickEventByAllProjectLayer(e) {

        var $eTarget = $(e.target);

        if (isProjectListAndAction()) return;
        if (isSubmitBtnAndAction()) return;
        if (isCancelBtnAndAction()) return;
        if (isRemoveAllMenuAndAction()) return;

        function isProjectListAndAction() {
            var $projectItem = $eTarget.findUp('.project-item');
            if ($projectItem.length === 0) return false;
            if ($projectItem.find(".edit-check.disabled").length > 0) return true;
            toggleOneProject($projectItem);
            $projectSelectableLayer.find(".js-project-select").css("display", selectedProjectArray.length > 0 ? "block" : "none");
            $projectSelectableLayer.find('.select-count').text(selectedProjectArray.length);
            return true;
        }

        function isSubmitBtnAndAction() {
            var $submitBtn = $eTarget.findUp('.btn-submit');
            if ($submitBtn.length === 0) return false;
            var isSharePost = projectSelectionMode === DetailCode.SHARE_POST.CODE;
            if (selectedProjectArray.length === 0 && isSharePost) {
                return Often.toast('info', i18next.t('front.alert.select', {val: '$t(dictionary.project)'}));
            }
            setEditorHeader();
            setEditorContents(isSharePost);
            changeLayer($projectSelectableLayer, true);
            return true;
        }

        function isCancelBtnAndAction() {
            var $cancelBtn = $eTarget.findUp('.btn-cancel');
            if ($cancelBtn.length === 0) return false;
            if (projectSelectionMode === DetailCode.WRITE_ANYWHERE.CODE) {
                removeAllProject();
                setEditorHeader();
                changeLayer($projectSelectableLayer, true);
                return true;
            }
            if (projectSelectionMode === DetailCode.SHARE_POST.CODE) {
                var isExistSelectProject = $(".js-share-project-list").is(":visible") && $(".js-share-project-list .on").length > 0;
                if (isExistSelectProject) {
                    PopupDraw.drawConfirm({
                        contents: {main: "선택된 프로젝트가 있습니다.\n다른 프로젝트에 올리기를 취소하시겠습니까?"},
                        callback: {submit: PostPopup.removePopup}
                    })
                } else {
                    PostPopup.removePopup();
                }
                return true;
            }
        }

        function isRemoveAllMenuAndAction() {
            var $selectClearBtn = $eTarget.findUp('.select-clear');
            if ($selectClearBtn.length === 0) return false;
            removeAllProject();
            return true;
        }
    }

    function removeAllProject() {
        selectedProjectArray = [];
        $projectSelectableLayer.find('.select-count').text(0);
        $projectSelectableLayer.find(".js-project-select").css("display", "none");
        $projectSelectableUl.find('.check-menu-item').removeClass('on');
    }

    function toggleOneProject($projectItem) {
        if ($projectItem.find('.check-menu-item').hasClass("on")) {
            removeOneProject($projectItem);
        } else {
            checkOneProject($projectItem);
        }
    }

    function removeOneProject($projectItem) {
        var projectSrno = $projectItem.attr('colabo-srno')
        selectedProjectArray.forEach(function (selectOneProject, idx) {
            var isExist = (selectOneProject['COLABO_SRNO'] === projectSrno);
            isExist && selectedProjectArray.splice(idx, 1);
        })
        $projectItem.find('.check-menu-item').removeClass('on');
        return true;
    }

    function checkOneProject($projectItem) {
        if (projectMaxSelection === 1) removeAllProject();
        if (selectedProjectArray.length >= projectMaxSelection) {
            return Often.toast('info', i18next.t('front.SpaceSelectable.maximumProject', {count: projectMaxSelection}));
        }
        selectedProjectArray.push({
            COLABO_SRNO: $projectItem.attr("colabo-srno"),
            TTL: $projectItem.find('.share-project-ttl').text(),
            BG_COLOR_CD: $projectItem.find('.color-code').attr('data-color'),
        });
        $projectItem.find('.check-menu-item').addClass('on');
        return true;
    }

    function keyupEventByAllProjectLayer(e) {
        searchTimer && clearTimeout(searchTimer);
        searchTimer = setTimeout(function () {
            var searchWord = $.trim($(e.target).val());
            ListHelper.initPageData(projectPageData);
            searchProjectList(searchWord);
            $(e.target).focus();
        }, 200);
    }

    function getSelectableProjectListHtml(projectArray) {
        var baseHtml = $('#selectableProjectItem').html();
        var returnHtml = '';
        $.each(projectArray, function (index, item) {
            returnHtml += ListHelper.replaceJson(baseHtml, {
                TTL: item.TTL,
                BG_COLOR_CD: item.BG_COLOR_CD,
                COLABO_SRNO: item.COLABO_SRNO,
                BG_COLOR_CD: Often.null2Void(item.BG_COLOR_CD, "0"),
                check_yn: getCheckYn(item.COLABO_SRNO, "Y" === Often.null2Void(item.MNGR_WR_YN, "N")),
            })
        });
        return returnHtml;
    }

    function getCheckYn(projectSrno, isOnlyManagerWrite) {
        var checkYn = '';
        selectedProjectArray.forEach(function (selectColaboJson) {
            var isExist = selectColaboJson['COLABO_SRNO'] === projectSrno;
            if (isExist) checkYn = 'on';
        })
        if (isOnlyManagerWrite) checkYn = 'disabled';
        return checkYn;
    }

})();
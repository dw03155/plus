var DetailEvent = (function () {

    return {
        addClickEventOnDetailView: addClickEventOnDetailView,
        clickDetailUl: clickDetailUl,
        resetFilter: resetFilter,
    }

    /**
     * Detail - VIEW => 포스트 목록에서는 뷰모드만!
     * Popup - VIEW, ADD, EDIT, SHARE_POST => 포스트 팝업에서는 모든 모드 가능!
     */
    function clickDetailUl(e) {
        e.stopPropagation();

        PostPopupEvent.hideAllInnerPopup(e);

        //top
        if ($.isTarget(e, ".js-project-title-button")) return (() => openProject(e))(); //VIEW
        if ($.isTarget(e, ".js-up-task-button")) return goUpTask(e); //VIEW
        if ($.isTarget(e, ".js-post-author")) return openRegisterProfile(e); //VIEW
        if ($.isTarget(e, ".js-pin-post")) return pinPost(e); //VIEW
        if ($.isTarget(e, ".js-setting-button")) return openSettingUl(e);
        if ($.isTarget(e, ".js-setting-item")) return applySetting(e);

        //center
        if ($.isTarget(e, ".js-hyper-button")) return isHyperButtonAndAction(e); //순서보장 - schedule, todo 보다 위
        if (isOnlyView(e) && $.isTarget(e, ".js-direct-href")) return moveUrlByHref(e);
        if (isOnlyView(e) && $.isTarget(e, ".mention-span")) return Mention.openProfile(e);
        if (isOnlyView(e) && $.isTarget(e, ".hashtag-span")) return goHashtagPost(e);
        if (isOnlyView(e) && $.isTarget(e, ".js-map-item")) return openGoogleMapUrl(e);
        if ($.isTarget(e, ".js-contents-more-btn")) return loadPostMore(e);
        if ($.isTarget(e, ".js-task-option")) return ItemTask.clickTaskComponent(e);
        if ($.isTarget(e, ".js-hidden-component")) return clickHiddenComponent(e);
        if ($.isTarget(e, ".js-subtask-area")) return ItemSubtask.clickSubtaskComponent(e);
        if ($.isTarget(e, ".js-schedule-comp")) return ItemSchedule.clickScheduleComponent(e);
        if ($.isTarget(e, ".js-todo-component")) return ItemTodo.clickTodoComponentInDetail(e);

        if(!$.isTarget(e, [".js-remark-layer", ".js-del-btn"])){
            if (isOnlyView(e) && $.isTarget(e, ".js-post-file")) return openPostFileByPostItem(e);
            if (isOnlyView(e) && $.isTarget(e, ".image-item")) return openPostImageViewerByPostItem(e);
        }
        
        //bottom
        if ($.isTarget(e, ".js-reaction-bookmark")) return clickLeftBottom(e);
        if ($.isTarget(e, ".read-confirmation")) return openReadConfirm(e);
        if ($.isTarget(e, [".js-comment-area", ".js-remark-layer"])) return ItemRemark.clickRemarkComponent(e);

        //detail
        if ($.isTarget(e, "#detailUl")) {
            if ($.isTarget(e, ".list-item")) return openPostView(e);
            if ($.isTarget(e, "#noDetailDataBnt")) return clickNoDetailDataBtn();
        }
    }

    function clickLeftBottom(e) {
        if ($.isTarget(e, [".js-post-reaction", ".js-emoji-select-layer", ".js-emoji-group-layer"])) {
            return ItemReaction.clickReactionArea(e);
        }
        if ($.isTarget(e, ".js-post-bookmark")) return ItemBookmark.toggleBookmark(e);
    }

    function applySetting(e) {
        var $eTarget = $(e.target);
        var $detailItem = $eTarget.parents(".detail-item");
        var VC_SRNO = Often.null2Void($detailItem.find("#videoSpan").attr("data-vc-srno"), "0");
        var postUrl = Often.null2Void($detailItem.attr("data-post-url"));
        var projectSrno = Often.null2Void($detailItem.attr("data-project-srno")); // 프로젝트 방 고유 번호
        var postSrno = Often.null2Void($detailItem.attr("data-post-srno")); // 해당 프로젝트 방의 글 고유 번호

        var isVcSchd = VC_SRNO !== "0";
        $eTarget.closest(".js-setting-ul").fadeOut(200);

        var $settingItem = $eTarget.closest(".js-setting-item");
        var code = $settingItem.attr('data-code');

        if (code === 'delete') return deletePost(projectSrno, postSrno);
        if (code === 'url') return Often.copyUrl(postUrl);

        if (code === 'modify' || code === 'copy') {
            if (code === 'copy' && isVcSchd) return Often.toast('error', i18next.t('front.alert.shareVideoMeetingWarning'));
            if (code === 'modify' && isVcSchd) LocalUtil.setLocal("VC_SRNO", VC_SRNO);
            if ($("#postPopup").is(":visible") && postSrno === PostPopup.getData().POST_SRNO) {
                PostPopup.getPostData(projectSrno, postSrno, "", true, openEdit);
            } else {
                PostPopup.togglePostView(projectSrno, postSrno, "", openEdit)
            }
        }

        function openEdit() {
            PostPopup.openEditView(code === 'copy');
        }
    }

    function goUpTask(e) {
        var $upTaskButton = getDataByEvent(e).$eTarget.closest(".js-up-task-button");
        var projectSrno = $upTaskButton.attr("data-up-task-project-srno");
        var postSrno = $upTaskButton.attr("data-up-task-post-srno");
        PostPopup.togglePostView(projectSrno, postSrno);
    }

    function isHyperButtonAndAction(e) {
        e.preventDefault();
        var $eTarget = $(e.target);
        var $hyperButton = $eTarget.closest(".js-hyper-button");
        var url = $hyperButton.text();
        moveUrl(url);
        return true;
    }

    function openSettingUl(e) {
        var $eTarget = $(e.target);
        var $settingButton = $eTarget.closest(".js-setting-button");
        if ($settingButton.next().is(":visible")) {
            $settingButton.next().fadeOut(200);
        } else {
            $settingButton.next().fadeIn(200);
        }
    }

    function openRegisterProfile(e) {
        var $eTarget = getDataByEvent(e).$eTarget;
        if ($eTarget.hasClass("date")) return false;
        PostPopup.checkWritingAndShowPopup(function () {
            var $postAuthor = $eTarget.closest(".js-post-author");
            var postAuthorId = $postAuthor.attr("data-author-id");
            Profile.drawProfilePopup(postAuthorId);
        });
    }

    function openProject(e) {
        ViewChanger.loadPageJson({
            code: "detail",
            first: getDataByEvent(e).projectSrno
        })
    }

    function goHashtagPost(e) {
        var $eTarget = $(e.target);
        var tagName = $.trim($eTarget.closest(".hashtag-span").text());
        var $selectedHashTag = $("#hashtagUl").find(tagName);
        if ("" === tagName || $selectedHashTag.length === 0) return;
        var isActiveHashTag = $selectedHashTag.find(".hashtag").hasClass("on");
        if (isActiveHashTag) return;
        HashTag.changeHashtagListStatusAndView($selectedHashTag);
    }

    function openReadConfirm(e) {
        var data = getDataByEvent(e);
        var $postReadArea = data.$eTarget.closest(".read-confirmation"); //작은 박스
        PostReadCheck.showReadCheckPopUp(data.projectSrno, data.postSrno, $postReadArea);
    }


    function moveUrlByHref(e) {
        e.preventDefault();
        var $eTarget = $(e.target);
        var url = $eTarget.closest(".js-direct-href").attr("data-preview-url");
        moveUrl(url);
    }

    function openGoogleMapUrl($eTarget) {
        if ($eTarget.closest(".js-del-btn").length > 0) return true;
        var url = $eTarget.closest(".js-map-item").attr("data-url");
        moveUrl(url)
    }

    function moveUrl(url) {
        if ("" === Often.null2Void($.trim(url))) return;
        if (UrlCatcher.isProjectInviteUrlAndAction(url)) return;
        if (UrlCatcher.isPostUrlAncAction(url)) return;
        if (Electron.isElectronApp()) {
            Electron.openExternalLinkforElectron(url);
        } else {
            OpenUtil.openWindow(url, "_blank");
        }
    }

    function openPostImageViewerByPostItem(e) {
        var data = getDataByEvent(e);
        var $imgItem = data.$eTarget.closest(".image-item");
        var imgInfoArray = Often.getAttrs($imgItem.parent().find('.image-item'));
        $.each(imgInfoArray, function (i, image) {
            image.COLABO_SRNO = data.projectSrno;
            image.COLABO_COMMT_SRNO = data.postSrno;
        });
        var idx = $imgItem.parent().find(".image-item").index($imgItem);
        ImageViewer.openImage("POST", imgInfoArray, idx);
    }

    function pinPost(e) {
        var data = getDataByEvent(e);
        var $eTarget = data.$eTarget
        var $detailItem = $eTarget.closest(".detail-item");
        var projectSrno = data.projectSrno
        var postSrno = data.postSrno

        if ($eTarget.closest(".js-pin-authority").length === 0) {
            Often.toast("error", "프로젝트 관리자 + 글 작성 본인만 상단고정 설정/해제 가능합니다.");
            return;
        }

        var isPin = $eTarget.hasClass('on');
        var inputData = {COLABO_SRNO: projectSrno, COLABO_COMMT_SRNO: postSrno}
        var inputData2 = {PROJECT_SRNO: projectSrno, POST_SRNO: postSrno}
        PopupDraw.drawConfirm({
            contents: {main: i18next.t('front.alert.pinPost', {status: isPin ? '$t(dictionary.unPin)' : '$t(dictionary.pin)'})},
            callback: {submit: executePin}
        });

        function executePin() {
            UpdateElements.autoUpdateElem($.extend({}, inputData2, {PIN_MODE: isPin ? "DELETE" : "PIN"}));

            if (isPin) {
                Ajax.executeApi(RestApi.DELETE.COLABO2_PIN_D001, inputData, function () {
                    Often.toast("success", i18next.t('front.alert.successfullyChange', {status: '$t(dictionary.change)'}))
                    $eTarget.removeClass('on');
                })
                return;
            }

            Ajax.executeApi(RestApi.POST.COLABO2_PIN_C001, $.extend({}, inputData, {
                packetOption: Ajax.OPTION.PREVENT_EXECUTE
            }), function () {
                var beforeRemarkSrno = $detailItem.find(".remark-item:last").attr("remark-srno");
                UpdateElements.autoUpdateElem({
                    PROJECT_SRNO: projectSrno,
                    POST_SRNO: postSrno,
                    REMARK_SRNO: beforeRemarkSrno,
                    REMARK_UPDATE: true,
                });
                Often.toast("success", i18next.t('front.alert.successfullyChange', {status: '$t(dictionary.change)'}))
                $eTarget.addClass('on')
            })
        }
    }

    function openPostFileByPostItem(e) {
        var data = getDataByEvent(e);
        var oneFileData = Often.getAttrs(data.$eTarget.closest(".js-post-file"))[0];
        oneFileData.COLABO_SRNO = data.projectSrno;
        oneFileData.COLABO_COMMT_SRNO = data.postSrno;
        //Todo. 구글드라이브, 드롭박스는 CNTN에서 COMP_JSON으로 저장시 ATCH_SRNO = 0 인 이슈가 존재함.
        var isExternalFile = (oneFileData.RAND_KEY === "GOOGLEDRIVE" || oneFileData.RAND_KEY === "DROPBOX");
        if (isExternalFile) return FileUtil.downFile(oneFileData.ATCH_URL, isExternalFile)
        var isDownLoadButton = data.$eTarget.closest(".js-down-btn").length > 0;
        var fileMode = (isDownLoadButton || isExternalFile) ? "SAVE" : "DOC-VIEWER";
        FileUtil.openFile(fileMode, [oneFileData]);
    }

    function loadPostMore(e) {
        var $eTarget = $(e.target);
        var $detailItem = $eTarget.parents(".detail-item");
        $detailItem.find("#summaryPost, #postMoreButton, #summaryFoldArea").css('display', 'none');
        $detailItem.find("#originalPost").css('display', 'block');
    }

    function openPostView(e) {
        var data = getDataByEvent(e);
        PostPopup.togglePostView(data.projectSrno, data.postSrno, "", function () {
            $("#detailUl").find(".highlight").removeClass("highlight");
            data.$eTarget.closest(".list-item").addClass("highlight").find(".js-indication").css("display", "none");
        });
    }

    function addClickEventOnDetailView() {
        $("#taskReportLayer").off("click").on("click", TaskReport.clickTaskReportLayer);
        $("#feedTypeButton").off("click").on("click", clickFeedTypeButton);
        $("#createPostArea").off("click").on("click", clickCreatePostArea);
        $("#taskReportArea").off("click").on("click", toggleTaskReport);
        $("#postMoreBtn").off("click").on("click", Detail.clickPostMore);
        $("#openInviteLayerBtn").off("click").on("click", openInviteByProjectSrno);
        $("#allSendienceBtn").off("click").on("click", AllSendience.openAllSendiencePopup);
        $(".js-detail-top-search-button").off("click").on("click", ProjectSearch.clickProjectDetailSearchTopButton);
        $("#projectFeedArea").find(".js-filter-reset").off("click").on("click", clickResetFilter);
        $("#projectSearchInput").off("keyup").on("keyup", ProjectSearch.keydownProjectSearchInput);
    }

    function deletePost(projectSrno, postSrno) {
        var vcSrno = Often.null2Void($("#post-" + postSrno).find("#videoSpan").attr("data-vc-srno"));
        PopupDraw.drawConfirm({
            contents: {
                main: i18next.t('front.common.ask', {
                    val: '$t(dictionary.article)',
                    status: '$t(dictionary.delete)'
                })
            },
            callback: {submit: submitDelete}
        })

        function submitDelete() {
            if (VideoConference.isVC(vcSrno)) {
                VideoConference.deleteZoomToken({VC_SRNO: vcSrno}, deletePost);
                return;
            }
            deletePost();
        }

        function deletePost() {
            Ajax.executeApi(RestApi.DELETE.COLABO2_COMMT_D101, {
                COLABO_SRNO: projectSrno,
                COLABO_COMMT_SRNO: postSrno,
            }, function () {
                Often.toast("success", i18next.t('front.alert.successfullyChange', {status: '$t(dictionary.delete)'}));
                PostPopup.removePopup();
                var passJson = {PROJECT_SRNO: projectSrno, POST_SRNO: postSrno}
                PostPopup.removePopup();
                UpdateElements.autoUpdateElem($.extend({}, passJson, {PIN_MODE: 'DELETE'}));
                UpdateElements.autoUpdateElem($.extend({}, passJson, {POST_MODE: 'DELETE'}));
            })
        }
    }

    function openInviteByProjectSrno() {
        InviteProject.openInvite(Detail.getProjectSrno())
    }

    function clickCreatePostArea(e) {
        var $eTarget = $(e.target);
        var $createPostArea = $(e.currentTarget);
        var $postFilter = $eTarget.closest(".post-filter");
        var postCode = Often.null2Void($postFilter.attr('data-post-code'), $createPostArea.find(".post-filter:first").attr("data-post-code"));
        var isAdminAuthority = $createPostArea.hasClass("admin");
        if (Authority.isAdminAuthorityCheckAndAction(isAdminAuthority)) return;
        PostPopup.openRegistrationView(Detail.getProjectSrno(), postCode, true);
    }

    function clickNoDetailDataBtn() {
        var sendienceCnt = Number(LocalUtil.getLocalValue("CURRENT_PROJECT_SETTING", "SENDIENCE_CNT"));
        var projectSrno = Detail.getProjectSrno();
        var writeAuthorityYn = LocalUtil.getLocalValue("CURRENT_PROJECT_SETTING", "MNGR_WR_YN");
        if (Authority.isAdminAuthorityCheckAndAction(writeAuthorityYn === "Y")) return;
        if (sendienceCnt > 1) {
            PostPopup.openRegistrationView(projectSrno, DetailCode.WRITE, true);
        } else {
            InviteProject.openInvite(projectSrno);
        }
    }

    function clickFeedTypeButton(e) {

        var $eTarget = $(e.target);

        var $feedTypeButtonId = $eTarget.closest("#feedTypeButton");
        var $feedTypeButton = $eTarget.closest(".feed-type-button");
        var $feedFilterButton = $eTarget.closest(".js-feed-filter-button");
        var $feedFilterLayer = $(e.currentTarget).find(".js-feed-filter-layer");
        var $checkMenuItem = $eTarget.closest(".check-menu-item");

        if ($feedTypeButton.length > 0) {
            PostPopup.checkWritingAndShowPopup(function () {
                var feedType = ($feedTypeButton.hasClass("card") ? "card" : "list")
                var type = feedType === "card" ? "F" : "L";
                updateProjectViewType(type, function () {
                    LocalUtil.setLocal("FEED_TYPE", feedType);
                    LocalUtil.setLocalValue("CURRENT_PROJECT_SETTING", "VIEW_TYPE", type);
                    Detail.setFeedType(feedType);
                    Detail.drawPostList();
                    (feedType === "card") && PostPopup.removePopup();
                })
            })
            return;
        }

        if ($feedFilterButton.length > 0) {
            if ($feedFilterLayer.is(":visible")) $feedFilterLayer.fadeOut(200);
            else $feedFilterLayer.fadeIn(200);
            $feedFilterButton.toggleClass("active");
            return;
        }

        if ($checkMenuItem.length > 0) {
            $checkMenuItem.parents(".section-title-area").find(".js-feed-filter-button").removeClass("active");
            $feedFilterLayer.find(".check-menu-item").removeClass("on");
            $checkMenuItem.addClass("on");
            $feedFilterLayer.fadeOut(200);
            var $projectFeedArea = $("#projectFeedArea");
            $projectFeedArea.find("#allPostsFilterTitle").text($checkMenuItem.text());
            var isTotal = $checkMenuItem.attr("data-code") === "";
            $projectFeedArea.find(".js-filter-reset").css("display", isTotal ? "none" : "block");
            if (isTotal) $feedTypeButtonId.find(".js-feed-filter-button").removeClass("active");
            else $feedTypeButtonId.find(".js-feed-filter-button").addClass("active");
            Detail.drawPostList(true);
        }

        function updateProjectViewType(type, callback) {
            Ajax.executeApi(RestApi.GET.FLOW_VIEW_TYPE_U001, {
                COLABO_SRNO: Detail.getProjectSrno(),
                VIEW_TYPE: type,
            }, callback);
        }
    }

    function toggleTaskReport(e) {
        var $taskReportArea = $(e.currentTarget);
        if ($(e.target).closest(".section-title-area").length === 0) return;
        $taskReportArea.find(".js-report-btn").toggleClass("off");
        var taskReportViewYn;
        if ($taskReportArea.find(".js-task-report-layer").is(":visible")) {
            taskReportViewYn = "N";
            $taskReportArea.find(".js-task-report-layer").slideUp(300);
        } else {
            taskReportViewYn = "Y";
            $taskReportArea.find(".js-task-report-layer").slideDown(300);
        }
        Ajax.executeApi(RestApi.PUT.FLOW_TASK_REPORT_U001, {
            COLABO_SRNO: Detail.getProjectSrno(),
            TASK_REPORT_VIEW_YN: taskReportViewYn,
        })
    }

    function clickHiddenComponent(e) {
        /**
         * var $hiddenComponent2 = $(window.getSelection().focusNode.parentNode);
         * 현재 create box의 마진을 선택시 selection을 제대로 가져오지 못하기 때문에 마진쪽을 패딩으로 변경해야 함
         */
        var $eTarget = $(e.target);
        var $hiddenComponent1 = $eTarget.closest(".js-hidden-component");
        if ("VIEW" === Detail.getPostStatus()) return false;
        $hiddenComponent1.attr({"class": "edit-component", "contenteditable": ""}).text("");
        return true;
    }

    function clickResetFilter() {
        var $projectFeedArea = $("#projectFeedArea");
        var isSelectHashTag = $projectFeedArea.find("#allPostsFilterTitle").text().indexOf("#") > -1;
        if (isSelectHashTag) {
            HashTag.setUnHashtagView();
            Detail.drawPostList(false);
            return;
        }
        resetFilter($projectFeedArea);
        Detail.drawPostList(true);
    }

    function resetFilter($projectFeedArea) {
        var $feedFilterLayer = $projectFeedArea.find(".js-feed-filter-layer");
        $feedFilterLayer.find(".check-menu-item").removeClass("on");
        $projectFeedArea.find(".js-feed-filter-button").removeClass("active");
        $feedFilterLayer.find(".check-menu-item[data-code=\"\"]").addClass("on");
        $projectFeedArea.find("#allPostsFilterTitle").text(i18next.t('dictionary.all'));
        $projectFeedArea.find(".js-filter-reset").css("display", "none");
    }

    function getDataByEvent(e) {
        var $eTarget = $(e.target);
        var $popupBefore = $eTarget.closest(".js-popup-before");
        var projectSrno = Often.null2Void($popupBefore.attr("data-project-srno")); // 프로젝트 방 고유 번호
        var postSrno = Often.null2Void($popupBefore.attr("data-post-srno")); // 해당 프로젝트 방의 글 고유 번호
        var viewType = $popupBefore.attr("data-code");
        return {$eTarget, projectSrno, postSrno, viewType}
    }

    function isOnlyView(e) {
        return "VIEW" === getDataByEvent(e).viewType;
    }

})();
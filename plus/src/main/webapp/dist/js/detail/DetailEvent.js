var DetailEvent = (function () {

    return {
        addClickEventOnDetailView: addClickEventOnDetailView,
        clickDetailUl: clickDetailUl,
        clickDetailTab: clickDetailTab,
        applySummarySlickImage: applySummarySlickImage,
        resetFilter: resetFilter,
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

    function clickDetailUl(e) {

        if (Often.isAct("subscreen")) {
            Often.toast("info", "조회 전용 화면입니다. 게시물 바로가기 버튼을 눌러주세요!");
            return;
        }

        PostPopupEvent.hideAllInnerPopup(e);

        var $eTarget = $(e.target);

        var projectSrno = $eTarget.closest('li').attr('data-project-srno'); // 프로젝트 방 고유 번호
        var projectCommSrno = $eTarget.closest('li').attr('data-post-srno'); // 해당 프로젝트 방의 글 고유 번호

        //list
        if (isListItemAndAction()) return;

        //top
        if (isOpenProjectButtonAndAction()) return;
        if (isPostAuthorProfile()) return;
        if (isPinnedAndAction()) return;
        if (isSettingButtonAndAction()) return;
        if (isSettingUlAndAction()) return;

        //contents
        if (isPostImgAndAction()) return;
        if (isPostFileAndAction()) return;
        if (isPostMoreButtonAndAction()) return;
        if (isOpenUpTask()) return;
        if (isHyperButtonAndAction()) return;
        if (isVideoConferenceButtonAndAction()) return;
        if (isVideoConferenceCopyUrlButtonAndAction()) return;
        if (isMapItemAndAction()) return;
        if (isHashTagAndAction()) return;
        if (isDirectHrefAndAction()) return;

        //bottom
        if (isPostRecommend()) return;
        if (isRemarkFileUploadButtonAndAction()) return;
        if (isPostReadConfirm()) return;
        if (isHiddenComponentAndAction($eTarget)) return;
        if (Mention.isMentionAndAction($eTarget)) return;

        if (ItemTask.isTaskEvent($eTarget, e)) return;

        if (ItemSubtask.isSubTaskClickEvent($eTarget)) return;

        if (ItemSchedule.isScheduleEvent($eTarget)) return;

        if (ItemReaction.isReactionButtonAndAction($eTarget)) return;
        if (ItemReaction.isEmojiIconAndAction($eTarget)) return;
        if (ItemReaction.isEmojiGroupAreaAndAction($eTarget)) return;

        if (ItemTodo.isTodoClickOnDetail($eTarget)) return;

        if (ItemBookmark.isBookmarkButtonAndAction($eTarget)) return;

        if (ItemRemark.isCommentWriterButtonAndAction($eTarget)) return;
        if (ItemRemark.isRemarkDeleteFileButtonAndAction($eTarget)) return;
        if (ItemRemark.isShowPrevRemarkButtonAndAction($eTarget)) return;
        if (ItemRemark.isPostCommentGroup($eTarget)) return;
        if (ItemRemark.isRemarkLikeButtonAndAction($eTarget)) return;
        if (ItemRemark.isRemarkImgAndAction($eTarget)) return;
        if (ItemRemark.isRemarkFileAndAction($eTarget)) return;
        if (ItemRemark.isRemarkLikeCountButtonAndAction($eTarget)) return;
        if (ItemRemark.isShowMoreRemarkButtonAndAction($eTarget)) return;

        function isDirectHrefAndAction() {
            var $directHref = $eTarget.findUp(".js-direct-href");
            if ($directHref.length === 0) return false;

            var $popupBefore = $eTarget.findUp(".js-popup-before");
            var isViewType = $popupBefore.attr("data-code") === "VIEW";
            if (!isViewType) return false;

            e.preventDefault();
            var directUrl = $directHref.attr("data-preview-url");
            if (UrlCatcher.isPostUrlAncAction(directUrl)) return true;
            if (Electron.isElectronApp()) {
                Electron.openExternalLinkforElectron(directUrl);
            } else {
                OpenUtil.openWindow(directUrl, "_blank");
            }
            return true;
        }

        function isMapItemAndAction() {
            var $mapItem = $eTarget.findUp(".js-map-item");
            var $deleteBtn = $eTarget.findUp(".js-del-btn");
            var $popupBefore = $eTarget.findUp(".js-popup-before");

            if ($mapItem.length === 0) return false;
            if ($deleteBtn.length > 0) return true;
            var isView = "VIEW" === $popupBefore.attr("data-code")
            if (!isView) return true;

            var url = Often.null2Void($.trim($mapItem.attr("data-url")));
            if ("" === url) return;
            OpenUtil.openWindow(url, "_blank")
            return true;
        }

        function isHashTagAndAction() {
            var $hashtag = $eTarget.findUp(".hashtag-span");
            if ($hashtag.length === 0) return false;
            var $popupBefore = $eTarget.findUp(".js-popup-before");
            if (PostCondition.getPopupMode($popupBefore) !== "VIEW") return false;
            var tagName = $.trim($hashtag.text());
            var $selectedHashTag = $("#hashtagUl").find(tagName);
            if ("" === tagName || $selectedHashTag.length === 0) return;
            var isActiveHashTag = $selectedHashTag.find(".hashtag").hasClass("on");
            if (isActiveHashTag) return;
            HashTag.changeHashtagListStatusAndView($selectedHashTag);
            return true;
        }

        function isPostReadConfirm() {
            var $postReadArea = $eTarget.findUp(".read-confirmation"); //작은 박스
            if ($postReadArea.length === 0) return false;
            PostReadCheck.showReadCheckPopUp(projectSrno, projectCommSrno, $postReadArea);
            return true;
        }

        function isPostRecommend() {
            var $noDetailDataBnt = $eTarget.findUp("#noDetailDataBnt");
            if ($noDetailDataBnt.length === 0) return false;
            clickNoDetailDataBtn();
            return true;
        }

        function isPostAuthorProfile() {
            var $postAuthor = $eTarget.findUp(".js-post-author");
            if ($postAuthor.length === 0 || $eTarget.hasClass("date")) return false;
            var postAuthorId = $postAuthor.attr("data-author-id");
            PostPopup.checkWritingAndShowPopup(function () {
                Profile.drawProfilePopup(postAuthorId);
            });
            return true;
        }

        function isPostImgAndAction() {
            var $popupBefore = $eTarget.findUp(".js-popup-before");
            var isViewType = ($popupBefore.attr("data-code") === "VIEW");
            var isRemarkLayer = $eTarget.findUp(".js-remark-layer").length > 0;
            if (!isViewType || isRemarkLayer) return false; //댓글 이미지 액션은 별도관리함
            var $imgItem = $eTarget.findUp(".image-item");
            if ($imgItem.length === 0) return false;
            var imgInfoArray = Often.getAttrs($imgItem.parent().find('.image-item'));
            $.each(imgInfoArray, function (i, image) {
                image.COLABO_SRNO = projectSrno;
                image.COLABO_COMMT_SRNO = projectCommSrno;
            });
            var idx = $imgItem.parent().find(".image-item").index($imgItem);
            ImageViewer.openImage("POST", imgInfoArray, idx);
            return true;
        }

        function isRemarkFileUploadButtonAndAction() {
            var $remarkUploadButton = $eTarget.findUp(".js-remark-upload-button")
            if ($remarkUploadButton.length === 0) return false;
            var $remarkLayer = $eTarget.findUp(".js-remark-layer");
            ItemRemark.clickFileUpload($remarkLayer);
            return true;
        }

        function isListItemAndAction() {
            var $listItem = $eTarget.findUp(".list-item");
            if ($listItem.length === 0) return false;
            var projectSrno = $eTarget.closest('li').attr('data-project-srno');
            var postSrno = $listItem.parent().attr('data-post-srno');
            PostPopup.togglePostView(projectSrno, postSrno, "", function () {
                $("#detailUl").find(".highlight").removeClass("highlight");
                $listItem.addClass("highlight");
            });
            $listItem.find(".js-indication").css("display", "none");
            return true;
        }

        function isPostMoreButtonAndAction() {
            if (!$eTarget.is("#postMoreButton")) return false;
            $eTarget.parents(".detail-item").find("#summaryPost, #postMoreButton, #summaryFoldArea").css('display', 'none');
            $eTarget.parents(".detail-item").find("#originalPost").css('display', 'block');
            return true;
        }

        function isPinnedAndAction() {
            if (!$eTarget.is("#pinToTopBnt")) return false;
            if ($eTarget.findUp(".js-pin-authority").length === 0) {
                Often.toast("error", "프로젝트 관리자 + 글 작성 본인만 상단고정 설정/해제 가능합니다.");
                return true;
            }
            var isPin = $eTarget.hasClass('on');
            var inputData = {COLABO_SRNO: projectSrno, COLABO_COMMT_SRNO: projectCommSrno}
            PopupDraw.drawConfirm({
                contents: {main: i18next.t('front.alert.pinPost', {status: isPin ? '$t(dictionary.unPin)' : '$t(dictionary.pin)'})},
                callback: {submit: executePin}
            });

            function executePin() {
                UpdateElements.autoUpdateElem({
                    PROJECT_SRNO: projectSrno,
                    POST_SRNO: projectCommSrno,
                    PIN_MODE: isPin ? "DELETE" : "PIN",
                });

                if (isPin) {
                    Ajax.executeApi(RestApi.DELETE.COLABO2_PIN_D001, inputData, function () {
                        Often.toast("success", i18next.t('front.alert.successfullyChange', {status: '$t(dictionary.change)'}))
                        $eTarget.removeClass('on');
                    })
                    return true;
                }

                inputData.packetOption = Ajax.OPTION.PREVENT_EXECUTE;

                Ajax.executeApi(RestApi.POST.COLABO2_PIN_C001, inputData, function () {
                    var beforeRemarkSrno = $eTarget.parents(".detail-item").find(".remark-item:last").attr("remark-srno");
                    UpdateElements.autoUpdateElem({
                        PROJECT_SRNO: projectSrno,
                        POST_SRNO: projectCommSrno,
                        REMARK_SRNO: beforeRemarkSrno,
                        REMARK_UPDATE: true,
                    });
                    Often.toast("success", i18next.t('front.alert.successfullyChange', {status: '$t(dictionary.change)'}))
                    $eTarget.addClass('on')
                })
                return true;
            }
        }

        function setSlickOnSummaryImage() {
            var $detailItem = $("#postPopup").find(".detail-item");
            var isSummaryMode = ($detailItem.find("#postMoreButton").length > 0);
            if (isSummaryMode) {
                applySummarySlickImage();
            }
        }

        function isSettingButtonAndAction() {
            var $settingButton = $eTarget.findUp(".js-setting-button");
            if ($settingButton.length === 0) return false;
            if ($settingButton.next().is(":visible")) {
                $settingButton.next().fadeOut(200);
            } else {
                $settingButton.next().fadeIn(200);
            }
            return true;
        }

        function isSettingUlAndAction() {
            var $settingItem = $eTarget.findUp(".js-setting-item");
            if ($settingItem.length === 0) return false;
            var code = $settingItem.attr('data-code');
            var $detailItem = $eTarget.findUp(".detail-item");
            var projectSrno = Often.null2Void($detailItem.attr('data-project-srno'));
            var postSrno = Often.null2Void($detailItem.attr('data-post-srno'));
            var postUrl = Often.null2Void($detailItem.attr("data-post-url"));
            var isVcSchd = Often.null2Void($detailItem.find("#videoSpan").attr("data-vc-srno"), "0") !== "0";
            var isPostPopup = $("#postPopup").is(":visible");
            if (code === 'modify' || code === 'copy') {
                var isCopy = (code === 'copy');
                var isModify = (code === 'modify');
                if (isCopy && isVcSchd) {
                    Often.toast('error', i18next.t('front.alert.shareVideoMeetingWarning'))
                    return;
                } else if (isModify && isVcSchd) {
                    LocalUtil.setLocal("VC_SRNO", $detailItem.find("#videoSpan").attr("data-vc-srno"));
                }
                if (isPostPopup && postSrno === PostPopup.getData().POST_SRNO) {
                    PostPopup.getPostData(projectSrno, postSrno, "", true, function () {
                        PostPopup.openEditView(isCopy);
                    });
                } else {
                    PostPopup.togglePostView(projectSrno, postSrno, "", function () {
                        PostPopup.openEditView(isCopy);
                    })
                }
            } else if (code === 'delete') {
                deletePost(projectSrno, postSrno);
            } else if (code === 'url') {
                Often.copyUrl(postUrl);
            }
            $eTarget.findUp(".js-setting-ul").fadeOut(200);
            return true;
        }

        function isPostFileAndAction() {
            var $popupBefore = $eTarget.findUp(".js-popup-before")
            var isViewType = ($popupBefore.attr("data-code") === "VIEW");
            var isRemarkLayer = $eTarget.findUp(".js-remark-layer").length > 0;
            if (!isViewType || isRemarkLayer) return false;
            var $postFile = $eTarget.findUp(".js-post-file");
            if ($postFile.length === 0) return false;
            var $detailItem = $postFile.findUp(".detail-item");
            var isDownLoadButton = $eTarget.findUp(".js-down-btn").length > 0;
            var randKey = $postFile.attr("rand_key");
            var isExternalFile = (randKey === "GOOGLEDRIVE" || randKey === "DROPBOX");
            var fileJson = Often.getAttrs($postFile)
            fileJson[0].COLABO_SRNO = $detailItem.attr("data-project-srno");
            fileJson[0].COLABO_COMMT_SRNO = $detailItem.attr("data-post-srno");
            var atchUrl = fileJson[0]["ATCH_URL"];
            if (isExternalFile) {
                //Todo. 구글드라이브, 드롭박스는 CNTN에서 COMP_JSON으로 저장시 ATCH_SRNO = 0 인 이슈가 존재함.
                FileUtil.downFile(atchUrl, isExternalFile)
                return true;
            }
            var fileMode = (isDownLoadButton || isExternalFile) ? "SAVE" : "DOC-VIEWER";
            FileUtil.openFile(fileMode, fileJson);
            return true;
        }

        function isHyperButtonAndAction() {
            var $popupBefore = $eTarget.findUp(".js-popup-before")
            var isViewType = ($popupBefore.attr("data-code") === "VIEW");
            if (!isViewType) return false;

            event.preventDefault();
            var $hyperButton = $eTarget.findUp(".js-hyper-button");
            if (!$hyperButton || $hyperButton.length === 0) return false;
            var url = $hyperButton.text();
            if (UrlCatcher.isProjectInviteUrlAndAction(url)) return true;
            if (UrlCatcher.isPostUrlAncAction(url)) return true;

            if (Electron.isElectronApp()) {
                Electron.openExternalLinkforElectron(url);
            } else {
                OpenUtil.openWindow(url, "_blank");
            }
            return true;
        }

        function isVideoConferenceButtonAndAction() {
            var isViewType = $eTarget.findUp(".js-popup-before").attr("data-code") === "EDIT";
            if (isViewType) return;

            if ($eTarget.parents("#videoButton").length > 0) $eTarget = $("#videoButton");
            var isVideoConfButton = $eTarget.findUp('#zoomButton');
            if (isVideoConfButton.length === 0) return false;
            var VC_SRNO = $eTarget.findUp('#videoSpan').attr('data-vc-srno');
            VideoConference.getZoomUrl(VC_SRNO, true);
        }

        function isVideoConferenceCopyUrlButtonAndAction() {
            var isZoomUrlButton = $eTarget.findUp('#zoomUrlCopy');
            if (isZoomUrlButton.length === 0) return false;
            var VC_SRNO = $eTarget.findUp('#videoSpan').attr('data-vc-srno');
            VideoConference.getZoomUrl(VC_SRNO, false, function (url) {
                Often.copyUrl(url);
            });
        }

        function isOpenUpTask() {
            var $upTaskButton = $eTarget.findUp(".js-up-task-button");
            if (!$upTaskButton || $upTaskButton.length === 0) return false;
            var projectSrno = $upTaskButton.attr("data-up-task-project-srno");
            var postSrno = $upTaskButton.attr("data-up-task-post-srno");
            PostPopup.togglePostView(projectSrno, postSrno);
            return true;
        }

        function isOpenProjectButtonAndAction() {
            var $projectTitleButton = $eTarget.findUp(".js-project-title-button");
            if (!$projectTitleButton || $projectTitleButton.length === 0) return false;
            var projectSrno = $projectTitleButton.findUp(".js-popup-before").attr("data-project-srno");
            ViewChanger.loadPageJson({code: "detail", first: projectSrno});
            return true;
        }
    }

    function applySummarySlickImage() {
        var $postImages = $(".js-post-img.post-upload-img");
        if ($postImages.length > 0) {
            $("#postPopup").css("display", "block");
            $.each($postImages, function (i, v) {
                if ($(v).hasClass("slick-initialized")) return;
                $(v).slick({
                    lazyLoad: "ondemand",
                    slidesToShow: 5,
                    slidesToScroll: 1,
                    centerMode: false,
                    centerPadding: 0,
                    infinite: false,
                })
            });
        }
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
            }, function (dat) {
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

    function clickDetailTab(e) {
        var $eTarget = $(e.target);
        var $tabItem = $eTarget.findUp(".js-tab-item");
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

    function clickCreatePostArea(e) {
        var $eTarget = $(e.target);
        var $createPostArea = $(e.currentTarget);
        var $postFilter = $eTarget.findUp(".post-filter");
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

        var $feedTypeButtonId = $eTarget.findUp("#feedTypeButton");
        var $feedTypeButton = $eTarget.findUp(".feed-type-button");
        var $feedFilterButton = $eTarget.findUp(".js-feed-filter-button");
        var $feedFilterLayer = $(e.currentTarget).find(".js-feed-filter-layer");
        var $checkMenuItem = $eTarget.findUp(".check-menu-item");

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
        if ($(e.target).findUp(".section-title-area").length === 0) return;
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

    function isProjectInviteUrl(url) {
        var myOrigin = '(' + location.origin + ')';
        var flowCloudServiceOrigin = '((https:\/\/)([a-zA-Z0-9_-].)*(flow.team))';
        var isInvite = url.indexOf("Invite") > -1;
        var inviteKey = isInvite ? '(\/Invite\/([a-zA-Z0-9])+)' : '(\/Invitation\/([a-zA-Z0-9])+)';
        var flowProjectInviteUrlRegexp;
        var cloudServiceOriginRegexp = /((https:\/\/)([a-zA-Z0-9_-].)*(flow.team))/;
        if (cloudServiceOriginRegexp.test(location.origin)) {
            flowProjectInviteUrlRegexp = "((" + flowCloudServiceOrigin + "|" + myOrigin + ")" + inviteKey + ")";
        } else {
            flowProjectInviteUrlRegexp = "(" + myOrigin + inviteKey + ")";
        }
        var flowInviteUrlRegexp = new RegExp(flowProjectInviteUrlRegexp, 'gi');
        return flowInviteUrlRegexp.test(url);
    }

    function isHiddenComponentAndAction($eTarget) {
        var $hiddenComponent1 = $eTarget.findUp(".js-hidden-component");
        /**
         * var $hiddenComponent2 = $(window.getSelection().focusNode.parentNode);
         * 현재 create box의 마진을 선택시 selection을 제대로 가져오지 못하기 때문에 마진쪽을 패딩으로 변경해야 함
         */

        if ("VIEW" === Detail.getPostStatus()) return false;
        if ($hiddenComponent1.length === 0) return false;
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
})();
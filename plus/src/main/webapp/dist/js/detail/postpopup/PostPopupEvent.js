var PostPopupEvent = (function () {

    var $mouseDownStartObj;

    return {
        keydownPopupArea: keydownPopupArea,
        keyupPopupArea: keyupPopupArea,
        KeyDownContentsArea: KeyDownContentsArea,
        clickPopupArea: clickPopupArea,
        mouseDownPopupArea: mouseDownPopupArea,
        hideAllInnerPopup: hideAllInnerPopup,
        mouseUpPopupArea: mouseUpPopupArea,
        scrollHideAndRemovePopupLayer: scrollHideAndRemovePopupLayer,
        addScrollFixed: addScrollFixed,
    }

    function keydownPopupArea(e) {
        var $eTarget = $(e.target);
        var $postPopup = $(e.currentTarget);
        var focusSelection = window.getSelection();
        var $focusNode = $(focusSelection.focusNode);
        var $parentNode = $focusNode.parent();

        var isEnterKey = KeyCheck.isKey(e, "ENTER");

        if (isEnterKey && $eTarget.is("#postTitle")) {
            e.preventDefault();
            return;
        }

        if (KeyCheck.isSelectAllCommand(e) && $eTarget.findUp(".js-upload-area").length > 0) {
            selectTextNode(e, $eTarget.findUp(".js-upload-area:visible"), "create-box");
            return;
        }

        // 포커스가 contenteditable html태그로 잡히게 될 경우 태그 자체를 지워버리는 이슈
        if ($focusNode.hasClass("create-box") && $parentNode.hasClass("js-upload-area")) return false;
        if (KeyCheck.isKey(e, "BACK") || KeyCheck.isKey(e, "DELETE")) {
            if (isCreateBoxAndAction()) return e.preventDefault();
            if (Often.isBrowser("ie")) return isHashAndMentionAndRemove();
        }

        if (SubtaskKeyEvent.KeyDownSubtaskInput(e)) return;
        StyleTag.keyDownCheck(e);

        if ($postPopup.find("#innerCommonHashTagPopup").is(":visible")) {
            return HashTag.keyDownArrow(e);
        } else if (isEnterKey) { // 태그 팝업이 없고, Enter를 눌렀을 때
            HashTag.clearHashTag();
        }
        
        // 멘션 팝업이 있을 때
        if ($postPopup.find("#innerCommonPopup[data-code=mention]").is(":visible")) {
            return Mention.keyDownArrow(e);
        } else if (isEnterKey) { // 멘션 팝업이 없고, Enter를 눌렀을 때
            Mention.clearMention();
        }
        ItemTodo.keydownTodoInput(e);
        ItemSchedule.keyDownScheduleInput(e);

        if (KeyCheck.isKey(e, "TAB")) {

            if ($eTarget.is("#postTitle")) {
                $postPopup.find(".js-upload-area").focus();
                return;
            }

            if ($eTarget.findUp(".js-upload-area").length > 0) {
                //Todo. 탭 동작에 따른 두칸 띄기를 만들어보자.
                return;
            }
        }

        if (KeyCheck.isKey(e, "ESC")) {
            if (DocumentEvent.closeStepByStep()) return;
            var isHiding = hideAllInnerPopup(e);
            var isHidingScheduleMap = ItemSchedule.keyDownCheckPlaceInput(e);
            var isSubtaskInputFocus = ItemSubtask.isSubtaskInputFocus(e);
            if (!isHiding && !isHidingScheduleMap && !isSubtaskInputFocus) {
                PostPopup.checkWritingAndShowPopup(PostPopup.removePopup);
            }
        }

        function isCreateBoxAndAction() {
            if (!focusSelection.focusNode) return;
            var nodeName = Often.null2Void(focusSelection.focusNode.nodeName, "");
            var $targetNode = (nodeName === "#text" ? $parentNode : $focusNode);

            var isEmptyText = $.trim($targetNode.text()).length === 0;
            var isCreateBoxAfter = isCreateComponent();
            var isEmptyNodeAfter = isNoComponent();
            var isExistNodeAfter = isExistComponent();
            var isCreateBoxAfterOffset = isTargetOffset();
            if ((isCreateBoxAfter || isEmptyNodeAfter)) {
                if (isEmptyText) {
                    $targetNode.attr({
                        "class": "js-hidden-component hidden-component",
                        "contenteditable": "false"
                    }).html("&nbsp;"); // component 사이 공백 지울때 사용
                } else if (isCreateBoxAfterOffset) {
                    return true;
                }
            } else if (isExistNodeAfter) {
                if (isEmptyText) {
                    $targetNode.remove();
                    return true;
                } else if (isCreateBoxAfterOffset) {
                    return true;
                }
            }

            // 앞 뒤로 create box 있을 때
            function isCreateComponent() {
                var isTextNode = nodeName === "#text";
                var isDivNode = nodeName === "DIV";
                return (isTextNode && isCreateBox($parentNode) || (isDivNode && isCreateBox($focusNode)))

                function isCreateBox($target) {
                    var isBeforeCreateBoxClass = $target.prev().hasClass("create-box");
                    var isAfterCreateBoxClass = $target.next().hasClass("create-box");
                    return (isBeforeCreateBoxClass && isAfterCreateBoxClass);
                }
            }

            // 한 쪽은 no component 한 쪽은 create box 일 때
            function isNoComponent() {
                return (isNoComponentAndCreateBox($parentNode)) || (isNoComponentAndCreateBox($focusNode));

                function isNoComponentAndCreateBox($target) {
                    var isBeforeNoComponent = ($target.prev().length === 0);
                    var isAfterNoComponent = ($target.next().length === 0);
                    var isBeforeCreateBoxClass = $target.prev().hasClass("create-box");
                    var isAfterCreateBoxClass = $target.next().hasClass("create-box")
                    return (isBeforeNoComponent && isAfterCreateBoxClass) || (isAfterNoComponent && isBeforeCreateBoxClass);
                }
            }

            // 한 족은 div component 한 쪽은 create box 일 때
            function isExistComponent() {
                return (isExistComponentAndCreateBox($parentNode) || isExistComponentAndCreateBox($focusNode));

                function isExistComponentAndCreateBox($target) {
                    var isBeforeExistComponent = ($target.prev().length > 0);
                    var isAfterExistComponent = ($target.next().length > 0);
                    var isBeforeCreateBoxClass = $target.prev().hasClass("create-box");
                    var isAfterCreateBoxClass = $target.next().hasClass("create-box")
                    return (isAfterExistComponent && isBeforeCreateBoxClass) || (isBeforeExistComponent && isAfterCreateBoxClass);
                }
            }

            // targetNode의 시작점과 끝점 찾기
            function isTargetOffset() {
                var isBackKey = KeyCheck.isKey(e, "BACK");
                var isDelKey = KeyCheck.isKey(e, "DELETE");
                var anchorOffset = focusSelection.anchorOffset;
                var focusOffset = focusSelection.focusOffset;
                var isNotDragText = focusSelection.isCollapsed;
                return isNotDragText && ((isBackKey && focusOffset === 0) || (isDelKey && anchorOffset === $targetNode.text().length))
            }
        }

    }

    function keyupPopupArea(e) {
        var $postPopup = $(e.currentTarget);
        var $eTarget = $(e.target);
        var $contentEditable = $eTarget.findUp(".js-upload-area[contenteditable=true]")

        ItemSchedule.keyUpScheduleInput(e);
        ItemTodo.keyUpTodoInput(e);
        SubtaskKeyEvent.keyUpSubtaskInput(e);

        if ($contentEditable.length === 0) return;
        if (SpaceSelectable.isSharePost($postPopup)) return;

        HashTag.keyUpCheckHashTag(e);
        Mention.keyUpCheckMention(e);
        StyleTag.keyUpCheck(e);
    }

    function mouseDownPopupArea(e) {
        $mouseDownStartObj = $(e.target);
        var $postPopup = $(e.currentTarget);
        if ($postPopup.find("#postCntn").is(":visible")) StyleTag.mouseDownCheck(e);
    }

    function mouseUpPopupArea(e) {
        var $postPopup = $(e.currentTarget);
        if ($postPopup.find("#postCntn").is(":visible")) StyleTag.mouseUpCheck(e);
    }

    function clickPopupArea(e) {
        var $eTarget = $(e.target);
        var $postPopup = $(e.currentTarget);
        var $fileButton = $eTarget.findUp(".js-file-button")
        if ('Y' === Often.null2Void($postPopup.find(".js-complete-btn").attr('data-wait-yn'), 'N')) {
            Often.toast("error", i18next.t('front.common.wait'));
            return;
        }

        Caret.setLastFocusNode();
        hideAllInnerPopup(e);

        if (isBackAreaOrCloseButtonAndAction($eTarget)) return;

        if (Often.isAct("subscreen")) {
            if (isOpenPostAndAction($eTarget)) return;
            return;
        }

        if (isPrivateButtonAndAction($eTarget)) return;
        if (isPrivateOptionAndAction($eTarget)) return;
        if (isFileButtonAndAction($fileButton)) return;
        if (isFileOptionAndAction($eTarget)) return;
        if (isMapButtonAndAction($eTarget)) return;
        if (isCompDeleteButtonAndAction($eTarget)) return;
        if (isCompleteBtnAndAction($eTarget)) return;
        if (isMovePostAndAction($eTarget)) return;
        if (ItemTodo.isTodoClickOnPostPopup($eTarget)) return;
        if (ItemRemark.isStickyRemarkAreaAndAction($eTarget)) return;

        function isBackAreaOrCloseButtonAndAction($eTarget) {
            var isCloseButton = $eTarget.findUp(".btn-close").length > 0;
            var isCancelButton = $eTarget.findUp(".cancel-button").length > 0;
            var isBackArea = $eTarget.hasClass("back-area") && $mouseDownStartObj.hasClass("back-area");
            if (!isBackArea && !isCloseButton && !isCancelButton) return false;
            if (Often.isAct("subscreen") && Electron.isElectronApp()) {
                self.close();
                return;
            }
            PostPopup.checkWritingAndShowPopup(PostPopup.removePopup)
            return true;
        }

        function isCompDeleteButtonAndAction($eTarget) {
            var $delBtn = $eTarget.findUp(".js-del-btn");
            if ($delBtn.length === 0) return false;
            var $uploadArea = $delBtn.parents(".js-upload-area");
            var $createBox = $delBtn.parents(".create-box");
            var isDragging = $uploadArea.find(".document-item-highlight").length > 0;
            !isDragging && $uploadArea.sortable("destroy");
            var beforeHiddenComponent = $createBox.prev(".js-hidden-component");
            var beforeCreateBox = beforeHiddenComponent.prev(".create-box");
            var afterHiddenComponent = $createBox.next(".js-hidden-component");
            var afterCreateBox = afterHiddenComponent.next(".create-box");
            (beforeHiddenComponent.length > 0 && beforeCreateBox.length === 0) && beforeHiddenComponent.remove();
            (afterHiddenComponent.length > 0 && afterCreateBox.length === 0) && afterHiddenComponent.remove();
            $delBtn.parents('.create-box').remove();
            return true;
        }

        function isCompleteBtnAndAction($eTarget) {
            var $completeBtn = $eTarget.findUp(".js-complete-btn");
            if ($completeBtn.length === 0) return false;
            if (isValidateBeforeSubmit()) return false;
            if (UploadHandler.isUploadingAndCallback(submitPostCallback)) return true;

            function submitPostCallback() {
                $postPopup.find(".js-complete-btn").text(i18next.t('front.common.saving')).attr('data-wait-yn', 'Y');
                $completeBtn.hasClass("create-button") ? submitAddView() : submitEditView();
            }
        }

        function isValidateBeforeSubmit() {
            var isWrite = $postPopup.find(".js-post-nav").hasClass("write");
            var isWrite2 = $postPopup.find(".js-post-nav").hasClass("write2");
            var isTodo = $postPopup.find('.js-post-nav').hasClass('todo');
            var checkJson;
            if (isWrite || isWrite2) {
                checkJson = Validation.checkEditable($postPopup.find(".js-upload-area"), true);
            } else {
                checkJson = Validation.checkInput($postPopup.find("#postTitle"), true);
                if (isTodo && ItemTodo.checkTodoValue($postPopup.find(".js-content-area"))) return true;
            }
            return Object.keys(Often.null2Void(checkJson)).length > 0;
        }

        function isMapButtonAndAction($eTarget) {
            var $mapButton = $eTarget.findUp(".js-map-button");
            if ($mapButton.length === 0) return false;
            $mapButton.toggleClass("active");
            var isOptionVisible = $mapButton.next().is(":visible");
            if (isOptionVisible) {
                $mapButton.next().fadeOut(200);
                return;
            }

            $mapButton.next().fadeIn(200);
            var $placeInput = $mapButton.next().find("input");
            $placeInput.val("").focus();
            return true;
        }

        function isFileButtonAndAction($fileButton) {
            if ($fileButton.length === 0) return false;
            $fileButton.toggleClass("active")
            var isOptionVisible = $fileButton.next().is(":visible");
            if (isOptionVisible) $fileButton.next().fadeOut(200);
            else $fileButton.next().fadeIn(200);
            return true;
        }

        function isFileOptionAndAction($eTarget) {

            Caret.captureIndex();
            var $fileOption = $eTarget.findUp(".js-file-option");
            if ($fileOption.length === 0) return false;

            if (Often.isFunc(Func.CLOUD.UPLOAD_PREVENT)) {
                Often.toast('info', i18next.t('front.alert.adminRestriction'));
                return true;
            }

            var uploadCode = Often.null2Void($fileOption.attr('data-upload'));

            if ("pc" === uploadCode) {
                Upload.uploadFile("any", uploadOneFileCallback);
            } else if ("gdrive" === uploadCode) {
                GoogleDrive.openGoogleDrive("", uploadFilesCallback);
            } else if ("dropbox" === uploadCode) {
                DropboxDrive.openDropboxDrive(uploadFilesCallback);
            } else if ("flowdrive" === uploadCode) {
                if (LimitGuest.isLimitGuest("flowdrive", false)) return;
                FileUtil.openFlowDrive("POST");
            }

            $fileOption.parent().fadeOut(200);
            $fileOption.parent().prev().removeClass("active");
            return true;

            function uploadOneFileCallback(fileData) {
                PostAppend.appendFileOrImg($eTarget, fileData);
            }

            function uploadFilesCallback(fileDataArray) {
                fileDataArray.forEach(uploadOneFileCallback)
            }
        }

        function isPrivateButtonAndAction($eTarget) {
            var $privateButton = $eTarget.findUp(".private-button");
            if ($privateButton.length === 0) return false;
            var isSrchAuth = "Y" === LocalUtil.getProjectSrchAuthYn();
            var isIamProjectManager = "Y" === LocalUtil.getProjectManagerYn();
            if (isSrchAuth && !isIamProjectManager) {
                Often.toast("error", "관리자 + 글 작성 본인만 조회 가능한 프로젝트입니다. (문구변경 예정)")
                return;
            }
            $privateButton.next().fadeIn(200);
            return true;
        }

        function isPrivateOptionAndAction($eTarget) {
            var $jsPrivateOption = $eTarget.findUp(".js-private-option");
            if ($jsPrivateOption.length === 0) return false;
            var $createPostOption = $jsPrivateOption.parents('ul');
            var $privateButton = $createPostOption.prev();
            var privateClass = $jsPrivateOption.attr("data-private");
            var privateText = $jsPrivateOption.text();
            $privateButton.removeClass("full").removeClass("admin").addClass(privateClass).text(privateText);
            $createPostOption.fadeOut(200);
            return true;
        }

        function isMovePostAndAction($eTarget) {
            var $movePost = $eTarget.findUp("#movePost");
            if ($movePost.length === 0) return false;
            var $detailItem = $movePost.parents(".js-popup-before");
            var projectSrno = $detailItem.attr("data-project-srno");
            var postSrno = $detailItem.attr("data-post-srno");
            $("#alarmLayer").css("display", "none");
            ViewChanger.loadPageJson({
                code: "detail",
                first: projectSrno,
                second: postSrno,
            });
            return true;
        }

        function isOpenPostAndAction($eTarget) {
            var $movePost = $eTarget.findUp("#movePost");
            if ($movePost.length === 0) return false;
            var $detailItem = $movePost.parents(".js-popup-before");
            var projectSrno = $detailItem.attr("data-project-srno");
            var postSrno = $detailItem.attr("data-post-srno");
            OpenUtil.openWindow(Often.getLocOrigin() + "/main.act?detail/" + projectSrno + "/" + postSrno);
            self.close();
            return true;
        }
    }

    function hideAllInnerPopup(event) {

        var eventType = event.type;
        var $eTarget = $(event.target);
        var $postPopup = $(event.currentTarget);
        var isHiding = false;

        if ("click" === eventType) {
            if (!isExistObj("#innerCommonPopup")) hideObj("#innerCommonPopup");
            if (!isExistObj(".js-file-button")) hideObj(".js-file-menu");
            if (!isExistObj(".js-image-button")) hideObj(".js-image-menu");
            if ((!isExistObj(".js-map-button") || !isExistObj(".js-map-menu"))
                && $eTarget.findUp(".js-map-menu").length === 0
                && $mouseDownStartObj && $mouseDownStartObj.findUp(".js-map-menu").length === 0) hideObj(".js-map-menu");
            if (!isExistObj(".js-setting-button")) hideObj(".js-setting-ul");
            if (!isExistObj(".js-worker-layer") && !isExistObj(".js-worker-button")) $postPopup.find(".js-worker-layer[data-subtask-yn=N]").remove();
            if (!isExistObj(".js-worker-layer") && !isExistObj(".js-worker-button")) $postPopup.find(".js-worker-layer[data-subtask-yn=Y]").remove();
            if (!isExistObj(".js-priority-event")) hideObj(".js-priority-layer .js-priority-setting-layer");
            if (!isExistObj(".js-subtask-menu") && !isExistObj(".subtask-button")) ItemSubtask.closeSubtaskPopup();

            hideObj(".create-post-option");
        } else if ("keydown" === eventType) {
            var $innerPopup = $postPopup.find("#innerCommonPopup");
            if ($innerPopup.is(":visible") && $innerPopup.attr('data-code') !== 'mention') {
                $innerPopup.css('display', 'none');
                isHiding = true;
            }
            [".js-file-menu", ".js-image-menu", ".js-map-menu", ".js-setting-ul", ".create-post-option"].forEach(hideObj)
        } else {
            //pass
        }

        return isHiding;

        function isExistObj(sizzleName) {
            return $eTarget.findUp(sizzleName).length > 0
        }

        function hideObj(sizzleName) {
            var $targetObj = $postPopup.find(sizzleName);
            sizzleName = sizzleName.replace("-menu", "-button");
            if ($targetObj.is(":visible")) {
                $targetObj.css('display', 'none');
                var $tempObj = $postPopup.find(sizzleName);
                ($tempObj.length > 0) && $tempObj.removeClass('active')
                isHiding = true;
            }
        }
    }

    function scrollHideAndRemovePopupLayer() {
        var $workerPopup = $("#workerPopup:visible");
        var $flatpickrCalendar = $(".flatpickr-calendar:visible");
        var $taskPrioritySettingLayer = $(".js-priority-setting-layer:visible");

        $workerPopup && $workerPopup.remove();
        $flatpickrCalendar && $flatpickrCalendar.remove();
        $taskPrioritySettingLayer && $taskPrioritySettingLayer.css("display", "none");
        ItemSubtask.closeSubtaskPopup();
    }

    function addScrollFixed(e) {
        var $postPopup = $("#postPopup");
        if (!$postPopup.is(":visible")) return;
        var $eTarget = e ? $(e.target) : $postPopup.find(".post-card-scroll"); //resize에서 호출시 false
        var scrollTop = $eTarget.scrollTop();
        var innerHeight = $eTarget.innerHeight();
        var scrollHeight = $eTarget.prop('scrollHeight');
        var $remarkLayer = $postPopup.find(".js-edit-layer");

        if (scrollTop + innerHeight >= scrollHeight) {
            $remarkLayer.removeClass("sticky");
        } else {
            if (!isEmptyRemarkContents($remarkLayer)) return;
            $remarkLayer.addClass("sticky");
        }

        function isEmptyRemarkContents($remarkLayer) {
            var $remarkUploadFile = $remarkLayer.find(".js-remark-upload-file li");
            var $remarkUploadImg = $remarkLayer.find(".js-remark-upload-img li");
            var $remarkInput = $remarkLayer.find(".js-remark-area");

            return $remarkUploadFile.length === 0 &&
                $remarkUploadImg.length === 0 &&
                $.trim($remarkInput.text()) === "";
        }
    }

    function KeyDownContentsArea(e) {

        var $uploadArea = $(e.currentTarget).find(".js-upload-area");
        if ($uploadArea.length === 0) return;
        var uploadAreaNodes = $uploadArea[0].childNodes;
        if (uploadAreaNodes.length === 1 && (uploadAreaNodes[0].nodeName !== "DIV" && uploadAreaNodes[0].nodeName !== "BR")) {
            if (Often.isBrowser("ie")) return;
            if (!e.originalEvent.isComposing) return $(uploadAreaNodes[0]).wrap("<div></div>");
        }

        if (KeyCheck.isKey(e, "DELETE")) return checkFocusNodeAndDelete(e);

        /**
         * @description ContentEditable에서 빈 문자열을 Delete로 지우면 다음 열에 개행이 추가되기 때문에 개행 삭제 처리
         * Ex)
         *     $ = Delete Focus
         *
         *     1. Delete 전
         *     <div><br> $ </div>
         *     <div>Text</div>
         *
         *     2. Delete 후
         *     <div>Text<br></div>
         */
        function checkFocusNodeAndDelete(e) {
            var node = window.getSelection();
            var isAnotherNode = node.focusNode !== node.anchorNode;
            if (isAnotherNode) return;
            var isFocusContentArea = $(node.focusNode).hasClass("js-upload-area");
            if (isFocusContentArea) return e.preventDefault();
            var isDiv = node.focusNode && node.focusNode.nodeName === "DIV";
            var isOnlyBrNode = node.focusNode.childNodes.length === 1 && node.focusNode.childNodes[0].nodeName === "BR";
            if (isDiv) {
                var isNextSiblingCreateBox = $(node.focusNode.nextElementSibling).hasClass("create-box");
                if (isOnlyBrNode && !isNextSiblingCreateBox) {
                    e.stopPropagation();
                    e.preventDefault();
                    $(node.focusNode).remove();
                }
            }
        }
    }

    function initWait() {
        $("#postPopup").find(".js-complete-btn").text(i18next.t('dictionary.upload')).attr('data-wait-yn', 'N');
    }

    function submitAddView() {

        var dataCode = $("#postPopup").attr('data-code');
        var isWriteAnywhere = dataCode === DetailCode.WRITE_ANYWHERE.CODE;

        var $videoLi = $(".flow-project-make-1").find("#videoLi");
        var selectedProjectArray = SpaceSelectable.getSelectedProjectArray();
        var submitJson = JsonMaker.getPostJson();
        var isVideoConference = submitJson.SCHD_REC && $videoLi.find("#videoButton").hasClass("d-none") &&
            !$videoLi.find("#videoSpan").hasClass("d-none");

        if (isWriteAnywhere && selectedProjectArray.length === 0) {
            initWait();
            return Often.toast('info', i18next.t('front.alert.select', {val: '$t(dictionary.project)'}));
        }
        LocalUtil.removeLocal('VC_SRNO');
        isVideoConference ? commitWithVideoConference() : commit();

        function commitWithVideoConference() {
            VideoConference.getZoomToken({
                TYPE: "SCHEDULE",
                VC_TTL: submitJson.SCHD_REC[0].TTL,
            }, function (zoomData) {
                var VC_SRNO = Often.null2Void(zoomData.VC_SRNO, "0")
                LocalUtil.setLocal('VC_SRNO', VC_SRNO);
                commit();
                LocalUtil.removeLocal('VC_SRNO');
            }, initWait)
        }

        function commit() {
            if (!isExistTitleOrText(submitJson) || isCheckTextLength(submitJson)) {
                Often.toast("error", !isExistTitleOrText(submitJson)
                    ? i18next.t('front.alert.enterWord', {val: '$t(dictionary.context)'})
                    : "내용은 10000자 이내로 입력해주세요!");
                initWait();
                return;
            }

            if (isWriteAnywhere) {
                submitJson.COLABO_SRNO = selectedProjectArray[0].COLABO_SRNO;
            }

            if (Number(Often.null2Void(LocalUtil.getLocal("VC_SRNO"), '0')) > 0 && submitJson.SCHD_REC) {
                submitJson.SCHD_REC[0].VC_SRNO = LocalUtil.getLocal("VC_SRNO")
            }

            submitJson.packetOption = Ajax.OPTION.PREVENT_EXECUTE;
            Ajax.executeApi(RestApi.POST.COLABO2_COMMT_C101, submitJson, function (dat) {
                Often.toast("success", i18next.t('front.alert.successfullyChange', {status: '$t(dictionary.register)'}));
                UpdateElements.autoUpdateElem({
                    POST_MODE: "POST",
                    PROJECT_SRNO: dat.COLABO_SRNO,
                    POST_SRNO: dat.COLABO_COMMT_SRNO
                });
            }, initWait)
        }

        function isExistTitleOrText(submitJson) {
            var isWrite = $("#postPopup").find(".js-post-nav").hasClass("write2");
            if (!isWrite || submitJson.COMMT_TTL) return true;
            var compArray = JSON.parse(submitJson.CNTN).COMPS;
            var isExistText = false;
            compArray.forEach(function (v) {
                var compDetail = v.COMP_DETAIL;
                if (v.COMP_TYPE === "TEXT" && (compDetail.CONTENTS.trim() !== "" || compDetail.HASHTAGS.length !== 0 || compDetail.MENTIONS.length !== 0)) {
                    isExistText = true;
                    return;
                }
            })
            return isExistText;
        }

        function isCheckTextLength() {
            var isWrite = $("#postPopup").find(".js-post-nav").hasClass("write2");
            if (!isWrite) return false;
            var textLength = 0;
            var compArray = JSON.parse(submitJson.CNTN).COMPS;
            compArray.forEach(function (v) {
                var compDetail = v.COMP_DETAIL;
                if (v.COMP_TYPE !== "TEXT" || compDetail.CONTENTS.trim() === "") return true;
                textLength += compDetail.CONTENTS.length;
            })
            return textLength > 10000;
        }
    }

    function submitEditView() {

        var $postPopup = $("#postPopup");

        var isSharePost = SpaceSelectable.isSharePost($postPopup);
        var selectedProjectArray = SpaceSelectable.getSelectedProjectArray();

        var vcSrno = $postPopup.find("#videoSpan").attr("data-vc-srno");
        var isVideoSchd = $postPopup.find("#videoSpan").css("display") !== 'none' && VideoConference.isVC(vcSrno);

        var isSchedule = $postPopup.find(".create-post-nav").hasClass("schedule");
        var isTask = $postPopup.find(".create-post-nav").hasClass("task");
        var isSubtask = $postPopup.find(".create-post-nav").hasClass("subtask");

        var submitJson = JsonMaker.getPostJson();

        if (isSharePost) {
            if (selectedProjectArray.length === 0) return Often.toast('info', '최소 1개의 프로젝트를 선택하세요!');
            submitJson.COLABO_SRNO = "";
            submitJson.COLABO_COMMT_SRNO = "";
            submitJson.PRJ_REC = selectedProjectArray;
            if (isTask && submitJson.TASK_REC[0].WORKER_REC.length > 0) {
                submitJson.TASK_REC[0].WORKER_REC = [];
            }
            submitJson.packetOption = Ajax.OPTION.PREVENT_EXECUTE;
            Ajax.executeApi(RestApi.POST.COLABO2_COMMT_C101, submitJson, function (dat) {
                Often.toast("success", i18next.t('front.alert.successfullyChange', {status: '$t(dictionary.share)'}));
                PostPopup.removePopup();

                var currentProjectSrno = ViewChanger.getProjectSrno();
                selectedProjectArray.forEach(function (v) {
                    if (v.COLABO_SRNO === currentProjectSrno) UpdateElements.autoUpdateElem();
                })
            })
            return;
        }

        if (VideoConference.isVC(LocalUtil.getLocal("VC_SRNO"))) {
            // 화상회의 있던 일정 && 수정 후에도 화상회의 있음.
            if (isVideoSchd) {
                VideoConference.updateZoomToken({
                    VC_TTL: submitJson.SCHD_REC[0].TTL,
                    VC_SRNO: vcSrno
                }, updatePostApi(submitJson));
                return;
            }

            // 화상회의 있던 일정 && 수정 후에는 화상회의 없음.
            VideoConference.deleteZoomToken({VC_SRNO: vcSrno}, function () {
                submitJson.SCHD_REC[0].VC_SRNO = "0";
                updatePostApi(submitJson);
            })
            return;
        }

        // 화상회의 없던 일정 && 수정 후에는 화상회의 있음.
        if ($postPopup.find("#videoSpan:visible").length > 0) {
            VideoConference.getZoomToken({
                TYPE: "SCHEDULE",
                VC_TTL: submitJson.SCHD_REC[0].TTL,
            }, function (dat) {
                submitJson.SCHD_REC[0].VC_SRNO = dat.VC_SRNO
                updatePostApi(submitJson);
            });
            return;
        }

        updatePostApi(submitJson);

        function updatePostApi(submitJson) {
            Ajax.executeApi(RestApi.PUT.COLABO2_COMMT_U101, submitJson, function (dat) {
                Often.toast("success", i18next.t('front.alert.successfullyChange', {status: '$t(dictionary.edit)'}));
                UpdateElements.autoUpdateElem({
                    POST_MODE: "EDIT",
                    PROJECT_SRNO: dat.COLABO_SRNO,
                    POST_SRNO: dat.COLABO_COMMT_SRNO
                });

                if (isSubtask) {
                    UpdateElements.autoUpdateElem({
                        PROJECT_SRNO: submitJson.COLABO_SRNO,
                        POST_SRNO: submitJson.COLABO_COMMT_SRNO,
                        SUBTASK_DATA: submitJson.TASK_REC[0],
                    });
                }
                if (isSchedule) ItemSchedule.checkSendEditPush();
            }, initWait)
            LocalUtil.setLocal("VC_SRNO", "0");
        }
    }

    function isHashAndMentionAndRemove() {
        var focusNode = window.getSelection().focusNode;
        var focusParentNode = focusNode.parentNode;
        if ((focusNode.nodeName === "#text" && ($(focusNode).hasClass("mention-span") || $(focusNode).hasClass("hashtag-span"))) ||
            (focusParentNode.nodeName === "SPAN") && ($(focusParentNode).hasClass("mention-span") || $(focusParentNode).hasClass("hashtag-span"))) {
            return $(focusNode.parentNode).remove();
        }
    }

    function selectTextNode(e, $current, exceptClass) {
        var focusSelection = window.getSelection();
        var $focusNode = $(focusSelection.focusNode);
        var $parentNode = ($focusNode.context && $focusNode.context.nodeType === 3) ? $focusNode.parents("div") : $focusNode;

        var currentArea = $current[0];
        var focusIndex = -1;
        var exceptNodeArray = [];

        $.each(currentArea.childNodes, function (e, node) {
            if (node === $parentNode[0]) focusIndex = e;
            if ($(node).hasClass(exceptClass)) {
                exceptNodeArray.push(e);
                if (focusIndex > -1) return false;                  // FocusNode의 위치 다음 ExceptNode면 반복문 종료
            }
        });
        // ExceptNode가 없을 때는 Document.execCommand() 실행
        if (exceptNodeArray.length === 0) return;
        e.stopPropagation();
        e.preventDefault();
        var isFinalFocusNode = exceptNodeArray[exceptNodeArray.length - 1] < focusIndex;
        var startOffset;
        var endOffset;
        if (isFinalFocusNode) {                                  // 시작점이 ExceptNode이고, 끝까지 블록 지정
            startOffset = exceptNodeArray[exceptNodeArray.length - 1] + 1;
            endOffset = currentArea.childNodes.length;
        } else {
            if (exceptNodeArray.length > 1) {                    // 시작점이 ExceptNode이고, 다음 ExceptNode까지 블록 지정
                startOffset = exceptNodeArray[exceptNodeArray.length - 2] + 1;
                endOffset = exceptNodeArray[exceptNodeArray.length - 1];
            } else {                                             // currentArea 처음부터 첫번째 ExceptNode까지 블록 지정
                startOffset = 0;
                endOffset = exceptNodeArray[0];
            }
        }
        var currentRnage = document.createRange();
        currentRnage.setStart(currentArea, startOffset);
        currentRnage.setEnd(currentArea, endOffset);
        focusSelection.removeAllRanges();
        focusSelection.addRange(currentRnage);
    }

})()
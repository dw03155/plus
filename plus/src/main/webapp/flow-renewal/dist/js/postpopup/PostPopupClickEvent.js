var PostPopupClickEvent = (function () {

    var $mouseDownStartObj = $();

    return {
        mouseUpPopupArea: mouseUpPopupArea,
        mouseDownPopupArea: mouseDownPopupArea,
        clickPopupArea: clickPopupArea,
        getMouseDownStartObj: getMouseDownStartObj,
    }

    function getMouseDownStartObj() {
        return $mouseDownStartObj;
    }

    function mouseUpPopupArea(e) {
        if (!$(e.currentTarget).find("#postCntn").is(":visible")) return;
        StyleTag.mouseUpCheck(e);
    }

    function mouseDownPopupArea(e) {
        $mouseDownStartObj = $(e.target);
        if (!$(e.currentTarget).find("#postCntn").is(":visible")) return;
        if ($.isTarget(".subtask-input-area")) {
            e.stopPropagation(); //Note. document의 mousedown 전파되지 않도록!
        }
        StyleTag.mouseDownCheck(e);
    }

    /**
     * Detail - VIEW => 포스트 목록에서는 뷰모드만!
     * Popup - VIEW, ADD, EDIT, SHARE_POST => 포스트 팝업에서는 모든 모드 가능!
     */
    function clickPopupArea(e) {

        //top
        if ($(e.target).hasClass("back-area") && $mouseDownStartObj.hasClass("back-area")) return closePopup();
        if ($.isTarget(e, [".btn-close", ".cancel-button"])) return closePopup();
        if ($.isTarget(e, "#movePost")) return movePost(e); //VIEW

        //center
        if ($.isTarget(e, ".js-todo-remove-btn")) return ItemTodo.removeOneTodo(e);
        if ($.isTarget(e, ".js-del-btn")) return deleteComponent(e);

        //bottom
        if ($.isTarget(e, ".js-file-button")) return showFileOption(e);
        if ($.isTarget(e, ".js-file-option")) return selectFileMethod(e);
        if ($.isTarget(e, ".js-map-button")) return showGoogleMapInput(e);
        if ($.isTarget(e, ".private-button")) return showPrivateOption(e);
        if ($.isTarget(e, ".js-private-option")) return selectPrivateOption(e);
        if ($.isTarget(e, ".js-complete-btn")) return submitPost(e);
        if ($.isTarget(e, ".js-remark-area")) return ItemRemark.moveToRemarkBottom(e); //VIEW
    }

    function closePopup() {
        if (Often.isAct("subscreen") && Electron.isElectronApp()) return self.close();
        PostPopup.checkWritingAndShowPopup(PostPopup.removePopup);
    }

    function deleteComponent(e) {
        var $eTarget = $(e.target);
        var $delBtn = $eTarget.closest(".js-del-btn");
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
    }

    function submitPost(e) {
        var $eTarget = $(e.target);
        var $completeBtn = $eTarget.closest(".js-complete-btn");
        if (isValidateBeforeSubmit()) return;
        UploadHandler.isUploadingAndCallback(function () {
            var $postPopup = $("#postPopup");
            $postPopup.find(".js-complete-btn").text(i18next.t('front.common.saving')).attr('data-wait-yn', 'Y');
            $completeBtn.hasClass("create-button") ? submitAddView() : submitEditView();
        });
    }

    function isValidateBeforeSubmit() {
        var $postPopup = $("#postPopup");
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

    function showGoogleMapInput(e) {
        var $eTarget = $(e.target);
        var $mapButton = $eTarget.closest(".js-map-button");
        $mapButton.toggleClass("active");
        var isOptionVisible = $mapButton.next().is(":visible");
        if (isOptionVisible) {
            $mapButton.next().fadeOut(200);
            return;
        }

        $mapButton.next().fadeIn(200);
        var $placeInput = $mapButton.next().find("input");
        $placeInput.val("").focus();
    }

    function showFileOption(e) {
        var $eTarget = $(e.target);
        var $fileButton = $eTarget.closest(".js-file-button")
        $fileButton.toggleClass("active")
        var isOptionVisible = $fileButton.next().is(":visible");
        if (isOptionVisible) $fileButton.next().fadeOut(200);
        else $fileButton.next().fadeIn(200);
    }

    function selectFileMethod(e) {
        var $eTarget = $(e.target);
        Caret.captureIndex();
        var $fileOption = $eTarget.closest(".js-file-option");
        if (Often.isFunc(Func.CLOUD.UPLOAD_PREVENT)) {
            Often.toast('info', i18next.t('front.alert.adminRestriction'));
            return;
        }

        $fileOption.parent().fadeOut(200);
        $fileOption.parent().prev().removeClass("active");

        var uploadCode = Often.null2Void($fileOption.attr('data-upload'));

        if ("pc" === uploadCode) return Upload.uploadFile("any", uploadOneFileCallback);
        if ("gdrive" === uploadCode) return GoogleDrive.openGoogleDrive("", uploadFilesCallback);
        if ("dropbox" === uploadCode) return DropboxDrive.openDropboxDrive(uploadFilesCallback);
        if (LimitGuest.isLimitGuest("flowdrive", false)) return;
        if ("flowdrive" === uploadCode) return FileUtil.openFlowDrive("POST");

        function uploadOneFileCallback(fileData) {
            PostAppend.appendFileOrImg($eTarget, fileData);
        }

        function uploadFilesCallback(fileDataArray) {
            fileDataArray.forEach(uploadOneFileCallback)
        }
    }

    function showPrivateOption(e) {
        var $eTarget = $(e.target);
        var $privateButton = $eTarget.closest(".private-button");
        var isSrchAuth = "Y" === LocalUtil.getProjectSrchAuthYn();
        var isIamProjectManager = "Y" === LocalUtil.getProjectManagerYn();
        if (isSrchAuth && !isIamProjectManager) {
            Often.toast("error", "관리자 + 글 작성 본인만 조회 가능한 프로젝트입니다. (문구변경 예정)")
            return;
        }
        $privateButton.next().fadeIn(200);
    }

    function selectPrivateOption(e) {
        var $eTarget = $(e.target);
        var $jsPrivateOption = $eTarget.closest(".js-private-option");
        if ($jsPrivateOption.length === 0) return;
        var $createPostOption = $jsPrivateOption.parents('ul');
        var $privateButton = $createPostOption.prev();
        var privateClass = $jsPrivateOption.attr("data-private");
        var privateText = $jsPrivateOption.text();
        $privateButton.removeClass("full").removeClass("admin").addClass(privateClass).text(privateText);
        $createPostOption.fadeOut(200);
    }

    function movePost(e) {
        var $eTarget = $(e.target);
        var $movePost = $eTarget.closest("#movePost");
        var $detailItem = $movePost.parents(".js-popup-before");
        var projectSrno = $detailItem.attr("data-project-srno");
        var postSrno = $detailItem.attr("data-post-srno");
        $("#alarmLayer").css("display", "none");
        ViewChanger.loadPageJson({
            code: "detail",
            first: projectSrno,
            second: postSrno,
        });
    }


    function initWait() {
        $("#postPopup").find(".js-complete-btn").text(i18next.t('dictionary.upload')).attr('data-wait-yn', 'N');
    }

    function submitAddView() {

        var $postPopup = $("#postPopup");
        var dataCode = $postPopup.attr('data-code');
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
                    : i18next.t('front.alert.inputLimit', {length: 10000, subject: '$t(dictionary.context)'}));
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
            var isWrite = $postPopup.find(".js-post-nav").hasClass("write2");
            if (!isWrite || submitJson.COMMT_TTL) return true;
            var compArray = JSON.parse(submitJson.CNTN).COMPS;
            var isExistText = false;
            compArray.forEach(function (v) {
                var compDetail = v.COMP_DETAIL;
                if (v.COMP_TYPE === "TEXT" && (compDetail.CONTENTS.trim() !== "" || compDetail.HASHTAGS.length !== 0 || compDetail.MENTIONS.length !== 0)) {
                    isExistText = true;
                }
            })
            return isExistText;
        }

        function isCheckTextLength() {
            var isWrite = $postPopup.find(".js-post-nav").hasClass("write2");
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
            if (selectedProjectArray.length === 0) return Often.toast('info', i18next.t('front.alert.checkMoreThanOne'));
            submitJson.COLABO_SRNO = "";
            submitJson.COLABO_COMMT_SRNO = "";
            submitJson.PRJ_REC = selectedProjectArray;
            if (isTask && submitJson.TASK_REC[0].WORKER_REC.length > 0) {
                submitJson.TASK_REC[0].WORKER_REC = [];
            }
            submitJson.packetOption = Ajax.OPTION.PREVENT_EXECUTE;
            Ajax.executeApi(RestApi.POST.COLABO2_COMMT_C101, submitJson, function () {
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

})()
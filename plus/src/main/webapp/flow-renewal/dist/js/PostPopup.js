var PostPopup = (function () {

    var postData = {
        PROJECT_SRNO: '',
        POST_SRNO: '',
        POST_CODE: '',
        POST_RECORD: '',
        EDIT_DATA: '',
    }

    var $postPopup, $uploadArea, $popupBefore, $contentArea;

    return {
        setData: setData,
        getData: getData,
        getOnePostData: getOnePostData,
        getPostData: getPostData,

        openRegistrationView: openRegistrationView,
        openRegistrationViewOnAnywhere: openRegistrationViewOnAnywhere,
        openEditView: openEditView,
        togglePostView: togglePostView,

        initButtonByCode: initButtonByCode,
        checkWritingAndShowPopup: checkWritingAndShowPopup,
        removePopup: removePopup,
        addScrollSticky: addScrollSticky,
    }

    function set$element() {
        $postPopup = $("#postPopup"); //딤드+팝업
        $popupBefore = $postPopup.find(".js-popup-before"); //팝업=탭+콘텐츠+바텀
        $contentArea = $postPopup.find(".js-content-area"); //콘텐츠=제목+글입력부
        $uploadArea = $postPopup.find('.js-upload-area'); //글입력부

        /**
         *  <div id="mainBodyWrap"><div>
         *
         *  //ADD|EDIT
         *  <div id="postPopup" data-code="ADD|EDIT" data-before-view="NO_POP|POP">
         *      <div class="js-popup-before edit-item" data-code="ADD|EDIT|VIEW">
         *          <div class="js-dimd-layer" contenteditable="true"></div>
         *          <div class="js-post-nav write|write2|task|schedule|todo"></div>
         *          <div class="scroll-mask">
         *              <div id="postCntn" class="js-content-area">
         *                  <div class="js-upload-area js-paste-layer" contenteditable="true"><div>
         *              </div>
         *              <div id="postAttached"></div>
         *          </div>
         *      </div>
         *  </div>
         *
         *  //VIEW
         *  <div id="postPopup" data-code="VIEW">
         *      <li class="js-popup-before detail-item" data-code="VIEW">
         *          <div class="list-item js-post-nav"></div>
         *          <div class="card-item js-post-nav write|write2|task|schedule|todo side"></div>
         *          <div class="post-card-container">
         *              <div id="originalPost"></div>
         *              <div id="summaryPost">
         *                  <div id="postMoreButton"></div>
         *                  <div id="summaryFoldArea"></div>
         *              </div>
         *          </div>
         *          <div class="js-comment-area">
         *              <ul>
         *                  <li class="remark-item">
         *                      <div class="js-remark-view"></div>
         *                      <div class="js-remark-edit">
         *                          <form class="js-remark-form">
         *                              <div class="js-remark-area js-paste-layer" contenteditable="true"></div>
         *                          </form>
         *                      </div>
         *                  </li>
         *              </ul>
         *          </div>
         *          <div class="js-remark-layer js-edit-layer">
         *              <ul></ul>
         *          </div>
         *      </li>
         *  </div>
         */
    }

    function setData(json) {
        postData = $.extend({}, postData, json);
    }

    function getData() {
        return postData;
    }

    function openRegistrationViewOnAnywhere(postCode) {
        var viewId = ViewChanger.getCurrentPageId();
        var viewIdArray = viewId.split("/");
        var projectSrno = (viewIdArray.length > 1 ? viewIdArray[1] : "");
        return openRegistrationView(projectSrno, postCode, false);
    }

    function openRegistrationView(projectSrno, postCode, isOnTab) {
        postData.PROJECT_SRNO = projectSrno;
        postData.POST_CODE = postCode;
        postData.POST_RECORD = '';
        var isEmptyProject = ("" === Often.null2Void(projectSrno));
        if (isEmptyProject) {
            openWritingView({}, isOnTab, {
                mode: DetailCode.WRITE_ANYWHERE.CODE,
                selectable: true,
                maxSelection: 1,
                firstEditor: true,
            });
            return;
        }
        setPopProjectSetting(projectSrno, function () {
            openWritingView({}, isOnTab);
        })
    }

    /**
     * @param isCopy 글 복사 여부
     * @param $eTarget 특정 POST
     */
    function openEditView(isCopy, $detailItem) {
        var post = postData.POST_RECORD[0];
        postData = $.extend(postData, {
            PROJECT_SRNO: post.COLABO_SRNO,
            POST_SRNO: post.COLABO_COMMT_SRNO,
            POST_CODE: PostCondition.getPostCodeByData(post),
            EDIT_DATA: JsonMaker.getPostJson(),
        });

        if (isCopy) {
            var isPopupMode = $("#postPopup").is(":visible");
            if (isPopupMode) {
                checkWritingAndShowPopup(openCopyWritingView);
            } else {
                openCopyWritingView();
            }
            return;
        }
        checkWritingAndShowPopup(function () {
            openWritingView(post, '', {});
        })

        function openCopyWritingView() {
            openWritingView(post, '', {
                mode: DetailCode.SHARE_POST.CODE,
                selectable: true,
                maxSelection: 10,
                firstEditor: false,
            });
        }
    }

    function getRemarkUploadObj(isPopup, type) {
        var remarkUploadClass = ".js-edit-layer:visible .js-remark-upload-" + type + " li";
        var $remarkArray = $((isPopup ? "#postPopup " : "") + remarkUploadClass);
        return $remarkArray;
    }

    function getWritingRemarkObj(isPopup) {
        var isRemarkWriting = false;
        var returnObj = "";
        var $remarkInputArray = $((isPopup ? "#postPopup " : "") + ".js-remark-area:visible");
        $.each($remarkInputArray, function (i, v) {
            if (!isRemarkWriting && $.trim($(v).text()) !== "") {
                isRemarkWriting = true;
                returnObj = $(v);
            }
        });
        return returnObj;
    }

    function getWritingSubtaskObj(isPopup) {
        var isSubtaskWriting = false;
        var returnObj = "";
        var $subtaskLayer = $((isPopup ? "#postPopup " : "") + ".js-subtask-edit-layer:visible");
        $.each($subtaskLayer, function (i, v) {
            var isExistStatus = $(v).find(".js-subtask-status-button").attr("data_status") !== "0";
            var isExistInput = $.trim($(v).find(".js-subtask-input").val()).length !== 0;
            var isExistDate = $(v).find(".js-date-tooltip").attr("data_end_dt") !== "";
            var isExistPriority = $(v).find(".js-subtask-priority-layer").attr("data_priority") !== "";
            var isExistWorker = $(v).find(".js-subtask-worker-layer").attr("data_worker_id_list") !== "";
            if (isExistStatus || isExistInput || isExistDate || isExistPriority || isExistWorker) {
                isSubtaskWriting = true;
                returnObj = $(v).find(".js-subtask-input");
                return false;
            }
        })
        return returnObj;
    }

    /**
     *
     * @param callback - 실행함수
     * @param [checkMode] - 어떤 케이스에 체크하는지
     *      SIDE_POP (사이드팝열려있을시) || ADD_TAB (게시물 작성탭 전환시) || ETC
     */
    function checkWritingAndShowPopup(callback, checkMode) {

        checkMode = checkMode || "ETC";
        var isFunctionCallback = (typeof callback === 'function');

        set$element();

        var isVisiblePopup = $postPopup.is(":visible");
        var isSidePopup = !$postPopup.hasClass("flow-all-background-1");
        if (isVisiblePopup && checkMode === "SIDE_POP" && !isSidePopup) {
            closeAndCallback(false);
            return
        }

        var $writingRemarkObj = getWritingRemarkObj(isVisiblePopup);
        var $writingRemarkFileObj = getRemarkUploadObj(isVisiblePopup, "file");
        var $writingRemarkImgObj = getRemarkUploadObj(isVisiblePopup, "img");
        var $writingSubtaskObj = getWritingSubtaskObj(isVisiblePopup);
        var isPostViewType = $postPopup.attr("data-code") === "VIEW";
        if ((isVisiblePopup && !isPostViewType && isWriteFailed()) || //팝업에서 작성, 수정중이거나
            UploadHandler.isUploading() || //업로드중이거나
            $writingRemarkObj.length > 0 || //댓글 작성중이면
            $writingRemarkFileObj.length > 0 || // 댓글 파일이 있으면
            $writingRemarkImgObj.length > 0 || // 댓글 이미지가 있으면
            $writingSubtaskObj.length > 0   //하위업무 작성중이면
        ) {
            PopupDraw.drawConfirm({
                await: true,
                contents: {main: i18next.t('front.alert.leaveWriting')},
                //await: (checkMode === "ADD_TAB"), //Note. 게시물작성 탭전환시 창 꺼지지 않도록 처리
                callback: {
                    submit: function () {
                        closeAndCallback(true, checkMode === "SIDE_POP")
                    }, cancel: cancelCallback
                }
            })
            return;
        }

        var $shareProjectList = $postPopup.find(".js-share-project-list");
        var isExistSelectProject = $shareProjectList.is(":visible") && $shareProjectList.find(".on").length > 0;
        var $popupBefore = $postPopup.find(".js-popup-before");
        var isShareWriteMode = $popupBefore.is(":visible") && SpaceSelectable.isSharePost($postPopup);
        if (isExistSelectProject || isShareWriteMode) {
            var contents = isExistSelectProject ? "선택된 프로젝트가 있습니다." : "작성이 완료되지 않았습니다."
            PopupDraw.drawConfirm({
                contents: {main: contents + "\n다른 프로젝트에 올리기를 취소하시겠습니까?"},
                callback: {submit: removePopup}
            })
            return;
        }

        closeAndCallback(false, checkMode === "SIDE_POP");

        function cancelCallback() {
            PopupDraw.closePopup();
            if ($writingRemarkObj.length > 0) return $writingRemarkObj.focus();
            if ($writingSubtaskObj.length > 0) return $writingSubtaskObj.focus();
        }

        function closeAndCallback(isRemovePop, isSideeMode) {
            isSideeMode && removePopup();
            PopupDraw.closePopup();
            UploadHandler.stopUploading();
            isFunctionCallback && callback();
        }

        function isWriteFailed() {
            return JSON.stringify(JsonMaker.getPostJson($postPopup)) !== JSON.stringify(PostPopup.getData().EDIT_DATA);
        }
    }

    /**
     * @param projectSrno: 프로젝트 번호
     * @param postSrno: 글 번호
     * @param remarkSrno
     * @param callback: 콜백
     * */
    function togglePostView(projectSrno, postSrno, remarkSrno, callback, isMoveElectronAlarm) {

        remarkSrno = Often.null2Void(remarkSrno, "-1");

        set$element();

        var beforePopPostSrno = Often.null2Void($postPopup.attr("data-post-srno"));
        var beforePopPopupMode = Often.null2Void($postPopup.attr("data-code"));

        var isOpenAfterEdit = "EDIT" === beforePopPopupMode && postSrno === beforePopPostSrno;
        var isChangePostView = $postPopup.is(":visible") && postSrno !== beforePopPostSrno;
        var isExistsRemarkItem = $postPopup.find("#post-" + postSrno + "[data-remark-srno=" + remarkSrno + "]").length > 0;

        if (isOpenAfterEdit) {
            removePopup();
            setPopProjectSetting(projectSrno, openPostPopup);
            return;
        }

        //바닥에 작성중인 것은 체크할 필요가 없음
        if (!$postPopup.is(":visible")) {
            setPopProjectSetting(projectSrno, openPostPopup);
            return;
        }

        checkWritingAndShowPopup(function () {
            if (isExistsRemarkItem) return removePopup();
            DocumentEvent.closeAllPopup(true, isChangePostView);
            setPopProjectSetting(projectSrno, openPostPopup);
        });

        function openPostPopup() {
            getPostData(projectSrno, postSrno, remarkSrno, true, function (postData) {

                //댓글 이동시 깜빡임 방지로 drawRemark에서 댓글 다 불러오면 이전 postPopup 제거
                if ((Number(Often.null2Void(remarkSrno, "-1"))) < 0) {
                    if ($("#postPopup").is(":visible")) removePopup();
                } else {
                    $("#postPopup").attr("id", "prePostPopup");
                }
                var onePostData = $.extend({}, postData.COMMT_REC[0]);
                onePostData.COLABO_REMARK_SRNO = Often.null2Void(remarkSrno, "-1"); //댓글 이동 포스트팝업의 댓글 번호를 담아둠
                if (onePostData.SUBTASK_YN === "Y") ItemSubtask.setSubtaskRemarkCount(postSrno, onePostData.REMARK_CNT);
                if (onePostData.READ_YN === "Y") return drawPostView();
                onePostData.READ_USER_CNT = Number(onePostData.READ_USER_CNT) + 1;
                drawPostView()

                AlarmUpdate.executeReadApi({
                    COLABO_SRNO: projectSrno,
                    COLABO_COMMT_SRNO: postSrno,
                    COLABO_REMARK_SRNO: remarkSrno,
                })

                function drawPostView() {
                    var $target = Often.isAct("subscreen") ? $('body') : $('#mainBodyWrap');
                    $target.prepend(getPopupObj(PostComponent.getHtmlByPostRecord([onePostData]), "VIEW"));
                    set$element(); //$postPopup 갱신
                    PostPopupInit.initViewPopup($postPopup, postData, (Top.isRightWrap() || isMoveElectronAlarm), function () {
                        Detail.applySummarySlickImage();
                        (typeof callback === "function") && callback();
                    });
                    $postPopup.css("display", "none");

                    if (Number(Often.null2Void(remarkSrno, "-1")) < 0) {
                        $postPopup.css("display", "block");
                        addScrollSticky();
                        return;
                    }
                    var $remarkArea = $postPopup.find(".js-comment-area");
                    $remarkArea.find(".remark-item").remove();
                    ItemRemark.getRemarkDataHtml($remarkArea, {
                        MODE: OftenCode.MORE,
                        ORDER_TYPE: OftenCode.NEXT,
                        COLABO_SRNO: projectSrno,
                        COLABO_COMMT_SRNO: postSrno,
                        SRCH_COLABO_REMARK_SRNO: 0,
                    }, drawRemark);
                }

                function drawRemark() {
                    $("#prePostPopup").remove();
                    $postPopup.css("display", "block");
                    var $postScroll = $postPopup.find(".post-card-scroll");
                    var $targetRemark = $postPopup.find('.remark-item[remark-srno="' + remarkSrno + '"]');
                    $targetRemark.addClass("highlight").css("background", "#f8f7ff");
                    var offsetTop = $targetRemark.offset() && $targetRemark.offset().top;
                    var headerHeight = $postPopup.innerHeight() - $postScroll.innerHeight() / 2;
                    var scrollTop = offsetTop - headerHeight;
                    $postScroll.animate({scrollTop: scrollTop}, 400);
                    addScrollSticky();
                }
            })
        }
    }

    function setPopProjectSetting(projectSrno, callback) {
        var currentProjectSetting = LocalUtil.getLocalValue("CURRENT_PROJECT_SETTING");
        var currentProjectSrno = currentProjectSetting ? currentProjectSetting.COLABO_SRNO : "";
        if (currentProjectSrno !== projectSrno) return Detail.executeProjectSettingInfo(projectSrno, callback);
        LocalUtil.setLocalJson("POP_PROJECT_SETTING", currentProjectSetting);
        (typeof callback === "function") && callback();
    }

    function getOnePostData() {
        return postData && postData.POST_RECORD && postData.POST_RECORD[0];
    }

    function getPostData(projectSrno, postSrno, remarkSrno, isOrigin, successCallback) {
        var isList = LocalUtil.getFeedType() === "list" && !isOrigin;
        var apiKey = isList ? RenewalApi.GET.ACT_POST_LIST : RestApi.GET.COLABO2_R104;
        Ajax.executeApi(apiKey, {
            GUBUN: 'DETAIL',
            COLABO_SRNO: projectSrno,
            COLABO_COMMT_SRNO: postSrno,
            RENEWAL_YN: "Y",
            PG_NO: 1,
            PG_PER_CNT: 1,
        }, function (dat) {
            postData = {
                PROJECT_SRNO: projectSrno,
                PROJECT_NM: "",
                POST_SRNO: postSrno,
                POST_CODE: isList ? dat.POST_RECORD[0].TMPL_TYPE : PostCondition.getPostCodeByData(dat["COMMT_REC"][0]),
                POST_RECORD: dat[isList ? "POST_RECORD" : "COMMT_REC"],
            };
            (typeof successCallback === "function") && successCallback(dat);
        });
    }

    function openWritingView(post, isOnTab, projectSelectableJson) {

        var isUploadGoogleDrive = Often.isFunc(Func.CLOUD.GOOGLEDRIVE_UPLOAD_PREVENT) ? false : Often.isFunc(Func.CLOUD.GOOGLEDRIVE_UPLOAD);
        var isUploadDropbox = Often.isFunc(Func.CLOUD.DROPBOX_UPLOAD_PREVENT) ? false : Often.isFunc(Func.CLOUD.DROPBOX_UPLOAD);
        var isUploadImportFile = Often.isFunc(Func.CLOUD.IMPORT_FILE_BOX);

        projectSelectableJson = projectSelectableJson || {};
        var isProjectSelectable = projectSelectableJson.selectable;
        var isExistsData = Object.keys(post).length > 0;

        var isIamSubtask = post.SUBTASK_YN === "Y";

        var popupMode = isProjectSelectable ? projectSelectableJson.mode : isExistsData ? "EDIT" : "ADD"; //SHARE_POST|WRITE_ANYWHERE|EDIT|ADD
        var postCondition = PostCondition.getPostCondition(popupMode, post);
        var funcCondition = PostCondition.getFuncCondition(popupMode, post);
        var isSrchAuth = "Y" === LocalUtil.getProjectSrchAuthYn(); //공개타입 설정권한

        var postInnerHtml = ListHelper.replaceJson($("#postEditWrap").html(), {
            'title-display': postCondition.isWrite1 ? "d-none" : "",
            'nav-class': DetailCode.POST._GB[(postCondition.isWrite1 ? "0" : postCondition.postCode)],
            'post-gb': (isIamSubtask ? "subtask" : ""),
            'private-button-display': ListHelper.setDisplay(!isIamSubtask, "inline-block"),
            'private-class': isSrchAuth ? 'admin' : 'full',
            'private-text': isSrchAuth ? i18next.t('prefix.only', {val: '$t(front.common.projectManager)'}) :
                i18next.t('front.common.public'),
            'data-code': popupMode,
            'button-upload-google': ListHelper.setDisplay(isUploadGoogleDrive),
            'button-upload-dropbox': ListHelper.setDisplay(isUploadDropbox),
            'button-upload-importfile': ListHelper.setDisplay(isUploadImportFile),
            'post-dimd-layer': funcCondition.isUpload ? $("#postDimdItem").html() : "",
        });

        var $tempPostPopup = getPopupObj(postInnerHtml, popupMode);
        if ($("#postPopup").is(":visible")) { //켜져있는지 체크
            removePopup();
            $tempPostPopup.attr("data-before-view", "POP");
        } else {
            $tempPostPopup.attr("data-before-view", "NO_POP");
        }
        $tempPostPopup.attr({
            "data-project-srno": post.COLABO_SRNO,
            "data-post-srno": post.COLABO_COMMT_SRNO,
        });
        $('#mainBodyWrap').prepend($tempPostPopup);
        set$element(); //$postPopup 갱신
        initPopupState();

        function initPopupState() {
            PostPopupInit.initEditPopup($postPopup, post, isOnTab);
            isProjectSelectable && SpaceSelectable.addProjectSelectableView($popupBefore, projectSelectableJson);
            postData.EDIT_DATA = JsonMaker.getPostJson($postPopup);
            ScrapMetaData.addUrlPreview($postPopup.find('.js-upload-area'), drawUrlPreviewCallback);
            Often.showOrHideByFunc("VIDEO_CONFERENCE", $postPopup.find("#videoLi"));
            Detail.togglePostFilter($postPopup.find(".js-post-nav"))

            function drawUrlPreviewCallback(data) {
                PostAppend.appendLink($postPopup, data);
            }
        }
    }

    function getPopupObj(innerHtml, code) {
        var tempObj = PopupDraw.getPopupWrapObj();
        tempObj.find(".contents").html(innerHtml);
        tempObj.attr({'id': 'postPopup', 'data-code': code});
        tempObj.css("display", "block");
        return tempObj;
    }

    function initButtonByCode($postPopup, code) {
        var $Button = $postPopup.find("#" + code + "Button");
        var $Span = $postPopup.find("#" + code + "Span");
        var isEmpty = "" === $.trim($Span.text());
        $Button.css("display", isEmpty ? "inline-block" : "none");
        $Span.css("display", isEmpty ? "none" : "inline-block");
    }

    function removePopup() {
        removeHighlight();
        $("#postPopup").remove();
        Caret.initLastFocusNode();
    }

    function removeHighlight() {
        $("#mainContent").find(".highlight").removeClass("highlight");
    }

    function addScrollSticky() {
        var $postPopup = $("#postPopup");
        if ($(".post-card-scroll").hasVerticalScrollBar()) {
            $postPopup.find(".js-remark-layer").addClass('sticky');
        } else {
            $postPopup.find(".js-remark-layer").removeClass('sticky');
        }
    }
})()